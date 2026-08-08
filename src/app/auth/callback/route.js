import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

// Handles redirects back from Supabase after email confirmation, password resets,
// or OAuth (Google/GitHub) logins.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  // Determine the target path (supports next, redirectedFrom, or default to /dashboard)
  const next =
    searchParams.get("next") ||
    searchParams.get("redirectedFrom") ||
    searchParams.get("redirectTo") ||
    "/dashboard";

  const supabase = await createClient();

  // 1. Handle PKCE code exchange (OAuth login & standard confirmation URLs)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 2. Handle token_hash verification (direct OTP & resend email links)
  if (token_hash) {
    const primaryType = type || "email";

    let { error } = await supabase.auth.verifyOtp({
      type: primaryType,
      token_hash,
    });

    // Fallback: If primary type failed, attempt signup or recovery fallback
    if (error && (primaryType === "email" || primaryType === "signup")) {
      const fallbackType = primaryType === "email" ? "signup" : "email";
      const fallbackResult = await supabase.auth.verifyOtp({
        type: fallbackType,
        token_hash,
      });
      error = fallbackResult.error;
    }

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Redirect to login with error state if authentication fails
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}