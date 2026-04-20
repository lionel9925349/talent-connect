import { siteConfig } from '@/lib/config'

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-[#1A1A2E] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
        Impressum
      </h1>

      <div className="prose prose-gray max-w-none space-y-6 text-[#6B7280]">
        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Angaben gemäß § 5 TMG
          </h2>
          <p>M&F Talent Connect</p>
          <p>{siteConfig.address}</p>
          <p>Deutschland</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Kontakt
          </h2>
          <p>E-Mail: {siteConfig.email}</p>
          <p>Telefon: {siteConfig.phone}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Haftungsausschluss
          </h2>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
            und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Urheberrecht
          </h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>
      </div>
    </div>
  )
}
