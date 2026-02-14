# Decision: KPI Component & Data Fix

## Double-suffix bug fix (`KPI.tsx`)

- **Root cause**: `formatValue` hardcoded `%` in the `percent` case (`${value.toFixed(1)}%`), while sample data also provided `suffix: '%'`. The dedup guard (`endsWith`) masked the double-suffix in some cases but the design was fragile and produced `"34.0%%"` when the guard failed.
- **Fix chosen**: Removed the hardcoded `%` from the `percent` format case. Now `percent` only formats the number (`value.toFixed(1)`), and the `%` is supplied solely via the `suffix` field in the data.
- **Why not remove `suffix` from data instead**: Keeping `%` in the suffix field makes the data model explicit — the format controls number formatting, the suffix controls the displayed unit. This is cleaner and prevents future collisions.

## Sample data (`config/sample-data.ts`)

- **No changes needed**: Win Rate already had `suffix: '%'` which is now the sole source of the `%` sign. All other KPI values are numeric with format-appropriate rendering.
- `engagement.example.ts` Win Rate also already had `suffix: '%'` — left as-is.

## Animated counter viewport trigger

- **Added `enabled` param to `useAnimatedCounter`**: When `false`, the counter holds at 0. When `true`, animation starts. This keeps the hook simple and reusable.
- **Integrated `useIntersectionReveal` into `KPI` component**: The KPI `<div>` now carries a ref from `useIntersectionReveal`. The counter stays at 0 until the element enters the viewport (`revealed` = true), then animates up.
- **Intersection options**: `threshold: 0.1`, `rootMargin: '0px'`, `once: true` — triggers when 10% visible, fires only once.

## Animated counter decimal precision

- **Previously**: `Math.round()` discarded fractional digits, so a target of `34.0` animated as `0, 1, 2, … 34` (integers only).
- **Now**: The hook detects decimal places from the target and rounds to the same precision, so `34.0` animates smoothly as `0.0, 0.3, … 34.0`.

## Pre-existing TopBar build error

- **Fixed**: `TopBar.tsx` referenced `accentOpacity` without importing it. Added missing import. This was a pre-existing bug, not caused by our changes.

## Intentionally not changed

- `ComparisonCard.tsx`, `DataTable.tsx`, `LiveReadout.tsx` — these components also hardcode `%` in their percent format cases, but they do **not** use prefix/suffix fields, so there is no double-suffix risk. Changing them was out of scope.
- `config/sample-data.ts` values — all KPI values were already numeric. No data-shape changes needed.
