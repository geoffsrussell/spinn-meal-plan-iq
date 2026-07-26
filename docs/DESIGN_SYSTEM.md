# RESTIVA Design System — v1.0

Feel: Apple Wallet · Apple Health · Notion Calendar · Calm. Warm, minimal, premium.

## Color (CSS custom properties, single :root)
| Token | Value | Use |
|---|---|---|
| --rv-bg | #0A0A0A | primary background |
| --rv-bg2 | #111111 | secondary background, inset fields |
| --rv-card | #171717 | all cards |
| --rv-hover | #1F1F1F | card hover |
| --rv-text | #FFFFFF | primary text |
| --rv-sub | #A3A3A3 | secondary text |
| --rv-muted | #6B7280 | muted text |
| --rv-green | #22C55E | actions, success, progress, completion ONLY |
| --rv-gold | #D4AF37 | budget, premium, family-cookbook highlights ONLY |
| --rv-line | rgba(255,255,255,.08) | every border |
| --rv-shadow | 0 10px 30px rgba(0,0,0,.35) | floating-paper card shadow |
| --rv-t | 250ms cubic-bezier(.4,0,.2,1) | every transition |

Legacy aliases (--bg, --card, --accent…) map to the same values for the Settings screen.

## Typography
Space Grotesk (400/500/600/700). Hero greeting clamp(2.1–3.4rem, -0.035em).
Section labels: .72rem, 600, .16em tracking, uppercase, --rv-sub. Body ≥ .78rem.
Big numbers pattern: `<b>34</b><span>grocery items</span>`.

## Components (one implementation each)
- **Button** `.btn` — pill, 44px min touch target, press-scale .97; `.primary` green with
  #052e14 text; `.busy` swaps label for spinner. Small variant `.fz-sm`.
- **Card** `.cc-card` — 18px radius, 24px padding, --rv-line border, floating shadow.
- **Section header** `.cc-label` — with optional right-aligned green action.
- **Chip** `.cc-chip` (info) / `.rl-chip` (filter, `.on` = green; gold for favorites).
- **Progress** `.cc-progress-track/-fill` (+ `.cc-mini` per-store variant).
- **Recipe card** `.rl-card` — 16:10 photo tile (real photo or protein-tinted gradient +
  icon), heart, menu pill, gold cost, Add-to-plan.
- **Inventory card** `.fz-card` — photo tile, green xN badge (gold ≤2, "Out" at 0),
  made/use-by dates, Add/Use/Recipe/Cook-again.
- **Meal chip** `.wp-entry` — icon + title + servings stepper.
- **Day card** `.wp-day` / timeline `.cc-day`.
- **Alert** `.cc-alert` — icon, message, optional sub, one action.
- **Status badge** `.fz-badge`, `.status-dot`, `.phase-badge`.
- **Bottom sheet** `sheet()` — slide-up modal for all transient tasks.
- **Navigation** fixed 6-tab bottom bar, line icons, green active state, safe-area padded.
- **Empty state** `.rl-empty` — soft icon + one warm sentence + one action.

## Motion
250ms standard; staggered fade on Home load; view fade on tab change; sheet slide-up;
progress width transitions; ALL disabled under prefers-reduced-motion. Haptic `buzz()`
on confirmations and checklist taps.

## Rules
Green means "go/done", gold means "money/family/premium" — never decorative.
One focal point per screen. Whitespace is a feature. No tables. No charts.
