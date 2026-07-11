import { describe, expect, it } from 'vitest'
import { matchesMimeSignature } from '@/lib/fileSignature'

const u8 = (bytes: number[]) => new Uint8Array(bytes)

describe('matchesMimeSignature', () => {
  it('accepts PDF magic', () => {
    expect(matchesMimeSignature('application/pdf', u8([0x25, 0x50, 0x44, 0x46, 0]))).toBe(true)
  })

  it('rejects fake PDF (wrong magic)', () => {
    expect(matchesMimeSignature('application/pdf', u8([0xff, 0xd8, 0xff]))).toBe(false)
  })

  it('accepts JPG magic', () => {
    expect(matchesMimeSignature('image/jpeg', u8([0xff, 0xd8, 0xff, 0xe0]))).toBe(true)
  })

  it('accepts PNG magic', () => {
    expect(
      matchesMimeSignature('image/png', u8([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
    ).toBe(true)
  })

  it('accepts docx (ZIP) magic', () => {
    expect(
      matchesMimeSignature(
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        u8([0x50, 0x4b, 0x03, 0x04]),
      ),
    ).toBe(true)
  })

  it('accepts legacy .doc (CFB) magic', () => {
    expect(
      matchesMimeSignature(
        'application/msword',
        u8([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
      ),
    ).toBe(true)
  })

  it('rejects unknown MIME', () => {
    expect(matchesMimeSignature('application/x-evil', u8([0x25, 0x50]))).toBe(false)
  })

  it('rejects too-short buffer', () => {
    expect(matchesMimeSignature('application/pdf', u8([0x25]))).toBe(false)
  })
})
