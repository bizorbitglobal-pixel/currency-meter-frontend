import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client (safe to use in "use client" components).
// Uses the public URL + anon key, which are subject to Row Level Security.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
