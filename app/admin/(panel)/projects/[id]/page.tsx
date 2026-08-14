import { isDbConfigured } from '@/lib/db';
import { isExternalImageUrl } from '@/lib/project-images';
import { getProjects } from '@/lib/projects';
import ImageUploadInput from '@/components/image-upload-input';
import ImageKeySelect from '@/components/image-key-select';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminProjectDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const dbReady = isDbConfigured();
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) redirect('/admin/projects');

  const projects = await getProjects({ includeHidden: true });
  const sortedProjects = [...projects].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
  const project = sortedProjects.find((p) => p.id === id) ?? null;
  if (!project) redirect('/admin/projects');

  const disabled = !dbReady || project.id <= 0;
  const orderNumber = sortedProjects.findIndex((p) => p.id === project.id) + 1;

  const currentImageSrc = isExternalImageUrl(project.imageKey)
    ? project.imageKey
    : `/${
        project.imageKey === 'aichiGurutto'
          ? 'aichi-gurutto'
          : project.imageKey === 'gachaRogaining'
          ? 'rogaining'
          : project.imageKey === 'gachaEndoji'
          ? 'gacha-endoji'
          : project.imageKey === 'kopiq'
          ? 'kopiQ'
          : project.imageKey
      }.png`;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Project Detail</h1>
          <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Edit detail project yang dipilih.</p>
        </div>
        <Link
          href="/admin/projects"
          className="h-10 inline-flex items-center px-4 rounded-lg bg-white dark:bg-white/10 ring-1 ring-inset ring-black/10 dark:ring-white/10 text-sm font-medium text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/15"
        >
          Kembali
        </Link>
      </div>

      <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/10 bg-gray-50/70 dark:bg-white/5 p-4">
            <form action="/api/admin/projects/update" method="post" encType="multipart/form-data" className="grid grid-cols-1 gap-4">
              <input type="hidden" name="id" value={project.id} />
              <input type="hidden" name="sortOrder" value={orderNumber} />

              {/* Row 1: Title + URL */}
              <div className="flex flex-wrap gap-3">
                <input
                  name="title"
                  defaultValue={project.title}
                  placeholder="Title"
                  className="h-10 w-[22rem] max-w-full px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                  required
                  disabled={disabled}
                />
                <input
                  name="linkUrl"
                  defaultValue={project.linkUrl}
                  placeholder="https://..."
                  className="h-10 flex-1 min-w-[16rem] px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                  required
                  disabled={disabled}
                />
              </div>

              {/* Row 2: Gambar (thumbnail + upload + preset) */}
              <div className="flex flex-wrap gap-4 items-start">
                {/* Thumbnail saat ini */}
                <div className="flex flex-col gap-1.5 shrink-0">
                  <span className="text-xs font-medium text-gray-600 dark:text-white/60">Gambar saat ini</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentImageSrc}
                    alt={project.title}
                    className="h-20 w-28 object-cover rounded-lg ring-1 ring-black/10 dark:ring-white/10"
                  />
                </div>

                <div className="flex flex-col gap-3 flex-1 min-w-[16rem]">
                  {/* Upload baru */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-gray-600 dark:text-white/60">Upload gambar baru (opsional, maks 5 MB)</span>
                    <ImageUploadInput inputId="edit-image-file" previewId="edit-img-preview" disabled={disabled} />
                  </div>

                  {/* Preset select */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-gray-600 dark:text-white/60">Atau pilih gambar preset</span>
                    <ImageKeySelect defaultValue={project.imageKey} disabled={disabled} />
                  </div>
                </div>
              </div>

              {/* Row 3: Description */}
              <textarea
                name="description"
                defaultValue={project.description}
                placeholder="Deskripsi"
                className="min-h-[8rem] w-full px-3 py-2 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                required
                disabled={disabled}
              />

              {/* Row 4: Tags */}
              <input
                name="tags"
                defaultValue={project.tags.join(', ')}
                className="h-10 w-full px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                placeholder="Nuxt.js, Tailwind CSS, ..."
                disabled={disabled}
              />

              {/* Row 5: Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-10 min-w-[3rem] items-center justify-center rounded-lg bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 text-sm font-semibold text-gray-800 dark:text-white/80 px-3">
                  #{orderNumber}
                </span>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-white/80">
                  <input name="isVisible" type="checkbox" defaultChecked={project.isVisible} className="h-4 w-4 accent-gray-900 dark:accent-white" disabled={disabled} />
                  Tampil
                </label>
                <div className="flex gap-2 ml-auto">
                  <button
                    type="submit"
                    disabled={disabled}
                    className="h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-950 disabled:opacity-50 disabled:hover:bg-gray-900"
                  >
                    Simpan
                  </button>
                  <button
                    type="submit"
                    formAction="/api/admin/projects/delete"
                    formMethod="post"
                    disabled={disabled}
                    className="h-10 px-4 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
