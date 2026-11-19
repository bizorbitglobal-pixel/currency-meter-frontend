import Breadcrumbs from "@/components/Breadcrumbs";
import TradingViewDashboardWidgets from "@/components/TradingViewDashboardWidgets";

const canonicalUrl =
  "https://www.currencystrengthsmeters.com/currency-strength-chart-analysis";
const pageDescription =
  "Explore live forex charts, currency pair data, global market summaries, forex cross rates, and market screeners in one free TradingView-powered analysis dashboard.";

export const metadata = {
  title: "Forex Market Dashboard | Live Charts & Currency Analysis",
  description: pageDescription,
  keywords: [
    "forex market dashboard",
    "live forex chart",
    "forex market data",
    "currency pair analysis",
    "forex cross rates",
    "global market summary",
    "forex trading analysis",
    "TradingView forex widgets",
  ],
  alternates: { canonical: canonicalUrl },
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
    title: "Forex Market Dashboard | Live Charts & Currency Analysis",
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
        alt: "Live forex charts and market data dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forex Market Dashboard | Live Charts & Currency Analysis",
    description: pageDescription,
    images: ["https://www.currencystrengthsmeters.com/og-image.png"],
  },
};

const dashboardSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Forex Market Dashboard",
  description: pageDescription,
  url: canonicalUrl,
  isPartOf: {
    "@type": "WebSite",
    name: "Currency Strength Meter",
    url: "https://www.currencystrengthsmeters.com",
  },
  about: {
    "@type": "Thing",
    name: "Forex market analysis",
  },
};

export default function CurrencyStrengthChartAnalysisPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-12 dark:bg-gray-900">
      <div className="pt-6 sm:pt-8">
        <Breadcrumbs />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6">
        <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:mb-10 sm:text-5xl">
          Forex Market Dashboard
        </h1>
        <TradingViewDashboardWidgets />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dashboardSchema) }}
      />
    </main>
  );
}
