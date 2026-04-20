'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function NewFormationPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    sector: '',
    duration: '',
    location: '',
    description: '',
    conditions: '',
    startDate: '',
  })

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/formations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/formations')
      router.refresh()
    }
    setSaving(false)
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/formations" className="text-[#6B7280] hover:text-[#1A3A6B] text-sm">← Zurück</Link>
        <h1 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>Neue Formation</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Titel" value={form.title} onChange={(e) => set('title', e.target.value)} required />
          <Input label="Bereich / Sektor" value={form.sector} onChange={(e) => set('sector', e.target.value)} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Dauer" value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="z.B. 3 Jahre" required />
            <Input label="Standort" value={form.location} onChange={(e) => set('location', e.target.value)} required />
          </div>
          <Input label="Startdatum" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} placeholder="z.B. September 2025" required />
          <Textarea label="Beschreibung" value={form.description} onChange={(e) => set('description', e.target.value)} required rows={5} />
          <Textarea label="Zugangsbedingungen" value={form.conditions} onChange={(e) => set('conditions', e.target.value)} required rows={4} />
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving}>{saving ? 'Speichern...' : 'Formation erstellen'}</Button>
            <Button href="/admin/formations" variant="outline">Abbrechen</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
