# RESTIVA v1.0 — Technical Debt Report (Master Integration pass)

## Removed in this pass
- **31 dead CSS class families** deleted: the entire Sprint-2 marketing hero
  (.hero/.eyebrow/.subtitle/.hero-actions), old dashboard (.feature-panel/.quick-grid/
  .quick-card/.metric/.summary/.stack), old recipe UI (.card/.grid/.recipe-icon/.fav/
  .pill/.meta/.detail), old planner (.planner-row/.premove), old lists (.shopping-item/
  .pantry-item/.checked), prototype blocks (.restiva-summary/.restiva-box), plus dead
  media-query branches referencing them.
- **Duplicate token systems**: 3 `:root` blocks → 1 canonical + rv-token block
  (legacy var names aliased to identical values for the Settings screen).
- **4 competing `body` rules → 1** (Arial prototype override and two `!important`
  band-aids deleted; `margin:0` preserved in the canonical rule).
- **Legacy element rules** for the old top nav, old header, old h1, old combined
  `nav button,.btn` styling — all superseded by the design system.
- **1 visual bug**: stale global `.checked` was double-striking grocery rows.
- **1 stale orange focus ring** on Settings inputs → brand green.
- **Assets**: unused-in-app 931KB logo PNG → 38KB brand JPG (kept for docs/marketing).

## Numbers
- CSS: 38848 → 34056 bytes (−4792 bytes, ~12%)
- Assets: −893KB (logo compression)
- Dead JS functions: **0** (verified by automated scan)
- index.html: 259,383 → 254724 bytes
  (≈75% of the file is the 45-recipe data set — intentional: offline-first, zero fetch)

## Verified after the purge
All 10 automated suites (203 assertions) green, including the full "Emily's Sunday"
end-to-end workflow and the mocked Kroger pipeline. CSS integrity checks: every
`var()` resolves, single body rule, no killed selectors remain.

## Debt accepted knowingly (v1 scope decisions)
- Single-file front end: right for one household + Netlify; split into modules only if
  a build step is ever introduced.
- Emoji/gradient tiles where photos don't exist yet — photo fields are ready.
- Nutrition/cost figures for the 15 family recipes are estimates pending real numbers.
- localStorage is the database: single-device by design for the Emily MVP; the
  five-object model makes a future sync layer a swap, not a rewrite.
