export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'

interface Props {
  params: Promise<{ id: string; locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const trainingId = parseInt(id, 10)
  if (isNaN(trainingId)) return {}
  try {
    const training = await prisma.trainingOffer.findUnique({ where: { id: trainingId } })
    if (!training) return {}
    return {
      title: `${training.title} — ${training.sector} | M&F Talent Connect`,
      description: training.description.slice(0, 155),
    }
  } catch { return {} }
}

export default async function AusbildungDetailPage({ params }: Props) {
  const { id, locale } = await params
  const trainingId = parseInt(id, 10)
  if (isNaN(trainingId)) notFound()

  const t = await getTranslations('training.detail')

  let training
  try {
    training = await prisma.trainingOffer.findUnique({ where: { id: trainingId } })
  } catch {
    notFound()
  }
  if (!training || !training.isActive) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href={`/${locale}/ausbildungsangebote`} className="text-muted hover:text-primary text-sm flex items-center gap-1 mb-6">
        {t('back')}
      </Link>

      <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            {training.title}
          </h1>
          <p className="text-accent font-medium mt-1">{training.sector}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: t('location'), value: training.location },
            { label: t('duration'), value: training.duration },
            { label: t('start'), value: training.startDate },
          ].map((info) => (
            <div key={info.label} className="bg-surface rounded-lg p-3">
              <p className="text-xs text-muted uppercase tracking-wide">{info.label}</p>
              <p className="font-medium text-foreground mt-1">{info.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('description')}
            </h2>
            <p className="text-muted whitespace-pre-line leading-relaxed">{training.description}</p>
          </div>
          <div>
            <h2 className="font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('conditions')}
            </h2>
            <p className="text-muted whitespace-pre-line leading-relaxed">{training.conditions}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <Button href={`/${locale}/kontakt`} size="lg">{t('applyBtn')}</Button>
        </div>
      </div>
    </div>
  )
}
