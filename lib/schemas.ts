import { z } from 'zod'

/** Chaîne obligatoire, trimmée, longueur min 1, max paramétrable. */
const reqStr = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)

const optStr = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null))

const email = z.string().trim().email().max(254)

const locale = z.enum(['de', 'en']).default('de')

// ── Contact ───────────────────────────────────────────────────────────
export const contactSchema = z.object({
  firstName: reqStr(100),
  lastName: reqStr(100),
  email,
  phone: optStr(40),
  message: reqStr(5000),
  type: z.enum(['bewerber', 'unternehmen', 'sonstiges']).default('sonstiges'),
  locale,
})
export type ContactInput = z.infer<typeof contactSchema>

// ── Job offer (admin) ────────────────────────────────────────────────
export const contractType = z.enum(['Vollzeit', 'Teilzeit', 'Minijob'])

export const jobCreateSchema = z.object({
  title: reqStr(200),
  company: reqStr(200),
  location: reqStr(200),
  contractType,
  description: reqStr(10_000),
  requirements: reqStr(10_000),
})

export const jobUpdateSchema = jobCreateSchema.extend({
  isActive: z.boolean().default(true),
})

// ── Training offer (admin) ───────────────────────────────────────────
export const trainingCreateSchema = z.object({
  title: reqStr(200),
  sector: reqStr(200),
  duration: reqStr(100),
  location: reqStr(200),
  description: reqStr(10_000),
  conditions: reqStr(10_000),
  startDate: reqStr(100),
})

export const trainingUpdateSchema = trainingCreateSchema.extend({
  isActive: z.boolean().default(true),
})

// ── Hero (admin) ─────────────────────────────────────────────────────
export const heroSchema = z.object({
  key: reqStr(80),
  eyebrow: optStr(200),
  title: reqStr(300),
  subtitle: reqStr(1000),
  ctaText: reqStr(100),
  ctaLink: reqStr(500),
})

// ── Status patches (admin) ───────────────────────────────────────────
// Applications et contacts ont des statuts distincts (workflows différents)
export const applicationStatusPatchSchema = z.object({
  status: z.enum(['new', 'read', 'accepted', 'rejected']),
})

export const contactStatusPatchSchema = z.object({
  status: z.enum(['new', 'read', 'replied']),
})

// ── Helper: parse JSON body et renvoie une 400 lisible si invalide ───
import { NextResponse } from 'next/server'

export async function parseJson<T extends z.ZodTypeAny>(
  request: Request,
  schema: T,
): Promise<{ ok: true; data: z.infer<T> } | { ok: false; response: NextResponse }> {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }),
    }
  }
  const result = schema.safeParse(raw)
  if (!result.success) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Invalid fields', issues: result.error.issues.map((i) => ({ path: i.path, message: i.message })) },
        { status: 400 },
      ),
    }
  }
  return { ok: true, data: result.data }
}
