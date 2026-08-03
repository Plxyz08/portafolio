/**
 * MARCA PERSONAL — SVG inline, sin peticiones de red, sin JS.
 *
 * La «S» de Sebastián como dos arcos de 240° tangentes en (32,32). Se dibuja
 * con trazo curvo y no a bloques a propósito: una «S» rectilínea comparte
 * silueta con un «5» y a tamaño pequeño se confunde.
 *
 * El punto del terminal superior es la misma marca de acento que aparece en
 * el riel de experiencia, en el proyecto principal y sobre cada métrica.
 *
 * Colores por tema: la teja usa el color de texto y el trazo el de fondo, así
 * que se invierte sola en modo oscuro. El punto usa `--mark-accent`, que es el
 * ámbar *contrario* al del sitio: en claro la teja es tinta y hace falta el
 * ámbar claro; en oscuro la teja es papel y hace falta el oscuro.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" className="fill-fg" />
      <path
        d="M37.7 21 A7 7 0 1 0 32 32 A7 7 0 1 1 26.3 43"
        fill="none"
        strokeWidth="6.5"
        strokeLinecap="round"
        className="stroke-bg"
      />
      <circle cx="37.7" cy="21" r="3.25" className="fill-mark-accent" />
    </svg>
  )
}
