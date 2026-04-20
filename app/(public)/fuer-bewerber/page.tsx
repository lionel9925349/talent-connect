import { HeroSection } from '@/components/sections/HeroSection'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const support = [
  { icon: '📋', title: 'Bewerbungsbegleitung', desc: 'Wir helfen Ihnen, eine überzeugende Bewerbung auf Deutsch zu erstellen.' },
  { icon: '🌐', title: 'Visa & Anerkennung', desc: 'Vollständige Unterstützung bei allen behördlichen Verfahren.' },
  { icon: '🗣️', title: 'Sprachvorbereitung', desc: 'Empfehlungen für Sprachkurse und Prüfungsvorbereitungen.' },
  { icon: '🏠', title: 'Integration', desc: 'Unterstützung bei der Wohnungssuche und dem Ankommen in Deutschland.' },
]

export default function FuerBewerberPage() {
  return (
    <>
      <HeroSection
        title="Für Bewerber"
        subtitle="Ihr Traum vom Arbeiten oder Lernen in Deutschland — wir machen ihn real."
        ctaText="Jetzt bewerben"
        ctaLink="/kontakt"
        size="medium"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Wir begleiten Sie von A bis Z
            </h2>
            <p className="text-[#6B7280] text-lg">
              Der Weg nach Deutschland kann komplex sein. Wir machen ihn einfacher — mit persönlicher Begleitung,
              Fachwissen und echtem Engagement für Ihren Erfolg.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {support.map((s) => (
              <Card key={s.title} hover>
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{s.title}</h3>
                <p className="text-[#6B7280] text-sm">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1A3A6B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Wer kann sich bewerben?
              </h2>
              <ul className="space-y-3 text-blue-200">
                {[
                  'Fachkräfte mit anerkanntem oder anerkennungsfähigem Abschluss',
                  'Ausbildungssuchende mit guter Schulbildung',
                  'Personen mit Deutschkenntnissen ab B1',
                  'Motivierte Kandidaten mit klarem Berufsziel',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#E87722] mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#2355A0] rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Bereit loszulegen?
              </h3>
              <p className="text-blue-200 mb-6">
                Schauen Sie sich unsere aktuellen Angebote an oder nehmen Sie direkt Kontakt auf.
              </p>
              <div className="flex flex-col gap-3">
                <Button href="/jobangebote" variant="primary">Jobangebote ansehen</Button>
                <Button href="/ausbildungsangebote" className="bg-white text-[#1A3A6B] hover:bg-blue-50">
                  Ausbildungsangebote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
