'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const SETTING_KEYS = [
  'contact_email',
  'contact_person',
  'phone',
  'mobile',
  'address',
  'social_linkedin',
  'social_facebook',
  'social_instagram',
] as const

type SettingKey = (typeof SETTING_KEYS)[number]
type FormState = Record<SettingKey, string>

function toFormState(data: Record<string, string>): FormState {
  return Object.fromEntries(SETTING_KEYS.map((k) => [k, data[k] ?? ''])) as FormState
}

const EMPTY: FormState = toFormState({})

export default function AdminSettingsPage() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setForm(toFormState(data))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
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
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
            <div>
              <h2 className="font-semibold text-foreground mb-1">Admin-E-Mail-Adresse</h2>
              <p className="text-xs text-muted mb-4">
                Diese Adresse empfängt alle eingehenden Bewerbungen und Kontaktnachrichten und wird
                auf der Website (Footer, Kontakt, Impressum) angezeigt.
              </p>
              <Input
                label="E-Mail-Adresse"
                type="email"
                value={form.contact_email}
                onChange={(e) => set('contact_email', e.target.value)}
                placeholder="admin@example.com"
              />
              <p className="mt-1.5 text-xs text-muted">
                Standardwert aus der Serverkonfiguration wird verwendet, wenn dieses Feld leer ist.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Kontaktdaten</h2>
            <p className="text-xs text-muted -mt-2">
              Wird im Footer, auf der Kontaktseite und im Impressum angezeigt. Leer lassen, um den
              Standardwert zu verwenden.
            </p>
            <Input
              label="Ansprechpartner"
              value={form.contact_person}
              onChange={(e) => set('contact_person', e.target.value)}
              placeholder="Vanneck Fouelefack"
            />
            <Input
              label="Telefon"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="+49 (0) 2462 9011492"
            />
            <Input
              label="Mobil"
              value={form.mobile}
              onChange={(e) => set('mobile', e.target.value)}
              placeholder="+49 (0) 1573 4393860"
            />
            <Input
              label="Adresse"
              value={form.address}
              onChange={(e) => set('address', e.target.value)}
              placeholder="Wilhelm-Busch-Straße 6, 52441 Linnich"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Soziale Netzwerke</h2>
            <p className="text-xs text-muted -mt-2">
              Vollständige URL. Leer lassen, um das Icon im Footer auszublenden.
            </p>
            <Input
              label="LinkedIn"
              value={form.social_linkedin}
              onChange={(e) => set('social_linkedin', e.target.value)}
              placeholder="https://linkedin.com/company/..."
            />
            <Input
              label="Facebook"
              value={form.social_facebook}
              onChange={(e) => set('social_facebook', e.target.value)}
              placeholder="https://facebook.com/..."
            />
            <Input
              label="Instagram"
              value={form.social_instagram}
              onChange={(e) => set('social_instagram', e.target.value)}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="sticky bottom-4 bg-white border border-gray-100 rounded-xl shadow-md px-4 py-3 flex items-center gap-3 z-10">
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
