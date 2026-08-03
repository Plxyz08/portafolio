import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LANGS, type Lang, caseStudies, copy, identity, t } from '@/content/site'
import { breadcrumbSchema, caseStudySchema } from '@/lib/json-ld'
import TenancyDiagram from '@/components/tenancy-diagram'

export function generateStaticParams() {
  return LANGS.flatMap((lang) => caseStudies.map((cs) => ({ lang, slug: cs.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const cs = caseStudies.find((x) => x.slug === slug)
  if (!cs || !LANGS.includes(lang as Lang)) return {}
  const l = lang as Lang

  const title = `${cs.product} — ${t(cs.title, l)}`
  const description = t(cs.summary, l)

  return {
    title,
    description,
    alternates: {
      canonical: `/${l}/${cs.slug}`,
      languages: {
        es: `/es/${cs.slug}`,
        en: `/en/${cs.slug}`,
        'x-default': `/es/${cs.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${identity.url}/${l}/${cs.slug}`,
      locale: l === 'es' ? 'es_CO' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!LANGS.includes(lang as Lang)) notFound()
  const l = lang as Lang
  const cs = caseStudies.find((x) => x.slug === slug)
  if (!cs) notFound()

  const c = copy[l]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema(cs.slug, l)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema(l, [
              { name: identity.name, path: `/${l}` },
              { name: cs.product, path: `/${l}/${cs.slug}` },
            ]),
          ),
        }}
      />

      <article className="wrap py-12 sm:py-16">
        <nav aria-label={l === 'es' ? 'Ruta de navegación' : 'Breadcrumb'} className="mb-12">
          <Link
            href={`/${l}`}
            className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-fg"
          >
            <span aria-hidden="true">←</span> {c.labels.backHome}
          </Link>
        </nav>

        {/* Una sola columna editorial de 56rem para cabecera, ficha y diagrama;
            la prosa se estrecha dentro de ella para no pasar de ~68 caracteres. */}
        <div className="max-w-[56rem]">
          <header>
            <p className="eyebrow">
              {c.sections.caseStudy.title} · {cs.product}
            </p>

            {/* Único uso del serif fuera de las métricas: el titular del caso. */}
            <h1 className="display mt-6 text-[clamp(2.25rem,6vw,4rem)]">{t(cs.title, l)}</h1>

            <p className="lede measure mt-7">{t(cs.summary, l)}</p>
          </header>

          <dl className="mt-14 grid gap-x-8 gap-y-7 border-y border-line py-7 sm:grid-cols-2 lg:grid-cols-4">
            {cs.meta[l].map((m) => (
              <div key={m.k}>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                  {m.k}
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-[1.5]">{m.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 space-y-16">
            {cs.sections.map((s, i) => (
              <section key={s.key} aria-labelledby={`cs-${s.key}`}>
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.6875rem] tracking-[0.1em] text-accent"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 id={`cs-${s.key}`} className="h2">
                    {c.labels[s.key]}
                  </h2>
                </div>

                <div className="prose-body mt-6 max-w-[40rem]">
                  {s.body[l].map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>

                {/* El diagrama cierra "El problema" y abre las decisiones:
                    ahí es donde el lector necesita ver el cambio, no leerlo. */}
                {s.key === 'problem' && <TenancyDiagram lang={l} />}
              </section>
            ))}
          </div>

          <div className="mt-20 border-t border-line pt-10">
            <p className="text-[1.0625rem] leading-[1.6] text-fg-soft">
              {l === 'es'
                ? '¿Quieres hablar sobre este trabajo o sobre una posición?'
                : 'Want to talk about this work or about a role?'}
            </p>
            <a
              href={`mailto:${identity.email}`}
              className="mt-3 inline-flex max-w-full flex-wrap items-baseline gap-x-3 text-[clamp(1.125rem,3vw,1.75rem)] font-medium tracking-[-0.03em] transition-colors hover:text-accent"
            >
              <span className="break-all underline decoration-line-strong decoration-1 underline-offset-[6px]">
                {identity.email}
              </span>
              <span aria-hidden="true" className="text-accent">
                →
              </span>
            </a>
          </div>
        </div>
      </article>
    </>
  )
}
