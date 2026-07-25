"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RelatedPosts({ relatedPosts, initialVisibleCount = 10, layout = "vertical", className = "" }) {
  const [showAll, setShowAll] = useState(false);
  const carouselRef = useRef(null);

  const visiblePosts = showAll ? relatedPosts : relatedPosts.slice(0, initialVisibleCount);
  const isHorizontal = layout === "horizontal";

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = Math.max(280, Math.round(carouselRef.current.clientWidth * 0.75));
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (relatedPosts.length === 0) return null;

  return (
    <section className={`mt-10 ${className}`.trim()}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          📰 Related Posts
        </h2>
        {isHorizontal && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Scroll related posts left"
              onClick={() => scrollCarousel("left")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Scroll related posts right"
              onClick={() => scrollCarousel("right")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* --- Responsive Layout --- */}
      <div
        ref={carouselRef}
        className={isHorizontal ? "flex gap-6 overflow-x-auto pb-3 snap-x snap-mandatory no-scrollbar" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-1"}
      >
        {visiblePosts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className={`group block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:h-auto ${isHorizontal ? "min-w-[280px] max-w-[280px] snap-start sm:min-w-[320px] sm:max-w-[320px]" : "lg:flex lg:items-center lg:gap-3"}`}
          >
            <Image
              src={p.ogImage}
              alt={p.title}
              width={isHorizontal ? 480 : 100}
              height={isHorizontal ? 220 : 100}
              className={isHorizontal
                ? "w-full h-44 object-cover"
                : "w-full h-40 object-cover lg:w-16 lg:h-16 lg:rounded-lg lg:border lg:border-gray-200 dark:lg:border-gray-700"
              }
            />
            <div className={isHorizontal ? "p-4" : "p-4 lg:p-0 lg:flex-1"}>
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
      {!isHorizontal && relatedPosts.length > initialVisibleCount && (
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
