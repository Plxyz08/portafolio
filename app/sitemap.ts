import type { MetadataRoute } from 'next'
import { LANGS, caseStudies, identity } from '@/content/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-07-29')

  const home = LANGS.map((lang) => ({
    url: `${identity.url}/${lang}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: lang === 'es' ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(LANGS.map((l) => [l, `${identity.url}/${l}`])),
    },
  }))

  const cases = LANGS.flatMap((lang) =>
    caseStudies.map((cs) => ({
      url: `${identity.url}/${lang}/${cs.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          LANGS.map((l) => [l, `${identity.url}/${l}/${cs.slug}`]),
        ),
      },
    })),
  )

  return [...home, ...cases]
}
