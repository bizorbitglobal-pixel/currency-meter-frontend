import { notFound } from "next/navigation";
import AddSlot from "@/components/AddSlot";

const blogs = {
  "use-currency-strength-meter": {
    title: "How to Use a Currency Strength Meter in Forex Trading",
    content: `
      A currency strength meter is a forex trading tool that shows the relative strength of different currencies.
      Traders use it to spot strong vs. weak currencies and find trade opportunities.
      
      ✅ Practical Tip: Always confirm signals with price action or technical indicators.
    `,
  },
  "top-5-strategies": {
    title: "Top 5 Strategies with a Currency Strength Indicator",
    content: `
      The strength meter works best when combined with strategies:
      1. Breakout confirmation
      2. Trend following
      3. Scalping with momentum
      4. Pairing strongest vs weakest
      5. Combining with candlestick patterns
    `,
  },
  "short-vs-long-term": {
    title: "Short-Term vs Long-Term Strength Indicators",
    content: `
      Short-term indicators help scalpers catch quick moves, while long-term indicators are for swing traders.
      Both have value depending on your trading style.
    `,
  },
};

export default function BlogDetail({ params }) {
  const post = blogs[params.slug];
  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Top ad */}
      <AddSlot slot="blog-detail-top" />

      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

      <article className="prose prose-lg max-w-none space-y-6">
        {post.content.split("\n").map((para, idx) => (
          <div key={idx} className="space-y-4">
            <p>{para.trim()}</p>

            {/* Insert inline ads between paragraphs */}
            {idx % 2 === 0 && <AddSlot slot={`blog-detail-inline-${idx}`} />}
          </div>
        ))}
      </article>

      {/* Bottom ad */}
      <AddSlot slot="blog-detail-bottom" />
    </main>
  );
}
