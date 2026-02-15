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
        content="A currency strength meter is a forex trading tool that measures the relative strength of different currencies against each other. Traders use it to quickly identify which currencies are gaining strength and which are weakening, helping them spot trading opportunities more efficiently."
        img="/images/what.webp"
        class="rounded-xl shadow-lg"
        srcset="/images/what-300w.webp 300w, /images/what-600w.webp 600w, /images/what-1200w.webp 1200w"
        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
      />

      <Section
        title="How the Currency Strength Meter Works?"
        content="The meter calculates strength by analyzing exchange rate data from multiple forex pairs. It assigns a strength value to each currency and visualizes them, so you instantly see the strongest and weakest currencies in the market."
        img="/images/image1.webp"
        class="rounded-xl shadow-lg"
        srcset="/images/what-300w.webp 300w, /images/what-600w.webp 600w, /images/what-1200w.webp 1200w"
        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
      />

      <Section
        title="How Often is it Updated?"
        content="Our strength meter updates in real-time using live forex market data. This means you always see the most accurate and up-to-date market conditions before making a trade."
        img="/images/how.webp"
        class="rounded-xl shadow-lg"
        srcset="/images/what-300w.webp 300w, /images/what-600w.webp 600w, /images/what-1200w.webp 1200w"
        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
      />

      <Section
        title="Short-term Strength Indicator"
        content="The short-term strength indicator is designed for scalpers and intraday traders. It highlights quick shifts in momentum, helping traders capture opportunities during volatile sessions."
        img="/images/strength.webp"
      />

      <Section
        title="Using the Strength Meter in Trading Strategies"
        content="Traders often combine the strength meter with technical indicators like moving averages, candlestick patterns, or support and resistance zones. By aligning strength analysis with price action, you can trade with higher accuracy and confidence."
        img="/images/work.webp"
      />

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
