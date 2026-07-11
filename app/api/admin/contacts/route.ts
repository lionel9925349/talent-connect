import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/withAdmin'

export const GET = withAdmin(async () => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(messages)
})
