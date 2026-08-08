import { NextResponse } from "next/server";
import { checkAndConsumeApiKey } from "@/lib/apiKeys";

export const runtime = "nodejs";

// Upstream realtime data source
const UPSTREAM_URL = "https://currency-strength-realtime.vercel.app/api/strength";

// Fallback dataset in case upstream feed is temporarily unavailable
const FALLBACK_SCORES = {
  AUD: 10,
  CAD: 80,
  CHF: 100,
  EUR: 90,
  GBP: 50,
  JPY: 100,
  NZD: 30,
  USD: 100,
};

export async function GET(request) {
  try {
    // 1. Verify X-API-KEY header, then enforce the caller's plan quota
    const apiKey = request.headers.get("x-api-key");
    const usage = await checkAndConsumeApiKey(apiKey);

    if (!usage.ok) {
      return NextResponse.json(
        { success: false, error: usage.error },
        { status: usage.status }
      );
    }

    // 2. Fetch live data from your existing realtime backend
    let currencyScores = FALLBACK_SCORES;

    try {
      const res = await fetch(UPSTREAM_URL, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          currencyScores = json.data;
        }
      }
    } catch (upstreamErr) {
      console.warn("⚠️ Upstream fetch failed, serving fallback scores:", upstreamErr.message);
    }

    // 3. Respond in the exact JSON structure expected by the client & MT5 EA
    return NextResponse.json(
      {
        success: true,
        data: currencyScores,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "X-API-KEY, Content-Type",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "X-RateLimit-Plan": usage.plan,
          "X-RateLimit-Used": String(usage.used),
          "X-RateLimit-Remaining": usage.remaining === null ? "unlimited" : String(usage.remaining),
        },
      }
    );
  } catch (error) {
    console.error("❌ API Endpoint Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// Support CORS preflight requests for MT5 / Web clients
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "X-API-KEY, Content-Type",
    },
  });
}