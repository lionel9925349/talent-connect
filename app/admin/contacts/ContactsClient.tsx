'use client'

import { useState } from 'react'

type ContactMessage = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string | null
  type: string
  message: string
  status: string
  locale: string
  createdAt: Date | string
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: 'Neu', color: 'bg-blue-100 text-blue-800' },
  read: { label: 'Gelesen', color: 'bg-gray-100 text-gray-700' },
  replied: { label: 'Beantwortet', color: 'bg-green-100 text-green-800' },
}

const TYPE_LABELS: Record<string, string> = {
  bewerber: 'Bewerber',
  unternehmen: 'Unternehmen',
  sonstiges: 'Sonstiges',
}

export function ContactsClient({ messages: initial }: { messages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initial)
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState<number | null>(null)

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/admin/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
  }

  async function deleteMessage(id: number) {
    if (!confirm('Diese Nachricht wirklich löschen?')) return
    await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const filtered = filter === 'all' ? messages : messages.filter((m) => m.status === filter)
  const counts = messages.reduce<Record<string, number>>((acc, m) => { acc[m.status] = (acc[m.status] || 0) + 1; return acc }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Kontaktnachrichten</h1>
          <p className="text-muted text-sm mt-1">{messages.length} Nachricht{messages.length !== 1 ? 'en' : ''} insgesamt</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'new', 'read', 'replied'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-muted hover:text-foreground'}`}
          >
            {s === 'all' ? 'Alle' : STATUS_LABELS[s]?.label}
            {s !== 'all' && counts[s] ? <span className="ml-1.5 text-xs">({counts[s]})</span> : null}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted">Keine Nachrichten gefunden.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => {
            const st = STATUS_LABELS[msg.status] ?? { label: msg.status, color: 'bg-gray-100 text-gray-700' }
            const date = new Date(msg.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
            const isOpen = expanded === msg.id
            return (
              <div key={msg.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-foreground">{msg.firstName} {msg.lastName}</h3>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{TYPE_LABELS[msg.type] ?? msg.type}</span>
                        {msg.status === 'new' && <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted flex-wrap">
                        <a href={`mailto:${msg.email}`} className="hover:text-primary">{msg.email}</a>
                        {msg.phone && <span>{msg.phone}</span>}
                        <span>{date}</span>
                      </div>
                      <p className={`mt-3 text-sm text-muted ${isOpen ? '' : 'line-clamp-2'}`}>{msg.message}</p>
                      {msg.message.length > 120 && (
                        <button onClick={() => setExpanded(isOpen ? null : msg.id)} className="text-xs text-primary mt-1 hover:underline">
                          {isOpen ? 'Weniger anzeigen' : 'Mehr anzeigen'}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={msg.status}
                        onChange={(e) => updateStatus(msg.id, e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="new">Neu</option>
                        <option value="read">Gelesen</option>
                        <option value="replied">Beantwortet</option>
                      </select>
                      <a
                        href={`mailto:${msg.email}?subject=Re: Ihre Anfrage`}
                        className="text-sm px-3 py-1.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                      >
                        Antworten
                      </a>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="text-sm px-2 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Löschen"
                      >
                        ✕
                      </button>
                    </div>
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
