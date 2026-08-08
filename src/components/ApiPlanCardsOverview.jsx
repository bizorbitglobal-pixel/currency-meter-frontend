"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowRight, Check, Crown, Rocket, Zap } from "lucide-react";

const OVERVIEW_PLANS = [
  {
    id: "free",
    name: "Free Trial",
    tagline: "Test it in minutes",
    icon: Zap,
    price: "$0",
    cadence: "one-time",
    limit: "100 requests (lifetime)",
    bestFor: "Testing & prototyping",
    features: [
      "No credit card required to start",
      "Full access to all 8 currency strength scores",
      "Same real-time data feed as paid plans",
      "100 total requests to fully test your integration",
      "Upgrade anytime - your API key stays the same",
    ],
    accent: {
      tint: "bg-slate-50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800",
      icon: "bg-slate-700 text-white",
      pill: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      ring: "",
      button:
        "border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white",
    },
    cta: "Get Free API Key",
  },
  {
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
      tint: "bg-blue-50/60 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",
      icon: "bg-blue-600 text-white",
      pill: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      ring: "ring-2 ring-blue-600",
      button:
        "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20",
    },
    badge: "Most Popular",
    cta: "Subscribe with PayPal",
  },
  {
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
      tint: "bg-emerald-50/60 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900",
      icon: "bg-emerald-600 text-white",
      pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      ring: "",
      button:
        "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20",
    },
    cta: "Subscribe with PayPal",
  },
];

export default function ApiPlanCardsOverview({
  currentPlanId = null,
  isLoggedIn = false,
}) {
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const [activePaypalPlan, setActivePaypalPlan] = useState(null);
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

  const onApprove = useCallback(
    async (data) => {
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
          message: "Plan activated successfully! Redirecting...",
        });
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1200);
      } catch (err) {
        console.error("PayPal capture error:", err);
        setStatus({
          type: "error",
          message: "Could not complete payment.",
        });
      }
    },
    [router]
  );

  const onError = useCallback((err) => {
    console.error("PayPal SDK onError:", err);
    setStatus({
      type: "error",
      message: "PayPal checkout failed. Please try again.",
    });
  }, []);

  const handleSelectPlan = (planId) => {
    if (!isLoggedIn) {
      router.push(
        `/login?redirectedFrom=/forex-api%3Fcheckout%3D${planId}%23pricing`
      );
      return;
    }

    if (planId === "free") {
      router.push("/dashboard");
      return;
    }

    setActivePaypalPlan(planId);
  };

  const cardsContent = (
    <div className="space-y-6">
      {status && (
        <div
          className={`p-4 rounded-2xl text-sm font-medium border text-center ${
            status.type === "error"
              ? "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400"
              : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {OVERVIEW_PLANS.map((plan) => {
          const Icon = plan.icon;
          const isCurrent = currentPlanId === plan.id;
          const showPaypal =
            isLoggedIn && activePaypalPlan === plan.id && plan.id !== "free";

          return (
            <div
              key={plan.id}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[28px] border bg-white dark:bg-gray-900 p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${plan.accent.tint} ${plan.accent.ring}`}
            >
              {plan.badge && (
                <span className="absolute right-6 top-6 rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
                  {plan.badge}
                </span>
              )}

              <div className="flex flex-1 flex-col space-y-6">
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
                      <Check className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                {isCurrent ? (
                  <span className="w-full inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 px-4 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Current Plan
                  </span>
                ) : showPaypal ? (
                  <div className="space-y-2">
                    {clientId ? (
                      <PayPalButtons
                        style={{
                          layout: "horizontal",
                          height: 44,
                          shape: "pill",
                          label: "pay",
                        }}
                        forceReRender={[plan.id, clientId]}
                        createOrder={() => createOrder(plan.id)}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    ) : (
                      <p className="text-xs text-amber-600 text-center">
                        PayPal client ID not configured.
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setActivePaypalPlan(null)}
                      className="w-full text-center text-xs text-slate-500 hover:underline pt-1"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full flex items-center justify-center gap-2 rounded-full font-semibold px-4 py-3.5 text-sm transition ${plan.accent.button}`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
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
        components: "buttons",
      }}
    >
      {cardsContent}
    </PayPalScriptProvider>
  );
}