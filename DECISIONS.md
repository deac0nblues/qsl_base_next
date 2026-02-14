# Project Decisions

Read this file before making any changes. Do not modify this file directly — the scribe task handles updates.

## Brand Identity

- Logo text is "Quicksilver" on line 1, "Labs" on line 2. Left-justified, white, base font (Plus Jakarta Sans). No uppercase, no letter-spacing, no special styling on the logo.
- Primary accent color: #00E87B (emerald green)
- Background: #0B1021 (deep navy)
- Surface/card background: #0F1629
- Borders: rgba(255,255,255,0.07) — thin, subtle
- No border-radius anywhere (or 1px max). Sharp corners.
- Cold precision aesthetic — no warmth, no grain, no serifs

## Typography

- Body/headings: Plus Jakarta Sans (weights 300, 400, 500, 600, 700)
- Data values, labels, monospace elements: JetBrains Mono (weights 300, 400, 500)
- Category labels: uppercase, letter-spacing 0.12-0.2em, font-size 9-10px, JetBrains Mono, dim color
- Section numbers: JetBrains Mono, dim color, format "[01]" or "SECTION 01"

## Navigation

- Top bar: opaque background (#070B18), 48px height, subtle bottom border
- Dot indicators for slides (active dot wider with glow)
- Slide counter in JetBrains Mono (e.g., "01 / 06")
- Keyboard nav: arrow keys, spacebar to advance
- Invisible click zones on left/right edges
- Slide drawer overlays from right side

## Page Layout

- 16:9 content scaling — PageWrap renders 1280x720 design canvas, scales to fit viewport
- No visible border around the content frame
- Content fills the page edge-to-edge within the scaled area
- Minimal gap between nav bar and first content (~24px)

## Components

- KPI cards: accent gradient bar at top, animated counter on intersection reveal, monospace subtitle
- Narrative blocks: left accent border (green for analysis, red for caveats), subtle background tint
- Charts: Recharts library, custom dark tooltips, grid lines match border color
- LiveReadout: thin bar below charts showing hover-driven contextual data
- FilterBar: toggle pills with accent highlight on active state
- Sparklines: inline SVG, accent color with drop-shadow glow

## Data Formatting

- KPI values are numeric (e.g., 34.0), suffix is a separate field (e.g., "%"). Never bake suffix into the value.
- Percentages show one decimal (e.g., "8.0%")
- Large numbers use locale formatting (e.g., "4,280")
- Days suffixed with "d" (e.g., "18.4d")
- Multipliers suffixed with "×" (e.g., "7.1×")

## Deployment

- Vercel, connected to GitHub repo
- Push to main = production deploy
- Branch pushes = preview deploys
- Password gate for client access (env var: ENGAGEMENT_PASSWORD)
