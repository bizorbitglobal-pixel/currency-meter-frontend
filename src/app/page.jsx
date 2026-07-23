import H1Header from "@/components/H1Header";
import CurrencyList from "@/components/CurrencyList";
import Section from "@/components/Section";
import Faqs from "@/components/Faqs";
import AddSlot from "@/components/AddSlot";
import AdBanner from "@/components/AddBanner";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Exile } from "next/font/google";
import AuthorCard from "@/components/AuthorCard";
import { getAuthor } from "@/lib/authors";
import ExnessCTA from "@/components/ExnessCTA";

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
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a Currency Strength Meter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Currency Strength Meter is an advanced forex trading tool that measures and displays the relative strength of major currencies in real-time. It provides a consolidated view of all major currencies (USD, EUR, GBP, JPY, CAD, CHF, AUD, NZD) and their individual strength scores on a single dashboard. This enables traders to quickly identify which currencies are gaining momentum and which are losing ground, making it easier to identify potential trading opportunities.",
        },
      },
      {
        "@type": "Question",
        name: "How does a Currency Strength Meter work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Currency Strength Meter analyzes real-time price movements across all 28 major and minor forex pairs simultaneously. The algorithm calculates the performance of each individual currency by examining how it behaves against every other major currency it trades with. Results are presented on a visual scale from 0-10, allowing traders to instantly see which currencies are strongest, weakest, and neutral in the current market environment.",
        },
      },
      {
        "@type": "Question",
        name: "Which currency is the strongest today?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The strongest currency changes throughout the day depending on market movements and economic data. You can view live, real-time updates directly in our Currency Strength Meter tool, which updates every few seconds to reflect the latest market conditions.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use the Currency Strength Meter for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our Currency Strength Meter is completely free to use for all traders, with no hidden fees, subscriptions, or premium tiers required. The real-time data updates continuously every few seconds, providing you with institutional-grade trading insights at no cost.",
        },
      },
      {
        "@type": "Question",
        name: "Is the Currency Strength Meter suitable for beginners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. The Currency Strength Meter is specifically designed to be beginner-friendly while remaining powerful enough for experienced traders. Beginners can use the simple 'Strong vs. Weak' strategy to identify the strongest and weakest currencies, then trade the pair that combines them. This approach eliminates guesswork and helps beginners make more informed, confidence-based trading decisions.",
        },
      },
    ],
  };
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
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

      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="rounded-2xl border border-yellow-400 bg-slate-950 p-6 shadow-2xl shadow-yellow-500/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-300">
                Start Trading Today
              </p>
              <h3 className="mt-2 text-2xl font-bold text-yellow-200">
                Open your Exness account
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Launch your trading journey through a simple account setup.
              </p>
            </div>
            <a
              href="https://one.exnessonelink.com/a/txt6jvjtma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
            >
              Start Trading
            </a>
          </div>
        </div>
      </section>

      {/* Introductory Section */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl border border-blue-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Master Forex Trading with Real-Time Currency Strength Analysis
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Welcome to the Currency Strength Meter—your free, real-time tool for
            identifying the strongest and weakest forex currencies. Whether
            you're a beginner just starting your forex journey or an experienced
            trader looking for a professional-grade analysis tool, our meter
            provides institutional-quality insights at no cost.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Instead of analyzing dozens of individual currency pairs manually,
            our advanced algorithm calculates the relative strength of eight
            major currencies (USD, EUR, GBP, JPY, CAD, CHF, AUD, NZD) across all
            28 major forex pairs in real-time. This gives you a clear,
            actionable market overview in a single glance.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                ✅ 100% Free
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No hidden fees, subscriptions, or premium tiers. Use our tool
                completely free.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                ⚡ Real-Time Updates
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Data refreshes every few seconds to reflect the latest market
                conditions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                🎯 Beginner-Friendly
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Designed for traders of all levels with a simple, intuitive
                interface.
              </p>
            </div>
          </div>
          <div className="mt-6 flex gap-4 flex-wrap">
            <Link
              href="/getting-started"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/blog"
              className="border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

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
          A currency strength meter is a vital forex trading tool that measures
          the relative strength of different major currencies against each
          other. Instead of looking at a single forex pair (like EUR/USD), the
          strength meter provides a macro view of the entire forex market in one
          simple, easy-to-read dashboard.
        </p>
        <p>
          Traders use this tool to quickly identify which currencies are gaining
          momentum (strengthening) and which are losing ground (weakening). By
          isolating the absolute strength of a single currency, traders can 
          identify potential trading opportunities 
          and better understand market momentum.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong>Identify Trends:</strong> Quickly see which side of the
            market is dominating.
          </li>
          <li>
            <strong>Confirm Trade Entries:</strong> Use strength to validate
            signals from other technical indicators.
          </li>
          <li>
            <strong>Avoid Ranging Markets:</strong> Stay out of low-volatility
            pairs where strength is neutral.
          </li>
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
          The meter calculates strength by analyzing real-time exchange rate
          data across all 28 major forex currency pairs. It looks at the price
          action of each pair and aggregates the performance of individual
          currencies (like USD, EUR, GBP, JPY, AUD, NZD, CAD, and CHF) to assign
          a definitive strength score.
        </p>
        <p>
          For example, if the US Dollar (USD) is rising against the Euro, Pound,
          Yen, and Franc simultaneously, the algorithm calculates a high
          strength rating for the USD. The results are instantly visualized on a
          scale (usually 0 to 10), allowing you to see the strongest and weakest
          market players at a glance, without having to manually check dozens of
          charts.
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
          The forex market moves around the clock, and timely information is essential for monitoring currency momentum. Our Currency Strength Meter refreshes every minute, analyzing price movements across 28 major forex currency pairs to calculate the relative strength of the eight major currencies.
        </p>
        <p>
          Whether you're trading during the London, New York, or Asian session, you'll always have an up-to-date view of currency strength to help identify strong and weak currencies in the market.
        </p>
      </Section>

      <Section
        title="Best Strategies for Trading with Strength"
        img="/images/strength.webp"
      >
        <p>
          The most effective way to use a currency meter is the{" "}
          <strong>&quot;Strong vs. Weak&quot; strategy</strong>. This involves
          pairing the strongest currency currently on the board with the weakest
          currency to find the pair with the highest likelihood of a strong
          directional trend.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong>Trend Trading:</strong> If GBP is strong (8/10) and JPY is
            weak (2/10), look for buy opportunities on GBP/JPY.
          </li>
          <li>
            <strong>Reversals:</strong> If a currency hits maximum strength
            (10/10) after a long rally, it may be overbought and due for a
            pullback.
          </li>
          <li>
            <strong>Short-Term Scalping:</strong> Monitor sudden, rapid changes
            in strength on lower timeframes to catch intraday momentum spikes.
          </li>
        </ul>
        <p className="mt-2 text-sm italic text-gray-500">
          Note: Always combine strength readings with chart analysis, such as
          support/resistance levels and price action, before placing a trade.
        </p>
      </Section>

      <Section title="Common Trading Mistakes to Avoid" img="/images/work.webp">
        <p>
          While the currency strength meter is a powerful tool, it should not be
          used as a standalone entry signal. Traders often make the mistake of
          buying or selling blindly based solely on the meter&#39;s current
          reading.
        </p>
        <p>
          Avoid trading right before major economic news releases (like NFP or
          CPI reports), as extreme volatility can cause sudden spikes and
          temporary false readings on the meter. Furthermore, do not jump into
          trades when all currencies are showing neutral strength—this indicates
          a flat, ranging market where breakouts are likely to fail.
        </p>
      </Section>

     {/* <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
          <ExnessCTA />
        </div>
      </div> */}
      

      {/* Financial Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 py-8 mb-4 border-t border-gray-200 dark:border-gray-800">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
          <strong className="block mb-2 text-gray-800 dark:text-gray-200">
            Financial Disclaimer:
          </strong>
          The information and tools provided by Currency Strength Meter are for
          educational and informational purposes only and do not constitute
          financial advice. Forex trading involves significant risk of loss and
          is not suitable for all investors. Past performance is not indicative
          of future results. Always conduct your own research and consult with a
          certified financial advisor before making investment decisions.
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
                        <span
                          key={tag}
                          className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                        >
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
                <div className="px-5 pb-5">
                  <AuthorCard author={getAuthor(post.author)} compact />
                </div>
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
    </main>
  );
}
