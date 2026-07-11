import { escapeHtml } from '@/lib/validation'

export type Locale = 'de' | 'en'

function shell(locale: Locale, headerLabel: string, body: string): string {
  return `<!DOCTYPE html><html lang="${locale}"><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1A1A2E;background:#F7F8FA;">
  <div style="background:#1A3A6B;padding:24px 32px;border-radius:12px 12px 0 0;">
    <h1 style="color:white;margin:0;font-size:22px;">M<span style="color:#E87722">&amp;</span>F Talent Connect</h1>
    ${headerLabel ? `<p style="color:#93c5fd;margin:4px 0 0;font-size:14px;">${headerLabel}</p>` : ''}
  </div>
  <div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
    ${body}
  </div>
  <p style="text-align:center;font-size:12px;color:#9ca3af;margin-top:20px;">M&amp;F Talent Connect · Wilhelm-Busch-Straße 6, 52441 Linnich</p>
</body></html>`
}

const CONTACT_TYPE_LABELS: Record<Locale, Record<string, string>> = {
  de: { bewerber: 'Bewerber / Kandidat', unternehmen: 'Unternehmen', sonstiges: 'Sonstiges' },
  en: { bewerber: 'Applicant / Candidate', unternehmen: 'Company', sonstiges: 'Other' },
}

export interface ContactEmailInput {
  locale: Locale
  firstName: string
  lastName: string
  email: string
  phone: string | null
  type: string
  message: string
}

