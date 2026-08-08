import { NextResponse } from "next/server";
import { expireOverduePlans } from "@/lib/subscriptions";

export const runtime = "nodejs";

// Scheduled daily via Vercel Cron (see vercel.json). Downgrades any paid
// subscription whose 30-day period has ended back to the Free plan.
export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await expireOverduePlans();
  return NextResponse.json({ success: true, ...result });
}
