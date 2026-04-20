'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/config'

export default function KontaktPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      <HeroSection
        title="Kontakt"
        subtitle="Nehmen Sie Kontakt auf — wir antworten innerhalb von 24 Stunden."
        size="medium"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Schreiben Sie uns
              </h2>

              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <p className="text-green-800 font-semibold text-lg">Danke für Ihre Nachricht!</p>
                  <p className="text-green-700 text-sm mt-2">Wir melden uns so schnell wie möglich bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Vorname" name="firstName" required placeholder="Marie" />
                    <Input label="Nachname" name="lastName" required placeholder="Müller" />
                  </div>
                  <Input label="E-Mail" name="email" type="email" required placeholder="ihre@email.de" />
                  <Input label="Telefon (optional)" name="phone" type="tel" placeholder="+49 XXX XXXXXXX" />
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#1A1A2E]">Ich bin...</label>
                    <select
                      name="type"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#1A3A6B]"
                    >
                      <option value="bewerber">Bewerber / Kandidat</option>
                      <option value="unternehmen">Unternehmen</option>
                      <option value="sonstiges">Sonstiges</option>
                    </select>
                  </div>
                  <Textarea label="Nachricht" name="message" required placeholder="Wie können wir Ihnen helfen?" rows={5} />
                  <Button type="submit" disabled={loading} size="lg" className="w-full">
                    {loading ? 'Wird gesendet...' : 'Nachricht senden'}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>
                Kontaktdaten
              </h2>
              {[
                { icon: '✉️', label: 'E-Mail', value: siteConfig.email },
                { icon: '📞', label: 'Telefon', value: siteConfig.phone },
                { icon: '📍', label: 'Adresse', value: siteConfig.address },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#E87722]/10 rounded-lg flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">{item.label}</p>
                    <p className="font-medium text-[#1A1A2E]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
