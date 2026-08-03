import {
  type Lang,
  caseStudies,
  copy,
  education,
  identity,
  jobs,
  knowsAbout,
  t,
} from '@/content/site'

/**
 * schema.org/Person — la pieza que permite a Google, LinkedIn Recruiter y
 * demás herramientas de sourcing resolver los perfiles como una sola entidad.
 */
export function personSchema(lang: Lang) {
  const c = copy[lang]
  const vectux = jobs.find((j) => j.id === 'vectux')!
  const uni = education.find((e) => e.id === 'ingenieria')!
  const sena = education.find((e) => e.id === 'sena')!

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${identity.url}/#person`,
    name: identity.name,
    givenName: 'Sebastián',
    familyName: 'Aparicio',
    url: identity.url,
    image: `${identity.url}${identity.photo}`,
    jobTitle: c.role,
    description: c.meta.description,
    email: `mailto:${identity.email}`,
    telephone: identity.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: identity.address.locality,
      addressRegion: identity.address.region,
      addressCountry: identity.address.country,
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: 'AutomatIQ',
        url: 'https://automatiqpos.com',
      },
      {
        '@type': 'Organization',
        // t() es obligatorio: estos campos pueden venir como par ES/EN y
        // schema.org exige que `name` sea una cadena. Un objeto aquí hace que
        // Google descarte la entidad entera en silencio.
        name: t(vectux.org, lang),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ciudad de México',
          addressCountry: 'MX',
        },
      },
    ],
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: t(uni.org, lang),
      },
      {
        '@type': 'EducationalOrganization',
        name: t(sena.org, lang),
      },
    ],
    knowsAbout,
    knowsLanguage: [
      { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
    nationality: { '@type': 'Country', name: 'Colombia' },
    sameAs: identity.sameAs(),
  }
}

export function profilePageSchema(lang: Lang) {
  const c = copy[lang]
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${identity.url}/${lang}#profilepage`,
    url: `${identity.url}/${lang}`,
    name: c.meta.title,
    description: c.meta.description,
    inLanguage: lang === 'es' ? 'es-CO' : 'en-US',
    mainEntity: { '@id': `${identity.url}/#person` },
  }
}

export function caseStudySchema(slug: string, lang: Lang) {
  const cs = caseStudies.find((x) => x.slug === slug)
  if (!cs) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t(cs.title, lang),
    description: t(cs.summary, lang),
    inLanguage: lang === 'es' ? 'es-CO' : 'en-US',
    url: `${identity.url}/${lang}/${cs.slug}`,
    author: { '@id': `${identity.url}/#person` },
    publisher: { '@id': `${identity.url}/#person` },
    about: { '@type': 'SoftwareApplication', name: cs.product, applicationCategory: 'BusinessApplication' },
  }
}

export function breadcrumbSchema(lang: Lang, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${identity.url}${it.path}`,
    })),
  }
}
