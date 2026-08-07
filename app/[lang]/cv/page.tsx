import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  LANGS,
  type Lang,
  certifications,
  copy,
  education,
  identity,
  jobs,
  languages,
  projects,
  stack,
  t,
} from '@/content/site'

/**
 * CV en HTML — es la fuente de la que se imprime el PDF.
 * Un solo contenido, dos artefactos: esta página (que los buscadores y los
 * rastreadores de reclutamiento leen como texto) y el PDF descargable.
 * Ver scripts/build-cv-pdf.mjs.
 */

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!LANGS.includes(lang as Lang)) return {}
  const l = lang as Lang
  const title = l === 'es' ? 'Currículum' : 'Résumé'
  const description =
    l === 'es'
      ? `Currículum de ${identity.name}: Software Engineer y fundador de AutomatIQ, SaaS multi-tenant en producción para más de 21 negocios.`
      : `Résumé of ${identity.name}: software engineer and founder of AutomatIQ, multi-tenant SaaS in production for over 21 businesses.`

  return {
    title,
    description,
    alternates: {
      canonical: `/${l}/cv`,
      languages: { es: '/es/cv', en: '/en/cv', 'x-default': '/es/cv' },
    },
  }
}

/**
 * Estilos de impresión.
 *
 * En vez de forzar `color: #111` sobre todo —que aplastaba también los
 * títulos y los enlaces— se redefine la paleta a valores de papel. Todo lo
 * que hay debajo se adapta solo, el color de acento sobrevive, y si alguien
 * imprime con el modo oscuro activo no sale texto blanco sobre blanco.
 */
const CV_STYLE = `
  @page { size: A4; margin: 14mm 15mm; }
  @media print {
    :root, .dark {
      --bg: 255 255 255;
      --card: 255 255 255;
      --fg: 17 17 17;
      --fg-soft: 51 51 51;
      --muted: 88 88 88;
      --line: 208 208 208;
      --line-strong: 170 170 170;
      --accent: 11 99 206;
    }
    header[data-site-header], footer[data-site-footer], [data-no-print] { display: none !important; }
    body { background: #fff !important; }
    .cv { max-width: none !important; padding: 0 !important; }
    .cv-section { break-inside: avoid; }
    /* El subrayado estorba en papel; el color ya indica que es un enlace, y
       en el PDF la anotación sigue siendo pulsable igual. */
    .cv a { text-decoration: none; }
  }
`

