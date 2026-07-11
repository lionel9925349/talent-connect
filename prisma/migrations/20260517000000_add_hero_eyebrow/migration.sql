-- AlterTable (idempotent : ne peut jamais échouer même si la colonne existe déjà)
ALTER TABLE "hero_content" ADD COLUMN IF NOT EXISTS "eyebrow" TEXT;
