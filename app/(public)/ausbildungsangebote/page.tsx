export const dynamic = 'force-dynamic'

import { JobCard } from '@/components/sections/JobCard'
import { HeroSection } from '@/components/sections/HeroSection'
import { prisma } from '@/lib/prisma'

async function getTrainings() {
  try {
    return await prisma.trainingOffer.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } })
  } catch {
    return []
  }
}

export default async function AusbildungsangebotePage() {
  const trainings = await getTrainings()

  return (
    <>
      <HeroSection
        title="Ausbildungsangebote"
        subtitle="Starten Sie Ihre berufliche Karriere in Deutschland mit einer dualen Ausbildung."
        size="medium"
      />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {trainings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6B7280] text-lg">Aktuell keine Ausbildungsangebote verfügbar.</p>
              <p className="text-[#6B7280] text-sm mt-2">Schauen Sie bald wieder vorbei!</p>
            </div>
          ) : (
            <>
              <p className="text-[#6B7280] mb-6">{trainings.length} Angebot{trainings.length !== 1 ? 'e' : ''} gefunden</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </>
          )}
        </div>
      </section>
    </>
  )
}
