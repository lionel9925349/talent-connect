'use server'

import { headers } from 'next/headers'
import { after } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendMail } from '@/lib/mailer'
import { rateLimit } from '@/lib/rateLimit'
import { getContactEmail } from '@/lib/contactEmail'
import { contactSchema } from '@/lib/schemas'
import { renderContactEmail } from '@/lib/emails/templates'

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; error: 'rate-limited' | 'invalid' | 'server' }

const INITIAL: ContactState = { status: 'idle' }

export async function submitContactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Note : Next 16 vérifie déjà Origin/Host pour les Server Actions —
  // pas besoin de notre allowlist manuelle ici (mais on garde rateLimit).
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`contact:${ip}`, 3, 10 * 60 * 1000)) {
    return { status: 'error', error: 'rate-limited' }
  }

  const parsed = contactSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone') ?? undefined,
    message: formData.get('message'),
    type: formData.get('type') ?? undefined,
    locale: formData.get('locale') ?? undefined,
  })
  if (!parsed.success) return { status: 'error', error: 'invalid' }

  const { firstName, lastName, email, phone, message, type, locale } = parsed.data

  try {
    const [, contactEmail] = await Promise.all([
      prisma.contactMessage.create({
        data: { firstName, lastName, email, phone, type, message, locale },
      }),
      getContactEmail(),
    ])

    // Envoi SMTP en tâche de fond — on retourne 200 immédiatement au client.
    const { subject, html } = renderContactEmail({ locale, firstName, lastName, email, phone, type, message })
    after(async () => {
      try {
        await sendMail({ to: contactEmail, replyTo: email, subject, html })
      } catch (err) {
        console.error('Contact mail (after) failed:', err)
      }
    })

    return INITIAL.status === 'idle' ? { status: 'success' } : INITIAL
  } catch (err) {
    console.error('Contact action error:', err)
    return { status: 'error', error: 'server' }
  }
}
