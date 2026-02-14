# Project Decisions

This file tracks design and implementation decisions. Read before making changes.

---

## Password Gate

- **Middleware-based protection**: Next.js `middleware.ts` intercepts all requests and checks for a `qsl_auth` session cookie. Unauthenticated requests redirect to `/gate`.
- **Server-side verification**: Password checked in `app/api/auth/route.ts` (POST). `ENGAGEMENT_PASSWORD` env var never sent to the browser.
- **Cookie**: `qsl_auth=authenticated`, `httpOnly`, `secure` in production only, `sameSite: lax`, session-scoped (no `maxAge`).
- **Middleware matcher**: Excludes `_next/static`, `_next/image`, `favicon.ico`, and static file extensions. Allows unauthenticated access to `/gate` and `/api/auth` only. Authenticated users on `/gate` redirect to `/`.
- **Bypass when unconfigured**: Middleware early-exits when `ENGAGEMENT_PASSWORD` is not set, avoiding a dead-end redirect loop.
- **Shake animation**: `@keyframes shake` / `.animate-shake` in `globals.css`, re-triggered via forced reflow on failed attempts.
- **Environment**: `ENGAGEMENT_PASSWORD=demo2026` in `.env.local` (gitignored).
- **Next.js 16 note**: Build emits middleware deprecation warning recommending "proxy" — middleware still works correctly and is kept as-is.

## TopBar

- **Height**: Exactly `48px`, sticky, `padding: 0 24px`.
- **Logo + client info**: Single horizontal line separated by a 1px vertical divider at 25% accent opacity. Logo: single-line `Quicksilver Labs` (sans, 13px semibold). Client: `ACME CORP -- Q4 PERFORMANCE REVIEW` in mono/uppercase annotation style.
- **Arrows**: Clean text arrows (`‹`/`›`), no borders/background. Disabled state at boundary slides (opacity 0.25).
- **Dot indicators**: Centered via absolute positioning. Active dot: 20px wide, accent color, two-layer `box-shadow` glow (`.topbar-dot-active` in `globals.css`). Inactive: 6x6px at `accentOpacity[25]`, hover brightens to `accentOpacity[50]`.
- **Props added**: `onGoToSlide?: (index: number) => void` for dot-click navigation. `goTo` callback in `page.tsx` with bounds clamping.
- **Bug fixed**: `TopBar.tsx` was missing `accentOpacity` import from `@/lib/theme`.
- Styling uses inline styles + design tokens from `lib/theme.ts`, consistent with codebase pattern.

## Page Layout & Spacing

- **PageWrap**: `height: calc(100vh - 48px)` with `display: flex; flex-direction: column` so slides fill exactly the viewport below TopBar.
- **Section padding**: Inline `paddingTop: 24` and `paddingBottom: 24` (replaced old `var(--section-padding-y-md)`). `main > section:first-child` override removed.
- **Slide header**: `marginBottom: 20px` (was 48px), code-accent gap `4px` (was 8px).
- **Headline sizing**: Inline `fontSize: clamp(28px, 4vw, 56px)` caps headline at 56px (was 64px), saving ~30px vertical space.
- **Fill prop**: Added `fill` boolean to `ChartCard`, `FunnelChart`, `ComparisonCard`, `DataTable`. When set, components use `flex: 1; minHeight: 0` to stretch into available space.
  - `ChartCard`: chart area uses `flex: 1` instead of fixed `height: 280`.
  - `FunnelChart` / `ComparisonCard`: inner list uses `justify-content: space-evenly`.
  - `DataTable`: rows use percentage-based height (`100/rows.length%`), increased cell padding.
- **Per-slide layouts**: Slide 0 uses `space-between` + `margin-top: auto`; Slide 2 vertically centered at `maxWidth: 75ch` with `clamp(16px, 2.2vw, 22px)` font size; Slides 1/3/4/5 use `fill` prop.

## KPI Component & Data

