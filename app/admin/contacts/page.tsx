import { prisma } from '@/lib/prisma'
import { ContactsClient } from './ContactsClient'

const PAGE_SIZE = 50

async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
    })
  } catch (err) {
    console.error('getMessages error:', err)
    return []
  }
}

export default async function ContactsPage() {
  const messages = await getMessages()
  return <ContactsClient messages={messages} />
}
