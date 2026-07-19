import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/withAdmin'
import { clearContactEmailCache } from '@/lib/contactEmail'
import { clearSiteInfoCache } from '@/lib/siteInfo'

export const GET = withAdmin(async () => {
  const settings = await prisma.setting.findMany()
  const map: Record<string, string> = {}
  for (const s of settings) map[s.key] = s.value
  return NextResponse.json(map)
})

export const POST = withAdmin(async (request: NextRequest) => {
  const data = (await request.json().catch(() => ({}))) as Record<string, unknown>

  const entries: { key: string; value: string }[] = []
  for (const [key, value] of Object.entries(data)) {
    if (typeof key !== 'string' || key.length === 0 || key.length > 100) continue
    if (typeof value !== 'string' || value.length > 2000) continue
    entries.push({ key, value: value.trim() })
  }

  if (entries.length === 0) {
    return NextResponse.json({ error: 'No valid settings' }, { status: 400 })
  }

  await Promise.all(
    entries.map(({ key, value }) =>
      prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } }),
    ),
  )

  // Invalide les caches dépendants.
  if (entries.some((e) => e.key === 'contact_email')) clearContactEmailCache()
  if (entries.some((e) => e.key !== 'contact_email')) clearSiteInfoCache()

  return NextResponse.json({ success: true })
})
