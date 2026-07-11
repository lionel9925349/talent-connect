interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'article'
}

export function Card({ children, className = '', hover = false, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={`group relative bg-white rounded-2xl border border-border/70 p-6 shadow-[var(--shadow-soft)] ${
        hover
          ? 'transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] hover:border-primary/20'
          : ''
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
