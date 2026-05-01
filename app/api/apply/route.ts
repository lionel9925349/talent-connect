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
  if (!rateLimit(`apply:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const formData = await request.formData()

    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const jobTitle = formData.get('jobTitle') as string
    const company = formData.get('company') as string
    const jobIdRaw = formData.get('jobId') as string
    const locale = (formData.get('locale') as string) || 'de'

    if (!firstName || !lastName || !email || !phone || !jobTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const rawFiles = formData.getAll('files')
    const attachments: { filename: string; content: Buffer; contentType: string }[] = []
    const fileNames: string[] = []

    for (const entry of rawFiles) {
      if (entry instanceof File && entry.size > 0) {
        const buffer = Buffer.from(await entry.arrayBuffer())
        attachments.push({ filename: entry.name, content: buffer, contentType: entry.type || 'application/octet-stream' })
        fileNames.push(entry.name)
      }
    }

    await prisma.application.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        jobId: jobIdRaw ? parseInt(jobIdRaw, 10) : null,
        jobTitle,
        company,
        fileNames,
        locale,
      },
    })

    const subject =
      locale === 'en'
        ? `New Application: ${jobTitle} at ${company} — ${firstName} ${lastName}`
        : `Neue Bewerbung: ${jobTitle} bei ${company} — ${firstName} ${lastName}`

    const attachmentsSummary =
      attachments.length > 0
        ? `<div style="margin-top:20px;padding:12px 16px;background:#F7F8FA;border-radius:8px;border:1px solid #e5e7eb;">
            <p style="font-size:13px;color:#6B7280;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">
              ${locale === 'en' ? 'Attached documents' : 'Beigefügte Dokumente'} (${attachments.length})
            </p>
            <ul style="margin:0;padding:0;list-style:none;">
              ${attachments.map((a) => `<li style="font-size:13px;color:#1A1A2E;padding:3px 0;">📎 ${a.filename}</li>`).join('')}
            </ul>
          </div>`
        : `<p style="color:#6B7280;font-size:13px;margin-top:12px;font-style:italic;">
            ${locale === 'en' ? 'No documents attached.' : 'Keine Dokumente beigefügt.'}
          </p>`

    const adminHtml = `<!DOCTYPE html><html lang="${locale}"><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1A1A2E;background:#F7F8FA;">
  <div style="background:#1A3A6B;padding:24px 32px;border-radius:12px 12px 0 0;">
    <h1 style="color:white;margin:0;font-size:22px;">M<span style="color:#E87722">&amp;</span>F Talent Connect</h1>
    <p style="color:#93c5fd;margin:4px 0 0;font-size:14px;">${locale === 'en' ? 'New application received' : 'Neue Bewerbung eingegangen'}</p>
  </div>
  <div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
    <div style="background:#F7F8FA;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0;font-size:13px;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">${locale === 'en' ? 'Position' : 'Stelle'}</p>
      <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#1A3A6B;">${jobTitle}</p>
      <p style="margin:2px 0 0;font-size:14px;color:#6B7280;">${company}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 0;font-size:13px;color:#6B7280;width:130px;">${locale === 'en' ? 'Full name' : 'Name'}</td>
        <td style="padding:10px 0;font-weight:600;color:#1A1A2E;">${firstName} ${lastName}</td>
      </tr>
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 0;font-size:13px;color:#6B7280;">Email</td>
        <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#1A3A6B;font-weight:600;">${email}</a></td>
      </tr>
      ${phone ? `<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:10px 0;font-size:13px;color:#6B7280;">${locale === 'en' ? 'Phone' : 'Telefon'}</td><td style="padding:10px 0;font-weight:600;color:#1A1A2E;">${phone}</td></tr>` : ''}
    </table>
    ${attachmentsSummary}
    <div style="margin-top:32px;padding-top:20px;border-top:1px solid #f3f4f6;">
      <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(jobTitle)}" style="display:inline-block;background:#E87722;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
        ${locale === 'en' ? 'Reply to applicant' : 'Bewerber antworten'}
      </a>
    </div>
  </div>
  <p style="text-align:center;font-size:12px;color:#9ca3af;margin-top:20px;">M&amp;F Talent Connect · Wilhelm-Busch-Straße 6, 52441 Linnich</p>
</body></html>`

    const confirmHtml = `<!DOCTYPE html><html lang="${locale}"><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1A1A2E;background:#F7F8FA;">
  <div style="background:#1A3A6B;padding:24px 32px;border-radius:12px 12px 0 0;">
    <h1 style="color:white;margin:0;font-size:22px;">M<span style="color:#E87722">&amp;</span>F Talent Connect</h1>
  </div>
  <div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
    <h2 style="color:#1A3A6B;margin-top:0;">${locale === 'en' ? `Hello ${firstName},` : `Hallo ${firstName},`}</h2>
    <p style="color:#1A1A2E;line-height:1.6;">${locale === 'en'
      ? `Thank you for your application for <strong>${jobTitle}</strong> at <strong>${company}</strong>. We have received your documents and will get back to you as soon as possible.`
      : `Vielen Dank für Ihre Bewerbung auf <strong>${jobTitle}</strong> bei <strong>${company}</strong>. Wir haben Ihre Unterlagen erhalten und melden uns so schnell wie möglich bei Ihnen.`
    }</p>
    <p style="color:#6B7280;font-size:13px;">${locale === 'en' ? 'The M&F Talent Connect Team' : 'Das M&F Talent Connect Team'}</p>
  </div>
  <p style="text-align:center;font-size:12px;color:#9ca3af;margin-top:20px;">M&amp;F Talent Connect · Wilhelm-Busch-Straße 6, 52441 Linnich</p>
</body></html>`

    const contactEmail = await getContactEmail()

    const [adminResult, confirmResult] = await Promise.allSettled([
      sendMail({ to: contactEmail, replyTo: email, subject, html: adminHtml, attachments }),
      sendMail({
        to: email,
        subject: locale === 'en' ? `Your application: ${jobTitle}` : `Ihre Bewerbung: ${jobTitle}`,
        html: confirmHtml,
      }),
    ])

    if (adminResult.status === 'rejected') {
      console.error('Admin email error:', adminResult.reason)
      return NextResponse.json({ error: 'Email sending failed' }, { status: 500 })
    }

    if (confirmResult.status === 'rejected') {
      console.error('Confirmation email error:', confirmResult.reason)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Apply API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
