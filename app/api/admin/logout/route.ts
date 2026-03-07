import { clearAdminSessionCookie } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  clearAdminSessionCookie();
  return NextResponse.redirect(new URL('/admin/login', req.url), 303);
}
