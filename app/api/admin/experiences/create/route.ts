import { getAdminSession } from '@/lib/admin-auth';
import { isDbConfigured } from '@/lib/db';
import { createExperience } from '@/lib/experiences';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getReturnUrl(req: NextRequest) {
  const fallback = new URL('/admin/experiences', req.url);
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
  const session = getAdminSession();
  if (!session) return NextResponse.redirect(new URL('/admin/login', req.url), 303);
  if (!isDbConfigured()) return NextResponse.redirect(getReturnUrl(req), 303);

  const formData = await req.formData();
  await createExperience({
    date: formData.get('date'),
    title: formData.get('title'),
    company: formData.get('company'),
    location: formData.get('location'),
    description: formData.get('description'),
    techStack: formData.get('techStack'),
    icon: formData.get('icon'),
    sortOrder: formData.get('sortOrder'),
    isVisible: formData.get('isVisible'),
  });

  revalidatePath('/');
  revalidatePath('/admin/experiences');
  return NextResponse.redirect(getReturnUrl(req), 303);
}
