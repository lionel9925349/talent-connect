import { getTranslations } from 'next-intl/server'
import { Card } from '@/components/ui/Card'

export async function ServicesSection() {
  const t = await getTranslations('services')
  const items = t.raw('items') as { title: string; description: string }[]

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('title')}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service, i) => (
            <Card key={service.title} hover>
              <span className="text-xs font-bold text-accent tracking-widest mb-4 block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                className="font-bold text-foreground text-lg mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {service.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
