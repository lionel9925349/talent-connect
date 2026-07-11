import { getTranslations } from 'next-intl/server'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'

export async function ServicesSection() {
  const t = await getTranslations('services')
  const items = t.raw('items') as { title: string; description: string }[]

  return (
    <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} align="center" className="mb-14" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service, i) => (
            <Card key={service.title} hover className="flex flex-col">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary font-bold text-lg mb-5 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3
                className="font-heading font-bold text-foreground text-lg mb-2"
              >
                {service.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{service.description}</p>
              <span className="mt-5 h-px w-full bg-border/70 group-hover:bg-accent/30 transition-colors duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
