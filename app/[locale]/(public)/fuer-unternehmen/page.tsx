import { getTranslations, getLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default async function FuerUnternehmenPage() {
  const t = await getTranslations('forCompanies')
  const locale = await getLocale()

  const benefits = t.raw('benefits') as { title: string; description: string }[]
  const steps = t.raw('steps') as { num: string; title: string; desc: string }[]

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
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('whyTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <Card key={b.title} hover>
                <span className="text-xs font-bold text-accent tracking-widest mb-3 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{b.title}</h3>
                <p className="text-muted text-sm">{b.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('howTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div
                  className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {step.num}
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href={`/${locale}/kontakt`} size="lg">{t('requestBtn')}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
