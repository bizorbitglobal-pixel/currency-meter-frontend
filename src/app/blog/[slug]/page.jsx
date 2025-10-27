import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; // ✅ Added Link
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import BlogTabs from "@/components/BlogTabs";
import TableOfContents from "@/components/TableOfContents";
import RedirectButton from "@/components/RedirectButton";
import RelatedPosts from "@/components/RelatedPosts";
import CommentsSection from "@/components/CommentSection";
import AddSlot from "@/components/AddSlot";

const blogDir = path.join(process.cwd(), "content/blog");

// ✅ Convert Markdown → HTML + Extract TOC
async function getPost(slug) {
  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    },
  });

  const toc = [];
  const headingRegex = /^##\s+(.*)|^###\s+(.*)/gm;
  let match;
  while ((match = headingRegex.exec(content))) {
    const level = match[1] ? 2 : 3;
    const text = match[1] || match[2];
    const slug = text.toLowerCase().replace(/[^\w]+/g, "-");
    toc.push({ level, text, slug });
  }

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["heading-link"] },
    })
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return { ...data, contentHtml: processed.toString(), readingTime, toc };
}

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data } = matter(fileContent, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    },
  });

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      url: `https://www.currencystrengthsmeters.com/blog/${slug}`,
      siteName: "Currency Strengths Meters",
      images: [
        {
          url:
            data.ogImage ||
            "https://www.currencystrengthsmeters.com/og-image.png",
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      images: [
        data.ogImage || "https://www.currencystrengthsmeters.com/og-image.png",
      ],
    },
  };
}

// ✅ Blog Detail Page
export default async function BlogDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPost(slug);

  if (!post) return notFound();

  const {
    title,
    date,
    tags = [],
    author = "Currency Strength Meter Team",
    authorImage = "/author-avatar.png",
    ogImage,
    contentHtml,
    readingTime,
    toc,
  } = post;

  const safeOgImage =
    ogImage && ogImage.trim() !== ""
      ? ogImage.startsWith("http")
        ? ogImage
        : `https://www.currencystrengthsmeters.com${ogImage}`
      : "https://www.currencystrengthsmeters.com/og-cache/currency-correlation-chart-explained.jpg";

  // ✅ Related Posts
  const allFiles = fs.readdirSync(blogDir);
  const relatedPosts = allFiles
    .filter((file) => file !== `${slug}.md`)
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        ogImage:
          data.ogImage ||
          "https://www.currencystrengthsmeters.com/og-cache/currency-correlation-chart-explained.jpg",
        tags: data.tags || [],
      };
    })
    .filter((p) => p.tags.some((tag) => tags.includes(tag)));

  // ✅ Show 10 by default
  const defaultPosts = relatedPosts.slice(0, 10);

  return (
    <article className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
      {/* --- Main Content --- */}
      <div>
        {/* --- Header --- */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">
            {title}
          </h1>

          <div className="flex justify-center items-center gap-3 text-gray-500 text-sm mb-6">
            {date && (
              <span>
                {new Date(date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>

          {/* Cover Image */}
          {ogImage && (
            <div className="relative w-full h-64 md:h-96 mb-10 overflow-hidden rounded-2xl shadow-md">
              <Image
                src={safeOgImage}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Author Info */}
          <div className="flex justify-center items-center gap-3 mt-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {author}
              </p>
              <p className="text-sm text-gray-500">Forex Analyst & Writer</p>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* --- Tabs --- */}
        <div className="overflow-x-auto no-scrollbar">
          <BlogTabs />
        </div>
        <div className="relative isolate">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900/50 -z-10" />
          <RedirectButton />
        </div>
        <div className="block lg:hidden mt-16">
          <TableOfContents toc={toc} />
        </div>
        <AddSlot />
        {/* --- Markdown Content --- */}
        <section
          id="overview"
          className="
            prose prose-lg md:prose-xl mx-auto
            prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl
            prose-a:text-blue-600 hover:prose-a:underline
            prose-li:marker:text-blue-500 prose-blockquote:border-l-blue-400
            prose-img:rounded-xl prose-img:shadow-md
            dark:prose-invert
          "
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* --- Key Points --- */}
        <section id="key-points" className="mt-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            🔹 Key Takeaways
          </h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Use strength meters to spot strong/weak pairs quickly.</li>
            <li>Combine with price action for accurate entries.</li>
            <li>Stay aware of major economic events.</li>
          </ul>
        </section>

        {/* --- Comments Section --- */}
        {/* <section id="comments" className="mt-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            💬 Comments
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Comments feature coming soon! Traders will be able to share insights
            and questions here.
          </p>
        </section> */}
        <AddSlot />
        {/* --- Mobile TOC + Related Posts --- */}
        <div className="block lg:hidden mt-16">
          <RelatedPosts relatedPosts={relatedPosts} />
        </div>

        {/* --- Footer --- */}
        <hr className="my-12 border-gray-200 dark:border-gray-700" />
        <footer className="text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()}{" "}
            <strong>
              <Link href="https://www.currencystrengthsmeters.com/">
                CurrencyStrengthsMeters
              </Link>
            </strong>{" "}
            – Empowering Forex Traders Worldwide 🌍
          </p>
        </footer>
      </div>

      {/* --- Sidebar (Desktop Only) --- */}
      <div className="hidden lg:block space-y-12">
       <TableOfContents toc={toc} />
       <RelatedPosts relatedPosts={relatedPosts} />
      </div>
    </article>
  );
}
