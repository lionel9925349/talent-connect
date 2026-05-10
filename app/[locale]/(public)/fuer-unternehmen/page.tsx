import { getLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getPageContent } from '@/lib/pageSchemas'

export const dynamic = 'force-dynamic'

interface ForCompaniesContent {
  heroTitle: string
  heroSubtitle: string
  heroCtaText: string
  introHeadline: string
  introText: string
  painPoints: string[]
  introClosing: string
  whyTitle: string
  whySubtitle: string
  benefits: { title: string; description: string }[]
  howTitle: string
  howSubtitle: string
  steps: { num: string; title: string; desc: string }[]
  extraTitle: string
  extras: { title: string; description: string }[]
  relocationTitle: string
  relocationSubtitle: string
  relocation: { title: string; description: string }[]
  finalTitle: string
  finalText: string
  requestBtn: string
}

export default async function FuerUnternehmenPage() {
  const locale = await getLocale()
  const c = await getPageContent<ForCompaniesContent>('fuer-unternehmen', locale)

  return (
    <>
      <HeroSection
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        ctaText={c.heroCtaText}
        ctaLink={`/${locale}/kontakt`}
        size="medium"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {c.introHeadline}
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-6">{c.introText}</p>
          <ul className="space-y-3 mb-6">
            {c.painPoints?.map((point) => (
              <li key={point} className="flex gap-3 items-start">
                <span className="mt-1 text-accent">•</span>
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
          <p className="text-foreground font-medium leading-relaxed border-l-4 border-accent pl-4 italic">
            {c.introClosing}
          </p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {c.whyTitle}
            </h2>
            {c.whySubtitle && <p className="text-muted max-w-2xl mx-auto">{c.whySubtitle}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.benefits?.map((b, i) => (
              <Card key={`${b.title}-${i}`} hover>
                <span className="text-xs font-bold text-accent tracking-widest mb-3 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="font-bold text-foreground mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {b.title}
                </h3>
                <p className="text-muted text-[0.95rem] leading-relaxed">{b.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {c.howTitle}
            </h2>
            {c.howSubtitle && <p className="text-muted max-w-2xl mx-auto">{c.howSubtitle}</p>}
          </div>
          <div className="relative">
            <div
              className="hidden md:block absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
              {c.steps?.map((step) => (
                <div key={step.num} className="text-center">
                  <div
                    className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ring-4 ring-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted text-[0.95rem] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {c.extras && c.extras.length > 0 && (
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl font-bold mb-10 text-center"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {c.extraTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.extras.map((b) => (
                <div
                  key={b.title}
                  className="bg-white/10 border border-white/15 rounded-xl p-6 backdrop-blur"
                >
                  <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {b.title}
                  </h3>
                  <p className="text-blue-100 text-[0.95rem] leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.relocation && c.relocation.length > 0 && (
        <section className="py-16 md:py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {c.relocationTitle}
              </h2>
              {c.relocationSubtitle && (
                <p className="text-muted max-w-2xl mx-auto">{c.relocationSubtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.relocation.map((b) => (
                <Card key={b.title} hover>
                  <h3
                    className="font-bold text-foreground mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-muted text-[0.95rem] leading-relaxed">{b.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {c.finalTitle}
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-8">{c.finalText}</p>
          <Button href={`/${locale}/kontakt`} size="lg">
            {c.requestBtn}
          </Button>
        </div>
      </section>
    </>
  )
}
