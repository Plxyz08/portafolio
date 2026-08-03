import Link from 'next/link'
import { type Lang, copy, identity } from '@/content/site'
import ThemeToggle from '@/components/theme-toggle'
import Logo from '@/components/logo'

/**
 * MENÚ MÓVIL SIN JAVASCRIPT
 *
 * El panel se abre y se cierra con `:target`. La gracia de usar :target en
 * vez de un <details> es que al pulsar un enlace de sección el destino del
 * documento cambia, el panel deja de ser :target y se cierra solo. Con
 * <details> habría que cerrarlo a mano y sin JS no hay forma.
 *
 * El panel va en el DOM siempre —solo cambia su `display`— así que sus
 * enlaces siguen siendo rastreables.
 */
export default function SiteHeader({ lang }: { lang: Lang }) {
  const c = copy[lang]
  const other: Lang = lang === 'es' ? 'en' : 'es'

  const links = [
    { href: `/${lang}#experiencia`, hash: '#experiencia', label: c.nav.work },
    { href: `/${lang}#productos`, hash: '#productos', label: c.nav.products },
    { href: `/${lang}#proyectos`, hash: '#proyectos', label: c.nav.projects },
    { href: `/${lang}#contacto`, hash: '#contacto', label: c.nav.contact },
  ]

  const abrirMenu = lang === 'es' ? 'Abrir el menú' : 'Open menu'
  const cerrarMenu = lang === 'es' ? 'Cerrar el menú' : 'Close menu'

  return (
    <>
    <header
      id="inicio"
      data-site-header
      className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70"
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${lang}`}
          className="group flex shrink-0 items-center gap-2.5 text-[0.9375rem] font-semibold tracking-[-0.03em]"
        >
          <Logo className="h-7 w-7 shrink-0" />
          <span className="transition-colors group-hover:text-accent">{identity.name}</span>
        </Link>

        {/* --- Navegación de escritorio --- */}
        <nav
          aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}
          className="hidden md:block"
        >
          <ul className="flex items-center gap-1 text-[0.875rem] text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-2.5 py-1.5 transition-colors hover:bg-accent-soft hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/${other}`}
            hrefLang={other}
            aria-label={lang === 'es' ? 'View this site in English' : 'Ver este sitio en español'}
            className="rounded-md border border-line px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {other}
          </Link>
          <ThemeToggle lang={lang} />

          {/* --- Disparador del menú móvil --- */}
          <a
            href="#menu"
            aria-label={abrirMenu}
            className="abre-menu ml-0.5 grid h-9 w-9 place-items-center rounded-md border border-line text-fg transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M2 4h12M2 8h12M2 12h12" />
            </svg>
          </a>
        </div>
      </div>
    </header>

      {/* --- Panel móvil ------------------------------------------------
          Va fuera del <header> a propósito: el header lleva backdrop-blur,
          y un filtro crea bloque contenedor, así que un position:fixed
          dentro se anclaría al header en lugar de a la ventana. --- */}
      <div id="menu" className="fixed inset-0 z-50 flex-col bg-bg md:!hidden">
        <div className="wrap flex h-16 shrink-0 items-center justify-between gap-4 border-b border-line">
          <span className="flex items-center gap-2.5 text-[0.9375rem] font-semibold tracking-[-0.03em]">
            <Logo className="h-7 w-7 shrink-0" />
            {identity.name}
          </span>

          <a
            href="#inicio"
            aria-label={cerrarMenu}
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </a>
        </div>

        <nav
          aria-label={lang === 'es' ? 'Navegación móvil' : 'Mobile navigation'}
          className="wrap flex-1 overflow-y-auto py-8"
        >
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-line">
                <a
                  href={l.hash}
                  className="flex items-baseline gap-4 py-5 text-[1.5rem] font-semibold tracking-[-0.03em] transition-colors hover:text-accent"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.6875rem] font-normal tracking-[0.1em] text-accent"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.875rem]">
            <a className="link-quiet" href={`mailto:${identity.email}`}>
              {identity.email}
            </a>
            <a className="link-quiet" href={`tel:${identity.phone}`}>
              {identity.phoneDisplay}
            </a>
          </p>
        </nav>
      </div>
    </>
  )
}
