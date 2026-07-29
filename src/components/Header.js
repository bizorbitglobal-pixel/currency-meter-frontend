"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Activity,
  BadgeDollarSign,
  ChartColumn,
  ChevronDown,
  Clock3,
  Coins,
  GitCompareArrows,
  Globe2,
  Menu,
  Ruler,
  Scale,
  Target,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { forexTools } from "@/lib/forexTools";

const iconMap = {
  target: Target,
  ruler: Ruler,
  scale: Scale,
  "badge-dollar-sign": BadgeDollarSign,
  "clock-3": Clock3,
  "globe-2": Globe2,
  coins: Coins,
  "chart-column": ChartColumn,
  activity: Activity,
  "git-compare-arrows": GitCompareArrows,
};

function ThemeToggle() {
  const [theme, setTheme] = useState("light"); // Fixed line
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

  if (!mounted) {
    return (
      <div className="w-[68px] h-[34px] rounded-full bg-slate-200/60 dark:bg-slate-800/60 animate-pulse border border-slate-200 dark:border-slate-800" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle theme"
      className="group relative inline-flex h-[34px] w-[68px] shrink-0 cursor-pointer items-center rounded-full border border-slate-200/80 bg-slate-100 p-1 shadow-inner backdrop-blur-md transition-all duration-300 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40 select-none"
    >
      <span
        className={`absolute h-[26px] w-[28px] rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-300 ease-out dark:bg-blue-600 dark:shadow-blue-900/40 ${
          theme === "dark" ? "translate-x-[32px]" : "translate-x-0"
        }`}
      />
      <span className="relative z-10 flex w-[28px] items-center justify-center">
        <Sun
          className={`h-4 w-4 transition-colors duration-200 ${
            theme === "light"
              ? "text-amber-500"
              : "text-slate-400 group-hover:text-slate-300"
          }`}
        />
      </span>
      <span className="relative z-10 flex w-[28px] items-center justify-center">
        <Moon
          className={`h-4 w-4 transition-colors duration-200 ${
            theme === "dark"
              ? "text-white"
              : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500"
          }`}
        />
      </span>
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [desktopToolsOpen, setDesktopToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileToolsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-950/80"
          : "bg-white dark:bg-gray-950"
      }`}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="text-xl font-bold text-gray-900 dark:text-gray-100"
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={50}
            className="inline-block mr-2 h-auto w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <div
              className="relative"
              onMouseEnter={() => setDesktopToolsOpen(true)}
              onMouseLeave={() => setDesktopToolsOpen(false)}
            >
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-200">
                <Link
                  href="/forex-tools"
                  onClick={() => setDesktopToolsOpen(false)}
                >
                  Forex Tools
                </Link>
                <button
                  type="button"
                  aria-label="Toggle forex tools menu"
                  onClick={() => setDesktopToolsOpen((open) => !open)}
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      desktopToolsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {desktopToolsOpen && (
                <div className="absolute right-0 top-full w-[360px] pt-4">
                  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
                    <Link
                      href="/forex-tools"
                      onClick={() => setDesktopToolsOpen(false)}
                      className="mb-3 block rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-600 transition hover:bg-slate-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                    >
                      All Forex Tools
                    </Link>
                    <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                      {forexTools.map((tool) => {
                        const ToolIcon = iconMap[tool.icon] || Target;
                        return (
                          <Link
                            key={tool.slug}
                            href={`/forex-tools/${tool.slug}`}
                            onClick={() => setDesktopToolsOpen(false)}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                          >
                            <ToolIcon className="h-4 w-4 shrink-0" />
                            <span>{tool.shortTitle}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-sm font-bold uppercase tracking-[0.16em] text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
            >
              Blogs
            </Link>
          </nav>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[73px] bg-black/40 backdrop-blur-sm md:hidden z-40"
          onClick={closeMobileMenu}
        />
      )}

      <div
        className={`fixed inset-x-0 top-[73px] bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out md:hidden z-50 overflow-y-auto max-h-[calc(100vh-73px)] ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-base font-bold uppercase tracking-[0.12em] text-slate-800 dark:text-slate-100">
              <Link href="/forex-tools" onClick={closeMobileMenu}>
                Forex Tools
              </Link>
              <button
                type="button"
                onClick={() => setMobileToolsOpen((prev) => !prev)}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    mobileToolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {mobileToolsOpen && (
              <div className="pl-2 pt-2 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-1">
                <Link
                  href="/forex-tools"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400"
                >
                  All Forex Tools
                </Link>
                {forexTools.map((tool) => {
                  const ToolIcon = iconMap[tool.icon] || Target;
                  return (
                    <Link
                      key={tool.slug}
                      href={`/forex-tools/${tool.slug}`}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <ToolIcon className="h-4 w-4 shrink-0" />
                      <span>{tool.shortTitle}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <hr className="border-slate-100 dark:border-slate-900" />

          <Link
            href="/blog"
            onClick={closeMobileMenu}
            className="text-base font-bold uppercase tracking-[0.12em] text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Blogs
          </Link>
        </nav>
      </div>
    </header>
  );
}