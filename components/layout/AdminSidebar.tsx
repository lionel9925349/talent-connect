'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Hero / Bannières', href: '/admin/hero', icon: '🖼️' },
  { label: 'Offres d\'emploi', href: '/admin/jobs', icon: '💼' },
  { label: 'Formations', href: '/admin/formations', icon: '🎓' },
  { label: 'Bewerbungen', href: '/admin/applications', icon: '📋' },
  { label: 'Kontaktnachrichten', href: '/admin/contacts', icon: '✉️' },
  { label: 'Einstellungen', href: '/admin/settings', icon: '⚙️' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-foreground text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin/dashboard">
          <h1 className="font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
            M<span className="text-accent">&amp;</span>F Admin
          </h1>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-accent text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors block mb-2">
          ← Voir le site
        </Link>
        <form action="/api/admin/auth/logout" method="POST">
          <button
            type="submit"
            className="text-xs text-gray-400 hover:text-red-400 transition-colors"
          >
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  )
}
