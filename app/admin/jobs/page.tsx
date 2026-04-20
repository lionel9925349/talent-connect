export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

async function getJobs() {
  try {
    return await prisma.jobOffer.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    return []
  }
}

export default async function AdminJobsPage() {
  const jobs = await getJobs()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>
          Jobangebote
        </h1>
        <Button href="/admin/jobs/new" size="sm">+ Neue Stelle</Button>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-[#6B7280]">Noch keine Jobangebote. Erstellen Sie das erste!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 font-semibold text-[#6B7280]">Titel</th>
                <th className="text-left p-4 font-semibold text-[#6B7280]">Unternehmen</th>
                <th className="text-left p-4 font-semibold text-[#6B7280]">Typ</th>
                <th className="text-left p-4 font-semibold text-[#6B7280]">Status</th>
                <th className="text-right p-4 font-semibold text-[#6B7280]">Aktion</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-50 hover:bg-[#F7F8FA] transition-colors">
                  <td className="p-4 font-medium text-[#1A1A2E]">{job.title}</td>
                  <td className="p-4 text-[#6B7280]">{job.company}</td>
                  <td className="p-4">
                    <Badge variant={job.contractType === 'Vollzeit' ? 'vollzeit' : job.contractType === 'Teilzeit' ? 'teilzeit' : 'minijob'}>
                      {job.contractType}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={job.isActive ? 'active' : 'archived'}>
                      {job.isActive ? 'Aktiv' : 'Archiviert'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/jobs/${job.id}`} className="text-[#1A3A6B] hover:text-[#E87722] font-medium transition-colors">
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
