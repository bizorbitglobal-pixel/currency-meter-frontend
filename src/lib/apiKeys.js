import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/server";

// Generates cryptographically secure alphanumeric random strings
function randomAlphanumeric(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

// Prefix: 13 characters ("csm_live_" + 4 random chars)
// Secret Token: 20 random characters
// Full Key: 33 characters total
export function generateApiKeyMaterial() {
  const keyPrefix = `csm_live_${randomAlphanumeric(4)}`; // Exactly 13 characters
  const secretPart = randomAlphanumeric(20); // Exactly 20 characters
  const fullKey = `${keyPrefix}${secretPart}`; // 33 characters total
  const secretToken = secretPart; // 20 characters, used for signing requests   

  return { fullKey, keyPrefix, secretToken };
}

// Revokes any existing active key for the user and issues a brand new one.
// Plaintext fullKey is saved to DB so it can be retrieved by the user later.
// Usage counters are tied to user_id, preserving request history across regenerations.
export async function createApiKeyForUser(userId) {
  const admin = createAdminClient();

  // Revoke previous active keys for this user
  await admin
    .from("api_keys")
    .update({ status: "revoked", revoked_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("status", "active");

  const { fullKey, keyPrefix, secretToken } = generateApiKeyMaterial();

  // Store the plaintext key directly in key_hash
  const { data: apiKey, error } = await admin
    .from("api_keys")
    .insert({ user_id: userId, key_prefix: keyPrefix, key_hash: secretToken})
    .select()
    .single();

  if (error) throw error;

  // Ensure a usage counter row exists for the user (by user_id) without overwriting existing usage
  const { data: existingCounter } = await admin
    .from("usage_counters")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!existingCounter) {
    await admin.from("usage_counters").insert({
      user_id: userId,
      period_start: new Date().toISOString(),
      period_end: null,
      request_count: 0,
    });
  }

  return { fullKey, apiKey };
}

// Validates incoming X-API-KEY header using plaintext matching,
// enforces the caller's plan quota based on user_id, and updates usage.
export async function checkAndConsumeApiKey(rawKey) {
  if (!rawKey || typeof rawKey !== "string") {
    return { ok: false, status: 401, error: "Missing X-API-KEY header." };
  }

  const admin = createAdminClient();
  const keyToMatch = rawKey.trim();

  // Direct match against plaintext key
  const { data: apiKey } = await admin
    .from("api_keys")
    .select("id, user_id, status")
    .eq("key_hash", keyToMatch)
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

  // Fetch usage stats tied to user_id
  const { data: counter } = await admin
    .from("usage_counters")
    .select("request_count")
    .eq("user_id", apiKey.user_id)
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

  // Increment counter by user_id
  if (counter) {
    await admin
      .from("usage_counters")
      .update({ request_count: used + 1, updated_at: new Date().toISOString() })
      .eq("user_id", apiKey.user_id);
  } else {
    await admin.from("usage_counters").insert({
      user_id: apiKey.user_id,
      period_start: new Date().toISOString(),
      period_end: null,
      request_count: 1,
      updated_at: new Date().toISOString(),
    });
  }

  return {
    ok: true,
    plan: subscription.plan_id,
    used: used + 1,
    limit: limit ?? null,
    remaining: typeof limit === "number" ? Math.max(limit - (used + 1), 0) : null,
  };
}