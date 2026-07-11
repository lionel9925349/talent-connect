import { Button } from '@/components/ui/Button'

interface HeroSectionProps {
  title: string
  subtitle: string
  eyebrow?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  size?: 'large' | 'medium'
  keywords?: string[]
}

export function HeroSection({
  title,
  subtitle,
  eyebrow,
  ctaText,
  ctaLink = '/kontakt',
  secondaryCtaText,
  secondaryCtaLink = '/jobangebote',
  size = 'large',
  keywords,
}: HeroSectionProps) {
  const large = size === 'large'

  return (
    <section
      className={`relative isolate overflow-hidden bg-primary-900 text-white ${
        large ? 'py-12 md:py-20' : 'py-10 md:py-14'
      }`}
    >
      {/* Layered background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(165deg, var(--color-primary-900) 0%, var(--color-primary) 55%, var(--color-primary-600) 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <div
        className="absolute -top-40 -right-32 w-[34rem] h-[34rem] rounded-full -z-10 blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="hidden md:block absolute -bottom-48 -left-40 w-[32rem] h-[32rem] rounded-full -z-10 blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, var(--color-primary-hover) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="eyebrow text-accent/90 mb-6 animate-fade-up">{eyebrow}</p>
          )}
          <h1
            className={`font-heading font-bold leading-[1.05] mb-6 animate-fade-up ${
              large ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl md:text-4xl'
            }`}
            style={{ animationDelay: '60ms' }}
          >
            {title}
          </h1>
          <p
            className="text-white/75 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            {subtitle}
          </p>

          {keywords && keywords.length > 0 && (
            <div
              className="flex flex-wrap gap-2 mb-9 animate-fade-up"
              style={{ animationDelay: '180ms' }}
            >
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3.5 py-1.5 rounded-full text-sm font-medium bg-white/8 text-white/90 ring-1 ring-inset ring-white/15 backdrop-blur-sm"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}

          {ctaText && (
            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '240ms' }}
            >
              <Button href={ctaLink} variant="primary" size="lg">
                {ctaText}
              </Button>
              {secondaryCtaText && (
                <Button
                  href={secondaryCtaLink}
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-primary hover:border-white"
                >
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
