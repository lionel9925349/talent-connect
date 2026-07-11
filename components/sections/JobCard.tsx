import Link from 'next/link'
import type { Route } from 'next'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

interface JobCardProps {
  id: number
  title: string
  company: string
  location: string
  contractType: string
  type?: 'job' | 'training'
  sector?: string
  duration?: string
  locale?: string
}

function getContractVariant(type: string): BadgeVariant {
  const normalized = type.toLowerCase()
  if (normalized.includes('vollzeit')) return 'vollzeit'
  if (normalized.includes('teilzeit')) return 'teilzeit'
  if (normalized.includes('minijob')) return 'minijob'
  return 'default'
}

export function JobCard({ id, title, company, location, contractType, type = 'job', sector, duration, locale }: JobCardProps) {
  const base = type === 'job' ? '/jobangebote' : '/ausbildungsangebote'
  const href = (locale ? `/${locale}${base}/${id}` : `${base}/${id}`) as Route

  return (
    <Link href={href} className="group block h-full">
      <Card as="article" hover className="h-full overflow-hidden">
        {/* Accent edge on hover */}
        <span
          className="absolute left-0 top-0 h-full w-1 bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"
          aria-hidden="true"
        />

        <div className="flex items-start justify-between gap-3 mb-4">
          <h3
            className="font-heading font-bold text-[1.05rem] text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2"
          >
            {title}
          </h3>
          <Badge variant={getContractVariant(contractType)}>
            {contractType}
          </Badge>
        </div>

        <p className="text-foreground/80 text-sm font-semibold">{company}</p>
        {sector && <p className="text-muted text-sm mt-0.5">{sector}</p>}

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/60">
          <div className="flex items-center gap-1.5 text-muted text-sm min-w-0">
            <svg className="w-4 h-4 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">
              {location}
              {duration && <span className="text-muted/80"> · {duration}</span>}
            </span>
          </div>
          <span
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-surface text-primary translate-x-0 group-hover:translate-x-0.5 group-hover:bg-accent group-hover:text-white transition-all duration-300"
            aria-hidden="true"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Card>
    </Link>
  )
}
