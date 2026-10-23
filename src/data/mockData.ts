
import type { CommitActivity, LanguageUsage } from "../types";

export const weeklyActivity: CommitActivity[] = [
  { date: "Mon", commits: 18, pullRequests: 4 },
  { date: "Tue", commits: 25, pullRequests: 7 },
  { date: "Wed", commits: 16, pullRequests: 5 },
  { date: "Thu", commits: 32, pullRequests: 9 },
  { date: "Fri", commits: 28, pullRequests: 6 },
  { date: "Sat", commits: 12, pullRequests: 3 },
  { date: "Sun", commits: 20, pullRequests: 5 },
];

export const monthlyActivity: CommitActivity[] = [
  { date: "Week 1", commits: 95, pullRequests: 20 },
  { date: "Week 2", commits: 124, pullRequests: 27 },
  { date: "Week 3", commits: 108, pullRequests: 22 },
  { date: "Week 4", commits: 142, pullRequests: 31 },
];

export const languageUsage: LanguageUsage[] = [
  { name: "TypeScript", percentage: 42 },
  { name: "JavaScript", percentage: 25 },
  { name: "CSS", percentage: 18 },
  { name: "HTML", percentage: 10 },
  { name: "Other", percentage: 5 },
];

export const dailyActivity: CommitActivity[] = [
  { date: "9 AM", commits: 3, pullRequests: 1 },
  { date: "10 AM", commits: 5, pullRequests: 2 },
  { date: "11 AM", commits: 8, pullRequests: 3 },
  { date: "12 PM", commits: 4, pullRequests: 1 },
  { date: "1 PM", commits: 7, pullRequests: 2 },
  { date: "2 PM", commits: 10, pullRequests: 4 },
  { date: "3 PM", commits: 6, pullRequests: 2 },
];