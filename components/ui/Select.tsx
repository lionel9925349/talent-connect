interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  children: React.ReactNode
}

export function Select({ label, error, className = '', id, children, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold text-foreground/90">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full appearance-none bg-white border border-border rounded-xl px-4 py-3 pr-10 text-[0.95rem] text-foreground shadow-[inset_0_1px_2px_rgb(15_24_45/0.03)] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/12 transition duration-150 cursor-pointer ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/12' : ''} ${className}`}
          {...props}
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
