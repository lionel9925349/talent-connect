export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getStats() {
  try {
    const [jobs, trainings, applications, contacts] = await Promise.all([
      prisma.jobOffer.count(),
      prisma.trainingOffer.count(),
      prisma.application.count(),
      prisma.contactMessage.count(),
    ])
    const [activeJobs, activeTrainings, newApplications, newContacts] = await Promise.all([
      prisma.jobOffer.count({ where: { isActive: true } }),
      prisma.trainingOffer.count({ where: { isActive: true } }),
      prisma.application.count({ where: { status: 'new' } }),
      prisma.contactMessage.count({ where: { status: 'new' } }),
    ])
    return { jobs, trainings, activeJobs, activeTrainings, applications, contacts, newApplications, newContacts }
  } catch {
    return { jobs: 0, trainings: 0, activeJobs: 0, activeTrainings: 0, applications: 0, contacts: 0, newApplications: 0, newContacts: 0 }
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Jobs total', value: stats.jobs, sub: `${stats.activeJobs} aktiv`, href: '/admin/jobs', color: 'bg-blue-50 text-primary' },
    { label: 'Formations total', value: stats.trainings, sub: `${stats.activeTrainings} aktiv`, href: '/admin/formations', color: 'bg-orange-50 text-accent' },
    { label: 'Bewerbungen', value: stats.applications, sub: `${stats.newApplications} neu`, href: '/admin/applications', color: 'bg-green-50 text-green-700' },
    { label: 'Kontaktnachrichten', value: stats.contacts, sub: `${stats.newContacts} neu`, href: '/admin/contacts', color: 'bg-purple-50 text-purple-700' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
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
            <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-accent/30 transition-all">
              <div className="text-3xl mb-3">{action.icon}</div>
              <h3 className="font-semibold text-foreground">{action.label}</h3>
              <p className="text-sm text-muted mt-1">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
