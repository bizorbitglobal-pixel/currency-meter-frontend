"use client";

import { useEffect, useState } from "react";
import { FaRocket } from "react-icons/fa";

const WEB_URL = "https://one.exnessonelink.com/a/txt6jvjtma";
const MOBILE_URL = "https://one.exnessonelink.com/a/txt6jvjtma?platform=mobile";

export default function ExnessCTA({ imageSrc = "/images/exness.webp", title = "Open an Exness Account" }) {
  const [targetUrl, setTargetUrl] = useState(WEB_URL);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const userAgent = navigator.userAgent || "";
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    setTargetUrl(isMobile ? MOBILE_URL : WEB_URL);
  }, []);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-lg shadow-slate-300/20 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-slate-950/30">
      <div className="grid gap-6 p-4 sm:p-6 md:gap-8 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600 dark:text-sky-400">
            Partner Offer
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Start trading with Exness through our partner link. Click the button below to open the account page with the best experience for your device.
          </p>
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <FaRocket className="h-4 w-4" />
              Start Trading
            </a>
            <span className="text-center text-xs text-slate-500 dark:text-slate-400 sm:text-left">
              Fast setup • Trusted broker • Mobile-friendly
            </span>
          </div>
        </div>

        <div className="order-1 rounded-2xl border border-slate-200 bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-800/70 lg:order-2">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Exness trading offer"
              className="h-48 w-full rounded-2xl object-cover sm:h-56 md:h-64 lg:h-full"
            />
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 p-8 text-white shadow-inner shadow-sky-500/20">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Exness</p>
                <h3 className="mt-3 text-2xl font-bold">Trade Forex with Confidence</h3>
                <p className="mt-2 text-sm leading-6 text-sky-100">
                  Fast execution, competitive spreads, and tailored account access for traders worldwide.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
