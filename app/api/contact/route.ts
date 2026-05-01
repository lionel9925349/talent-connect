import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendMail } from '@/lib/mailer'
import { rateLimit } from '@/lib/rateLimit'

async function getContactEmail(): Promise<string> {
  try {
    const setting = await prisma.setting.findUnique({ where: { key: 'contact_email' } })
    if (setting?.value) return setting.value
  } catch { /* fallback */ }
  return process.env.ADMIN_EMAIL ?? 'contact@mf-talent-connect.de'
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (!rateLimit(`contact:${ip}`, 3, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, type, message, locale = 'de' } = body

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await prisma.contactMessage.create({
      data: { firstName, lastName, email, phone: phone || null, type: type || 'sonstiges', message, locale },
    })

    const typeLabels: Record<string, Record<string, string>> = {
      de: { bewerber: 'Bewerber / Kandidat', unternehmen: 'Unternehmen', sonstiges: 'Sonstiges' },
      en: { bewerber: 'Applicant / Candidate', unternehmen: 'Company', sonstiges: 'Other' },
    }
    const typeLabel = (typeLabels[locale] ?? typeLabels['de'])[type] ?? type

    const subject =
      locale === 'en'
        ? `New contact message from ${firstName} ${lastName} (${typeLabel})`
        : `Neue Kontaktnachricht von ${firstName} ${lastName} (${typeLabel})`

    const adminHtml = `<!DOCTYPE html><html lang="${locale}"><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1A1A2E;background:#F7F8FA;">
  <div style="background:#1A3A6B;padding:24px 32px;border-radius:12px 12px 0 0;">
    <h1 style="color:white;margin:0;font-size:22px;">M<span style="color:#E87722">&amp;</span>F Talent Connect</h1>
    <p style="color:#93c5fd;margin:4px 0 0;font-size:14px;">${locale === 'en' ? 'New contact message' : 'Neue Kontaktnachricht'}</p>
  </div>
  <div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 0;font-size:13px;color:#6B7280;width:130px;">${locale === 'en' ? 'Name' : 'Name'}</td>
        <td style="padding:10px 0;font-weight:600;">${firstName} ${lastName}</td>
      </tr>
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 0;font-size:13px;color:#6B7280;">Email</td>
        <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#1A3A6B;font-weight:600;">${email}</a></td>
      </tr>
      ${phone ? `<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:10px 0;font-size:13px;color:#6B7280;">${locale === 'en' ? 'Phone' : 'Telefon'}</td><td style="padding:10px 0;font-weight:600;">${phone}</td></tr>` : ''}
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 0;font-size:13px;color:#6B7280;">${locale === 'en' ? 'Type' : 'Typ'}</td>
        <td style="padding:10px 0;">${typeLabel}</td>
      </tr>
    </table>
    <div style="background:#F7F8FA;border-radius:8px;padding:16px 20px;">
      <p style="margin:0 0 8px;font-size:13px;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">${locale === 'en' ? 'Message' : 'Nachricht'}</p>
      <p style="margin:0;color:#1A1A2E;white-space:pre-line;line-height:1.6;">${message}</p>
    </div>
    <div style="margin-top:24px;">
      <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}" style="display:inline-block;background:#E87722;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
        ${locale === 'en' ? 'Reply' : 'Antworten'}
      </a>
    </div>
  </div>
  <p style="text-align:center;font-size:12px;color:#9ca3af;margin-top:20px;">M&amp;F Talent Connect · Wilhelm-Busch-Straße 6, 52441 Linnich</p>
</body></html>`

    const contactEmail = await getContactEmail()
    await sendMail({ to: contactEmail, replyTo: email, subject, html: adminHtml })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
