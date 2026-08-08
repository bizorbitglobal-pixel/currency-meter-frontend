import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPayPalOrder } from "@/lib/paypal";

export const runtime = "nodejs";

const ALLOWED_PLANS = new Set(["pro", "unlimited"]);

export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let planId;
  try {
    const body = await request.json();
    planId = body.planId;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!ALLOWED_PLANS.has(planId)) {
    return NextResponse.json({ error: "Invalid plan selected." }, { status: 400 });
  }

  try {
    const order = await createPayPalOrder(planId);
    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error("PayPal create-order error detailed:", err);
    // Return explicit error message so frontend shows the exact reason
    return NextResponse.json(
      { error: err.message || "Could not start checkout." },
      { status: 502 }
    );
  }
}