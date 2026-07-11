-- Index pour les listings publics (isActive + tri par date)
CREATE INDEX IF NOT EXISTS "job_offers_isActive_createdAt_idx"
  ON "job_offers" ("isActive", "createdAt" DESC);

CREATE INDEX IF NOT EXISTS "training_offers_isActive_createdAt_idx"
  ON "training_offers" ("isActive", "createdAt" DESC);

-- Index pour les listings admin (tri par date, filtre par statut)
CREATE INDEX IF NOT EXISTS "applications_createdAt_idx"
  ON "applications" ("createdAt" DESC);

CREATE INDEX IF NOT EXISTS "applications_status_idx"
  ON "applications" ("status");

CREATE INDEX IF NOT EXISTS "contact_messages_createdAt_idx"
  ON "contact_messages" ("createdAt" DESC);

CREATE INDEX IF NOT EXISTS "contact_messages_status_idx"
  ON "contact_messages" ("status");
