import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // HSTS uniquement en prod (en dev HTTP local, on évite de bloquer http://localhost).
  ...(process.env.NODE_ENV === 'production'
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
    : []),
]

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  typedRoutes: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['next-intl'],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default withNextIntl(nextConfig)
