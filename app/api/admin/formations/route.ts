import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/withAdmin'
import { parseJson, trainingCreateSchema } from '@/lib/schemas'

export const GET = withAdmin(async () => {
  const trainings = await prisma.trainingOffer.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(trainings)
})

export const POST = withAdmin(async (request: NextRequest) => {
  const parsed = await parseJson(request, trainingCreateSchema)
  if (!parsed.ok) return parsed.response

  const training = await prisma.trainingOffer.create({ data: parsed.data })
  revalidatePath('/[locale]/ausbildungsangebote', 'page')
  revalidatePath('/[locale]', 'page')
  return NextResponse.json(training, { status: 201 })
})
