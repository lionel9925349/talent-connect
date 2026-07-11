import { getTranslations } from 'next-intl/server'

export default async function SonstigesPage() {
  const t = await getTranslations('privacy')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
        {t('title')}
      </h1>

      <div className="space-y-6 text-muted">
        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('section1Title')}
          </h2>
          <p className="leading-relaxed">{t('section1Text')}</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('section2Title')}
          </h2>
          <p className="leading-relaxed">{t('section2Text')}</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('section3Title')}
          </h2>
          <p className="leading-relaxed">{t('section3Text')}</p>
        </section>
      </div>
    </div>
  )
}
