import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DEFAULT_AUTHOR, getAuthor, slugifyAuthor } from "@/lib/authors";

const blogDir = path.join(process.cwd(), "content/blog");

function getPostsByAuthor(authorSlug) {
  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fileContent = fs.readFileSync(path.join(blogDir, file), "utf8");
      const { data } = matter(fileContent);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        description: data.excerpt || data.description,
        date: data.date,
        author: getAuthor(data.author),
      };
    })
    .filter((post) => post.author.slug === authorSlug)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function generateStaticParams() {
  const authors = new Set([DEFAULT_AUTHOR.slug]);

  fs.readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .forEach((file) => {
      const fileContent = fs.readFileSync(path.join(blogDir, file), "utf8");
      const { data } = matter(fileContent);
      authors.add(slugifyAuthor(data.author || DEFAULT_AUTHOR.name));
    });

  return [...authors].map((authorName) => ({ authorName }));
}

export async function generateMetadata({ params }) {
  const { authorName } = await params;
  const author = getAuthor(authorName === DEFAULT_AUTHOR.slug ? DEFAULT_AUTHOR.name : authorName.replace(/-/g, " "));

  return {
    title: `${author.name} | Forex Analyst & Writer`,
    description: `${author.name} is a forex analyst and trading educator with more than 15 years of experience in forex markets.`,
  };
}

export default async function AuthorPage({ params }) {
  const { authorName } = await params;
  const author = getAuthor(authorName === DEFAULT_AUTHOR.slug ? DEFAULT_AUTHOR.name : authorName.replace(/-/g, " "));
  const posts = getPostsByAuthor(authorName);

  if (posts.length === 0 && authorName !== DEFAULT_AUTHOR.slug) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-400 text-2xl font-bold text-gray-950">
            {author.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Author profile
            </p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-gray-100">{author.name}</h1>
            <p className="mt-2 font-medium text-gray-600 dark:text-gray-300">{author.role}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">{author.bio}</p>
            <p className="mt-4 font-semibold text-gray-900 dark:text-gray-100">{author.experience}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Areas of expertise</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {author.specialties.map((specialty) => (
              <li key={specialty} className="rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {specialty}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Articles by {author.name}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-yellow-400 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </p>
              <h3 className="mt-2 font-semibold text-gray-900 dark:text-gray-100">{post.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
