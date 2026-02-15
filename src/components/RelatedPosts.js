"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function RelatedPosts({ relatedPosts }) {
  const [showAll, setShowAll] = useState(false);

  const visiblePosts = showAll ? relatedPosts : relatedPosts.slice(0, 10);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        📰 Related Posts
      </h2>

      {/* --- Responsive Layout --- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
        {visiblePosts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="
              group block bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800
              rounded-xl overflow-hidden shadow-sm hover:shadow-md transition
              sm:h-auto lg:flex lg:items-center lg:gap-3
            "
          >
            {/* --- Mobile: Large Image | Desktop: Small Thumbnail --- */}
            <Image
              src={p.ogImage}
              alt={p.title}
              width={100}
              height={100}
              className="
                w-full h-40 object-cover lg:w-16 lg:h-16 lg:rounded-lg
                lg:border lg:border-gray-200 dark:lg:border-gray-700
              "
            />

            <div className="p-4 lg:p-0 lg:flex-1">
              <h3
                className="
                  font-semibold text-gray-900 dark:text-gray-100 
                  group-hover:text-blue-600 text-base lg:text-sm
                "
              >
                {p.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* --- Centered Show More Button --- */}
      {relatedPosts.length > 10 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
          >
            {showAll ? "Show Less" : "Show More Posts"}
          </button>
        </div>
      )}
    </section>
  );
}
