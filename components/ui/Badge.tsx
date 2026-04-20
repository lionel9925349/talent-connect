type BadgeVariant = 'active' | 'archived' | 'vollzeit' | 'teilzeit' | 'minijob' | 'default'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  active: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-600',
  vollzeit: 'bg-blue-100 text-blue-800',
  teilzeit: 'bg-purple-100 text-purple-800',
  minijob: 'bg-orange-100 text-orange-800',
  default: 'bg-[#1A3A6B]/10 text-[#1A3A6B]',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
