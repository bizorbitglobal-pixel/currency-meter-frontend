import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  BadgeDollarSign,
  BookOpen,
  ChartColumn,
  Clock3,
  Coins,
  GitCompareArrows,
  Globe2,
  Ruler,
  Scale,
  Target,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ForexToolCalculator from "@/components/ForexToolCalculator";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";
import RelatedPosts from "@/components/RelatedPosts";
import { forexTools, getForexTool } from "@/lib/forexTools";

const iconMap = {
  target: Target,
  ruler: Ruler,
  scale: Scale,
  "badge-dollar-sign": BadgeDollarSign,
  "clock-3": Clock3,
  "globe-2": Globe2,
  coins: Coins,
  "chart-column": ChartColumn,
  activity: Activity,
  "git-compare-arrows": GitCompareArrows,
};

const toneMap = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  purple: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  violet: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300",
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderLinkedText(text, regex, hrefByLabel) {
  if (!text || !regex) return text;

  const output = [];
  let lastIndex = 0;
  let match = regex.exec(text);

  while (match) {
    const [matchedText] = match;
    const index = match.index;

    if (index > lastIndex) {
      output.push(text.slice(lastIndex, index));
    }

    const href = hrefByLabel.get(matchedText.toLowerCase());
    if (href) {
      output.push(
        <Link key={`${matchedText}-${index}`} href={href} className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
          {matchedText}
        </Link>
      );
    } else {
      output.push(matchedText);
    }

    lastIndex = index + matchedText.length;
    match = regex.exec(text);
  }

  if (lastIndex < text.length) {
    output.push(text.slice(lastIndex));
  }

  return output.length > 0 ? output : text;
}

function buildStructuredToolContent(tool) {
  const relatedTitles = forexTools
    .filter((item) => tool.relatedSlugs.includes(item.slug))
    .map((item) => item.title);

  const relatedList = relatedTitles.length > 0
    ? relatedTitles.slice(0, 3).join(", ")
    : "Position Size Calculator, Pip Value Calculator, and Risk-Reward Calculator";

  const what = Array.isArray(tool.whatIsIt) && tool.whatIsIt.length > 0
    ? tool.whatIsIt
    : [
      `The ${tool.title} is an educational decision-support calculator created to help traders plan before they execute orders, review outcomes after a trade, and keep actions aligned with a defined trading process.`,
      `${tool.description} This tool is intended for practical planning, not prediction, and works best when used together with ${relatedList}.`,
    ];

  const why = Array.isArray(tool.whyItMatters) && tool.whyItMatters.length > 0
    ? tool.whyItMatters
    : [
      `Most trading mistakes happen before the order is placed. Structured calculators reduce emotional decisions by converting trade ideas into measurable numbers.`,
      `For stronger planning context, combine this page with Intelligence Blog articles, the Forex Tools hub, and related models such as ${relatedList}.`,
    ];

  const how = Array.isArray(tool.howToUseIt) && tool.howToUseIt.length > 0
    ? tool.howToUseIt
    : [
      `Start by entering realistic inputs based on your trade plan, current market context, and account constraints. Avoid optimistic assumptions and include conservative values when uncertain.`,
      `Cross-check your output with Position Size Calculator, Pip Value Calculator, and Risk-Reward Calculator when relevant, then confirm the final setup against your written rules before execution.`,
    ];

  const deepDive = Array.isArray(tool.expertInsights) && tool.expertInsights.length > 0
    ? tool.expertInsights
    : [
      `Market conditions change, but a repeatable planning structure improves consistency. Using ${tool.title} before execution helps reduce random decision-making and keeps your process rule-based.`,
      `When paired with the Forex Tools hub and Intelligence Blog education library, this page supports a full trade workflow from idea to execution and post-trade review.`,
    ];

  const providedExamples = Array.isArray(tool.examples) ? [...tool.examples] : [];

  return {
    what,
    why,
    how,
    deepDive,
    examples: providedExamples,
  };
}

