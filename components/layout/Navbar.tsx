'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/config'
import { localePath as buildLocalePath } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const localePath = (href: string) => buildLocalePath(locale, href)
  const isActive = (href: string) => pathname === localePath(href)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-border/70 shadow-[0_8px_30px_-12px_rgb(15_24_45/0.18)]'
          : 'bg-white/70 backdrop-blur-md border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-16 lg:h-20'
          }`}
        >
          <Link
            href={`/${locale}`}
            className="flex items-center shrink-0"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo-navbar.png"
              alt="M&F Talent Connect"
              width={526}
              height={284}
              priority
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={localePath(item.href)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    active ? 'text-primary' : 'text-muted hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {t(item.key)}
                  <span
                    className={`absolute left-3 right-3 -bottom-px h-0.5 rounded-full bg-accent transition-transform duration-300 origin-center ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
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
              className="p-2 rounded-lg text-primary hover:bg-primary/5 active:bg-primary/10 transition-colors"
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
    </header>

    {open && (
      <div className="lg:hidden fixed inset-0 top-16 z-40">
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 top-0 bottom-0 bg-white overflow-y-auto shadow-xl">
          <nav className="flex flex-col px-4 py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={localePath(item.href)}
                onClick={() => setOpen(false)}
                className={`px-3 py-3.5 text-base font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-accent/10 text-accent'
                    : 'text-foreground hover:bg-surface'
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
      </div>
    )}
    </>
  )
}