- **Double-suffix fix**: Removed hardcoded `%` from the `percent` format case in `KPI.tsx`. The `%` is now supplied solely via the `suffix` field in data, preventing `"34.0%%"`.
- **Viewport-triggered animation**: `useIntersectionReveal` (threshold 0.1, once) integrated into `KPI` component. Counter holds at 0 until element enters viewport.
- **`useAnimatedCounter` `enabled` param**: When `false`, counter holds at 0; when `true`, animation starts.
- **Decimal precision**: Hook detects decimal places from target and rounds to matching precision (was `Math.round()`).

## Funnel Chart

- **Entry animation**: `useIntersectionReveal` triggers `funnelBarRise` keyframe (`scaleY 0→1`, origin bottom center). Staggered delay `i * 120ms`. Inner fill bar animates `width: 0%→pct%`. Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **FunnelChart rootMargin**: Call site uses `rootMargin: '0px'` (overriding hook default of `-100px`) to work in full-viewport slide layout.
- **Drop-off hover**: Badge appears between stages on hover. Right-aligned, red tint (`#ff6b6b`) limited to loss/drop-off contexts. Shows percentage + absolute count. `dropoffFadeIn` keyframe (200ms, translateY -4px→0). Internal visual state only — does not affect `onStageHover`/`onStageHoverEnd` callbacks.
- **Hover glow**: Added `onMouseEnter`/`onMouseLeave` border glow + `transition: all 200ms` for consistency with KPI and ChartCard hover treatment.

## DataTable

- **Detail panel**: Click-to-expand "expand below" pattern (not slide-in drawer). Arrow indicator (▶) rotates 90° when expanded. Panel renders outside `<table>` but inside scroll container. `detailExpand` keyframe (max-height 0→300px, 300ms). Row text brightens on expand. `detailKey` prop keeps component generic.
- **Sparklines**: `trendKey` prop appends a "Trend" column using existing `Sparkline` component (100×24px). Only appears when `trendKey` is provided.
- **Sample data**: Extended `sampleTableRows` with `trend` (12-point arrays) and `detail` (avgDealSize, pipeline, quota, calls, meetings, proposals). Detail panel shows Pipeline/Quota attainment percentage, colored green/red by threshold.

## Hover Readouts

- **`useHoverReadout` hook** (`lib/hooks/useHoverReadout.ts`): Returns `{ readout, onHover, onHoverEnd }`. One instance per chart-bearing slide. Prop-drilled (not context) since each readout is scoped to one chart.
- **LiveReadout**: Optional `hoverData` prop overrides default label/value. Hover state uses `accentOpacity[80]` border + `accentOpacity[5]` background. Flash effect reused from refresh mechanism.
- **ChartCard**: Optional `footer` prop (ReactNode) for readout bar below chart.
- **FunnelChart**: `onStageHover`, `onStageHoverEnd`, `footer` props. Shows conversion rate from prior stage + dropoff count.
- **ComparisonCard**: `onItemHover`, `onItemHoverEnd`, `footer` props. Tailors message by format (currency: net dollar change, percent: pp change, numbers: from/to).
- **Bar chart (Monthly Revenue)**: Shows MoM growth % + closed revenue. First month shows "BASELINE".
- **Idle labels**: "HOVER A BAR", "HOVER A STAGE", "HOVER A METRIC" use `.annotation` class.
- **Recharts integration**: `onMouseMove`/`onMouseLeave` on `BarChart`. Uses `any` type for event handler (Recharts v3 lacks typed mouse event interface).
- **Pulse animation**: `pulse` keyframe in `globals.css` for hover indicator dot.

## Sparkline SSR Fix

- Added `mounted` state guard to `Sparkline.tsx` so `ResponsiveContainer` only renders client-side, eliminating the Recharts `-1 width/height` build warning during static generation.

## Keyboard Navigation

- Added `'Enter'` case to `useKeyboardNav.ts` switch statement. JSDoc documented "space/enter navigation" but only Space was implemented.

## Untouched Components

- `FilterBar` and `SlideDrawer` exist but aren't wired into `page.tsx` — available for future engagement configurations.
- `ClickZones` operates independently, not part of TopBar.
- `ComparisonCard.tsx`, `DataTable.tsx`, `LiveReadout.tsx` also hardcode `%` in percent format cases but don't use prefix/suffix fields, so no double-suffix risk.
