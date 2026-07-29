"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // Skeleton loader to avoid hydration shift on SSR load
  if (!mounted) {
    return (
      <div className="w-[120px] h-[36px] rounded-full bg-gray-200/60 dark:bg-gray-800/60 animate-pulse border border-gray-200 dark:border-gray-700" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle dark mode"
      className="group relative inline-flex h-[38px] w-[124px] cursor-pointer items-center rounded-full border border-gray-200/80 bg-gray-200/60 p-1 shadow-inner backdrop-blur-md transition-colors duration-300 ease-in-out hover:border-gray-300 dark:border-gray-700/80 dark:bg-gray-800/80 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 select-none"
    >
      {/* Sliding Active Pill Background */}
      <span
        className={`absolute h-[30px] w-[56px] rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-300 ease-spring dark:bg-blue-600 dark:shadow-blue-900/30 ${
          theme === "dark" ? "translate-x-[58px]" : "translate-x-0"
        }`}
      />

      {/* Light Option Label */}
      <span
        className={`relative z-10 flex w-[56px] items-center justify-center gap-1 text-xs font-semibold transition-colors duration-200 ${
          theme === "light"
            ? "text-gray-900"
            : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200"
        }`}
      >
        <svg
          className="h-3.5 w-3.5 text-amber-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <span>Light</span>
      </span>

      {/* Dark Option Label */}
      <span
        className={`relative z-10 flex w-[56px] items-center justify-center gap-1 text-xs font-semibold transition-colors duration-200 ${
          theme === "dark"
            ? "text-white"
            : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200"
        }`}
      >
        <svg
          className="h-3.5 w-3.5 text-blue-200 dark:text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <span>Dark</span>
      </span>
    </button>
  );
}