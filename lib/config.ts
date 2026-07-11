/** Convertit un numéro affiché (« +49 (0) 2462 9011492 ») en href tel: valide. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/\(0\)/g, '').replace(/[^+\d]/g, '')}`
}

export const siteConfig = {
  name: 'M&F Talent Connect',
  tagline: 'Zwischen potentiellen Fachkräften und dem deutschen Markt',
  email: 'contact@mf-talent-connect.de',
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
