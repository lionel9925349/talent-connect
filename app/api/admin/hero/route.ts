import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const heroes = await prisma.heroContent.findMany()
  return NextResponse.json(heroes)
}

export async function POST(request: NextRequest) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await request.json()
  const hero = await prisma.heroContent.upsert({
    where: { key: data.key },
    update: { title: data.title, subtitle: data.subtitle, ctaText: data.ctaText, ctaLink: data.ctaLink },
    create: { key: data.key, title: data.title, subtitle: data.subtitle, ctaText: data.ctaText, ctaLink: data.ctaLink },
  })
  return NextResponse.json(hero)
}
