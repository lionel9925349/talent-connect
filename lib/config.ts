/** Convertit un numéro affiché (« +49 (0) 2462 9011492 ») en href tel: valide. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/\(0\)/g, '').replace(/[^+\d]/g, '')}`
}

// NB : ce module est importé par des composants client (Navbar) — ne mettre ici
// que des valeurs publiques. L'e-mail de contact vit dans lib/contactEmail.ts
// (serveur uniquement : réglage admin → variables d'env).
export const siteConfig = {
  name: 'M&F Talent Connect',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  tagline: 'Zwischen potentiellen Fachkräften und dem deutschen Markt',
  contactPerson: 'Vanneck Fouelefack',
  phone: '+49 (0) 2462 9011492',
  mobile: '+49 (0) 1573 4393860',
  address: 'Wilhelm-Busch-Straße 6, 52441 Linnich',
  social: {
    linkedin: '#',
    facebook: '#',
    instagram: '#',
  },
  nav: [
    { key: 'home', href: '/' },
    { key: 'about', href: '/ueber-uns' },
    { key: 'forCompanies', href: '/fuer-unternehmen' },
    { key: 'forApplicants', href: '/fuer-bewerber' },
    { key: 'jobs', href: '/jobangebote' },
    { key: 'training', href: '/ausbildungsangebote' },
    { key: 'contact', href: '/kontakt' },
  ],
}
