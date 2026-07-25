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
  Ruler,
  Scale,
  Target,
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-950/80"
          : "bg-white dark:bg-gray-950"
      }`}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
        {/* Left logo/title */}
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={50}
            className="inline-block mr-2"
          />
        </Link>

        {/* Right navigation */}
        <nav className="flex items-center gap-6">
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-200">
              <Link href="/forex-tools" onClick={() => setToolsOpen(false)}>
                Forex Tools
              </Link>
              <button
                type="button"
                aria-label="Toggle forex tools menu"
                onClick={() => setToolsOpen((open) => !open)}
                className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {toolsOpen && (
              <div className="absolute right-0 top-full w-[360px] pt-4">
                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
                  <Link
                    href="/forex-tools"
                    onClick={() => setToolsOpen(false)}
                    className="mb-3 block rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-600 transition hover:bg-slate-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                  >
                    All Forex Tools
                  </Link>
                  <div className="space-y-1">
                    {forexTools.map((tool) => {
                      const ToolIcon = iconMap[tool.icon] || Target;
                      return (
                        <Link
                          key={tool.slug}
                          href={`/forex-tools/${tool.slug}`}
                          onClick={() => setToolsOpen(false)}
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
      </div>
    </header>
  );
}
