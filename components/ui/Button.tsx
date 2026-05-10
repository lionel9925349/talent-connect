import Link from 'next/link'

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
  primary: 'bg-accent hover:bg-accent-hover text-white',
  secondary: 'bg-primary hover:bg-primary-hover text-white',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:bg-primary/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

/**
 * Strip variant utility classes whose "type" (e.g. bg, text, border, hover:bg)
 * is also present in the user-supplied className override.
 *
 * Without this, Tailwind generates both `bg-accent` (variant) and `bg-white`
 * (override) into the final CSS, and the alphabetically-later class wins —
 * which is unpredictable. Removing the variant copy when overridden makes
 * `className` always win.
 */
function mergeClasses(variantStr: string, overrideStr: string) {
  if (!overrideStr) return variantStr

  const groupOf = (cls: string) => {
    const colon = cls.lastIndexOf(':')
    const prefix = colon >= 0 ? cls.slice(0, colon + 1) : ''
    const rest = colon >= 0 ? cls.slice(colon + 1) : cls
    const dash = rest.indexOf('-')
    if (dash < 0) return null
    const kind = rest.slice(0, dash)
    if (!['bg', 'text', 'border', 'ring', 'shadow', 'rounded'].includes(kind)) return null
    return `${prefix}${kind}`
  }

  const overrideGroups = new Set(
    overrideStr
      .split(/\s+/)
      .map((c) => groupOf(c))
      .filter((g): g is string => g !== null),
  )

  const kept = variantStr
    .split(/\s+/)
    .filter((cls) => {
      const g = groupOf(cls)
      return g === null || !overrideGroups.has(g)
    })
    .join(' ')

  return `${kept} ${overrideStr}`.trim()
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const variantStr = variantClasses[variant]
  const merged = mergeClasses(variantStr, className)
  const base = `inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${sizeClasses[size]} ${merged}`

  if (href) {
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
      return (
        <a href={href} className={base} onClick={onClick}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={base} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button className={base} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
