
import {
  LayoutDashboard,
  GitCommitHorizontal,
  GitPullRequest,
  CircleAlert,
  ChartNoAxesCombined,
  Settings,
  Code2,
  PanelLeftClose,
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Commits", icon: GitCommitHorizontal },
  { label: "Pull Requests", icon: GitPullRequest },
  { label: "Issues", icon: CircleAlert },
  { label: "Analytics", icon: ChartNoAxesCombined },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300">
      <div className="flex h-[76px] items-center justify-between border-b border-slate-800 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white">
            <Code2 size={23} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              DevBoard
            </h1>
            <p className="text-xs text-slate-500">Developer Analytics</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Sidebar panel"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white"
        >
          <PanelLeftClose size={18} />
        </button>
      </div>

      <div className="px-4 pt-7">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map(({ label, icon: Icon }) => {
            const active = label === "Overview";

            return (
              <button
                key={label}
                type="button"
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-500/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <Icon size={19} />
                <span>{label}</span>
                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-indigo-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-sm font-semibold text-white">Developer workspace</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Your project activity, all in one place.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Dashboard ready
          </div>
        </div>

        <button
          type="button"
          className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-slate-900 hover:text-white"
        >
          <Settings size={19} />
          Settings
        </button>

        <div className="mt-3 flex items-center gap-3 border-t border-slate-800 pt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
            MS
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">Developer</p>
            <p className="truncate text-xs text-slate-500">Personal workspace</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
