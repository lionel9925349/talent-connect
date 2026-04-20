export const dynamic = 'force-dynamic'

import { JobCard } from '@/components/sections/JobCard'
import { HeroSection } from '@/components/sections/HeroSection'
import { prisma } from '@/lib/prisma'

async function getJobs() {
  try {
    return await prisma.jobOffer.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } })
  } catch {
    return []
  }
}

export default async function JobangebotePage() {
  const jobs = await getJobs()

  return (
    <>
      <HeroSection
        title="Jobangebote"
        subtitle="Entdecken Sie aktuelle Stellenangebote bei deutschen Unternehmen."
        size="medium"
      />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {jobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6B7280] text-lg">Aktuell keine Jobangebote verfügbar.</p>
              <p className="text-[#6B7280] text-sm mt-2">Schauen Sie bald wieder vorbei!</p>
            </div>
          ) : (
            <>
              <p className="text-[#6B7280] mb-6">{jobs.length} Angebot{jobs.length !== 1 ? 'e' : ''} gefunden</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </>
          )}
        </div>
      </section>
    </>
  )
}
