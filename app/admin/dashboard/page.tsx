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
    {
      label: 'Stellenangebote',
      value: stats.jobs,
      sub: `${stats.activeJobs} aktiv`,
      href: '/admin/jobs',
      ring: 'ring-blue-200',
      iconBg: 'bg-blue-50 text-primary',
      icon: '💼',
    },
    {
      label: 'Ausbildungen',
      value: stats.trainings,
      sub: `${stats.activeTrainings} aktiv`,
      href: '/admin/formations',
      ring: 'ring-orange-200',
      iconBg: 'bg-orange-50 text-accent',
      icon: '🎓',
    },
    {
      label: 'Bewerbungen',
      value: stats.applications,
      sub: `${stats.newApplications} neu`,
      href: '/admin/applications',
      ring: 'ring-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-700',
      icon: '📋',
    },
    {
      label: 'Kontaktnachrichten',
      value: stats.contacts,
      sub: `${stats.newContacts} neu`,
      href: '/admin/contacts',
      ring: 'ring-purple-200',
      iconBg: 'bg-purple-50 text-purple-700',
      icon: '✉️',
    },
  ]

  const quickActions = [
    { label: 'Hero & Banner bearbeiten', href: '/admin/hero', icon: '🖼️', desc: 'Startseiten-Bannertexte ändern' },
    { label: 'Seiten-Inhalte verwalten', href: '/admin/pages', icon: '📝', desc: 'Texte auf "Für Unternehmen", "Über uns" usw. bearbeiten' },
    { label: 'Neue Stelle ausschreiben', href: '/admin/jobs/new', icon: '➕', desc: 'Stellenangebot erstellen' },
    { label: 'Neues Ausbildungsangebot', href: '/admin/formations/new', icon: '🎓', desc: 'Ausbildungsplatz hinzufügen' },
    { label: 'E-Mail-Adresse pflegen', href: '/admin/settings', icon: '⚙️', desc: 'Empfangsadresse für Bewerbungen' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold text-foreground"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Dashboard
        </h1>
        <p className="text-muted mt-1">Übersicht über Ihre Inhalte und Anfragen.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group">
            <div className="bg-white rounded-xl p-5 ring-1 ring-gray-100 hover:ring-2 hover:shadow-md transition-all h-full">
              <div className="flex items-start justify-between">
                <div
                  className={`${card.iconBg} w-10 h-10 rounded-lg flex items-center justify-center text-lg`}
                >
                  {card.icon}
                </div>
                <span className="text-xs text-muted">{card.sub}</span>
              </div>
              <p className="text-sm text-muted mt-4">{card.label}</p>
              <p
                className="text-3xl font-bold mt-1 text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {card.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mb-4">
        <h2
          className="text-xl font-bold text-foreground"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Schnellzugriff
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-accent/40 transition-all h-full">
              <div className="text-2xl mb-3">{action.icon}</div>
              <h3 className="font-semibold text-foreground">{action.label}</h3>
              <p className="text-sm text-muted mt-1">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
