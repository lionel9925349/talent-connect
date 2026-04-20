import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'M&F Talent Connect — Ihre Brücke zwischen Afrika und Deutschland',
  description:
    'M&F Talent Connect vermittelt qualifizierte Fachkräfte und Ausbildungssuchende aus Afrika und Europa an deutsche Unternehmen.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
