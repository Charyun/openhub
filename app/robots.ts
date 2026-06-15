import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://openhub.pages.dev'
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin' },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
