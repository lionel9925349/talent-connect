/**
 * Rate limiter en mémoire (par instance).
 *
 * ⚠️ Non distribué : pour un déploiement multi-instances, remplacer par
 * Redis / Upstash. Suffisant pour un déploiement single-node Docker.
 *
 * Le `Map` était précédemment growth-only ; on évince désormais les
 * entrées expirées pour éviter la fuite mémoire à long terme.
 */

interface Entry {
  count: number
  reset: number
}

const store = new Map<string, Entry>()
const MAX_ENTRIES = 10_000
const SWEEP_INTERVAL_MS = 60_000
let lastSweep = 0

function sweep(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return
  lastSweep = now
  for (const [key, entry] of store) {
    if (entry.reset <= now) store.delete(key)
  }
  if (store.size > MAX_ENTRIES) store.clear()
}

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  sweep(now)

  const entry = store.get(key)
  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}
