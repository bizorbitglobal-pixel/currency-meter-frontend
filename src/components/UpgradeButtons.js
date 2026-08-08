"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PLAN_LABEL = { pro: "Pro", unlimited: "Unlimited" };

export default function UpgradeButtons({ currentPlan }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message }
  const [busyPlan, setBusyPlan] = useState(null);

  if (!clientId) {
    return (
      <p className="text-sm text-amber-600">
        PayPal checkout is not configured yet (missing NEXT_PUBLIC_PAYPAL_CLIENT_ID).
      </p>
    );
  }

  function createOrder(planId) {
    setBusyPlan(planId);
    return fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        return data.id;
      });
  }

  function onApprove(data) {
    return fetch("/api/paypal/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID: data.orderID }),
    })
      .then((res) => res.json())
      .then((result) => {
        setBusyPlan(null);
        if (result.error) {
          setStatus({ type: "error", message: result.error });
          return;
        }
        setStatus({ type: "success", message: "Plan activated! Refreshing…" });
        setTimeout(() => window.location.reload(), 1200);
      });
  }

  function onError() {
    setBusyPlan(null);
    setStatus({ type: "error", message: "PayPal checkout failed. Please try again." });
  }

  return (
    <PayPalScriptProvider options={{ clientId, currency: "USD", intent: "capture" }}>
      <div className="space-y-6">
        {status && (
          <p className={`text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {status.message}
          </p>
        )}
        {["pro", "unlimited"].map((planId) => (
          <div key={planId} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">{PLAN_LABEL[planId]} plan</span>
              {currentPlan === planId && (
                <span className="text-xs rounded-full bg-blue-100 text-blue-700 px-2 py-0.5">
                  Current plan
                </span>
              )}
            </div>
            {currentPlan !== planId && (
              <PayPalButtons
                style={{ layout: "horizontal", height: 40 }}
                disabled={busyPlan !== null}
                forceReRender={[planId]}
                createOrder={() => createOrder(planId)}
                onApprove={onApprove}
                onError={onError}
              />
            )}
          </div>
        ))}
      </div>
    </PayPalScriptProvider>
  );
}
