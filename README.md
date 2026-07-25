# SPINN Meal Plan IQ

Clean Netlify-ready build with the required folder structure preserved.

## Required structure

- `public/index.html` — the meal planner application
- `netlify/functions/` — Kroger/Fry's serverless integration
- `netlify.toml` — redirects and deployment configuration
- `package.json` — build verification

## Netlify settings

- Build command: `npm run build`
- Publish directory: `public`
- Functions directory: `netlify/functions`
- Base directory: blank

## Environment variables

Add these in Netlify under Project configuration → Environment variables:

- `KROGER_CLIENT_ID`
- `KROGER_CLIENT_SECRET`
- `KROGER_API_BASE` = `https://api.kroger.com/v1`
- `KROGER_REDIRECT_URI` = `https://freezeriq.netlify.app/api/kroger/auth/callback`
- `SESSION_SECRET` = any long random phrase

Do not put these values directly in GitHub.
