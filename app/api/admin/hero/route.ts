import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/withAdmin'
import { heroSchema, parseJson } from '@/lib/schemas'

export const GET = withAdmin(async () => {
  const heroes = await prisma.heroContent.findMany()
  return NextResponse.json(heroes)
})

export const POST = withAdmin(async (request: NextRequest) => {
  const parsed = await parseJson(request, heroSchema)
  if (!parsed.ok) return parsed.response

  const { key, eyebrow, title, subtitle, ctaText, ctaLink } = parsed.data

  const hero = await prisma.heroContent.upsert({
    where: { key },
    update: { eyebrow, title, subtitle, ctaText, ctaLink },
    create: { key, eyebrow, title, subtitle, ctaText, ctaLink },
  })
  revalidatePath('/[locale]', 'page')
  return NextResponse.json(hero)
})
