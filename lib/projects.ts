import { getDbPool, isDbConfigured } from '@/lib/db';
import { PROJECT_IMAGE_KEYS, resolveProjectImage } from '@/lib/project-images';
import type { StaticImageData } from 'next/image';

export type ProjectItem = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageKey: string;
  imageUrl: StaticImageData;
  linkUrl: string;
  sortOrder: number;
  isVisible: boolean;
};

type StoredProject = Omit<ProjectItem, 'imageUrl'>;

const DEFAULT_PROJECTS: Array<Omit<StoredProject, 'id'>> = [
  {
    title: 'Aichi Gurutto',
    description: 'An interactive gacha web app, allowing users to earn points and unlock characters for voucher rewards.',
    tags: ['Nuxt.js', 'Tailwind CSS', 'Pinia', 'Service Workers', 'PrimeVue', 'Swiper'],
    imageKey: 'aichiGurutto',
    linkUrl: 'https://aichi-gurutto.dela-kuji.jp/',
    sortOrder: 10,
    isVisible: true,
  },
  {
    title: 'Rogaining Endoji',
    description: 'A custom gacha app, combining exploration with point-based rewards and collectible characters.',
    tags: ['Nuxt.js', 'Tailwind CSS', 'Pinia', 'Service Workers', 'PrimeVue', 'Swiper'],
    imageKey: 'gachaRogaining',
    linkUrl: 'https://rogaining-endoji.dela-kuji.jp/',
    sortOrder: 20,
    isVisible: true,
  },
  {
    title: 'Endoji Shotengai',
    description: 'A gacha-based web app, where users engage with the area to collect characters and redeem prizes.',
    tags: ['Nuxt.js', 'Tailwind CSS', 'Pinia', 'Service Workers', 'PrimeVue', 'Swiper'],
    imageKey: 'gachaEndoji',
    linkUrl: 'https://endo-ji-shotengai.dela-kuji.jp/',
    sortOrder: 30,
    isVisible: true,
  },
  {
    title: 'SIMRIS Infovesta',
    description: 'A web to manage and display data with tables and charts, making it easier to view and organize investment data.',
    tags: ['Nuxt.js', 'Tailwind CSS', 'Pinia', 'html2canvas', 'jspdf', 'PrimeVue', 'chart.js', 'date-fns'],
    imageKey: 'manrisk',
    linkUrl: 'https://manrisk-test.vercel.app/',
    sortOrder: 40,
    isVisible: true,
  },
  {
    title: 'Diamond Clinic',
    description: 'A web that showcases various skincare and beauty treatments with images.',
    tags: ['Nuxt.js', 'Tailwind CSS', 'Pinia', 'Service Workers', 'PrimeVue'],
    imageKey: 'dclinic',
    linkUrl: 'https://clinic-test-v1.vercel.app/',
    sortOrder: 50,
    isVisible: true,
  },
  {
    title: 'JPrefund',
    description: 'A web that allows international tourists shopping in Japan to easily claim tax refunds by submitting purchase details online.',
    tags: ['Next.js', 'Tailwind CSS', 'Zod', 'Zustand', 'Framer Motion', 'GSAP', '@zxing/browser'],
    imageKey: 'jprefund',
    linkUrl: 'https://jprefund-test.vercel.app/',
    sortOrder: 60,
    isVisible: true,
  },
  {
    title: 'Kunc Store',
    description: 'An online shop website that showcases products, authentication, search, product details, and payment. Additionally, I will add an admin dashboard.',
    tags: ['Next.Js', 'Tailwind CSS'],
    imageKey: 'store',
    linkUrl: 'https://kunc-store.vercel.app/',
    sortOrder: 70,
    isVisible: true,
  },
  {
    title: 'OLShop',
    description: 'The website for this online store showcases product details, alongside user-friendly cart, signIn and signOut functionalities and payment features seamlessly directing users to WhatsApp.',
    tags: ['Next.Js', 'Tailwind CSS'],
    imageKey: 'shopper',
    linkUrl: 'https://olshop.vercel.app/',
    sortOrder: 80,
    isVisible: true,
  },
  {
    title: 'Rent Car',
    description: 'Showcases comprehensive car details, spanning from vehicle type, model, and year onwards. Leveraging an open-source API, it epitomizes innovation and accessibility in the automotive realm',
    tags: ['Next.Js', 'Tailwind css'],
    imageKey: 'rentCar',
    linkUrl: 'https://car-showcase-eight-hazel.vercel.app/',
    sortOrder: 90,
    isVisible: true,
  },
  {
    title: 'Kedai KopiQ',
    description: 'This project is my first website when I was learning the basics of web programming.',
    tags: ['HTML', 'CSS', 'Javascript'],
    imageKey: 'kopiq',
    linkUrl: 'https://kopiq.vercel.app/',
    sortOrder: 100,
    isVisible: true,
  },
];

