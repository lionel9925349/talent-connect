'use server'

import { headers } from 'next/headers'
import { after } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendMail } from '@/lib/mailer'
import { rateLimit } from '@/lib/rateLimit'
import { getContactEmail } from '@/lib/contactEmail'
import { UPLOAD } from '@/lib/validation'
import { matchesMimeSignature } from '@/lib/fileSignature'
import {
  deleteApplicationFiles,
  presignedDownloadUrl,
  putApplicationFile,
} from '@/lib/minio'
import {
  renderApplicationAdminEmail,
  renderApplicationConfirmEmail,
  type Locale,
} from '@/lib/emails/templates'

const applyFieldsSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(1).max(40),
  jobId: z
    .string()
    .trim()
    .max(20)
    .transform((v): number | null => {
      const n = Number(v)
      return Number.isInteger(n) && n >= 1 ? n : null
    }),
  locale: z.enum(['de', 'en']).default('de'),
})

export type ApplyState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; error: 'rate-limited' | 'invalid' | 'too-many-files' | 'invalid-file' | 'job-not-found' | 'server' }

export async function submitApplyAction(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`apply:${ip}`, 5, 10 * 60 * 1000)) {
    return { status: 'error', error: 'rate-limited' }
  }

  const parsed = applyFieldsSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    jobId: formData.get('jobId'),
    locale: formData.get('locale') ?? undefined,
  })
  if (!parsed.success) return { status: 'error', error: 'invalid' }
  const { firstName, lastName, email, phone, jobId, locale } = parsed.data
  const safeLocale: Locale = locale

  if (jobId === null) return { status: 'error', error: 'job-not-found' }
  const job = await prisma.jobOffer.findUnique({
    where: { id: jobId },
    select: { title: true, company: true, isActive: true },
  })
  if (!job || !job.isActive) return { status: 'error', error: 'job-not-found' }
  const jobTitle = job.title
  const company = job.company

  // Validation des fichiers (taille, MIME, magic-bytes)
  const rawFiles = formData.getAll('files')
  const prepared: { buffer: Buffer; name: string; contentType: string }[] = []
  let totalSize = 0
  for (const entry of rawFiles) {
    if (!(entry instanceof File) || entry.size === 0) continue
    if (prepared.length >= UPLOAD.maxFiles) return { status: 'error', error: 'too-many-files' }
    if (entry.size > UPLOAD.maxFileSize || !UPLOAD.acceptedTypes.includes(entry.type)) {
      return { status: 'error', error: 'invalid-file' }
    }
    totalSize += entry.size
    if (totalSize > UPLOAD.maxTotalSize) return { status: 'error', error: 'invalid-file' }
    const buffer = Buffer.from(await entry.arrayBuffer())
    if (!matchesMimeSignature(entry.type, buffer.subarray(0, 16))) {
      return { status: 'error', error: 'invalid-file' }
    }
    prepared.push({ buffer, name: entry.name, contentType: entry.type })
  }

  const uploadedKeys: string[] = []
  let dbRowCreated = false
  try {
    const fileNames: string[] = []
    const fileKeys: string[] = []
    if (prepared.length > 0) {
      const results = await Promise.all(
        prepared.map((f) =>
          putApplicationFile(f.buffer, f.name, f.contentType).then((key) => {
            uploadedKeys.push(key)
            return { name: f.name, key }
          }),
        ),
      )
      for (const r of results) {
        fileNames.push(r.name)
        fileKeys.push(r.key)
      }
    }

    const [, contactEmail] = await Promise.all([
      prisma.application
        .create({
          data: {
            firstName,
            lastName,
            email,
            phone,
            jobId,
            jobTitle,
            company,
            fileNames,
            fileKeys,
            locale: safeLocale,
          },
        })
        .then((row) => {
          dbRowCreated = true
          return row
        }),
      getContactEmail(),
    ])

    // Liens + envoi des emails APRÈS la réponse client : le user n'attend pas SMTP.
    after(async () => {
      try {
        const attachmentUrls = await Promise.all(fileKeys.map((k) => presignedDownloadUrl(k)))
        const emailInput = {
          locale: safeLocale,
          firstName,
          lastName,
          email,
          phone,
          jobTitle,
          company,
          attachmentCount: fileNames.length,
          attachmentNames: fileNames,
          attachmentUrls,
        }
        const adminMail = renderApplicationAdminEmail(emailInput)
        const confirmMail = renderApplicationConfirmEmail(emailInput)
        await Promise.allSettled([
          sendMail({ to: contactEmail, replyTo: email, subject: adminMail.subject, html: adminMail.html }),
          sendMail({ to: email, subject: confirmMail.subject, html: confirmMail.html }),
        ])
      } catch (err) {
        console.error('Apply mail (after) failed:', err)
      }
    })

    return { status: 'success' }
  } catch (err) {
    console.error('Apply action error:', err)
    if (uploadedKeys.length > 0 && !dbRowCreated) {
      await deleteApplicationFiles(uploadedKeys)
    }
    return { status: 'error', error: 'server' }
  }
}
