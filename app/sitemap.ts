import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scanmart.app'

// Last-modified date for content pages
const LAST_MODIFIED = '2026-03-16'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ─── Core Public Pages ───────────────────────────────────────────────────
    {
      url: siteUrl,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/features`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // ─── Vendor Public Pages ─────────────────────────────────────────────────
    // /vendor/apply — publicly accessible vendor onboarding page
    {
      url: `${siteUrl}/vendor/apply`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // /vendor/login — publicly accessible login page
    {
      url: `${siteUrl}/vendor/login`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },

    // ─── Admin Public Pages ──────────────────────────────────────────────────
    // /admin/login — publicly accessible admin login page
    {
      url: `${siteUrl}/admin/login`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // ─── Excluded (noindex — authenticated/private routes) ───────────────────
    // /vendor/dashboard/**  — vendor portal (noindex, nofollow)
    // /admin/dashboard/**   — admin portal (noindex, nofollow)
  ]
}

