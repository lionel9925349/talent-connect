'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="de">
      <body
        style={{
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          color: '#1A1A2E',
          background: '#F7F8FA',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <h1 style={{ fontSize: '20px', margin: 0 }}>Etwas ist schiefgelaufen</h1>
        <p style={{ color: '#6B7280', marginTop: '8px' }}>
          {error.digest ? `Fehlercode: ${error.digest}` : 'Ein unerwarteter Fehler ist aufgetreten.'}
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: '24px',
            background: '#1A3A6B',
            color: 'white',
            border: 0,
            borderRadius: '8px',
            padding: '12px 24px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Erneut versuchen
        </button>
      </body>
    </html>
  )
}
