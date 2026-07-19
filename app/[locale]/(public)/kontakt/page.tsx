import { getContactEmail } from '@/lib/contactEmail'
import { KontaktClient } from './KontaktClient'

export default async function KontaktPage() {
  const contactEmail = await getContactEmail()
  return <KontaktClient contactEmail={contactEmail} />
}
