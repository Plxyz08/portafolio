# sebastianaparicio.dev

Portafolio de **Sebastián Aparicio** — Software Engineer & Founder de AutomatIQ.

Construido para ser legible por máquinas: el contenido real viaja en el HTML de
la primera respuesta, no lo inyecta JavaScript.

## Verificación rápida

```bash
npm run build && npm start
curl -s http://localhost:3000/es | grep "más de 21 negocios"   # debe imprimir la línea
```

Si esa línea aparece, un rastreador de reclutamiento, un scraper o un motor de
búsqueda ven exactamente lo mismo que un navegador.

## Qué garantiza este proyecto

| Requisito | Cómo se cumple |
|---|---|
| Contenido en el HTML servido | Todas las rutas son estáticas (SSG). Cero `"use client"` en las páginas. |
| `<title>` y `<meta description>` por página | `generateMetadata` en cada ruta, textos en `content/site.ts`. |
| Datos estructurados | `schema.org/Person`, `ProfilePage`, `Article` y `BreadcrumbList` en `lib/json-ld.ts`. |
| Semántica | Un solo `<h1>` por página, jerarquía coherente, `alt` en todas las imágenes, enlace «saltar al contenido». |
| Indexación | `app/sitemap.ts` (con `hreflang`) y `app/robots.ts`. |
| Compartir enlaces | Open Graph y Twitter Card en el `metadata` de cada ruta. |
| Bilingüe | Rutas `/es` y `/en` generadas de una sola fuente, con `hreflang` y `x-default`. |
| CV parseable por ATS | `/es/cv` y `/en/cv` en HTML → PDF con texto seleccionable (`npm run cv`). |
| Rendimiento | Sin fuentes externas, sin librería de animación, sin 3D. ~100 kB de JS compartido. |
| Accesibilidad | Foco visible, `prefers-reduced-motion`, contraste alto, navegable por teclado. |

## Estructura

```
content/site.ts       ← TODO el contenido, ES + EN. Es el único archivo que editas normalmente.
app/[lang]/           ← layout raíz (define <html lang>), home, CV y casos de estudio
app/sitemap.ts        ← sitemap.xml con alternates hreflang
app/robots.ts         ← robots.txt
lib/json-ld.ts        ← datos estructurados schema.org
components/           ← componentes de servidor; solo theme-toggle es cliente
scripts/build-cv-pdf.mjs ← imprime /es/cv y /en/cv a PDF
```

## Comandos

```bash
npm install
npm run dev            # desarrollo
npm run build          # build de producción
npm start              # servir el build
npm run cv             # regenerar los PDF del CV (requiere npm start corriendo)
```

## Datos pendientes

Busca `PENDIENTE` en `content/site.ts`:

- Nombre de la universidad y año de grado
- Usuario real de GitHub
- Dominio definitivo (`identity.url`)
- Mes de inicio de AutomatIQ

En el caso de estudio (`caseStudies`) hay un comentario marcando dónde añadir
2–3 decisiones técnicas concretas de la migración a multi-tenant.

## Despliegue

1. `git init && git add . && git commit -m "portafolio"` y sube el repo a GitHub.
2. Importa el repo en Vercel. No hace falta configurar nada: detecta Next.js.
3. En Vercel → Settings → Domains, añade el dominio propio y apunta los DNS.
4. Actualiza `identity.url` en `content/site.ts` con el dominio final y vuelve a desplegar.
5. Da de alta el sitio en Google Search Console y envía `/sitemap.xml`.
