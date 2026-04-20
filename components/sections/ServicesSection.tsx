import { Card } from '@/components/ui/Card'

const services = [
  {
    icon: '🤝',
    title: 'Vermittlung',
    description:
      'Wir vermitteln qualifizierte Fachkräfte aus Afrika und Europa an deutsche Unternehmen — schnell, zuverlässig und auf Augenhöhe.',
  },
  {
    icon: '🎓',
    title: 'Ausbildung',
    description:
      'Wir begleiten Ausbildungssuchende auf ihrem Weg ins deutsche Berufsausbildungssystem und unterstützen bei allen bürokratischen Schritten.',
  },
  {
    icon: '🏢',
    title: 'Für Unternehmen',
    description:
      'Finden Sie motivierte Mitarbeiter und Auszubildende — mit vollständiger Vorauswahl, Sprachüberprüfung und Integrationssupport.',
  },
  {
    icon: '🌍',
    title: 'Für Bewerber',
    description:
      'Ob Berufserfahrene oder Ausbildungssuchende — wir öffnen Ihnen die Türen zum deutschen Arbeitsmarkt und stehen Ihnen Seite an Seite.',
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Unsere Leistungen
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            M&F Talent Connect — Ihre verlässliche Brücke zwischen Afrika und dem deutschen Arbeitsmarkt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} hover>
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3
                className="font-bold text-[#1A1A2E] text-lg mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {service.title}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
