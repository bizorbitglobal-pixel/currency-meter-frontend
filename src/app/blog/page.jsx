import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import RedirectButton from "@/components/RedirectButton";

export const metadata = {
  title: "Blog | Currency Strengths Meters",
  description:
    "Forex trading education, strategies, and tips using currency strength meters and indicators.",
};

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  // 🧩 Read Markdown files
  const posts = files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug: file.replace(/\.md$/, ""),
      ...data,
    };
  });

  // 🕓 Sort newest first
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Forex Blog & Trading Guides
      </h1>
      <div className="relative isolate">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900/50 -z-10" />
        <RedirectButton />
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition p-6 flex flex-col justify-between"
          >
            <div>
              {/* 🖼️ OG image preview (optional) */}
              {post.ogImage && (
                <img
                  src={post.ogImage}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              {/* 🏷️ Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 📰 Title */}
              <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              {/* ✂️ Excerpt */}
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {post.excerpt || post.description}
              </p>
            </div>

            {/* 📅 Footer meta */}
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
        ))}
      </div>
      <footer className="mt-20 py-10 border-t text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto text-center">
          <p>© 2025 Currency Strength Meter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
