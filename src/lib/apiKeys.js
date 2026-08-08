import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/server";

const KEY_BYTES = 24; // 32 base64url chars of entropy

function randomToken() {
  return crypto.randomBytes(KEY_BYTES).toString("base64url");
}

export function hashApiKey(fullKey) {
  return crypto.createHash("sha256").update(fullKey).digest("hex");
}

// csm_live_<random> for real keys - easy to recognize in logs/dashboards.
export function generateApiKeyMaterial() {
  const token = randomToken();
  const fullKey = `csm_live_${token}`;
  const keyPrefix = fullKey.slice(0, 16);
  const keyHash = hashApiKey(fullKey);
  return { fullKey, keyPrefix, keyHash };
}

// Revokes any existing active key for the user and issues a brand new one.
// Returns the full plaintext key ONCE - callers must show it to the user
// immediately and never persist the plaintext value anywhere.
export async function createApiKeyForUser(userId) {
  const admin = createAdminClient();

  await admin
    .from("api_keys")
    .update({ status: "revoked", revoked_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("status", "active");

  const { fullKey, keyPrefix, keyHash } = generateApiKeyMaterial();

  const { data: apiKey, error } = await admin
    .from("api_keys")
    .insert({ user_id: userId, key_prefix: keyPrefix, key_hash: keyHash })
    .select()
    .single();

  if (error) throw error;

  await admin.from("usage_counters").insert({
    api_key_id: apiKey.id,
    period_start: new Date().toISOString(),
    period_end: null,
    request_count: 0,
  });

  return { fullKey, apiKey };
}

// Validates an incoming X-API-KEY header, enforces the caller's plan quota,
// and atomically increments usage if the request is allowed.
// Returns { ok: true, plan, remaining } or { ok: false, status, error }.
export async function checkAndConsumeApiKey(rawKey) {
  if (!rawKey || typeof rawKey !== "string") {
    return { ok: false, status: 401, error: "Missing X-API-KEY header." };
  }

  const admin = createAdminClient();
  const keyHash = hashApiKey(rawKey.trim());

  const { data: apiKey } = await admin
    .from("api_keys")
    .select("id, user_id, status")
    .eq("key_hash", keyHash)
    .maybeSingle();

  if (!apiKey || apiKey.status !== "active") {
    return { ok: false, status: 401, error: "Invalid or revoked API key." };
  }

  const { data: subscription } = await admin
    .from("subscriptions")
    .select("plan_id, status, current_period_end, plans(monthly_request_limit, trial_request_limit)")
    .eq("user_id", apiKey.user_id)
    .maybeSingle();

  if (!subscription || subscription.status !== "active") {
    return { ok: false, status: 403, error: "No active subscription for this account." };
  }

  if (subscription.current_period_end && new Date(subscription.current_period_end) < new Date()) {
    return { ok: false, status: 403, error: "Subscription expired. Please renew your plan." };
  }

  const limit =
    subscription.plan_id === "free"
      ? subscription.plans?.trial_request_limit
      : subscription.plans?.monthly_request_limit;

  const { data: counter } = await admin
    .from("usage_counters")
    .select("request_count")
    .eq("api_key_id", apiKey.id)
    .maybeSingle();

  const used = counter?.request_count ?? 0;

  if (typeof limit === "number" && used >= limit) {
    return {
      ok: false,
      status: 429,
      error:
        subscription.plan_id === "free"
          ? "Free trial limit reached (100 requests). Upgrade your plan to continue."
          : "Monthly request limit reached. Upgrade your plan or wait for the next billing cycle.",
    };
  }

  await admin
    .from("usage_counters")
    .update({ request_count: used + 1, updated_at: new Date().toISOString() })
    .eq("api_key_id", apiKey.id);

  return {
    ok: true,
    plan: subscription.plan_id,
    used: used + 1,
    limit: limit ?? null,
    remaining: typeof limit === "number" ? Math.max(limit - (used + 1), 0) : null,
  };
}
