import { getAdminSession } from '@/lib/admin-auth';
import { isDbConfigured } from '@/lib/db';
import { updateProject } from '@/lib/projects';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getReturnUrl(req: NextRequest) {
  const fallback = new URL('/admin/projects', req.url);
  const referer = req.headers.get('referer');
  if (!referer) return fallback;
  try {
    const url = new URL(referer);
    if (url.origin !== fallback.origin) return fallback;
    return url;
  } catch {
    return fallback;
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.redirect(new URL('/admin/login', req.url), 303);
  if (!isDbConfigured()) return NextResponse.redirect(getReturnUrl(req), 303);

  const formData = await req.formData();

  // Handle optional file upload
  let imageKey = formData.get('imageKey');
  const imageFile = formData.get('imageFile');
  if (imageFile instanceof File && imageFile.size > 0 && imageFile.type.startsWith('image/')) {
    const ext = imageFile.name.split('.').pop() ?? 'png';
    const filename = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const blob = await put(filename, imageFile, { access: 'public' });
    imageKey = blob.url;
  }

  await updateProject({
    id: formData.get('id'),
    title: formData.get('title'),
    description: formData.get('description'),
    tags: formData.get('tags'),
    imageKey,
    linkUrl: formData.get('linkUrl'),
    sortOrder: formData.get('sortOrder'),
    isVisible: formData.get('isVisible'),
  });

  revalidatePath('/');
  revalidatePath('/admin/projects');
  return NextResponse.redirect(getReturnUrl(req), 303);
}
