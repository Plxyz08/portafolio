import { type Lang, caseDiagram } from '@/content/site'

/**
 * DIAGRAMA DE TENENCIA — SVG inline, sin imagen externa, sin JS.
 *
 * Dos paneles independientes en vez de un solo SVG ancho: así en móvil se
 * apilan sin encoger el texto hasta volverlo ilegible.
 *
 * Accesibilidad: cada SVG es aria-hidden y la descripción completa vive en
 * un párrafo sr-only más el <figcaption> visible. Un lector de pantalla
 * recibe la explicación en prosa, no una lista suelta de etiquetas.
 *
 * Color: todo se resuelve con clases de Tailwind sobre variables CSS, así
 * que el diagrama cambia con el tema sin duplicar marcado.
 */

const BOX = 'fill-card stroke-line-strong'
const BOX_R = 8

function Before({ lang }: { lang: Lang }) {
  const d = caseDiagram[lang].before

  return (
    <svg
      viewBox="0 0 320 232"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      {/* Los dos paneles comparten viewBox para que sus notas queden a la
          misma altura en escritorio; este desplazamiento centra el contenido
          de "Antes", que ocupa menos alto. */}
      <g transform="translate(0 18)">
      {d.tenants.map((tenant, i) => {
        const x = 8 + i * 104
        return (
          <g key={tenant}>
            {/* Rótulo del negocio */}
            <text
              x={x + 44}
              y={14}
              textAnchor="middle"
              className="fill-muted font-mono text-[10px]"
            >
              {tenant}
            </text>

            {/* Marco: cada cliente es un despliegue entero y aislado */}
            <rect
              x={x}
              y={26}
              width={88}
              height={168}
              rx={10}
              className="fill-bg-sunken stroke-line"
              strokeDasharray="3 3"
            />

            {/* App */}
            <rect x={x + 14} y={46} width={60} height={44} rx={BOX_R} className={BOX} />
            <text
              x={x + 44}
              y={73}
              textAnchor="middle"
              className="fill-fg font-mono text-[11px]"
            >
              {d.app}
            </text>

            {/* Conector */}
            <path
              d={`M${x + 44} 90 L${x + 44} 122`}
              className="stroke-line-strong"
              strokeWidth={1.25}
            />
            <path
              d={`M${x + 40} 116 L${x + 44} 122 L${x + 48} 116`}
              fill="none"
              className="stroke-line-strong"
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Base de datos propia */}
            <rect x={x + 14} y={124} width={60} height={52} rx={BOX_R} className={BOX} />
            <ellipse
              cx={x + 44}
              cy={138}
              rx={18}
              ry={5}
              className="fill-none stroke-line-strong"
              strokeWidth={1.25}
            />
            <text
              x={x + 44}
              y={164}
              textAnchor="middle"
              className="fill-fg font-mono text-[11px]"
            >
              {d.db}
            </text>
          </g>
        )
      })}
      </g>
    </svg>
  )
}

function After({ lang }: { lang: Lang }) {
  const d = caseDiagram[lang].after

  return (
    <svg
      viewBox="0 0 320 232"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      {/* Empresas: entran todas por el mismo sitio */}
      {d.tenants.map((tenant, i) => {
        const x = 12 + i * 100
        return (
          <g key={tenant}>
            <rect x={x} y={6} width={84} height={26} rx={13} className={BOX} />
            <text
              x={x + 42}
              y={23}
              textAnchor="middle"
              className="fill-fg font-mono text-[10px]"
            >
              {tenant}
            </text>
            {/* Converge hacia el despliegue único */}
            <path
              d={`M${x + 42} 32 C ${x + 42} 48, 160 44, 160 62`}
              fill="none"
              className="stroke-line-strong"
              strokeWidth={1.25}
            />
          </g>
        )
      })}

      {/* Un solo despliegue */}
      <rect x={40} y={62} width={240} height={46} rx={BOX_R} className={BOX} />
      <rect x={40} y={62} width={3} height={46} rx={1.5} className="fill-accent stroke-none" />
      <text x={160} y={90} textAnchor="middle" className="fill-fg font-mono text-[11px]">
        {d.app}
      </text>

      {/* Conector al almacenamiento */}
      <path d="M160 108 L160 128" className="stroke-line-strong" strokeWidth={1.25} />
      <path
        d="M156 122 L160 128 L164 122"
        fill="none"
        className="stroke-line-strong"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Base de datos compartida, particionada por empresa */}
      <rect x={40} y={130} width={240} height={78} rx={BOX_R} className={BOX} />
      {d.rows.map((row, i) => {
        const y = 140 + i * 22
        return (
          <g key={row}>
            <rect
              x={52}
              y={y}
              width={216}
              height={18}
              rx={4}
              className="fill-bg-sunken stroke-line"
            />
            {/* La marca de acento = el filtro obligatorio por empresa */}
            <rect x={52} y={y} width={2.5} height={18} rx={1.25} className="fill-accent stroke-none" />
            <text x={64} y={y + 13} className="fill-muted font-mono text-[9.5px]">
              {row}
            </text>
          </g>
        )
      })}

      <text x={160} y={224} textAnchor="middle" className="fill-muted font-mono text-[9px]">
        {d.db}
      </text>
    </svg>
  )
}

export default function TenancyDiagram({ lang }: { lang: Lang }) {
  const d = caseDiagram[lang]

  return (
    <figure className="my-12">
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        <div className="bg-card p-5 sm:p-6">
          <p className="eyebrow">{d.before.label}</p>
          <div className="mt-5">
            <Before lang={lang} />
          </div>
          <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-[1.55] text-muted">
            {d.before.note}
          </p>
        </div>

        <div className="bg-card p-5 sm:p-6">
          <p className="eyebrow text-accent">{d.after.label}</p>
          <div className="mt-5">
            <After lang={lang} />
          </div>
          <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-[1.55] text-muted">
            {d.after.note}
          </p>
        </div>
      </div>

      {/* Descripción completa para lectores de pantalla. */}
      <p className="sr-only">{d.alt}</p>

      <figcaption className="mt-4 text-[0.8125rem] leading-[1.6] text-muted">
        {d.caption}
      </figcaption>
    </figure>
  )
}
