import { NextRequest, NextResponse } from 'next/server'
import { withAdmin } from '@/lib/withAdmin'
import { getPageContent, pageSchemas, setPageContent } from '@/lib/pageSchemas'

export const GET = withAdmin(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const locale = searchParams.get('locale') ?? 'de'

  if (!slug) {
    return NextResponse.json(
      Object.values(pageSchemas).map((p) => ({
        slug: p.slug,
        label: p.label,
        description: p.description,
        locales: p.locales,
      })),
    )
  }

  const schema = pageSchemas[slug]
  if (!schema) return NextResponse.json({ error: 'Unknown page' }, { status: 404 })

  const content = await getPageContent(slug, locale)
  return NextResponse.json({
    slug,
    locale,
    label: schema.label,
    description: schema.description,
    locales: schema.locales,
    fields: schema.fields,
    content,
  })
})

export const POST = withAdmin(async (request: NextRequest) => {
  const body = await request.json().catch(() => ({}))
  const { slug, locale, content } = body as { slug?: string; locale?: string; content?: Record<string, unknown> }

  if (!slug || !locale || !content) {
    return NextResponse.json({ error: 'Missing slug, locale or content' }, { status: 400 })
  }

  const schema = pageSchemas[slug]
  if (!schema) return NextResponse.json({ error: 'Unknown page' }, { status: 404 })

  await setPageContent(slug, locale, content)
  return NextResponse.json({ ok: true })
})
