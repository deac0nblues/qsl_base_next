import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const expected = process.env.ENGAGEMENT_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: 'Server misconfigured: no password set' },
      { status: 500 },
    );
  }

  if (password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set('qsl_auth', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    // Session cookie — no maxAge means it expires when the browser closes
  });

  return response;
}
