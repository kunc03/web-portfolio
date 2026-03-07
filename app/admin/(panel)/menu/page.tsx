import { isDbConfigured } from '@/lib/db';
import { getMenuItems } from '@/lib/menu';

export const dynamic = 'force-dynamic';

export default async function AdminMenuPage() {
  const dbReady = isDbConfigured();
  const items = await getMenuItems({ includeHidden: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Menu</h1>
        <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Href harus diawali # (anchor) atau / (route).</p>
      </div>

      <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/10 bg-gray-50/70 dark:bg-white/5 p-4 flex flex-wrap items-center gap-3"
              >
                <form action="/api/admin/menu/update" method="post" className="flex flex-wrap items-center gap-3 flex-1 min-w-[18rem]">
                  <input type="hidden" name="id" value={item.id} />
                  <input
                    name="name"
                    defaultValue={item.name}
                    className="h-10 w-44 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                    required
                    disabled={!dbReady || item.id <= 0}
                  />
                  <input
                    name="href"
                    defaultValue={item.href}
                    className="h-10 w-56 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                    required
                    disabled={!dbReady || item.id <= 0}
                  />
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={item.sortOrder}
                    className="h-10 w-24 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                    required
                    disabled={!dbReady || item.id <= 0}
                  />
                  <label className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-white/80">
                    <input
                      name="isVisible"
                      type="checkbox"
                      defaultChecked={item.isVisible}
                      className="h-4 w-4 accent-gray-900 dark:accent-white"
                      disabled={!dbReady || item.id <= 0}
                    />
                    Tampil
                  </label>
                  <button
                    type="submit"
                    disabled={!dbReady || item.id <= 0}
                    className="h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-950 disabled:opacity-50 disabled:hover:bg-gray-900"
                  >
                    Simpan
                  </button>
                </form>

                <form action="/api/admin/menu/delete" method="post">
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    disabled={!dbReady || item.id <= 0}
                    className="h-10 px-4 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-6 border-t border-black/10 dark:border-white/10 bg-gray-50/60 dark:bg-white/5">
          <h3 className="font-semibold text-gray-900 dark:text-white">Tambah Menu</h3>
          <form action="/api/admin/menu/create" method="post" className="mt-4 flex flex-wrap gap-3 items-center">
            <input
              name="name"
              placeholder="Nama"
              className="h-10 w-44 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
              required
              disabled={!dbReady}
            />
            <input
              name="href"
              placeholder="#home / /blog"
              className="h-10 w-56 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
              required
              disabled={!dbReady}
            />
            <input
              name="sortOrder"
              type="number"
              placeholder="0"
              defaultValue={0}
              className="h-10 w-24 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
              required
              disabled={!dbReady}
            />
            <label className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-white/80">
              <input name="isVisible" type="checkbox" defaultChecked className="h-4 w-4 accent-gray-900 dark:accent-white" disabled={!dbReady} />
              Tampil
            </label>
            <button
              type="submit"
              disabled={!dbReady}
              className="h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-950 disabled:opacity-50 disabled:hover:bg-gray-900"
            >
              Tambah
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

