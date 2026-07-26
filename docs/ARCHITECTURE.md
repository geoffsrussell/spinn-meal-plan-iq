# RESTIVA v1.0 — Architecture Guide

## What this application is
A household food operating system for one family (Emily's), built as a single-file
front end on an existing Netlify + Kroger backend. Deliberately no framework, no build
step for the UI, no external state library: one HTML file, localStorage persistence,
serverless functions for the only thing that needs a server (Kroger OAuth + API).

## Folder structure
```
public/
  index.html            ← the entire application (markup, CSS, JS, recipe data)
  manifest.webmanifest  ← installable PWA (Add to Home Screen on Emily's iPhone)
  assets/
    restiva-mark-512.png, apple-touch-icon.png, favicon-*   ← app icons
    restiva-logo.jpg                                        ← brand lockup (docs/marketing)
    photos/               ← real food photography (recipe.photo / recipe.cardPhoto)
    scans/                ← original family-cookbook pages (recipe.scan)
netlify/functions/        ← Kroger integration (OAuth, locations, products, cart)
  _shared/                ← http helpers, AES-256-GCM session sealing, Kroger client
netlify.toml              ← /api/kroger/* proxy routes, headers, build
docs/                     ← this documentation set
```

## The five shared objects (single source of truth)
Every screen reads and writes these; nothing keeps a private copy.

| Object | Variable | Persisted key | Shape |
|---|---|---|---|
| Recipe | `recipes` | (static in file) | id, title, menu, method, cookTime, servings, costPerServing, nutrition, ingredients[], dayOfIngredients[], freezerPrep[], cookingSteps[], family?, story?, attribution?, photo?, scan? |
| Meal Plan | `plan` | `plan` | {date, meal: breakfast\|lunch\|dinner, type: recipe\|leftovers\|freezer, recipeId?, servings?, label?, freezerId?} |
| Grocery List | `shopping` | `shopping` | {name, unit, quantity, displays[], checked, dept, store, manual?} |
| Freezer Inventory | `pantry` | `pantry` | {id, recipeId?, name?, qty, added, notes, made, used} — recipe-linked, never duplicates recipe data |
| Dashboard | derived | — | `renderHome()` computes everything from the four objects above |

Supporting stores: `favorites`, `planNotes`, `favWeeks`, `freezerLog`, `storePrefs`,
`shopStaples`, `recipeMeta` (user-written family stories), `selectedFrysStore`,
`frysProductSelections`.

## Data flow
```
Recipes → Planner (plan) → Grocery Builder (shopping) → Kroger cart
                 ↓                                          ↑
          Freezer Nights ←——— Freezer Inventory ——— Cook Again
                 ↘———————— Command Center (derived) ———————↙
```
Mutation rule: change an object → call `save()` → call the affected `render*()`
functions. `renderHome()` is cheap and is called after every mutation, which is what
keeps the dashboard and alerts live.

## Navigation
Six fixed bottom tabs (Home, Planner, Recipes, Grocery, Freezer, Settings) driven by
`showView(id)`; the recipe detail (`#detail`) is a stacked view reached from any screen.
Bottom sheets (`sheet()` / `closeSheet()`) handle every transient task: meal picker,
add-to-freezer, add item, notes, stories, scans.

## Kroger integration contract (do not break)
- Frontend calls `/api/kroger/*`; netlify.toml proxies to functions.
- Product match: `?term=` (cleaned by `krogerTerm()`) + `?locationId=`.
- Only unchecked Fry's-list items are matched/carted; Costco items never reach Kroger.
- Cart payload: `{items:[{upc, quantity:int≥1, modality:'PICKUP'}]}`.
- Env vars: KROGER_CLIENT_ID, KROGER_CLIENT_SECRET, KROGER_REDIRECT_URI,
  SESSION_SECRET (≥32 chars). See README deployment checklist.

## Future extension points (designed-in, not built)
- `freezerLog` events → expiration reminders, prep trends, barcode labels
- `recipe.photo/cardPhoto` → drop-in real photography anywhere
- `recipeMeta` → per-recipe user data without touching recipe definitions
- `storePrefs`/`shopStaples` → learned shopping behavior (the no-AI foundation for V2 intelligence)
- Alert engine in `renderHome()` → additional deterministic rules slot in as new pushes
