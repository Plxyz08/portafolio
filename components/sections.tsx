import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  type Lang,
  type ProductStatus,
  type Shot,
  aiPractice,
  caseStudies,
  certifications,
  copy,
  cv,
  education,
  identity,
  jobs,
  languages,
  metrics,
  products,
  projects,
  stack,
  t,
  testimonials,
} from '@/content/site'

/* ------------------------------------------------------------------ */

export function Hero({ lang }: { lang: Lang }) {
  const c = copy[lang]
  const featuredCase = caseStudies[0]

  return (
    <section className="wrap pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* --- Columna de texto --- */}
        <div className="lg:col-span-8">
          <p className="rise eyebrow flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span>{c.role}</span>
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
            <span>
              {identity.address.locality}, {t(identity.address.countryName, lang)}
            </span>
          </p>

          <h1 className="rise rise-1 h1 mt-5">{identity.name}</h1>

          <p className="rise rise-2 measure mt-6 text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.02em] text-fg-soft">
            {c.hero.claim}
          </p>

          <p className="rise rise-3 lede measure mt-5">{c.hero.lede}</p>

          <div className="rise rise-4 mt-9 flex flex-wrap items-center gap-3">
            <Link href={`/${lang}/${featuredCase.slug}`} className="btn-primary">
              {c.hero.cta}
              <span aria-hidden="true">→</span>
            </Link>
            <a href={cv[lang]} className="btn-ghost" download>
              {c.hero.ctaSecondary}
            </a>
          </div>

          <ul className="rise rise-5 mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-[0.875rem]">
            <li>
              <a className="link-quiet" href={identity.linkedin} rel="me noopener" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="link-quiet" href={identity.github} rel="me noopener" target="_blank">
                GitHub
              </a>
            </li>
            <li>
              <a className="link-quiet" href={`mailto:${identity.email}`}>
                {identity.email}
              </a>
            </li>
          </ul>
        </div>

        {/* --- Retrato ------------------------------------------------
            Móvil: avatar compacto en línea con el estado, para no gastar
            media pantalla antes del titular.
            Escritorio: columna propia con el retrato a tamaño completo. */}
        <div className="rise rise-2 order-first lg:order-none lg:col-span-4 lg:pt-2">
          <div className="flex items-center gap-4 lg:block lg:max-w-[19rem]">
            <div className="w-[4.5rem] shrink-0 overflow-hidden rounded-xl border border-line bg-bg-sunken sm:w-24 lg:w-full lg:rounded-2xl">
              <Image
                src={identity.photo}
                alt={
                  lang === 'es'
                    ? `Retrato de ${identity.name}, ingeniero de software`
                    : `Portrait of ${identity.name}, software engineer`
                }
                width={608}
                height={608}
                priority
                sizes="(min-width: 1024px) 19rem, 6rem"
                className="aspect-square w-full object-cover"
              />
            </div>

            <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase leading-[1.5] tracking-[0.1em] text-muted lg:mt-4">
              <span
                aria-hidden="true"
                className="grid h-2.5 w-2.5 shrink-0 place-items-center rounded-full bg-live/20"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-live" />
              </span>
              {c.hero.availability}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

/**
 * El bloque de métricas es la pieza más importante de la página:
 * es lo único que separa este perfil de cualquier otro. Cifra grande en
 * cifras tabulares, rótulo en texto, y una marca de acento sobre el filete.
 */
export function Metrics({ lang }: { lang: Lang }) {
  const c = copy[lang]

  return (
    <section
      id="metricas"
      className="scroll-mt-20 border-t border-line bg-bg-sunken"
      aria-labelledby="h-metricas"
    >
      <div className="wrap py-14 sm:py-20">
        <h2 id="h-metricas" className="rule-label">
          {c.sections.metrics.title}
        </h2>

        <dl className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-10">
          {metrics.map((m, i) => (
            <div
              key={m.value + t(m.label, lang)}
              className="reveal relative border-t border-line pt-6"
            >
              <span aria-hidden="true" className="absolute -top-px left-0 h-px w-9 bg-accent" />

              <span
                aria-hidden="true"
                className="absolute -top-1 right-0 font-mono text-[0.625rem] tracking-[0.1em] text-muted"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <dt className="display flex items-baseline text-[clamp(3.5rem,8.5vw,5.25rem)] tabular-nums">
                {m.value.startsWith('+') ? (
                  <>
                    <span className="text-[0.45em] text-accent">+</span>
                    <span>{m.value.slice(1)}</span>
                  </>
                ) : (
                  <span>{m.value}</span>
                )}
                {m.suffix && <span className="text-[0.42em] text-muted">{m.suffix}</span>}
              </dt>

              <dd className="mt-3 max-w-[22ch] text-[0.9375rem] leading-[1.5] text-muted">
                {t(m.label, lang)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

/**
 * Encabezado de sección. La marca de acento de 36 px es la misma que corona
 * cada métrica: repetirla es lo que hace que el sitio se lea como un sistema.
 */
function SectionHead({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="reveal">
      <span aria-hidden="true" className="block h-px w-9 bg-accent" />
      {/* El título entra con un barrido de clip-path, no con un simple
          fundido: es el gesto que marca el cambio de sección. */}
      <div className="mt-5 flex items-center gap-6">
        <h2 id={id} className="wipe h2 shrink-0">
          {title}
        </h2>
        <span aria-hidden="true" className="rule-grow h-px flex-1 bg-line" />
      </div>
      {intro && <p className="lede measure mt-5">{intro}</p>}
    </div>
  )
}

export function Experience({ lang }: { lang: Lang }) {
  const c = copy[lang]

  return (
    <section id="experiencia" className="section hand-off" aria-labelledby="h-experiencia">
      <div className="wrap">
        <SectionHead
          id="h-experiencia"
          title={c.sections.work.title}
          intro={c.sections.work.intro}
        />

        {/* Riel vertical: hace legible de un vistazo que son tramos
            paralelos y no una lista suelta de empleos. */}
        <ol className="mt-14 space-y-12 sm:space-y-14">
          {jobs.map((job) => (
            <li key={job.id} className="reveal grid gap-5 lg:grid-cols-[15rem_1fr] lg:gap-12">
              <div className="lg:pt-1">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-fg">
                  {t(job.period, lang)}
                </p>
                <p className="mt-1.5 text-[0.8125rem] text-muted">{t(job.place, lang)}</p>
              </div>

              <div className="relative border-l border-line pl-6 sm:pl-8">
                {/* El riel se rellena de acento conforme bajas: convierte la
                    lista en una línea de tiempo sin añadir una palabra. */}
                <span
                  aria-hidden="true"
                  className="rail-fill absolute -left-px top-0 h-full w-px bg-accent"
                />
                <span
                  aria-hidden="true"
                  className="absolute -left-[3.5px] top-2 h-[7px] w-[7px] rounded-full bg-accent"
                />

                <h3 className="h3">
                  {t(job.title, lang)}
                  <span className="block font-normal text-muted">{t(job.org, lang)}</span>
                </h3>

                {job.note && (
                  <p className="measure mt-3 text-[0.875rem] leading-[1.6] text-muted">
                    {t(job.note, lang)}
                  </p>
                )}

                <ul className="mt-5 space-y-3">
                  {job.bullets[lang].map((b, i) => (
                    <li
                      key={i}
                      className="measure flex gap-3.5 text-[0.9375rem] leading-[1.65] text-fg-soft"
                    >
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

/**
 * ESTADO DEL PRODUCTO
 *
 * Declarar en qué punto está cada producto es una decisión de posicionamiento,
 * no un detalle: el diseño tiene que sostenerla, no disimularla.
 *
 * La escalera se lee sin depender del color: punto lleno → en producción,
 * punto a medias → piloto, punto hueco → en desarrollo. El único color con
 * carga semántica del sitio es el verde de "en producción"; lo demás es tinta.
 */
function StatusBadge({ status, lang }: { status: ProductStatus; lang: Lang }) {
  const c = copy[lang]

  const map: Record<ProductStatus, { text: string; box: string; dot: ReactNode }> = {
    production: {
      text: c.labels.inProduction,
      box: 'border-live/35 bg-live/[0.07] text-live',
      dot: <span className="h-[7px] w-[7px] rounded-full bg-live" />,
    },
    pilot: {
      text: c.labels.pilot,
      box: 'border-line-strong text-fg',
      dot: (
        <span className="h-[7px] w-[7px] overflow-hidden rounded-full border border-current">
          <span className="block h-full w-1/2 bg-current" />
        </span>
      ),
    },
    development: {
      text: c.labels.inDevelopment,
      box: 'border-line text-muted',
      dot: <span className="h-[7px] w-[7px] rounded-full border border-current" />,
    },
  }

  const s = map[status]

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase leading-none tracking-[0.1em] ${s.box}`}
    >
      <span aria-hidden="true" className="flex">
        {s.dot}
      </span>
      {s.text}
    </span>
  )
}

/**
 * Marca del producto. Es el único lugar del sitio donde aparece color de
 * marca ajeno al acento: a 40 px funciona como identificador, no como paleta.
 * Sin archivo de logo compone un monograma, para que la fila no se descuadre.
 */
function ProductMark({ product: p, lang }: { product: (typeof products)[number]; lang: Lang }) {
  if (p.logo) {
    return (
      <Image
        src={p.logo}
        alt={p.logoAlt ? t(p.logoAlt, lang) : ''}
        width={96}
        height={96}
        sizes="40px"
        className="h-10 w-10 shrink-0 object-contain"
      />
    )
  }

  const initials = p.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <span
      aria-hidden="true"
      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line-strong font-mono text-[0.8125rem] font-semibold text-muted"
    >
      {initials}
    </span>
  )
}

/**
 * Galería del producto, plegada por omisión.
 *
 * Las capturas son prueba, no argumento: quien quiera verlas las abre, y
 * mientras tanto no le roban la atención al texto. Se despliegan dentro de la
 * página —sin abrir pestaña ni superposición— con un <details> nativo: cero
 * JavaScript, navegable por teclado y con el estado anunciado solo.
 *
 * Dentro de un <details> cerrado el navegador no descarga las imágenes en
 * `loading="lazy"`, así que plegarlas también quita peso a la primera carga.
 */
function ProductGallery({ shots, lang }: { shots: Shot[]; lang: Lang }) {
  const c = copy[lang]
  const captions = [c.labels.shotLanding, c.labels.shotPanel]

  return (
    <details className="disclosure mt-6 border-t border-line pt-4">
      <summary>
        <svg
          className="chevron h-3 w-3"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4.5 2.5 L8 6 L4.5 9.5" />
        </svg>
        <span className="abrir">
          {c.labels.viewShots} ({shots.length})
        </span>
        <span className="cerrar">{c.labels.hideShots}</span>
      </summary>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {shots.map((shot, i) => (
          <figure key={shot.src}>
            <div className="overflow-hidden rounded-lg border border-line bg-bg-sunken">
              <Image
                src={shot.src}
                alt={t(shot.alt, lang)}
                width={1600}
                height={774}
                sizes="(min-width: 640px) 46vw, 92vw"
                className="w-full"
              />
            </div>
            <figcaption className="mt-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
              {captions[i] ?? ''}
            </figcaption>
          </figure>
        ))}
      </div>
    </details>
  )
}

/**
 * Bloque de producto a ancho completo. El texto va en dos columnas para que
 * el bloque quede bajo y la sección no se alargue.
 *
 * `flagship` marca el despliegue con más empresas encima: filete de acento
 * arriba y rótulo propio, para que se lea como el más grande sin tener que
 * romper la separación entre AutomatIQ y la sociedad aparte.
 */
function ProductCard({ product: p, lang }: { product: (typeof products)[number]; lang: Lang }) {
  const c = copy[lang]

  return (
    <article
      className={`reveal card card-hover ${p.flagship ? 'relative overflow-hidden border-line-strong' : ''}`}
    >
      {p.flagship && (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-accent" />
      )}

      <div className="flex items-center justify-between gap-4">
        <ProductMark product={p} lang={lang} />
        <StatusBadge status={p.status} lang={lang} />
      </div>

      {p.flagship && (
        <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
          {c.labels.flagship}
        </p>
      )}

      <h4
        className={`${p.flagship ? 'mt-1.5 text-2xl' : 'mt-5 text-xl'} font-semibold tracking-[-0.025em]`}
      >
        {p.name}
      </h4>

      {p.metric && (
        <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
          {t(p.metric, lang)}
        </p>
      )}

      <div className="mt-5 grid gap-x-12 gap-y-5 md:grid-cols-2">
        <p className="text-[0.9375rem] leading-[1.65] text-fg-soft">{t(p.summary, lang)}</p>

        {/* Frases completas, no etiquetas: una píldora por función deja
            píldoras de dos líneas y el bloque se rompe. */}
        <ul className="space-y-2">
          {p.features[lang].map((f) => (
            <li key={f} className="flex gap-2.5 text-[0.8125rem] leading-[1.5] text-muted">
              <span aria-hidden="true" className="mt-[0.6em] h-px w-2 shrink-0 bg-line-strong" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {(p.caseStudy || p.url) && (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.875rem]">
          {p.caseStudy && (
            <Link href={`/${lang}/${p.caseStudy}`} className="link font-medium">
              {c.labels.readCase} <span aria-hidden="true">→</span>
            </Link>
          )}
          {p.url && (
            <a href={p.url} className="link-quiet" target="_blank" rel="noopener">
              {c.labels.visitSite} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}

      {p.gallery && p.gallery.length > 0 && <ProductGallery shots={p.gallery} lang={lang} />}
    </article>
  )
}

export function Products({ lang }: { lang: Lang }) {
  const c = copy[lang]

  /* Agrupar por titularidad no es cosmético: es lo que impide que el diseño
     sugiera que Gran Mayorista pertenece a AutomatIQ. */
  const automatiq = products.filter((p) => p.owner === 'automatiq')
  const independent = products.filter((p) => p.owner === 'independent')

  return (
    <section id="productos" className="section hand-off" aria-labelledby="h-productos">
      <div className="wrap">
        <SectionHead
          id="h-productos"
          title={c.sections.products.title}
          intro={c.sections.products.intro}
        />

        <div className="mt-14 space-y-12">
          {/* --- Grupo 1: la sociedad aparte, primero por ser el despliegue
                 más grande. El encabezado deja clara la titularidad antes de
                 que se vea la tarjeta, así que abrir por aquí no confunde. --- */}
          <div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-4">
              <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em]">
                {c.sections.productsIndependent.title}
              </h3>
              <p className="text-[0.8125rem] text-muted">{c.sections.productsIndependent.intro}</p>
            </div>

            <div className="mt-6">
              {independent.map((p) => (
                <ProductCard key={p.id} product={p} lang={lang} />
              ))}
            </div>
          </div>

          {/* --- Grupo 2: AutomatIQ, empresa propia --- */}
          <div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-4">
              <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em]">
                {c.sections.productsAutomatiq.title}
              </h3>
              <p className="text-[0.8125rem] text-muted">{c.sections.productsAutomatiq.intro}</p>
            </div>

            <div className="mt-6 grid gap-5">
              {automatiq.map((p) => (
                <ProductCard key={p.id} product={p} lang={lang} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

export function Projects({ lang }: { lang: Lang }) {
  const c = copy[lang]
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="proyectos" className="section hand-off" aria-labelledby="h-proyectos">
      <div className="wrap">
        <SectionHead
          id="h-proyectos"
          title={c.sections.projects.title}
          intro={c.sections.projects.intro}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <article key={p.id} className="reveal card card-hover flex flex-col p-0">
              {/* Cada archivo trae su propio fondo de marca horneado, así que
                  van a sangre: contenerlos los dejaría como una calcomanía
                  flotando sobre un panel de otro color.

                  La razón va como número y no como fracción: en un valor
                  arbitrario de Tailwind la barra se lee como modificador de
                  opacidad, la clase no se genera y el contenedor colapsa. */}
              {p.image && (
                <div className="aspect-[1.905] w-full overflow-hidden border-b border-line">
                  <Image
                    src={p.image}
                    alt={t(p.imageAlt, lang)}
                    width={1200}
                    height={630}
                    sizes="(min-width: 1024px) 23rem, (min-width: 640px) 45vw, 90vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="h3">{t(p.name, lang)}</h3>
                  <span className="shrink-0 font-mono text-[0.6875rem] text-muted">{p.year}</span>
                </div>

                <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.6] text-fg-soft">
                  {t(p.summary, lang)}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>

                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    className="link mt-5 text-[0.875rem] font-medium"
                  >
                    {c.labels.visitSite} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Trabajo anterior, en tabla: presente pero sin competir por atención. */}
        <ul className="mt-10 border-t border-line">
          {rest.map((p) => (
            <li
              key={p.id}
              className="grid gap-x-8 gap-y-1 border-b border-line py-5 sm:grid-cols-[6rem_1fr]"
            >
              {/* El punto de acento marca el encargo principal del periodo:
                  mismo lenguaje que los hitos del riel de experiencia. */}
              <span className="flex items-center gap-2 self-start font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted sm:pt-1">
                {p.lead && (
                  <span aria-hidden="true" className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
                )}
                {p.year}
              </span>
              <div className="measure">
                <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em]">
                  {t(p.name, lang)}
                </h3>
                <p className="mt-1 text-[0.9375rem] leading-[1.6] text-muted">{t(p.summary, lang)}</p>
                {p.stack.length > 0 && (
                  <p className="mt-2 font-mono text-[0.6875rem] text-muted">{p.stack.join(' · ')}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

export function Testimonials({ lang }: { lang: Lang }) {
  const c = copy[lang]

  return (
    <section className="section hand-off" aria-labelledby="h-referencias">
      <div className="wrap">
        <SectionHead id="h-referencias" title={c.sections.testimonials.title} />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {testimonials.map((tm) => (
            <figure key={tm.id} className="reveal card flex flex-col">
              <span
                aria-hidden="true"
                className="display block text-[2.5rem] leading-[0.5] text-accent"
              >
                &ldquo;
              </span>

              <blockquote className="mt-5 flex-1">
                <p className="text-[0.9375rem] leading-[1.7] text-fg-soft">{t(tm.text, lang)}</p>
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
                {tm.logo && (
                  <Image
                    src={tm.logo}
                    alt={t(tm.logoAlt, lang)}
                    width={80}
                    height={80}
                    sizes="40px"
                    className="h-10 w-10 rounded-lg border border-line bg-bg object-contain p-1"
                  />
                )}
                <span className="text-[0.875rem]">
                  <span className="font-medium">{tm.name}</span>
                  <span className="block text-[0.8125rem] text-muted">{t(tm.position, lang)}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

/**
 * Mismo lenguaje que el bloque de métricas —filete superior y marca de acento
 * de 36 px— para que se lea como una afirmación con peso y no como relleno.
 */
export function AiPractice({ lang }: { lang: Lang }) {
  const ai = aiPractice[lang]

  return (
    <section className="section hand-off" aria-labelledby="h-ia">
      <div className="wrap">
        <SectionHead id="h-ia" title={ai.title} intro={ai.lede} />

        <dl className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {ai.points.map((p) => (
            <div key={p.k} className="reveal relative border-t border-line pt-6">
              <span aria-hidden="true" className="absolute -top-px left-0 h-px w-9 bg-accent" />
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                {p.k}
              </dt>
              <dd className="mt-3 text-[0.9375rem] leading-[1.65] text-fg-soft">{p.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

export function Stack({ lang }: { lang: Lang }) {
  const c = copy[lang]

  return (
    <section className="section hand-off" aria-labelledby="h-stack">
      <div className="wrap">
        <SectionHead id="h-stack" title={c.sections.stack.title} />

        <dl className="mt-14 border-t border-line">
          {stack.map((g) => (
            <div
              key={g.group.en}
              className="grid gap-x-10 gap-y-3 border-b border-line py-5 sm:grid-cols-[14rem_1fr]"
            >
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted sm:pt-1">
                {t(g.group, lang)}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <span key={i} className="chip">
                    {i}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

export function Education({ lang }: { lang: Lang }) {
  const c = copy[lang]

  return (
    <section className="section hand-off" aria-labelledby="h-formacion">
      <div className="wrap">
        <SectionHead id="h-formacion" title={c.sections.education.title} />

        <ul className="mt-14 border-t border-line">
          {education.map((e) => (
            <li
              key={e.id}
              className="grid gap-x-10 gap-y-1 border-b border-line py-5 sm:grid-cols-[14rem_1fr]"
            >
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted sm:pt-1">
                {t(e.period, lang)}
              </span>
              <span className="measure">
                <span className="block text-[0.9375rem] font-semibold tracking-[-0.01em]">
                  {t(e.degree, lang)}
                </span>
                <span className="mt-1 block text-[0.9375rem] text-muted">{t(e.org, lang)}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
          <div>
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
              {c.labels.certifications}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-fg-soft">
              {t(certifications, lang)}
            </p>
          </div>
          <div>
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
              {c.labels.languages}
            </h3>
            <ul className="mt-3 space-y-1.5 text-[0.9375rem] leading-[1.6] text-fg-soft">
              {languages[lang].map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

export function Contact({ lang }: { lang: Lang }) {
  const c = copy[lang]

  return (
    <section
      id="contacto"
      className="scroll-mt-20 border-t border-line bg-bg-sunken"
      aria-labelledby="h-contacto"
    >
      <div className="wrap py-16 sm:py-24">
        <SectionHead id="h-contacto" title={c.sections.contact.title} intro={c.sections.contact.intro} />

        {/* El correo como pieza tipográfica: es la acción que se busca aquí. */}
        <div className="mt-12">
          <a
            href={`mailto:${identity.email}`}
            className="group inline-flex max-w-full flex-wrap items-baseline gap-x-3 text-[clamp(1.25rem,4vw,2.25rem)] font-medium tracking-[-0.03em] text-fg transition-colors hover:text-accent"
          >
            <span className="break-all underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-accent">
              {identity.email}
            </span>
            <span aria-hidden="true" className="text-accent">
              →
            </span>
          </a>
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
              {c.labels.phone}
            </dt>
            <dd className="mt-2 text-[0.9375rem]">
              <a className="link" href={`tel:${identity.phone}`}>
                {identity.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
              LinkedIn
            </dt>
            <dd className="mt-2 text-[0.9375rem]">
              <a className="link" href={identity.linkedin} rel="me noopener" target="_blank">
                /in/sebastian-aparicio00
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
              {c.labels.location}
            </dt>
            <dd className="mt-2 text-[0.9375rem] text-fg-soft">
              {identity.address.locality}, {identity.address.region},{' '}
              {t(identity.address.countryName, lang)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
              {c.labels.downloadCv}
            </dt>
            <dd className="mt-2 text-[0.9375rem]">
              <a href={cv[lang]} download className="link">
                {c.hero.ctaSecondary} <span aria-hidden="true">↓</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
