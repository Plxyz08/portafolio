/**
 * Reconvierte las imágenes del sitio a WebP con el tamaño que realmente se
 * muestra. Se ejecuta a mano, no en cada build.
 *
 * Por qué existe: `sharp` no carga en esta máquina, y cuando falta, el
 * optimizador de Next sirve el archivo original entero sin avisar. Optimizar
 * en origen deja el sitio ligero aunque el optimizador no esté disponible —
 * también en export estático o detrás de un CDN que no transforme.
 *
 * Usa Chromium (ya está como dependencia de desarrollo para las capturas y el
 * PDF del CV), así que no añade ninguna dependencia nueva.
 *
 * Uso:  node scripts/optimize-images.mjs
 */
import { chromium } from 'playwright'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve, extname, join } from 'node:path'

/** ancho: el mayor al que se muestra, por 2 para pantallas densas. */
const TRABAJOS = [
  { dir: 'public/img/productos/galeria', ancho: 1600, calidad: 0.82 },
  { dir: 'public/img/proyectos', ancho: 1200, calidad: 0.85 },
  { dir: 'public/img/productos', ancho: 128, calidad: 0.9, soloRaiz: true },
  { dir: 'public/img/referencias', ancho: 96, calidad: 0.9 },
  { dir: 'public/img', ancho: 800, calidad: 0.88, soloRaiz: true },
]

const ENTRADAS = new Set(['.png', '.jpg', '.jpeg'])

const navegador = await chromium.launch()
const pagina = await navegador.newPage()

let antes = 0
let despues = 0

for (const { dir, ancho, calidad, soloRaiz } of TRABAJOS) {
  let ficheros
  try {
    ficheros = readdirSync(dir)
  } catch {
    continue
  }

  for (const nombre of ficheros) {
    const ruta = join(dir, nombre)
    if (!statSync(ruta).isFile()) continue
    if (soloRaiz && statSync(ruta).isDirectory()) continue
    if (!ENTRADAS.has(extname(nombre).toLowerCase())) continue

    const origen = readFileSync(ruta)
    const destino = ruta.replace(/\.(png|jpe?g)$/i, '.webp')

    // Los bytes viajan como data URL: una página about:blank no tiene permiso
    // para leer file://, y varias de estas capturas son JPEG con extensión
    // .png, así que el tipo se detecta por la firma y no por el nombre.
    const esJpeg = origen[0] === 0xff && origen[1] === 0xd8
    const entrada = `data:image/${esJpeg ? 'jpeg' : 'png'};base64,${origen.toString('base64')}`

    const dataUrl = await pagina.evaluate(
      async ({ url, ancho, calidad }) => {
        const img = new Image()
        img.src = url
        await img.decode()
        // Nunca ampliar: si ya es más pequeña, se respeta su tamaño.
        const escala = Math.min(1, ancho / img.naturalWidth)
        const lienzo = document.createElement('canvas')
        lienzo.width = Math.round(img.naturalWidth * escala)
        lienzo.height = Math.round(img.naturalHeight * escala)
        lienzo.getContext('2d').drawImage(img, 0, 0, lienzo.width, lienzo.height)
        return lienzo.toDataURL('image/webp', calidad)
      },
      { url: entrada, ancho, calidad },
    )

    const bytes = Buffer.from(dataUrl.split(',')[1], 'base64')
    writeFileSync(destino, bytes)

    antes += origen.length
    despues += bytes.length
    const ahorro = (100 - (bytes.length / origen.length) * 100).toFixed(0)
    console.log(
      `${nombre.padEnd(34)} ${(origen.length / 1024).toFixed(0).padStart(5)} kB -> ` +
        `${(bytes.length / 1024).toFixed(0).padStart(5)} kB  (-${ahorro}%)`,
    )
  }
}

console.log('-'.repeat(60))
console.log(
  `TOTAL  ${(antes / 1024).toFixed(0)} kB -> ${(despues / 1024).toFixed(0)} kB ` +
    `(-${(100 - (despues / antes) * 100).toFixed(0)}%)`,
)

await navegador.close()
