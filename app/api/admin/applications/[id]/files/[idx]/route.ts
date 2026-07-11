import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/withAdmin'
import { parseId } from '@/lib/safeId'
import { getObjectStream, getMinio, BUCKET } from '@/lib/minio'

export const runtime = 'nodejs'

/**
 * Stream le fichier via Next (vs redirect 302 vers URL pré-signée).
 * Évite que l'URL signée se retrouve dans l'historique browser, les logs
 * proxy ou les caches. La requête reste protégée par la session admin.
 */
export const GET = withAdmin<{ id: string; idx: string }>(async (_req, { params }) => {
  const { id, idx } = await params
  const appId = parseId(id)
  if (appId === null) return NextResponse.json({ error: 'Bad id' }, { status: 400 })

  const fileIdx = Number(idx)
  if (!Number.isInteger(fileIdx) || fileIdx < 0) {
    return NextResponse.json({ error: 'Bad idx' }, { status: 400 })
  }

  const application = await prisma.application.findUnique({
    where: { id: appId },
    select: { fileKeys: true, fileNames: true },
  })
  if (!application) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const key = application.fileKeys[fileIdx]
  const filename = application.fileNames[fileIdx] ?? 'document'
  if (!key) return NextResponse.json({ error: 'File not found' }, { status: 404 })

  const [stat, stream] = await Promise.all([
    getMinio().statObject(BUCKET, key),
    getObjectStream(key),
  ])

  return new NextResponse(stream as unknown as ReadableStream<Uint8Array>, {
    headers: {
      'Content-Type': stat.metaData['content-type'] ?? 'application/octet-stream',
      'Content-Length': String(stat.size),
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      'Cache-Control': 'private, no-store',
    },
  })
})
