
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header, { type DashboardRange } from "./components/Header";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] =
    useState<DashboardRange>("Weekly");

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-[#0b1120] text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="flex min-h-screen">
        <Sidebar isDark={isDark} />

        <main className="min-w-0 flex-1">
          <Header
            isDark={isDark}
            onToggleTheme={() =>
              setIsDark((current) => !current)
            }
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />

          <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
            <Dashboard
              isDark={isDark}
              selectedRange={dateRange}
              onSelectedRangeChange={setDateRange}
              searchQuery={searchQuery}
            />
          </div>

          <footer
            className={`border-t px-5 py-5 text-center text-xs ${
              isDark
                ? "border-slate-800/80 text-slate-500"
                : "border-slate-200 text-slate-500"
            }`}
          >
            <span className="font-semibold">DevBoard</span>
            {" · Developer Analytics Dashboard"}
          </footer>
        </main>
      </div>
    </div>
  );
}
