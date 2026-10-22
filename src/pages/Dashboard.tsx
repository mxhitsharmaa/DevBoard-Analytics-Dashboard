
import {
  GitCommitHorizontal,
  GitPullRequest,
  CircleAlert,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Total Commits",
    value: "1,284",
    change: "+12.8%",
    detail: "vs. previous period",
    icon: GitCommitHorizontal,
    positive: true,
    color: "indigo",
  },
  {
    title: "Pull Requests",
    value: "86",
    change: "+8.2%",
    detail: "vs. previous period",
    icon: GitPullRequest,
    positive: true,
    color: "violet",
  },
  {
    title: "Open Issues",
    value: "24",
    change: "-5.4%",
    detail: "vs. previous period",
    icon: CircleAlert,
    positive: true,
    color: "amber",
  },
  {
    title: "Build Success",
    value: "98.6%",
    change: "+2.1%",
    detail: "vs. previous period",
    icon: CheckCircle2,
    positive: true,
    color: "emerald",
  },
];

const colorStyles: Record<string, string> = {
  indigo: "bg-indigo-500/15 text-indigo-300",
  violet: "bg-violet-500/15 text-violet-300",
  amber: "bg-amber-500/15 text-amber-300",
  emerald: "bg-emerald-500/15 text-emerald-300",
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Activity size={16} className="text-indigo-400" />
            Project performance
          </div>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Welcome back, Developer
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Here is what's happening across your development projects.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          + New report
        </button>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-semibold text-white">Overview metrics</h4>
          <span className="text-xs text-slate-500">Sample data</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.positive ? ArrowUpRight : ArrowDownRight;

            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-slate-400">
                    {stat.title}
                  </p>
                  <div
                    className={`rounded-xl p-2.5 ${colorStyles[stat.color]}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <p className="mt-5 text-3xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                    <TrendIcon size={14} />
                    {stat.change}
                  </span>
                  <span className="text-slate-500">{stat.detail}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="font-semibold text-white">Development activity</h4>
              <p className="mt-1 text-sm text-slate-400">
                Commit and pull request activity will appear here.
              </p>
            </div>
            <span className="rounded-lg border border-slate-800 px-3 py-1.5 text-xs text-slate-400">
              Last 7 days
            </span>
          </div>

          <div className="mt-6 flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 text-center">
            <Activity size={28} className="text-slate-600" />
            <p className="mt-3 text-sm font-medium text-slate-300">
              Activity chart coming next
            </p>
            <p className="mt-1 text-xs text-slate-500">
              We will add interactive Recharts visualizations in Step 7.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h4 className="font-semibold text-white">Repository health</h4>
          <p className="mt-1 text-sm text-slate-400">
            A quick look at your project
          </p>

          <div className="mt-6 space-y-5">
            {[
              { label: "Build status", value: "Passing", color: "bg-emerald-400" },
              { label: "Open pull requests", value: "12", color: "bg-violet-400" },
              { label: "Pending issues", value: "24", color: "bg-amber-400" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="text-sm text-slate-400">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-xl bg-slate-800/60 p-4">
            <p className="text-sm font-medium text-white">Looking good</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              This preview uses sample data. Real repository health checks
              will be added with GitHub API integration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
