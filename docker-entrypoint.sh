#!/bin/sh
set -e

echo "[mf-talent] Running database migrations…"
(cd /opt/prisma-cli && node_modules/.bin/prisma migrate deploy)

echo "[mf-talent] Ensuring admin account…"
(cd /opt/prisma-cli && node ensure-admin.mjs)

echo "[mf-talent] Starting server…"
exec node server.js
