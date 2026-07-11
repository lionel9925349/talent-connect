import { describe, expect, it } from 'vitest'
import {
  contactSchema,
  jobCreateSchema,
  trainingCreateSchema,
  heroSchema,
  applicationStatusPatchSchema,
  contactStatusPatchSchema,
} from '@/lib/schemas'

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    const r = contactSchema.safeParse({
      firstName: ' Max ',
      lastName: 'Mustermann',
      email: 'max@example.com',
      message: 'Hallo!',
      type: 'bewerber',
      locale: 'de',
    })
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.firstName).toBe('Max') // trimmed
      expect(r.data.phone).toBeNull() // optional → null
    }
  })

  it('rejects invalid email', () => {
    const r = contactSchema.safeParse({
      firstName: 'A',
      lastName: 'B',
      email: 'not-an-email',
      message: 'x',
    })
    expect(r.success).toBe(false)
  })

  it('rejects empty required strings', () => {
    const r = contactSchema.safeParse({
      firstName: '   ',
      lastName: 'B',
      email: 'a@b.de',
      message: 'x',
    })
    expect(r.success).toBe(false)
  })

  it('defaults type to "sonstiges" and locale to "de"', () => {
    const r = contactSchema.safeParse({
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.de',
      message: 'x',
    })
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.type).toBe('sonstiges')
      expect(r.data.locale).toBe('de')
    }
  })

  it('rejects unknown contact type', () => {
    const r = contactSchema.safeParse({
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.de',
      message: 'x',
      type: 'spam',
    })
    expect(r.success).toBe(false)
  })
})

describe('jobCreateSchema', () => {
  it('rejects unknown contractType', () => {
    const r = jobCreateSchema.safeParse({
      title: 'Dev',
      company: 'Co',
      location: 'Berlin',
      contractType: 'Freelance',
      description: 'd',
      requirements: 'r',
    })
    expect(r.success).toBe(false)
  })

  it('accepts Vollzeit', () => {
    const r = jobCreateSchema.safeParse({
      title: 'Dev',
      company: 'Co',
      location: 'Berlin',
      contractType: 'Vollzeit',
      description: 'd',
      requirements: 'r',
    })
    expect(r.success).toBe(true)
  })
})

describe('trainingCreateSchema', () => {
  it('requires startDate', () => {
    const r = trainingCreateSchema.safeParse({
      title: 'X',
      sector: 'Y',
      duration: '3 Jahre',
      location: 'Berlin',
      description: 'd',
      conditions: 'c',
    })
    expect(r.success).toBe(false)
  })
})

describe('heroSchema', () => {
  it('treats empty eyebrow as null', () => {
    const r = heroSchema.safeParse({
      key: 'home',
      eyebrow: '   ',
      title: 'T',
      subtitle: 'S',
      ctaText: 'Go',
      ctaLink: '/x',
    })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.eyebrow).toBeNull()
  })
})

describe('status patches', () => {
  it('application accepts the right enum', () => {
    expect(applicationStatusPatchSchema.safeParse({ status: 'accepted' }).success).toBe(true)
    expect(applicationStatusPatchSchema.safeParse({ status: 'replied' }).success).toBe(false)
  })

  it('contact uses a different enum', () => {
    expect(contactStatusPatchSchema.safeParse({ status: 'replied' }).success).toBe(true)
    expect(contactStatusPatchSchema.safeParse({ status: 'accepted' }).success).toBe(false)
  })
})
