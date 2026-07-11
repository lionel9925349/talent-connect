'use server'

import { AuthError, CredentialsSignin } from 'next-auth'
import { signIn } from '@/auth'

export type LoginState =
  | { status: 'idle' }
  | { status: 'error'; error: 'invalid' | 'rate-limited' | 'server' }

/** Server Action de login — utilisée avec `useActionState`.
 *  Propage proprement le rate-limit (TooManyAttempts → 'rate-limited').
 */
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get('email')
  const password = formData.get('password')
  if (typeof email !== 'string' || typeof password !== 'string') {
    return { status: 'error', error: 'invalid' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin/dashboard',
    })
    // signIn() lance un redirect — on n'arrive jamais ici.
    return { status: 'idle' }
  } catch (err) {
    // Le redirect interne de signIn lance NEXT_REDIRECT — il faut le relancer.
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') throw err

    if (err instanceof CredentialsSignin) {
      // `cause.err.message` contient le message que `authorize` a thrown.
      const inner = (err as CredentialsSignin & { cause?: { err?: Error } }).cause?.err?.message
      if (inner === 'TooManyAttempts') return { status: 'error', error: 'rate-limited' }
      return { status: 'error', error: 'invalid' }
    }
    if (err instanceof AuthError) {
      console.error('Auth error:', err)
      return { status: 'error', error: 'server' }
    }
    throw err
  }
}
