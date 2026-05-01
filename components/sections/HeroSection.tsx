import { Button } from '@/components/ui/Button'

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
  size?: 'large' | 'medium'
  keywords?: string[]
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink = '/kontakt',
  size = 'large',
  keywords,
}: HeroSectionProps) {
  return (
    <section
      className={`relative bg-primary text-white overflow-hidden ${size === 'large' ? 'py-24 md:py-36' : 'py-16 md:py-24'}`}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary-hover" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1
            className={`font-bold leading-tight mb-6 ${size === 'large' ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'}`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h1>
          <p className="text-blue-200 text-lg md:text-xl mb-6 leading-relaxed">{subtitle}</p>
          {keywords && keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
          {ctaText && (
            <div className="flex flex-wrap gap-4">
              <Button href={ctaLink} variant="primary" size="lg">
                {ctaText}
              </Button>
              <Button href="/jobangebote" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Alle Angebote
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
