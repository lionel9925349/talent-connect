/**
 * Vérifie qu'une requête mutante provient d'une origine autorisée.
 * Mitigation CSRF pour les endpoints publics qui n'utilisent pas de cookie
 * de session (donc non protégés par SameSite).
 *
 * Politique : on accepte les requêtes sans Origin/Referer (par exemple
 * `curl` ou un client mobile) UNIQUEMENT en dev. En prod on exige Origin
 * présent et égal à NEXT_PUBLIC_SITE_URL.
 */

function allowedOrigins(): string[] {
  const site = process.env.NEXT_PUBLIC_SITE_URL
  return site ? [site.replace(/\/$/, '')] : []
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  const allowed = allowedOrigins()

  if (process.env.NODE_ENV !== 'production') {
    // En dev on tolère localhost et l'absence d'Origin (Postman, etc.)
    if (!origin) return true
    if (allowed.length === 0) return true
    return allowed.includes(origin)
  }

  // En prod : Origin obligatoire et dans l'allowlist.
  if (!origin) return false
  return allowed.includes(origin)
}
