import { prisma } from '@/lib/prisma'

/** Adresse de réception (paramétrable en admin, sinon variable d'env). */
const CACHE_TTL_MS = 60_000
let cached: { value: string; exp: number } | null = null

export async function getContactEmail(): Promise<string> {
  const now = Date.now()
  if (cached && now < cached.exp) return cached.value

  let value: string | null = null
  try {
    const setting = await prisma.setting.findUnique({ where: { key: 'contact_email' } })
    if (setting?.value) value = setting.value
  } catch (err) {
    console.error('getContactEmail setting lookup failed:', err)
  }

  const resolved = value ?? process.env.ADMIN_EMAIL ?? 'contact@mf-talent-connect.de'
  cached = { value: resolved, exp: now + CACHE_TTL_MS }
  return resolved
}

/** Vide le cache (à appeler après update de la setting). */
export function clearContactEmailCache(): void {
  cached = null
}
