import { getContactEmail } from '@/lib/contactEmail'
import { getSiteInfo } from '@/lib/siteInfo'
import { KontaktClient } from './KontaktClient'

export default async function KontaktPage() {
  const [contactEmail, info] = await Promise.all([getContactEmail(), getSiteInfo()])
  return <KontaktClient contactEmail={contactEmail} info={info} />
}
