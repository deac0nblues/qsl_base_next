# Decision: Funnel Chart & DataTable Enhancements

## FunnelChart Animation

- Used `useIntersectionReveal` (threshold 0.1) to trigger animation on viewport entry — consistent with the KPI card pattern established in `decision-kpi-and-data-fix.md`
- Bar animation uses `scaleY(0→1)` via `funnelBarRise` keyframe with `transform-origin: bottom center` so bars grow upward
- Staggered delay: `i * 120ms` per stage for cascading effect
- Inner fill bar uses `width: 0% → pct%` with matching delay, creating a two-part reveal (container appears, then fills)
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) rather than standard ease-out for a snappier feel

## FunnelChart Drop-off Hover

- Drop-off badge appears between stages when hovering a stage or the stage directly above it
- Positioned right-aligned to match the value/conversion readout
- Red tint (`#ff6b6b`) for the drop-off indicator to contrast with the green accent palette — this is the only use of red and deliberately limited to loss/drop-off contexts
- Shows both percentage and absolute count ("▼ 61.6% drop-off · 7,700 lost")
- Animated in with `dropoffFadeIn` keyframe (200ms, translateY -4px → 0)
- Did NOT change the existing `onStageHover`/`onStageHoverEnd` callback behavior — the drop-off is purely internal visual state

## DataTable Detail Panel

- Chose "expand below" pattern rather than "slide-in from right" — better for tabular layouts since slide-in drawers obscure other rows and require z-index management
- Click-to-expand (not hover) to avoid accidental expansion; row click toggles the detail panel
- Arrow indicator (▶) in the first column rotates 90° when expanded
- Detail panel renders outside `<table>` but inside the scroll container so it doesn't break table column alignment
- Panel uses `detailExpand` keyframe animation (max-height 0→300px, 300ms) for smooth reveal
- Row text brightens to `foreground` color when expanded (vs `secondaryText` default)
- `detailKey` prop is a string key name — keeps the component generic, not coupled to specific detail shape

## DataTable Sparklines

- Added via `trendKey` prop — when provided, a "Trend" column header is appended
- Uses existing `Sparkline` component (Recharts `LineChart`) at 100×24px
- Sparkline column only appears when `trendKey` is provided — no visual change when unused
- Trend data is embedded per row in sample data as `trend: number[]` (12 data points per rep)

## Sample Data

- Extended `sampleTableRows` with `trend` (12-point monthly arrays) and `detail` (object with avgDealSize, pipeline, quota, calls, meetings, proposals)
- Detail panel shows Pipeline/Quota attainment percentage, colored green if ≥100% or red if below
- Did NOT change `sampleTableColumns` — the sparkline column is auto-added via the trendKey mechanism

## What Was NOT Changed

- `FunnelStage` type in `lib/types.ts` — no new fields needed; drop-off is computed from adjacent stages
- `Column` interface in DataTable — kept simple; sparklines are opt-in via `trendKey`
- `LiveReadout`/`useHoverReadout` — existing hover readout system untouched
- `Sparkline` component — reused as-is
- Pre-existing Recharts SSR warning (width/height of -1) — benign, occurs during static generation
