import { isValidAdminCredentials, setAdminSessionCookie } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL('/admin/login', req.url), 307);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.redirect(new URL('/admin/login?error=config', req.url), 303);
  }

  if (!isValidAdminCredentials(email, password)) {
    return NextResponse.redirect(new URL('/admin/login?error=1', req.url), 303);
  }

  setAdminSessionCookie(email);
  return NextResponse.redirect(new URL('/admin/menu', req.url), 303);
}
