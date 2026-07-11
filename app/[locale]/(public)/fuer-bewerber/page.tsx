import { getLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getPageContent } from '@/lib/pageSchemas'

export const revalidate = 60

interface ForApplicantsContent {
  heroTitle: string
  heroSubtitle: string
  heroCtaText: string
  welcomeHeadline: string
  welcomeText: string
  checklistTitle: string
  checklistSubtitle: string
  checklistGroups: { title: string; description: string }[]
  supportTitle: string
  supportSubtitle: string
  support: { title: string; description: string }[]
  commitmentTitle: string
  commitmentText: string
  stepsTitle: string
  stepsSubtitle: string
  steps: { num: string; title: string; desc: string }[]
  eligibilityTitle: string
  eligibility: string[]
  readyTitle: string
  readySubtitle: string
  viewJobs: string
  viewTrainings: string
}

function MultilineList({ text }: { text: string }) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  return (
    <ul className="space-y-2 text-[0.95rem] text-muted leading-relaxed">
      {lines.map((line, i) => {
        const isSub = line.startsWith('–') || line.startsWith('-')
        const cleaned = line.replace(/^[•·]\s*/, '').replace(/^[-–]\s*/, '')
        return (
          <li key={i} className={`flex gap-2 ${isSub ? 'pl-5' : ''}`}>
            <span className={`shrink-0 ${isSub ? 'text-muted' : 'text-accent'} mt-0.5`}>
              {isSub ? '–' : '•'}
            </span>
            <span>{cleaned}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default async function FuerBewerberPage() {
  const locale = await getLocale()
  const c = await getPageContent<ForApplicantsContent>('fuer-bewerber', locale)

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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            {c.welcomeHeadline}
          </h2>
          <p className="text-muted text-lg leading-relaxed">{c.welcomeText}</p>
        </div>
      </section>

      {c.checklistGroups && c.checklistGroups.length > 0 && (
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3"
              >
                {c.checklistTitle}
              </h2>
              {c.checklistSubtitle && (
                <p className="text-muted max-w-2xl mx-auto">{c.checklistSubtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.checklistGroups.map((g) => (
                <Card key={g.title} hover>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </span>
                    <h3 className="font-heading font-bold text-foreground">
                      {g.title}
                    </h3>
                  </div>
                  <MultilineList text={g.description} />
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.support && c.support.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3"
              >
                {c.supportTitle}
              </h2>
              {c.supportSubtitle && (
                <p className="text-muted max-w-2xl mx-auto">{c.supportSubtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {c.support.map((s) => (
                <Card key={s.title} hover>
                  <h3
                    className="font-heading font-bold text-foreground mb-3"
                  >
                    {s.title}
                  </h3>
                  <MultilineList text={s.description} />
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-heading text-3xl md:text-4xl font-bold mb-4"
          >
            {c.commitmentTitle}
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed">{c.commitmentText}</p>
        </div>
      </section>

      {c.steps && c.steps.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3"
              >
                {c.stepsTitle}
              </h2>
              {c.stepsSubtitle && <p className="text-muted">{c.stepsSubtitle}</p>}
            </div>
            <div className="relative">
              <div
                className="hidden md:block absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
                aria-hidden="true"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
                {c.steps.map((step) => (
                  <div key={step.num} className="text-center">
                    <div
                      className="font-heading w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ring-4 ring-white"
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
      )}

      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-5"
              >
                {c.eligibilityTitle}
              </h2>
              <ul className="space-y-3">
                {c.eligibility?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <svg
                      className="w-5 h-5 text-accent shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary text-white rounded-xl p-8">
              <h3
                className="font-heading text-2xl font-bold mb-3"
              >
                {c.readyTitle}
              </h3>
              <p className="text-blue-200 mb-6">{c.readySubtitle}</p>
              <div className="flex flex-col gap-3">
                <Button href={`/${locale}/jobangebote`} variant="primary">
                  {c.viewJobs}
                </Button>
                <Button
                  href={`/${locale}/ausbildungsangebote`}
                  className="bg-white text-primary hover:bg-blue-50"
                >
                  {c.viewTrainings}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
