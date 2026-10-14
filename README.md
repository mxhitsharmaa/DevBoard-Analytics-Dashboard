# DevBoard - Analytics Dashboard

A responsive analytics dashboard built with React, TypeScript, Tailwind CSS, and Recharts.

DevBoard is an admin dashboard that helps users view important data, track performance, and understand information through charts, tables, and summary cards.

## About the Project

DevBoard is designed to provide a clean and simple dashboard interface for managing and analyzing data.

The dashboard includes KPI cards, interactive charts, sortable data tables, pagination, a collapsible sidebar, and dark mode. It is designed to work on desktop, tablet, and mobile devices.

This project is being built to practice frontend development, reusable components, responsive design, and data visualization.

## Features

### Dashboard Overview

* Display important statistics using KPI cards.
* Show total users, revenue, orders, and growth.
* Display changes in key metrics.
* Provide a clear overview of dashboard data.

### Interactive Charts

* Display data using interactive charts.
* Show trends over time.
* Compare data across different categories.
* Use tooltips to view chart details.
* Update charts when the selected filters change.

### Data Tables

* Display data in structured tables.
* Sort columns in ascending and descending order.
* Add pagination to manage large datasets.
* Search for specific records.
* Filter data based on selected options.

### Sidebar Navigation

* Create a collapsible sidebar.
* Navigate between dashboard sections.
* Highlight the active page.
* Provide a mobile-friendly navigation menu.

### Dark Mode

* Support light and dark themes.
* Allow users to switch between themes.
* Apply consistent colors across all components.

### Responsive Design

* Support desktop, tablet, and mobile screens.
* Use a flexible layout.
* Make charts and tables work on smaller screens.
* Keep the interface simple and easy to use.

### Additional Features

* Reusable UI components.
* Loading and empty states.
* Error handling for data loading.
* Clean and organized code.
* Consistent spacing, colors, and typography.

## Tech Stack

* React - Build the user interface.
* TypeScript - Write safer and more maintainable code.
* Tailwind CSS - Style the application.
* Recharts - Create interactive charts.
* Vite - Run the development server and build the project.
* React Router - Navigate between pages, if required.
* Lucide React - Optional icon library, if required by the final design.

## Project Structure

The planned folder structure is:

```text
devboard/
├── public/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── charts/
│   │   ├── tables/
│   │   └── ui/
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Analytics.tsx
│   │   ├── Users.tsx
│   │   └── Settings.tsx
│   ├── hooks/
│   ├── data/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

Note: The folder structure may change as development progresses. Configuration files depend on the versions of Vite and Tailwind CSS being used.

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git
* A code editor such as Visual Studio Code

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/devboard.git
```

**2. Open the project folder**

```bash
cd devboard
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the local URL**

Open the URL shown in your terminal, usually:

```text
http://localhost:5173
```

## Development Plan

The project will be developed in the following stages.

### Phase 1: Project Setup

* Create the React project using Vite.
* Configure TypeScript.
* Set up Tailwind CSS.
* Organize the project folders.

### Phase 2: Dashboard Layout

* Build the main dashboard layout.
* Create the sidebar.
* Create the top navigation bar.
* Add KPI cards.
* Make the layout responsive.

### Phase 3: Charts and Analytics

* Install and configure Recharts.
* Create reusable chart components.
* Add sample analytics data.
* Add chart tooltips and filters.

### Phase 4: Data Tables

* Build reusable table components.
* Add column sorting.
* Add search and filtering.
* Add pagination.

### Phase 5: Theme and UI Improvements

* Add dark mode.
* Improve mobile navigation.
* Add loading and empty states.
* Improve spacing and consistency.

### Phase 6: Testing and Deployment

* Test the dashboard on different screen sizes.
* Fix layout and functionality issues.
* Check TypeScript errors.
* Create a production build.
* Deploy the application.

## Future Improvements

* Connect a real backend API.
* Add user authentication.
* Add role-based access control.
* Add real-time dashboard updates.
* Add date range filters.
* Export table data to CSV.
* Add more analytics pages.
* Add notification settings.
* Add unit and component tests.

These features are planned improvements and may be implemented after the core dashboard is complete.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

* `npm run dev` starts the development server.
* `npm run build` creates a production build.
* `npm run preview` previews the production build locally.

## Project Goals

The main goals of DevBoard are to:

* Improve React and TypeScript skills.
* Learn how to build reusable components.
* Practice responsive dashboard design.
* Learn data visualization with Recharts.
* Understand sorting, filtering, and pagination.
* Build a project suitable for a developer portfolio.

## Project Status

Status: In Development

Features and project structure may change during development.

## Author

**Mohit**

GitHub: https://github.com/mxhitsharmaa 

## License

This project is intended for learning and portfolio development. A license can be added when the project is ready for release.
