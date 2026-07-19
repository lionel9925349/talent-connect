import { prisma } from '@/lib/prisma'

/**
 * Réglages admin (table `settings`) — une seule requête pour toutes les clés,
 * partagée par tous les consommateurs (contactEmail, siteInfo, …).
 *
 * On met la *promesse* en cache (pas seulement le résultat) : les appels
 * concurrents pendant le TTL partagent la même requête au lieu de chacun
 * interroger la base.
 */
const CACHE_TTL_MS = 60_000
let cached: { promise: Promise<Record<string, string>>; exp: number } | null = null

async function fetchSettings(): Promise<Record<string, string>> {
  const map: Record<string, string> = {}
  try {
    const rows = await prisma.setting.findMany()
    for (const row of rows) map[row.key] = row.value
  } catch (err) {
    console.error('getSettings lookup failed:', err)
  }
  return map
}

export function getSettings(): Promise<Record<string, string>> {
  const now = Date.now()
  if (cached && now < cached.exp) return cached.promise
  const promise = fetchSettings()
  cached = { promise, exp: now + CACHE_TTL_MS }
  return promise
}

/** Vide le cache (à appeler après update des settings). */
export function clearSettingsCache(): void {
  cached = null
}
