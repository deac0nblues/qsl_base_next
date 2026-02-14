# Decision: Page Layout & Spacing

## Nav-to-content gap

- Changed `PageWrap` from `minHeight: 100vh` to `height: calc(100vh - 48px)` with `display: flex; flex-direction: column` so slide content fills exactly the viewport below the 48px TopBar
- Removed the old `section` padding (`var(--section-padding-y-md)` = 5rem/80px), replaced with `paddingTop: 24` and `paddingBottom: 24` directly on the section
- Updated `globals.css` rule `main > section:first-child` to `padding-top: 0 !important` (was `24px !important`) since section now self-manages its 24px top padding
- Reduced slide header `marginBottom` from `48px` to `20px` and code-accent gap from `8px` to `4px` to bring title closer to content

## Slide content filling the frame

- Section is now `flex: 1; display: flex; flex-direction: column; overflow: hidden` — each slide's wrapper div gets `flex: 1` to expand into the remaining space
- Added `fill` boolean prop to `ChartCard`, `FunnelChart`, `ComparisonCard`, and `DataTable` — when set, component uses `flex: 1; display: flex; flex-direction: column; minHeight: 0` to stretch
- `ChartCard` chart area: when `fill` is true, uses `flex: 1; minHeight: 0` instead of fixed `height: 280`; Recharts `ResponsiveContainer` already adapts to parent size
- `FunnelChart` & `ComparisonCard`: inner item list uses `justify-content: space-evenly` when `fill` is true (instead of fixed `gap: 12`/`gap: 16`) so rows spread across available height
- `DataTable`: rows use percentage-based height (`height: ${100/rows.length}%`) when `fill` is true; cell padding increases from `10px 16px` to `16px 16px`

## Per-slide layout decisions

- **Slide 0 (Executive Summary)**: KPI row at top, LiveReadout + Sparkline pushed to bottom via `justify-content: space-between` and `margin-top: auto`
- **Slide 1 (Funnel)**: FunnelChart fills full height with `fill` prop; stages spread evenly
- **Slide 2 (Narrative)**: Vertically centered via `align-items: center` on the flex wrapper; widened `maxWidth` from `65ch` to `75ch`; font size uses `clamp(16px, 2.2vw, 22px)` with `line-height: 1.8` for a more generous, presentation-style feel
- **Slide 3 (Revenue chart)**: ChartCard fills full height with `fill` prop; chart area expands dynamically
- **Slide 4 (Table)**: DataTable fills full height with `fill` prop; rows get equal vertical distribution
- **Slide 5 (Comparison)**: ComparisonCard fills full height with `fill` prop; metric rows spread evenly

## Headline sizing

- Inline `fontSize: clamp(28px, 4vw, 56px)` on the `h1` to cap the headline at 56px on large screens (was 64px from `.headline-medium` media queries) — saves ~30px vertical space for content

## Things intentionally NOT changed

- `TopBar.tsx` — height, position, and z-index untouched (48px sticky, per topbar-polish decision)
- `ClickZones.tsx` — untouched, operates independently
- `.headline-medium` CSS class media queries — left intact; the inline `clamp()` style overrides them in this usage but the class remains available
- `KPI.tsx` internal layout — KPI cards are flex items that already size themselves well; only the outer container changed
- Recharts SSR warning about negative chart dimensions — pre-existing issue during static page generation, not a regression
- `--section-padding-y-*` CSS variables — left intact in `:root` for potential use elsewhere
