import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/withAdmin'
import { parseId } from '@/lib/safeId'
import { applicationStatusPatchSchema, parseJson } from '@/lib/schemas'
import { deleteApplicationFiles } from '@/lib/minio'

function badId() {
  return NextResponse.json({ error: 'Bad id' }, { status: 400 })
}

export const PATCH = withAdmin<{ id: string }>(async (request, { params }) => {
  const { id } = await params
  const appId = parseId(id)
  if (appId === null) return badId()

  const parsed = await parseJson(request, applicationStatusPatchSchema)
  if (!parsed.ok) return parsed.response

  const app = await prisma.application.update({ where: { id: appId }, data: parsed.data })
  return NextResponse.json(app)
})

export const DELETE = withAdmin<{ id: string }>(async (_req, { params }) => {
  const { id } = await params
  const appId = parseId(id)
  if (appId === null) return badId()

  // Récupère les clés AVANT la suppression DB, puis nettoie MinIO (best-effort).
  const existing = await prisma.application.findUnique({
    where: { id: appId },
    select: { fileKeys: true },
  })
  await prisma.application.delete({ where: { id: appId } })
  if (existing?.fileKeys.length) {
    await deleteApplicationFiles(existing.fileKeys)
  }
  return NextResponse.json({ success: true })
})
