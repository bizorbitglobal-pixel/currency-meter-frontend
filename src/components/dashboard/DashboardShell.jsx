"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Activity, CreditCard, UserRound, LogOut, Menu, X, BookOpen } from "lucide-react";
import { signOutAction } from "@/app/dashboard/actions";
import UsageProgressBar from "./UsageProgressBar";

const NAV_ICONS = { overview: LayoutDashboard, usage: Activity, billing: CreditCard, profile: UserRound };

function SidebarNav({ sections, activeTab, onSelect, plan }) {
  return (
    <>
      <div className={`rounded-2xl p-4 mb-3 ${plan.tint}`}>
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Current plan
        </p>
        <p className={`text-lg font-extrabold ${plan.text}`}>{plan.name}</p>
      </div>
      <nav className="space-y-1">
        {sections.map((s) => {
          const Icon = NAV_ICONS[s.id] || LayoutDashboard;
          const active = s.id === activeTab;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {s.label}
            </button>
          );
        })}
      </nav>
      <Link
        href="/forex-api#docs"
        className="mt-3 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition"
      >
        <BookOpen className="h-4 w-4 shrink-0" />
        API documentation
      </Link>
    </>
  );
}

export default function DashboardShell({ userEmail, plan, usage, sections }) {
  const [activeTab, setActiveTab] = useState(sections[0]?.id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeSection = sections.find((s) => s.id === activeTab) || sections[0];

  function selectTab(id) {
    setActiveTab(id);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
      {/* Topbar */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Currency Strength Meter"
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {usage.isUnlimited ? (
              <span className="hidden sm:inline-flex rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                Unlimited usage
              </span>
            ) : (
              <div className="hidden sm:flex flex-col w-40">
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <span>API usage</span>
                  <span>
                    {usage.used.toLocaleString()}/{usage.limit.toLocaleString()}
                  </span>
                </div>
                <UsageProgressBar percent={usage.percent} compact />
              </div>
            )}

            <span className="hidden md:block text-sm text-slate-600 dark:text-slate-300 truncate max-w-[180px]">
              {userEmail}
            </span>

            <form action={signOutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-gray-700 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-gray-800 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 min-h-[calc(100vh-61px)] p-4 sticky top-[61px] self-start">
          <SidebarNav sections={sections} activeTab={activeTab} onSelect={setActiveTab} plan={plan} />
        </aside>

        {/* Mobile drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 p-4 space-y-1 overflow-y-auto shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wide text-slate-500">Menu</span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarNav sections={sections} activeTab={activeTab} onSelect={selectTab} plan={plan} />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 sm:p-8 max-w-4xl mx-auto w-full">{activeSection?.content}</main>
      </div>
    </div>
  );
}
