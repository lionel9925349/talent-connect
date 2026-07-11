'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function NewJobPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    contractType: 'Vollzeit',
    description: '',
    requirements: '',
  })

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/jobs')
      router.refresh()
    }
    setSaving(false)
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/jobs" className="text-muted hover:text-primary text-sm">← Zurück</Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">Neue Stelle</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Stellentitel" value={form.title} onChange={(e) => set('title', e.target.value)} required />
          <Input label="Unternehmen" value={form.company} onChange={(e) => set('company', e.target.value)} required />
          <Input label="Standort" value={form.location} onChange={(e) => set('location', e.target.value)} required />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">Vertragstyp</label>
            <select
              value={form.contractType}
              onChange={(e) => set('contractType', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Vollzeit</option>
              <option>Teilzeit</option>
              <option>Minijob</option>
            </select>
          </div>
          <Textarea label="Beschreibung" value={form.description} onChange={(e) => set('description', e.target.value)} required rows={5} />
          <Textarea label="Anforderungen" value={form.requirements} onChange={(e) => set('requirements', e.target.value)} required rows={5} />
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving}>{saving ? 'Speichern...' : 'Stelle erstellen'}</Button>
            <Button href="/admin/jobs" variant="outline">Abbrechen</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
