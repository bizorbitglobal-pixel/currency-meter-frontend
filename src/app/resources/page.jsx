import Breadcrumbs from "@/components/Breadcrumbs";
import AddSlot from "@/components/AddSlot";
import Script from "next/script";

export const metadata = {
  title: "Forex Resources & Tools | Free Trading Education & Guides",
  description: "Curated list of the best free forex trading resources: education platforms, economic calendars, correlation tools, and trading guides. Recommended resources for forex traders of all levels.",
  keywords: [
    "forex resources",
    "forex trading tools",
    "forex education",
    "trading platforms",
    "forex guides",
    "currency trading resources",
    "forex learning",
    "forex market data"
  ]
};

const resources = [
  {
    title: "Babypips Forex School",
    url: "https://www.babypips.com/learn/forex",
    description: "The most comprehensive and beginner-friendly free online forex education course available. BabyPips covers everything from basic forex concepts to advanced trading strategies, including detailed lessons on currency pairs, pips, leverage, fundamental analysis, technical analysis, and trading psychology. Perfect for traders starting their forex journey with easy-to-understand explanations and real-world examples."
  },
  {
    title: "Investopedia Forex Guide",
    url: "https://www.investopedia.com/forex-4427704",
    description: "A trusted source for forex education with comprehensive articles, tutorials, and expert insights covering forex basics, trading strategies, risk management, and market analysis. Investopedia's content is written by financial experts and regularly updated with current market information, making it valuable for both beginners learning the fundamentals and experienced traders seeking advanced strategies."
  },
  {
    title: "TradingView Economic Calendar",
    url: "https://www.tradingview.com/markets/currencies/economic-calendar/",
    description: "An essential tool for forex traders that tracks all scheduled economic events, reports, and announcements worldwide. The economic calendar shows the impact level of each event (high, medium, low) and actual vs. forecasted economic data. Understanding the economic calendar is crucial because major economic news releases create volatility spikes that can trigger significant price movements in currency pairs."
  },
  {
    title: "Myfxbook Correlation Tool",
    url: "https://www.myfxbook.com/forex-market/correlation",
    description: "A sophisticated tool for analyzing correlations between different currency pairs, helping traders understand which pairs move together and which move in opposite directions. Understanding pair correlations is vital for proper risk management and portfolio diversification, as trading multiple highly correlated pairs increases overall risk exposure without providing additional opportunity."
  },
  {
    title: "OANDA Currency Converter",
    url: "https://www.oanda.com/currency-converter/en/",
    description: "A real-time currency converter powered by OANDA, one of the world's largest forex data providers. Use it to quickly convert between any two currencies with live, accurate exchange rates. Useful for travelers, businesses, and traders who need quick currency conversion references based on actual market prices."
  },
  {
    title: "MetaTrader 4/5 Platform",
    url: "https://www.metatrader4.com/en",
    description: "The industry-standard trading platform used by the majority of forex traders worldwide. MetaTrader 4 (MT4) and MetaTrader 5 (MT5) offer powerful charting capabilities, a vast library of technical indicators, automated trading through Expert Advisors, and compatibility with most forex brokers. Most forex brokers provide their own MT4/MT5 platform, making it the most important platform to master as a forex trader."
  },
  {
    title: "Forex Factory Forum",
    url: "https://www.forexfactory.com/",
    description: "The most active and respected community forum for forex traders worldwide. Forex Factory provides forums where traders share strategies, discuss market events, post economic calendars, and learn from each other's experiences. The community includes professional traders, analysts, and market enthusiasts who share valuable insights and real-world trading advice daily."
  },
  {
    title: "Currency Strength Meter Blog",
    url: "/blog",
    description: "Our own collection of in-depth guides, trading strategies, tutorials, and educational articles specifically focused on currency strength meter analysis and advanced forex trading techniques. Our blog covers topics like trading psychology, technical analysis, fundamental analysis, risk management, and real-world trading scenarios. All content is free and regularly updated with new insights and strategies."
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
