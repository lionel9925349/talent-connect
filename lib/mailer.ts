import nodemailer from 'nodemailer'
import { siteConfig } from '@/lib/config'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface MailOptions {
  to: string
  replyTo?: string
  subject: string
  html: string
  attachments?: { filename: string; content: Buffer; contentType: string }[]
}

export async function sendMail(options: MailOptions) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM ?? `${siteConfig.name} <noreply@bekeletrack.de>`,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  })
}
