# SPINN Meal Plan IQ - Live Kroger/Fry's Build

This build removes the hard-coded demo grocery workflow and connects the UI to Netlify Functions backed by Kroger's APIs.

## Live routes

- `/api/kroger/locations`
- `/api/kroger/products`
- `/api/kroger/auth/start`
- `/api/kroger/auth/callback`
- `/api/kroger/auth/status`
- `/api/kroger/auth/logout`
- `/api/kroger/cart`

## Netlify configuration

- Build command: `npm run build`
- Publish directory: `public`
- Functions directory: `netlify/functions`

The Netlify environment variables must remain configured. The Kroger client secret is intentionally not committed to GitHub; Netlify injects it securely into the server functions at runtime.

## Deployment

Copy all files and folders into the root of the local `spinn-meal-plan-iq` repository, commit, and push with GitHub Desktop. Netlify will automatically redeploy.

## Kroger / Fry's integration — deployment checklist

Environment variables (Netlify → Site settings → Environment):
- `KROGER_CLIENT_ID` / `KROGER_CLIENT_SECRET` — from the Kroger developer portal (production app)
- `KROGER_REDIRECT_URI` — must exactly match the portal entry: `https://<your-site>.netlify.app/.netlify/functions/auth-callback`
- `SESSION_SECRET` — random string, 32+ characters (session cookies are AES-256-GCM sealed with it)
- `KROGER_API_BASE` — optional; defaults to `https://api.kroger.com/v1` (use the cert base for sandbox testing)

OAuth scopes requested: `profile.compact product.compact cart.basic:write`.
Routes are proxied via `netlify.toml` under `/api/kroger/*`.

App-side contract (do not break when editing the frontend):
- Product match sends `?term=` (cleaned via `krogerTerm`) and `?locationId=`
- Only unchecked Fry's-list items are matched and carted; Costco items never reach Kroger
- Cart payload: `{ items: [{ upc, quantity (int ≥1), modality: 'PICKUP' }] }`
