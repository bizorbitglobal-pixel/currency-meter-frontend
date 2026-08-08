import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ensureApiKey } from "@/app/dashboard/actions";
import ApiKeyCard from "@/components/ApiKeyCard";
import ProfileForm from "@/components/ProfileForm";
import UpgradeButtons from "@/components/UpgradeButtons";
import ApiPlanCards from "@/components/ApiPlanCards";
import DashboardShell from "@/components/dashboard/DashboardShell";
import UsageProgressBar from "@/components/dashboard/UsageProgressBar";
import { Zap, Rocket, Crown } from "lucide-react";

export const metadata = {
  title: "API Dashboard | Currency Strength Meter",
  robots: { index: false, follow: false },
};

const PLAN_META = {
  free: {
    name: "Free Trial",
    icon: Zap,
    tint: "bg-slate-50 dark:bg-slate-900/40",
    text: "text-slate-700 dark:text-slate-300",
    iconBg: "bg-slate-700",
    defaultLimit: 100,
  },
  pro: {
    name: "Pro",
    icon: Rocket,
    tint: "bg-blue-50/60 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-300",
    iconBg: "bg-blue-600",
    defaultLimit: 10000,
  },
  unlimited: {
    name: "Unlimited",
    icon: Crown,
    tint: "bg-emerald-50/60 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-300",
    iconBg: "bg-emerald-600",
    defaultLimit: null,
  },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: profile }, { data: subscription }, keyInfo] = await Promise.all([
    supabase.from("profiles").select("full_name, email").eq("id", user.id).maybeSingle(),
    supabase
      .from("subscriptions")
      .select("plan_id, status, current_period_end, plans(name, monthly_request_limit, trial_request_limit)")
      .eq("user_id", user.id)
      .maybeSingle(),
    ensureApiKey(),
  ]);

  const { data: apiKeyRow } = await supabase
    .from("api_keys")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  const { data: usage } = apiKeyRow
    ? await supabase
        .from("usage_counters")
        .select("request_count, period_end")
        .eq("api_key_id", apiKeyRow.id)
        .maybeSingle()
    : { data: null };

  const planId = subscription?.plan_id || "free";
  const plan = PLAN_META[planId] || PLAN_META.free;
  const dbPlan = subscription?.plans;

  // Resolve limits strictly matching DB columns with fallback safety
  let limit = null;
  if (planId === "free") {
    limit = dbPlan?.trial_request_limit ?? PLAN_META.free.defaultLimit;
  } else if (planId === "pro") {
    limit = dbPlan?.monthly_request_limit ?? PLAN_META.pro.defaultLimit;
  } else {
    limit = null; // Unlimited plan
  }

  const isUnlimited = limit === null;
  const used = usage?.request_count ?? 0;
  const percentUsed = isUnlimited ? 0 : Math.min(100, Math.round((used / limit) * 100));

  const PlanIcon = plan.icon;

  const overviewContent = (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Welcome back</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{user.email}</p>
      </div>

      <div className={`rounded-[28px] border border-slate-200/80 dark:border-gray-800 p-6 sm:p-8 ${plan.tint}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`rounded-2xl p-3 shadow-md text-white ${plan.iconBg}`}>
              <PlanIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Current plan
              </p>
              <p className={`text-2xl font-extrabold ${plan.text}`}>{plan.name}</p>
            </div>
          </div>
          {subscription?.current_period_end && (
            <span className="rounded-full bg-white/80 dark:bg-gray-950/50 border border-slate-200 dark:border-gray-800 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              Renews / expires {new Date(subscription.current_period_end).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2 text-slate-600 dark:text-slate-300 font-medium">
            <span>
              {used.toLocaleString()} {!isUnlimited ? `/ ${limit.toLocaleString()}` : ""} requests{" "}
              {planId === "free" ? "used (lifetime trial)" : "used this period"}
            </span>
            {isUnlimited && <span className="font-semibold text-emerald-600">Unlimited</span>}
          </div>
          {!isUnlimited && <UsageProgressBar percent={percentUsed} />}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200/80 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">API key</p>
          <code className="block mt-2 text-sm font-mono truncate">{keyInfo.keyPrefix}••••••••</code>
        </div>
        <div className="rounded-2xl border border-slate-200/80 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Need help integrating?</p>
          <Link href="/forex-api#docs" className="text-blue-600 hover:underline text-sm font-semibold">
            View API documentation →
          </Link>
        </div>
      </div>
    </div>
  );

  const usageContent = (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">API Usage</h2>
      <div className="rounded-2xl border border-slate-200/80 dark:border-gray-800 p-6 space-y-3 bg-white dark:bg-gray-900">
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 font-medium">
          <span>{used.toLocaleString()} requests used</span>
          <span>{!isUnlimited ? `${limit.toLocaleString()} limit` : "Unlimited"}</span>
        </div>
        {!isUnlimited ? (
          <UsageProgressBar percent={percentUsed} />
        ) : (
          <p className="text-sm text-emerald-600 font-semibold">No cap on this plan - poll as often as you need.</p>
        )}
      </div>
      <ApiKeyCard keyPrefix={keyInfo.keyPrefix} initialFullKey={keyInfo.fullKey} />
    </div>
  );

  const billingContent = (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Plans &amp; Billing</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        You&apos;re currently on the <strong>{plan.name}</strong> plan.
      </p>
      <ApiPlanCards currentPlanId={planId} showSignInCta={false} />
      <div className="hidden">
        <UpgradeButtons currentPlan={planId} />
      </div>
    </div>
  );

  const profileContent = (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Profile</h2>
      <ProfileForm initialFullName={profile?.full_name} email={user.email} />
    </div>
  );

  const sections = [
    { id: "overview", label: "Overview", content: overviewContent },
    { id: "usage", label: "API Usage", content: usageContent },
    { id: "billing", label: "Plans & Billing", content: billingContent },
    { id: "profile", label: "Profile", content: profileContent },
  ];

  return (
    <DashboardShell
      userEmail={user.email}
      plan={{ name: plan.name, tint: plan.tint, text: plan.text }}
      usage={{ used, limit: isUnlimited ? null : limit, percent: percentUsed, isUnlimited }}
      sections={sections}
    />
  );
}