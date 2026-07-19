import { prisma } from '@/lib/prisma'
import { siteConfig } from '@/lib/config'

export interface SiteInfo {
  contactPerson: string
  phone: string
  mobile: string
  address: string
  social: { linkedin: string; facebook: string; instagram: string }
}

/** Coordonnées affichées publiquement (paramétrables en admin, sinon valeurs par défaut de siteConfig). */
const CACHE_TTL_MS = 60_000
let cached: { value: SiteInfo; exp: number } | null = null

export async function getSiteInfo(): Promise<SiteInfo> {
  const now = Date.now()
  if (cached && now < cached.exp) return cached.value

  const map: Record<string, string> = {}
  try {
    const settings = await prisma.setting.findMany({
      where: {
        key: { in: ['contact_person', 'phone', 'mobile', 'address', 'social_linkedin', 'social_facebook', 'social_instagram'] },
      },
    })
    for (const s of settings) map[s.key] = s.value
  } catch (err) {
    console.error('getSiteInfo settings lookup failed:', err)
  }

  const resolved: SiteInfo = {
    contactPerson: map.contact_person || siteConfig.contactPerson,
    phone: map.phone || siteConfig.phone,
    mobile: map.mobile || siteConfig.mobile,
    address: map.address || siteConfig.address,
    social: {
      linkedin: map.social_linkedin || siteConfig.social.linkedin,
      facebook: map.social_facebook || siteConfig.social.facebook,
      instagram: map.social_instagram || siteConfig.social.instagram,
    },
  }
  cached = { value: resolved, exp: now + CACHE_TTL_MS }
  return resolved
}

/** Vide le cache (à appeler après update des settings). */
export function clearSiteInfoCache(): void {
  cached = null
}
