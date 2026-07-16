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
    <section className="rounded-3xl overflow-hidden border border-blue-200 bg-gradient-to-br from-white via-sky-50 to-blue-50 shadow-xl shadow-sky-200/30">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center p-6 sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
            Partner Offer
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Start trading with Exness through our partner link. Click the button below to open the account page with the best experience for your device.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
            >
              <FaRocket className="h-4 w-4" />
              Start Trading
            </a>
            {/* <a
              href={WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-700 underline underline-offset-2 transition hover:text-slate-900"
            >
              View desktop link
            </a> */}
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950/5 p-4 sm:p-6 border border-slate-200">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Exness trading offer"
              className="w-full rounded-3xl object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-blue-700 p-8 text-white shadow-inner shadow-sky-500/20">
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
