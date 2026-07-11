#!/bin/sh
set -e

echo "[mf-talent] Running database migrations…"
node_modules/.bin/prisma migrate deploy

echo "[mf-talent] Starting server…"
exec node server.js
