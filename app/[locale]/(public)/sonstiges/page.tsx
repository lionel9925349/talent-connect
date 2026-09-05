import { getTranslations } from 'next-intl/server'
import { getSiteInfo } from '@/lib/siteInfo'

/** Bloc de texte d'une sous-section : son titre suivi de ses paragraphes. */
function Block({
  title,
  level = 3,
  paragraphs,
  children,
}: {
  title: string
  /** 3 pour une sous-section de chapitre, 4 pour une question imbriquée. */
  level?: 3 | 4
  paragraphs?: string[]
  children?: React.ReactNode
}) {
  const Heading = level === 3 ? 'h3' : 'h4'

  return (
    <div className="space-y-3">
      <Heading
        className={`font-heading font-bold text-foreground ${
          level === 3 ? 'text-lg' : 'text-base'
        }`}
      >
        {title}
      </Heading>
      {paragraphs?.map((text, i) => (
        <p key={i} className="leading-relaxed">
          {text}
        </p>
      ))}
      {children}
    </div>
  )
}

export default async function SonstigesPage() {
  const [t, info] = await Promise.all([
    getTranslations('privacy'),
    getSiteInfo(),
  ])
  const email = t('s2.controllerEmail')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
        {t('title')}
      </h1>

      <div className="space-y-10 text-muted">
        {/* 1. Datenschutz auf einen Blick */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {t('s1.title')}
          </h2>

          <Block
            title={t('s1.generalTitle')}
            paragraphs={[t('s1.generalText')]}
          />

          <h3 className="font-heading text-lg font-bold text-foreground">
            {t('s1.collectionTitle')}
          </h3>
          <div className="space-y-6 pl-0 sm:pl-4 sm:border-l sm:border-border">
            <Block
              level={4}
              title={t('s1.whoTitle')}
              paragraphs={[t('s1.whoText')]}
            />
            <Block
              level={4}
              title={t('s1.howTitle')}
              paragraphs={[t('s1.howText1'), t('s1.howText2')]}
            />
            <Block
              level={4}
              title={t('s1.whyTitle')}
              paragraphs={[t('s1.whyText')]}
            />
            <Block
              level={4}
              title={t('s1.rightsTitle')}
              paragraphs={[t('s1.rightsText1'), t('s1.rightsText2')]}
            />
          </div>
        </section>

        {/* 2. Allgemeine Hinweise und Pflichtinformationen */}
        <section className="space-y-6 border-t border-border pt-10">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {t('s2.title')}
          </h2>

          <Block
            title={t('s2.privacyTitle')}
            paragraphs={[
              t('s2.privacyText1'),
              t('s2.privacyText2'),
              t('s2.privacyText3'),
            ]}
          />

          <Block
            title={t('s2.controllerTitle')}
            paragraphs={[t('s2.controllerIntro')]}
          >
            <address className="not-italic leading-relaxed">
              <p className="text-foreground font-medium">
                {t('s2.controllerName')}
              </p>
              <p>
                <a href={`mailto:${email}`} className="text-primary underline">
                  {email}
                </a>
              </p>
              <p>{info.phone}</p>
              <p>{info.mobile}</p>
              {info.address.split(',').map((line, i) => (
                <p key={i}>{line.trim()}</p>
              ))}
            </address>
            <p className="leading-relaxed">{t('s2.controllerNote')}</p>
          </Block>

          <Block
            title={t('s2.storageTitle')}
            paragraphs={[t('s2.storageText')]}
          />

          <Block
            title={t('s2.legalBasisTitle')}
            paragraphs={[
              t('s2.legalBasisText1'),
              t('s2.legalBasisText2'),
              t('s2.legalBasisText3'),
            ]}
          />

          <Block
            title={t('s2.recipientsTitle')}
            paragraphs={[t('s2.recipientsText')]}
          />

          <Block
            title={t('s2.revocationTitle')}
            paragraphs={[t('s2.revocationText')]}
          />

          <Block
            title={t('s2.objectionTitle')}
            paragraphs={[t('s2.objectionText1'), t('s2.objectionText2')]}
          />

          <Block
            title={t('s2.complaintTitle')}
            paragraphs={[t('s2.complaintText')]}
          />

          <Block
            title={t('s2.portabilityTitle')}
            paragraphs={[t('s2.portabilityText')]}
          />

          <Block title={t('s2.accessTitle')} paragraphs={[t('s2.accessText')]} />

          <Block
            title={t('s2.restrictionTitle')}
            paragraphs={[t('s2.restrictionIntro')]}
          >
            <ul className="list-disc space-y-3 pl-6">
              <li className="leading-relaxed">{t('s2.restrictionItem1')}</li>
              <li className="leading-relaxed">{t('s2.restrictionItem2')}</li>
              <li className="leading-relaxed">{t('s2.restrictionItem3')}</li>
              <li className="leading-relaxed">{t('s2.restrictionItem4')}</li>
            </ul>
            <p className="leading-relaxed">{t('s2.restrictionOutro')}</p>
          </Block>

          <Block
            title={t('s2.sslTitle')}
            paragraphs={[t('s2.sslText1'), t('s2.sslText2')]}
          />

          <Block title={t('s2.spamTitle')} paragraphs={[t('s2.spamText')]} />
        </section>

        {/* 3. Datenerfassung auf dieser Website */}
        <section className="space-y-6 border-t border-border pt-10">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {t('s3.title')}
          </h2>

          <Block
            title={t('s3.contactFormTitle')}
            paragraphs={[
              t('s3.contactFormText1'),
              t('s3.contactFormText2'),
              t('s3.contactFormText3'),
            ]}
          />

          <Block
            title={t('s3.commentsTitle')}
            paragraphs={[t('s3.commentsText')]}
          />

          <Block
            title={t('s3.commentsStorageTitle')}
            paragraphs={[t('s3.commentsStorageText')]}
          />

          <Block
            title={t('s3.commentsLegalTitle')}
            paragraphs={[t('s3.commentsLegalText')]}
          />
        </section>

        <hr className="border-border" />
      </div>
    </div>
  )
}
