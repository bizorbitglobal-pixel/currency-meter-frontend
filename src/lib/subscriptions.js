import { createAdminClient } from "@/lib/supabase/server";
import { PLAN_DURATION_DAYS } from "@/lib/paypal";

// Activates or renews a paid plan for a user after a successful PayPal capture,
// and resets their usage counter for the new 30-day billing period.
export async function activatePaidPlan({ userId, planId, paypalOrderId }) {
  const admin = createAdminClient();

  const now = new Date();
  const periodEnd = new Date(now.getTime() + PLAN_DURATION_DAYS * 24 * 60 * 60 * 1000);

  const { error: subError } = await admin.from("subscriptions").upsert(
    {
      user_id: userId,
      plan_id: planId,
      status: "active",
      paypal_order_id: paypalOrderId,
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
      updated_at: now.toISOString(),
    },
    { onConflict: "user_id" }
  );
  if (subError) throw subError;

  const { data: apiKey } = await admin
    .from("api_keys")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (apiKey) {
    await admin
      .from("usage_counters")
      .update({
        period_start: now.toISOString(),
        period_end: periodEnd.toISOString(),
        request_count: 0,
        updated_at: now.toISOString(),
      })
      .eq("api_key_id", apiKey.id);
  }

  return { periodEnd };
}

// Downgrades any subscription whose current_period_end has passed back to the
// free plan. Intended to be called from a scheduled Vercel Cron job.
export async function expireOverduePlans() {
  const admin = createAdminClient();
  const now = new Date().toISOString();

  const { data: expired } = await admin
    .from("subscriptions")
    .select("user_id")
    .lt("current_period_end", now)
    .eq("status", "active")
    .neq("plan_id", "free");

  if (!expired?.length) return { downgraded: 0 };

  const userIds = expired.map((row) => row.user_id);

  await admin
    .from("subscriptions")
    .update({
      plan_id: "free",
      status: "active",
      current_period_start: now,
      current_period_end: null,
      updated_at: now,
    })
    .in("user_id", userIds);

  return { downgraded: userIds.length };
}
