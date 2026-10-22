
import { Bell, Search, CalendarDays, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="flex min-h-[76px] flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/80 px-5 py-4 sm:px-8">
      <div>
        <p className="text-xs font-medium text-slate-500">
          Workspace / Overview
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Dashboard Overview
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5">
          <Search size={17} className="shrink-0 text-slate-500" />
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search dashboard"
            className="w-24 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 sm:w-36"
          />
        </label>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-slate-300 transition hover:border-slate-700 hover:text-white"
        >
          <CalendarDays size={17} />
          <span className="hidden sm:inline">Last 7 days</span>
          <ChevronDown size={15} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:text-white"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-400" />
        </button>
      </div>
    </header>
  );
}
