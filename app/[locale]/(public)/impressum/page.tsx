import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/lib/config'
import { getContactEmail } from '@/lib/contactEmail'

export default async function ImpressumPage() {
  const [t, contactEmail] = await Promise.all([getTranslations('impressum'), getContactEmail()])

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
            {t('representedBy')}
          </h2>
          <p>{siteConfig.contactPerson}</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('contactTitle')}
          </h2>
          <p>E-Mail: {contactEmail}</p>
          <p>Telefon: {siteConfig.phone}</p>
          <p>Mobil: {siteConfig.mobile}</p>
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
