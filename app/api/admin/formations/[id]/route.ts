import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/withAdmin'
import { parseId } from '@/lib/safeId'
import { parseJson, trainingUpdateSchema } from '@/lib/schemas'

function revalidateTrainings(id: number) {
  revalidatePath('/[locale]/ausbildungsangebote', 'page')
  revalidatePath(`/[locale]/ausbildungsangebote/${id}`, 'page')
  revalidatePath('/[locale]', 'page')
}

function badId() {
  return NextResponse.json({ error: 'Bad id' }, { status: 400 })
}

export const GET = withAdmin<{ id: string }>(async (_req, { params }) => {
  const { id } = await params
  const trainingId = parseId(id)
  if (trainingId === null) return badId()
  const training = await prisma.trainingOffer.findUnique({ where: { id: trainingId } })
  if (!training) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(training)
})

export const PUT = withAdmin<{ id: string }>(async (request, { params }) => {
  const { id } = await params
  const trainingId = parseId(id)
  if (trainingId === null) return badId()

  const parsed = await parseJson(request, trainingUpdateSchema)
  if (!parsed.ok) return parsed.response

  const training = await prisma.trainingOffer.update({
    where: { id: trainingId },
    data: parsed.data,
  })
  revalidateTrainings(trainingId)
  return NextResponse.json(training)
})

export const DELETE = withAdmin<{ id: string }>(async (_req, { params }) => {
  const { id } = await params
  const trainingId = parseId(id)
  if (trainingId === null) return badId()
  await prisma.trainingOffer.delete({ where: { id: trainingId } })
  revalidateTrainings(trainingId)
  return NextResponse.json({ ok: true })
})
