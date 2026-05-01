import { getTranslations, getLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default async function FuerBewerberPage() {
  const t = await getTranslations('forApplicants')
  const locale = await getLocale()

  const support = t.raw('support') as { title: string; desc: string }[]
  const eligibility = t.raw('eligibility') as string[]

  return (
    <>
      <HeroSection
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        ctaText={t('heroCtaText')}
        ctaLink={`/${locale}/kontakt`}
        size="medium"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('supportTitle')}
            </h2>
            <p className="text-muted text-lg">{t('supportSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {support.map((s, i) => (
              <Card key={s.title} hover>
                <span className="text-xs font-bold text-accent tracking-widest mb-3 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{s.title}</h3>
                <p className="text-muted text-sm">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('eligibilityTitle')}
              </h2>
              <ul className="space-y-3 text-blue-200">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary-hover rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('readyTitle')}
              </h3>
              <p className="text-blue-200 mb-6">{t('readySubtitle')}</p>
              <div className="flex flex-col gap-3">
                <Button href={`/${locale}/jobangebote`} variant="primary">{t('viewJobs')}</Button>
                <Button href={`/${locale}/ausbildungsangebote`} className="bg-white text-primary hover:bg-blue-50">
                  {t('viewTrainings')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