async function ensureProjectsTable() {
  if (!isDbConfigured()) return;
  const pool = getDbPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      tags JSONB NOT NULL DEFAULT '[]'::jsonb,
      image_key TEXT NOT NULL DEFAULT 'kopiq',
      link_url TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_visible BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function seedProjectsIfEmpty() {
  if (!isDbConfigured()) return;
  const pool = getDbPool();
  const { rows } = await pool.query<{ count: string }>('SELECT COUNT(*)::text as count FROM projects');
  const count = Number(rows[0]?.count ?? '0');
  if (count > 0) return;

  for (const p of DEFAULT_PROJECTS) {
    await pool.query(
      `
        INSERT INTO projects
          (title, description, tags, image_key, link_url, sort_order, is_visible)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7)
      `,
      [p.title, p.description, JSON.stringify(p.tags), p.imageKey, p.linkUrl, p.sortOrder, p.isVisible]
    );
  }
}

function normalizeText(value: unknown, label: string, maxLen = 5000) {
  const s = String(value ?? '').trim();
  if (!s) throw new Error(`${label} wajib diisi`);
  if (s.length > maxLen) throw new Error(`${label} terlalu panjang`);
  return s;
}

function normalizeSortOrder(value: unknown) {
  const n = Number(String(value ?? '0'));
  if (!Number.isFinite(n)) throw new Error('Sort order tidak valid');
  return Math.trunc(n);
}

function normalizeIsVisible(value: unknown) {
  if (typeof value === 'boolean') return value;
  if (value === 'on') return true;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return Boolean(value);
}

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) {
    const items = value.map((v) => String(v ?? '').trim()).filter(Boolean);
    return Array.from(new Set(items)).slice(0, 50);
  }
  const s = String(value ?? '').trim();
  if (!s) return [];
  const items = s
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
  return Array.from(new Set(items)).slice(0, 50);
}

function normalizeImageKey(value: unknown) {
  const key = String(value ?? '').trim();
  if ((PROJECT_IMAGE_KEYS as readonly string[]).includes(key)) return key;
  return 'kopiq';
}

export async function getProjects(input?: { includeHidden?: boolean }) {
  const includeHidden = Boolean(input?.includeHidden);

  if (!isDbConfigured()) {
    return DEFAULT_PROJECTS.map((p, idx) => ({ id: -(idx + 1), ...p, imageUrl: resolveProjectImage(p.imageKey) })).filter((p) => includeHidden || p.isVisible);
  }

  await ensureProjectsTable();
  await seedProjectsIfEmpty();

  const pool = getDbPool();
  const { rows } = await pool.query<{
    id: number;
    title: string;
    description: string;
    tags: unknown;
    image_key: string;
    link_url: string;
    sort_order: number;
    is_visible: boolean;
  }>(
    `
      SELECT id, title, description, tags, image_key, link_url, sort_order, is_visible
      FROM projects
      ${includeHidden ? '' : 'WHERE is_visible = TRUE'}
      ORDER BY sort_order ASC, id ASC
    `
  );

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    tags: Array.isArray(r.tags) ? (r.tags as unknown[]).map((v) => String(v)) : [],
    imageKey: r.image_key,
    imageUrl: resolveProjectImage(r.image_key),
    linkUrl: r.link_url,
    sortOrder: r.sort_order,
    isVisible: r.is_visible,
  }));
}

export async function createProject(input: {
  title: unknown;
  description: unknown;
  tags: unknown;
  imageKey: unknown;
  linkUrl: unknown;
  sortOrder: unknown;
  isVisible: unknown;
}) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureProjectsTable();

  const title = normalizeText(input.title, 'Title', 200);
  const description = normalizeText(input.description, 'Description', 5000);
  const tags = normalizeTags(input.tags);
  const imageKey = normalizeImageKey(input.imageKey);
  const linkUrl = normalizeText(input.linkUrl, 'Link', 500);
  const sortOrder = normalizeSortOrder(input.sortOrder);
  const isVisible = normalizeIsVisible(input.isVisible);

  const pool = getDbPool();
  await pool.query(
    `
      INSERT INTO projects
        (title, description, tags, image_key, link_url, sort_order, is_visible)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
    `,
    [title, description, JSON.stringify(tags), imageKey, linkUrl, sortOrder, isVisible]
  );
}

export async function updateProject(input: {
  id: unknown;
  title: unknown;
  description: unknown;
  tags: unknown;
  imageKey: unknown;
  linkUrl: unknown;
  sortOrder: unknown;
  isVisible: unknown;
}) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureProjectsTable();

  const id = Number(String(input.id));
  if (!Number.isFinite(id) || id <= 0) throw new Error('Invalid id');

  const title = normalizeText(input.title, 'Title', 200);
  const description = normalizeText(input.description, 'Description', 5000);
  const tags = normalizeTags(input.tags);
  const imageKey = normalizeImageKey(input.imageKey);
  const linkUrl = normalizeText(input.linkUrl, 'Link', 500);
  const sortOrder = normalizeSortOrder(input.sortOrder);
  const isVisible = normalizeIsVisible(input.isVisible);

  const pool = getDbPool();
  await pool.query(
    `
      UPDATE projects
      SET title = $2, description = $3, tags = $4, image_key = $5, link_url = $6, sort_order = $7, is_visible = $8, updated_at = NOW()
      WHERE id = $1
    `,
    [id, title, description, JSON.stringify(tags), imageKey, linkUrl, sortOrder, isVisible]
  );
}

export async function deleteProject(input: { id: unknown }) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureProjectsTable();

  const id = Number(String(input.id));
  if (!Number.isFinite(id) || id <= 0) throw new Error('Invalid id');

  const pool = getDbPool();
  await pool.query('DELETE FROM projects WHERE id = $1', [id]);
}

