import { getTranslations } from 'next-intl/server'
import { getSiteInfo } from '@/lib/siteInfo'

/** L'adresse est saisie sur une ligne (« rue, code postal ville ») ; l'Impressum l'affiche en bloc postal. */
function AddressLines({ address }: { address: string }) {
  return (
    <>
      {address.split(',').map((line, i) => (
        <p key={i}>{line.trim()}</p>
      ))}
    </>
  )
}

export default async function ImpressumPage() {
  const [t, info] = await Promise.all([
    getTranslations('impressum'),
    getSiteInfo(),
  ])

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
          <p>{t('companyLine')}</p>
          <p>
            {t('ownerLabel')}: {t('ownerName')}
          </p>
          <AddressLines address={info.address} />
          <p>Deutschland</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('contactTitle')}
          </h2>
          <p>Telefon: {info.phone}</p>
          <p>Mobil: {info.mobile}</p>
          <p>E-Mail: {t('emailValue')}</p>
          <p>
            {t('websiteLabel')}: {t('websiteValue')}
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('authorityTitle')}
          </h2>
          <p>{t('authorityName')}</p>
          <AddressLines address={t('authorityAddress')} />
          <p>Deutschland</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('vatTitle')}
          </h2>
          <p>{t('vatId')}</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('taxNumberTitle')}
          </h2>
          <p>{t('taxNumberValue')}</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('responsibleTitle')}
          </h2>
          <p>{info.contactPerson}</p>
          <AddressLines address={info.address} />
          <p>Deutschland</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('disputeTitle')}
          </h2>
          <p>
            {t.rich('disputeText', {
              link: (chunks) => (
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            {t('consumerDisputeTitle')}
          </h2>
          <p>{t('consumerDisputeText')}</p>
        </section>
      </div>
    </div>
  )
}
