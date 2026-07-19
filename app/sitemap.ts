import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { siteConfig } from '@/lib/config'

export const revalidate = 3600

const BASE_URL = siteConfig.url

function languages(path: string) {
  return {
    de: `${BASE_URL}/de${path}`,
    en: `${BASE_URL}/en${path}`,
  }
}

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

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}/de${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
    alternates: { languages: languages(path) },
  }))

  let jobEntries: MetadataRoute.Sitemap = []
  let trainingEntries: MetadataRoute.Sitemap = []

  try {
    const jobs = await prisma.jobOffer.findMany({ where: { isActive: true }, select: { id: true, updatedAt: true } })
    jobEntries = jobs.map((job) => ({
      url: `${BASE_URL}/de/jobangebote/${job.id}`,
      lastModified: job.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: { languages: languages(`/jobangebote/${job.id}`) },
    }))
  } catch (err) { console.error('sitemap query error:', err) }

  try {
    const trainings = await prisma.trainingOffer.findMany({ where: { isActive: true }, select: { id: true, updatedAt: true } })
    trainingEntries = trainings.map((t) => ({
      url: `${BASE_URL}/de/ausbildungsangebote/${t.id}`,
      lastModified: t.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: { languages: languages(`/ausbildungsangebote/${t.id}`) },
    }))
  } catch (err) { console.error('sitemap query error:', err) }

  return [...staticEntries, ...jobEntries, ...trainingEntries]
}
