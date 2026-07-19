import { siteConfig, telHref } from '@/lib/config'
import { getContactEmail } from '@/lib/contactEmail'
import { getSiteInfo } from '@/lib/siteInfo'

const BASE_URL = siteConfig.url

/** Données structurées schema.org pour l'organisation — référencement local et fiche Google. */
export async function OrganizationJsonLd() {
  const [email, info] = await Promise.all([getContactEmail(), getSiteInfo()])

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: BASE_URL,
    email,
    telephone: telHref(info.phone).replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Wilhelm-Busch-Straße 6',
      postalCode: '52441',
      addressLocality: 'Linnich',
      addressCountry: 'DE',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: telHref(info.mobile).replace('tel:', ''),
        email,
        availableLanguage: ['German', 'French', 'English'],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  )
}
