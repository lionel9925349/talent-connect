export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { ApplicationsClient } from './ApplicationsClient'

async function getApplications() {
  try {
    return await prisma.application.findMany({ orderBy: { createdAt: 'desc' } })
  } catch { return [] }
}

export default async function ApplicationsPage() {
  const applications = await getApplications()
  return <ApplicationsClient applications={applications} />
}
