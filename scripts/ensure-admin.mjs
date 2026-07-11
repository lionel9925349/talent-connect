/**
 * Crée ou met à jour le compte admin à partir de ADMIN_EMAIL / ADMIN_PASSWORD.
 * Exécuté à chaque démarrage du conteneur, après les migrations (voir
 * docker-entrypoint.sh). Idempotent : no-op si le compte existe déjà avec le
 * bon mot de passe. Un échec n'empêche pas le serveur de démarrer (le site
 * public fonctionne sans compte admin).
 *
 * Tourne dans /opt/prisma-cli (image runner) où bcryptjs et pg sont installés
 * à plat — pas de TypeScript ni de transpilation ici.
 */
import bcrypt from 'bcryptjs'
import pg from 'pg'
import crypto from 'node:crypto'

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'admin@mf-talent-connect.de').trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    console.warn('[ensure-admin] ADMIN_PASSWORD absent — étape ignorée')
    return
  }

  const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()
  try {
    const { rows } = await client.query('SELECT "passwordHash" FROM users WHERE email = $1', [email])
    if (rows[0] && bcrypt.compareSync(password, rows[0].passwordHash)) {
      console.log(`[ensure-admin] compte admin déjà à jour : ${email}`)
      return
    }
    await client.query(
      `INSERT INTO users (id, email, "passwordHash", role, "updatedAt")
       VALUES ($1, $2, $3, 'admin', NOW())
       ON CONFLICT (email) DO UPDATE SET "passwordHash" = $3, "updatedAt" = NOW()`,
      [crypto.randomUUID(), email, bcrypt.hashSync(password, 12)],
    )
    console.log(`[ensure-admin] compte admin prêt : ${email}`)
  } finally {
    await client.end()
  }
}

main().catch((err) => {
  console.error('[ensure-admin] échec (le serveur démarre quand même) :', err.message)
})
