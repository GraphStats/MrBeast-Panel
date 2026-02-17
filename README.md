# MrBeast Stats Dashboard (Next.js + Neon)

Site Next.js deployable sur Vercel avec:
- API `GET /api/get-api-count` qui ping Mixerno puis insere en base Neon
- API `GET /api/stats` qui renvoie l'historique
- Dashboard avec compteurs et graphique

## 1) Installation locale

```bash
npm install
cp .env.example .env.local
```

Remplis `DATABASE_URL` avec ta chaine Neon.

Puis:

```bash
npm run dev
```

## 2) Endpoints

- `GET /api/get-api-count`
  - Fetch: `https://backend.mixerno.space/api/youtube/estv3/UCX6OQ3DkcsbYNE6H8uQQuVA`
  - Lit `subscriberCount`, `videoCount`, `viewCount`
  - Insert dans `channel_stats`

- `GET /api/stats?limit=200`
  - Retourne les N derniers points, ordre chronologique

## 3) Structure DB

Le schema est dans `sql/init.sql`.
Le code cree aussi la table automatiquement si elle n'existe pas.

## 4) Deploy Vercel

1. Push sur GitHub
2. Import du repo dans Vercel
3. Ajoute la variable d'environnement `DATABASE_URL`
4. Deploy

## 5) Ping automatique (optionnel)

Tu peux scheduler `/api/get-api-count` avec:
- Vercel Cron
- ou UptimeRobot / cron externe
