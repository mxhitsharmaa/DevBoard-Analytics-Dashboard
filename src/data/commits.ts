
export interface Commit {
  id: number;
  message: string;
  author: string;
  initials: string;
  branch: string;
  date: string;
  status: "Success" | "Pending" | "Failed";
}

export const commits: Commit[] = [
  {
    id: 1,
    message: "Add responsive dashboard layout",
    author: "Mohit Sharma",
    initials: "MS",
    branch: "main",
    date: "2026-10-23",
    status: "Success",
  },
  {
    id: 2,
    message: "Fix authentication middleware",
    author: "Aarav Patel",
    initials: "AP",
    branch: "feature/auth",
    date: "2026-10-22",
    status: "Success",
  },
  {
    id: 3,
    message: "Update analytics chart components",
    author: "Mohit Sharma",
    initials: "MS",
    branch: "feature/charts",
    date: "2026-10-22",
    status: "Pending",
  },
  {
    id: 4,
    message: "Improve repository API error handling",
    author: "Priya Singh",
    initials: "PS",
    branch: "fix/api-errors",
    date: "2026-10-21",
    status: "Failed",
  },
  {
    id: 5,
    message: "Refactor reusable UI components",
    author: "Aarav Patel",
    initials: "AP",
    branch: "main",
    date: "2026-10-20",
    status: "Success",
  },
  {
    id: 6,
    message: "Add language distribution chart",
    author: "Priya Singh",
    initials: "PS",
    branch: "feature/charts",
    date: "2026-10-19",
    status: "Success",
  },
];
