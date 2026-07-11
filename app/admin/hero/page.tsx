'use client'

import { useState, useEffect } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface HeroData {
  key: string
  eyebrow: string
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
}

const defaultHeroes: HeroData[] = [
  { key: 'home_hero', eyebrow: 'Fachkräfte & Azubis für Deutschland', title: 'Fachkräfte finden statt suchen – Ihr Partner für passgenaue Vermittlung von Talenten und Azubis', subtitle: 'M&F Talent Connect verbindet Fachkräfte und Ausbildungssuchende aus dem Ausland mit deutschen Unternehmen — für eine gemeinsame Zukunft.', ctaText: 'Jetzt bewerben', ctaLink: '/kontakt' },
]

export default function AdminHeroPage() {
  const [heroes, setHeroes] = useState<HeroData[]>([])
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/hero')
      .then((r) => r.json())
      .then((data: HeroData[]) => {
        setHeroes(
          data.length
            ? data.map((h) => ({ ...h, eyebrow: h.eyebrow ?? '' }))
            : defaultHeroes,
        )
        setLoading(false)
      })
      .catch(() => {
        setHeroes(defaultHeroes)
        setLoading(false)
      })
  }, [])

  function update(key: string, field: keyof HeroData, value: string) {
    setHeroes((prev) => prev.map((h) => (h.key === key ? { ...h, [field]: value } : h)))
  }

  async function save(hero: HeroData) {
    setSaving(hero.key)
    await fetch('/api/admin/hero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hero),
    })
    setSaving(null)
    setSaved(hero.key)
    setTimeout(() => setSaved(null), 2000)
  }

  if (loading) return <p className="text-muted">Laden...</p>

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-8">
        Hero / Bannières
      </h1>

      <div className="space-y-6">
        {heroes.map((hero) => (
          <div key={hero.key} className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide text-muted">
              {hero.key}
            </h2>
            <div className="space-y-4">
              <Input
                label="Eyebrow (kleine Zeile über dem Titel — optional)"
                value={hero.eyebrow}
                onChange={(e) => update(hero.key, 'eyebrow', e.target.value)}
                placeholder="z. B. Fachkräfte & Azubis für Deutschland"
              />
              <Input label="Titel" value={hero.title} onChange={(e) => update(hero.key, 'title', e.target.value)} />
              <Textarea label="Untertitel" value={hero.subtitle} onChange={(e) => update(hero.key, 'subtitle', e.target.value)} rows={3} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="CTA Text" value={hero.ctaText} onChange={(e) => update(hero.key, 'ctaText', e.target.value)} />
                <Input label="CTA Link" value={hero.ctaLink} onChange={(e) => update(hero.key, 'ctaLink', e.target.value)} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={() => save(hero)} disabled={saving === hero.key}>
                {saving === hero.key ? 'Speichern...' : 'Speichern'}
              </Button>
              {saved === hero.key && <span className="text-green-600 text-sm">✓ Gespeichert</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
