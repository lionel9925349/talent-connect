FROM node:22.14-alpine AS base
RUN corepack enable

# ── 1. Install dependencies ───────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile
RUN pnpm exec prisma generate

# ── 2. Build ──────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Env factices pour le build uniquement : lib/prisma.ts exige DATABASE_URL à
# l'import, et les pages prérendues catchent l'échec de connexion. Les vraies
# valeurs sont injectées au runtime par docker compose (stage runner ≠ builder).
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV AUTH_SECRET="build-only-secret-not-used-at-runtime"
ENV NEXT_PUBLIC_SITE_URL="https://mf-talent-connect.de"
RUN pnpm build

# ── 3. Production runner ──────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user (mitigation container escape).
RUN addgroup -S app && adduser -S app -G app

# Next.js standalone output (~150 MB vs ~500 MB sinon).
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static
COPY --from=builder --chown=app:app /app/public ./public

# Prisma + adapter + entrypoint (migrations au boot).
COPY --from=builder --chown=app:app /app/prisma ./prisma
COPY --from=builder --chown=app:app /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=app:app /app/node_modules/.bin/prisma ./node_modules/.bin/prisma
COPY --from=builder --chown=app:app /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=app:app /app/node_modules/@prisma ./node_modules/@prisma

COPY --chown=app:app docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER app

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
