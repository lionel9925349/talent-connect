import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export const ADMIN_COOKIE = 'mf_admin'
export const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 heures

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? 'admin123'
}

/** Pour les Route Handlers — vérifie le cookie dans la requête. */
export function isAdminRequest(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_COOKIE)?.value === getSecret()
}

/** Pour les Server Components — vérifie la valeur du cookie. */
export function isAdminSession(cookieValue: string | undefined): boolean {
  return cookieValue === getSecret()
}

/** Valeur à stocker dans le cookie au login. */
export function getSessionToken(): string {
  return getSecret()
}

export async function setAdminSession(): Promise<void> {
  const store = await cookies()
  store.set(ADMIN_COOKIE, getSecret(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies()
  store.delete(ADMIN_COOKIE)
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return store.get(ADMIN_COOKIE)?.value === getSecret()
}
