'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function AdminSettingsPage() {
  const [contactEmail, setContactEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setContactEmail(data.contact_email ?? '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact_email: contactEmail }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <p className="text-muted">Laden...</p>

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
        Einstellungen
      </h1>
      <p className="text-muted text-sm mb-8">Allgemeine Konfiguration der Website</p>

      <div className="max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
          <div>
            <h2 className="font-semibold text-foreground mb-1">Admin-E-Mail-Adresse</h2>
            <p className="text-xs text-muted mb-4">
              Diese Adresse empfängt alle eingehenden Bewerbungen und Kontaktnachrichten vom Site.
            </p>
            <Input
              label="E-Mail-Adresse des Administrators"
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="admin@example.com"
            />
            <p className="mt-1.5 text-xs text-muted">
              Standardwert aus der Serverkonfiguration wird verwendet, wenn dieses Feld leer ist.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={saving}>
              {saving ? 'Speichern...' : 'Speichern'}
            </Button>
            {saved && <span className="text-green-600 text-sm font-medium">✓ Gespeichert</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
