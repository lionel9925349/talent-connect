import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const jobs = await prisma.jobOffer.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(jobs)
}

export async function POST(request: NextRequest) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await request.json()
  const job = await prisma.jobOffer.create({
    data: {
      title: data.title,
      company: data.company,
      location: data.location,
      contractType: data.contractType,
      description: data.description,
      requirements: data.requirements,
    },
  })
  return NextResponse.json(job, { status: 201 })
}
