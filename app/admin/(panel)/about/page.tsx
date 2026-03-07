export const dynamic = 'force-dynamic';

import { getAbout } from '@/lib/about';
import { isDbConfigured } from '@/lib/db';

export default async function AdminAboutPage() {
  const dbReady = isDbConfigured();
  const about = await getAbout();
  const content = about.paragraphs.join('\n\n');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">About</h1>
        <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Kelola konten About untuk section di homepage.</p>
      </div>

      <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 overflow-hidden">
        <form action="/api/admin/about/update" method="post" className="p-4 sm:p-6 space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="about-content">
              Konten
            </label>
            <textarea
              id="about-content"
              name="content"
              defaultValue={content}
              rows={12}
              disabled={!dbReady}
              className={[
                'w-full rounded-xl px-3 py-2 text-sm',
                'bg-white/70 dark:bg-black/20',
                'ring-1 ring-inset ring-black/10 dark:ring-white/10',
                'focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20',
                !dbReady ? 'opacity-60 cursor-not-allowed' : '',
              ].join(' ')}
            />
            <div className="text-xs text-gray-600 dark:text-white/70">Pisahkan paragraf dengan 1 baris kosong.</div>
          </div>

          <div className="flex items-center justify-between gap-3">
            {!dbReady ? (
              <div className="text-sm text-amber-800 dark:text-amber-200">Database belum dikonfigurasi. Perubahan tidak bisa disimpan.</div>
            ) : (
              <div />
            )}
            <button
              type="submit"
              disabled={!dbReady}
              className={[
                'h-10 rounded-xl px-4 text-sm font-medium',
                'bg-gray-900 text-white hover:bg-gray-800',
                'dark:bg-white/15 dark:text-white dark:hover:bg-white/20',
                !dbReady ? 'opacity-60 cursor-not-allowed' : '',
              ].join(' ')}
            >
              Simpan
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
