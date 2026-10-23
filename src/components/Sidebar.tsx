
import { useState } from "react";
import {
  LayoutDashboard,
  GitCommitHorizontal,
  GitPullRequest,
  CircleAlert,
  ChartNoAxesCombined,
  Settings,
  Code2,
  PanelLeftClose,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  isDark: boolean;
}

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Commits", icon: GitCommitHorizontal },
  { label: "Pull Requests", icon: GitPullRequest },
  { label: "Issues", icon: CircleAlert },
  { label: "Analytics", icon: ChartNoAxesCombined },
];

export default function Sidebar({ isDark }: SidebarProps) {
  const [activePage, setActivePage] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = isDark
    ? {
        sidebar: "border-slate-800/80 bg-[#0b1120] text-slate-300",
        border: "border-slate-800/80",
        heading: "text-white",
        muted: "text-slate-500",
        inactive:
          "text-slate-400 hover:bg-slate-800/60 hover:text-white",
        panel: "border-slate-800 bg-slate-900/70",
        avatar: "bg-gradient-to-br from-violet-500 to-blue-600 text-white",
        mobileButton:
          "border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800",
        active:
          "bg-violet-500/10 text-violet-300 ring-1 ring-inset ring-violet-500/20",
      }
    : {
        sidebar: "border-slate-200 bg-white text-slate-700",
        border: "border-slate-200",
        heading: "text-slate-900",
        muted: "text-slate-500",
        inactive:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
        panel: "border-slate-200 bg-slate-50",
        avatar: "bg-gradient-to-br from-violet-500 to-blue-600 text-white",
        mobileButton:
          "border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
        active:
          "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
      };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
        aria-controls="devboard-sidebar"
        onClick={() => setMobileOpen((open) => !open)}
        className={`fixed left-4 top-4 z-50 rounded-xl border p-2.5 shadow-lg transition-colors lg:hidden ${theme.mobileButton}`}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation backdrop"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 cursor-default bg-slate-950/60 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        id="devboard-sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-64 shrink-0 flex-col border-r transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          theme.sidebar
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className={`flex h-[76px] shrink-0 items-center justify-between border-b px-5 ${theme.border}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 text-white shadow-lg shadow-violet-950/20">
              <Code2 size={22} strokeWidth={2.2} />
            </div>

            <div>
              <h1 className={`text-lg font-bold tracking-tight ${theme.heading}`}>
                DevBoard
              </h1>
              <p className={`mt-0.5 text-[11px] ${theme.muted}`}>
                Developer Analytics
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={closeMobileMenu}
            className={`rounded-lg p-2 transition-colors hover:bg-slate-500/10 lg:hidden ${theme.muted}`}
          >
            <X size={18} />
          </button>

          <PanelLeftClose
            size={18}
            aria-hidden="true"
            className={`hidden lg:block ${theme.muted}`}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 pt-7">
          <p
            className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] ${theme.muted}`}
          >
            Workspace
          </p>

          <nav className="space-y-1" aria-label="Main navigation">
            {navigation.map(({ label, icon: Icon }) => {
              const active = activePage === label;

              return (
                <button
                  key={label}
                  type="button"
                  aria-current={active ? "page" : undefined}
                  onClick={() => {
                    setActivePage(label);
                    closeMobileMenu();
                  }}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                    active ? theme.active : theme.inactive
                  }`}
                >
                  {active && (
                    <span className="absolute bottom-2.5 left-0 top-2.5 w-[3px] rounded-r-full bg-violet-500" />
                  )}

                  <Icon
                    size={19}
                    strokeWidth={active ? 2.2 : 1.8}
                    className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      active ? "text-violet-500" : ""
                    }`}
                  />

                  <span className="flex-1">{label}</span>

                  {active ? (
                    <span className="size-1.5 rounded-full bg-violet-500" />
                  ) : (
                    <ChevronRight
                      size={14}
                      className="opacity-0 transition-opacity group-hover:opacity-50"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className={`my-6 border-t ${theme.border}`} />

          <p
            className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] ${theme.muted}`}
          >
            Preferences
          </p>

          <button
            type="button"
            aria-current={activePage === "Settings" ? "page" : undefined}
            onClick={() => {
              setActivePage("Settings");
              closeMobileMenu();
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
              activePage === "Settings" ? theme.active : theme.inactive
            }`}
          >
            <Settings size={19} strokeWidth={1.8} />
            <span className="flex-1 text-left">Settings</span>
          </button>
        </div>

        <div className="shrink-0 p-4 pt-2">
          <div className={`rounded-2xl border p-4 ${theme.panel}`}>
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                <ChartNoAxesCombined size={17} />
              </span>
              <p className={`text-xs font-semibold ${theme.heading}`}>
                Developer workspace
              </p>
            </div>

            <p className={`mt-3 text-xs leading-5 ${theme.muted}`}>
              Your project activity, all in one place.
            </p>

            <div
              className={`mt-4 flex items-center gap-2 border-t pt-3 text-[11px] ${
                isDark
                  ? "border-slate-800 text-emerald-400"
                  : "border-slate-200 text-emerald-600"
              }`}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              UI ready
            </div>
          </div>

          <div className={`mt-4 flex items-center gap-3 border-t pt-4 ${theme.border}`}>
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${theme.avatar}`}
            >
              MS
            </div>

            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm font-semibold ${theme.heading}`}>
                Mohit Sharma
              </p>
              <p className={`mt-0.5 truncate text-xs ${theme.muted}`}>
                Personal workspace
              </p>
            </div>

            <span
              className={`size-2 rounded-full ${
                isDark ? "bg-emerald-400" : "bg-emerald-500"
              }`}
              title="Local dashboard"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
