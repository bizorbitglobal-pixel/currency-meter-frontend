"use server";

import { createAdminClient, createClient } from "@/lib/supabase/server";

export async function bypassLoginWithTestPassword(email, password) {
  if (password !== "Test@123") {
    return { success: false, error: "Invalid test password." };
  }

  const admin = createAdminClient();

  // 1. Check if user exists
  const { data: { users } } = await admin.auth.admin.listUsers();
  const existingUser = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  // 2. If user doesn't exist, create account instantly with email_confirm: true (No email sent)
  if (!existingUser) {
    const { error: createError } = await admin.auth.admin.createUser({
      email,
      password: "Test@123",
      email_confirm: true,
    });

    if (createError) {
      return { success: false, error: createError.message };
    }
  }

  // 3. Generate magic token in code ONLY (No email sent to inbox)
  const { data, error: genError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  if (genError || !data?.properties?.hashed_token) {
    return { success: false, error: genError?.message || "Failed to generate token." };
  }

  // 4. Verify token on server to write session cookies to browser
  const supabase = await createClient();
  const { error: verifyError } = await supabase.auth.verifyOtp({
    token_hash: data.properties.hashed_token,
    type: "magiclink",
  });

  if (verifyError) {
    return { success: false, error: verifyError.message };
  }

  return { success: true };
}