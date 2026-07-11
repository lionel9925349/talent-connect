import { Button } from '@/components/ui/Button'

interface EmptyStateProps {
  title: string
  hint?: string
  ctaText?: string
  ctaHref?: string
}

export function EmptyState({ title, hint, ctaText, ctaHref }: EmptyStateProps) {
  return (
    <div className="text-center py-20 max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-primary-50 text-primary">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-foreground font-semibold text-lg">{title}</p>
      {hint && <p className="text-muted text-sm mt-2">{hint}</p>}
      {ctaText && ctaHref && (
        <div className="mt-8">
          <Button href={ctaHref} variant="secondary">
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  )
}
