import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/withAdmin'
import { jobCreateSchema, parseJson } from '@/lib/schemas'

export const GET = withAdmin(async () => {
  const jobs = await prisma.jobOffer.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(jobs)
})

export const POST = withAdmin(async (request: NextRequest) => {
  const parsed = await parseJson(request, jobCreateSchema)
  if (!parsed.ok) return parsed.response

  const job = await prisma.jobOffer.create({ data: parsed.data })
  revalidatePath('/[locale]/jobangebote', 'page')
  revalidatePath('/[locale]', 'page')
  return NextResponse.json(job, { status: 201 })
})
