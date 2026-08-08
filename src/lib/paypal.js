// Server-only helper for talking to the PayPal REST API
const IS_PRODUCTION = process.env.PAYPAL_MODE === "live" || process.env.NODE_ENV === "production";

const PAYPAL_API_BASE =
  process.env.PAYPAL_API_BASE ||
  (IS_PRODUCTION
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com");

export const PLAN_PRICES_USD = {
  pro: "10.00",
  unlimited: "50.00",
};

export const PLAN_DURATION_DAYS = 30;

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured.");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to obtain PayPal access token (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function createPayPalOrder(planId) {
  const amount = PLAN_PRICES_USD[planId];
  if (!amount) throw new Error("Unknown plan for checkout.");

  const accessToken = await getAccessToken();

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: planId,
        description: `Currency Strength Meter API - ${planId} plan`,
        amount: {
          currency_code: "USD",
          value: amount,
        },
      },
    ],
    application_context: {
      brand_name: "Currency Strength Meter",
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
      landing_page: "NO_PREFERENCE",
    },
  };

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PayPal order creation failed: ${body}`);
  }

  return res.json();
}

export async function capturePayPalOrder(orderId) {
  const accessToken = await getAccessToken();

  const res = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`PayPal capture failed: ${JSON.stringify(data)}`);
  }
  return data;
}

export async function verifyPayPalWebhookSignature(req, rawBodyText) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    console.warn("PAYPAL_WEBHOOK_ID is not configured in environment variables.");
    return false;
  }

  const headers = req.headers;
  const transmissionId = headers.get("paypal-transmission-id");
  const transmissionTime = headers.get("paypal-transmission-time");
  const certUrl = headers.get("paypal-cert-url");
  const authAlgo = headers.get("paypal-auth-algo");
  const transmissionSig = headers.get("paypal-transmission-sig");

  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    return false;
  }

  try {
    const accessToken = await getAccessToken();

    const verificationPayload = {
      transmission_id: transmissionId,
      transmission_time: transmissionTime,
      cert_url: certUrl,
      auth_algo: authAlgo,
      transmission_sig: transmissionSig,
      webhook_id: webhookId,
      webhook_event: JSON.parse(rawBodyText),
    };

    const res = await fetch(
      `${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(verificationPayload),
        cache: "no-store",
      }
    );

    if (!res.ok) return false;

    const data = await res.json();
    return data.verification_status === "SUCCESS";
  } catch (err) {
    console.error("Webhook signature verification error:", err);
    return false;
  }
}