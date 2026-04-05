import Breadcrumbs from "@/components/Breadcrumbs";
import AddSlot from "@/components/AddSlot";
import Script from "next/script";

export const metadata = {
  title: "Forex Resources | Currency Strength Meter",
  description: "Hand-picked resources for forex traders: tools, guides, books, and websites to help you succeed in the currency markets."
};

const resources = [
  {
    title: "Babypips Forex School",
    url: "https://www.babypips.com/learn/forex",
    description: "The most popular free online course for learning forex trading from scratch."
  },
  {
    title: "Investopedia Forex Guide",
    url: "https://www.investopedia.com/forex-4427704",
    description: "Comprehensive articles and tutorials on forex basics, strategies, and risk management."
  },
  {
    title: "TradingView Economic Calendar",
    url: "https://www.tradingview.com/markets/currencies/economic-calendar/",
    description: "Live global economic calendar for tracking high-impact news events."
  },
  {
    title: "Myfxbook Correlation Tool",
    url: "https://www.myfxbook.com/forex-market/correlation",
    description: "Analyze currency pair correlations to manage risk and diversify trades."
  },
  {
    title: "OANDA Currency Converter",
    url: "https://www.oanda.com/currency-converter/en/",
    description: "Quickly convert between currencies using real-time rates."
  },
  {
    title: "MetaTrader 4/5 Platform",
    url: "https://www.metatrader4.com/en",
    description: "The most popular trading platform for forex traders worldwide."
  },
  {
    title: "Forex Factory Forum",
    url: "https://www.forexfactory.com/",
    description: "Active community forum for forex traders to share strategies and market insights."
  },
  {
    title: "Currency Strength Meter Blog",
    url: "/blog",
    description: "Our own in-depth guides, strategies, and trading psychology articles."
  }
];

export default function ResourcesPage() {
  // Build ItemList schema for resources
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Forex Resources",
    "itemListElement": resources.map((res, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": res.title,
      "description": res.description,
      "url": res.url.startsWith("http") ? res.url : `https://www.currencystrengthsmeters.com${res.url}`
    }))
  };
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Forex Resources</h1>
      <Breadcrumbs />
      <AddSlot />
      <div className="space-y-6">
        {resources.map((res, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <a
              href={res.url}
              target={res.url.startsWith("http") ? "_blank" : undefined}
              rel={res.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {res.title}
            </a>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{res.description}</p>
          </div>
        ))}
      </div>
      <AddSlot />
      {/* JSON-LD ItemList Schema for SEO */}
      <Script
        id="resources-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </div>
  );
}
