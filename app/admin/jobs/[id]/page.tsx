'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface JobForm {
  title: string
  company: string
  location: string
  contractType: string
  description: string
  requirements: string
  isActive: boolean
}

export default function EditJobPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [form, setForm] = useState<JobForm | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/jobs/${id}`)
      .then((r) => r.json())
      .then(setForm)
  }, [id])

  function set(field: string, value: string | boolean) {
    setForm((prev) => prev ? { ...prev, [field]: value } : prev)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch(`/api/admin/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    router.push('/admin/jobs')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Diese Stelle wirklich löschen?')) return
    setDeleting(true)
    await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' })
    router.push('/admin/jobs')
    router.refresh()
  }

  if (!form) return <p className="text-muted">Laden...</p>

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/jobs" className="text-muted hover:text-primary text-sm">← Zurück</Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">Stelle bearbeiten</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Stellentitel" value={form.title} onChange={(e) => set('title', e.target.value)} required />
          <Input label="Unternehmen" value={form.company} onChange={(e) => set('company', e.target.value)} required />
          <Input label="Standort" value={form.location} onChange={(e) => set('location', e.target.value)} required />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">Vertragstyp</label>
            <select value={form.contractType} onChange={(e) => set('contractType', e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Vollzeit</option>
              <option>Teilzeit</option>
              <option>Minijob</option>
            </select>
          </div>
          <Textarea label="Beschreibung" value={form.description} onChange={(e) => set('description', e.target.value)} required rows={5} />
          <Textarea label="Anforderungen" value={form.requirements} onChange={(e) => set('requirements', e.target.value)} required rows={5} />
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} className="w-4 h-4 accent-primary" />
            <span className="text-sm font-medium text-foreground">Aktiv (öffentlich sichtbar)</span>
          </label>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving}>{saving ? 'Speichern...' : 'Änderungen speichern'}</Button>
            <Button type="button" variant="outline" onClick={handleDelete} disabled={deleting} className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-400">
              {deleting ? 'Löschen...' : 'Löschen'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
