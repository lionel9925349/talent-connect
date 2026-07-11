export type BadgeVariant = 'active' | 'archived' | 'vollzeit' | 'teilzeit' | 'minijob' | 'default'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  active: 'bg-green-50 text-green-700 ring-green-600/15',
  archived: 'bg-gray-100 text-gray-600 ring-gray-500/15',
  vollzeit: 'bg-blue-50 text-blue-700 ring-blue-600/15',
  teilzeit: 'bg-purple-50 text-purple-700 ring-purple-600/15',
  minijob: 'bg-accent-50 text-accent-hover ring-accent/20',
  default: 'bg-primary-50 text-primary ring-primary/15',
}

const dotClasses: Record<BadgeVariant, string> = {
  active: 'bg-green-500',
  archived: 'bg-gray-400',
  vollzeit: 'bg-blue-500',
  teilzeit: 'bg-purple-500',
  minijob: 'bg-accent',
  default: 'bg-primary',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${variantClasses[variant]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[variant]}`} aria-hidden="true" />
      {children}
    </span>
  )
}
