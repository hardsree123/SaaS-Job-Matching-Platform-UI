# AI Agent Guidelines & Architecture Overview

## 1. Project Overview & Current State
The project is a "SaaS Job Matching Platform UI" built to connect candidates and recruiters in real-time, focusing on rapid hiring interactions for the Middle-East market. The MVP UI has been implemented with mock data, containing complete layouts, routing, and UI pages for both Candidate and Recruiter experiences.

### Tech Stack
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables for theming
- **UI Components:** Radix UI primitives (shadcn/ui style architecture), `@mui/material`, `lucide-react` for icons
- **Routing:** React Router v7 (`createBrowserRouter`)
- **Drag & Drop:** `react-dnd` (used in Hiring Pipeline Kanban)
- **Forms & Validation:** `react-hook-form`
- **Animations:** `motion`, `tw-animate-css`

## 2. Code Architecture
### Directory Structure
```
src/
├── app/
│   ├── components/
│   │   ├── ui/          # Reusable UI components (buttons, dialogs, inputs, etc.)
│   │   └── figma/       # Figma-generated baseline components
│   ├── layouts/         # Page wrappers (CandidateLayout, RecruiterLayout)
│   ├── pages/           # High-level route components
│   │   ├── candidate/   # Candidate specific pages (Dashboard, Jobs, Profile, etc.)
│   │   └── recruiter/   # Recruiter specific pages (Dashboard, Pipeline, Search, etc.)
│   ├── data/            # Mock data and TypeScript interfaces (mockData.ts, types.ts)
│   └── routes.tsx       # Application routing configuration
├── styles/              # Global CSS, Tailwind configurations
└── main.tsx             # Application entry point
```

### UI Architecture Rules
1. **Component Driven Design:** Build reusable UI components in `src/app/components/ui/` using Radix UI for accessibility and Tailwind CSS for styling. Never write inline styles.
2. **Page Composition:** Pages (`src/app/pages/`) should act as containers. They should fetch data, manage domain state, and pass props down to dumb presentation components.
3. **Responsive Design:** Follow a desktop-first responsive approach as requested by the initial design docs, but ensure mobile views are usable and clean utilizing Tailwind's media query utilities (`md:`, `lg:`).

## 3. Next Steps & Agent Directives (How to Improve the Solution)

When acting upon this codebase, an AI Agent should adhere to the following improvement pipeline:

### Phase 1: State Management & Real Data Integration
- **Remove Mock Data:** Transition away from importing `mockData.ts`.
- **Global Auth State:** Implement a global authentication store (e.g., `Zustand` or React Context) to manage the session state for `Candidate` vs `Recruiter` roles.
- **API Layer:** Setup an API client layer (e.g., Axios or native fetch wrapped in `TanStack Query` / `React Query`) for data fetching, caching, and mutations.

### Phase 2: Form Handling & Validation Robustness
- **Schema Validation:** Integrate `Zod` with `react-hook-form` across all forms (e.g., Candidate Onboarding, Post a Job).
- **Error States:** Ensure strict form validation error states are visually represented using the existing UI components (Text inputs, Select fields).

### Phase 3: Dynamic Interactions & Polish
- **WebSockets / Real-time:** Prepare the application to handle real-time events for messaging and activity feeds (Recruiter views, interview requests) using WebSockets or robust polling.
- **Micro-animations:** Expand the use of `framer-motion` / `motion` for smoother transitions between pipeline states (Kanban drag-and-drop) and page transitions.
- **Middle-East Localization Prep:** Ensure the UI components support RTL (Right-to-Left) layouts smoothly for potential Arabic localization in the future.

## 4. Coding Standards & Agent Rules
- **Formatting:** Use Prettier standard formatting. Use exact imports (no wildcard imports unless necessary).
- **TypeScript:** Enforce strict typing. Do not use `any`. Define all interfaces reflecting the database schema in `src/app/data/types.ts` or a new `models/` folder.
- **Tailwind:** Combine classes reasonably using `clsx` and `tailwind-merge` utility functions (typically found in a `utils/cn.ts` or similar).
- **Icons:** Stick strictly to `lucide-react` to maintain a consistent visual language, overriding with `@mui/icons-material` only if a specific icon is unavailable.
- **Modularity:** If a component exceeds 250 lines of code, evaluate it for refactoring into smaller, single-responsibility sub-components.

---
**Goal:** The agent reading this file should act as a Principal Frontend Engineer, prioritizing clean architecture, strong typing, reusable components, and preparing the UI for production backend integration.
