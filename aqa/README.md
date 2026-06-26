# CivicFlow Demo

CivicFlow Demo is a local web app for AQA candidate exercises. It provides a fake applicant portal with sign-in, dashboard navigation, a Projects page, and custom project creation for Playwright testing practice.

All data is fake, browser-local, and stored only in `localStorage`. The app does not connect to a real backend, real customers, real jurisdictions, or production services.

## Prerequisites

- Node.js 20 or newer
- npm
- Playwright browsers for local e2e testing

## Install

```bash
npm install
npx playwright install
```

## Run The App

```bash
npm run dev
```

Local app URL: `http://localhost:5173`

## Run Tests

```bash
npm run test:e2e
```

The e2e suite includes only a minimal starter check. Candidates are expected to
add meaningful scenario coverage as part of the exercise.
For manual testing, use the Vite dev server on `http://localhost:5173`. The
Playwright starter check builds the app and runs against Vite preview on
`http://127.0.0.1:4173` so CI tests the production bundle.

Useful scripts:

```bash
npm run build
npm run test:e2e:ui
```

## CI And Docker

GitHub Actions and Docker support are intentionally left for the candidate task.
See `TASK.md` for the expected CI and bonus Docker deliverables.

## Fake Credentials

- Email: `applicant@example.com`
- Password: `Password123!`
- User role: `Applicant`

## Local Data

The app seeds fake projects on first load and stores created projects in `localStorage`. To reset the app manually, clear browser `localStorage` or use the visible `Reset demo data` button on the Projects page.
