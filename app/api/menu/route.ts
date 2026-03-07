import { getMenuItems } from '@/lib/menu';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await getMenuItems();
  const res = NextResponse.json(
    items.map((i) => ({
      id: i.id,
      name: i.name,
      href: i.href,
    }))
  );
  res.headers.set('Cache-Control', 'no-store');
  return res;
}
