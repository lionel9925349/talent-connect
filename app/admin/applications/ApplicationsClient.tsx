'use client'

import { useState } from 'react'

type Application = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  jobTitle: string
  company: string
  fileNames: string[]
  fileKeys: string[]
  status: string
  locale: string
  createdAt: Date | string
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: 'Neu', color: 'bg-blue-100 text-blue-800' },
  read: { label: 'Gelesen', color: 'bg-gray-100 text-gray-700' },
  accepted: { label: 'Akzeptiert', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Abgelehnt', color: 'bg-red-100 text-red-700' },
}

export function ApplicationsClient({ applications: initial }: { applications: Application[] }) {
  const [applications, setApplications] = useState(initial)
  const [filter, setFilter] = useState('all')

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/admin/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  async function deleteApplication(id: number) {
    if (!confirm('Diese Bewerbung wirklich löschen?')) return
    await fetch(`/api/admin/applications/${id}`, { method: 'DELETE' })
    setApplications((prev) => prev.filter((a) => a.id !== id))
  }

  const filtered = filter === 'all' ? applications : applications.filter((a) => a.status === filter)
  const counts = applications.reduce<Record<string, number>>((acc, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Bewerbungen</h1>
          <p className="text-muted text-sm mt-1">{applications.length} Bewerbung{applications.length !== 1 ? 'en' : ''} insgesamt</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'new', 'read', 'accepted', 'rejected'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-muted hover:text-foreground'}`}
          >
            {s === 'all' ? 'Alle' : STATUS_LABELS[s]?.label}
            {s !== 'all' && counts[s] ? <span className="ml-1.5 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">{counts[s]}</span> : null}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted">Keine Bewerbungen gefunden.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const st = STATUS_LABELS[app.status] ?? { label: app.status, color: 'bg-gray-100 text-gray-700' }
            const date = new Date(app.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
            return (
              <div key={app.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-foreground">{app.firstName} {app.lastName}</h3>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span>
                      {app.status === 'new' && <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
                    </div>
                    <p className="text-sm text-muted mt-1">{app.jobTitle} — {app.company}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted flex-wrap">
                      <a href={`mailto:${app.email}`} className="hover:text-primary">{app.email}</a>
                      <span>{app.phone}</span>
                      <span>{date}</span>
                    </div>
                    {app.fileNames.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {app.fileNames.map((name, idx) => {
                          // Legacy applications (avant MinIO) ont fileNames mais
                          // pas de fileKeys correspondant → on affiche le nom
                          // sans lien plutôt qu'un href qui retournerait 404.
                          const hasFile = !!app.fileKeys[idx]
                          const cls = 'inline-flex items-center gap-1 px-2.5 py-1 bg-surface text-foreground text-xs rounded-lg border border-gray-200'
                          return hasFile ? (
                            <a
                              key={`${app.id}-${idx}`}
                              href={`/api/admin/applications/${app.id}/files/${idx}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${cls} hover:border-primary hover:text-primary transition-colors`}
                            >
                              📎 <span className="truncate max-w-[200px]">{name}</span>
                            </a>
                          ) : (
                            <span
                              key={`${app.id}-${idx}`}
                              title="Datei nicht mehr verfügbar (Legacy)"
                              className={`${cls} opacity-60 cursor-not-allowed`}
                            >
                              📎 <span className="truncate max-w-[200px]">{name}</span>
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="new">Neu</option>
                      <option value="read">Gelesen</option>
                      <option value="accepted">Akzeptiert</option>
                      <option value="rejected">Abgelehnt</option>
                    </select>
                    <a
                      href={`mailto:${app.email}?subject=Re: Bewerbung ${app.jobTitle}`}
                      className="text-sm px-3 py-1.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      Antworten
                    </a>
                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="text-sm px-2 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Löschen"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
