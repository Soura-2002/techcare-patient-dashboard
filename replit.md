# Tech.Care Patient Dashboard

A single-page patient dashboard that converts an Adobe XD template to HTML, fetching real patient data from the Coalition Technologies API to display Jessica Taylor's medical information.

## Run & Operate

- `pnpm --filter @workspace/patient-dashboard run dev` — run the dashboard (PORT assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, Recharts (blood pressure chart)
- API: External Coalition Technologies API (Basic Auth)
- Font: Manrope (Google Fonts)

## Where things live

- `artifacts/patient-dashboard/src/` — main dashboard app
  - `pages/Dashboard.tsx` — main page layout
  - `components/Header.tsx` — top navigation bar
  - `components/PatientList.tsx` — left sidebar patient list
  - `components/BloodPressureChart.tsx` — Recharts line chart (last 6 months)
  - `components/VitalsCards.tsx` — respiratory rate, temperature, heart rate cards
  - `components/DiagnosticList.tsx` — diagnosis table
  - `components/PatientProfile.tsx` — right panel with profile + lab results
  - `hooks/usePatients.ts` — fetches all patients from external API
  - `types/patient.ts` — TypeScript types for API response

## Architecture decisions

- No internal backend needed — all data comes from the Coalition Technologies external API with Basic Auth
- Jessica Taylor is auto-selected on load; clicking other patients switches the displayed data
- Blood pressure chart shows the last 6 months (most recent first, reversed for display)
- Recharts used for the line chart (already in workspace catalog), not Chart.js
- Data fetching done with native `fetch` in a custom hook (no TanStack Query hooks since no internal API)

## Product

- Three-column layout: patient list | diagnosis history | patient profile
- Blood pressure line chart (Systolic in pink, Diastolic in purple) for last 6 months
- Vitals cards: Respiratory Rate, Temperature, Heart Rate with level indicators
- Diagnostic list table with status badges (Under Observation, Cured, Inactive, Untreated)
- Lab results list in the right panel

## User preferences

- Pixel-perfect conversion from Adobe XD template
- Display information only for Jessica Taylor (auto-selected); other patients are clickable
- No complex UI interactions (search, dropdowns, etc.)

## Gotchas

- External API URL: `https://fedskillstest.coalitiontechnologies.workers.dev`
- Auth: `Basic Y29hbGl0aW9uOnNraWxscy10ZXN0` (coalition:skills-test)
- Vitals icons use emoji SVGs from Twemoji CDN

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
