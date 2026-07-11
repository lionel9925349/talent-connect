import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'

type Ctx<P> = { params: Promise<P> }
type Handler<P> = (req: NextRequest, ctx: Ctx<P>) => Promise<Response> | Response
type ParamlessHandler = (req: NextRequest) => Promise<Response> | Response

/** Garde d'auth admin pour les Route Handlers. Renvoie 401 si non auth. */
export function withAdmin<P extends Record<string, string> = Record<string, never>>(
  handler: Handler<P> | ParamlessHandler,
) {
  return async (req: NextRequest, ctx: Ctx<P>) => {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return (handler as Handler<P>)(req, ctx)
  }
}
