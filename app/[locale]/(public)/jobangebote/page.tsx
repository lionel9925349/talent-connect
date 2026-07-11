export const revalidate = 60

import { getTranslations, getLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { JobsFilterClient } from '@/components/sections/JobsFilterClient'
import { EmptyState } from '@/components/ui/EmptyState'
import { prisma } from '@/lib/prisma'

async function getJobs() {
  try {
    return await prisma.jobOffer.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      // N'expédie pas description/requirements (jusqu'à 10 KB chacun) au client.
      select: {
        id: true,
        title: true,
        company: true,
        location: true,
        contractType: true,
      },
    })
  } catch (err) {
    console.error('getJobs error:', err)
    return []
  }
}

export default async function JobangebotePage() {
  const jobs = await getJobs()
  const t = await getTranslations('jobs')
  const locale = await getLocale()

  return (
    <>
      <HeroSection title={t('pageTitle')} subtitle={t('pageSubtitle')} size="medium" />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {jobs.length === 0 ? (
            <EmptyState
              title={t('noJobs')}
              hint={t('checkBack')}
              ctaText={t('emptyCta')}
              ctaHref={`/${locale}/kontakt`}
            />
          ) : (
            <JobsFilterClient jobs={jobs} />
          )}
        </div>
      </section>
    </>
  )
}
