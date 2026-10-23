
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import type { LanguageUsage } from "../types";

interface LanguageChartProps {
  data: LanguageUsage[];
  isDark?: boolean;
}

const COLORS = [
  "#818cf8",
  "#34d399",
  "#fbbf24",
  "#38bdf8",
  "#c084fc",
  "#fb7185",
  "#2dd4bf",
];

export default function LanguageChart({
  data,
  isDark = true,
}: LanguageChartProps) {
  const theme = {
    card: isDark
      ? "border-slate-800/80 bg-slate-900/70"
      : "border-slate-200 bg-white",
    heading: isDark ? "text-white" : "text-slate-900",
    text: isDark ? "text-slate-400" : "text-slate-500",
    tooltipBg: isDark ? "#0f172a" : "#ffffff",
    tooltipBorder: isDark ? "#334155" : "#e2e8f0",
    tooltipText: isDark ? "#f8fafc" : "#0f172a",
    legend: isDark ? "#cbd5e1" : "#475569",
  };

  const total = data.reduce(
    (sum, item) => sum + Number(item.percentage || 0),
    0,
  );

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

  return (
    <section
      className={`min-w-0 rounded-2xl border p-5 sm:p-6 ${theme.card}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className={`text-lg font-semibold ${theme.heading}`}>
            Language Distribution
          </h2>
          <p className={`mt-1 text-sm ${theme.text}`}>
            Breakdown of languages across repositories
          </p>
        </div>

        <span
          className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium ${
            isDark
              ? "bg-slate-800 text-slate-300"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {data.length} languages
        </span>
      </div>

      {data.length > 0 ? (
        <>
          <div className="relative mt-4 h-[280px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="46%"
                  innerRadius="56%"
                  outerRadius="78%"
                  paddingAngle={3}
                  cornerRadius={4}
                  stroke="none"
                  isAnimationActive
                  animationDuration={700}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{
                    color: theme.tooltipText,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                  itemStyle={{ color: theme.tooltipText }}
                  formatter={(value) => [
                    `${Number(value).toLocaleString()}%`,
                    "Usage",
                  ]}
                />

                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span
                      style={{
                        color: theme.legend,
                        fontSize: 12,
                        paddingLeft: 3,
                      }}
                    >
                      {value}
                    </span>
                  )}
                  wrapperStyle={{ paddingTop: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-x-0 top-[42%] flex -translate-y-1/2 flex-col items-center">
              <span className={`text-xs ${theme.text}`}>
                Total usage
              </span>
              <span className={`mt-1 text-2xl font-bold ${theme.heading}`}>
                {total.toLocaleString()}%
              </span>
            </div>
          </div>

          <div className={`mt-2 border-t pt-4 ${
            isDark ? "border-slate-800" : "border-slate-100"
          }`}>
            <p className={`text-xs leading-5 ${theme.text}`}>
              Language percentages are based on the current sample dataset.
            </p>
          </div>
        </>
      ) : (
        <div className={`flex h-[280px] flex-col items-center justify-center ${theme.text}`}>
          <p className="text-sm font-medium">No language data available</p>
          <p className="mt-1 text-xs">
            Language statistics will appear here when data is available.
          </p>
        </div>
      )}
    </section>
  );
}
