import Link from "next/link";
import AddSlot from "@/components/AddSlot";

export const metadata = {
  title: "Blog | Currency Meter",
  description:
    "Latest blogs and insights about forex trading and currency strength analysis.",
};

const blogs = [
  {
    slug: "use-currency-strength-meter",
    title: "How to Use a Currency Strength Meter in Forex Trading",
    excerpt:
      "Learn how traders leverage strength meters to identify strong and weak currencies for better trading opportunities.",
  },
  {
    slug: "top-5-strategies",
    title: "Top 5 Strategies with a Currency Strength Indicator",
    excerpt:
      "Combine technical analysis with strength meters to improve your trade accuracy and success rate.",
  },
  {
    slug: "short-vs-long-term",
    title: "Short-Term vs Long-Term Strength Indicators",
    excerpt:
      "Understand the difference between short-term scalping signals and long-term trend confirmation using strength meters.",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Ad above blog list */}
      <AddSlot slot="blog-top-123" />

      <h1 className="text-3xl font-bold mb-8">Our Blog</h1>

      <div className="space-y-12">
        {blogs.map((blog, idx) => (
          <div key={blog.slug} className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <Link
                href={`/blog/${blog.slug}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Read More →
              </Link>
            </div>

            {/* Insert ad after each blog card */}
            <AddSlot slot={`blog-card-${idx}`} />
          </div>
        ))}
      </div>

      {/* Ad at bottom */}
      <AddSlot slot="blog-bottom-456" />
    </main>
  );
}
