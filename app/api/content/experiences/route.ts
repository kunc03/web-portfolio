import { getExperiences } from '@/lib/experiences';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await getExperiences();
  return NextResponse.json(items);
}
