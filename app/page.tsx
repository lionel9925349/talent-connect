import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { JobCard } from '@/components/sections/JobCard'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'

async function getHomeData() {
  try {
    const [hero, jobs, trainings] = await Promise.all([
      prisma.heroContent.findUnique({ where: { key: 'home_hero' } }),
      prisma.jobOffer.findMany({ where: { isActive: true }, take: 3, orderBy: { createdAt: 'desc' } }),
      prisma.trainingOffer.findMany({ where: { isActive: true }, take: 3, orderBy: { createdAt: 'desc' } }),
    ])
    return { hero, jobs, trainings }
  } catch {
    return { hero: null, jobs: [], trainings: [] }
  }
}

export default async function HomePage() {
  const { hero, jobs, trainings } = await getHomeData()

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection
          title={hero?.title ?? 'Ihre Brücke zwischen Afrika und Deutschland'}
          subtitle={
            hero?.subtitle ??
            'M&F Talent Connect verbindet qualifizierte Fachkräfte und Ausbildungssuchende mit deutschen Unternehmen — für eine gemeinsame Zukunft.'
          }
          ctaText={hero?.ctaText ?? 'Jetzt bewerben'}
          ctaLink={hero?.ctaLink ?? '/kontakt'}
        />

        <ServicesSection />

        {jobs.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#1A1A2E]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Aktuelle Jobangebote
                </h2>
                <Button href="/jobangebote" variant="outline" size="sm">
                  Alle anzeigen
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    contractType={job.contractType}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {trainings.length > 0 && (
          <section className="py-16 md:py-24 bg-[#F7F8FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#1A1A2E]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Ausbildungsangebote
                </h2>
                <Button href="/ausbildungsangebote" variant="outline" size="sm">
                  Alle anzeigen
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trainings.map((t) => (
                  <JobCard
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    company={t.sector}
                    location={t.location}
                    contractType={t.duration}
                    type="training"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-[#E87722] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Bereit für den nächsten Schritt?
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              Ob Unternehmen oder Bewerber — wir begleiten Sie auf Ihrem Weg.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/kontakt" variant="secondary" size="lg">
                Jetzt Kontakt aufnehmen
              </Button>
              <Button href="/fuer-bewerber" size="lg" className="bg-white text-[#E87722] hover:bg-orange-50">
                Mehr erfahren
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
