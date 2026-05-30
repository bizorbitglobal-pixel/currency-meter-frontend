import Breadcrumbs from "@/components/Breadcrumbs";
import AddSlot from "@/components/AddSlot";
import Script from "next/script";

export const metadata = {
  title: "FAQ | Currency Strength Meter - Forex Trading Questions Answered",
  description: "Find answers to frequently asked questions about the Currency Strength Meter, forex trading, currency analysis, and how to use our tools for better trading decisions. Expert guidance for all levels.",
  keywords: [
    "currency strength meter FAQ",
    "forex trading questions",
    "how to use currency strength meter",
    "forex meter explained",
    "currency strength analysis",
    "forex trading tips",
    "currency strength trading",
    "forex beginner questions"
  ]
};

const faqs = [
  {
    question: "What is a Currency Strength Meter?",
    answer:
      "A Currency Strength Meter is an advanced forex trading tool that measures and displays the relative strength of major currencies in real-time. Unlike analyzing individual currency pairs one by one, the meter provides a consolidated view of all major currencies (USD, EUR, GBP, JPY, CAD, CHF, AUD, NZD) and their individual strength scores on a single dashboard. This enables traders to quickly identify which currencies are gaining momentum and which are losing ground, making it easier to spot high-probability trading opportunities without spending hours analyzing multiple charts."
  },
  {
    question: "How does the Currency Strength Meter work?",
    answer:
      "The Currency Strength Meter works by analyzing real-time price movements across all 28 major and minor forex pairs simultaneously. The algorithm calculates the performance of each individual currency by examining how it behaves against every other major currency it trades with. For example, if the US Dollar (USD) is rising against the Euro, British Pound, Japanese Yen, Swiss Franc, Australian Dollar, Canadian Dollar, and New Zealand Dollar all at the same time, the meter assigns a high strength score (like 8/10 or 9/10) to the USD. The results are presented on a visual scale, typically from 0-10, allowing traders to instantly see which currencies are strongest, weakest, and neutral in the current market environment."
  },
  {
    question: "Is the Currency Strength Meter free to use?",
    answer:
      "Yes! Our Currency Strength Meter is completely free to use for all traders, with no hidden fees, subscriptions, or premium tiers required. The real-time data updates continuously every few seconds, providing you with the most current market information at no cost. We believe that retail traders deserve access to institutional-grade trading tools, which is why we offer this powerful meter free to everyone, from complete beginners to professional traders."
  },
  {
    question: "Can beginners use the Currency Strength Meter?",
    answer:
      "Absolutely. The Currency Strength Meter is specifically designed to be beginner-friendly while remaining powerful enough for experienced traders. Beginners often struggle with analyzing multiple currency pairs and technical indicators, but the meter simplifies this by showing the market's overall sentiment in a single glance. New traders can use the simple 'Strong vs. Weak' strategy: identify the strongest and weakest currencies on the meter, then trade the pair that combines them (for example, if GBP is strongest and JPY is weakest, trade GBP/JPY). This approach eliminates guesswork and helps beginners make more informed, confidence-based trading decisions."
  },
  {
    question: "How often is the data updated?",
    answer:
      "The Currency Strength Meter updates in real-time, with data refreshing every few seconds to reflect the latest market conditions. We pull tick-by-tick data directly from global forex liquidity providers and top-tier market data sources to ensure accuracy and speed. This frequent updating is crucial for traders because the forex market moves rapidly, and delayed information can lead to missed opportunities or entering trades based on outdated market sentiment. By providing live updates, we ensure you always have the most current picture of currency strength before placing your trades."
  },
  {
    question: "What forex pairs are supported?",
    answer:
      "We support all 28 major and minor forex currency pairs, ensuring comprehensive market coverage. This includes the major pairs (EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD), their crosses (EUR/GBP, EUR/JPY, GBP/JPY, AUD/JPY, etc.), and additional pairs involving the eight major currencies: USD, EUR, GBP, JPY, CAD, CHF, AUD, and NZD. By analyzing all 28 pairs, our algorithm can accurately determine the absolute strength of each currency without bias, giving you a complete and reliable view of the forex market."
  },
  {
    question: "Can I use the meter for day trading or swing trading?",
    answer:
      "Yes, the Currency Strength Meter is highly versatile and effective for both day trading and swing trading strategies. Day traders can use the meter to identify intraday momentum, spotting which currencies are gaining or losing strength within hours or minutes. Swing traders can use it to identify longer-term currency trends that develop over days or weeks. The meter's real-time updates make it ideal for active traders who need quick decisions, but its underlying trend data is also valuable for swing traders planning multi-day positions. Whether you're a scalper, day trader, or swing trader, the meter provides actionable insights for your specific trading timeframe."
  },
  {
    question: "Do you offer educational resources?",
    answer:
      "Yes, we provide extensive educational resources to help traders maximize their use of the Currency Strength Meter and improve their overall trading skills. Our blog features in-depth guides on topics like 'How to Use a Currency Strength Meter in Forex Trading', 'Currency Strength Meter Basics', 'Day Trading with Strength Meter', 'Combining Currency Strength Meters with Price Action', and much more. We also provide tutorials on forex trading fundamentals, technical analysis, risk management, trading psychology, and advanced strategies. All of our educational content is free and designed to help traders at all levels—from complete beginners to advanced professionals."
  },
  {
    question: "Is the Currency Strength Meter suitable for scalping?",
    answer:
      "Yes, the meter is excellent for scalping strategies. Scalpers make multiple small trades targeting quick profits over minutes or even seconds. The Currency Strength Meter's real-time updates allow scalpers to identify sudden spikes in currency strength, which often precede intraday momentum moves. By focusing on pairs where the strength difference is most extreme (strongest vs. weakest), scalpers can increase the probability of their trades moving in the right direction quickly. Many professional scalpers use strength meter data as confirmation for their technical entries, helping them avoid choppy, ranging markets where scalps are more likely to fail."
  },
  {
    question: "How do I contact support?",
    answer:
      "We value your feedback and questions. You can reach our support team in multiple ways: use the contact form on our website, email us directly at bizorbit.global@gmail.com, or check our Resources page for additional support and helpful links. We aim to respond to all inquiries as quickly as possible. If you have questions about using the Currency Strength Meter, suggestions for improvements, or need technical assistance, please don't hesitate to get in touch—we're here to help."
  },
  {
    question: "What makes your Currency Strength Meter different from others?",
    answer:
      "Our Currency Strength Meter stands out due to its accuracy, speed, and user-friendly design. We pull data directly from top-tier forex liquidity providers, ensuring that our strength calculations are based on real market movements rather than approximations. The meter updates in real-time with minimal latency, crucial for traders who need current information. Additionally, our platform combines the meter with extensive educational resources, helping traders not just see the data but understand how to use it effectively in their trading strategies. The meter is also completely free with no hidden fees or premium tiers, making professional-grade trading tools accessible to all traders regardless of their account size."
  }
];

export default function FAQPage() {
  // Build FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <Breadcrumbs />
      <AddSlot />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {faqs.map((faq, idx) => (
          <div key={idx} className="py-6">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
      <AddSlot />
      {/* JSON-LD FAQPage Schema for SEO */}
      <Script
        id="faqpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
