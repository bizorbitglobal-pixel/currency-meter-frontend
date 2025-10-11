import Header from "@/components/Header";
import CurrencyList from "@/components/CurrencyList";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import Faqs from "@/components/Faqs";
import AddSlot from "@/components/AddSlot";

export default function Home() {
  return (
    <main className="pt-20 md:pt-24 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header />

      {/* Main Currency Strength Meter */}
      <div className="max-w-6xl mx-auto w-full px-4 py-12">
        <CurrencyList />
      </div>

      {/* Ad below meter */}
      <AddSlot slot="1234567890" />

      {/* Informational SEO Sections */}
      <Section
        title="What is a Currency Strength Meter?"
        content="A currency strength meter is a forex trading tool that measures the relative strength of different currencies against each other. Traders use it to quickly identify which currencies are gaining strength and which are weakening, helping them spot trading opportunities more efficiently."
        img="/images/what.webp"
      />

      <AddSlot slot="1234567891" />
      

      <Section
        title="How the Currency Strength Meter Works?"
        content="The meter calculates strength by analyzing exchange rate data from multiple forex pairs. It assigns a strength value to each currency and visualizes them, so you instantly see the strongest and weakest currencies in the market."
        img="/images/image1.webp"
      />

      <AddSlot slot="1234567892" />
      

      <Section
        title="How Often is it Updated?"
        content="Our strength meter updates in real-time using live forex market data. This means you always see the most accurate and up-to-date market conditions before making a trade."
        img="/images/how.webp"
      />

      <AddSlot slot="1234567893" />
      

      <Section
        title="Short-term Strength Indicator"
        content="The short-term strength indicator is designed for scalpers and intraday traders. It highlights quick shifts in momentum, helping traders capture opportunities during volatile sessions."
        img="/images/strength.webp"
      />

      <AddSlot slot="1234567894" />
      

      <Section
        title="Using the Strength Meter in Trading Strategies"
        content="Traders often combine the strength meter with technical indicators like moving averages, candlestick patterns, or support and resistance zones. By aligning strength analysis with price action, you can trade with higher accuracy and confidence."
        img="/images/work.webp"
      />

      {/* Footer */}
      <Faqs />
      <Footer />
    </main>
  );
}
