import type { NextAuthConfig } from 'next-auth'

/**
 * Configuration partagée Auth.js — compatible Edge Runtime (middleware).
 * On garde Credentials provider dans `auth.ts` (Node runtime) car bcryptjs
 * + Prisma ne tournent pas sur Edge.
 */
export const authConfig = {
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdmin = nextUrl.pathname.startsWith('/admin')
      const isLogin = nextUrl.pathname === '/admin/login'

      // ⚠ Auth.js v5 + Next 16 (proxy.ts) : retourner `false` ne déclenche
      // pas la redirection automatique vers `pages.signIn` ; il faut
      // renvoyer explicitement une `Response.redirect()`.
      if (isAdmin && !isLogin && !isLoggedIn) {
        const url = new URL('/admin/login', nextUrl)
        url.searchParams.set('callbackUrl', nextUrl.pathname + nextUrl.search)
        return Response.redirect(url)
      }
      if (isLogin && isLoggedIn) {
        return Response.redirect(new URL('/admin/dashboard', nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? 'admin'
        token.uid = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token.uid) session.user.id = token.uid as string
      if (token.role) (session.user as { role?: string }).role = token.role as string
      return session
    },
  },
  providers: [], // ajouté dans auth.ts (Node only)
} satisfies NextAuthConfig
