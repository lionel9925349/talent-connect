import { defineConfig } from 'prisma/config'
import 'dotenv/config'

// earlyAccess + migrate.adapter ne sont pas encore dans les types Prisma 7
// mais fonctionnent au runtime — on caste vers le type du paramètre de
// defineConfig (et non `any`) pour autoriser les propriétés en avance de phase.
type DefineConfigArg = Parameters<typeof defineConfig>[0]

export default defineConfig({
  earlyAccess: true,
  schema: 'prisma/schema.prisma',
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrate: {
    async adapter() {
      const { PrismaPg } = await import('@prisma/adapter-pg')
      return new PrismaPg({ connectionString: process.env.DATABASE_URL! })
    },
  },
} as DefineConfigArg)
