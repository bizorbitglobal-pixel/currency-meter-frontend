import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { capturePayPalOrder, PLAN_PRICES_USD } from "@/lib/paypal";
import { activatePaidPlan } from "@/lib/subscriptions";

export const runtime = "nodejs";

export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let orderID;
  try {
    ({ orderID } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!orderID) {
    return NextResponse.json({ error: "Missing orderID." }, { status: 400 });
  }

  try {
    const capture = await capturePayPalOrder(orderID);

    if (capture.status !== "COMPLETED") {
      return NextResponse.json({ error: "Payment not completed." }, { status: 402 });
    }

    // Trust only the plan + amount PayPal actually recorded on the order
    // (set server-side at creation time), never a client-supplied planId.
    const purchaseUnit = capture.purchase_units?.[0];
    const planId = purchaseUnit?.reference_id;
    const capturedAmount = purchaseUnit?.payments?.captures?.[0]?.amount?.value;
    const expectedAmount = PLAN_PRICES_USD[planId];

    if (!expectedAmount || capturedAmount !== expectedAmount) {
      console.error("PayPal capture amount/plan mismatch", { planId, capturedAmount });
      return NextResponse.json({ error: "Payment verification failed." }, { status: 402 });
    }

    const { periodEnd } = await activatePaidPlan({
      userId: user.id,
      planId,
      paypalOrderId: orderID,
    });

    return NextResponse.json({ success: true, plan: planId, periodEnd });
  } catch (err) {
    console.error("PayPal capture-order error:", err.message);
    return NextResponse.json({ error: "Could not complete payment." }, { status: 502 });
  }
}
