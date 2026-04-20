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
  const job = await prisma.jobOffer.findUnique({ where: { id: parseInt(id) } })
  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(job)
}

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const data = await request.json()
  const job = await prisma.jobOffer.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      company: data.company,
      location: data.location,
      contractType: data.contractType,
      description: data.description,
      requirements: data.requirements,
      isActive: data.isActive,
    },
  })
  return NextResponse.json(job)
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.jobOffer.delete({ where: { id: parseInt(id) } })
  return NextResponse.json({ ok: true })
}
