import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/withAdmin'
import { parseId } from '@/lib/safeId'
import { jobUpdateSchema, parseJson } from '@/lib/schemas'

function revalidateJobs(id: number) {
  revalidatePath('/[locale]/jobangebote', 'page')
  revalidatePath(`/[locale]/jobangebote/${id}`, 'page')
  revalidatePath('/[locale]', 'page')
}

function badId() {
  return NextResponse.json({ error: 'Bad id' }, { status: 400 })
}

export const GET = withAdmin<{ id: string }>(async (_req, { params }) => {
  const { id } = await params
  const jobId = parseId(id)
  if (jobId === null) return badId()
  const job = await prisma.jobOffer.findUnique({ where: { id: jobId } })
  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(job)
})

export const PUT = withAdmin<{ id: string }>(async (request, { params }) => {
  const { id } = await params
  const jobId = parseId(id)
  if (jobId === null) return badId()

  const parsed = await parseJson(request, jobUpdateSchema)
  if (!parsed.ok) return parsed.response

  const job = await prisma.jobOffer.update({ where: { id: jobId }, data: parsed.data })
  revalidateJobs(jobId)
  return NextResponse.json(job)
})

export const DELETE = withAdmin<{ id: string }>(async (_req, { params }) => {
  const { id } = await params
  const jobId = parseId(id)
  if (jobId === null) return badId()
  await prisma.jobOffer.delete({ where: { id: jobId } })
  revalidateJobs(jobId)
  return NextResponse.json({ ok: true })
})
