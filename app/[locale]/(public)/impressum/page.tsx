import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/lib/config'

export default async function ImpressumPage() {
  const t = await getTranslations('impressum')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
        {t('title')}
      </h1>

      <div className="prose prose-gray max-w-none space-y-6 text-muted">
        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('legalTitle')}
          </h2>
          <p>M&amp;F Talent Connect</p>
          <p>{siteConfig.address}</p>
          <p>Deutschland</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('contactTitle')}
          </h2>
          <p>E-Mail: {siteConfig.email}</p>
          <p>Tel: {siteConfig.phone}</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('disclaimerTitle')}
          </h2>
          <p>{t('disclaimerText')}</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('copyrightTitle')}
          </h2>
          <p>{t('copyrightText')}</p>
        </section>
      </div>
    </div>
  )
}
