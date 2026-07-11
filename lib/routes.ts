import type { Route } from 'next'

/**
 * Préfixe un chemin public avec la locale.
 * Les chemins passés ici viennent de siteConfig.nav / de constantes internes,
 * d'où le cast vers Route (typedRoutes ne peut pas suivre une string dynamique).
 */
export function localePath(locale: string, href: string): Route {
  return `/${locale}${href === '/' ? '' : href}` as Route
}
