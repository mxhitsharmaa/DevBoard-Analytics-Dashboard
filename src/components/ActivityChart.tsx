
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";

import type { CommitActivity } from "../types";

interface ActivityChartProps {
  data: CommitActivity[];
  isDark?: boolean;
}

export default function ActivityChart({
  data,
  isDark = true,
}: ActivityChartProps) {
  const theme = {
    card: isDark
      ? "border-slate-800/80 bg-slate-900/70"
      : "border-slate-200 bg-white",
    heading: isDark ? "text-white" : "text-slate-900",
    text: isDark ? "text-slate-400" : "text-slate-500",
    axis: isDark ? "#94a3b8" : "#64748b",
    grid: isDark ? "#334155" : "#e2e8f0",
    tooltipBg: isDark ? "#0f172a" : "#ffffff",
    tooltipBorder: isDark ? "#334155" : "#e2e8f0",
    tooltipText: isDark ? "#f8fafc" : "#0f172a",
  };

  const tooltipStyle = {
    backgroundColor: theme.tooltipBg,
    border: `1px solid ${theme.tooltipBorder}`,
    borderRadius: 12,
    color: theme.tooltipText,
    padding: "10px 14px",
    boxShadow: isDark
      ? "0 12px 30px rgba(0,0,0,0.25)"
      : "0 12px 30px rgba(15,23,42,0.08)",
  };

  const chartMargin = {
    top: 12,
    right: 8,
    left: -20,
    bottom: 0,
  };

  const axisTick = {
    fill: theme.axis,
    fontSize: 11,
  };

  const commonAxisProps = {
    tick: axisTick,
    tickLine: false as const,
    axisLine: false as const,
    tickMargin: 10,
  };

  const commonGridProps = {
    stroke: theme.grid,
    strokeDasharray: "4 4",
    vertical: false,
  };

  const commonLegendStyle = {
    color: theme.axis,
    fontSize: 12,
    paddingTop: 14,
  };

  const renderEmptyState = data.length === 0;

  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
      {/* Commit activity */}
      <section className={`min-w-0 rounded-2xl border p-5 sm:p-6 ${theme.card}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`text-base font-semibold ${theme.heading}`}>
              Commit activity
            </h3>
            <p className={`mt-1 text-sm ${theme.text}`}>
              Commit contributions over time
            </p>
          </div>

          <span className="rounded-lg bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-500">
            Commits
          </span>
        </div>

        <div className="mt-5 h-[260px] w-full">
          {renderEmptyState ? (
            <div className={`flex h-full items-center justify-center text-sm ${theme.text}`}>
              No commit activity available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={chartMargin}>
                <CartesianGrid {...commonGridProps} />

                <XAxis
                  dataKey="date"
                  stroke={theme.axis}
                  {...commonAxisProps}
                  minTickGap={16}
                />

                <YAxis
                  stroke={theme.axis}
                  {...commonAxisProps}
                  allowDecimals={false}
                  width={38}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{
                    color: theme.tooltipText,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                  itemStyle={{ color: "#818cf8" }}
                  cursor={{
                    stroke: theme.grid,
                    strokeDasharray: "4 4",
                  }}
                  formatter={(value) => [
                    Number(value).toLocaleString(),
                    "Commits",
                  ]}
                />

                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={commonLegendStyle}
                />

                <Line
                  type="monotone"
                  dataKey="commits"
                  name="Commits"
                  stroke="#818cf8"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "#818cf8",
                    stroke: isDark ? "#0f172a" : "#ffffff",
                    strokeWidth: 2,
                  }}
                  isAnimationActive
                  animationDuration={700}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* Pull request activity */}
      <section className={`min-w-0 rounded-2xl border p-5 sm:p-6 ${theme.card}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`text-base font-semibold ${theme.heading}`}>
              Pull request activity
            </h3>
            <p className={`mt-1 text-sm ${theme.text}`}>
              Pull requests over time
            </p>
          </div>

          <span className="rounded-lg bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-500">
            Pull requests
          </span>
        </div>

        <div className="mt-5 h-[260px] w-full">
          {renderEmptyState ? (
            <div className={`flex h-full items-center justify-center text-sm ${theme.text}`}>
              No pull request activity available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={chartMargin}>
                <CartesianGrid {...commonGridProps} />

                <XAxis
                  dataKey="date"
                  stroke={theme.axis}
                  {...commonAxisProps}
                  minTickGap={16}
                />

                <YAxis
                  stroke={theme.axis}
                  {...commonAxisProps}
                  allowDecimals={false}
                  width={38}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{
                    color: theme.tooltipText,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                  itemStyle={{ color: "#38bdf8" }}
                  cursor={{
                    fill: isDark ? "#334155" : "#f1f5f9",
                  }}
                  formatter={(value) => [
                    Number(value).toLocaleString(),
                    "Pull Requests",
                  ]}
                />

                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={commonLegendStyle}
                />

                <Bar
                  dataKey="pullRequests"
                  name="Pull Requests"
                  fill="#38bdf8"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={36}
                  isAnimationActive
                  animationDuration={700}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    </div>
  );
}
