import { isDbConfigured } from '@/lib/db';
import { getProjects } from '@/lib/projects';
import AdminProjectsEditor from '@/components/admin-projects-editor';
import ImageUploadInput from '@/components/image-upload-input';
import ImageKeySelect from '@/components/image-key-select';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const dbReady = isDbConfigured();
  const projects = await getProjects({ includeHidden: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Tags dipisah koma. Upload gambar baru atau pilih dari preset.</p>
      </div>

      <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 overflow-hidden">
        <div className="p-4 sm:p-6">
          <AdminProjectsEditor initialItems={projects} dbReady={dbReady} />
        </div>

        <div className="px-4 sm:px-6 py-6 border-t border-black/10 dark:border-white/10 bg-gray-50/60 dark:bg-white/5">
          <details>
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white select-none">Tambah Project</summary>
            <form action="/api/admin/projects/create" method="post" encType="multipart/form-data" className="mt-4 grid grid-cols-1 gap-3">
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

              {/* Upload gambar baru */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-600 dark:text-white/60">Upload gambar baru (opsional, maks 5 MB)</label>
                <ImageUploadInput inputId="create-image-file" previewId="create-img-preview" disabled={!dbReady} />
              </div>

              {/* Atau pilih dari preset */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-600 dark:text-white/60">Atau pilih gambar preset</label>
                <div className="flex flex-wrap gap-3 items-center">
                  <ImageKeySelect disabled={!dbReady} />
                  <label className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-white/80">
                    <input name="isVisible" type="checkbox" defaultChecked className="h-4 w-4 accent-gray-900 dark:accent-white" disabled={!dbReady} />
                    Tampil
                  </label>
                </div>
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
          </details>
        </div>
      </section>
    </div>
  );
}
