# Decision: Hover Readouts for Chart Components

## Architecture

- Created `useHoverReadout` hook (`lib/hooks/useHoverReadout.ts`) to manage hover state — returns `{ readout, onHover, onHoverEnd }` for each chart instance
- One hook instance per chart-bearing slide; state is lifted to `page.tsx` and passed down via props
- Chose prop-drilling over context because each readout is scoped to one chart — no cross-slide communication needed

## Component Changes

- **LiveReadout**: Added optional `hoverData` prop (type `HoverReadout | null`). When set, the readout overrides its default label/value with the contextual hover message. Fully backward-compatible — existing usage without `hoverData` is unchanged.
- **ChartCard**: Added optional `footer` prop (ReactNode) for rendering the readout bar below the chart area
- **FunnelChart**: Added `onStageHover`, `onStageHoverEnd`, and `footer` props. Hover fires on each stage row, passing the stage data and computed conversion rate
- **ComparisonCard**: Added `onItemHover`, `onItemHoverEnd`, and `footer` props. Hover fires per comparison row, passing the item data and delta percentage

## Contextual Messages (not placeholders)

- **Bar chart (Monthly Revenue)**: Shows month-over-month growth percentage and closed revenue (e.g., "Nov REVENUE up 24.1% MoM — $720K closed"). First month shows "BASELINE" since no prior data exists.
- **Funnel chart (Pipeline)**: Top-of-funnel shows total leads; subsequent stages show conversion rate from prior stage and dropoff count (e.g., "38.4% CONVERSION from Leads — 7,700 dropped at this stage")
- **Comparison card (QoQ)**: Tailors message by format — currency shows net dollar change, percent shows pp change, numbers show from/to values

## Styling Decisions

- Hover state on LiveReadout uses `accentOpacity[80]` border + `accentOpacity[5]` background to subtly distinguish active state from idle
- Added `pulse` keyframe animation to `globals.css` for the hover indicator dot
- Idle readout labels ("HOVER A BAR", "HOVER A STAGE", "HOVER A METRIC") use the existing `.annotation` class for consistency
- Flash effect reused from LiveReadout's refresh mechanism — triggers on each hover change for visual feedback

## Things NOT Changed

- **Slide 0 (Executive Summary)**: LiveReadout here already has `refreshInterval` for live simulation — not a chart, no hover readout added
- **Slide 2 (Key Insights)**: Narrative text block, no chart to attach hover to
- **Slide 4 (Rep Performance)**: DataTable component — row hover highlighting already exists; adding a readout bar would require DataTable prop changes that felt out of scope since it's a table, not a bar/area chart
- **Recharts Tooltip**: Kept the existing inline tooltip on the bar chart — it complements (not conflicts with) the readout bar below
- **TopBar bug fix**: Added missing `accentOpacity` import in `TopBar.tsx` — pre-existing issue that prevented build

## Recharts Integration

- Used `onMouseMove` + `onMouseLeave` on `BarChart` component — Recharts passes `activePayload` in the event which contains the hovered data point
- Used `any` type for the Recharts event handler since Recharts v3 doesn't export a typed event interface for mouse events
