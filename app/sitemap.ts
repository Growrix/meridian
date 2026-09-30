import type { MetadataRoute } from 'next'
import { properties } from '@/lib/data'

const BASE = 'https://meridianestates.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${BASE}/properties/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...propertyRoutes,
  ]
}
