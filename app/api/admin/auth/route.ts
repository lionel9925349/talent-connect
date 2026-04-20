import { NextRequest, NextResponse } from 'next/server'
import { setAdminSession, clearAdminSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await setAdminSession()
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await clearAdminSession()
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'))
}
