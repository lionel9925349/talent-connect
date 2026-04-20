export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AusbildungDetailPage({ params }: Props) {
  const { id } = await params
  const trainingId = parseInt(id, 10)
  if (isNaN(trainingId)) notFound()

  let training
  try {
    training = await prisma.trainingOffer.findUnique({ where: { id: trainingId } })
  } catch {
    notFound()
  }
  if (!training || !training.isActive) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/ausbildungsangebote" className="text-[#6B7280] hover:text-[#1A3A6B] text-sm flex items-center gap-1 mb-6">
        ← Zurück zu Ausbildungsangeboten
      </Link>

      <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>
            {training.title}
          </h1>
          <p className="text-[#E87722] font-medium mt-1">{training.sector}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Standort', value: training.location },
            { label: 'Dauer', value: training.duration },
            { label: 'Beginn', value: training.startDate },
          ].map((info) => (
            <div key={info.label} className="bg-[#F7F8FA] rounded-lg p-3">
              <p className="text-xs text-[#6B7280] uppercase tracking-wide">{info.label}</p>
              <p className="font-medium text-[#1A1A2E] mt-1">{info.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Beschreibung
            </h2>
            <p className="text-[#6B7280] whitespace-pre-line leading-relaxed">{training.description}</p>
          </div>
          <div>
            <h2 className="font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Zugangsbedingungen
            </h2>
            <p className="text-[#6B7280] whitespace-pre-line leading-relaxed">{training.conditions}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <Button href="/kontakt" size="lg">Jetzt bewerben</Button>
        </div>
      </div>
    </div>
  )
}
