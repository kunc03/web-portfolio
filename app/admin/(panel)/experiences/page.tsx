import { isDbConfigured } from '@/lib/db';
import { getExperiences } from '@/lib/experiences';
import AdminExperiencesEditor from '@/components/admin-experiences-editor';

export const dynamic = 'force-dynamic';

export default async function AdminExperiencesPage() {
  const dbReady = isDbConfigured();
  const experiences = await getExperiences({ includeHidden: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Experiences</h1>
        <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Tech stack dipisah koma.</p>
      </div>

      <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 overflow-hidden">
        <div className="p-4 sm:p-6">
          <AdminExperiencesEditor initialItems={experiences} dbReady={dbReady} />
        </div>

        <div className="px-4 sm:px-6 py-6 border-t border-black/10 dark:border-white/10 bg-gray-50/60 dark:bg-white/5">
          <details>
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white select-none">Tambah Experience</summary>
            <form action="/api/admin/experiences/create" method="post" className="mt-4 grid grid-cols-1 gap-3">
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  name="date"
                  placeholder="Jul 2024 – Sep 2024"
                  className="h-10 w-56 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                  required
                  disabled={!dbReady}
                />
                <input
                  name="title"
                  placeholder="Role / Title"
                  className="h-10 flex-1 min-w-[18rem] px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                  required
                  disabled={!dbReady}
                />
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  name="company"
                  placeholder="Company"
                  className="h-10 w-[22rem] max-w-full px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                  required
                  disabled={!dbReady}
                />
                <input
                  name="location"
                  placeholder="Onsite · City, Country"
                  className="h-10 flex-1 min-w-[18rem] px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                  required
                  disabled={!dbReady}
                />
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  name="icon"
                  placeholder="pi pi-briefcase"
                  className="h-10 w-56 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
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
              </div>
              <textarea
                name="description"
                placeholder="Deskripsi"
                className="min-h-[6rem] w-full px-3 py-2 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                required
                disabled={!dbReady}
              />
              <input
                name="techStack"
                placeholder="Next.js, Tailwind CSS, ..."
                className="h-10 w-full px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                disabled={!dbReady}
              />
              <button
                type="submit"
                disabled={!dbReady}
                className="h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-950 disabled:opacity-50 disabled:hover:bg-gray-900"
              >
                Tambah
              </button>
            </form>
          </details>
        </div>
      </section>
    </div>
  );
}
