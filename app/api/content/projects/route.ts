import { getProjects } from '@/lib/projects';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await getProjects();
  return NextResponse.json(
    items.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      tags: p.tags,
      imageKey: p.imageKey,
      linkUrl: p.linkUrl,
      sortOrder: p.sortOrder,
      isVisible: p.isVisible,
    }))
  );
}
