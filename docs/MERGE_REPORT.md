# RESTIVA v1.0 — Merge Report & Version History

## Integration approach
The twelve sprints were **never independent ZIPs stacked together**. From Sprint 3 on,
every sprint was applied to one continuously-evolving codebase, replacing screens
wholesale (per the development rules) and committing each sprint to git. The repository
history *is* the merge record; this report documents it, plus the final consolidation
pass (dead code, duplicate CSS, asset compression) that produced RESTIVA_v1_MASTER.

## Merge matrix
| Sprint | Primary feature | Files touched | Depends on | What survived into v1 | Status |
|---|---|---|---|---|---|
| 1–2 (baseline zip) | Rebrand, dark theme, nav terms, Kroger integration | index.html, netlify/* | — | All backend functions untouched; Sprint-2 dashboard/hero **deleted in S3**; residual CSS purged in this pass | Merged |
| 3 | Command Center home, bottom navigation | index.html | 1–2 | Entire home screen, delegation pattern, bottom nav (later 6 tabs) | Merged |
| 3b | Design-system alignment | index.html | 3 | Persistent header, tokens, 250ms motion, per-card standards | Merged |
| 4 | Recipe Library + detail rebuild | index.html | 3b | Card grid, chips, Freeze/Thaw/Cook detail sections | Merged |
| 4b | Family cookbook data (15 recipes) | index.html | 4 | 45-recipe library, Family/Breakfast categories, richer icons | Merged |
| — | Brand assets | assets/*, index.html | — | Icons, header/hero marks, theme color | Merged |
| 5 | Grocery Builder | index.html | 4 | Departments, Costco/Fry's split, remembered store prefs | Merged |
| 6 | Weekly Planner | index.html | 5 | B/L/D week, picker sheet, leftovers/freezer nights, notes, templates | Merged (replaced S2 planner rows entirely) |
| 7 | Freezer Inventory | index.html | 6 | Recipe-linked inventory model + migration, Cook Again, 6-tab nav | Merged |
| 8 | Command Center Intelligence | index.html | 5,6,7 | Alert engine, next-3-dinners, per-store bars | Merged (replaced S3 5-day timeline) |
| 9 | Family Cookbook layer | index.html, assets/photos, assets/scans | 4b | Stories, attribution, scans, real photography, Quick tag | Merged |
| 10 | Shopping + Kroger hardening | index.html, README | 5 | krogerTerm cleaner, Fry's-only scope, price banner, add-item, staples, dark Settings | Merged |
| 11 | Household dashboard | — | 8 | Already delivered by Sprints 5+8; no separate build needed | Absorbed |
| 12 | Polish & Delight | index.html, manifest | all | PWA install, haptics, spinners, skeletons, sheet motion, empty states | Merged |

## Conflicts resolved during integration
- **5 vs 6 tabs**: earlier specs said five; the Sprint-7 spec's explicit 6-tab nav (❄ Freezer) won as the newest instruction.
- **Upcoming Meals**: Sprint-3 "Mon–Fri timeline" superseded by Sprint-8 "next 3 dinners".
- **Pantry staples vs freezer meals**: the old staples-exclusion list was superseded by the recipe-linked freezer model; the staples concept returned properly as grocery **Staples** in Sprint 10.
- **Add-to-plan navigation**: card-level add stays in the library (bulk planning); detail-level add navigates to the planner (deliberate planning).

## Notable regressions caught by the test suites during the build
- Stale `#addPlan` / `#addFreezer` listeners after screen replacements (would have crashed page init) — removed.
- Null `name` on recipe-linked freezer items crashed grocery generation — guarded.
- "All" chip didn't clear the Quick filter — fixed.
- Orphaned freezer-picker code after a partial replacement — removed.
- Legacy `.checked` rule double-striking grocery rows — removed in this pass.

## Version history in one line each
S1–2 brand + backend → S3 Command Center → S3b design system → S4 recipe library →
S4b family recipes → S5 grocery builder → S6 planner becomes the heart → S7 freezer
becomes the food bank → S8 the home screen starts thinking → S9 the cookbook becomes
family memory → S10 Kroger hardened → S12 it feels like a product.
