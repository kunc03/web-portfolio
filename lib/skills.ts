import { getDbPool, isDbConfigured } from '@/lib/db';
import { skillsData } from '@/lib/data';

export type SkillItem = {
  id: number;
  name: string;
  sortOrder: number;
  isVisible: boolean;
};

const DEFAULT_SKILLS: Array<Pick<SkillItem, 'name' | 'sortOrder' | 'isVisible'>> = skillsData.map((name, idx) => ({
  name,
  sortOrder: (idx + 1) * 10,
  isVisible: true,
}));

async function ensureSkillsTable() {
  if (!isDbConfigured()) return;
  const pool = getDbPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_visible BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function seedSkillsIfEmpty() {
  if (!isDbConfigured()) return;
  const pool = getDbPool();
  const { rows } = await pool.query<{ count: string }>('SELECT COUNT(*)::text as count FROM skills');
  const count = Number(rows[0]?.count ?? '0');
  if (count > 0) return;

  for (const s of DEFAULT_SKILLS) {
    await pool.query('INSERT INTO skills (name, sort_order, is_visible) VALUES ($1, $2, $3)', [s.name, s.sortOrder, s.isVisible]);
  }
}

function normalizeName(value: unknown) {
  const name = String(value ?? '').trim();
  if (!name) throw new Error('Nama skill wajib diisi');
  if (name.length > 100) throw new Error('Nama skill terlalu panjang');
  return name;
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

export async function getSkills(input?: { includeHidden?: boolean }) {
  const includeHidden = Boolean(input?.includeHidden);

  if (!isDbConfigured()) {
    return DEFAULT_SKILLS.map((s, idx) => ({ id: -(idx + 1), ...s })).filter((s) => includeHidden || s.isVisible);
  }

  try {
    await ensureSkillsTable();
    await seedSkillsIfEmpty();

    const pool = getDbPool();
    const { rows } = await pool.query<{
      id: number;
      name: string;
      sort_order: number;
      is_visible: boolean;
    }>(
      `
        SELECT id, name, sort_order, is_visible
        FROM skills
        ${includeHidden ? '' : 'WHERE is_visible = TRUE'}
        ORDER BY sort_order ASC, id ASC
      `
    );

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      sortOrder: r.sort_order,
      isVisible: r.is_visible,
    }));
  } catch {
    return DEFAULT_SKILLS.map((s, idx) => ({ id: -(idx + 1), ...s })).filter((s) => includeHidden || s.isVisible);
  }
}

export async function createSkill(input: { name: unknown; sortOrder: unknown; isVisible: unknown }) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureSkillsTable();

  const name = normalizeName(input.name);
  const sortOrder = normalizeSortOrder(input.sortOrder);
  const isVisible = normalizeIsVisible(input.isVisible);

  const pool = getDbPool();
  await pool.query('INSERT INTO skills (name, sort_order, is_visible) VALUES ($1, $2, $3)', [name, sortOrder, isVisible]);
}

export async function updateSkill(input: { id: unknown; name: unknown; sortOrder: unknown; isVisible: unknown }) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureSkillsTable();

  const id = Number(String(input.id));
  if (!Number.isFinite(id) || id <= 0) throw new Error('Invalid id');

  const name = normalizeName(input.name);
  const sortOrder = normalizeSortOrder(input.sortOrder);
  const isVisible = normalizeIsVisible(input.isVisible);

  const pool = getDbPool();
  await pool.query(
    `
      UPDATE skills
      SET name = $2, sort_order = $3, is_visible = $4, updated_at = NOW()
      WHERE id = $1
    `,
    [id, name, sortOrder, isVisible]
  );
}

export async function deleteSkill(input: { id: unknown }) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureSkillsTable();

  const id = Number(String(input.id));
  if (!Number.isFinite(id) || id <= 0) throw new Error('Invalid id');

  const pool = getDbPool();
  await pool.query('DELETE FROM skills WHERE id = $1', [id]);
}
