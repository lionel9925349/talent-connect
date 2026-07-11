/** Échappe les caractères HTML pour empêcher l'injection dans les emails. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Limites d'upload (alignées sur le composant client ApplyForm). */
export const UPLOAD = {
  maxFiles: 5,
  maxFileSize: 5 * 1024 * 1024, // 5 MB
  maxTotalSize: 20 * 1024 * 1024, // 20 MB
  acceptedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
  ],
}
