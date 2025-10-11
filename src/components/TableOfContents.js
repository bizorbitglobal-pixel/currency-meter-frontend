"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function TableOfContents({ toc }) {
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Highlight current heading while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* 📱 Mobile Collapsible TOC */}
      <div className="lg:hidden mb-8 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center p-4 text-left text-gray-700 dark:text-gray-200 font-medium"
        >
          <span>📑 Table of Contents</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isOpen && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {toc.map((item) => (
                <li
                  key={item.slug}
                  className={`pl-${item.level === 3 ? "4" : "0"} ${
                    active === item.slug ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  <button
                    onClick={() => scrollTo(item.slug)}
                    className="text-left w-full hover:text-blue-600"
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 💻 Desktop Sticky Sidebar TOC */}
      <aside className="hidden lg:block lg:w-64 sticky top-24 h-fit bg-white dark:bg-gray-900 p-4 border rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          📑 Table of Contents
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          {toc.map((item) => (
            <li
              key={item.slug}
              className={`pl-${item.level === 3 ? "4" : "0"} ${
                active === item.slug ? "text-blue-600 font-medium" : ""
              }`}
            >
              <button
                onClick={() => scrollTo(item.slug)}
                className="text-left hover:text-blue-600"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
