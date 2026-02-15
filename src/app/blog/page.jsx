import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import RedirectButton from "@/components/RedirectButton";
import AddSlot from "@/components/AddSlot";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Blog | Currency Strength Meters",
  description:
    "Explore expert forex trading articles, education, and tips about using currency strength meters, indicators, and strategies to boost your trading performance.",
  keywords: [
    "forex blog",
    "currency strength meter articles",
    "forex trading tips",
    "forex education",
    "trading strategies",
    "forex market analysis",
    "currency strength indicator",
    "forex trading guides",
    "currency analysis",
    "forex news",
  ],
};

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params?.page ?? "1", 10) || 1);

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

  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const postsPerPage = 9;
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPosts = sortedPosts.slice(start, end);

  const pageHref = (p) => `/blog?page=${p}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Forex Blog & Trading Guides
      </h1>
      <div className="flex justify-center mb-8">
        <Breadcrumbs />
      </div>

      <div className="relative isolate">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900/50 -z-10" />
        <RedirectButton />
      </div>
      {/* <AddSlot /> */}
      {/* 📰 Blog Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => {
          const safeOgImage =
            post.ogImage && post.ogImage.trim() !== ""
              ? post.ogImage.startsWith("http")
                ? post.ogImage
                : `https://www.currencystrengthsmeters.com${post.ogImage}`
              : "https://www.currencystrengthsmeters.com/og-cache/currency-correlation-chart-explained.jpg";

          return (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition p-6 flex flex-col justify-between"
            >
              <div>
                <img
                  src={safeOgImage}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 hover:text-blue-600">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                  {post.excerpt || post.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* 🧭 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            {/* Prev Button */}
            <Link
              href={pageHref(Math.max(1, currentPage - 1))}
              aria-disabled={currentPage === 1}
              className={`px-3 py-2 text-sm rounded-lg transition ${currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-blue-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              ← Prev
            </Link>

            {/* Compact Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => {
              const p = i + 1;
              if (
                totalPages > 7 &&
                p !== 1 &&
                p !== totalPages &&
                (p < currentPage - 1 || p > currentPage + 1)
              ) {
                if (p === currentPage - 2 || p === currentPage + 2)
                  return <span key={p}>...</span>;
                return null;
              }

              return (
                <Link
                  key={p}
                  href={pageHref(p)}
                  className={`px-3 py-2 text-sm rounded-lg transition ${p === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  {p}
                </Link>
              );
            })}

            {/* Next Button */}
            <Link
              href={pageHref(Math.min(totalPages, currentPage + 1))}
              aria-disabled={currentPage === totalPages}
              className={`px-3 py-2 text-sm rounded-lg transition ${currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-blue-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              Next →
            </Link>
          </div>
        </div>
      )}

      <footer className="mt-20 py-10 border-t border-gray-200 dark:border-gray-800 text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto text-center">
          <p>© 2025 Currency Strength Meter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
