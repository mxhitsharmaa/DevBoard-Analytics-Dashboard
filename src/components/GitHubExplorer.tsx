
import { useCallback, useEffect, useState, type FormEvent } from "react";
import {

  Search,
  GitBranch,
  GitCommitHorizontal,
  ExternalLink,
  LoaderCircle,
  AlertCircle,
  CalendarDays,
  Star,
  GitFork,
  Code2,
  ChevronDown,
  ChevronUp,
  Users,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

interface GitHubExplorerProps {
  isDark: boolean;
}

interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
}

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
  updated_at: string;
  private: boolean;
  fork: boolean;
}

interface GitHubCommit {
  sha: string;
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
  } | null;
  commit: {
    message: string;
    author: {
      name: string;
      date: string | null;
    } | null;
  };
}

interface GitHubApiError {
  message?: string;
}

const PAGE_SIZE = 6;

export default function GitHubExplorer({
  isDark,
}: GitHubExplorerProps) {
  const [username, setUsername] = useState("");
  const [activeUsername, setActiveUsername] = useState("");
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [selectedRepo, setSelectedRepo] =
    useState<GitHubRepository | null>(null);
  const [repoCommits, setRepoCommits] = useState<GitHubCommit[]>([]);

  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingCommits, setLoadingCommits] = useState(false);
  const [error, setError] = useState("");
  const [commitError, setCommitError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const theme = {
    heading: isDark ? "text-white" : "text-slate-900",
    text: isDark ? "text-slate-400" : "text-slate-500",
    card: isDark
      ? "border-slate-800 bg-slate-900/70"
      : "border-slate-200 bg-white",
    border: isDark ? "border-slate-800" : "border-slate-200",
    input: isDark
      ? "border-slate-700 bg-slate-950 text-white placeholder:text-slate-500"
      : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
    soft: isDark
      ? "bg-slate-800 text-slate-300"
      : "bg-slate-100 text-slate-600",
    hover: isDark ? "hover:bg-slate-800/70" : "hover:bg-slate-50",
    button: isDark
      ? "border-slate-700 hover:bg-slate-800"
      : "border-slate-200 hover:bg-slate-100",
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  };

  const requestGitHub = useCallback(
    async <T,>(url: string): Promise<T> => {
      const response = await fetch(url, {
        headers: {
          Accept: "application/vnd.github+json",
        },
      });

      if (!response.ok) {
        let message = `GitHub request failed (${response.status}).`;

        try {
          const body = (await response.json()) as GitHubApiError;

          if (body.message) {
            message = body.message;
          }
        } catch {
          // Keep the default error if the response is not JSON.
        }

        if (response.status === 404) {
          message = "GitHub user or repository was not found.";
        } else if (response.status === 403 || response.status === 429) {
          message =
            "GitHub API rate limit reached. Please wait a few minutes and try again.";
        }

        throw new Error(message);
      }

      return (await response.json()) as T;
    },
    [],
  );

  const loadRepositories = useCallback(
    async (login: string, nextPage: number) => {
      const data = await requestGitHub<GitHubRepository[]>(
        `https://api.github.com/users/${encodeURIComponent(login)}/repos?sort=updated&per_page=${PAGE_SIZE}&page=${nextPage}`,
      );

      setRepositories((current) =>
        nextPage === 1 ? data : [...current, ...data],
      );
      setHasMore(data.length === PAGE_SIZE);
      setPage(nextPage);
    },
    [requestGitHub],
  );

  const searchUser = useCallback(
    async (login: string) => {
      const cleanLogin = login.trim().replace(/^@/, "");

      if (!cleanLogin) {
        setError("Enter a GitHub username to continue.");
        return;
      }

      setLoadingUser(true);
      setError("");
      setCommitError("");
      setProfile(null);
      setRepositories([]);
      setSelectedRepo(null);
      setRepoCommits([]);
      setActiveUsername(cleanLogin);
      setHasMore(false);
      setPage(1);

      try {
        const userProfile = await requestGitHub<GitHubProfile>(
          `https://api.github.com/users/${encodeURIComponent(cleanLogin)}`,
        );

        setProfile(userProfile);
        setUsername(cleanLogin);

        await loadRepositories(cleanLogin, 1);
      } catch (err) {
        setProfile(null);
        setRepositories([]);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load GitHub profile. Please try again.",
        );
      } finally {
        setLoadingUser(false);
      }
    },
    [loadRepositories, requestGitHub],
  );

  useEffect(() => {
    if (!selectedRepo) return;

    const controller = new AbortController();

    const loadCommits = async () => {
      setLoadingCommits(true);
      setCommitError("");
      setRepoCommits([]);

      try {
        const response = await fetch(
          `https://api.github.com/repos/${selectedRepo.full_name}/commits?per_page=5`,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/vnd.github+json",
            },
          },
        );

        if (!response.ok) {
          let message = `Unable to load commits (${response.status}).`;

          try {
            const body = (await response.json()) as GitHubApiError;
            if (body.message) message = body.message;
          } catch {
            // Keep the default error.
          }

          if (response.status === 403 || response.status === 429) {
            message =
              "GitHub API rate limit reached. Please try again later.";
          }

          throw new Error(message);
        }

        const commits = (await response.json()) as GitHubCommit[];
        setRepoCommits(commits);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setCommitError(
          err instanceof Error
            ? err.message
            : "Unable to load repository commits.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCommits(false);
        }
      }
    };

    void loadCommits();

    return () => controller.abort();
  }, [selectedRepo]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void searchUser(username);
  };

  const handleLoadMore = async () => {
    if (!activeUsername || loadingMore || !hasMore) return;

    setLoadingMore(true);
    setError("");

    try {
      await loadRepositories(activeUsername, page + 1);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load more repositories.",
      );
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <section className="space-y-5">
      <div
        className={`overflow-hidden rounded-2xl border ${theme.card}`}
      >
        <div
          className={`flex items-center justify-between gap-3 border-b p-5 sm:p-6 ${theme.border}`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
             <GitBranch size={23} />
            </div>

            <div className="min-w-0">
              <h2 className={`text-lg font-semibold ${theme.heading}`}>
                GitHub Explorer
              </h2>
              <p className={`mt-1 text-sm ${theme.text}`}>
                Explore profiles, repositories and recent commits
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-label={expanded ? "Collapse GitHub Explorer" : "Expand GitHub Explorer"}
            aria-expanded={expanded}
            className={`flex size-9 shrink-0 items-center justify-center rounded-lg border ${theme.border} ${theme.button}`}
          >
            {expanded ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
        </div>

        {expanded && (
          <div className="space-y-6 p-5 sm:p-6">
            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">GitHub username</span>
                <GitBranch
  size={30}
  className={`mx-auto ${theme.text}`}
/>
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter GitHub username"
                  autoComplete="off"
                  className={`w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${theme.input}`}
                />
              </label>

              <button
                type="submit"
                disabled={loadingUser}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingUser ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Search size={17} />
                )}
                {loadingUser ? "Searching..." : "Explore"}
              </button>
            </form>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-500"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {loadingUser && !profile && (
              <div className={`flex items-center justify-center gap-3 py-12 text-sm ${theme.text}`}>
                <LoaderCircle
                  size={20}
                  className="animate-spin text-violet-500"
                />
                Loading GitHub profile and repositories...
              </div>
            )}

            {profile && (
              <>
                <div className={`rounded-2xl border p-5 sm:p-6 ${theme.border}`}>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <img
                      src={profile.avatar_url}
                      alt={`${profile.login}'s avatar`}
                      className="size-20 shrink-0 rounded-2xl border border-slate-500/10 object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className={`text-xl font-bold ${theme.heading}`}>
                          {profile.name || profile.login}
                        </h3>
                        <span className={`rounded-md px-2 py-1 text-xs ${theme.soft}`}>
                          @{profile.login}
                        </span>
                      </div>

                      <p className={`mt-2 text-sm leading-6 ${theme.text}`}>
                        {profile.bio || "No public bio provided."}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                        {profile.location && (
                          <span className={`inline-flex items-center gap-1.5 text-xs ${theme.text}`}>
                            <MapPin size={14} />
                            {profile.location}
                          </span>
                        )}

                        {profile.blog && (
                          <a
                            href={
                              /^https?:\/\//i.test(profile.blog)
                                ? profile.blog
                                : `https://${profile.blog}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-violet-500 hover:underline"
                          >
                            <LinkIcon size={14} />
                            Website
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>

                      <a
                        href={profile.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-500/10 px-3 py-2 text-xs font-semibold text-violet-500 transition hover:bg-violet-500/15"
                      >
                        View GitHub Profile
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>

                  <div className={`mt-6 grid grid-cols-1 gap-3 border-t pt-5 sm:grid-cols-3 ${theme.border}`}>
                    {[
                      {
                        label: "Repositories",
                        value: profile.public_repos,
                        icon: GitBranch,
                      },
                      {
                        label: "Followers",
                        value: profile.followers,
                        icon: Users,
                      },
                      {
                        label: "Following",
                        value: profile.following,
                        icon: Users,
                      },
                    ].map((stat) => {
                      const Icon = stat.icon;

                      return (
                        <div
                          key={stat.label}
                          className={`rounded-xl p-4 ${theme.soft}`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon size={16} className="text-violet-500" />
                            <span className={`text-xs ${theme.text}`}>
                              {stat.label}
                            </span>
                          </div>
                          <p className={`mt-2 text-2xl font-bold ${theme.heading}`}>
                            {stat.value.toLocaleString("en-IN")}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className={`text-lg font-semibold ${theme.heading}`}>
                        Public Repositories
                      </h3>
                      <p className={`mt-1 text-sm ${theme.text}`}>
                        Select a repository to inspect recent commits.
                      </p>
                    </div>

                    <span className={`rounded-lg px-3 py-1.5 text-xs ${theme.soft}`}>
                      {repositories.length} loaded
                    </span>
                  </div>

                  {repositories.length === 0 ? (
                    <div className={`rounded-xl border border-dashed p-8 text-center ${theme.border}`}>
                      <GitBranch
                        size={25}
                        className={`mx-auto ${theme.text}`}
                      />
                      <p className={`mt-3 text-sm ${theme.text}`}>
                        No public repositories found.
                      </p>
                    </div>
                  ) : (
                    <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
                      {repositories.map((repo) => {
                        const isSelected = selectedRepo?.id === repo.id;

                        return (
                          <article
                            key={repo.id}
                            className={`flex min-w-0 flex-col rounded-xl border p-4 transition ${
                              isSelected
                                ? "border-violet-500 ring-1 ring-violet-500/30"
                                : theme.border
                            } ${theme.hover}`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex min-w-0 items-start gap-2.5">
                                <Code2
                                  size={18}
                                  className="mt-0.5 shrink-0 text-violet-500"
                                />
                                <div className="min-w-0">
                                  <h4 className={`break-words text-sm font-semibold ${theme.heading}`}>
                                    {repo.name}
                                  </h4>
                                  {repo.fork && (
                                    <span className={`mt-1 inline-block text-xs ${theme.text}`}>
                                      Forked repository
                                    </span>
                                  )}
                                </div>
                              </div>

                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Open ${repo.name} on GitHub`}
                                className={`shrink-0 rounded-lg p-2 ${theme.text} hover:text-violet-500`}
                              >
                                <ExternalLink size={15} />
                              </a>
                            </div>

                            <p className={`mt-3 min-h-10 flex-1 text-sm leading-5 ${theme.text}`}>
                              {repo.description || "No description provided."}
                            </p>

                            <div className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-3 ${theme.border}`}>
                              {repo.language && (
                                <span className={`inline-flex items-center gap-1.5 text-xs ${theme.text}`}>
                                  <Code2 size={13} className="text-violet-500" />
                                  {repo.language}
                                </span>
                              )}

                              <span className={`inline-flex items-center gap-1 text-xs ${theme.text}`}>
                                <Star size={13} />
                                {repo.stargazers_count}
                              </span>

                              <span className={`inline-flex items-center gap-1 text-xs ${theme.text}`}>
                                <GitFork size={13} />
                                {repo.forks_count}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedRepo((current) =>
                                  current?.id === repo.id ? null : repo,
                                )
                              }
                              aria-expanded={isSelected}
                              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                                isSelected
                                  ? "border-violet-500/30 bg-violet-500/10 text-violet-500"
                                  : `${theme.border} ${theme.heading} hover:border-violet-500/50`
                              }`}
                            >
                              <GitCommitHorizontal size={15} />
                              {isSelected ? "Hide commits" : "View commits"}
                            </button>
                          </article>
                        );
                      })}
                    </div>
                  )}

                  {hasMore && (
                    <div className="mt-5 flex justify-center">
                      <button
                        type="button"
                        onClick={() => void handleLoadMore()}
                        disabled={loadingMore}
                        className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${theme.border} ${theme.heading} ${theme.button}`}
                      >
                        {loadingMore && (
                          <LoaderCircle
                            size={16}
                            className="animate-spin"
                          />
                        )}
                        {loadingMore
                          ? "Loading..."
                          : "Load more repositories"}
                      </button>
                    </div>
                  )}
                </div>

                {selectedRepo && (
                  <div className={`overflow-hidden rounded-2xl border ${theme.card}`}>
                    <div className={`flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between ${theme.border}`}>
                      <div>
                        <h3 className={`text-lg font-semibold ${theme.heading}`}>
                          Recent Commits
                        </h3>
                        <p className={`mt-1 break-all text-sm ${theme.text}`}>
                          {selectedRepo.full_name}
                        </p>
                      </div>

                      <a
                        href={`${selectedRepo.html_url}/commits/${encodeURIComponent(selectedRepo.default_branch)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 self-start text-sm text-violet-500 hover:text-violet-400"
                      >
                        View on GitHub
                        <ExternalLink size={14} />
                      </a>
                    </div>

                    {loadingCommits ? (
                      <div className={`flex items-center justify-center gap-2 p-10 text-sm ${theme.text}`}>
                        <LoaderCircle
                          size={18}
                          className="animate-spin"
                        />
                        Loading commits...
                      </div>
                    ) : commitError ? (
                      <div
                        role="alert"
                        className="flex items-start gap-2 p-5 text-sm text-rose-500"
                      >
                        <AlertCircle size={17} className="mt-0.5 shrink-0" />
                        {commitError}
                      </div>
                    ) : repoCommits.length === 0 ? (
                      <p className={`p-8 text-center text-sm ${theme.text}`}>
                        No commits were returned for this repository.
                      </p>
                    ) : (
                      <div className={`divide-y ${theme.border}`}>
                        {repoCommits.map((item) => {
                          const authorName =
                            item.author?.login ||
                            item.commit.author?.name ||
                            "Unknown author";

                          return (
                            <div
                              key={item.sha}
                              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:px-5"
                            >
                              <div className="flex min-w-0 items-start gap-3">
                                {item.author?.avatar_url ? (
                                  <img
                                    src={item.author.avatar_url}
                                    alt=""
                                    className="size-8 shrink-0 rounded-full"
                                  />
                                ) : (
                                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${theme.soft}`}>
                                    <GitBranch size={15} />
                                  </div>
                                )}

                                <div className="min-w-0">
                                  <a
                                    href={item.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`line-clamp-2 break-words text-sm font-medium leading-5 hover:text-violet-500 ${theme.heading}`}
                                  >
                                    {item.commit.message.split("\n")[0] ||
                                      "Untitled commit"}
                                  </a>

                                  <p className={`mt-1 break-all text-xs ${theme.text}`}>
                                    {authorName}
                                    {" · "}
                                    {item.sha.slice(0, 7)}
                                  </p>
                                </div>
                              </div>

                              <span className={`inline-flex shrink-0 items-center gap-1.5 text-xs ${theme.text}`}>
                                <CalendarDays size={13} />
                                {formatDate(item.commit.author?.date ?? null)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {!profile && !loadingUser && !error && (
        <div className={`rounded-2xl border border-dashed p-8 text-center ${theme.border}`}>
      <GitBranch
  size={30}
  className={`mx-auto ${theme.text}`}
/>
          <p className={`mt-3 text-sm font-medium ${theme.heading}`}>
            Explore GitHub repositories
          </p>
          <p className={`mt-1 text-sm ${theme.text}`}>
            Search for a username above to load profile and repository data.
          </p>
        </div>
      )}
    </section>
  );
}
