import { isDbConfigured } from '@/lib/db';
import { PROJECT_IMAGE_KEYS } from '@/lib/project-images';
import { getProjects } from '@/lib/projects';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const dbReady = isDbConfigured();
  const projects = await getProjects({ includeHidden: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Tags dipisah koma. Image pilih dari aset yang sudah ada.</p>
      </div>

      <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/10 bg-gray-50/70 dark:bg-white/5 p-4">
                <form action="/api/admin/projects/update" method="post" className="grid grid-cols-1 gap-3">
                  <input type="hidden" name="id" value={project.id} />
                  <div className="flex flex-wrap gap-3 items-center">
                    <input
                      name="title"
                      defaultValue={project.title}
                      className="h-10 w-[22rem] max-w-full px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                      required
                      disabled={!dbReady || project.id <= 0}
                    />
                    <input
                      name="linkUrl"
                      defaultValue={project.linkUrl}
                      className="h-10 flex-1 min-w-[18rem] px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                      required
                      disabled={!dbReady || project.id <= 0}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 items-center">
                    <select
                      name="imageKey"
                      defaultValue={project.imageKey}
                      className="h-10 w-56 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                      disabled={!dbReady || project.id <= 0}
                    >
                      {PROJECT_IMAGE_KEYS.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                    <input
                      name="sortOrder"
                      type="number"
                      defaultValue={project.sortOrder}
                      className="h-10 w-24 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                      required
                      disabled={!dbReady || project.id <= 0}
                    />
                    <label className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-white/80">
                      <input
                        name="isVisible"
                        type="checkbox"
                        defaultChecked={project.isVisible}
                        className="h-4 w-4 accent-gray-900 dark:accent-white"
                        disabled={!dbReady || project.id <= 0}
                      />
                      Tampil
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="submit"
                        disabled={!dbReady || project.id <= 0}
                        className="h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-950 disabled:opacity-50 disabled:hover:bg-gray-900"
                      >
                        Simpan
                      </button>
                      <button
                        type="submit"
                        formAction="/api/admin/projects/delete"
                        formMethod="post"
                        disabled={!dbReady || project.id <= 0}
                        className="h-10 px-4 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>

                  <textarea
                    name="description"
                    defaultValue={project.description}
                    className="min-h-[6rem] w-full px-3 py-2 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                    required
                    disabled={!dbReady || project.id <= 0}
                  />
                  <input
                    name="tags"
                    defaultValue={project.tags.join(', ')}
                    className="h-10 w-full px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                    placeholder="Nuxt.js, Tailwind CSS, ..."
                    disabled={!dbReady || project.id <= 0}
                  />
                </form>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-6 border-t border-black/10 dark:border-white/10 bg-gray-50/60 dark:bg-white/5">
          <h3 className="font-semibold text-gray-900 dark:text-white">Tambah Project</h3>
          <form action="/api/admin/projects/create" method="post" className="mt-4 grid grid-cols-1 gap-3">
            <div className="flex flex-wrap gap-3 items-center">
              <input
                name="title"
                placeholder="Title"
                className="h-10 w-[22rem] max-w-full px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                required
                disabled={!dbReady}
              />
              <input
                name="linkUrl"
                placeholder="https://..."
                className="h-10 flex-1 min-w-[18rem] px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                required
                disabled={!dbReady}
              />
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <select
                name="imageKey"
                defaultValue={PROJECT_IMAGE_KEYS[0]}
                className="h-10 w-56 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                disabled={!dbReady}
              >
                {PROJECT_IMAGE_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
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
              name="tags"
              placeholder="Nuxt.js, Tailwind CSS, ..."
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
        </div>
      </section>
    </div>
  );
}
