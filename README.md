# QSL Base

Quicksilver Labs engagement presentation framework built with Next.js, TypeScript, and Recharts.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use arrow keys or click the left/right edges to navigate slides.

## Project Structure

```
app/
  layout.tsx          Root layout (Plus Jakarta Sans font)
  page.tsx            Demo engagement with 6 slides
  globals.css         CSS variables, resets, keyframes

components/
  layout/
    PageWrap.tsx      Max-width centered page container
    TopBar.tsx        Sticky navigation bar with slide counter
    SlideDrawer.tsx   Right-side slide-out drawer
    ClickZones.tsx    Left/right click zones for navigation
  ui/
    KPI.tsx           Animated KPI card with trend indicator
    Narrative.tsx     Left-border narrative text block
    ChartCard.tsx     Card wrapper for charts
    FilterBar.tsx     Dropdown filter row
    LiveReadout.tsx   Live-updating metric with flash indicator
    Sparkline.tsx     Inline sparkline (Recharts)
    ComparisonCard.tsx  Period-over-period comparison bars
    DataTable.tsx     Sortable data table
  charts/
    FunnelChart.tsx   Horizontal funnel visualization
  auth/
    PasswordGate.tsx  Password wall for gated engagements

lib/
  theme.ts            Design tokens (colors, spacing, typography, motion)
  types.ts            TypeScript interfaces
  hooks/
    useAnimatedCounter.ts   Smooth number animation
    useKeyboardNav.ts       Arrow key slide navigation
    useIntersectionReveal.ts  Viewport-triggered reveal

config/
  engagement.example.ts   Example engagement config
  sample-data.ts          Demo data for all components
```

## Creating an Engagement

1. Copy `config/engagement.example.ts` to `config/engagement.ts`
2. Edit the slides, KPIs, and data to match your client
3. Optionally set a `password` field to gate access

## Design System

See `docs/DESIGN_SYSTEM.md` for the full Quicksilver Labs visual specification.

Key tokens:
- **Background:** `#121a3a`
- **Accent:** `#00ff96`
- **Font:** Plus Jakarta Sans (300-800)
- **Mono:** Courier New / Monaco / Menlo

## Tech Stack

- **Next.js** 15 (App Router)
- **TypeScript**
- **Recharts** for data visualization
- **CSS variables** + vanilla CSS (no Tailwind)
