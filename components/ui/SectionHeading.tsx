interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  action?: React.ReactNode
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
  action,
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'

  const heading = (
    <div className={centered ? 'text-center max-w-2xl mx-auto' : ''}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      <span
        className={`mt-3 block h-1 w-14 rounded-full bg-accent ${centered ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
      {subtitle && <p className="text-muted text-lg mt-5">{subtitle}</p>}
    </div>
  )

  if (action) {
    return (
      <div className={`flex flex-wrap items-end justify-between gap-4 ${className}`}>
        {heading}
        {action}
      </div>
    )
  }

  return <div className={className}>{heading}</div>
}
