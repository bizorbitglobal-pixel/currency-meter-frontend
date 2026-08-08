"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SocialLoginButtons from "@/components/SocialLoginButtons";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Support both 'redirectedFrom' and 'redirect' search params
  const redirectedFrom =
    searchParams.get("redirectedFrom") ||
    searchParams.get("redirect") ||
    "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsUserNotFound(false);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      const msg = signInError.message.toLowerCase();

      // Catch invalid credentials or non-existent user
      if (msg.includes("invalid login credentials")) {
        setIsUserNotFound(true);
        setError("User account doesn't exist or credentials are invalid.");
        return;
      }

      setError(signInError.message);
      return;
    }

    router.push(redirectedFrom);
    router.refresh();
  }

  return (
    <div className="font-sans max-w-md mx-auto px-4 py-12">
      {/* Container Card with White Background */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
          Log in
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
          Access your API dashboard, usage stats, and key.
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
            <div className="flex items-center justify-between mb-1">
              <label
                className="block text-sm font-medium text-slate-900 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <Link
                href="/reset-password"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Error Message with Signup prompt */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 space-y-1">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
              {isUserNotFound && (
                <p className="text-xs text-red-700 dark:text-red-300">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={`/signup?redirectedFrom=${encodeURIComponent(redirectedFrom)}`}
                    className="font-bold underline hover:text-red-800 dark:hover:text-red-200"
                  >
                    Sign up here
                  </Link>
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 text-sm transition disabled:opacity-60 shadow-sm"
          >
            {loading ? "Processing…" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Don&apos;t have an account?{" "}
          <Link
            href={`/signup${redirectedFrom ? `?redirectedFrom=${encodeURIComponent(redirectedFrom)}` : ""}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}