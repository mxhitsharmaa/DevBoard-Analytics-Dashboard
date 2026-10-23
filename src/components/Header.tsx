
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Moon,
  Search,
  Sun,
} from "lucide-react";

export type DashboardRange = "Daily" | "Weekly" | "Monthly";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange: DashboardRange;
  onDateRangeChange: (value: DashboardRange) => void;
}

export default function Header({
  isDark,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
}: HeaderProps) {
  const muted = isDark ? "text-slate-400" : "text-slate-500";
  const control = isDark
    ? "border-slate-800 bg-slate-900/80 text-slate-200 hover:bg-slate-800"
    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";

  return (
    <header
      className={`sticky top-0 z-30 border-b backdrop-blur-xl ${
        isDark
          ? "border-slate-800/80 bg-[#0b1120]/90"
          : "border-slate-200 bg-white/90"
      }`}
    >
      <div className="flex min-h-[76px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className={`text-xs font-medium ${muted}`}>
            Workspace / Overview
          </p>
          <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
            Dashboard
          </h1>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">
          <label
            className={`flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 transition-colors sm:w-56 sm:flex-none ${control} focus-within:border-violet-500`}
          >
            <Search size={17} className={muted} />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search commits..."
              aria-label="Search dashboard commits"
              className="w-full min-w-0 bg-transparent py-2 text-sm outline-none placeholder:text-slate-500"
            />
            <kbd
              className={`hidden rounded border px-1.5 py-0.5 text-[10px] sm:inline ${
                isDark
                  ? "border-slate-700 text-slate-500"
                  : "border-slate-200 text-slate-400"
              }`}
            >
              /
            </kbd>
          </label>

          <label
            className={`flex items-center gap-2 rounded-xl border px-3 ${control}`}
          >
            <CalendarDays size={16} className={muted} />
            <select
              value={dateRange}
              onChange={(event) =>
                onDateRangeChange(event.target.value as DashboardRange)
              }
              aria-label="Select date range"
              className="max-w-24 cursor-pointer bg-transparent py-2 text-sm outline-none"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <ChevronDown size={14} className={muted} />
          </label>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className={`rounded-xl border p-2.5 transition-colors ${control}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            aria-label="Notifications"
            title="Notifications"
            className={`relative rounded-xl border p-2.5 transition-colors ${control}`}
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-violet-500" />
          </button>

          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-violet-950/20"
            title="Mohit Sharma"
            aria-label="User profile: Mohit Sharma"
          >
            MS
          </div>
        </div>
      </div>
    </header>
  );
}
