import { HeroSection } from '@/components/sections/HeroSection'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const team = [
  { name: 'Marie F.', role: 'Gründerin & Geschäftsführerin', bio: 'Über 10 Jahre Erfahrung in der internationalen Personalvermittlung.' },
  { name: 'Amadou B.', role: 'Berater für Bewerber', bio: 'Experte für Integration und Anerkennungsverfahren in Deutschland.' },
  { name: 'Sandra K.', role: 'Unternehmensberaterin', bio: 'Verbindet deutsche Unternehmen mit internationalen Talenten.' },
]

export default function UeberUnsPage() {
  return (
    <>
      <HeroSection
        title="Über M&F Talent Connect"
        subtitle="Wir glauben an eine Welt, in der Talent keine Grenzen kennt."
        size="medium"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Unsere Mission
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                M&F Talent Connect wurde gegründet, um eine echte Brücke zwischen qualifizierten Fachkräften aus
                Afrika und Europa und dem deutschen Arbeitsmarkt zu bauen. Wir verstehen die Herausforderungen auf
                beiden Seiten — und wir haben Lösungen.
              </p>
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Unser Ansatz ist persönlich, professionell und auf langfristigen Erfolg ausgerichtet.
                Wir begleiten unsere Kandidaten von der ersten Bewerbung bis zur erfolgreichen Integration.
              </p>
              <Button href="/kontakt">Kontakt aufnehmen</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '200+', label: 'Vermittlungen' },
                { value: '50+', label: 'Partnerunternehmen' },
                { value: '15+', label: 'Länder' },
                { value: '98%', label: 'Zufriedenheit' },
              ].map((stat) => (
                <Card key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-[#E87722]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </p>
                  <p className="text-[#6B7280] text-sm mt-1">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-10 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Unser Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <Card key={member.name} hover>
                <div className="w-16 h-16 bg-[#1A3A6B] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {member.name[0]}
                </div>
                <h3 className="font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>{member.name}</h3>
                <p className="text-[#E87722] text-sm font-medium mb-2">{member.role}</p>
                <p className="text-[#6B7280] text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
