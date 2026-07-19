export const revalidate = 60

import { getTranslations, getLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { OrganizationJsonLd } from '@/components/seo/OrganizationJsonLd'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { JobCard } from '@/components/sections/JobCard'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { prisma } from '@/lib/prisma'
import { getContactEmail } from '@/lib/contactEmail'
import { getPageContent } from '@/lib/pageSchemas'

interface HomeContent {
  servicesTitle: string
  servicesSubtitle: string
  services: { title: string; description: string }[]
  processTitle: string
  processSubtitle: string
  processSteps: { title: string; description: string }[]
  ctaTitle: string
  ctaSubtitle: string
  ctaContact: string
  ctaLearnMore: string
}

async function getHomeData() {
  try {
    const [hero, jobs, trainings] = await Promise.all([
      prisma.heroContent.findUnique({ where: { key: 'home_hero' } }),
      prisma.jobOffer.findMany({
        where: { isActive: true },
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, company: true, location: true, contractType: true },
      }),
      prisma.trainingOffer.findMany({
        where: { isActive: true },
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, sector: true, duration: true, location: true },
      }),
    ])
    return { hero, jobs, trainings }
  } catch (err) {
    console.error('getHomeData error:', err)
    return { hero: null, jobs: [], trainings: [] }
  }
}

export default async function HomePage() {
  const locale = await getLocale()
  const [{ hero, jobs, trainings }, t, contactEmail, c] = await Promise.all([
    getHomeData(),
    getTranslations('home'),
    getContactEmail(),
    getPageContent<HomeContent>('home', locale),
  ])

  const lp = (href: string) => `/${locale}${href}`
  const keywords = t.raw('heroKeywords') as string[]

  return (
    <>
      <OrganizationJsonLd />
      <Navbar />
      <main className="flex-1">
        <HeroSection
          eyebrow={hero?.eyebrow ?? t('heroEyebrow')}
          title={hero?.title ?? t('heroTitle')}
          subtitle={hero?.subtitle ?? t('heroSubtitle')}
          ctaText={hero?.ctaText ?? t('heroCtaText')}
          ctaLink={hero?.ctaLink ?? `mailto:${contactEmail}?subject=Bewerbung%20bei%20M%26F%20Talent%20Connect`}
          secondaryCtaText={t('heroAllOffers')}
          secondaryCtaLink={lp('/jobangebote')}
          keywords={keywords}
        />

        <ServicesSection title={c.servicesTitle} subtitle={c.servicesSubtitle} items={c.services} />

        <ProcessSection title={c.processTitle} subtitle={c.processSubtitle} steps={c.processSteps} />

        {jobs.length > 0 && (
          <section className="py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                title={t('latestJobs')}
                className="mb-10"
                action={
                  <Button href={lp('/jobangebote')} variant="ghost" size="sm">
                    {t('viewAll')} <span aria-hidden="true">→</span>
                  </Button>
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {jobs.map((job) => (
                  <JobCard key={job.id} id={job.id} title={job.title} company={job.company}
                    location={job.location} contractType={job.contractType} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}

        {trainings.length > 0 && (
          <section className="py-20 md:py-28 bg-white border-y border-border/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                title={t('latestTrainings')}
                className="mb-10"
                action={
                  <Button href={lp('/ausbildungsangebote')} variant="ghost" size="sm">
                    {t('viewAll')} <span aria-hidden="true">→</span>
                  </Button>
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {trainings.map((tr) => (
                  <JobCard key={tr.id} id={tr.id} title={tr.title} company={tr.sector}
                    location={tr.location} contractType={tr.duration} type="training" locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="relative isolate overflow-hidden rounded-3xl px-6 py-16 md:px-16 md:py-20 text-center text-white shadow-[var(--shadow-lift)]"
              style={{ background: 'linear-gradient(135deg, var(--color-accent-strong) 0%, var(--color-accent-strong-hover) 100%)' }}
            >
              <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden="true" />
              <div
                className="absolute -top-24 -right-20 w-80 h-80 rounded-full -z-10 blur-3xl opacity-30"
                style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 max-w-2xl mx-auto">
                {c.ctaTitle}
              </h2>
              <p className="text-white/90 text-lg mb-9 max-w-2xl mx-auto">{c.ctaSubtitle}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button href={lp('/kontakt')} size="lg" className="bg-white text-accent-strong hover:bg-white/90">
                  {c.ctaContact}
                </Button>
                <Button href={lp('/fuer-bewerber')} variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 hover:border-white">
                  {c.ctaLearnMore}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
