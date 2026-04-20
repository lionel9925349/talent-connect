import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[#E87722] hover:bg-[#C9631A] text-white',
  secondary: 'bg-[#1A3A6B] hover:bg-[#2355A0] text-white',
  outline: 'border-2 border-[#1A3A6B] text-[#1A3A6B] hover:bg-[#1A3A6B] hover:text-white',
  ghost: 'text-[#1A3A6B] hover:bg-[#1A3A6B]/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = `inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  )
}
