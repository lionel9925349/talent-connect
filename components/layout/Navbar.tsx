'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/config'
import { Button } from '@/components/ui/Button'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const localePath = (href: string) => `/${locale}${href === '/' ? '' : href}`
  const isActive = (href: string) => pathname === localePath(href)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-primary font-bold text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
              M<span className="text-accent">&amp;</span>F
            </span>
            <span className="text-foreground font-semibold text-sm hidden sm:block">Talent Connect</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={localePath(item.href)}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href) ? 'text-accent' : 'text-muted hover:text-primary'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LocaleSwitcher />
            <Button href={localePath('/kontakt')} size="sm">{t('applyNow')}</Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-muted hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-3">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={localePath(item.href)}
                  onClick={() => setOpen(false)}
                  className={`px-2 py-1 text-sm font-medium transition-colors ${
                    isActive(item.href) ? 'text-accent' : 'text-muted hover:text-primary'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="flex items-center gap-3 mt-2">
                <LocaleSwitcher />
                <Button href={localePath('/kontakt')} size="sm" onClick={() => setOpen(false)}>
                  {t('applyNow')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
