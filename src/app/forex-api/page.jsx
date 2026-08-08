import Link from "next/link";
import { Zap, Rocket, Crown, ShieldCheck, Clock3, BookOpen, Code2, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ApiPlanCardsOverview from "@/components/ApiPlanCardsOverview";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://www.currencystrengthsmeters.com";
const API_ENDPOINT = `${BASE_URL}/api/v1/strength`;

export const metadata = {
  title: "Currency Strength Meter API - Free Forex Strength Data for MT4/MT5",
  description:
    "REST API for real-time currency strength scores across 8 major currencies. Free tier with 100 requests, paid plans from $10/mo. Built for MT4/MT5 (MQL5) EAs, Telegram bots, and trading dashboards.",
  keywords: [
    "currency strength meter api",
    "forex strength api",
    "mt5 currency strength indicator api",
    "mt4 api integration forex",
    "mql5 webrequest currency strength",
    "forex rest api",
    "currency strength data feed",
    "forex trading api free",
  ],
  alternates: { canonical: `${BASE_URL}/forex-api` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  authors: [{ name: "Currency Strength Meter" }],
  creator: "Currency Strength Meter",
  publisher: "Currency Strength Meter",
  openGraph: {
    title: "Currency Strength Meter API - Real-Time Forex Strength Data",
    description:
      "Plug real-time currency strength scores into your MT4/MT5 EA, Telegram bot, or trading dashboard. Free tier available, paid plans from $10/month.",
    url: `${BASE_URL}/forex-api`,
    siteName: "Currency Strength Meter",
    type: "website",
    locale: "en_US",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Currency Strength Meter API" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency Strength Meter API - Real-Time Forex Strength Data",
    description:
      "Plug real-time currency strength scores into your MT4/MT5 EA, Telegram bot, or trading dashboard.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

const PLANS = [
  {
    id: "free",
    name: "Free Trial",
    tagline: "Test it in minutes",
    icon: "zap",
    accent: {
      tint: "bg-slate-50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800",
      icon: "bg-slate-700 text-white",
      pill: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      ring: "",
      button: "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-900 dark:text-white",
    },
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
    cta: "Get a free API key",
    href: "/signup",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For live EAs & bots",
    icon: "rocket",
    accent: {
      tint: "bg-blue-50/60 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",
      icon: "bg-blue-600 text-white",
      pill: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      ring: "ring-2 ring-blue-600",
      button: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20",
    },
    price: "$10",
    cadence: "/ month",
    limit: "10,000 requests / month",
    bestFor: "Live trading EAs & bots",
    features: [
      "10,000 requests every 30-day billing cycle",
      "Built for EAs polling every 1-5 minutes",
      "Same API key - no re-integration needed to upgrade",
      "Priority email support",
      "Renew anytime via PayPal, before or after expiry",
    ],
    cta: "Subscribe with PayPal",
    href: "/signup",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "unlimited",
    name: "Unlimited",
    tagline: "For commercial products",
    icon: "crown",
    accent: {
      tint: "bg-emerald-50/60 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900",
      icon: "bg-emerald-600 text-white",
      pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      ring: "",
      button: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20",
    },
    price: "$50",
    cadence: "/ month",
    limit: "Unlimited requests",
    bestFor: "Commercial products & high-volume use",
    features: [
      "No request cap for the entire 30-day cycle",
      "Built for tight-interval polling & multi-account setups",
      "Safe to bundle inside indicators/bots you distribute",
      "Priority email support",
      "Renew anytime via PayPal, before or after expiry",
    ],
    cta: "Subscribe with PayPal",
    href: "/signup",
  },
];

const FAQS = [
  {
    q: "What does the Currency Strength Meter API return?",
    a: "A single JSON object with a relative strength score (0-100) for each of the 8 major currencies - USD, EUR, GBP, JPY, CHF, AUD, CAD, and NZD - calculated from real-time price action across 28 major, minor, and cross pairs.",
  },
  {
    q: "How do I authenticate requests?",
    a: "Every request must include an X-API-KEY header with the API key generated from your dashboard after signing up. Requests without a valid key return a 401 Unauthorized response.",
  },
  {
    q: "How often does the data update?",
    a: "Strength scores are recalculated continuously from live market data, so each request reflects current market conditions rather than a cached or delayed snapshot.",
  },
  {
    q: "Can I use this API directly from an MT4 or MT5 Expert Advisor?",
    a: "Yes. The API is a standard RESTful JSON endpoint, which MQL5's WebRequest() function can call directly. You'll need to whitelist the API domain in your terminal's Tools > Options > Expert Advisors settings before WebRequest() calls will succeed.",
  },
  {
    q: "What happens when I reach my plan's request limit?",
    a: "The API returns a 429 status code with an explanatory error message. Free trial users need to upgrade to a paid plan to continue; Pro subscribers can upgrade to Unlimited, or wait for their next 30-day billing cycle to reset.",
  },
  {
    q: "Do paid plans renew automatically?",
    a: "Each paid plan runs for a fixed 30-day period from the date of payment through PayPal. Your dashboard shows your renewal date, and you can pay again before or after it expires to continue uninterrupted access.",
  },
  {
    q: "What happens if my subscription expires?",
    a: "Your account automatically reverts to the Free plan's limits until you renew. Your API key stays the same - it isn't revoked when a plan expires.",
  },
  {
    q: "Is there a rate limit per second, or just a monthly cap?",
    a: "Plans are enforced as a request cap (100 lifetime on the free trial, 10,000/month on Pro, unlimited on the Unlimited plan). There's no strict per-second throttle, but please poll at a reasonable interval (e.g. once every 30-60 seconds) rather than in a tight loop.",
  },
  {
    q: "Can I use this for a commercial indicator or bot I distribute to other traders?",
    a: "Yes, the Unlimited plan is designed for exactly this use case - commercial products or multi-user indicator distributions where request volume can't be predicted in advance.",
  },
  {
    q: "How do I regenerate my API key if it's compromised?",
    a: "Open your dashboard and click 'Regenerate key'. Your old key is revoked immediately and a new one is issued - just update it in your EA, bot, or app.",
  },
];

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Currency Strength Meter API",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  description: metadata.description,
  url: `${BASE_URL}/forex-api`,
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.price.replace("$", ""),
    priceCurrency: "USD",
  })),
  provider: { "@type": "Organization", name: "Currency Strength Meter", url: BASE_URL },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default async function ForexApiPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let currentPlanId = null;
  if (user) {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("plan_id")
      .eq("user_id", user.id)
      .maybeSingle();
    currentPlanId = subscription?.plan_id || "free";
  }

  return (
    <div className="font-sans max-w-6xl mx-auto px-4 py-10 space-y-16">
      <div className="max-w-4xl mx-auto w-full">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="rounded-[32px] bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 px-6 py-14 sm:py-16 text-center space-y-6 shadow-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400 shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          Live REST API
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white max-w-3xl mx-auto">
          Currency Strength Meter API
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Real-time relative strength scores for all 8 major currencies, delivered as
          lightweight JSON - built for MT4/MT5 Expert Advisors, Telegram bots, and custom
          trading dashboards.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href={user ? "/dashboard" : "/login?redirect=/forex-api"}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 text-sm transition shadow-lg shadow-blue-600/20"
          >
            {user ? "View Dashboard & API Key" : "Get a free API key"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#docs"
            className="inline-flex items-center gap-2 rounded-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 font-semibold px-6 py-3 text-sm hover:bg-slate-100 dark:hover:bg-gray-700 transition text-slate-900 dark:text-white"
          >
            <Code2 className="h-4 w-4" />
            View documentation
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <span>8 currencies scored</span>
          <span>28 pairs analyzed</span>
          <span>MT4 / MT5 ready</span>
          <span>30-day billing via PayPal</span>
        </div>
      </section>

      {/* Pricing - front and center */}
      <section id="pricing" className="space-y-8 scroll-mt-24">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Simple, usage-based pricing
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Start free. Upgrade instantly with PayPal whenever you need more requests.
          </p>
        </div>

        {/* Pass user status and plans array */}
        {/* <ApiPlanCards plans={PLANS} currentPlanId={currentPlanId} isLoggedIn={!!user} /> */}
        <ApiPlanCardsOverview currentPlanId={currentPlanId} isLoggedIn={!!user} />

        <p className="text-center text-xs text-slate-500 dark:text-slate-500">
          Paid plans are billed once via PayPal for a fixed 30-day period and can be purchased
          from this page or your dashboard anytime.
        </p>
      </section>

      {/* Why you need it */}
      <section className="max-w-4xl mx-auto space-y-4 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Why Forex Traders and Developers Need This API
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Manually eyeballing eight currency pairs to figure out which currency is genuinely
          strong and which is genuinely weak is slow, error-prone, and impossible to automate.
          The Currency Strength Meter API solves this by doing the cross-pair math for you and
          returning a single, ranked strength score per currency in one API call - the same
          calculation that powers our{" "}
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            live Currency Strength Meter
          </Link>
          , now available programmatically.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          For algorithmic traders, this turns a subjective "which pair looks strong" judgment
          call into an objective, numeric filter your Expert Advisor or bot can act on
          instantly - no manual chart-flipping required. For indicator and bot developers, it
          means you can ship a currency-strength feature without building and maintaining your
          own real-time correlation engine across 28 pairs.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Because the response is small, cache-friendly JSON, it's fast enough to poll from an
          MT5 EA on every new bar, from a Python or Node.js backend on a schedule, or from a
          Telegram bot that only needs to alert you when two currencies diverge sharply.
        </p>
      </section>

      {/* MT4/MT5 use case */}
      <section className="max-w-4xl mx-auto space-y-4 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-600 p-3 text-white shadow-md">
            <Code2 className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Using the API from MT4 / MT5 (MQL5)
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Because the API is a standard RESTful service returning JSON, it can be called
          directly from an MQL5 Expert Advisor or indicator using the built-in{" "}
          <code className="rounded bg-slate-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm font-mono text-slate-800 dark:text-slate-200">
            WebRequest()
          </code>{" "}
          function. A common pattern is to compare two currency scores and trigger an action -
          for example, sending a Telegram alert - once the gap between them crosses a
          threshold you define.
        </p>
        <pre className="rounded-2xl bg-slate-950 text-slate-100 p-5 text-xs overflow-x-auto shadow-inner border border-slate-800">
{`// Example: alert when EUR and USD strength diverge by 4+ points
double eur = strength["EUR"];
double usd = strength["USD"];

if (MathAbs(eur - usd) >= 4.0) {
   // Trade logic or Telegram WebRequest() alert here
}`}
        </pre>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Before <code className="rounded bg-slate-100 dark:bg-gray-800 px-1 py-0.5 font-mono">{`WebRequest()`}</code>{" "}
          calls will succeed in the MetaTrader terminal, add{" "}
          <code className="rounded bg-slate-100 dark:bg-gray-800 px-1 py-0.5 font-mono">{BASE_URL}</code>{" "}
          to the allowed URL list under <strong>Tools → Options → Expert Advisors</strong>.
        </p>
      </section>

      {/* Docs */}
      <section id="docs" className="max-w-4xl mx-auto space-y-6 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 sm:p-8 rounded-3xl shadow-sm scroll-mt-24">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-600 p-3 text-white shadow-md">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">API Documentation</h2>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Base Endpoint</h3>
          <code className="block rounded-2xl bg-slate-100 dark:bg-gray-800 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 overflow-x-auto">
            GET {API_ENDPOINT}
          </code>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Authentication</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Pass your API key in an <code className="rounded bg-slate-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm font-mono">X-API-KEY</code> header
            with every request. Keys are issued from your{" "}
            <Link href="/dashboard" className="text-blue-600 hover:underline font-medium">
              dashboard
            </Link>{" "}
            after signing up.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Sample Response</h3>
          <pre className="rounded-2xl bg-slate-950 text-slate-100 p-5 text-xs overflow-x-auto shadow-inner border border-slate-800">
{`{
  "success": true,
  "data": {
    "AUD": 10,
    "CAD": 80,
    "CHF": 100,
    "EUR": 90,
    "GBP": 50,
    "JPY": 100,
    "NZD": 30,
    "USD": 100
  }
}`}
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Error Responses</h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-gray-800">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-gray-800 text-left bg-slate-50 dark:bg-gray-800/50">
                  <th className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white">Status</th>
                  <th className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800 text-slate-600 dark:text-slate-300">
                <tr><td className="py-2.5 px-4 font-mono font-medium">401</td><td className="py-2.5 px-4">Missing, invalid, or revoked API key</td></tr>
                <tr><td className="py-2.5 px-4 font-mono font-medium">403</td><td className="py-2.5 px-4">No active subscription, or plan has expired</td></tr>
                <tr><td className="py-2.5 px-4 font-mono font-medium">429</td><td className="py-2.5 px-4">Request limit reached for your current plan</td></tr>
                <tr><td className="py-2.5 px-4 font-mono font-medium">500</td><td className="py-2.5 px-4">Unexpected server error - safe to retry</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto space-y-6 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-amber-500 p-3 text-white shadow-md">
            <Clock3 className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((item) => (
            <div key={item.q} className="rounded-2xl border border-slate-200 dark:border-gray-800 p-5 bg-slate-50/50 dark:bg-gray-800/30">
              <h3 className="font-semibold text-slate-900 dark:text-white">{item.q}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}