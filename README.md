# Tableo

**Le menu QR qui fait tout, gratuitement.**

Tableo est la plateforme menu QR tout-en-un pour restaurants : menu digital, traduction IA, commande & paiement à table, analytics, Google Reviews, CRM client, site web auto-généré — tout gratuit, sans limites.

**Alternative free-forever à NordQR et consorts.**

## Stack

- **Frontend** : Vite + React 18 + TypeScript
- **UI** : Tailwind CSS + shadcn/ui + Radix
- **State** : React Query
- **Routing** : React Router v6
- **Tests** : Vitest + Testing Library

## Démarrage local

```bash
npm install
npm run dev
```

Le front tourne sur `http://localhost:8080`.

## Scripts

- `npm run dev` — serveur de dev Vite
- `npm run build` — build production
- `npm run build:dev` — build mode dev (sourcemaps)
- `npm run preview` — preview du build
- `npm run lint` — eslint
- `npm run test` — vitest run
- `npm run test:watch` — vitest watch

## Structure

```
src/
  components/
    landing/        # Sections de la landing page
    ui/             # shadcn components
    Navbar.tsx
  pages/
    Index.tsx       # Landing
    Dashboard.tsx   # Dashboard restaurateur
    Onboarding.tsx  # Parcours d'inscription
    NotFound.tsx
  assets/           # Images
  hooks/
  lib/
```

## Roadmap MVP

- [x] Landing page (positionnement NordQR killer)
- [ ] Éditeur de menu (drag & drop)
- [ ] Génération QR + pages publiques `/r/:slug`
- [ ] Magic Scan (OCR menu PDF/photo → menu digital)
- [ ] Traduction IA multi-langue
- [ ] Commande à table + paiement
- [ ] Google Reviews intégration
- [ ] Analytics restaurateur
- [ ] API publique + serveur MCP

## Statut

En construction — pas encore en production.
