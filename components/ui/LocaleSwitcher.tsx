'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

export function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher')
  const locale = useLocale()
  const pathname = usePathname()

  const pathWithoutLocale = pathname.replace(/^\/(de|en)/, '') || '/'
  const otherLocale = locale === 'de' ? 'en' : 'de'
  const switchHref = `/${otherLocale}${pathWithoutLocale}`

  return (
    <div className="flex items-center gap-0.5 border border-gray-200 rounded-lg overflow-hidden text-xs font-semibold" aria-label={t('label')}>
      <span className={`px-2 py-1.5 transition-colors ${locale === 'de' ? 'bg-primary text-white' : 'text-muted'}`}>
        {t('de')}
      </span>
      <Link
        href={switchHref}
        className={`px-2 py-1.5 transition-colors hover:text-primary ${locale === 'en' ? 'bg-primary text-white' : 'text-muted'}`}
      >
        {t('en')}
      </Link>
    </div>
  )
}
