import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: Params) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const training = await prisma.trainingOffer.findUnique({ where: { id: parseInt(id) } })
  if (!training) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(training)
}

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const data = await request.json()
  const training = await prisma.trainingOffer.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      sector: data.sector,
      duration: data.duration,
      location: data.location,
      description: data.description,
      conditions: data.conditions,
      startDate: data.startDate,
      isActive: data.isActive,
    },
  })
  return NextResponse.json(training)
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.trainingOffer.delete({ where: { id: parseInt(id) } })
  return NextResponse.json({ ok: true })
}
