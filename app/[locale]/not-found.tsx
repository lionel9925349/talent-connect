import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-32">
      <p className="font-heading text-6xl font-bold text-[#1A3A6B]">
        404
      </p>
      <h1 className="mt-4 text-xl font-semibold text-[#1A1A2E]">Seite nicht gefunden</h1>
      <p className="mt-2 text-[#6B7280]">
        Die angeforderte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/de"
        className="mt-8 inline-block rounded-lg bg-[#1A3A6B] px-6 py-3 text-white font-medium hover:bg-[#2355A0] transition-colors"
      >
        Zur Startseite
      </Link>
    </div>
  )
}
