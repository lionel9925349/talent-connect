/**
 * Vérifie qu'un buffer commence par la "magic number" attendue pour son MIME.
 * On ne se fie pas au type envoyé par le client (falsifiable) pour des uploads
 * destinés à être renvoyés par mail.
 */

// PDF: %PDF
const PDF = [0x25, 0x50, 0x44, 0x46]
// JPG: FF D8 FF
const JPG = [0xff, 0xd8, 0xff]
// PNG: 89 50 4E 47 0D 0A 1A 0A
const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
// ZIP (docx/xlsx/pptx): PK\x03\x04
const ZIP = [0x50, 0x4b, 0x03, 0x04]
// DOC (CFB): D0 CF 11 E0 A1 B1 1A E1
const DOC = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]

function startsWith(bytes: Uint8Array, sig: number[]): boolean {
  if (bytes.length < sig.length) return false
  for (let i = 0; i < sig.length; i++) if (bytes[i] !== sig[i]) return false
  return true
}

const MIME_TO_SIGS: Record<string, number[][]> = {
  'application/pdf': [PDF],
  'image/jpeg': [JPG],
  'image/png': [PNG],
  'application/msword': [DOC],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [ZIP],
}

/** Renvoie true si le contenu correspond à au moins une signature attendue pour ce MIME. */
export function matchesMimeSignature(mime: string, bytes: Uint8Array): boolean {
  const sigs = MIME_TO_SIGS[mime]
  if (!sigs) return false
  return sigs.some((sig) => startsWith(bytes, sig))
}
