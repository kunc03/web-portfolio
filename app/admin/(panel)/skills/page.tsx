import { isDbConfigured } from '@/lib/db';
import { getSkills } from '@/lib/skills';

export const dynamic = 'force-dynamic';

export default async function AdminSkillsPage() {
  const dbReady = isDbConfigured();
  const skills = await getSkills({ includeHidden: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Skills</h1>
        <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Ubah skill list yang tampil di section Skills.</p>
      </div>

      <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="space-y-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/10 bg-gray-50/70 dark:bg-white/5 p-4 flex flex-wrap items-center gap-3"
              >
                <form action="/api/admin/skills/update" method="post" className="flex flex-wrap items-center gap-3 flex-1 min-w-[18rem]">
                  <input type="hidden" name="id" value={skill.id} />
                  <input
                    name="name"
                    defaultValue={skill.name}
                    className="h-10 w-56 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                    required
                    disabled={!dbReady || skill.id <= 0}
                  />
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={skill.sortOrder}
                    className="h-10 w-24 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                    required
                    disabled={!dbReady || skill.id <= 0}
                  />
                  <label className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-white/80">
                    <input
                      name="isVisible"
                      type="checkbox"
                      defaultChecked={skill.isVisible}
                      className="h-4 w-4 accent-gray-900 dark:accent-white"
                      disabled={!dbReady || skill.id <= 0}
                    />
                    Tampil
                  </label>
                  <button
                    type="submit"
                    disabled={!dbReady || skill.id <= 0}
                    className="h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-950 disabled:opacity-50 disabled:hover:bg-gray-900"
                  >
                    Simpan
                  </button>
                </form>

                <form action="/api/admin/skills/delete" method="post">
                  <input type="hidden" name="id" value={skill.id} />
                  <button
                    type="submit"
                    disabled={!dbReady || skill.id <= 0}
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
          <h3 className="font-semibold text-gray-900 dark:text-white">Tambah Skill</h3>
          <form action="/api/admin/skills/create" method="post" className="mt-4 flex flex-wrap gap-3 items-center">
            <input
              name="name"
              placeholder="Nama skill"
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

