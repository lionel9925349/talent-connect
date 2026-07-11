import { prisma } from '@/lib/prisma'
import { ApplicationsClient } from './ApplicationsClient'

const PAGE_SIZE = 50

async function getApplications() {
  try {
    return await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
    })
  } catch (err) {
    console.error('getApplications error:', err)
    return []
  }
}

export default async function ApplicationsPage() {
  const applications = await getApplications()
  return <ApplicationsClient applications={applications} />
}
