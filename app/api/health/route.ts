import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Healthcheck pour Docker/Compose & monitoring externe.
 * Vérifie la connexion DB ; MinIO est vérifié à la demande (lazy
 * `ensureBucket`) donc on n'y touche pas ici pour éviter de réveiller
 * le bucket à chaque ping.
 */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Health check DB failed:', err)
    return NextResponse.json({ ok: false, error: 'db' }, { status: 503 })
  }
}
