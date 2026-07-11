'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-32">
      <h1 className="text-xl font-semibold text-[#1A1A2E]">Etwas ist schiefgelaufen</h1>
      <p className="mt-2 text-[#6B7280]">
        Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-[#1A3A6B] px-6 py-3 text-white font-medium hover:bg-[#2355A0] transition-colors cursor-pointer"
      >
        Erneut versuchen
      </button>
    </div>
  )
}
