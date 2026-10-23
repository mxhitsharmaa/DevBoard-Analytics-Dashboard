
import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  GitCommitHorizontal,
  Search,
  GitBranch,
  CheckCircle2,
  Clock3,
  XCircle,
  X,
} from "lucide-react";

import { commits } from "../data/commits";

type SortOrder = "newest" | "oldest";

interface RecentCommitsProps {
  isDark?: boolean;
  searchQuery?: string;
}

const statusStyles = {
  Success: {
    badge: "bg-emerald-500/10 text-emerald-500",
    icon: CheckCircle2,
  },
  Pending: {
    badge: "bg-amber-500/10 text-amber-500",
    icon: Clock3,
  },
  Failed: {
    badge: "bg-rose-500/10 text-rose-500",
    icon: XCircle,
  },
};

export default function RecentCommits({
  isDark = true,
  searchQuery = "",
}: RecentCommitsProps) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const colors = {
    card: isDark
      ? "border-slate-800/80 bg-slate-900/70"
      : "border-slate-200 bg-white",
    border: isDark ? "border-slate-800" : "border-slate-200",
    heading: isDark ? "text-white" : "text-slate-900",
    description: isDark ? "text-slate-400" : "text-slate-500",
    input: isDark
      ? "border-slate-700 bg-slate-950/70 text-white placeholder:text-slate-500 focus-within:border-violet-500"
      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-within:border-violet-500",
    button: isDark
      ? "border-slate-700 text-slate-300 hover:bg-slate-800"
      : "border-slate-300 text-slate-700 hover:bg-slate-100",
    tableHead: isDark
      ? "bg-slate-950/50 text-slate-400"
      : "bg-slate-50 text-slate-500",
    rowBorder: isDark ? "divide-slate-800" : "divide-slate-100",
    rowHover: isDark ? "hover:bg-slate-800/40" : "hover:bg-slate-50",
    commitText: isDark ? "text-slate-200" : "text-slate-800",
    authorText: isDark ? "text-slate-300" : "text-slate-600",
    branch: isDark
      ? "border-slate-700 bg-slate-800/50 text-slate-300"
      : "border-slate-200 bg-slate-50 text-slate-600",
    avatar: isDark
      ? "bg-violet-500/15 text-violet-300"
      : "bg-violet-100 text-violet-700",
  };

  const filteredCommits = useMemo(() => {
    // A global search query takes priority over the table search.
    const query = (searchQuery.trim() || search.trim()).toLowerCase();

    return commits
      .filter((commit) =>
        [
          commit.message,
          commit.author,
          commit.branch,
          commit.status,
        ].some((value) => value.toLowerCase().includes(query)),
      )
      .sort((a, b) => {
        const comparison =
          new Date(a.date).getTime() - new Date(b.date).getTime();

        return sortOrder === "newest" ? -comparison : comparison;
      });
  }, [search, searchQuery, sortOrder]);

  const hasGlobalSearch = searchQuery.trim().length > 0;
 

  return (
    <section className={`min-w-0 overflow-hidden rounded-2xl border ${colors.card}`}>
      {/* Header */}
      <div
        className={`flex flex-col gap-4 border-b p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between ${colors.border}`}
      >
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
              <GitCommitHorizontal size={19} />
            </div>

            <h2 className={`text-lg font-semibold ${colors.heading}`}>
              Recent Commits
            </h2>
          </div>

          <p className={`mt-2 text-sm ${colors.description}`}>
            Browse and filter recent repository activity.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label
            className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 transition-colors ${colors.input}`}
          >
            <Search size={16} className="shrink-0 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={
                hasGlobalSearch ? "Using dashboard search" : "Search commits..."
              }
              aria-label="Search commit messages, authors, branches and statuses"
              className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none sm:w-44"
            />

            {search && (
              <button
                type="button"
                aria-label="Clear table search"
                title="Clear table search"
                onClick={() => setSearch("")}
                className="shrink-0 rounded p-1 text-slate-400 hover:text-violet-500"
              >
                <X size={14} />
              </button>
            )}
          </label>

          <button
            type="button"
            onClick={() =>
              setSortOrder((current) =>
                current === "newest" ? "oldest" : "newest",
              )
            }
            aria-label={`Sort commits ${sortOrder === "newest" ? "oldest first" : "newest first"}`}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${colors.button}`}
          >
            <ArrowDownUp size={16} />
            {sortOrder === "newest" ? "Newest first" : "Oldest first"}
          </button>
        </div>
      </div>

      {hasGlobalSearch && (
        <div
          className={`border-b px-5 py-2.5 text-xs ${colors.border} ${colors.description}`}
        >
          Dashboard search: <span className={colors.heading}>{searchQuery}</span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className={`text-[11px] uppercase tracking-[0.12em] ${colors.tableHead}`}>
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold">
                Commit
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Author
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Branch
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Date
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody className={`divide-y ${colors.rowBorder}`}>
            {filteredCommits.map((commit) => {
              const status = statusStyles[commit.status];
              const Icon = status.icon;

              return (
                <tr
                  key={commit.id}
                  className={`transition-colors ${colors.rowHover}`}
                >
                  <td className="max-w-[320px] px-5 py-4">
                    <div className="flex items-start gap-3">
                      <GitCommitHorizontal
                        size={18}
                        className="mt-0.5 shrink-0 text-violet-500"
                      />

                      <span
                        title={commit.message}
                        className={`line-clamp-2 text-sm font-medium leading-5 ${colors.commitText}`}
                      >
                        {commit.message}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${colors.avatar}`}
                      >
                        {commit.initials}
                      </span>

                      <span className={`text-sm ${colors.authorText}`}>
                        {commit.author}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex max-w-40 items-center gap-1.5 rounded-lg border px-2 py-1 font-mono text-xs ${colors.branch}`}
                    >
                      <GitBranch size={12} className="shrink-0" />
                      <span className="truncate">{commit.branch}</span>
                    </span>
                  </td>

                  <td
                    className={`whitespace-nowrap px-5 py-4 text-sm ${colors.description}`}
                  >
                    {new Date(`${commit.date}T12:00:00`).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.badge}`}
                    >
                      <Icon size={13} />
                      {commit.status}
                    </span>
                  </td>
                </tr>
              );
            })}

            {filteredCommits.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-14 text-center">
                  <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-slate-500/10">
                    <Search size={20} className={colors.description} />
                  </div>

                  <p className={`mt-3 text-sm font-medium ${colors.heading}`}>
                    No commits found
                  </p>

                  <p className={`mt-1 text-xs ${colors.description}`}>
                    Try a different search term.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                    }}
                    className="mt-3 text-sm font-medium text-violet-500 hover:text-violet-400"
                  >
                    Clear table search
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        className={`flex flex-col gap-2 border-t px-5 py-4 text-xs sm:flex-row sm:items-center sm:justify-between ${colors.border} ${colors.description}`}
      >
        <span>
          Showing{" "}
          <span className={`font-semibold ${colors.heading}`}>
            {filteredCommits.length}
          </span>{" "}
          of {commits.length} commits
        </span>

        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-violet-500" />
          Sorted by {sortOrder === "newest" ? "newest first" : "oldest first"}
        </span>
      </div>
    </section>
  );
}
