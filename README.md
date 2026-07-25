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
