'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])


  return (
    <header className="bg-white/95 backdrop-blur border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 shrink-0"
            onClick={() => setOpen(false)}
          >
            <span
              className="text-primary font-bold text-2xl leading-none tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              M
              <span
                className="text-accent mx-0.5 align-baseline"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
              >
                &
              </span>
              F
            </span>
            <span className="text-foreground font-semibold text-sm hidden sm:block">
              Talent Connect
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={localePath(item.href)}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(item.href) ? 'text-accent' : 'text-muted hover:text-primary'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LocaleSwitcher />
            <Button href={localePath('/kontakt')} size="sm">
              {t('applyNow')}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LocaleSwitcher />
            <button
              className="p-2 rounded-lg text-primary hover:bg-gray-100 active:bg-gray-200 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
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
        </div>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/30 lg:hidden z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed left-0 right-0 top-16 bottom-0 z-40 bg-white overflow-y-auto">
            <nav className="flex flex-col px-4 py-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={localePath(item.href)}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-3.5 text-base font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-accent/10 text-accent'
                      : 'text-foreground hover:bg-gray-50'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="mt-4 px-3">
                <Button
                  href={localePath('/kontakt')}
                  size="md"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {t('applyNow')}
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
