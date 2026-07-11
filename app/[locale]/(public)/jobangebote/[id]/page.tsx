export const revalidate = 60

import { cache } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/Badge'
import { ApplyForm } from '@/components/sections/ApplyForm'
import { prisma } from '@/lib/prisma'
import { parseId } from '@/lib/safeId'

interface Props {
  params: Promise<{ id: string; locale: string }>
}

const getJob = cache(async (id: number) => {
  try {
    return await prisma.jobOffer.findUnique({ where: { id } })
  } catch (err) {
    console.error('getJob error:', err)
    return null
  }
})

export async function generateMetadata({ params }: Props) {
  const { id, locale } = await params
  const jobId = parseId(id)
  if (jobId === null) return {}
  const job = await getJob(jobId)
  if (!job) return {}
  const description = job.description.slice(0, 155)
  const canonical = `/${locale}/jobangebote/${job.id}`
  return {
    title: `${job.title} bei ${job.company}`,
    description,
    alternates: { canonical },
    openGraph: { title: `${job.title} bei ${job.company}`, description, url: canonical, type: 'article' },
  }
}

const EMPLOYMENT_TYPE: Record<string, string> = {
  Vollzeit: 'FULL_TIME',
  Teilzeit: 'PART_TIME',
  Minijob: 'PART_TIME',
}

function getContractVariant(type: string) {
  if (type === 'Vollzeit') return 'vollzeit'
  if (type === 'Teilzeit') return 'teilzeit'
  if (type === 'Minijob') return 'minijob'
  return 'default'
}

export default async function JobDetailPage({ params }: Props) {
  const { id, locale } = await params
  const jobId = parseId(id)
  if (jobId === null) notFound()

  const [t, tApply, tContracts, job] = await Promise.all([
    getTranslations('jobs.detail'),
    getTranslations('apply'),
    getTranslations('contractTypes'),
    getJob(jobId),
  ])

  if (!job || !job.isActive) notFound()

  const contractLabel = tContracts.has(job.contractType)
    ? tContracts(job.contractType as 'Vollzeit' | 'Teilzeit' | 'Minijob')
    : job.contractType

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mf-talent-connect.de'
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.createdAt.toISOString(),
    employmentType: EMPLOYMENT_TYPE[job.contractType] ?? 'OTHER',
    hiringOrganization: { '@type': 'Organization', name: job.company },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: job.location, addressCountry: 'DE' },
    },
    directApply: true,
    url: `${baseUrl}/${locale}/jobangebote/${job.id}`,
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escape `</` pour empêcher la sortie de la balise <script> via
          // un contenu utilisateur contenant `</script>`.
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Link href={`/${locale}/jobangebote`} className="text-muted hover:text-primary text-sm flex items-center gap-1 mb-6">
        {t('back')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Job info */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground">
                  {job.title}
                </h1>
                <p className="text-muted mt-1">{job.company}</p>
              </div>
              <Badge variant={getContractVariant(job.contractType) as Parameters<typeof Badge>[0]['variant']}>
                {contractLabel}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-muted text-sm mb-8">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-bold text-foreground mb-3">
                  {t('description')}
                </h2>
                <p className="text-muted whitespace-pre-line leading-relaxed">{job.description}</p>
              </div>
              <div>
                <h2 className="font-heading font-bold text-foreground mb-3">
                  {t('requirements')}
                </h2>
                <p className="text-muted whitespace-pre-line leading-relaxed">{job.requirements}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Apply form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <h2 className="font-heading text-xl font-bold text-foreground mb-1">
              {tApply('sectionTitle')}
            </h2>
            <p className="text-muted text-sm mb-6">{tApply('sectionSubtitle')}</p>
            <ApplyForm jobId={job.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
