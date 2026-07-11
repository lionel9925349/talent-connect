import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { authConfig } from '@/auth.config'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(200),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(raw, request) {
        // Rate-limit par IP — 5 tentatives / 15 min.
        const ip = (request?.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown').trim()
        if (!rateLimit(`login:${ip}`, 5, 15 * 60 * 1000)) {
          throw new Error('TooManyAttempts')
        }

        const parsed = loginSchema.safeParse(raw)
        if (!parsed.success) return null
        const { email, password } = parsed.data

        const user = await prisma.user.findUnique({ where: { email } })
        // Hash réel d'un mot de passe inatteignable, pour aligner le coût
        // de bcrypt.compare avec le cas user-existe (anti email-enumeration
        // par timing). Format strict 60 chars sinon bcryptjs short-circuit.
        const DUMMY_HASH = '$2b$12$BCKY9SPt29CxFkkjowGXKuKtynaQ34YSMOtEpPyjzvVXv5EdYc3Xi'

        const ok = await bcrypt
          .compare(password, user?.passwordHash ?? DUMMY_HASH)
          .catch(() => false)
        if (!user || !ok) return null

        return { id: user.id, email: user.email, role: user.role, name: user.email }
      },
    }),
  ],
})
