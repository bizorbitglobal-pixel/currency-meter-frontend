import { NextResponse } from "next/server";
import { verifyPayPalWebhookSignature } from "@/lib/paypal";
import { createAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

// Backup/audit path for PayPal events (refunds, disputes, denied captures).
// Primary plan activation happens synchronously in /api/paypal/capture-order;
// this endpoint reacts to asynchronous events like refunds to revoke access.
export async function POST(request) {
  const rawBody = await request.text();
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  try {
    const verified = await verifyPayPalWebhookSignature(request.headers, event);
    if (!verified) {
      console.warn("PayPal webhook signature verification failed.");
      return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
    }
  } catch (err) {
    console.error("PayPal webhook verification error:", err.message);
    return NextResponse.json({ error: "Verification error." }, { status: 500 });
  }

  const admin = createAdminClient();

  const { error: insertError } = await admin
    .from("paypal_webhook_events")
    .insert({ event_id: event.id, event_type: event.event_type, payload: event });

  if (insertError) {
    // Duplicate event_id means we already processed this one - ack and stop.
    return NextResponse.json({ received: true, duplicate: true });
  }

  if (
    event.event_type === "PAYMENT.CAPTURE.REFUNDED" ||
    event.event_type === "PAYMENT.CAPTURE.REVERSED" ||
    event.event_type === "PAYMENT.CAPTURE.DENIED"
  ) {
    const orderId =
      event.resource?.supplementary_data?.related_ids?.order_id ||
      event.resource?.id;

    if (orderId) {
      await admin
        .from("subscriptions")
        .update({
          plan_id: "free",
          status: "active",
          current_period_end: null,
          updated_at: new Date().toISOString(),
        })
        .eq("paypal_order_id", orderId);
    }
  }

  return NextResponse.json({ received: true });
}
