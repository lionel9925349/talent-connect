import { telHref } from '@/lib/config'
import type { SiteInfo } from '@/lib/siteInfo'

export type ContactEntryKind = 'person' | 'email' | 'phone' | 'mobile' | 'address'

export interface ContactEntry {
  kind: ContactEntryKind
  value: string
  href?: string
}

/**
 * Liste ordonnée des coordonnées affichées publiquement.
 * Footer et page Kontakt consomment la même source — chacun garde son propre
 * rendu (icônes, libellés), mais les données ne peuvent plus diverger.
 */
export function buildContactEntries(info: SiteInfo, contactEmail: string): ContactEntry[] {
  return [
    { kind: 'person', value: info.contactPerson },
    { kind: 'email', value: contactEmail, href: `mailto:${contactEmail}` },
    { kind: 'phone', value: info.phone, href: telHref(info.phone) },
    { kind: 'mobile', value: info.mobile, href: telHref(info.mobile) },
    { kind: 'address', value: info.address },
  ]
}
