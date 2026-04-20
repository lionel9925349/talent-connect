import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const trainings = await prisma.trainingOffer.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(trainings)
}

export async function POST(request: NextRequest) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await request.json()
  const training = await prisma.trainingOffer.create({
    data: {
      title: data.title,
      sector: data.sector,
      duration: data.duration,
      location: data.location,
      description: data.description,
      conditions: data.conditions,
      startDate: data.startDate,
    },
  })
  return NextResponse.json(training, { status: 201 })
}
