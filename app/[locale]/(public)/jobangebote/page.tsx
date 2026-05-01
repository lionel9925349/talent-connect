export const revalidate = 60

import { getTranslations } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { JobsFilterClient } from '@/components/sections/JobsFilterClient'
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
  const t = await getTranslations('jobs')

  return (
    <>
      <HeroSection title={t('pageTitle')} subtitle={t('pageSubtitle')} size="medium" />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {jobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-lg">{t('noJobs')}</p>
              <p className="text-muted text-sm mt-2">{t('checkBack')}</p>
            </div>
          ) : (
            <JobsFilterClient jobs={jobs} />
          )}
        </div>
      </section>
    </>
  )
}
