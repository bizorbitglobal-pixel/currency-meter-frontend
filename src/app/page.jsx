import Header from "@/components/Header";
import H1Header from "@/components/H1Header";
import CurrencyList from "@/components/CurrencyList";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import Faqs from "@/components/Faqs";
import AddSlot from "@/components/AddSlot";
import AdBanner from "@/components/AddBanner";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export default async function Home() {
  // Fetch recent posts
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  const posts = files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return {
      slug: file.replace(/\.md$/, ""),
      ...data,
    };
  });

  // Sort by date and take latest 3
  const recentPosts = posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Currency Strength Meter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Currency Strength Meter is a forex trading tool that compares the strength of major currencies in real-time, helping traders identify the strongest and weakest currencies."
        }
      },
      {
        "@type": "Question",
        "name": "How does a Currency Strength Meter work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It analyzes price movements across different forex pairs and calculates relative strength or weakness for each currency, giving you a quick market overview."
        }
      },
      {
        "@type": "Question",
        "name": "Which currency is the strongest today?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The strongest currency changes throughout the day depending on market movements. You can view live updates directly in our tool."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use the Currency Strength Meter for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our Currency Strength Meter is completely free to use with real-time updates for traders worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Currency Strength Meter suitable for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Beginners can use it to quickly understand market sentiment and make more informed forex trading decisions."
        }
      }
    ]
  };
  return (
    <main className="pt-20 md:pt-24 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header />
      {/* Example ad slot (468x60 banner) */}
      {/* <AdBanner
        keyId="ef9445ea813717165ee0d59dc8f378c6"
        srcDomain="www.highperformanceformat.com"
        width={468}
        height={60}
        format="iframe"
      /> */}

      {/* H1 Heading */}
      <H1Header />

      {/* Main Currency Strength Meter */}
      <div className="max-w-6xl mx-auto w-full px-4 py-6">
        <CurrencyList />
      </div>

      {/* Ad below meter */}
      <AddSlot />
      {/* Informational SEO Sections */}
      <Section
        title="What is a Currency Strength Meter?"
        img="/images/what.webp"
        class="rounded-xl shadow-lg"
        srcset="/images/what-300w.webp 300w, /images/what-600w.webp 600w, /images/what-1200w.webp 1200w"
        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
      >
        <p>
          A currency strength meter is a vital forex trading tool that measures the relative strength of different major currencies against each other. Instead of looking at a single forex pair (like EUR/USD), the strength meter provides a macro view of the entire forex market in one simple, easy-to-read dashboard.
        </p>
        <p>
          Traders use this tool to quickly identify which currencies are gaining momentum (strengthening) and which are losing ground (weakening). By isolating the absolute strength of a single currency, traders can spot high-probability trading setups more efficiently, avoiding sideways or choppy markets where neither currency has a clear advantage.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Identify Trends:</strong> Quickly see which side of the market is dominating.</li>
          <li><strong>Confirm Trade Entries:</strong> Use strength to validate signals from other technical indicators.</li>
          <li><strong>Avoid Ranging Markets:</strong> Stay out of low-volatility pairs where strength is neutral.</li>
        </ul>
      </Section>

      <Section
        title="How the Currency Strength Meter Works"
        img="/images/image1.webp"
        class="rounded-xl shadow-lg"
        srcset="/images/what-300w.webp 300w, /images/what-600w.webp 600w, /images/what-1200w.webp 1200w"
        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
      >
        <p>
          The meter calculates strength by analyzing real-time exchange rate data across all 28 major forex currency pairs. It looks at the price action of each pair and aggregates the performance of individual currencies (like USD, EUR, GBP, JPY, AUD, NZD, CAD, and CHF) to assign a definitive strength score.
        </p>
        <p>
          For example, if the US Dollar (USD) is rising against the Euro, Pound, Yen, and Franc simultaneously, the algorithm calculates a high strength rating for the USD. The results are instantly visualized on a scale (usually 0 to 10), allowing you to see the strongest and weakest market players at a glance, without having to manually check dozens of charts.
        </p>
      </Section>

      <Section
        title="Real-Time Data & Updates"
        img="/images/how.webp"
        class="rounded-xl shadow-lg"
        srcset="/images/what-300w.webp 300w, /images/what-600w.webp 600w, /images/what-1200w.webp 1200w"
        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
      >
        <p>
          In the fast-paced forex market, delayed data can lead to missed opportunities or losing trades. Our live currency strength meter updates continuously in real-time, pulling tick-by-tick data directly from global forex liquidity providers.
        </p>
        <p>
          This ensures that whether you are trading the London open, the New York overlap, or the quieter Asian session, you always have the most accurate and up-to-date reflection of market sentiment and momentum before executing a trade.
        </p>
      </Section>

      <Section
        title="Best Strategies for Trading with Strength"
        img="/images/strength.webp"
      >
        <p>
          The most effective way to use a currency meter is the <strong>&quot;Strong vs. Weak&quot; strategy</strong>. This involves pairing the strongest currency currently on the board with the weakest currency to find the pair with the highest likelihood of a strong directional trend.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Trend Trading:</strong> If GBP is strong (8/10) and JPY is weak (2/10), look for buy opportunities on GBP/JPY.</li>
          <li><strong>Reversals:</strong> If a currency hits maximum strength (10/10) after a long rally, it may be overbought and due for a pullback.</li>
          <li><strong>Short-Term Scalping:</strong> Monitor sudden, rapid changes in strength on lower timeframes to catch intraday momentum spikes.</li>
        </ul>
        <p className="mt-2 text-sm italic text-gray-500">
          Note: Always combine strength readings with chart analysis, such as support/resistance levels and price action, before placing a trade.
        </p>
      </Section>

      <Section
        title="Common Trading Mistakes to Avoid"
        img="/images/work.webp"
      >
        <p>
          While the currency strength meter is a powerful tool, it should not be used as a standalone entry signal. Traders often make the mistake of buying or selling blindly based solely on the meter&#39;s current reading.
        </p>
        <p>
          Avoid trading right before major economic news releases (like NFP or CPI reports), as extreme volatility can cause sudden spikes and temporary false readings on the meter. Furthermore, do not jump into trades when all currencies are showing neutral strength—this indicates a flat, ranging market where breakouts are likely to fail.
        </p>
      </Section>

      {/* Financial Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 py-8 mb-4 border-t border-gray-200 dark:border-gray-800">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
          <strong className="block mb-2 text-gray-800 dark:text-gray-200">Financial Disclaimer:</strong>
          The information and tools provided by Currency Strength Meter are for educational and informational purposes only and do not constitute financial advice. Forex trading involves significant risk of loss and is not suitable for all investors. Past performance is not indicative of future results. Always conduct your own research and consult with a certified financial advisor before making investment decisions.
        </div>
      </div>

      {/* Recent Posts Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Latest Trading Insights
          </h2>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline hidden sm:block"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => {
            const safeOgImage =
              post.ogImage && post.ogImage.trim() !== ""
                ? post.ogImage.startsWith("http")
                  ? post.ogImage
                  : `https://www.currencystrengthsmeters.com${post.ogImage}`
                : "https://www.currencystrengthsmeters.com/og-cache/currency-correlation-chart-explained.jpg";

            return (
              <article
                key={post.slug}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={safeOgImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                      {post.excerpt || post.description}
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            View all posts →
          </Link>
        </div>
      </section>

      {/* FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Footer */}
      <Faqs />
      <Footer />
    </main>
  );
}
