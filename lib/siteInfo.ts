import { siteConfig } from '@/lib/config'
import { getSettings } from '@/lib/settings'

export interface SiteInfo {
  contactPerson: string
  phone: string
  mobile: string
  address: string
  social: { linkedin: string; facebook: string; instagram: string }
}

/** Coordonnées affichées publiquement (paramétrables en admin, sinon valeurs par défaut de siteConfig). */
export async function getSiteInfo(): Promise<SiteInfo> {
  const map = await getSettings()

  return {
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
}
