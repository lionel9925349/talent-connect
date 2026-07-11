import { getTranslations, getLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default async function UeberUnsPage() {
  const t = await getTranslations('about')
  const locale = await getLocale()

  const stats = [
    { value: '200+', label: t('stats.placements') },
    { value: '50+', label: t('stats.partners') },
    { value: '15+', label: t('stats.countries') },
    { value: '98%', label: t('stats.satisfaction') },
  ]

  const team = t.raw('team') as { name: string; role: string; bio: string }[]

  return (
    <>
      <HeroSection title={t('heroTitle')} subtitle={t('heroSubtitle')} size="medium" />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                {t('missionTitle')}
              </h2>
              <p className="text-muted leading-relaxed mb-4">{t('missionText1')}</p>
              <p className="text-muted leading-relaxed mb-6">{t('missionText2')}</p>
              <Button href={`/${locale}/kontakt`}>{t('missionBtn')}</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="text-center">
                  <p className="font-heading text-4xl font-bold text-accent">
                    {stat.value}
                  </p>
                  <p className="text-muted text-sm mt-1">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-10 text-center">
            {t('teamTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <Card key={member.name} hover>
                <div className="font-heading w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {member.name[0]}
                </div>
                <h3 className="font-heading font-bold text-foreground">{member.name}</h3>
                <p className="text-accent text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
