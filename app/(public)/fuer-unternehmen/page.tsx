import { HeroSection } from '@/components/sections/HeroSection'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const benefits = [
  {
    icon: '🎯',
    title: 'Vorausgewählte Kandidaten',
    description: 'Wir liefern Ihnen nur Bewerber, die Ihren Anforderungen entsprechen — mit geprüften Qualifikationen und Sprachkenntnissen.',
  },
  {
    icon: '⚡',
    title: 'Schnelle Besetzung',
    description: 'Dank unseres großen Netzwerks in Afrika und Europa können wir offene Stellen in kürzester Zeit besetzen.',
  },
  {
    icon: '🛡️',
    title: 'Rechtssicherheit',
    description: 'Wir übernehmen die komplette Abwicklung aller Visa- und Anerkennungsverfahren — Sie müssen sich um nichts kümmern.',
  },
  {
    icon: '🤝',
    title: 'Integration & Support',
    description: 'Nach der Einstellung begleiten wir sowohl Ihr Unternehmen als auch den neuen Mitarbeiter in der Eingewöhnungsphase.',
  },
]

const steps = [
  { num: '01', title: 'Anfrage senden', desc: 'Teilen Sie uns Ihre offene Stelle und Anforderungen mit.' },
  { num: '02', title: 'Kandidatenauswahl', desc: 'Wir suchen und präsentieren geeignete Bewerber.' },
  { num: '03', title: 'Vorstellungsgespräch', desc: 'Sie führen Gespräche und treffen Ihre Wahl.' },
  { num: '04', title: 'Onboarding', desc: 'Wir begleiten den gesamten Prozess bis zur Einstellung.' },
]

export default function FuerUnternehmenPage() {
  return (
    <>
      <HeroSection
        title="Für Unternehmen"
        subtitle="Finden Sie die Fachkräfte, die Ihr Unternehmen voranbringen — motiviert, qualifiziert und bereit."
        ctaText="Kandidaten anfragen"
        ctaLink="/kontakt"
        size="medium"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-10 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Warum M&F Talent Connect?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} hover>
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{b.title}</h3>
                <p className="text-[#6B7280] text-sm">{b.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-10 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            So funktioniert es
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 bg-[#E87722] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {step.num}
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{step.title}</h3>
                <p className="text-[#6B7280] text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/kontakt" size="lg">Jetzt Anfrage stellen</Button>
          </div>
        </div>
      </section>
    </>
  )
}
