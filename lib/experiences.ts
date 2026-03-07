import { getDbPool, isDbConfigured } from '@/lib/db';
import { experiencesData } from '@/lib/data';

export type ExperienceItem = {
  id: number;
  date: string;
  title: string;
  company: string;
  location: string;
  description: string;
  techStack: string[];
  icon: string;
  sortOrder: number;
  isVisible: boolean;
};

const DEFAULT_EXPERIENCES: Array<Omit<ExperienceItem, 'id'>> = experiencesData.map((e, idx) => ({
  date: e.date,
  title: e.title,
  company: e.company,
  location: e.location,
  description: e.description,
  techStack: [...e.techStack],
  icon: e.icon,
  sortOrder: (idx + 1) * 10,
  isVisible: true,
}));

async function ensureExperiencesTable() {
  if (!isDbConfigured()) return;
  const pool = getDbPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS experiences (
      id SERIAL PRIMARY KEY,
      date TEXT NOT NULL,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT NOT NULL,
      description TEXT NOT NULL,
      tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
      icon TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_visible BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function seedExperiencesIfEmpty() {
  if (!isDbConfigured()) return;
  const pool = getDbPool();
  const { rows } = await pool.query<{ count: string }>('SELECT COUNT(*)::text as count FROM experiences');
  const count = Number(rows[0]?.count ?? '0');
  if (count > 0) return;

  for (const e of DEFAULT_EXPERIENCES) {
    await pool.query(
      `
        INSERT INTO experiences
          (date, title, company, location, description, tech_stack, icon, sort_order, is_visible)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [e.date, e.title, e.company, e.location, e.description, JSON.stringify(e.techStack), e.icon, e.sortOrder, e.isVisible]
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

function normalizeTechStack(value: unknown) {
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

export async function getExperiences(input?: { includeHidden?: boolean }) {
  const includeHidden = Boolean(input?.includeHidden);

  if (!isDbConfigured()) {
    return DEFAULT_EXPERIENCES.map((e, idx) => ({ id: -(idx + 1), ...e })).filter((e) => includeHidden || e.isVisible);
  }

  try {
    await ensureExperiencesTable();
    await seedExperiencesIfEmpty();

    const pool = getDbPool();
    const { rows } = await pool.query<{
      id: number;
      date: string;
      title: string;
      company: string;
      location: string;
      description: string;
      tech_stack: unknown;
      icon: string;
      sort_order: number;
      is_visible: boolean;
    }>(
      `
        SELECT id, date, title, company, location, description, tech_stack, icon, sort_order, is_visible
        FROM experiences
        ${includeHidden ? '' : 'WHERE is_visible = TRUE'}
        ORDER BY sort_order ASC, id ASC
      `
    );

    return rows.map((r) => ({
      id: r.id,
      date: r.date,
      title: r.title,
      company: r.company,
      location: r.location,
      description: r.description,
      techStack: Array.isArray(r.tech_stack) ? (r.tech_stack as unknown[]).map((v) => String(v)) : [],
      icon: r.icon,
      sortOrder: r.sort_order,
      isVisible: r.is_visible,
    }));
  } catch {
    return DEFAULT_EXPERIENCES.map((e, idx) => ({ id: -(idx + 1), ...e })).filter((e) => includeHidden || e.isVisible);
  }
}

export async function createExperience(input: {
  date: unknown;
  title: unknown;
  company: unknown;
  location: unknown;
  description: unknown;
  techStack: unknown;
  icon: unknown;
  sortOrder: unknown;
  isVisible: unknown;
}) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureExperiencesTable();

  const date = normalizeText(input.date, 'Tanggal', 200);
  const title = normalizeText(input.title, 'Title', 200);
  const company = normalizeText(input.company, 'Company', 200);
  const location = normalizeText(input.location, 'Location', 200);
  const description = normalizeText(input.description, 'Description', 5000);
  const techStack = normalizeTechStack(input.techStack);
  const icon = String(input.icon ?? '').trim().slice(0, 100);
  const sortOrder = normalizeSortOrder(input.sortOrder);
  const isVisible = normalizeIsVisible(input.isVisible);

  const pool = getDbPool();
  await pool.query(
    `
      INSERT INTO experiences
        (date, title, company, location, description, tech_stack, icon, sort_order, is_visible)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
    [date, title, company, location, description, JSON.stringify(techStack), icon, sortOrder, isVisible]
  );
}

export async function updateExperience(input: {
  id: unknown;
  date: unknown;
  title: unknown;
  company: unknown;
  location: unknown;
  description: unknown;
  techStack: unknown;
  icon: unknown;
  sortOrder: unknown;
  isVisible: unknown;
}) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureExperiencesTable();

  const id = Number(String(input.id));
  if (!Number.isFinite(id) || id <= 0) throw new Error('Invalid id');

  const date = normalizeText(input.date, 'Tanggal', 200);
  const title = normalizeText(input.title, 'Title', 200);
  const company = normalizeText(input.company, 'Company', 200);
  const location = normalizeText(input.location, 'Location', 200);
  const description = normalizeText(input.description, 'Description', 5000);
  const techStack = normalizeTechStack(input.techStack);
  const icon = String(input.icon ?? '').trim().slice(0, 100);
  const sortOrder = normalizeSortOrder(input.sortOrder);
  const isVisible = normalizeIsVisible(input.isVisible);

  const pool = getDbPool();
  await pool.query(
    `
      UPDATE experiences
      SET date = $2, title = $3, company = $4, location = $5, description = $6, tech_stack = $7, icon = $8, sort_order = $9, is_visible = $10, updated_at = NOW()
      WHERE id = $1
    `,
    [id, date, title, company, location, description, JSON.stringify(techStack), icon, sortOrder, isVisible]
  );
}

export async function deleteExperience(input: { id: unknown }) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureExperiencesTable();

  const id = Number(String(input.id));
  if (!Number.isFinite(id) || id <= 0) throw new Error('Invalid id');

  const pool = getDbPool();
  await pool.query('DELETE FROM experiences WHERE id = $1', [id]);
}

export async function reorderExperiences(input: { orderedIds: unknown }) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureExperiencesTable();

  if (!Array.isArray(input.orderedIds)) throw new Error('Invalid ordered ids');
  const orderedIds = input.orderedIds.map((v) => Number(v)).filter((v) => Number.isFinite(v));
  if (orderedIds.length === 0) throw new Error('Invalid ordered ids');
  if (orderedIds.some((id) => id <= 0)) throw new Error('Invalid ordered ids');
  const unique = new Set(orderedIds);
  if (unique.size !== orderedIds.length) throw new Error('Invalid ordered ids');

  const pool = getDbPool();
  await pool.query('BEGIN');
  try {
    for (let i = 0; i < orderedIds.length; i++) {
      const id = orderedIds[i]!;
      const sortOrder = i + 1;
      await pool.query('UPDATE experiences SET sort_order = $2, updated_at = NOW() WHERE id = $1', [id, sortOrder]);
    }
    await pool.query('COMMIT');
  } catch (e) {
    await pool.query('ROLLBACK');
    throw e;
  }
}
