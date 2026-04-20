import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export function Footer() {
  return (
    <footer className="bg-[#1A3A6B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              M<span className="text-[#E87722]">&amp;</span>F Talent Connect
            </h3>
            <p className="text-blue-200 text-sm">{siteConfig.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-blue-300">Navigation</h4>
            <ul className="space-y-2">
              {siteConfig.nav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-blue-300">Kontakt</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>{siteConfig.email}</li>
              <li>{siteConfig.phone}</li>
              <li>{siteConfig.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#2355A0] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-300">
          <p>© {new Date().getFullYear()} M&F Talent Connect. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/sonstiges" className="hover:text-white transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
