import type { Metadata, Viewport } from 'next'
import './globals.css'
import { siteConfig } from '@/lib/config'

const BASE_URL = siteConfig.url

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'M&F Talent Connect',
    template: '%s | M&F Talent Connect',
  },
  description:
    'M&F Talent Connect — passgenaue Vermittlung von Fachkräften und Auszubildenden aus dem Ausland an deutsche Unternehmen.',
  applicationName: 'M&F Talent Connect',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'M&F Talent Connect',
    title: 'M&F Talent Connect',
    description: 'Passgenaue Vermittlung von Fachkräften und Auszubildenden an deutsche Unternehmen.',
    url: BASE_URL,
  },
  twitter: { card: 'summary' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A3A6B',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
