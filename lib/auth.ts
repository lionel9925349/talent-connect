import { auth } from '@/auth'

/** Vérifie qu'une session admin valide existe (RSC + Route Handlers). */
export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await auth()
  return Boolean(session?.user)
}
