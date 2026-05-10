-- CreateTable
CREATE TABLE "page_contents" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_contents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "page_contents_slug_idx" ON "page_contents"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "page_contents_slug_locale_key" ON "page_contents"("slug", "locale");
