import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

type ContractType = 'Vollzeit' | 'Teilzeit' | 'Minijob'

interface JobCardProps {
  id: number
  title: string
  company: string
  location: string
  contractType: string
  type?: 'job' | 'training'
  sector?: string
  duration?: string
}

function getContractVariant(type: string) {
  if (type === 'Vollzeit') return 'vollzeit'
  if (type === 'Teilzeit') return 'teilzeit'
  if (type === 'Minijob') return 'minijob'
  return 'default'
}

export function JobCard({ id, title, company, location, contractType, type = 'job', sector, duration }: JobCardProps) {
  const href = type === 'job' ? `/jobangebote/${id}` : `/ausbildungsangebote/${id}`

  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-[#1A3A6B]/20 transition-all duration-200">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="font-semibold text-[#1A1A2E] group-hover:text-[#1A3A6B] transition-colors line-clamp-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h3>
          <Badge variant={getContractVariant(contractType) as Parameters<typeof Badge>[0]['variant']}>
            {contractType}
          </Badge>
        </div>

        <p className="text-[#6B7280] text-sm font-medium">{company}</p>

        {sector && <p className="text-[#6B7280] text-sm mt-1">{sector}</p>}

        <div className="flex items-center gap-1 mt-3 text-[#6B7280] text-sm">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
          {duration && <span className="ml-3">· {duration}</span>}
        </div>
      </div>
    </Link>
  )
}
