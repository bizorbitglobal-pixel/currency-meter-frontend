"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SocialLoginButtons from "@/components/SocialLoginButtons";

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();

  const redirectedFrom =
    searchParams.get("redirectedFrom") ||
    searchParams.get("redirect") ||
    "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    setLoading(false);

    // 1. If Supabase returns an explicit "user already exists" error
    if (signUpError) {
      const errMsg = signUpError.message.toLowerCase();
      if (
        errMsg.includes("already registered") ||
        errMsg.includes("user already exists") ||
        errMsg.includes("already in use")
      ) {
        setError("An account with this email already exists. Please log in.");
        return;
      }

      setError(signUpError.message);
      return;
    }

    // 2. Supabase security edge-case: If email confirmation is enabled and the user already exists,
    // Supabase returns a fake success object with an empty `identities` array.
    if (data?.user && data?.user?.identities?.length === 0) {
      setError("An account with this email already exists. Please log in.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="font-sans max-w-md mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm text-center">
          <h1 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
            Check your email
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            We sent a confirmation link to <strong>{email}</strong>. Confirm your
            address to activate your free API plan (100 requests, no card required).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans max-w-md mx-auto px-4 py-12">
      {/* White background container */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
          Create your free account
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
          Get an API key instantly with 100 free requests, no card required.
        </p>

        <SocialLoginButtons redirectedFrom={redirectedFrom} />

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          <span className="text-xs uppercase text-gray-400 font-medium">or</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1 text-slate-900 dark:text-gray-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1 text-slate-900 dark:text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500">At least 8 characters.</p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 text-sm transition disabled:opacity-60 shadow-sm"
          >
            {loading ? "Creating account…" : "Create free account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            href={`/login?redirectedFrom=${encodeURIComponent(redirectedFrom)}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}