"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowRight, Check, Crown, Rocket } from "lucide-react";

const PLAN_META = {
  pro: {
    id: "pro",
    name: "Pro",
    tagline: "For live EAs & bots",
    icon: Rocket,
    price: "$10",
    cadence: "/ month",
    limit: "10,000 requests / month",
    bestFor: "Live trading EAs & bots",
    features: [
      "10,000 requests every 30-day billing cycle",
      "Built for EAs polling every 1-5 minutes",
      "Same API key - no re-integration needed to upgrade",
      "Priority email support",
      "Renew anytime via PayPal",
    ],
    accent: {
      tint: "bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-900",
      icon: "bg-blue-600 text-white",
      pill: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      ring: "ring-2 ring-blue-600",
    },
    badge: "Most Popular",
  },
  unlimited: {
    id: "unlimited",
    name: "Unlimited",
    tagline: "For commercial products",
    icon: Crown,
    price: "$50",
    cadence: "/ month",
    limit: "Unlimited requests",
    bestFor: "Commercial products & high-volume use",
    features: [
      "No request cap for the entire 30-day cycle",
      "Built for tight-interval polling & multi-account setups",
      "Safe to bundle inside indicators/bots you distribute",
      "Priority email support",
      "Renew anytime via PayPal",
    ],
    accent: {
      tint: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900",
      icon: "bg-emerald-600 text-white",
      pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      ring: "",
    },
  },
};

export default function ApiPlanCards({
  currentPlanId = null,
  showSignInCta = true,
}) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [status, setStatus] = useState(null);

  const createOrder = useCallback(async (planId) => {
    setStatus(null);

    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Could not start checkout.");
      }

      // Return ONLY the order ID string to PayPal JS SDK
      return data.id;
    } catch (err) {
      console.error("PayPal createOrder Error:", err);
      setStatus({
        type: "error",
        message: err.message || "PayPal checkout failed.",
      });
      throw err;
    }
  }, []);

  const onApprove = useCallback(async (data) => {
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });

      const body = await res.json();
      if (!res.ok || body.error) {
        setStatus({
          type: "error",
          message: body.error || "Could not complete payment.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Plan activated. Refreshing...",
      });
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error("PayPal capture error:", err);
      setStatus({
        type: "error",
        message: "Could not complete payment.",
      });
    }
  }, []);

  const onError = useCallback((err) => {
    console.error("PayPal SDK onError:", err);
    setStatus({
      type: "error",
      message: "PayPal checkout failed. Please try again.",
    });
  }, []);

  const cardsContent = (
    <div className="space-y-6">
      {status && (
        <p
          className={`text-sm ${
            status.type === "error" ? "text-red-600" : "text-emerald-600"
          }`}
        >
          {status.message}
        </p>
      )}
      {!clientId && (
        <p className="text-sm text-amber-600">
          PayPal checkout is not configured yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {Object.values(PLAN_META).map((plan) => {
          const Icon = plan.icon;
          const isCurrent = currentPlanId === plan.id;
          return (
            <div
              key={plan.id}
              className={`group relative flex flex-col overflow-hidden rounded-[28px] border bg-white dark:bg-gray-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${plan.accent.tint} ${plan.accent.ring}`}
            >
              {plan.badge && (
                <span className="absolute right-6 top-6 rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
                  {plan.badge}
                </span>
              )}
              <div className="flex flex-1 flex-col p-8 space-y-6">
                <div
                  className={`inline-flex w-fit rounded-2xl p-3 shadow-md ${plan.accent.icon}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {plan.tagline}
                  </p>
                </div>
                <div>
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>{" "}
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {plan.cadence}
                  </span>
                  <p
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${plan.accent.pill}`}
                  >
                    {plan.limit}
                  </p>
                </div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-gray-800 pt-5">
                  Best for:{" "}
                  <span className="text-slate-600 dark:text-slate-300 normal-case font-semibold">
                    {plan.bestFor}
                  </span>
                </p>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="h-4 w-4 shrink-0 mt-0.5 text-blue-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <span className="mt-2 inline-flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-950/50 border border-slate-200 dark:border-gray-700 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Current plan
                  </span>
                ) : !clientId ? (
                  showSignInCta ? (
                    <Link
                      href="/login?redirectedFrom=/forex-api#pricing"
                      className="mt-2 flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3.5 text-sm transition"
                    >
                      Sign in to subscribe
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null
                ) : (
                  <PayPalButtons
                    style={{ layout: "horizontal", height: 42 }}
                    forceReRender={[plan.id, clientId]}
                    createOrder={() => createOrder(plan.id)}
                    onApprove={onApprove}
                    onError={onError}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (!clientId) {
    return cardsContent;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId,
        currency: "USD",
        intent: "capture",
      }}
    >
      {cardsContent}
    </PayPalScriptProvider>
  );
}