interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-foreground/90">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-white border border-border rounded-xl px-4 py-3 text-[0.95rem] text-foreground placeholder:text-muted/60 shadow-[inset_0_1px_2px_rgb(15_24_45/0.03)] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/12 transition duration-150 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/12' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-foreground/90">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={4}
        className={`w-full bg-white border border-border rounded-xl px-4 py-3 text-[0.95rem] text-foreground placeholder:text-muted/60 shadow-[inset_0_1px_2px_rgb(15_24_45/0.03)] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/12 transition duration-150 resize-none ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/12' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
