import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/dashboard";

  const supabase = await createClient();

  // 1. Handle PKCE code exchange (standard flow when using {{ .ConfirmationURL }})
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 2. Handle direct token_hash verification with type fallback
  if (token_hash) {
    const primaryType = type || "signup";
    
    // Try primary type first
    let { error } = await supabase.auth.verifyOtp({
      type: primaryType,
      token_hash,
    });

    // Fallback: If primary type was 'email', try 'signup' (and vice versa)
    if (error) {
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

  // Redirect to login if verification failed
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}