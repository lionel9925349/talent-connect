-- Clés d'objets MinIO en parallèle des noms de fichiers d'origine.
-- fileNames[i] = nom affiché, fileKeys[i] = clé S3/MinIO correspondante.
ALTER TABLE "applications"
  ADD COLUMN "fileKeys" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
