import Link from "next/link";

export default function AuthorCard({ author, compact = false }) {
  return (
    <Link
      href={`/authors/${author.slug}`}
      className={`group flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 transition hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-sm dark:border-blue-900 dark:bg-gray-900 dark:hover:border-blue-500 dark:hover:bg-blue-950/30 ${compact ? "max-w-xs" : "max-w-sm"}`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
        {author.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)}
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Written by
        </p>
        <p className="truncate text-sm font-semibold text-gray-900 group-hover:text-blue-700 dark:text-gray-100 dark:group-hover:text-blue-300">
          {author.name}
        </p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
          {author.role}
        </p>
      </div>
    </Link>
  );
}
