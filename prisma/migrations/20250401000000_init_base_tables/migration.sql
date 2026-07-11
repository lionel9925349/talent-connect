-- Migration initiale : tables de base créées historiquement par
-- scripts/setup-db.ts (hors système de migrations). Idempotente
-- (IF NOT EXISTS) pour être sans effet sur les bases existantes.

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
