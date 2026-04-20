import { Client } from 'pg'
import 'dotenv/config'

const sql = `
-- Prisma migrations table (pour compatibilité avec prisma migrate)
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
  id                      VARCHAR(36)  PRIMARY KEY NOT NULL,
  checksum                VARCHAR(64)  NOT NULL,
  finished_at             TIMESTAMPTZ,
  migration_name          VARCHAR(255) NOT NULL,
  logs                    TEXT,
  rolled_back_at          TIMESTAMPTZ,
  started_at              TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  applied_steps_count     INTEGER      NOT NULL DEFAULT 0
);

-- hero_content
CREATE TABLE IF NOT EXISTS "hero_content" (
  "id"        SERIAL      PRIMARY KEY,
  "key"       TEXT        NOT NULL UNIQUE,
  "title"     TEXT        NOT NULL,
  "subtitle"  TEXT        NOT NULL,
  "ctaText"   TEXT        NOT NULL,
  "ctaLink"   TEXT        NOT NULL,
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- job_offers
CREATE TABLE IF NOT EXISTS "job_offers" (
  "id"           SERIAL      PRIMARY KEY,
  "title"        TEXT        NOT NULL,
  "company"      TEXT        NOT NULL,
  "location"     TEXT        NOT NULL,
  "contractType" TEXT        NOT NULL,
  "description"  TEXT        NOT NULL,
  "requirements" TEXT        NOT NULL,
  "isActive"     BOOLEAN     NOT NULL DEFAULT TRUE,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- training_offers
CREATE TABLE IF NOT EXISTS "training_offers" (
  "id"          SERIAL      PRIMARY KEY,
  "title"       TEXT        NOT NULL,
  "sector"      TEXT        NOT NULL,
  "duration"    TEXT        NOT NULL,
  "location"    TEXT        NOT NULL,
  "description" TEXT        NOT NULL,
  "conditions"  TEXT        NOT NULL,
  "startDate"   TEXT        NOT NULL,
  "isActive"    BOOLEAN     NOT NULL DEFAULT TRUE,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()
  console.log('📦 Creating tables...')
  await client.query(sql)
  console.log('✅ Tables ready')
  await client.end()
}

main().catch((e) => {
  console.error('❌ Setup failed:', e.message)
  process.exit(1)
})
