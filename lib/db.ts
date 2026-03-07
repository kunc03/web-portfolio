import { Pool } from 'pg';

let pool: Pool | null = null;

function getConnectionString() {
  return process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL ?? null;
}

export function isDbConfigured() {
  return Boolean(getConnectionString());
}

export function getDbPool() {
  const connectionString = getConnectionString();
  if (!connectionString) {
    throw new Error('Database connection string is not configured');
  }

  if (!pool) {
    pool = new Pool({ connectionString });
  }

  return pool;
}