/** `https://www.linkedin.com/in/x` -> `linkedin.com/in/x`. */
function sinProtocolo(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

/** Punto medio entre datos de contacto, con espacio no separable a los lados. */
function Separador() {
  return <span aria-hidden="true">{' · '}</span>
}

export default async function CvPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!LANGS.includes(lang as Lang)) notFound()
  const l = lang as Lang
  const c = copy[l]
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  const L =
    l === 'es'
      ? {
          summary: 'Perfil profesional',
          experience: 'Experiencia profesional',
          projects: 'Proyectos',
          education: 'Formación académica',
          certs: 'Certificaciones',
          skills: 'Habilidades técnicas',
          langs: 'Idiomas',
        }
      : {
          summary: 'Professional summary',
          experience: 'Professional experience',
          projects: 'Projects',
          education: 'Education',
          certs: 'Certifications',
          skills: 'Technical skills',
          langs: 'Languages',
        }

  const summary =
    l === 'es'
      ? 'Ingeniero de software con 3 años de experiencia construyendo sistemas en producción de punta a punta. Fundador de AutomatIQ, donde diseño y opero plataformas SaaS multi-tenant que hoy soportan la operación diaria de más de 21 negocios en Colombia. En paralelo presto servicios de desarrollo para Vectux Analytics, consultora de inteligencia artificial y analítica avanzada con sede en Ciudad de México, con alcance ampliado a la entrega de MVPs completos e infraestructura en Google Cloud. Trabajo con asistentes de IA integrados en el flujo de desarrollo, sin delegar la revisión de lo que llega a producción. Cursando el último año de Ingeniería de Software.'
      : 'Software engineer with 3 years of experience building production systems end to end. Founder of AutomatIQ, where I design and operate multi-tenant SaaS platforms that currently run the daily operations of more than 21 businesses in Colombia. In parallel I provide development services to Vectux Analytics, an AI and advanced analytics consultancy based in Mexico City, with scope extended to full MVP delivery and Google Cloud infrastructure. I work with AI assistants built into my development workflow, without delegating review of what reaches production. Final year of a Software Engineering degree.'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CV_STYLE }} />

      <div className="cv wrap max-w-3xl py-10 text-[13px] leading-[1.5]">
        <header className="border-b border-line pb-5 text-center">
          <h1 className="text-[1.75rem] font-bold tracking-[-0.03em]">{identity.name}</h1>
          <p className="mt-1 text-sm font-semibold text-accent">{c.role}</p>

          <p className="mt-3 text-xs text-muted">
            {identity.address.locality}, {t(identity.address.countryName, l)}
            <Separador />
            <a href={`tel:${identity.phone}`}>{identity.phoneDisplay}</a>
            <Separador />
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </p>

          {/* Enlaces reales: en el PDF quedan como anotaciones pulsables, no
              como texto suelto que haya que copiar a mano. */}
          <p className="mt-1.5 text-xs text-accent">
            <a href={identity.url}>{sinProtocolo(identity.url)}</a>
            <Separador />
            <a href={identity.linkedin}>{sinProtocolo(identity.linkedin)}</a>
            <Separador />
            <a href={identity.github}>{sinProtocolo(identity.github)}</a>
          </p>
        </header>

        <section className="cv-section mt-6">
          <h2 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">{L.summary}</h2>
          <p className="mt-2 text-muted">{summary}</p>
        </section>

        <section className="cv-section mt-6">
          <h2 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">{L.experience}</h2>
          {jobs.map((job) => (
            <div key={job.id} className="mt-4">
              <h3 className="font-semibold">
                {t(job.org, l)} — {t(job.title, l)}
              </h3>
              <p className="text-xs text-muted">
                {t(job.period, l)} · {t(job.place, l)}
              </p>
              {job.note && <p className="mt-1.5 text-muted">{t(job.note, l)}</p>}
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-muted marker:text-line">
                {job.bullets[l].map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="cv-section mt-6">
          <h2 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">{L.projects}</h2>
          <ul className="mt-2 space-y-2 text-muted">
            {featured.map((p) => (
              <li key={p.id}>
                <span className="font-semibold text-fg">{t(p.name, l)}</span> ({p.year}) —{' '}
                {t(p.summary, l)} {p.stack.length > 0 && <em>{p.stack.join(', ')}.</em>}
              </li>
            ))}
            {/* Trabajo anterior condensado: una sola línea, para no gastar
                media página en proyectos que ya no definen el perfil. */}
            <li>
              <span className="font-semibold text-fg">
                {l === 'es' ? 'Trabajo anterior' : 'Earlier work'}:
              </span>{' '}
              {rest.map((p, i) => (
                <span key={p.id}>
                  {i > 0 && '; '}
                  {t(p.name, l)} ({p.year})
                  {p.stack.length > 0 && ` — ${p.stack.join(', ')}`}
                </span>
              ))}
              .
            </li>
          </ul>
        </section>

        <section className="cv-section mt-6">
          <h2 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">{L.education}</h2>
          <ul className="mt-2 space-y-1.5">
            {education.map((e) => (
              <li key={e.id}>
                <span className="font-semibold">{t(e.degree, l)}</span>{' '}
                <span className="text-muted">
                  — {t(e.org, l)} · {t(e.period, l)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-section mt-6">
          <h2 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">{L.certs}</h2>
          <p className="mt-2 text-muted">{t(certifications, l)}</p>
        </section>

        <section className="cv-section mt-6">
          <h2 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">{L.skills}</h2>
          <ul className="mt-2 space-y-1 text-muted">
            {stack.map((g) => (
              <li key={g.group.en}>
                <span className="font-semibold text-fg">{t(g.group, l)}:</span> {g.items.join(', ')}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-section mt-6">
          <h2 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">{L.langs}</h2>
          <ul className="mt-2 space-y-0.5 text-muted">
            {languages[l].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
