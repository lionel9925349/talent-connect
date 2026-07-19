import { getLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { Button } from '@/components/ui/Button'
import { getPageContent } from '@/lib/pageSchemas'

export const revalidate = 60

interface AboutContent {
  heroTitle: string
  heroSubtitle: string
  missionTitle: string
  missionText1: string
  missionText2: string
  missionText3: string
  missionBtn: string
  challengeTitle: string
  challengeText1: string
  challengeText2: string
  responseTitle: string
  responseText1: string
  responseText2: string
  bridgeTitle: string
  bridgeText1: string
  bridgeText2: string
  futureTitle: string
  futureText: string
}

export default async function UeberUnsPage() {
  const locale = await getLocale()
  const t = await getPageContent<AboutContent>('ueber-uns', locale)

  return (
    <>
      <HeroSection title={t.heroTitle} subtitle={t.heroSubtitle} size="medium" />

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
            {t.missionTitle}
          </h2>
          <p className="text-muted leading-relaxed mb-4">{t.missionText1}</p>
          <p className="text-muted leading-relaxed mb-4">{t.missionText2}</p>
          <p className="text-muted leading-relaxed mb-6">{t.missionText3}</p>
          <Button href={`/${locale}/kontakt`}>{t.missionBtn}</Button>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              🌍 {t.challengeTitle}
            </h2>
            <p className="text-muted leading-relaxed mb-4">{t.challengeText1}</p>
            <p className="text-muted leading-relaxed">{t.challengeText2}</p>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              🌟 {t.responseTitle}
            </h3>
            <p className="text-muted leading-relaxed mb-4">{t.responseText1}</p>
            <p className="text-muted leading-relaxed">{t.responseText2}</p>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              🤝 {t.bridgeTitle}
            </h3>
            <p className="text-muted leading-relaxed mb-4">{t.bridgeText1}</p>
            <p className="text-muted leading-relaxed">{t.bridgeText2}</p>
          </div>

          <div className="border-l-4 border-accent pl-4">
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              🚀 {t.futureTitle}
            </h3>
            <p className="text-foreground font-medium leading-relaxed italic">{t.futureText}</p>
          </div>
        </div>
      </section>
    </>
  )
}
