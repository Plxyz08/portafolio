/**
 * Genera los CV en PDF (texto seleccionable, parseable por ATS) imprimiendo
 * las páginas /es/cv y /en/cv. Fuente única: content/site.ts.
 *
 * Uso:  npm run build && npm start &   →   node scripts/build-cv-pdf.mjs
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.CV_BASE_URL ?? 'http://localhost:3000'
const OUT = 'public/cv'
const FILES = [
  { lang: 'es', file: 'sebastian-aparicio-cv-es.pdf' },
  { lang: 'en', file: 'sebastian-aparicio-cv-en.pdf' },
]

mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
)

for (const { lang, file } of FILES) {
  const page = await browser.newPage()
  await page.emulateMedia({ media: 'print', colorScheme: 'light' })
  await page.goto(`${BASE}/${lang}/cv`, { waitUntil: 'networkidle' })

  // El CV lleva impresa la URL pública del sitio, y esa sale de
  // NEXT_PUBLIC_SITE_URL en tiempo de compilación. Si se genera el PDF sobre
  // un build sin esa variable, el documento acaba anunciando localhost.
  const enlaces = await page.$$eval('.cv a[href]', (as) => as.map((a) => a.href))
  const externos = enlaces.filter((h) => h.startsWith('http'))
  const malos = externos.filter((h) => /localhost|127\.0\.0\.1/.test(h))
  if (malos.length) {
    throw new Error(
      `El CV apunta a localhost (${malos[0]}). Recompila con:\n` +
        '  NEXT_PUBLIC_SITE_URL=https://tu-dominio npm run build',
    )
  }
  console.log(`  ${lang}: ${externos.length} enlaces externos, ninguno a localhost`)

  await page.pdf({
    path: `${OUT}/${file}`,
    format: 'A4',
    printBackground: false,
    margin: { top: '14mm', bottom: '14mm', left: '15mm', right: '15mm' },
  })
  await page.close()
  console.log('✓', file)
}

await browser.close()
