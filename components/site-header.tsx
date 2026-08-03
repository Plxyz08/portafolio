import Link from 'next/link'
import { type Lang, copy, identity } from '@/content/site'
import ThemeToggle from '@/components/theme-toggle'
import Logo from '@/components/logo'

export default function SiteHeader({ lang }: { lang: Lang }) {
  const c = copy[lang]
  const other: Lang = lang === 'es' ? 'en' : 'es'

  const links = [
    { href: `/${lang}#experiencia`, label: c.nav.work },
    { href: `/${lang}#productos`, label: c.nav.products },
    { href: `/${lang}#proyectos`, label: c.nav.projects },
    { href: `/${lang}#contacto`, label: c.nav.contact },
  ]

  return (
    <header
      data-site-header
      className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70"
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${lang}`}
          className="group flex shrink-0 items-center gap-2.5 text-[0.9375rem] font-semibold tracking-[-0.02em]"
        >
          <Logo className="h-7 w-7 shrink-0" />
          <span className="transition-colors group-hover:text-accent">{identity.name}</span>
        </Link>

        <nav aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}>
          <ul className="hidden items-center gap-1 text-[0.875rem] text-muted md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-2.5 py-1.5 transition-colors hover:bg-bg-sunken hover:text-fg"
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
            className="rounded-md border border-line px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            {other}
          </Link>
          <ThemeToggle lang={lang} />
        </div>
      </div>
    </header>
  )
}
