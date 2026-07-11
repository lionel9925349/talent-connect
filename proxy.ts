import createIntlMiddleware from 'next-intl/middleware'
import NextAuth from 'next-auth'
import { type NextRequest, NextResponse } from 'next/server'
import { authConfig } from '@/auth.config'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

// Auth.js Edge-safe : on lui passe SEULEMENT authConfig (sans Credentials/bcrypt
// qui ne tournent pas sur Edge runtime). Le callback `authorized` gère la
// redirection vers /admin/login si non auth.
const { auth: authMiddleware } = NextAuth(authConfig)

export default authMiddleware(async (request: NextRequest) => {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }
  return intlMiddleware(request)
})

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|.*\\..*).*)', '/admin/:path*'],
}
