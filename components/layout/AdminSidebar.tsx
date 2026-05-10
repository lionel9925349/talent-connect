'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Hero & Banner', href: '/admin/hero', icon: '🖼️' },
  { label: 'Seiten-Inhalte', href: '/admin/pages', icon: '📝' },
  { label: 'Stellenangebote', href: '/admin/jobs', icon: '💼' },
  { label: 'Ausbildungen', href: '/admin/formations', icon: '🎓' },
  { label: 'Bewerbungen', href: '/admin/applications', icon: '📋' },
  { label: 'Kontaktnachrichten', href: '/admin/contacts', icon: '✉️' },
  { label: 'Einstellungen', href: '/admin/settings', icon: '⚙️' },
]

function Logo() {
  return (
    <span className="font-bold text-lg leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
      M
      <span
        className="text-accent mx-0.5"
        style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
      >
        &
      </span>
      F <span className="text-blue-200 font-medium text-sm">Admin</span>
    </span>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 bg-primary text-white shadow-md">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/admin/dashboard" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-white/10 active:bg-white/20"
            aria-label="Admin-Menü"
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
      </header>

      {open && (
        <div
          className="lg:hidden fixed inset-0 top-14 bg-black/40 z-30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:sticky inset-y-0 lg:inset-auto lg:top-0 left-0 z-40 lg:z-auto w-72 lg:w-64 lg:min-h-screen lg:h-screen h-[calc(100vh)] bg-primary text-white flex flex-col transition-transform duration-200 ease-out shadow-xl lg:shadow-none`}
      >
        <div className="hidden lg:block p-6 border-b border-white/10">
          <Link href="/admin/dashboard">
            <Logo />
          </Link>
        </div>

        <div className="lg:hidden h-14 shrink-0" />

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-xs text-blue-200 hover:text-white transition-colors"
          >
            <span>←</span> Zurück zur Website
          </Link>
          <form action="/api/admin/auth/logout" method="POST">
            <button
              type="submit"
              className="text-xs text-blue-200 hover:text-red-300 transition-colors"
            >
              Abmelden
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
