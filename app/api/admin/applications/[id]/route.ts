import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

interface Props { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Props) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const { status } = await request.json()
  const app = await prisma.application.update({ where: { id: parseInt(id, 10) }, data: { status } })
  return NextResponse.json(app)
}

export async function DELETE(_: NextRequest, { params }: Props) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await prisma.application.delete({ where: { id: parseInt(id, 10) } })
  return NextResponse.json({ success: true })
}
