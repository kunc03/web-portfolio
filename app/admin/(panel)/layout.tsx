import { redirect } from 'next/navigation';
import AdminSidebarNav from '@/components/admin-sidebar-nav';
import { getAdminSession } from '@/lib/admin-auth';
import { isDbConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';

const NAV_ITEMS = [
  { href: '/admin/menu', label: 'Menu' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/skills', label: 'Skills' },
  { href: '/admin/experiences', label: 'Experiences' },
] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = getAdminSession();
  if (!session) redirect('/admin/login');

  const dbReady = isDbConfigured();

  return (
    <div className="min-h-dvh bg-gradient-to-b from-gray-50 to-gray-100 dark:from-black dark:to-gray-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <aside className="w-full sm:w-72 sm:shrink-0">
            <div className="sm:sticky sm:top-6">
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 backdrop-blur shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">Admin Panel</div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${
                        dbReady
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200'
                          : 'bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200'
                      }`}
                    >
                      {dbReady ? 'DB Ready' : 'DB Off'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-white/70 mt-1 break-all">{session.email}</div>
                </div>

                <AdminSidebarNav items={[...NAV_ITEMS]} />

                <div className="p-3 border-t border-black/10 dark:border-white/10">
                  <form action="/api/admin/logout" method="post">
                    <button
                      type="submit"
                      className="h-10 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-sm font-medium"
                    >
                      Logout
                    </button>
                  </form>
                </div>
              </div>

              {!dbReady && (
                <div className="mt-3 rounded-2xl border border-amber-400/40 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-300/30 dark:bg-amber-500/10 dark:text-amber-200">
                  Database belum dikonfigurasi. Perubahan tidak bisa disimpan.
                </div>
              )}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <main className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 backdrop-blur shadow-sm p-5 sm:p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

