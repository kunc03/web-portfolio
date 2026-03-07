import { getDbPool, isDbConfigured } from '@/lib/db';

export type AboutContent = {
  paragraphs: string[];
};

const DEFAULT_ABOUT: AboutContent = {
  paragraphs: [
    "I'm a Frontend Web Developer with over a year of professional experience, starting as an intern and growing into a full-time role. My daily work involves building interactive, responsive, and accessible web applications that prioritize user experience.",
    "My journey into tech began after I graduated with a Bachelor's degree in Fisheries from Pekalongan University. While my academic background isn't in computer science, my passion for problem-solving and continuous learning led me to explore programming - particularly frontend development. Since then, I've been committed to sharpening my skills in modern web technologies.",
    "During my time at university, I participated in a leadership-focused student organization and served as a teaching assistant for two semesters. These experiences played a key role in building the discipline, teamwork, and communication skills I carry into my professional career today.",
    "Whether it's collaborating with a team or working independently, I thrive on turning ideas into functional and aesthetic digital experiences.",
  ],
};

async function ensureAboutTable() {
  if (!isDbConfigured()) return;
  const pool = getDbPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS about_content (
      content_key TEXT PRIMARY KEY,
      paragraphs JSONB NOT NULL DEFAULT '[]'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function seedAboutIfEmpty() {
  if (!isDbConfigured()) return;
  const pool = getDbPool();
  await pool.query(
    `
      INSERT INTO about_content (content_key, paragraphs, updated_at)
      VALUES ('about', $1::jsonb, NOW())
      ON CONFLICT (content_key) DO NOTHING
    `,
    [JSON.stringify(DEFAULT_ABOUT.paragraphs)]
  );
}

function normalizeParagraphs(value: unknown) {
  if (Array.isArray(value)) {
    const items = value.map((v) => String(v ?? '').trim()).filter(Boolean);
    return Array.from(new Set(items)).slice(0, 50);
  }

  const raw = String(value ?? '').replace(/\r\n/g, '\n').trim();
  if (!raw) return [];
  const parts = raw
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.slice(0, 50);
}

export async function getAbout() {
  if (!isDbConfigured()) return DEFAULT_ABOUT;

  try {
    await ensureAboutTable();
    await seedAboutIfEmpty();

    const pool = getDbPool();
    const { rows } = await pool.query<{ paragraphs: unknown }>(
      `
        SELECT paragraphs
        FROM about_content
        WHERE content_key = 'about'
        LIMIT 1
      `
    );

    const paragraphs = Array.isArray(rows[0]?.paragraphs) ? (rows[0]!.paragraphs as unknown[]).map((v) => String(v ?? '').trim()).filter(Boolean) : [];
    return { paragraphs: paragraphs.length ? paragraphs : DEFAULT_ABOUT.paragraphs };
  } catch {
    return DEFAULT_ABOUT;
  }
}

export async function updateAbout(input: { paragraphs: unknown }) {
  if (!isDbConfigured()) throw new Error('Database is not configured');
  await ensureAboutTable();

  const paragraphs = normalizeParagraphs(input.paragraphs);
  if (paragraphs.length === 0) throw new Error('About wajib diisi');

  const pool = getDbPool();
  await pool.query(
    `
      INSERT INTO about_content (content_key, paragraphs, updated_at)
      VALUES ('about', $1::jsonb, NOW())
      ON CONFLICT (content_key)
      DO UPDATE SET paragraphs = EXCLUDED.paragraphs, updated_at = NOW()
    `,
    [JSON.stringify(paragraphs)]
  );
}

