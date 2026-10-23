
export interface CommitActivity {
  date: string;
  commits: number;
  pullRequests: number;
}

export interface LanguageUsage {
  name: string;
  percentage: number;
}

export type DateRange = "daily" | "weekly" | "monthly";
