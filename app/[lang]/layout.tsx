import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import '@/app/globals.css'
import { LANGS, type Lang, copy, identity } from '@/content/site'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

/**
 * Tipografía — self-hosted por next/font. Cero peticiones a terceros,
 * cero layout shift (métricas de respaldo generadas en build).
 *
 *  · Instrument Sans   → interfaz, titulares y texto.
 *  · Instrument Serif  → exclusivamente los números de las métricas y el
 *                        titular del caso de estudio. Nada más.
 *  · JetBrains Mono    → rótulos, fechas, estados y etiquetas técnicas.
 */
const sans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const fontVars = `${sans.variable} ${serif.variable} ${mono.variable}`

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
  const c = copy[lang as Lang]

  return {
    metadataBase: new URL(identity.url),
    title: {
      default: c.meta.title,
      template: `%s — ${identity.name}`,
    },
    description: c.meta.description,
    applicationName: identity.name,
    authors: [{ name: identity.name, url: identity.url }],
    creator: identity.name,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        es: '/es',
        en: '/en',
        'x-default': '/es',
      },
    },
    openGraph: {
      type: 'profile',
      siteName: identity.name,
      title: c.meta.title,
      description: c.meta.description,
      url: `${identity.url}/${lang}`,
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      alternateLocale: lang === 'es' ? 'en_US' : 'es_CO',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.meta.title,
      description: c.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    icons: {
      // El SVG va primero: los navegadores modernos lo prefieren y se
      // invierte solo según el tema de la barra de pestañas. El .ico queda
      // como respaldo para los que no leen SVG.
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: '32x32' },
      ],
      apple: '/apple-touch-icon.png',
    },
  }
}

/** Aplica el tema guardado antes del primer paint para evitar el parpadeo. */
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!LANGS.includes(lang as Lang)) notFound()
  const l = lang as Lang

  return (
    <html lang={l} className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          {l === 'es' ? 'Saltar al contenido' : 'Skip to content'}
        </a>
        <SiteHeader lang={l} />
        <main id="main">{children}</main>
        <SiteFooter lang={l} />
      </body>
    </html>
  )
}
