export default function SonstigesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-[#1A1A2E] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
        Datenschutzerklärung
      </h1>

      <div className="space-y-6 text-[#6B7280]">
        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            1. Datenschutz auf einen Blick
          </h2>
          <p className="leading-relaxed">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
            passiert, wenn Sie diese Website besuchen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            2. Allgemeine Hinweise und Pflichtinformationen
          </h2>
          <p className="leading-relaxed">
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
            personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie
            dieser Datenschutzerklärung.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            3. Datenerfassung auf dieser Website
          </h2>
          <p className="leading-relaxed">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
            inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
            Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
        </section>
      </div>
    </div>
  )
}
