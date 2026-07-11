import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/withAdmin'
import { parseId } from '@/lib/safeId'
import { contactStatusPatchSchema, parseJson } from '@/lib/schemas'

function badId() {
  return NextResponse.json({ error: 'Bad id' }, { status: 400 })
}

export const PATCH = withAdmin<{ id: string }>(async (request, { params }) => {
  const { id } = await params
  const msgId = parseId(id)
  if (msgId === null) return badId()

  const parsed = await parseJson(request, contactStatusPatchSchema)
  if (!parsed.ok) return parsed.response

  const msg = await prisma.contactMessage.update({ where: { id: msgId }, data: parsed.data })
  return NextResponse.json(msg)
})

export const DELETE = withAdmin<{ id: string }>(async (_req, { params }) => {
  const { id } = await params
  const msgId = parseId(id)
  if (msgId === null) return badId()
  await prisma.contactMessage.delete({ where: { id: msgId } })
  return NextResponse.json({ success: true })
})
