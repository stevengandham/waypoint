# Waypoint

Waypoint is a lightweight web app for collecting interest signups, storing them in Google Sheets, and grouping leads into availability-based cohorts. The project combines a React-based marketing site with a Cloudflare Worker backend that powers the submission and grouping endpoints.

## Project stack

- Frontend: React 19, Vite, Tailwind CSS, ESLint
- Backend: Cloudflare Workers with Wrangler
- Runtime: JavaScript (ES modules)
- Data storage: Google Sheets API via a service account
- Deployment: Cloudflare Worker assets binding for the static site

## What the app does

- Serves a public site from the React/Vite app in [website/waypoint-site](website/waypoint-site)
- Accepts form submissions at the `/submit` endpoint
- Groups leads at the `/group` endpoint using availability slots such as Mon-Morning or Thu-Evening
- Writes results back to Google Sheets for follow-up and coordination

## Repository structure

- [src/index.js](src/index.js) - worker entry point and route dispatch
- [src/routes](src/routes) - request handlers for submit and group actions
- [src/lib](src/lib) - Google Sheets integration, grouping logic, and availability parsing
- [website/waypoint-site](website/waypoint-site) - React/Vite frontend and site content
- [wrangler.jsonc](wrangler.jsonc) - Cloudflare Worker configuration

## Environment variables

The worker expects the following environment variables:

- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SPREADSHEET_ID`
- `ADMIN_SECRET`

## Local development

### Frontend

```bash
cd website/waypoint-site
npm install
npm run dev
```

This starts the Vite dev server for the site.

### Worker / full app

To run the worker locally, use Wrangler from the repository root:

```bash
npx wrangler dev
```

## Deployment

Deploy the worker and static assets with Wrangler:

```bash
npx wrangler deploy
```

## Notes

The submission flow writes lead rows into Google Sheets, while the grouping endpoint reads those rows, clusters them by availability, and updates the sheet with group assignments.
