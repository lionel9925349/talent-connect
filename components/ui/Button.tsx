import Link from 'next/link'
import type { Route } from 'next'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent-strong hover:bg-accent-strong-hover text-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]',
  secondary:
    'bg-primary hover:bg-primary-hover text-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]',
  outline:
    'border border-primary/25 text-primary bg-white/0 hover:bg-primary hover:text-white hover:border-primary',
  ghost: 'text-primary hover:bg-primary/8',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-[0.95rem] gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
}

const BASE =
  'inline-flex items-center justify-center font-semibold rounded-xl cursor-pointer select-none transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60'

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  onClick,
  ...props
}: ButtonProps) {
  const merged = cn(BASE, sizeClasses[size], variantClasses[variant], className)

  if (href) {
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
      return (
        <a href={href} className={merged} onClick={onClick}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href as Route} className={merged} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button className={merged} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
