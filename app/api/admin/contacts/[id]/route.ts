import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

interface Props { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Props) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const { status } = await request.json()
  const msg = await prisma.contactMessage.update({ where: { id: parseInt(id, 10) }, data: { status } })
  return NextResponse.json(msg)
}

export async function DELETE(_: NextRequest, { params }: Props) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await prisma.contactMessage.delete({ where: { id: parseInt(id, 10) } })
  return NextResponse.json({ success: true })
}
