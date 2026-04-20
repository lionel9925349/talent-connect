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
        <label htmlFor={inputId} className="text-sm font-medium text-[#1A1A2E]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`border border-gray-300 rounded-lg px-3 py-2 text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent transition ${error ? 'border-red-500' : ''} ${className}`}
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
        <label htmlFor={inputId} className="text-sm font-medium text-[#1A1A2E]">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={4}
        className={`border border-gray-300 rounded-lg px-3 py-2 text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent transition resize-none ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
