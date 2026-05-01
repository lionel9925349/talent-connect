import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { siteConfig } from '@/lib/config'

export async function Footer() {
  const locale = await getLocale()
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')

  const localePath = (href: string) => `/${locale}${href === '/' ? '' : href}`

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              M<span className="text-accent">&amp;</span>F Talent Connect
            </h3>
            <p className="text-blue-200 text-sm">{siteConfig.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-blue-300">{t('navigation')}</h4>
            <ul className="space-y-2">
              {siteConfig.nav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={localePath(item.href)} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-blue-300">{t('contact')}</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>{siteConfig.email}</li>
              <li>{siteConfig.phone}</li>
              <li>{siteConfig.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-hover flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-300">
          <p>© {new Date().getFullYear()} M&F Talent Connect. {t('rights')}</p>
          <div className="flex gap-4">
            <Link href={localePath('/impressum')} className="hover:text-white transition-colors">{t('legal')}</Link>
            <Link href={localePath('/sonstiges')} className="hover:text-white transition-colors">{t('privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
