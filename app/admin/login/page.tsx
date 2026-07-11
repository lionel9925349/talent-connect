'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { loginAction, type LoginState } from './actions'

const INITIAL: LoginState = { status: 'idle' }

const ERROR_MESSAGES: Record<'invalid' | 'rate-limited' | 'server', string> = {
  invalid: 'E-Mail oder Passwort ist falsch.',
  'rate-limited': 'Zu viele Versuche. Bitte warten Sie 15 Minuten.',
  server: 'Ein Serverfehler ist aufgetreten. Bitte erneut versuchen.',
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Anmelden...' : 'Anmelden'}
    </Button>
  )
}

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(loginAction, INITIAL)
  const error = state.status === 'error' ? ERROR_MESSAGES[state.error] : undefined

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            M<span className="text-accent">&amp;</span>F Admin
          </h1>
          <p className="text-muted text-sm mt-1">Melden Sie sich an</p>
        </div>

        <form action={formAction} className="space-y-4">
          <Input
            label="E-Mail"
            name="email"
            type="email"
            required
            autoFocus
            autoComplete="username"
          />
          <Input
            label="Passwort"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            error={error}
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}
