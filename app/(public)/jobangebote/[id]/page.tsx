import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'

interface Props {
  params: Promise<{ id: string }>
}

function getContractVariant(type: string) {
  if (type === 'Vollzeit') return 'vollzeit'
  if (type === 'Teilzeit') return 'teilzeit'
  if (type === 'Minijob') return 'minijob'
  return 'default'
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params
  const jobId = parseInt(id, 10)
  if (isNaN(jobId)) notFound()

  let job
  try {
    job = await prisma.jobOffer.findUnique({ where: { id: jobId } })
  } catch {
    notFound()
  }
  if (!job || !job.isActive) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/jobangebote" className="text-[#6B7280] hover:text-[#1A3A6B] text-sm flex items-center gap-1 mb-6">
        ← Zurück zu Jobangeboten
      </Link>

      <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>
              {job.title}
            </h1>
            <p className="text-[#6B7280] mt-1">{job.company}</p>
          </div>
          <Badge variant={getContractVariant(job.contractType) as Parameters<typeof Badge>[0]['variant']}>
            {job.contractType}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-[#6B7280] text-sm mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Beschreibung
            </h2>
            <p className="text-[#6B7280] whitespace-pre-line leading-relaxed">{job.description}</p>
          </div>
          <div>
            <h2 className="font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Anforderungen
            </h2>
            <p className="text-[#6B7280] whitespace-pre-line leading-relaxed">{job.requirements}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <Button href="/kontakt" size="lg">Jetzt bewerben</Button>
        </div>
      </div>
    </div>
  )
}
