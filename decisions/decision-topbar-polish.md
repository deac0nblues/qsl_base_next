# TopBar Polish Decisions

## Changes Made

- **Height**: Set to exactly `48px` using `height: 48` with `padding: '0 24px'` (vertical padding removed so height is precise)
- **Logo + client info**: Placed on a single horizontal line, separated by a thin vertical divider (`1px`, accent at 25% opacity)
- **Logo text**: Changed from two-line `Quicksilver\nLabs` to single-line `Quicksilver Labs` using the sans font at 13px semibold
- **Client info**: Displayed as `ACME CORP -- Q4 PERFORMANCE REVIEW` in mono/uppercase annotation style, matching existing `.code-accent` conventions
- **Prev/next arrows**: Clean text arrows (`&#8249;` / `&#8250;` single angle quotes), no borders, no background, no boxes -- just subtle text with opacity transitions
- **Arrow disabling**: Added `disabled` state + reduced opacity (0.25) at boundary slides (first/last) instead of keeping them always clickable
- **Dot indicators**: Centered horizontally via `position: absolute; left: 50%; transform: translateX(-50%)` to stay visually centered regardless of left/right content width
- **Active dot**: Wider (20px vs 6px) with accent color and a CSS `box-shadow` glow via `.topbar-dot-active` class
- **Inactive dots**: 6x6px rounded at `accentOpacity[25]`, with hover state brightening to `accentOpacity[50]`
- **Dot glow**: Added `.topbar-dot-active` CSS class in `globals.css` for the subtle box-shadow glow effect (two-layer shadow: inner 6px + outer 12px spread)

## Styling Approach

- Kept inline styles consistent with existing codebase pattern (no new CSS modules introduced)
- Used design tokens from `lib/theme.ts` throughout (`fontFamily`, `fontSize`, `letterSpacing`, `fontWeight`, `zIndex`, `transition`, `accentOpacity`, `colors`)
- One new CSS class (`.topbar-dot-active`) added to `globals.css` because `box-shadow` with CSS variables is cleaner in a stylesheet

## New Props Added

- `onGoToSlide?: (index: number) => void` -- allows dot click to jump directly to a slide
- Added `goTo` callback in `page.tsx` with bounds clamping

## Things Intentionally NOT Changed

- **ClickZones component**: Left untouched -- it operates independently and is not part of the TopBar
- **useKeyboardNav hook**: No changes needed -- it already works with the existing `prev`/`next` callbacks
- **SlideDrawer**: Not touched, unrelated to TopBar
- **Existing TopBar props** (`title`, `subtitle`, `currentSlide`, `totalSlides`, `onPrev`, `onNext`): All preserved for backward compatibility
- **Slide counter text** (`1/6`): Kept in the right-side nav area between arrows as a compact reference alongside the dot indicators

## Bug Fixed

- Original TopBar referenced `accentOpacity` without importing it -- fixed by importing from `@/lib/theme`
