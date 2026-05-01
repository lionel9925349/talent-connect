export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

async function getTrainings() {
  try {
    return await prisma.trainingOffer.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    return []
  }
}

export default async function AdminFormationsPage() {
  const trainings = await getTrainings()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
          Ausbildungsangebote
        </h1>
        <Button href="/admin/formations/new" size="sm">+ Neue Formation</Button>
      </div>

      {trainings.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-muted">Noch keine Ausbildungsangebote. Erstellen Sie das erste!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 font-semibold text-muted">Titel</th>
                <th className="text-left p-4 font-semibold text-muted">Bereich</th>
                <th className="text-left p-4 font-semibold text-muted">Dauer</th>
                <th className="text-left p-4 font-semibold text-muted">Status</th>
                <th className="text-right p-4 font-semibold text-muted">Aktion</th>
              </tr>
            </thead>
            <tbody>
              {trainings.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-surface transition-colors">
                  <td className="p-4 font-medium text-foreground">{t.title}</td>
                  <td className="p-4 text-muted">{t.sector}</td>
                  <td className="p-4 text-muted">{t.duration}</td>
                  <td className="p-4">
                    <Badge variant={t.isActive ? 'active' : 'archived'}>
                      {t.isActive ? 'Aktiv' : 'Archiviert'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/formations/${t.id}`} className="text-primary hover:text-accent font-medium transition-colors">
                      Bearbeiten
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
