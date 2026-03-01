# Agent-Specific Guidelines & Architecture Overview

This file serves as the system rules, architectural overview, and implementation plan for any AI tooling or Agent operating in this repository.

## 1. Project Overview & Current State
The project is a "SaaS Job Matching Platform UI" built to connect candidates and recruiters in real-time, focusing on rapid hiring interactions for the Middle-East market. The MVP UI has been implemented with mock data, containing layouts, routing, and UI pages for both Candidate and Recruiter experiences.

### Tech Stack
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables for theming (Middle-East-friendly corporate style: blue/teal over neutral palettes, generous whitespace, rounded corners)
- **UI Components:** Radix UI primitives (shadcn/ui style architecture), `@mui/material`, `lucide-react` for icons
- **Routing:** React Router v7 (`createBrowserRouter`)
- **Drag & Drop:** `react-dnd` (used in Hiring Pipeline Kanban)
- **Forms & Validation:** `react-hook-form`
- **Animations:** `motion`, `tw-animate-css`

## 2. Code Architecture & Component Strategy
### Directory Structure
```
src/
├── app/
│   ├── components/
│   │   ├── ui/          # Reusable UI primitives (Buttons, Dialogs, Inputs, Tooltips, etc.)
│   │   └── figma/       # Figma-generated baseline components
│   ├── layouts/         # Page wrappers routing logic (CandidateLayout, RecruiterLayout)
│   ├── pages/           # High-level route components mapped to the spec
│   │   ├── candidate/   # Onboarding, Dashboard, Job Discovery, Application Tracker, Profile
│   │   └── recruiter/   # Dashboard, PostJob, Candidate Search, CandidateProfileView, Pipeline
│   ├── data/            # Mock data and TypeScript interfaces
│   └── routes.tsx       # SPA Routing configuration
├── styles/              # Global CSS & Tailwind layers
└── main.tsx             # Entry point
```

### UI Architecture Directives
1. **Separation of Concerns:** Pages (`src/app/pages/`) are smart containers. They should handle routing logic, fetch data, and hold domain state. Components (`src/app/components/ui/`) must be dumb presentation layers.
2. **Styling Paradigm:** Strictly use Tailwind CSS. No inline styles. Complicated class compositions should be extracted using `clsx` and `tailwind-merge`. Follow the "High-trust, minimalistic, SaaS UI" spec.
3. **Responsiveness:** Maintain a desktop-first responsive structure, ensuring grid/flex fallbacks scale elegantly to mobile screens using standard Tailwind breakpoints.

## 3. Implementation Plan & Agent Action Items (Next Phase)

When proceeding to improve this codebase, adhere to the following sequence of features:

### Phase 1: Real-Time State & Data Fetching
- **Global Auth & Session:** There is currently no active global state for switching views cleanly. Implement a global authentication store (e.g., `Zustand` or React Context) to manage user identity and active roles (`Candidate` | `Recruiter`).
- **Data Integration:** Remove `mockData.ts` slowly. Introduce a data-fetching layer utilizing `React Query` (or SWR) for caching, infinite scrolling (on Candidate Search), and mutation handling (for Job Posting).

### Phase 2: Form Handling & Validation Robustness
- **Schema Validation Integration:** Attach `Zod` validation schemas to `react-hook-form` inside the "Post a Job" wizard and "Candidate Onboarding" flows. Provide precise localizable error messages.
- **Error UI States:** Guarantee clear error messaging via Sonner notifications and in-field red borders for input elements.

### Phase 3: Dynamic Interactions & Scale
- **WebSockets / Messaging:** Build out the real-time "Messages Inbox" & "Notifications" features using WebSockets.
- **RTL Support:** Plan Tailwind configuration additions for Right-To-Left (RTL) reading compatibility for UAE market readiness using `@tailwindcss/typography` or custom `rtl:` variant overrides.
- **Advanced Animations:** Enhance drag-and-drop Kanban (Hiring Pipeline) with framer-motion for smooth list reordering visual feedback.

## 4. Coding Standards 
- **TypeScript:** Enforce strict typing. Do not use `any`. Interfaces in `src/app/data/types.ts` should accurately reflect the future database structures.
- **Component File Size:** If any UI page component exceeds 250 lines, refactor its sections into smaller single-responsibility semantic components.
- **Context Preservation:** Always review previous context through tools before initiating large-scale rewrites of existing components.
