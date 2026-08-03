import { type Lang, copy, identity, t } from '@/content/site'

export default function SiteFooter({ lang }: { lang: Lang }) {
  const year = 2026
  const c = copy[lang]

  return (
    <footer data-site-footer className="border-t border-line py-12 text-[0.875rem]">
      <div className="wrap flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">
          © {year} {identity.name} · {identity.address.locality},{' '}
          {t(identity.address.countryName, lang)}
        </p>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
              {c.labels.email}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
