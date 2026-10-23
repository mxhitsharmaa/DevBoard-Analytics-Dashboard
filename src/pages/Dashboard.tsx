
import {
  GitCommitHorizontal,
  GitPullRequest,
  CircleAlert,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ArrowRight,
  GitBranch,
  Clock3,
} from "lucide-react";

import ActivityChart from "../components/ActivityChart";
import LanguageChart from "../components/LanguageChart";
import RecentCommits from "../components/RecentCommits";
import GitHubExplorer from "../components/GitHubExplorer";
import type { DashboardRange } from "../components/Header";

import {
  dailyActivity,
  weeklyActivity,
  monthlyActivity,
  languageUsage,
} from "../data/mockData";

interface DashboardProps {
  isDark: boolean;
  selectedRange: DashboardRange;
  onSelectedRangeChange: (range: DashboardRange) => void;
  searchQuery: string;
}

const stats = [
  {
    title: "Total Commits",
    value: "1,284",
    change: "+12.8%",
    positive: true,
    icon: GitCommitHorizontal,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    description: "Code contributions",
  },
  {
    title: "Pull Requests",
    value: "186",
    change: "+8.2%",
    positive: true,
    icon: GitPullRequest,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    description: "Collaboration activity",
  },
  {
    title: "Open Issues",
    value: "24",
    change: "-5.4%",
    positive: true,
    icon: CircleAlert,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    description: "Outstanding issues",
  },
  {
    title: "Build Success",
    value: "98.6%",
    change: "+2.1%",
    positive: true,
    icon: CheckCircle2,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10",
    description: "Successful builds",
  },
];

const repositoryHealth = [
  { name: "Frontend App", status: "Healthy" },
  { name: "API Service", status: "Healthy" },
  { name: "Design System", status: "Warning" },
  { name: "Documentation", status: "Healthy" },
];

const activityRanges = {
  Daily: dailyActivity,
  Weekly: weeklyActivity,
  Monthly: monthlyActivity,
};

export default function Dashboard({
  isDark,
  selectedRange,
  onSelectedRangeChange,
  searchQuery,
}: DashboardProps) {
  const chartData = activityRanges[selectedRange];

  const colors = {
    heading: isDark ? "text-white" : "text-slate-900",
    text: isDark ? "text-slate-400" : "text-slate-500",
    card: isDark
      ? "border-slate-800/80 bg-slate-900/70"
      : "border-slate-200 bg-white",
    cardHover: isDark
      ? "hover:border-slate-700 hover:bg-slate-900"
      : "hover:border-slate-300 hover:shadow-md",
    rangeContainer: isDark
      ? "border-slate-800 bg-slate-900"
      : "border-slate-200 bg-white",
    inactiveRange: isDark
      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    rangeBadge: isDark
      ? "bg-slate-800 text-slate-300"
      : "bg-slate-100 text-slate-600",
    divider: isDark ? "border-slate-800" : "border-slate-100",
    repositoryText: isDark ? "text-slate-200" : "text-slate-700",
  };

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className={`flex items-center gap-2 text-sm ${colors.text}`}>
            <span className="size-2 rounded-full bg-emerald-500" />
            Developer workspace
          </div>

          <h1 className={`mt-3 text-2xl font-bold tracking-tight sm:text-3xl ${colors.heading}`}>
            Welcome back, Mohit
          </h1>

          <p className={`mt-2 max-w-xl text-sm leading-6 ${colors.text}`}>
            Track your development activity, repository health and team
            performance in one place.
          </p>
        </div>

        <div
          className={`inline-flex w-fit items-center gap-1 rounded-xl border p-1 ${colors.rangeContainer}`}
          role="group"
          aria-label="Activity date range"
        >
          {(Object.keys(activityRanges) as DashboardRange[]).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => onSelectedRangeChange(range)}
              aria-pressed={selectedRange === range}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                selectedRange === range
                  ? "bg-violet-600 text-white shadow-sm"
                  : colors.inactiveRange
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className={`text-lg font-semibold ${colors.heading}`}>
              Overview
            </h2>
            <p className={`mt-1 text-xs ${colors.text}`}>
              Key development metrics
            </p>
          </div>
          <span className={`text-xs ${colors.text}`}>Demo data</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.positive ? ArrowUpRight : ArrowDownRight;

            return (
              <article
                key={stat.title}
                className={`group min-w-0 rounded-2xl border p-5 transition-all duration-200 ${colors.card} ${colors.cardHover}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${colors.text}`}>
                      {stat.title}
                    </p>
                    <p className={`mt-3 text-3xl font-bold tracking-tight ${colors.heading}`}>
                      {stat.value}
                    </p>
                  </div>

                  <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${stat.iconBg}`}>
                    <Icon size={21} strokeWidth={1.8} className={stat.iconColor} />
                  </div>
                </div>

                <div className={`mt-5 flex items-center gap-2 border-t pt-4 ${colors.divider}`}>
                  <span className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-1 text-xs font-semibold ${
                    stat.positive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-rose-500/10 text-rose-500"
                  }`}>
                    <TrendIcon size={14} />
                    {stat.change}
                  </span>
                  <span className={`min-w-0 truncate text-xs ${colors.text}`}>
                    {stat.description}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
              <Activity size={20} />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${colors.heading}`}>
                Development Activity
              </h2>
              <p className={`mt-1 text-xs ${colors.text}`}>
                Commit and pull request trends
              </p>
            </div>
          </div>

          <span className={`rounded-lg px-3 py-1.5 text-xs font-medium ${colors.rangeBadge}`}>
            {selectedRange} view
          </span>
        </div>

        <ActivityChart data={chartData} isDark={isDark} />
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="min-w-0">
          <LanguageChart data={languageUsage} isDark={isDark} />
        </div>

        <article className={`min-w-0 rounded-2xl border p-5 sm:p-6 ${colors.card}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <GitBranch size={19} className="text-violet-500" />
                <h2 className={`text-lg font-semibold ${colors.heading}`}>
                  Repository Health
                </h2>
              </div>
              <p className={`mt-2 text-sm ${colors.text}`}>
                Overview of repository status
              </p>
            </div>

            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
              isDark
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-emerald-50 text-emerald-700"
            }`}>
              3 of 4 healthy
            </span>
          </div>

          <div className="mt-6 space-y-1">
            {repositoryHealth.map((repository) => {
              const healthy = repository.status === "Healthy";

              return (
                <div
                  key={repository.name}
                  className={`flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition-colors ${
                    isDark ? "hover:bg-slate-800/60" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className={`size-2 shrink-0 rounded-full ${
                      healthy ? "bg-emerald-500" : "bg-amber-500"
                    }`} />
                    <span className={`truncate text-sm ${colors.repositoryText}`}>
                      {repository.name}
                    </span>
                  </div>
                  <span className={`shrink-0 text-xs font-medium ${
                    healthy ? "text-emerald-500" : "text-amber-500"
                  }`}>
                    {repository.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className={`mt-5 flex items-center gap-2 border-t pt-4 text-xs ${colors.divider} ${colors.text}`}>
            <Clock3 size={14} />
            <span>Illustrative repository status</span>
            <ArrowRight size={14} className="ml-auto" />
          </div>
        </article>
      </section>

      <section className="min-w-0">
        <RecentCommits isDark={isDark} searchQuery={searchQuery} />
      </section>

      <section className="min-w-0">
        <GitHubExplorer isDark={isDark} />
      </section>
    </div>
  );
}
