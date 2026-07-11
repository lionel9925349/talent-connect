# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# M&F Talent Connect — Projet Web Vitrine

## Description du projet
Site vitrine bilingue (Allemand principal, Français secondaire) pour M&F Talent Connect,
une agence qui met en relation des travailleurs et apprenants venus de l'étranger avec
des entreprises allemandes. Le site inclut un dashboard admin protégé pour gérer les
contenus dynamiques.

---

## Stack technique
- **Framework** : Next.js 16 (App Router, TypeScript)
- **Styles** : Tailwind CSS v4
- **Base de données** : PostgreSQL + Prisma ORM v7 (adapter `@prisma/adapter-pg`)
- **Auth admin** : cookie HMAC signé (lib/auth.ts) via variable `ADMIN_PASSWORD`

---

## Commandes

```bash
pnpm dev         # Serveur de développement
pnpm build       # Build de production
pnpm lint        # ESLint

# Prisma
npx prisma generate          # Générer le client Prisma
npx prisma migrate dev       # Appliquer les migrations
npx prisma studio            # Interface de gestion DB
```

---

## Design system

### Couleurs
- Bleu principal : `#1A3A6B`
- Bleu hover : `#2355A0`
- Orange accent : `#E87722`
- Orange hover : `#C9631A`
- Fond clair : `#F7F8FA`
- Texte principal : `#1A1A2E`
- Texte muted : `#6B7280`

### Typographie
- Titres : `Playfair Display` (via `var(--font-heading)` CSS variable)
- Corps : `DM Sans` (via `var(--font-body)`)

### Composants UI
- `components/ui/` — Button, Card, Input/Textarea, Badge
- `components/sections/` — HeroSection, ServicesSection, JobCard
- `components/layout/` — Navbar, Footer, AdminSidebar

---

## Architecture des routes

### Pages publiques (route group `(public)`)

Les pages sous `app/(public)/` partagent Navbar + Footer via `app/(public)/layout.tsx`.
Exception : `app/page.tsx` (home) est à la racine car route group ne peut pas coexister avec `app/page.tsx`.

| Route | Description |
|-------|-------------|
| `/` | Accueil — `app/page.tsx` |
| `/ueber-uns` | Über uns |
| `/fuer-unternehmen` | Pour les entreprises |
| `/fuer-bewerber` | Pour les candidats |
| `/jobangebote` | Liste des offres d'emploi (Server Component) |
| `/jobangebote/[id]` | Détail d'une offre |
| `/ausbildungsangebote` | Liste des formations |
| `/ausbildungsangebote/[id]` | Détail d'une formation |
| `/kontakt` | Contact (Client Component avec formulaire) |
| `/impressum` | Mentions légales |
| `/sonstiges` | Datenschutzerklärung |

### Dashboard Admin

| Route | Description |
|-------|-------------|
| `/admin` | Redirect → `/admin/dashboard` |
| `/admin/login` | Page de connexion |
| `/admin/dashboard` | Vue d'ensemble |
| `/admin/hero` | Édition des textes hero |
| `/admin/jobs` | CRUD offres d'emploi |
| `/admin/formations` | CRUD formations |

`app/admin/layout.tsx` affiche la sidebar si authentifié, sinon rend le contenu brut.

### API Routes (`app/api/admin/`)

- `auth/route.ts` — POST login, DELETE logout
- `auth/logout/route.ts` — POST logout (form action)
- `hero/route.ts` — GET/POST hero content
- `jobs/route.ts` et `jobs/[id]/route.ts` — CRUD jobs
- `formations/route.ts` et `formations/[id]/route.ts` — CRUD formations

---

## Authentification admin
- `middleware.ts` protège `/admin/*` sauf `/admin/login`
- Cookie httpOnly `admin_session` signé HMAC-SHA256, durée 8h
- `lib/auth.ts` : fonctions `setAdminSession`, `clearAdminSession`, `isAdminAuthenticated`

---

## Prisma v7 — Important

Le client doit être instancié avec l'adapter explicitement (pas de `url` dans `schema.prisma`) :
```ts
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
new PrismaClient({ adapter })
```
Configuration des migrations dans `prisma.config.ts`.
Appels Prisma **uniquement** dans Server Components ou Route Handlers.

---

## Variables d'environnement (`.env.local`)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mf_talent"
ADMIN_PASSWORD="votre_mot_de_passe"
COOKIE_SECRET="chaine_aleatoire_longue"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## Conventions

- Pas de `any` TypeScript
- `"use client"` uniquement pour formulaires et interactions utilisateur
- Fichiers composants en PascalCase, routes et dossiers en kebab-case
