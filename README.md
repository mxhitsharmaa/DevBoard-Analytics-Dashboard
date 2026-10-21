# DevBoard

**A developer-first analytics dashboard: see how your code ships, not how your ads perform.**

Built with React, TypeScript, Tailwind CSS, Recharts and Vite.

[Live Demo](https://your-devboard-demo.vercel.app) · [Report a Bug](https://github.com/your-username/devboard/issues) · [Request a Feature](https://github.com/your-username/devboard/issues)

![DevBoard dashboard](./screenshots/dashboard.png)

---

## The Problem

Most dashboard templates and tutorials are built around **business data**: traffic, revenue, users. Developers and engineering teams rarely get a clean, visual view of **their own work**:

- Commit activity is buried inside `git log` or a single repo's Insights tab.
- Pull requests, issues and build status live in different places, so answering "how is the project doing this week?" means opening four tabs.
- Beginners building dashboards have almost no realistic, developer-themed examples to learn from.

## The Solution

DevBoard puts commits, pull requests, issues, builds and language usage on **one screen**, with filters, charts and searchable tables, so a team can understand project health in seconds.

## How DevBoard Is Different

| | Typical analytics dashboard | GitHub Insights | **DevBoard** |
|---|---|---|---|
| Data focus | Traffic, sales, users | Single repository | **Development activity in one view** |
| Metrics | Business KPIs | Fixed, limited filters | **Commits, PRs, issues, builds, languages together** |
| Customization | Template-based | Not customizable | **Date ranges, theme, searchable and sortable tables** |
| Codebase | Often JavaScript, loosely typed | Closed source | **Open source, fully typed with TypeScript** |
| Learning value | Generic CRUD charts | None | **Realistic dev-domain data model and clean architecture** |

## Features

### Available now
- **Overview cards** for commits, pull requests, open issues and build status
- **Four chart types**: line, bar, area and pie (Recharts)
- **Date range filter**: daily, weekly, monthly
- **Commit activity, pull request and issue tracking**
- **Language usage breakdown**
- **Data tables** with search, sort and pagination
- **Dark and light theme**
- **Responsive layout** for mobile, tablet and desktop

### In progress / next up
- [ ] Live GitHub data via the GitHub REST API (enter any username or repo)
- [ ] Contribution heatmap (GitHub-style calendar)
- [ ] Repository comparison view (two repos side by side)
- [ ] PR health metrics: average time to merge, review turnaround
- [ ] Build success rate trend and failure alerts
- [ ] Export reports as CSV and PDF
- [ ] Persist theme and filters in `localStorage`
- [ ] Loading skeletons and error states
- [ ] Unit tests (Vitest and React Testing Library)

## Tech Stack and Why

| Tool | Reason |
|---|---|
| **React** | Component-based UI, easy to split cards, charts and tables into reusable pieces |
| **TypeScript** | Typed data models (commits, PRs, issues) catch bugs before runtime |
| **Tailwind CSS** | Fast, consistent styling, built-in dark mode and responsive utilities |
| **Recharts** | Declarative, React-friendly charts |
| **Vite** | Fast dev server and optimized production builds |

## Getting Started

**Requirements:** Node.js 18 or higher and npm.

```bash
git clone https://github.com/your-username/devboard.git
cd devboard
npm install
npm run dev
```

The app runs at http://localhost:5173

Other commands:

```bash
npm run build      # production build
npm run preview    # preview the production build
```

## Project Structure

```
src/
├── components/   # Reusable UI components (cards, charts, tables)
├── pages/        # Dashboard pages
├── data/         # Mock data (to be replaced by the GitHub API layer)
├── hooks/        # Custom hooks (filters, theme, pagination)
├── types/        # Shared TypeScript types
└── App.tsx
```

## Design Decisions

- **Mock data first, API later.** The UI depends on typed interfaces, not on the data source, so swapping mock data for the GitHub API does not require touching components.
- **Custom hooks for logic.** Filtering, sorting and pagination live in hooks, which keeps components focused on rendering.
- **Mobile-first responsive design** so the dashboard stays usable on small screens.

## Roadmap

1. GitHub API integration with rate-limit handling and caching
2. Contribution heatmap and PR health metrics
3. CSV and PDF export
4. Authentication, so each user can save their own repositories

## What I Learned

- Modelling real-world data with TypeScript interfaces
- Structuring a React app for reuse and scalability
- Turning raw data into readable charts and tables
- Building a responsive layout with a dark and light theme

## Author

**Mohit Sharma**
GitHub: https://github.com/mxhitsharmaa

## License

MIT