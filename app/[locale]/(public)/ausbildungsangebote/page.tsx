export const revalidate = 60

import { getTranslations, getLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrainingsFilterClient } from '@/components/sections/TrainingsFilterClient'
import { EmptyState } from '@/components/ui/EmptyState'
import { prisma } from '@/lib/prisma'

async function getTrainings() {
  try {
    return await prisma.trainingOffer.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        sector: true,
        duration: true,
        location: true,
        startDate: true,
      },
    })
  } catch (err) {
    console.error('getTrainings error:', err)
    return []
  }
}

export default async function AusbildungsangebotePage() {
  const trainings = await getTrainings()
  const t = await getTranslations('training')
  const locale = await getLocale()

  return (
    <>
      <HeroSection title={t('pageTitle')} subtitle={t('pageSubtitle')} size="medium" />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {trainings.length === 0 ? (
            <EmptyState
              title={t('noTrainings')}
              hint={t('checkBack')}
              ctaText={t('emptyCta')}
              ctaHref={`/${locale}/kontakt`}
            />
          ) : (
            <TrainingsFilterClient trainings={trainings} locale={locale} />
          )}
        </div>
      </section>
    </>
  )
}
