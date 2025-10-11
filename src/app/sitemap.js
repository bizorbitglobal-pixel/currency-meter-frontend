import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function sitemap() {
  const baseUrl = "https://www.currencystrengthsmeters.com";

  // --- Read all blog slugs dynamically ---
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  const blogUrls = files
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);
    const slug = file.replace(/\.md$/, "");
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: data.date ? new Date(data.date) : new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    };
  });
  // --- Static pages ---
  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // --- Combine everything ---
  return [...staticUrls, ...blogUrls];
}