function buildStructuredFaqs(tool) {
  const faqs = Array.isArray(tool.faqs) ? [...tool.faqs] : [];
  const fallbackFaqs = [
    {
      question: `What is the main purpose of the ${tool.title}?`,
      answer: `${tool.title} is designed to help traders convert raw trade assumptions into structured decision inputs before execution. It is an educational planning tool, not a guarantee of future results.`,
    },
    {
      question: `How should beginners use ${tool.shortTitle} safely?`,
      answer: `Start with conservative assumptions, compare at least two scenarios, and cross-check outputs with related calculators in the Forex Tools section. Keep risk parameters strict and avoid over-leverage.`,
    },
    {
      question: `Can ${tool.shortTitle} be used for live trading decisions?`,
      answer: `It can support live planning, but real outcomes depend on spread, slippage, fees, liquidity, and execution quality. Always verify final trade terms with your broker before placing orders.`,
    },
    {
      question: `How often should I recheck values in ${tool.shortTitle}?`,
      answer: `Recheck whenever market conditions, volatility, or trade structure changes. Updating assumptions before execution helps keep your risk and expectations aligned.`,
    },
    {
      question: `Is ${tool.shortTitle} financial advice?`,
      answer: `No. This tool and its examples are for educational and informational purposes only. Trading involves significant risk and may not be suitable for every investor.`,
    },
    {
      question: `Which other tools should I combine with ${tool.shortTitle}?`,
      answer: `For stronger planning, use related pages like Position Size Calculator, Pip Value Calculator, Risk-Reward Calculator, and relevant articles in the Intelligence Blog.`,
    },
  ];

  while (faqs.length < 10 && fallbackFaqs.length > 0) {
    faqs.push(fallbackFaqs.shift());
  }

  return faqs;
}

function buildToolKeywords(tool) {
  const baseKeywords = Array.isArray(tool.keywords) ? tool.keywords : [];
  const slugPhrase = tool.slug.replace(/-/g, " ");
  const generatedKeywords = [
    tool.title,
    tool.shortTitle,
    `${tool.title} free`,
    `${tool.title} online`,
    `${tool.shortTitle} free tool`,
    `best ${slugPhrase}`,
    `${slugPhrase} for forex`,
    `${tool.category.toLowerCase()} forex tool`,
    `forex ${slugPhrase}`,
    `${tool.shortTitle} guide`,
    `${tool.shortTitle} examples`,
    `${tool.shortTitle} calculator`,
    "forex trading tools",
    "forex risk management",
    "currency strength meter tools",
  ];

  return [...new Set([...baseKeywords, ...generatedKeywords].map((item) => String(item).trim()).filter(Boolean))];
}

export async function generateStaticParams() {
  return forexTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getForexTool(slug);

  if (!tool) {
    return {};
  }

  const keywords = buildToolKeywords(tool);
  const canonicalUrl = `https://www.currencystrengthsmeters.com/forex-tools/${tool.slug}`;
  const metaTitle = tool.metaTitle || tool.title;
  const metaDescription = `${tool.description} Learn what it is, why it matters, how to use it, worked examples, FAQs, and practical forex planning guidance.`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
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
    category: tool.category,
    authors: [{ name: "Currency Strength Meter" }],
    creator: "Currency Strength Meter",
    publisher: "Currency Strength Meter",
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "Currency Strength Meter",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: `https://www.currencystrengthsmeters.com/${tool.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${tool.title} - Currency Strength Meter`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [`https://www.currencystrengthsmeters.com/${tool.slug}.png`],
    },
  };
}

