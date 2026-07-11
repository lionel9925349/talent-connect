import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { siteConfig } from '@/lib/config'
import { localePath as buildLocalePath } from '@/lib/routes'

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: (
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.59 7-2.78 7 2.48v6.75z" />
  ),
  facebook: (
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
  ),
  instagram: (
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 9.84a4 4 0 100-8 4 4 0 000 8zm6.5-9.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 16a4 4 0 110-8 4 4 0 010 8z" />
  ),
}

const socials = Object.entries(siteConfig.social).filter(([, url]) => url && url !== '#')

export async function Footer() {
  const [locale, t, tNav] = await Promise.all([
    getLocale(),
    getTranslations('footer'),
    getTranslations('nav'),
  ])

  const localePath = (href: string) => buildLocalePath(locale, href)

  return (
    <footer className="relative bg-primary-900 text-white">
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-hover) 50%, var(--color-primary-hover))' }} />
      <div className="absolute inset-0 bg-grid opacity-[0.07]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h3 className="font-heading font-bold text-2xl mb-3">
              M
              <span className="font-body font-bold text-accent mx-0.5">
                &
              </span>
              F Talent Connect
            </h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">{siteConfig.tagline}</p>

            {socials.length > 0 && (
              <div className="flex gap-3 mt-6">
                {socials.map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/8 text-white/70 ring-1 ring-inset ring-white/10 hover:bg-accent hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      {socialIcons[name]}
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-3">
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-[0.14em] text-white/60">
              {t('navigation')}
            </h4>
            <ul className="space-y-2.5">
              {siteConfig.nav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(item.href)}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-[0.14em] text-white/60">
              {t('contact')}
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-start gap-2.5 hover:text-white transition-colors">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {siteConfig.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 5a2 2 0 012-2h2.6a1 1 0 01.96.74l1 3.6a1 1 0 01-.27.96L8.1 10.1a14 14 0 005.8 5.8l1.8-1.2a1 1 0 01.96-.27l3.6 1a1 1 0 01.74.96V19a2 2 0 01-2 2A16 16 0 013 5z" />
                </svg>
                {siteConfig.phone}
              </li>
              <li className="inline-flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {siteConfig.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} M&F Talent Connect. {t('rights')}</p>
          <div className="flex gap-5">
            <Link href={localePath('/impressum')} className="hover:text-white transition-colors">{t('legal')}</Link>
            <Link href={localePath('/sonstiges')} className="hover:text-white transition-colors">{t('privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
