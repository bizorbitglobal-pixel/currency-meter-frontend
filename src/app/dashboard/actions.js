"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createApiKeyForUser } from "@/lib/apiKeys";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");
  return { supabase, user };
}

// Ensures the signed-in user has an active API key, creating one on first
// visit. Returns the plaintext key ONLY when it was just created.
export async function ensureApiKey() {
  const { supabase, user } = await requireUser();

  const { data: existing } = await supabase
    .from("api_keys")
    .select("id, key_prefix, created_at")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (existing) {
    return { keyPrefix: existing.key_prefix, createdAt: existing.created_at, fullKey: null };
  }

  const { fullKey, apiKey } = await createApiKeyForUser(user.id);
  // No revalidatePath here - this runs during the dashboard's own render
  // (first-visit key provisioning), and revalidating the route currently
  // being rendered is unsupported. The fresh data is returned directly instead.
  return { keyPrefix: apiKey.key_prefix, createdAt: apiKey.created_at, fullKey };
}

export async function regenerateApiKey() {
  const { user } = await requireUser();
  const { fullKey, apiKey } = await createApiKeyForUser(user.id);
  revalidatePath("/dashboard");
  return { keyPrefix: apiKey.key_prefix, createdAt: apiKey.created_at, fullKey };
}

export async function updateProfile(formData) {
  const { supabase, user } = await requireUser();
  const fullName = String(formData.get("fullName") || "").trim().slice(0, 120);

  await supabase
    .from("profiles")
    .update({ full_name: fullName, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  revalidatePath("/dashboard");
  return { success: true };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
