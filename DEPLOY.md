# OpenHub Deployment Guide

## Prerequisites
- Cloudflare account with Pages and D1 access
- Wrangler CLI authenticated: `wrangler login`

## First-time setup

### 1. Create D1 database
```
wrangler d1 create openhub
```
Copy the `database_id` from output and update `wrangler.toml`:
```toml
database_id = "YOUR_DATABASE_ID_HERE"
```

### 2. Initialize database
```
wrangler d1 execute openhub --remote --file=scripts/schema.sql
wrangler d1 execute openhub --remote --file=scripts/seed.sql
```

### 3. Create R2 bucket
```
wrangler r2 bucket create openhub-assets
```

### 4. Set environment variables in Cloudflare Pages
In Cloudflare Dashboard → Pages → openhub → Settings → Environment variables:
```
ADMIN_PASSWORD       = <your-admin-password>
ADMIN_SECRET         = <random-32-char-string>
COLLECT_WEBHOOK_SECRET = <random-secret-for-github-actions>
NEXT_PUBLIC_BASE_URL = https://your-domain.pages.dev
```

### 5. Set GitHub Actions secrets
In GitHub repo → Settings → Secrets and variables → Actions:
```
GH_TOKEN              = GitHub Personal Access Token (public_repo scope)
COLLECT_WEBHOOK_URL   = https://your-domain.pages.dev/api/webhook/collect
COLLECT_WEBHOOK_SECRET = (same as above)
```

## Deploy

```
npm run build
wrangler pages deploy .vercel/output/static
```

Or push to main branch if CI is connected.

## Verify after deploy
- [ ] Homepage loads at your domain
- [ ] `/sitemap.xml` has content
- [ ] `/admin` redirects to `/admin/login`
- [ ] Login with ADMIN_PASSWORD works
- [ ] Pending queue page loads (may be empty initially)
- [ ] Manually trigger GitHub Action to test collection

## Manual first data load
After deploy, run the collector manually once:
```
python scripts/collect.py
```
(set env vars locally first, point COLLECT_WEBHOOK_URL to production)

Then log in to admin and approve 20-50 projects to seed the site.
