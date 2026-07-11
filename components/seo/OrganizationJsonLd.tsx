import { siteConfig, telHref } from '@/lib/config'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mf-talent-connect.de'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: BASE_URL,
  email: siteConfig.email,
  telephone: telHref(siteConfig.phone).replace('tel:', ''),
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
      telephone: telHref(siteConfig.mobile).replace('tel:', ''),
      email: siteConfig.email,
      availableLanguage: ['German', 'French', 'English'],
    },
  ],
}

/** Données structurées schema.org pour l'organisation — référencement local et fiche Google. */
export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  )
}
