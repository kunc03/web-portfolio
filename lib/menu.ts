import { getDbPool, isDbConfigured } from '@/lib/db';

export type MenuItem = {
  id: number;
  name: string;
  href: string;
  sortOrder: number;
  isVisible: boolean;
};

const DEFAULT_MENU: Array<Pick<MenuItem, 'name' | 'href' | 'sortOrder' | 'isVisible'>> = [
  { name: 'Home', href: '#home', sortOrder: 10, isVisible: true },
  { name: 'About', href: '#about', sortOrder: 20, isVisible: true },
  { name: 'Projects', href: '#projects', sortOrder: 30, isVisible: true },
  { name: 'Skills', href: '#skills', sortOrder: 40, isVisible: true },
  { name: 'Experiences', href: '#experiences', sortOrder: 50, isVisible: true },
  { name: 'Contact', href: '#contact', sortOrder: 60, isVisible: true },
];

async function ensureMenuTable() {
  if (!isDbConfigured()) return;
  const pool = getDbPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      href TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_visible BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function seedMenuIfEmpty() {
  if (!isDbConfigured()) return;
  const pool = getDbPool();

  const { rows } = await pool.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM menu_items;');
  const count = Number(rows[0]?.count ?? 0);
  if (count > 0) return;

  await pool.query(
    `
      INSERT INTO menu_items (name, href, sort_order, is_visible)
      VALUES ${DEFAULT_MENU.map((_, idx) => `($${idx * 4 + 1}, $${idx * 4 + 2}, $${idx * 4 + 3}, $${idx * 4 + 4})`).join(',')}
    `,
    DEFAULT_MENU.flatMap((m) => [m.name, m.href, m.sortOrder, m.isVisible])
  );
}

function normalizeName(value: unknown) {
  if (typeof value !== 'string') throw new Error('Invalid name');
  const name = value.trim();
  if (!name) throw new Error('Invalid name');
  if (name.length > 64) throw new Error('Name too long');
  return name;
}

function normalizeHref(value: unknown) {
  if (typeof value !== 'string') throw new Error('Invalid href');
  const href = value.trim();
  if (!href) throw new Error('Invalid href');
  if (href.length > 200) throw new Error('Href too long');
  if (!(href.startsWith('#') || href.startsWith('/'))) throw new Error('Href must start with # or /');
  return href;
}

function normalizeSortOrder(value: unknown) {
  const sortOrder = typeof value === 'number' ? value : Number(String(value));
  if (!Number.isFinite(sortOrder)) throw new Error('Invalid sort order');
  return Math.trunc(sortOrder);
}

function normalizeIsVisible(value: unknown) {
  if (typeof value === 'boolean') return value;
  if (value === 'on') return true;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return false;
}

export function getDefaultMenu() {
  return DEFAULT_MENU.map((m, idx) => ({
    id: -(idx + 1),
    name: m.name,
    href: m.href,
    sortOrder: m.sortOrder,
    isVisible: m.isVisible,
  })) satisfies MenuItem[];
}

export async function getMenuItems(options?: { includeHidden?: boolean }) {
  const includeHidden = options?.includeHidden ?? false;

  if (!isDbConfigured()) {
    return getDefaultMenu().filter((m) => includeHidden || m.isVisible).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  await ensureMenuTable();
  await seedMenuIfEmpty();

  const pool = getDbPool();
  const { rows } = await pool.query<{
    id: number;
    name: string;
    href: string;
    sort_order: number;
    is_visible: boolean;
  }>(
    `
      SELECT id, name, href, sort_order, is_visible
      FROM menu_items
      ${includeHidden ? '' : 'WHERE is_visible = TRUE'}
      ORDER BY sort_order ASC, id ASC
    `
  );

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    href: r.href,
    sortOrder: r.sort_order,
    isVisible: r.is_visible,
  })) satisfies MenuItem[];
}

export async function createMenuItem(input: { name: unknown; href: unknown; sortOrder?: unknown; isVisible?: unknown }) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureMenuTable();

  const name = normalizeName(input.name);
  const href = normalizeHref(input.href);
  const sortOrder = normalizeSortOrder(input.sortOrder ?? 0);
  const isVisible = normalizeIsVisible(input.isVisible ?? true);

  const pool = getDbPool();
  const { rows } = await pool.query<{ id: number }>(
    `
      INSERT INTO menu_items (name, href, sort_order, is_visible, updated_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id
    `,
    [name, href, sortOrder, isVisible]
  );

  return rows[0]?.id ?? null;
}

export async function updateMenuItem(input: { id: unknown; name: unknown; href: unknown; sortOrder: unknown; isVisible: unknown }) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureMenuTable();

  const id = Number(String(input.id));
  if (!Number.isFinite(id) || id <= 0) throw new Error('Invalid id');

  const name = normalizeName(input.name);
  const href = normalizeHref(input.href);
  const sortOrder = normalizeSortOrder(input.sortOrder);
  const isVisible = normalizeIsVisible(input.isVisible);

  const pool = getDbPool();
  await pool.query(
    `
      UPDATE menu_items
      SET name = $2, href = $3, sort_order = $4, is_visible = $5, updated_at = NOW()
      WHERE id = $1
    `,
    [id, name, href, sortOrder, isVisible]
  );
}

export async function deleteMenuItem(input: { id: unknown }) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureMenuTable();

  const id = Number(String(input.id));
  if (!Number.isFinite(id) || id <= 0) throw new Error('Invalid id');

  const pool = getDbPool();
  await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);
}
