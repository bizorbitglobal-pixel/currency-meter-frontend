import Link from "next/link";
import {
  Activity,
  BadgeDollarSign,
  ChartColumn,
  Clock3,
  Coins,
  GitCompareArrows,
  Globe2,
  Ruler,
  Scale,
  Target,
} from "lucide-react";

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

const accentMap = {
  blue: {
    tint: "bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-900",
    icon: "bg-blue-600 text-white",
    dot: "bg-blue-500",
    link: "text-blue-600 dark:text-blue-400",
    pill: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  purple: {
    tint: "bg-violet-50 border-violet-100 dark:bg-violet-950/30 dark:border-violet-900",
    icon: "bg-violet-600 text-white",
    dot: "bg-violet-500",
    link: "text-violet-600 dark:text-violet-400",
    pill: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
  emerald: {
    tint: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900",
    icon: "bg-emerald-600 text-white",
    dot: "bg-emerald-500",
    link: "text-emerald-600 dark:text-emerald-400",
    pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  indigo: {
    tint: "bg-indigo-50 border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900",
    icon: "bg-indigo-600 text-white",
    dot: "bg-indigo-500",
    link: "text-indigo-600 dark:text-indigo-400",
    pill: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  },
  amber: {
    tint: "bg-amber-50 border-amber-100 dark:bg-amber-950/30 dark:border-amber-900",
    icon: "bg-amber-600 text-white",
    dot: "bg-amber-500",
    link: "text-amber-700 dark:text-amber-400",
    pill: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  sky: {
    tint: "bg-sky-50 border-sky-100 dark:bg-sky-950/30 dark:border-sky-900",
    icon: "bg-sky-600 text-white",
    dot: "bg-sky-500",
    link: "text-sky-600 dark:text-sky-400",
    pill: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  },
  orange: {
    tint: "bg-orange-50 border-orange-100 dark:bg-orange-950/30 dark:border-orange-900",
    icon: "bg-orange-600 text-white",
    dot: "bg-orange-500",
    link: "text-orange-600 dark:text-orange-400",
    pill: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
  violet: {
    tint: "bg-fuchsia-50 border-fuchsia-100 dark:bg-fuchsia-950/30 dark:border-fuchsia-900",
    icon: "bg-fuchsia-600 text-white",
    dot: "bg-fuchsia-500",
    link: "text-fuchsia-600 dark:text-fuchsia-400",
    pill: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300",
  },
};

export default function ForexToolsGrid({ tools }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
      {tools.map((tool) => {
        const Icon = iconMap[tool.icon] || Target;
        const accent = accentMap[tool.accent] || accentMap.blue;

        return (
          <Link
            key={tool.slug}
            href={`/forex-tools/${tool.slug}`}
            className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className={`border-b p-7 ${accent.tint}`}>
              <div className="flex items-start justify-between gap-3">
                <div className={`rounded-2xl p-4 shadow-md ${accent.icon}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-500 dark:text-gray-300">
                    Live
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {tool.shortTitle}
                </h2>
                <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${accent.pill}`}>
                  {tool.badge}
                </span>
              </div>
            </div>
            <div className="p-7">
              <p className="min-h-[92px] text-sm leading-7 text-slate-600 dark:text-slate-300">
                {tool.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase ${accent.pill}`}>
                  {tool.category}
                </span>
                {/* <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  SEO Ready
                </span> */}
              </div>
              <div className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${accent.link}`}>
                Open Tool
                <span className="transition group-hover:translate-x-1">&gt;</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
