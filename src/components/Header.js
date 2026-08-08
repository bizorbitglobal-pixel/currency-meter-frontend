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
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { forexTools } from "@/lib/forexTools";
import MarketTickHeader from "@/components/MarketTickHeader";
import { createClient } from "@/lib/supabase/client";
import { signOutAction } from "@/app/dashboard/actions";

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
            theme === "light" ? "text-amber-500" : "text-slate-400 group-hover:text-slate-300"
          }`}
        />
      </span>
      <span className="relative z-10 flex w-[28px] items-center justify-center">
        <Moon
          className={`h-4 w-4 transition-colors duration-200 ${
            theme === "dark" ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500"
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
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [mobileSigningOut, setMobileSigningOut] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthLoaded(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileToolsOpen(false);
  };

  useEffect(() => {
    const handleClick = () => setProfileMenuOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm dark:bg-gray-950/95"
          : "bg-white dark:bg-gray-950"
      }`}
    >
      {/* Primary Header Navbar */}
      <div className="relative z-20 flex items-center justify-between max-w-6xl mx-auto px-6 py-2">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center"
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={40}
            className="inline-block mr-2 h-9 w-auto object-contain"
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
                <div className="absolute right-0 top-full w-[360px] pt-3 z-50">
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

            <Link
              href="/forex-api"
              className="text-sm font-bold uppercase tracking-[0.16em] text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
            >
              API
            </Link>

            {authLoaded &&
              (user ? (
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen((open) => !open)}
                    aria-label="Open profile menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                  >
                    <User className="h-5 w-5" />
                  </button>
                  {profileMenuOpen && (
                    <div className="absolute right-0 top-12 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <form action={signOutAction}>
                        <button
                          type="submit"
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center">
                  <Link
                    href="/login"
                    className="rounded-full bg-[#34d399] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:opacity-90 active:scale-95"
                  >
                    Log in / Sign up
                  </Link>
                </div>
              ))}
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

      {/* Sub Header Ticker Bar */}
      <div className="relative z-10">
        <MarketTickHeader />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[102px] bg-black/40 backdrop-blur-sm md:hidden z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation Content */}
      <div
        className={`fixed inset-x-0 top-[102px] bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out md:hidden z-50 overflow-y-auto max-h-[calc(100vh-102px)] ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.12em] text-slate-800 dark:text-slate-100 py-1">
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

          <hr className="border-slate-200 dark:border-slate-800" />

          <Link
            href="/blog"
            onClick={closeMobileMenu}
            className="text-sm font-bold uppercase tracking-[0.12em] text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 py-1"
          >
            Blogs
          </Link>

          <hr className="border-slate-200 dark:border-slate-800" />

          <Link
            href="/forex-api"
            onClick={closeMobileMenu}
            className="text-sm font-bold uppercase tracking-[0.12em] text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 py-1"
          >
            API &amp; Pricing
          </Link>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* User Account Section inside Mobile Drawer */}
          {authLoaded &&
            (user ? (
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 p-4 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Signed in as
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    <LayoutDashboard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Profile</span>
                  </Link>
                </div>

                <form action={signOutAction} onSubmit={() => setMobileSigningOut(true)}>
                  <button
                    type="submit"
                    disabled={mobileSigningOut}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/60 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition disabled:opacity-60 shadow-sm"
                  >
                    {mobileSigningOut ? (
                      <>
                        <svg
                          className="animate-spin h-3.5 w-3.5 text-red-600 dark:text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Signing out…</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-1">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="text-center rounded-full border border-slate-300 dark:border-slate-700 text-xs font-bold uppercase tracking-wider px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMobileMenu}
                  className="text-center rounded-full bg-[#34d399] hover:opacity-90 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition shadow-sm"
                >
                  Create Free Account
                </Link>
              </div>
            ))}
        </nav>
      </div>
    </header>
  );
}