import { Client as MinioClient } from 'minio'
import { randomUUID } from 'node:crypto'

/**
 * Client MinIO (S3-compatible).
 *
 * Singleton attaché à `globalThis` pour survivre au HMR en dev,
 * comme pour Prisma.
 *
 * Env requis :
 *   MINIO_ENDPOINT, MINIO_PORT, MINIO_USE_SSL,
 *   MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_BUCKET
 */

const globalForMinio = globalThis as unknown as { minio?: MinioClient }

function createClient(): MinioClient {
  const endpoint = process.env.MINIO_ENDPOINT
  const accessKey = process.env.MINIO_ACCESS_KEY
  const secretKey = process.env.MINIO_SECRET_KEY
  if (!endpoint || !accessKey || !secretKey) {
    throw new Error('MinIO env vars missing (MINIO_ENDPOINT / MINIO_ACCESS_KEY / MINIO_SECRET_KEY)')
  }
  return new MinioClient({
    endPoint: endpoint,
    port: Number(process.env.MINIO_PORT ?? 9000),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey,
    secretKey,
  })
}

export const minio: MinioClient = globalForMinio.minio ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForMinio.minio = minio
}

export const BUCKET = process.env.MINIO_BUCKET ?? 'mf-talent-uploads'

let bucketReady: Promise<void> | null = null

/** Crée le bucket à la première requête (no-op s'il existe déjà). */
export function ensureBucket(): Promise<void> {
  if (!bucketReady) {
    bucketReady = (async () => {
      const exists = await minio.bucketExists(BUCKET).catch(() => false)
      if (!exists) {
        await minio.makeBucket(BUCKET)
      }
    })()
  }
  return bucketReady
}

/** Slug très conservateur pour éviter les caractères pénibles dans les clés S3. */
function safeName(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[^\w.\-]+/g, '_')
    .slice(0, 80)
}

/** Construit une clé d'objet : `applications/<yyyy-mm>/<uuid>-<safe-name>`. */
export function buildApplicationKey(originalName: string): string {
  const now = new Date()
  const yyyy = now.getUTCFullYear()
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `applications/${yyyy}-${mm}/${randomUUID()}-${safeName(originalName)}`
}

/** Upload un buffer vers MinIO. Renvoie la clé utilisée. */
export async function putApplicationFile(
  buffer: Buffer,
  originalName: string,
  contentType: string,
): Promise<string> {
  await ensureBucket()
  const key = buildApplicationKey(originalName)
  await minio.putObject(BUCKET, key, buffer, buffer.length, {
    'Content-Type': contentType,
  })
  return key
}

/** URL signée valable `expirySeconds` secondes (défaut 24 heures).
 *  TTL court pour limiter l'exposition d'un CV qui aurait fuité via forward
 *  d'email ou cache proxy. Pour la consultation admin, on préfère le stream
 *  via la route Next (cf. /api/admin/applications/[id]/files/[idx]). */
export function presignedDownloadUrl(key: string, expirySeconds = 24 * 60 * 60): Promise<string> {
  return minio.presignedGetObject(BUCKET, key, expirySeconds)
}

/** Stream binaire (pour route admin /files/[idx]). */
export async function getObjectStream(key: string): Promise<NodeJS.ReadableStream> {
  await ensureBucket()
  return minio.getObject(BUCKET, key)
}

/** Best-effort delete (silencieux). */
export async function deleteApplicationFiles(keys: string[]): Promise<void> {
  if (keys.length === 0) return
  try {
    await minio.removeObjects(BUCKET, keys)
  } catch (err) {
    console.error('MinIO delete failed:', err)
  }
}
