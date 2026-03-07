import { getSkills } from '@/lib/skills';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await getSkills();
  return NextResponse.json(items);
}
