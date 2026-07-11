import Link from 'next/link'
import { getPageList } from '@/lib/pageSchemas'

export default function AdminPagesIndex() {
  const pages = getPageList()

  return (
    <div>
      <div className="mb-8">
        <h1
          className="font-heading text-3xl md:text-4xl font-bold text-foreground"
        >
          Seiten-Inhalte
        </h1>
        <p className="text-muted mt-1">
          Bearbeiten Sie Texte, Vorteile, Prozessschritte und mehr direkt aus dem Dashboard.
          Ihre Änderungen ersetzen die Standardtexte auf der Website.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <Link key={page.slug} href={`/admin/pages/${page.slug}`}>
            <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-accent/40 transition-all h-full">
              <div className="text-2xl mb-3">📝</div>
              <h3 className="font-semibold text-foreground">{page.label}</h3>
              {page.description && (
                <p className="text-sm text-muted mt-1">{page.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