export default async function ForexToolPage({ params }) {
  const { slug } = await params;
  const tool = getForexTool(slug);

  if (!tool) return notFound();

  const Icon = iconMap[tool.icon] || Target;
  const tone = toneMap[tool.accent] || toneMap.blue;
  const remainingTools = forexTools.filter((item) => item.slug !== tool.slug);
  const importantLinks = [
    {
      label: "Live Currency Strength Meter",
      href: "/",
      icon: Activity,
    },
    {
      label: "Intelligence Blog",
      href: "/blog",
      icon: BookOpen,
    },
    ...remainingTools.map((item) => ({
      label: item.shortTitle,
      href: `/forex-tools/${item.slug}`,
      icon: iconMap[item.icon] || Target,
    })),
  ];
  const exnessAffiliateUrl = "https://one.exnessonelink.com/a/txt6jvjtma";
  const staticLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Intelligence Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
    { label: "FAQ", href: "/faq" },
    { label: "Resources", href: "/resources" },
    { label: "Getting Started", href: "/getting-started" },
    { label: "Contact", href: "/contact" },
    { label: "Forex Tools", href: "/forex-tools" },
    { label: "Gold Lot Size", href: "/forex-tools/gold-lot-size-calculator" },
  ];
  const toolLinks = forexTools.flatMap((item) => [
    { label: item.title, href: `/forex-tools/${item.slug}` },
    { label: item.shortTitle, href: `/forex-tools/${item.slug}` },
  ]);
  const allLinkEntries = [...staticLinks, ...toolLinks].filter((item) => item.href !== `/forex-tools/${tool.slug}`);
  const dedupedLinkEntries = [];
  const seenLabels = new Set();
  for (const item of allLinkEntries) {
    const key = item.label.toLowerCase();
    if (!seenLabels.has(key)) {
      seenLabels.add(key);
      dedupedLinkEntries.push(item);
    }
  }
  const sortedLinkEntries = dedupedLinkEntries.sort((a, b) => b.label.length - a.label.length);
  const labelsPattern = sortedLinkEntries.map((item) => escapeRegExp(item.label)).join("|");
  const contentRegex = labelsPattern ? new RegExp(`\\b(${labelsPattern})\\b`, "gi") : null;
  const hrefByLabel = new Map(sortedLinkEntries.map((item) => [item.label.toLowerCase(), item.href]));
  const structuredContent = buildStructuredToolContent(tool);
  const structuredFaqs = buildStructuredFaqs(tool);
  const canonicalUrl = `https://www.currencystrengthsmeters.com/forex-tools/${tool.slug}`;
  const faqSchema = Array.isArray(structuredFaqs) && structuredFaqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: structuredFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    alternateName: tool.shortTitle,
    description: tool.description,
    url: canonicalUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Currency Strength Meter",
      url: "https://www.currencystrengthsmeters.com",
    },
  };

  const howToSchema = Array.isArray(structuredContent.how) && structuredContent.how.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to use the ${tool.title}`,
        description: tool.description,
        step: structuredContent.how.map((text, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: `Step ${index + 1}`,
          text,
        })),
      }
    : null;
  const blogDir = path.join(process.cwd(), "content/blog");
  const blogFiles = fs.readdirSync(blogDir);
  const relatedPosts = blogFiles
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      let safeOgImage = "/og-cache/currency-correlation-chart-explained.jpg";
      if (data.ogImage && String(data.ogImage).trim() !== "") {
        const image = String(data.ogImage);
        safeOgImage = image.includes("/og-cache/") ? image.replace(/^https?:\/\/[^/]+/, "") : image;
      }

      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title || file.replace(/\.md$/, "").replace(/-/g, " "),
        date: data.date || "",
        ogImage: safeOgImage,
        tags: data.tags || [],
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-10">
            <div className="flex flex-wrap items-center gap-4">
              <div className={`rounded-2xl p-4 ${tone}`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  {tool.category}
                </p>
                <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
                  {tool.title}
                </h1>
              </div>
            </div>

            <div className="mt-6">
              <Breadcrumbs />
            </div>

            <p className="mt-8 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {tool.description}
            </p>
            <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
              The {tool.shortTitle} on Currency Strength Meter (currencystrengthsmeters.com) is free to use, requires no signup, and runs directly in your browser.
            </p>

            <div className="mt-10">
              <ForexToolCalculator slug={tool.slug} />
            </div>
          </div>

          <section className="mt-10 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">About this tool</h2>
            <div className="mt-6 space-y-5 text-slate-600 dark:text-slate-300">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">What is {tool.shortTitle}?</h3>
              {structuredContent.what.map((paragraph) => (
                <p key={paragraph} className="leading-8">{renderLinkedText(paragraph, contentRegex, hrefByLabel)}</p>
              ))}

              <h3 className="pt-2 text-xl font-bold text-slate-900 dark:text-white">Why use {tool.shortTitle}?</h3>
              {structuredContent.why.map((paragraph) => (
                <p key={paragraph} className="leading-8">{renderLinkedText(paragraph, contentRegex, hrefByLabel)}</p>
              ))}

              <h3 className="pt-2 text-xl font-bold text-slate-900 dark:text-white">How to use {tool.shortTitle}?</h3>
              {structuredContent.how.map((paragraph) => (
                <p key={paragraph} className="leading-8">{renderLinkedText(paragraph, contentRegex, hrefByLabel)}</p>
              ))}

              <h3 className="pt-2 text-xl font-bold text-slate-900 dark:text-white">Additional insights for {tool.shortTitle}</h3>
              {structuredContent.deepDive.map((paragraph) => (
                <p key={paragraph} className="leading-8">{renderLinkedText(paragraph, contentRegex, hrefByLabel)}</p>
              ))}

              <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 dark:border-blue-900 dark:bg-blue-950/30">
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                  If you choose to execute trades with a broker, you can open an account with{" "}
                  <a
                    href={exnessAffiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 underline decoration-2 underline-offset-2 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200"
                  >
                    Exness
                  </a>{" "}
                  through our partner link. This website is educational and does not provide financial advice or guaranteed returns.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-900 dark:bg-amber-950/30">
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                  Disclaimer: All calculators, examples, and educational content are provided for informational purposes only. Trading leveraged products involves substantial risk, including possible loss of capital. Always verify contract specifications, fees, spread, and execution conditions with your broker before trading.
                </p>
              </div>
            </div>

            <h3 className="mt-10 text-xl font-bold text-slate-900 dark:text-white">Practical tips</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {tool.tips.map((tip) => (
                <li key={tip} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                  {renderLinkedText(tip, contentRegex, hrefByLabel)}
                </li>
              ))}
            </ul>

            {Array.isArray(structuredContent.examples) && structuredContent.examples.length > 0 && (
              <>
                <h3 className="mt-10 text-xl font-bold text-slate-900 dark:text-white">Worked examples</h3>
                <div className="mt-4 grid gap-4">
                  {structuredContent.examples.map((example) => (
                    <article
                      key={example.title}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
                    >
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white">{example.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">Inputs:</span> {renderLinkedText(example.inputs, contentRegex, hrefByLabel)}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">{renderLinkedText(example.result, contentRegex, hrefByLabel)}</p>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>

          {Array.isArray(structuredFaqs) && structuredFaqs.length > 0 && (
            <div className="mt-10 overflow-hidden rounded-[32px] border border-slate-200 shadow-sm dark:border-slate-800">
              <ToolFaqAccordion
                faqs={structuredFaqs}
                title={`${tool.shortTitle} FAQs`}
                linkEntries={sortedLinkEntries}
              />
            </div>
          )}

        </div>

        <aside className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Important Forex Tools</h2>
            <div className="mt-4 space-y-3">
              {importantLinks.map((entry) => {
                const LinkIcon = entry.icon;
                return (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:text-slate-200 dark:hover:text-blue-300"
                  >
                    <span className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 shrink-0" />
                      <span>{entry.label}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">Partner Offer</p>
            <a
              href={exnessAffiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 transition hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="relative block w-full overflow-hidden rounded-xl">
                <img
                  src="/images/exness.webp"
                  alt="Exness partner offer"
                  loading="lazy"
                  className="block h-auto w-full max-w-full object-cover object-center"
                />
              </span>
            </a>
            <a
              href={exnessAffiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Start Trading
            </a>
          </section>

          <RelatedPosts relatedPosts={relatedPosts} initialVisibleCount={8} />
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />

      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </main>
  );
}