export function renderContactEmail(input: ContactEmailInput) {
  const { locale, firstName, lastName, email, phone, type, message } = input
  const typeLabel = (CONTACT_TYPE_LABELS[locale] ?? CONTACT_TYPE_LABELS.de)[type] ?? type

  const eFirst = escapeHtml(firstName)
  const eLast = escapeHtml(lastName)
  const eEmail = escapeHtml(email)
  const ePhone = escapeHtml(phone)
  const eMessage = escapeHtml(message)

  const subject =
    locale === 'en'
      ? `New contact message from ${firstName} ${lastName} (${typeLabel})`
      : `Neue Kontaktnachricht von ${firstName} ${lastName} (${typeLabel})`

  const body = `
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 0;font-size:13px;color:#6B7280;width:130px;">Name</td>
        <td style="padding:10px 0;font-weight:600;">${eFirst} ${eLast}</td>
      </tr>
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 0;font-size:13px;color:#6B7280;">Email</td>
        <td style="padding:10px 0;"><a href="mailto:${encodeURIComponent(email)}" style="color:#1A3A6B;font-weight:600;">${eEmail}</a></td>
      </tr>
      ${
        phone
          ? `<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:10px 0;font-size:13px;color:#6B7280;">${locale === 'en' ? 'Phone' : 'Telefon'}</td><td style="padding:10px 0;font-weight:600;">${ePhone}</td></tr>`
          : ''
      }
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 0;font-size:13px;color:#6B7280;">${locale === 'en' ? 'Type' : 'Typ'}</td>
        <td style="padding:10px 0;">${typeLabel}</td>
      </tr>
    </table>
    <div style="background:#F7F8FA;border-radius:8px;padding:16px 20px;">
      <p style="margin:0 0 8px;font-size:13px;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">${locale === 'en' ? 'Message' : 'Nachricht'}</p>
      <p style="margin:0;color:#1A1A2E;white-space:pre-line;line-height:1.6;">${eMessage}</p>
    </div>
    <div style="margin-top:24px;">
      <a href="mailto:${encodeURIComponent(email)}?subject=Re:%20${encodeURIComponent(subject)}" style="display:inline-block;background:#E87722;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
        ${locale === 'en' ? 'Reply' : 'Antworten'}
      </a>
    </div>`

  return {
    subject,
    html: shell(locale, locale === 'en' ? 'New contact message' : 'Neue Kontaktnachricht', body),
  }
}

export interface ApplicationEmailInput {
  locale: Locale
  firstName: string
  lastName: string
  email: string
  phone: string
  jobTitle: string
  company: string
  /** Liens signés vers les CVs déposés sur MinIO (parallèle à `attachmentNames`). */
  attachmentUrls?: string[]
  attachmentCount: number
  attachmentNames: string[]
}

export function renderApplicationAdminEmail(input: ApplicationEmailInput) {
  const { locale, firstName, lastName, email, phone, jobTitle, company, attachmentCount, attachmentNames, attachmentUrls } = input

  const eFirst = escapeHtml(firstName)
  const eLast = escapeHtml(lastName)
  const eEmail = escapeHtml(email)
  const ePhone = escapeHtml(phone)
  const eJob = escapeHtml(jobTitle)
  const eCompany = escapeHtml(company)

  const subject =
    locale === 'en'
      ? `New Application: ${jobTitle} at ${company} — ${firstName} ${lastName}`
      : `Neue Bewerbung: ${jobTitle} bei ${company} — ${firstName} ${lastName}`

  const renderFileItem = (name: string, idx: number) => {
    const url = attachmentUrls?.[idx]
    const safe = escapeHtml(name)
    return url
      ? `<li style="font-size:13px;padding:3px 0;"><a href="${escapeHtml(url)}" style="color:#1A3A6B;text-decoration:none;font-weight:600;">📎 ${safe}</a></li>`
      : `<li style="font-size:13px;color:#1A1A2E;padding:3px 0;">📎 ${safe}</li>`
  }

  const attachmentsBlock =
    attachmentCount > 0
      ? `<div style="margin-top:20px;padding:12px 16px;background:#F7F8FA;border-radius:8px;border:1px solid #e5e7eb;">
          <p style="font-size:13px;color:#6B7280;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">
            ${locale === 'en' ? 'Attached documents' : 'Beigefügte Dokumente'} (${attachmentCount})
          </p>
          <ul style="margin:0;padding:0;list-style:none;">
            ${attachmentNames.map(renderFileItem).join('')}
          </ul>
          ${attachmentUrls && attachmentUrls.length > 0 ? `<p style="font-size:11px;color:#9ca3af;margin:8px 0 0;">${locale === 'en' ? 'Download links valid 7 days.' : 'Download-Links 7 Tage gültig.'}</p>` : ''}
        </div>`
      : `<p style="color:#6B7280;font-size:13px;margin-top:12px;font-style:italic;">
          ${locale === 'en' ? 'No documents attached.' : 'Keine Dokumente beigefügt.'}
        </p>`

  const body = `
    <div style="background:#F7F8FA;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0;font-size:13px;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">${locale === 'en' ? 'Position' : 'Stelle'}</p>
      <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#1A3A6B;">${eJob}</p>
      <p style="margin:2px 0 0;font-size:14px;color:#6B7280;">${eCompany}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 0;font-size:13px;color:#6B7280;width:130px;">${locale === 'en' ? 'Full name' : 'Name'}</td>
        <td style="padding:10px 0;font-weight:600;color:#1A1A2E;">${eFirst} ${eLast}</td>
      </tr>
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 0;font-size:13px;color:#6B7280;">Email</td>
        <td style="padding:10px 0;"><a href="mailto:${encodeURIComponent(email)}" style="color:#1A3A6B;font-weight:600;">${eEmail}</a></td>
      </tr>
      ${
        phone
          ? `<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:10px 0;font-size:13px;color:#6B7280;">${locale === 'en' ? 'Phone' : 'Telefon'}</td><td style="padding:10px 0;font-weight:600;color:#1A1A2E;">${ePhone}</td></tr>`
          : ''
      }
    </table>
    ${attachmentsBlock}
    <div style="margin-top:32px;padding-top:20px;border-top:1px solid #f3f4f6;">
      <a href="mailto:${encodeURIComponent(email)}?subject=Re:%20${encodeURIComponent(jobTitle)}" style="display:inline-block;background:#E87722;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
        ${locale === 'en' ? 'Reply to applicant' : 'Bewerber antworten'}
      </a>
    </div>`

  return {
    subject,
    html: shell(locale, locale === 'en' ? 'New application received' : 'Neue Bewerbung eingegangen', body),
  }
}

export function renderApplicationConfirmEmail(input: ApplicationEmailInput) {
  const { locale, firstName, jobTitle, company } = input

  const eFirst = escapeHtml(firstName)
  const eJob = escapeHtml(jobTitle)
  const eCompany = escapeHtml(company)

  const subject = locale === 'en' ? `Your application: ${jobTitle}` : `Ihre Bewerbung: ${jobTitle}`

  const body = `
    <h2 style="color:#1A3A6B;margin-top:0;">${locale === 'en' ? `Hello ${eFirst},` : `Hallo ${eFirst},`}</h2>
    <p style="color:#1A1A2E;line-height:1.6;">${
      locale === 'en'
        ? `Thank you for your application for <strong>${eJob}</strong> at <strong>${eCompany}</strong>. We have received your documents and will get back to you as soon as possible.`
        : `Vielen Dank für Ihre Bewerbung auf <strong>${eJob}</strong> bei <strong>${eCompany}</strong>. Wir haben Ihre Unterlagen erhalten und melden uns so schnell wie möglich bei Ihnen.`
    }</p>
    <p style="color:#6B7280;font-size:13px;">${locale === 'en' ? 'The M&F Talent Connect Team' : 'Das M&F Talent Connect Team'}</p>`

  return { subject, html: shell(locale, '', body) }
}
