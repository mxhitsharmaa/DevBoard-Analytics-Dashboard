
const API_BASE = "https://api.github.com";

const HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  default_branch: string;
  owner: {
    login: string;
  };
}

export interface GitHubCommit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string | null;
      date: string | null;
    } | null;
  };
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
}

interface ApiResult<T> {
  data: T;
  hasNext: boolean;
}

async function request<T>(path: string): Promise<ApiResult<T>> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: HEADERS,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "GitHub user or resource not found. Check the username or repository.",
      );
    }

    if (response.status === 403 || response.status === 429) {
      const remaining = response.headers.get("x-ratelimit-remaining");

      if (remaining === "0") {
        const reset = response.headers.get("x-ratelimit-reset");
        const resetTime = reset
          ? new Date(Number(reset) * 1000).toLocaleTimeString()
          : "later";

        throw new Error(
          `GitHub API rate limit reached. Try again after ${resetTime}.`,
        );
      }

      throw new Error(
        "GitHub temporarily rejected the request. Please wait and try again.",
      );
    }

    if (response.status === 401) {
      throw new Error("GitHub authentication is required for this resource.");
    }

    throw new Error(`GitHub API request failed (${response.status}).`);
  }

  const data = (await response.json()) as T;
  const linkHeader = response.headers.get("Link") ?? "";

  return {
    data,
    hasNext: linkHeader.includes('rel="next"'),
  };
}

export async function getGitHubUser(
  username: string,
): Promise<GitHubUser> {
  const result = await request<GitHubUser>(
    `/users/${encodeURIComponent(username)}`,
  );

  return result.data;
}

export async function getGitHubRepos(
  username: string,
  page = 1,
): Promise<ApiResult<GitHubRepo[]>> {
  return request<GitHubRepo[]>(
    `/users/${encodeURIComponent(username)}/repos?sort=updated&direction=desc&per_page=12&page=${page}`,
  );
}

export async function getGitHubCommits(
  owner: string,
  repo: string,
): Promise<GitHubCommit[]> {
  const result = await request<GitHubCommit[]>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=10`,
  );

  return result.data;
}
