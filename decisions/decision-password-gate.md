# Decision: Password Gate Implementation

## Architecture

- **Middleware-based protection**: Used Next.js `middleware.ts` at the project root to intercept all requests and check for a `qsl_auth` session cookie. Unauthenticated requests are redirected to `/gate`.
- **Dedicated gate route**: Created `/gate` as a standalone page (not an inline wrapper around children) so the middleware can redirect to it cleanly. This avoids the previous pattern of passing `password` and `children` as props, which exposed the password to the client.
- **Server-side password verification**: Password checking happens in `app/api/auth/route.ts` (a POST endpoint), so the `ENGAGEMENT_PASSWORD` env var is never sent to the browser. The previous component compared passwords client-side.

## Cookie

- Cookie name: `qsl_auth` with value `authenticated`
- `httpOnly: true` to prevent JavaScript access
- `secure: true` only in production (to allow local dev over HTTP)
- `sameSite: 'lax'` for standard CSRF protection
- Session cookie (no `maxAge`) — expires when the browser closes

## Middleware matcher

- Excludes `_next/static`, `_next/image`, `favicon.ico`, and common static file extensions (svg, png, jpg, etc.) so assets load on the gate page
- Allows unauthenticated access to `/gate` and `/api/auth` only
- Authenticated users visiting `/gate` are redirected back to `/`

## Shake animation

- Added `@keyframes shake` and `.animate-shake` class to `globals.css`, consistent with the existing keyframe/class pattern in the file
- Animation is re-triggered on each failed attempt by removing/re-adding the class with a forced reflow

## Styling

- Preserved all existing design-system styles from the original `PasswordGate.tsx` (colors, fonts, spacing, border, button hover behavior)
- Added a loading/disabled state to the submit button during verification
- Error color `#ff6b6b` kept from the original component

## What was NOT changed

- `app/layout.tsx` — no changes needed; middleware handles protection before the layout renders
- `app/page.tsx` — untouched; it is the protected content behind the gate
- `DECISIONS.md` — not modified per instructions

## Pre-existing bug fixed

- `components/layout/TopBar.tsx` was missing `accentOpacity` in its import from `@/lib/theme` — added it since the file already referenced `accentOpacity[20]` on line 24. This was required to get the build to pass.

## Environment

- `ENGAGEMENT_PASSWORD=demo2026` added to `.env.local`, which is already gitignored by the existing `.gitignore` (`.env*` pattern)

## Next.js 16 note

- Build emits a deprecation warning: `The "middleware" file convention is deprecated. Please use "proxy" instead.` — middleware still works correctly in Next.js 16.1.6 and is the conventional approach for this pattern. Kept as-is since the proxy API is newer and this is the established convention.
