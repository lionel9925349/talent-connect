'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

const locales = ['de', 'en'] as const

export function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher')
  const locale = useLocale()
  const pathname = usePathname()

  const pathWithoutLocale = pathname.replace(/^\/(de|en)/, '') || '/'

  return (
    <div className="flex items-center gap-0.5 border border-border rounded-lg overflow-hidden text-xs font-semibold" aria-label={t('label')}>
      {locales.map((loc) =>
        loc === locale ? (
          <span key={loc} className="px-2 py-1.5 bg-primary text-white" aria-current="true">
            {t(loc)}
          </span>
        ) : (
          <Link
            key={loc}
            href={`/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}` as Route}
            className="px-2 py-1.5 text-muted transition-colors hover:text-primary"
          >
            {t(loc)}
          </Link>
        )
      )}
    </div>
  )
}
