# M&F Talent Connect — Projet Web Vitrine

## Description du projet
Site vitrine bilingue (Allemand principal, anglais secondaire) pour M&F Talent Connect,
une agence qui met en relation des travailleurs et apprenants africains/européens avec
des entreprises allemandes. Le site inclut un dashboard admin protégé pour gérer les
contenus dynamiques.

---

## Stack technique
- **Framework** : Next.js 14 (App Router, TypeScript)
- **Styles** : Tailwind CSS
- **Base de données** : PostgreSQL + Prisma ORM
- **Auth admin** : variable d'environnement (ADMIN_PASSWORD)
- **Déploiement** : VPS Hetzner, domaine bekeletrack.de (ou domaine final M&F)
- **CI/CD** : GitHub Actions + Docker

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
- Titres : `Playfair Display` (Google Fonts)
- Corps : `DM Sans` (Google Fonts)

### Conventions composants
- Toujours utiliser les composants de `/components/ui/` (Button, Card, Input, Badge)
- Les sections réutilisables sont dans `/components/sections/`
- Le layout global (Navbar, Footer) est dans `/components/layout/`

---

## Structure des pages publiques

| Route | Fichier | Description |
|-------|---------|-------------|
| `/` | `app/page.tsx` | Accueil avec hero éditable |
| `/ueber-uns` | `app/ueber-uns/page.tsx` | Über uns — présentation |
| `/fuer-unternehmen` | `app/fuer-unternehmen/page.tsx` | Pour les entreprises |
| `/fuer-bewerber` | `app/fuer-bewerber/page.tsx` | Pour les candidats |
| `/jobangebote` | `app/jobangebote/page.tsx` | Liste des offres d'emploi |
| `/jobangebote/[id]` | `app/jobangebote/[id]/page.tsx` | Détail d'une offre |
| `/ausbildungsangebote` | `app/ausbildungsangebote/page.tsx` | Liste des formations |
| `/ausbildungsangebote/[id]` | `app/ausbildungsangebote/[id]/page.tsx` | Détail d'une formation |
| `/kontakt` | `app/kontakt/page.tsx` | Contact |
| `/impressum` | `app/impressum/page.tsx` | Mentions légales (obligatoire DE) |
| `/sonstiges` | `app/sonstiges/page.tsx` | Divers |

---

## Dashboard Admin

### Routes admin

| Route | Description |
|-------|-------------|
| `/admin` | Redirect vers `/admin/login` si non connecté |
| `/admin/login` | Page de connexion (mot de passe simple) |
| `/admin/dashboard` | Vue d'ensemble |
| `/admin/hero` | Édition des textes hero/bannières |
| `/admin/jobs` | CRUD des offres d'emploi |
| `/admin/jobs/new` | Créer une offre |
| `/admin/jobs/[id]` | Modifier une offre |
| `/admin/formations` | CRUD des offres de formation |
| `/admin/formations/new` | Créer une formation |
| `/admin/formations/[id]` | Modifier une formation |

### Authentification
- Mot de passe stocké dans `.env` : `ADMIN_PASSWORD=...`
- Session gérée via cookie httpOnly signé (pas de lib externe)
- Middleware Next.js protège toutes les routes `/admin/*` sauf `/admin/login`
- Fichier middleware : `middleware.ts` à la racine

### Ce qui est éditable depuis le dashboard

**1. Textes Hero / Bannières** (table `hero_content`)
- Titre principal
- Sous-titre
- Texte du bouton CTA
- Lien du bouton CTA

**2. Offres d'emploi** (table `job_offers`)
- Titre du poste
- Entreprise
- Lieu (ville, région)
- Type de contrat (Vollzeit, Teilzeit, Minijob)
- Description
- Exigences
- Date de publication
- Statut (actif / archivé)

**3. Offres de formation** (table `training_offers`)
- Titre de la formation
- Domaine / secteur
- Durée
- Lieu
- Description
- Conditions d'accès
- Date de début
- Statut (actif / archivé)

---

## Schéma Prisma (référence)

```prisma
model HeroContent {
  id        Int      @id @default(autoincrement())
  key       String   @unique  // ex: "home_hero", "bewerber_hero"
  title     String
  subtitle  String
  ctaText   String
  ctaLink   String
  updatedAt DateTime @updatedAt
}

model JobOffer {
  id          Int      @id @default(autoincrement())
  title       String
  company     String
  location    String
  contractType String
  description String   @db.Text
  requirements String  @db.Text
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model TrainingOffer {
  id           Int      @id @default(autoincrement())
  title        String
  sector       String
  duration     String
  location     String
  description  String   @db.Text
  conditions   String   @db.Text
  startDate    String
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## Variables d'environnement (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mf_talent"
ADMIN_PASSWORD="choisir_un_mot_de_passe_fort"
COOKIE_SECRET="une_chaine_aleatoire_longue"
NEXT_PUBLIC_SITE_URL="https://domaine-final.de"
```

---

## Conventions de code

- Toujours typer les props avec TypeScript (pas de `any`)
- Les appels Prisma se font uniquement dans les Server Components ou les Route Handlers (`/app/api/`)
- Les composants client (`"use client"`) uniquement quand nécessaire (formulaires, interactions)
- Nommer les fichiers de composants en PascalCase : `HeroSection.tsx`
- Nommer les routes et dossiers en kebab-case : `fuer-unternehmen`

---

## Structure de dossiers complète

```
mf-talent-connect/
│
├── CLAUDE.md                        ← ce fichier
├── middleware.ts                    ← protection routes /admin
├── .env                             ← variables d'environnement
│
├── .claude/
│   └── commands/
│       ├── new-page.md              ← /new-page [nom]
│       ├── new-admin-page.md        ← /new-admin-page [nom]
│       └── db-migrate.md            ← /db-migrate
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── ueber-uns/
│   │   ├── fuer-unternehmen/
│   │   ├── fuer-bewerber/
│   │   ├── jobangebote/
│   │   ├── ausbildungsangebote/
│   │   ├── kontakt/
│   │   ├── impressum/
│   │   ├── sonstiges/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── hero/
│   │   │   ├── jobs/
│   │   │   └── formations/
│   │   └── api/
│   │       ├── admin/auth/
│   │       ├── jobs/
│   │       └── formations/
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AdminSidebar.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── ServicesSection.tsx
│   │       └── JobCard.tsx
│   │
│   └── lib/
│       ├── prisma.ts                ← instance Prisma singleton
│       ├── auth.ts                  ← logique cookie admin
│       └── config.ts                ← coordonnées, réseaux sociaux
│
└── public/
    ├── logo.svg
    └── images/
```

---

## Commandes utiles

```bash
# Dev
npm run dev

# Prisma
npx prisma migrate dev --name init
npx prisma studio

# Build & deploy
npm run build
docker compose up -d
```

---

## Priorité de développement suggérée

1. Setup projet (Tailwind, fonts, Prisma, .env)
2. Composants UI de base (Button, Card, Badge)
3. Layout (Navbar, Footer)
4. Pages statiques (Accueil, Über uns, Für Unternehmen, Für Bewerber)
5. Middleware admin + page login
6. Dashboard admin (Hero, Jobs, Formations)
7. Pages dynamiques publiques (Jobangebote, Ausbildungsangebote)
8. Kontakt, Impressum, Sonstiges
9. SEO, optimisation, déploiement