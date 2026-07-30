"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, X } from "lucide-react";

const SESSION_WINDOWS = [
  { name: "Sydney", open: 22, close: 7, code: "AU" },
  { name: "Tokyo", open: 0, close: 9, code: "JP" },
  { name: "London", open: 8, close: 17, code: "GB" },
  { name: "New York", open: 13, close: 22, code: "US" },
];

const TICKER_PAIRS = [
  { symbol: "EUR/USD", isUp: true },
  { symbol: "USD/CAD", isUp: false },
  { symbol: "USD/CHF", isUp: true },
];

function sessionOpen(hour, session) {
  if (session.open < session.close) {
    return hour >= session.open && hour < session.close;
  }
  return hour >= session.open || hour < session.close;
}

function FlagIcon({ code }) {
  if (code === "US") {
    return (
      <svg className="h-3.5 w-5 rounded-xs object-cover" viewBox="0 0 640 480">
        <path fill="#bd3d44" d="M0 0h640v480H0z" />
        <path
          fill="#fff"
          d="M0 36.9h640v36.9H0zm0 73.8h640v36.9H0zm0 73.9h640v36.9H0zm0 73.8h640v36.9H0zm0 73.9h640v36.9H0zm0 73.8h640v36.9H0z"
        />
        <path fill="#192f5d" d="M0 0h280v258.5H0z" />
      </svg>
    );
  }
  if (code === "GB") {
    return (
      <svg className="h-3.5 w-5 rounded-xs object-cover" viewBox="0 0 640 480">
        <path fill="#012169" d="M0 0h640v480H0z" />
        <path
          fill="#fff"
          d="m75 0 245 180L565 0h75v55L400 240l240 185v55h-75L320 300 75 480H0v-55l240-185L0 55V0h75z"
        />
        <path
          fill="#C8102E"
          d="m424 280 216 163v37h-50L370 310l54-30zM216 200 0 37v-37h50l220 170-54 30zm144 0 216-170h50v37L406 200h-46zM280 280 64 450H14v-37l220-163h46z"
        />
        <path fill="#fff" d="M240 0h160v480H240zM0 160h640v160H0z" />
        <path fill="#C8102E" d="M267 0h106v480H267zM0 187h640v106H0z" />
      </svg>
    );
  }
  if (code === "JP") {
    return (
      <svg
        className="h-3.5 w-5 rounded-xs border border-slate-200/60 object-cover"
        viewBox="0 0 640 480"
      >
        <path fill="#fff" d="M0 0h640v480H0z" />
        <circle cx="320" cy="240" r="144" fill="#bc002d" />
      </svg>
    );
  }
  return (
    <svg className="h-3.5 w-5 rounded-xs object-cover" viewBox="0 0 640 480">
      <path fill="#00008b" d="M0 0h640v480H0z" />
      <path
        fill="#fff"
        d="m0 0 160 120L320 0h40v30L200 150l160 120v30h-40L160 180 0 300V0z"
      />
    </svg>
  );
}

export default function MarketTickHeader() {
  const [clock, setClock] = useState(null);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  useEffect(() => {
    setClock(new Date());
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const utcHour = clock ? clock.getUTCHours() + clock.getUTCMinutes() / 60 : 0;
  const activeSessions = SESSION_WINDOWS.filter((s) => sessionOpen(utcHour, s));
  const primarySession = activeSessions[0] || {
    name: "Market Closed",
    code: "US",
  };
  const isMarketOpen = activeSessions.length > 0;
  const formattedTime = clock ? clock.toUTCString().slice(17, 25) : "00:00:00";

  return (
    <div className="relative w-full border-t border-b border-slate-200/80 bg-slate-50/90 py-2 dark:border-slate-800/80 dark:bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs">
        {/* Left Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Clickable Live Market Indicator */}
          {/* <button
            type="button"
            href={`/forex-tools/forex-session-clock`}

            onClick={() => setDashboardOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
          >
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isMarketOpen ? "bg-emerald-400" : "bg-amber-400"}`} />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isMarketOpen ? "bg-emerald-500" : "bg-amber-500"}`} />
            </span>
            <div className="text-left">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Live Market</p>
              <p className="font-mono text-xs font-extrabold text-slate-800 dark:text-slate-100">
                {formattedTime} <span className="text-[9px] text-slate-400">UTC</span>
              </p>
            </div>
             
          </button> */}
          <Link
            href="/forex-tools/forex-session-clock"
            onClick={() => setDashboardOpen(false)}
            className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  isMarketOpen ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  isMarketOpen ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
            </span>
            <div className="text-left">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Live Market
              </p>
              <p className="font-mono text-xs font-extrabold text-slate-800 dark:text-slate-100">
                {formattedTime}{" "}
                <span className="text-[9px] text-slate-400">UTC</span>
              </p>
            </div>
          </Link>

          <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          {/* Clickable Active Country Session */}
          <button
            type="button"
            onClick={() => setDashboardOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
          >
            <FlagIcon code={primarySession.code} />
            <div className="text-left">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                {primarySession.name}
              </p>
              <p className="text-[9px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                {isMarketOpen ? "Active" : "Closed"}
              </p>
            </div>
            <ChevronDown
              className={`h-3.5 w-3.5 text-slate-400 transition-transform ${dashboardOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block" />

          <Link
            href="/forex-tools/volatility-calculator"
            className="hidden md:flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] font-bold text-slate-600 transition hover:border-slate-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-blue-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span>Standard Volatility</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-5">
          {/* <div className="flex items-center gap-2.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              Active Pairs Now
            </span>
            <div className="flex items-center gap-1.5">
              {TICKER_PAIRS.map((pair) => (
                <div
                  key={pair.symbol}
                  className="flex items-center gap-1 rounded border border-slate-200/80 bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  <span>{pair.symbol}</span>
                  <span
                    className={
                      pair.isUp
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500"
                    }
                  >
                    {pair.isUp ? "▲" : "▼"}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Toggle live dropdown instead of external route */}
          <Link
            href="/forex-tools/forex-session-clock"
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <span>Full Dashboard</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Live Market Session Dropdown Modal */}
      {dashboardOpen && (
        <div className="absolute top-full left-0 w-full border-b border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950 z-40">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100">
                Live Forex Market Sessions
              </h3>
              <button
                type="button"
                onClick={() => setDashboardOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-900 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SESSION_WINDOWS.map((session) => {
                const isOpen = sessionOpen(utcHour, session);
                return (
                  <div
                    key={session.name}
                    className={`rounded-2xl border p-4 transition ${
                      isOpen
                        ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-700/60 dark:bg-emerald-950/20"
                        : "border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FlagIcon code={session.code} />
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
                          {session.name}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isOpen
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                            : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${isOpen ? "animate-pulse bg-emerald-500" : "bg-slate-400"}`}
                        />
                        {isOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-extrabold text-slate-900 dark:text-white">
                      {`${String(session.open).padStart(2, "0")}:00 - ${String(session.close).padStart(2, "0")}:00 UTC`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
