/** Parse un identifiant numérique de route. Retourne null si invalide. */
export function parseId(raw: string | undefined | null): number | null {
  if (!raw) return null
  const n = Number(raw)
  if (!Number.isInteger(n) || n < 1) return null
  return n
}
