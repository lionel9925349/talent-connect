import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mf-talent-connect.de'
const LOCALES = ['de', 'en']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    '',
    '/ueber-uns',
    '/fuer-unternehmen',
    '/fuer-bewerber',
    '/jobangebote',
    '/ausbildungsangebote',
    '/kontakt',
    '/impressum',
    '/sonstiges',
  ]

  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  )

  let jobEntries: MetadataRoute.Sitemap = []
  let trainingEntries: MetadataRoute.Sitemap = []

  try {
    const jobs = await prisma.jobOffer.findMany({ where: { isActive: true }, select: { id: true, updatedAt: true } })
    jobEntries = LOCALES.flatMap((locale) =>
      jobs.map((job) => ({
        url: `${BASE_URL}/${locale}/jobangebote/${job.id}`,
        lastModified: job.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    )
  } catch { /* ignore */ }

  try {
    const trainings = await prisma.trainingOffer.findMany({ where: { isActive: true }, select: { id: true, updatedAt: true } })
    trainingEntries = LOCALES.flatMap((locale) =>
      trainings.map((t) => ({
        url: `${BASE_URL}/${locale}/ausbildungsangebote/${t.id}`,
        lastModified: t.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    )
  } catch { /* ignore */ }

  return [...staticEntries, ...jobEntries, ...trainingEntries]
}
