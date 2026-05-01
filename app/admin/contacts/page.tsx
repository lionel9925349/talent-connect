export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { ContactsClient } from './ContactsClient'

async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  } catch { return [] }
}

export default async function ContactsPage() {
  const messages = await getMessages()
  return <ContactsClient messages={messages} />
}
