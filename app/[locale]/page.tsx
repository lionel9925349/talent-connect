export const dynamic = 'force-dynamic'

import { getTranslations, getLocale } from 'next-intl/server'
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
  const t = await getTranslations('home')
  const locale = await getLocale()

  const lp = (href: string) => `/${locale}${href}`
  const keywords = t.raw('heroKeywords') as string[]

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection
          title={hero?.title ?? t('heroTitle')}
          subtitle={hero?.subtitle ?? t('heroSubtitle')}
          ctaText={hero?.ctaText ?? t('heroCtaText')}
          ctaLink={hero?.ctaLink ?? `mailto:contact@mf-talent-connect.de?subject=Bewerbung%20bei%20M%26F%20Talent%20Connect`}
          keywords={keywords}
        />

        <ServicesSection />

        {jobs.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  {t('latestJobs')}
                </h2>
                <Button href={lp('/jobangebote')} variant="outline" size="sm">{t('viewAll')}</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} id={job.id} title={job.title} company={job.company}
                    location={job.location} contractType={job.contractType} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}

        {trainings.length > 0 && (
          <section className="py-16 md:py-24 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  {t('latestTrainings')}
                </h2>
                <Button href={lp('/ausbildungsangebote')} variant="outline" size="sm">{t('viewAll')}</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trainings.map((tr) => (
                  <JobCard key={tr.id} id={tr.id} title={tr.title} company={tr.sector}
                    location={tr.location} contractType={tr.duration} type="training" locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-accent text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('ctaTitle')}
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">{t('ctaSubtitle')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href={lp('/kontakt')} variant="secondary" size="lg">{t('ctaContact')}</Button>
              <Button href={lp('/fuer-bewerber')} size="lg" className="bg-white text-foreground hover:bg-orange-50 border border-white/20">
                {t('ctaLearnMore')}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
