-- CreateTable
CREATE TABLE IF NOT EXISTS "applications" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "jobId" INTEGER,
    "jobTitle" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "fileNames" TEXT[] NOT NULL DEFAULT '{}',
    "status" TEXT NOT NULL DEFAULT 'new',
    "locale" TEXT NOT NULL DEFAULT 'de',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "contact_messages" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "type" TEXT NOT NULL DEFAULT 'sonstiges',
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "locale" TEXT NOT NULL DEFAULT 'de',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);
