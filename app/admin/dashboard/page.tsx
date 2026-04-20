import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getStats() {
  try {
    const [jobs, trainings] = await Promise.all([
      prisma.jobOffer.count(),
      prisma.trainingOffer.count(),
    ])
    const activeJobs = await prisma.jobOffer.count({ where: { isActive: true } })
    const activeTrainings = await prisma.trainingOffer.count({ where: { isActive: true } })
    return { jobs, trainings, activeJobs, activeTrainings }
  } catch {
    return { jobs: 0, trainings: 0, activeJobs: 0, activeTrainings: 0 }
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Jobs total', value: stats.jobs, sub: `${stats.activeJobs} aktiv`, href: '/admin/jobs', color: 'bg-blue-50 text-[#1A3A6B]' },
    { label: 'Formations total', value: stats.trainings, sub: `${stats.activeTrainings} aktiv`, href: '/admin/formations', color: 'bg-orange-50 text-[#E87722]' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className={`${card.color} rounded-xl p-6 hover:shadow-md transition-shadow`}>
              <p className="text-sm font-medium opacity-80">{card.label}</p>
              <p className="text-4xl font-bold mt-1" style={{ fontFamily: 'var(--font-heading)' }}>{card.value}</p>
              <p className="text-xs mt-2 opacity-70">{card.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Hero bearbeiten', href: '/admin/hero', icon: '🖼️', desc: 'Startseiten-Bannertexte ändern' },
          { label: 'Job hinzufügen', href: '/admin/jobs/new', icon: '➕', desc: 'Neue Stelle ausschreiben' },
          { label: 'Formation hinzufügen', href: '/admin/formations/new', icon: '🎓', desc: 'Neues Ausbildungsangebot' },
        ].map((action) => (
          <Link key={action.href} href={action.href}>
            <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-[#E87722]/30 transition-all">
              <div className="text-3xl mb-3">{action.icon}</div>
              <h3 className="font-semibold text-[#1A1A2E]">{action.label}</h3>
              <p className="text-sm text-[#6B7280] mt-1">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
