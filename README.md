# BetterMe

A fully interactive frontend prototype of a personal productivity dashboard — built end-to-end with React, TypeScript, and Tailwind CSS. Every screen is wired to real, working state (not static mockups): tasks can be created, edited, completed, and deleted; mood and notes are logged per day; themes switch live; and everything survives a page refresh via `localStorage`.

## Screens

| Screen | What it does |
|---|---|
| **Landing** | Marketing entry page introducing the product |
| **Dashboard** | Ring-chart progress overview, upcoming tasks, live clock, weekly stats, and a productivity trend chart |
| **Today** | Category-grouped task board, mood tracker, and a notes panel for the current day |
| **Time View** | A chronological, table-style schedule of the day's activities |
| **Weekly View** | A 7-day board with per-category task grouping and per-day mood/notes |
| **Calendar** | Month navigation with mood/task indicators per day and a day drill-down |
| **New Page** | Create custom pages with their own tasks, notes, and category |
| **Settings** | Theme (light/dark/system), default task category, and data reset controls |

## Highlights

- **Full task CRUD** — create, edit, complete, and delete, with category, priority, date, and time
- **Global search** across tasks and notes that jumps straight to the relevant screen and date
- **Mood tracking** (5-level scale) and free-text journal/reflection cards, persisted per day
- **Light / dark / system theming** driven entirely by CSS custom properties — not a filter, real token swaps for every surface, border, and category color
- **Fully responsive** — sidebar collapses into a mobile drawer, tables reflow into cards, charts resize, no horizontal scroll at any breakpoint
- **Zero backend** — all state lives in the browser via a single `localStorage`-backed context, seeded with realistic demo data on first load

## Tech Stack

- [React 19](https://react.dev/) + TypeScript
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (token-based theming, custom dark mode)
- [React Router](https://reactrouter.com/)
- [Recharts](https://recharts.org/) for the productivity chart
- [Lucide React](https://lucide.dev/) for icons
- [Framer Motion](https://www.framer.com/motion/) for landing page motion

## Project Structure

```
src/
  components/
    layout/     # Shell, header, sidebar, mobile drawer
    dashboard/  # Overview ring, stats, journal cards, live clock
    tasks/      # Task rows, category cards, add/edit modal
    mood/       # Mood selector
    calendar/   # Month grid + month list
    notes/      # Per-day notes panel
    charts/     # Recharts wrapper + custom progress ring
    showcase/   # Animated mockups used on the landing page
    ui/         # Reusable primitives (Button, Card, Modal, Toggle, ...)
  pages/        # One file per route (Dashboard, Today, TimeView, ...)
  store/        # AppDataContext — the single source of truth + localStorage sync
  hooks/        # useTheme, useTasks, useLocalStorage
  data/         # Category metadata + seed/demo data generator
  utils/        # Date helpers, search, task selectors/derivations
  types/        # Shared TypeScript types
```

State is intentionally centralized in one context (`store/AppDataContext.tsx`) rather than duplicated per page, so every view — Dashboard, Today, Time View, Weekly View, Calendar — reads and writes the same task list and stays in sync automatically.

## Getting Started

```bash
npm install
npm run dev
```

Then open the local Vite URL printed in the terminal.

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # oxlint
```

## Notes

This is a frontend-only prototype — there is no backend, authentication, or API. All data (tasks, notes, mood, theme, and settings) is stored in the browser's `localStorage`, and can be reset to fresh demo data at any time from the Settings screen.
