import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { isAllowedOrigin } from '@/lib/origin'

function req(origin: string | null): Request {
  const headers = new Headers()
  if (origin !== null) headers.set('origin', origin)
  return new Request('https://example.com', { method: 'POST', headers })
}

const originalEnv = { ...process.env }

beforeEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://mf-talent-connect.de'
})

afterEach(() => {
  process.env = { ...originalEnv }
})

describe('isAllowedOrigin (production)', () => {
  beforeEach(() => {
    ;(process.env as Record<string, string>).NODE_ENV = 'production'
  })

  it('accepts the configured origin', () => {
    expect(isAllowedOrigin(req('https://mf-talent-connect.de'))).toBe(true)
  })

  it('rejects a foreign origin', () => {
    expect(isAllowedOrigin(req('https://evil.example'))).toBe(false)
  })

  it('rejects missing Origin in prod', () => {
    expect(isAllowedOrigin(req(null))).toBe(false)
  })
})

describe('isAllowedOrigin (development)', () => {
  beforeEach(() => {
    ;(process.env as Record<string, string>).NODE_ENV = 'development'
  })

  it('accepts missing Origin in dev (curl/postman)', () => {
    expect(isAllowedOrigin(req(null))).toBe(true)
  })

  it('still rejects an explicit foreign origin in dev', () => {
    expect(isAllowedOrigin(req('https://evil.example'))).toBe(false)
  })
})
