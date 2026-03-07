import { getAbout } from '@/lib/about';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const about = await getAbout();
  return NextResponse.json(about, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

