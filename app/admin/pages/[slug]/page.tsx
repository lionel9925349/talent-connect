'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

type FieldType = 'text' | 'textarea' | 'list' | 'card-list' | 'step-list'
interface FieldDef {
  id: string
  label: string
  type: FieldType
  hint?: string
}

interface PageData {
  slug: string
  locale: string
  label: string
  description?: string
  locales: string[]
  fields: FieldDef[]
  content: Record<string, unknown>
}

export default function EditPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [locale, setLocale] = useState('de')
  const [data, setData] = useState<PageData | null>(null)
  const [content, setContent] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/admin/pages?slug=${slug}&locale=${locale}`)
      .then((r) => r.json())
      .then((d: PageData) => {
        if (cancelled) return
        setData(d)
        setContent(d.content || {})
        setSaved(false)
        setError(null)
      })
      .catch(() => {
        if (!cancelled) setError('Inhalte konnten nicht geladen werden.')
      })
    return () => {
      cancelled = true
    }
  }, [slug, locale])

  function setField(id: string, value: unknown) {
    setContent((prev) => ({ ...prev, [id]: value }))
    setSaved(false)
  }

  async function save() {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, locale, content }),
      })
      if (!res.ok) throw new Error()
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setError('Speichern fehlgeschlagen. Bitte erneut versuchen.')
    }
    setSaving(false)
  }

  if (!data) return <p className="text-muted">Wird geladen…</p>

  return (
    <div>
      <Link href="/admin/pages" className="text-sm text-muted hover:text-primary">
        ← Zurück zur Übersicht
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2 mb-8">
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {data.label}
          </h1>
          {data.description && <p className="text-muted mt-1">{data.description}</p>}
        </div>
        <div className="flex gap-2">
          {data.locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                locale === l
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-muted border-gray-200 hover:border-primary'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {data.fields.map((field) => (
          <FieldEditor
            key={field.id}
            field={field}
            value={content[field.id]}
            onChange={(v) => setField(field.id, v)}
          />
        ))}
      </div>

      <div className="mt-8 sticky bottom-4 bg-white border border-gray-100 rounded-xl shadow-md px-4 py-3 flex items-center justify-between gap-3 z-10">
        <div className="text-sm">
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : saved ? (
            <span className="text-green-600 font-medium">✓ Änderungen gespeichert</span>
          ) : (
            <span className="text-muted">Sprache: <strong>{locale.toUpperCase()}</strong></span>
          )}
        </div>
        <Button onClick={save} disabled={saving}>
          {saving ? 'Speichern…' : 'Änderungen speichern'}
        </Button>
      </div>
    </div>
  )
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldDef
  value: unknown
  onChange: (v: unknown) => void
}) {
  const wrapperClass = 'bg-white rounded-xl border border-gray-100 p-5'

  if (field.type === 'text') {
    return (
      <div className={wrapperClass}>
        <Input
          label={field.label}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
        {field.hint && <p className="mt-1 text-xs text-muted">{field.hint}</p>}
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div className={wrapperClass}>
        <Textarea
          label={field.label}
          rows={4}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
        {field.hint && <p className="mt-1 text-xs text-muted">{field.hint}</p>}
      </div>
    )
  }

  if (field.type === 'list') {
    const arr = Array.isArray(value) ? (value as string[]) : []
    const text = arr.join('\n')
    return (
      <div className={wrapperClass}>
        <Textarea
          label={field.label}
          rows={Math.max(4, arr.length + 1)}
          value={text}
          onChange={(e) => onChange(e.target.value.split('\n'))}
        />
        <p className="mt-1 text-xs text-muted">
          {field.hint ?? 'Ein Eintrag pro Zeile.'}
        </p>
      </div>
    )
  }

  if (field.type === 'card-list') {
    const items = (Array.isArray(value) ? value : []) as { title: string; description: string }[]
    return (
      <div className={wrapperClass}>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-foreground">{field.label}</label>
          <button
            type="button"
            className="text-sm text-primary font-medium hover:text-primary-hover"
            onClick={() => onChange([...items, { title: '', description: '' }])}
          >
            + Eintrag hinzufügen
          </button>
        </div>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="border border-gray-100 rounded-lg p-3 bg-surface">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted font-medium">#{idx + 1}</span>
                <button
                  type="button"
                  className="text-xs text-red-600 hover:text-red-700"
                  onClick={() => onChange(items.filter((_, i) => i !== idx))}
                >
                  Entfernen
                </button>
              </div>
              <Input
                label="Titel"
                value={item.title ?? ''}
                onChange={(e) => {
                  const copy = [...items]
                  copy[idx] = { ...copy[idx], title: e.target.value }
                  onChange(copy)
                }}
              />
              <div className="mt-2">
                <Textarea
                  label="Beschreibung"
                  rows={3}
                  value={item.description ?? ''}
                  onChange={(e) => {
                    const copy = [...items]
                    copy[idx] = { ...copy[idx], description: e.target.value }
                    onChange(copy)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (field.type === 'step-list') {
    const items = (Array.isArray(value) ? value : []) as { num: string; title: string; desc: string }[]
    return (
      <div className={wrapperClass}>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-foreground">{field.label}</label>
          <button
            type="button"
            className="text-sm text-primary font-medium hover:text-primary-hover"
            onClick={() =>
              onChange([
                ...items,
                { num: String(items.length + 1).padStart(2, '0'), title: '', desc: '' },
              ])
            }
          >
            + Schritt hinzufügen
          </button>
        </div>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="border border-gray-100 rounded-lg p-3 bg-surface">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted font-medium">Schritt #{idx + 1}</span>
                <button
                  type="button"
                  className="text-xs text-red-600 hover:text-red-700"
                  onClick={() => onChange(items.filter((_, i) => i !== idx))}
                >
                  Entfernen
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  label="Nr."
                  value={item.num ?? ''}
                  onChange={(e) => {
                    const copy = [...items]
                    copy[idx] = { ...copy[idx], num: e.target.value }
                    onChange(copy)
                  }}
                />
                <div className="col-span-2">
                  <Input
                    label="Titel"
                    value={item.title ?? ''}
                    onChange={(e) => {
                      const copy = [...items]
                      copy[idx] = { ...copy[idx], title: e.target.value }
                      onChange(copy)
                    }}
                  />
                </div>
              </div>
              <div className="mt-2">
                <Textarea
                  label="Beschreibung"
                  rows={3}
                  value={item.desc ?? ''}
                  onChange={(e) => {
                    const copy = [...items]
                    copy[idx] = { ...copy[idx], desc: e.target.value }
                    onChange(copy)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}
