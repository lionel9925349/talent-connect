export const revalidate = 60

import { getTranslations, getLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrainingsFilterClient } from '@/components/sections/TrainingsFilterClient'
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
  const t = await getTranslations('training')
  const locale = await getLocale()

  return (
    <>
      <HeroSection title={t('pageTitle')} subtitle={t('pageSubtitle')} size="medium" />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {trainings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-lg">{t('noTrainings')}</p>
              <p className="text-muted text-sm mt-2">{t('checkBack')}</p>
            </div>
          ) : (
            <TrainingsFilterClient trainings={trainings} locale={locale} />
          )}
        </div>
      </section>
    </>
  )
}
