import { getAdminSession } from '@/lib/admin-auth';
import { isDbConfigured } from '@/lib/db';
import { reorderSkills } from '@/lib/skills';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json({ ok: false, error: 'db_not_configured' }, { status: 400 });

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const orderedIds = (body as { orderedIds?: unknown })?.orderedIds;
  try {
    await reorderSkills({ orderedIds });
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
