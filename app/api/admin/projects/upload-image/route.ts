import { getAdminSession } from '@/lib/admin-auth';
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('imageFile');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Hanya file gambar yang diizinkan' }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'Ukuran file maksimal 5 MB' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() ?? 'png';
  const filename = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const blob = await put(filename, file, { access: 'public' });

  return NextResponse.json({ url: blob.url });
}
