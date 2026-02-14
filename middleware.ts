import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware that protects all routes behind a password gate.
 * If the `qsl_auth` cookie is missing, the user is redirected to /gate.
 * When no ENGAGEMENT_PASSWORD env var is set, the gate is bypassed entirely.
 */
export function middleware(request: NextRequest) {
  // If no password is configured, bypass the gate entirely
  if (!process.env.ENGAGEMENT_PASSWORD) {
    // If someone visits /gate when no password is set, redirect to /
    if (request.nextUrl.pathname === '/gate') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  const authCookie = request.cookies.get('qsl_auth');

  if (authCookie?.value === 'authenticated') {
    // Already authenticated — if they visit /gate, redirect them to /
    if (request.nextUrl.pathname === '/gate') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Not authenticated — allow access to /gate and /api/auth only
  if (
    request.nextUrl.pathname === '/gate' ||
    request.nextUrl.pathname === '/api/auth'
  ) {
    return NextResponse.next();
  }

  // Redirect everything else to the gate
  return NextResponse.redirect(new URL('/gate', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next.js internals and static assets:
     *   - _next/static  (static files)
     *   - _next/image   (image optimization)
     *   - favicon.ico   (favicon)
     *   - public folder assets (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
