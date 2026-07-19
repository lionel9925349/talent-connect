import { getSettings } from '@/lib/settings'

/**
 * Adresse de contact : réglage admin → ADMIN_EMAIL → CONTACT_EMAIL → placeholder.
 * Serveur uniquement (les variables d'env ne sont pas NEXT_PUBLIC_).
 */
export async function getContactEmail(): Promise<string> {
  const settings = await getSettings()
  return (
    settings.contact_email ||
    process.env.ADMIN_EMAIL ||
    process.env.CONTACT_EMAIL ||
    'contact@example.com'
  )
}
