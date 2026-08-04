import Breadcrumbs from "@/components/Breadcrumbs";
import ForexToolsGrid from "@/components/ForexToolsGrid";
import { forexTools } from "@/lib/forexTools";

const canonicalUrl = "https://www.currencystrengthsmeters.com/forex-tools";
const pageDescription =
  "Explore free forex calculators and trading tools including position size, pip value, risk-reward, profit, session clock, market status, gold lot size, compounding, volatility, and correlation tools.";

export const metadata = {
  title: "Forex Tools | Free Forex Calculators, Session Tools & Risk Management",
  description: pageDescription,
  keywords: [
    "forex tools",
    "forex calculators",
    "position size calculator",
    "pip value calculator",
    "risk reward calculator",
    "forex session clock",
    "forex correlation tool",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  authors: [{ name: "Currency Strength Meter" }],
  creator: "Currency Strength Meter",
  publisher: "Currency Strength Meter",
  openGraph: {
    title: "Forex Tools | Free Forex Calculators, Session Tools & Risk Management",
    description: pageDescription,
    url: canonicalUrl,
    siteName: "Currency Strength Meter",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.currencystrengthsmeters.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Forex Tools and Calculators - Currency Strength Meter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forex Tools | Free Forex Calculators, Session Tools & Risk Management",
    description: pageDescription,
    images: ["https://www.currencystrengthsmeters.com/og-image.png"],
  },
};

export default function ForexToolsPage() {
  const toolListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: forexTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.currencystrengthsmeters.com/forex-tools/${tool.slug}`,
      name: tool.title,
    })),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          All Tools Available
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
          Forex Tools, Calculators, and Trading Utilities
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
          Explore practical forex calculators and market timing tools designed to support risk management, trade planning, and daily execution. Every page is connected to your core educational content so traders can move naturally between tools, guides, and market analysis.
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <Breadcrumbs />
      </div>

      <section className="mt-12 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-10">
        <ForexToolsGrid tools={forexTools} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolListSchema) }}
      />
    </main>
  );
}
