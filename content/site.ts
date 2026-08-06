/**
 * FUENTE ÚNICA DE CONTENIDO DEL SITIO
 * ------------------------------------------------------------------
 * Todo el texto del portafolio vive aquí, en español e inglés.
 * No hay contenido escrito dentro de los componentes.
 *
 * >>> DATOS PENDIENTES: busca "PENDIENTE" en este archivo. <<<
 * Al completarlos, el sitio entero (HTML, JSON-LD, sitemap, CV, OG)
 * queda consistente sin tocar ningún otro archivo.
 */

export type Localized = string | { es: string; en: string }
export type Lang = 'es' | 'en'
export const LANGS: Lang[] = ['es', 'en']

/* ------------------------------------------------------------------ */
/* 1. IDENTIDAD                                                        */
/* ------------------------------------------------------------------ */

export const identity = {
  /** Nombre profesional único. Idéntico en CV, LinkedIn, GitHub y dominio. */
  name: 'Sebastián Aparicio',
  /** Solo se usa en documentos legales, no en el sitio. */
  legalName: 'Johan Sebastián Aparicio Muñoz',

  // PENDIENTE: cambiar cuando compres el dominio definitivo.
  url: 'https://sebastianaparicio.dev',

  email: 'sebastianmunoz603@gmail.com',
  phone: '+573015914917',
  phoneDisplay: '+57 301 591 4917',

  address: {
    locality: 'Bucaramanga',
    region: 'Santander',
    country: 'CO',
    countryName: { es: 'Colombia', en: 'Colombia' },
  },

  linkedin: 'https://www.linkedin.com/in/sebastian-aparicio00',

  // PENDIENTE: usuario real de GitHub.
  github: 'https://github.com/COMPLETAR-USUARIO',

  photo: '/img/sebastian-aparicio.webp',

  /** Perfiles que Google usa para resolverte como una sola entidad. */
  sameAs(): string[] {
    return [this.linkedin, this.github]
  },
}

export const knowsAbout = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Google Cloud Platform',
  'Multi-tenant SaaS architecture',
  'React Native',
  'PostgreSQL',
  'MongoDB',
  'REST APIs',
  'Server-side rendering',
  'DIAN electronic invoicing',
  'AI-assisted development',
]

/* ------------------------------------------------------------------ */
/* 2. MÉTRICAS — números verificables, al frente                       */
/* ------------------------------------------------------------------ */

export type Metric = {
  value: string
  /** Se compone junto al número, en cuerpo menor: "2⁄4". */
  suffix?: string
  label: { es: string; en: string }
}

/**
 * Cuatro cifras que cuentan escala, arquitectura, velocidad y honestidad.
 * Todas se pueden contrastar contra el resto del sitio: los negocios salen de
 * la experiencia, el despliegue y los cinco meses del caso de estudio, y el
 * 2/4 del listado de productos.
 */
export const metrics: Metric[] = [
  {
    value: '+21',
    label: {
      es: 'negocios operando a diario sobre sistemas que construí',
      en: 'businesses running daily operations on systems I built',
    },
  },
  {
    value: '1',
    label: {
      es: 'despliegue multi-tenant sostiene la operación de más de 10 empresas',
      en: 'multi-tenant deployment runs operations for more than 10 companies',
    },
  },
  {
    value: '5',
    label: {
      es: 'meses de software a la medida a SaaS multi-tenant en producción',
      en: 'months from custom software to multi-tenant SaaS in production',
    },
  },
  {
    // Denominador = los cuatro productos de la sección "Productos".
    // Mantener en sincronía al cambiar cualquier `status`. No dice
    // "AutomatIQ" porque Gran Mayorista no lo es.
    value: '3',
    suffix: '/4',
    label: {
      es: 'de los productos SaaS que opero ya están en producción',
      en: 'of the SaaS products I operate are live in production',
    },
  },
]

/* ------------------------------------------------------------------ */
/* 3. COPY POR IDIOMA                                                  */
/* ------------------------------------------------------------------ */

type Copy = {
  meta: { title: string; description: string }
  role: string
  hero: {
    /** Frase corta, en cuerpo grande, justo debajo del nombre. */
    claim: string
    lede: string
    cta: string
    ctaSecondary: string
    /** Estado profesional, junto al retrato. */
    availability: string
  }
  nav: Record<string, string>
  sections: Record<string, { title: string; intro?: string }>
  labels: Record<string, string>
}

export const copy: Record<Lang, Copy> = {
  es: {
    meta: {
      title: 'Sebastián Aparicio — Software Engineer & Founder de AutomatIQ',
      description:
        'Ingeniero de software en Bucaramanga, Colombia. Fundador de AutomatIQ: plataformas SaaS multi-tenant que hoy operan más de 21 negocios. Desarrollo con React, Next.js, TypeScript, Node.js y Google Cloud.',
    },
    role: 'Software Engineer & Founder',
    hero: {
      claim: 'Construyo y opero plataformas SaaS multi-tenant.',
      lede:
        'No son proyectos de práctica: más de 21 negocios en Colombia facturan, controlan inventario y pagan nómina todos los días sobre sistemas que diseñé, desplegué y mantengo en producción.',
      cta: 'Ver el caso de estudio',
      ctaSecondary: 'Descargar CV (PDF)',
      availability: 'Abierto a roles remotos',
    },
    nav: {
      work: 'Experiencia',
      products: 'Productos',
      projects: 'Proyectos',
      about: 'Perfil',
      contact: 'Contacto',
    },
    sections: {
      metrics: { title: 'En números' },
      work: {
        title: 'Experiencia',
        intro: 'Dos frentes en paralelo: mi propia empresa de producto y consultoría de software para una firma en México.',
      },
      products: {
        title: 'Productos',
        intro:
          'AutomatIQ es mi empresa de soluciones SaaS verticales para pymes colombianas; Gran Mayorista es un proyecto aparte, con socios. Cada producto es multi-tenant: un solo despliegue atiende a todos sus negocios y una corrección llega a todos a la vez. Cada estado está declarado tal como es hoy.',
      },
      productsAutomatiq: {
        title: 'AutomatIQ',
        intro: 'Mi empresa. Producto, arquitectura, desarrollo, despliegue y soporte.',
      },
      productsIndependent: {
        title: 'Gran Mayorista',
        intro:
          'Sociedad independiente de AutomatIQ, con dos socios. Yo llevo la plataforma; ellos, la expansión comercial.',
      },
      caseStudy: { title: 'Caso de estudio' },
      projects: {
        title: 'Proyectos anteriores',
        intro: 'Trabajo freelance y por contrato antes de dedicarme a producto propio.',
      },
      testimonials: { title: 'Referencias' },
      stack: { title: 'Stack técnico' },
      education: { title: 'Formación' },
      contact: {
        title: 'Contacto',
        intro:
          'Abierto a posiciones remotas de ingeniería de software y a conversaciones sobre AutomatIQ.',
      },
    },
    labels: {
      present: 'Actualidad',
      inProduction: 'En producción',
      pilot: 'Piloto',
      inDevelopment: 'En desarrollo',
      readCase: 'Leer el caso completo',
      visitSite: 'Visitar sitio',
      backHome: 'Volver al inicio',
      problem: 'El problema',
      decisions: 'Decisiones de arquitectura',
      result: 'Resultado',
      whatIsNext: 'Lo que sigue',
      languages: 'Idiomas',
      certifications: 'Certificaciones',
      switchLang: 'English',
      email: 'Correo',
      location: 'Ubicación',
      downloadCv: 'CV en PDF',
      confidential: 'Bajo acuerdo de confidencialidad',
      emailMe: 'Escríbeme',
      status: 'Estado',
      phone: 'Teléfono',
      shotLanding: 'Portada pública',
      shotPanel: 'El sistema por dentro',
      viewShots: 'Ver capturas',
      hideShots: 'Ocultar capturas',
      flagship: 'El despliegue más grande',
    },
  },

  en: {
    meta: {
      title: 'Sebastián Aparicio — Software Engineer & Founder of AutomatIQ',
      description:
        'Software engineer based in Bucaramanga, Colombia. Founder of AutomatIQ: multi-tenant SaaS platforms that run daily operations for over 21 businesses. React, Next.js, TypeScript, Node.js and Google Cloud.',
    },
    role: 'Software Engineer & Founder',
    hero: {
      claim: 'I build and operate multi-tenant SaaS platforms.',
      lede:
        'Not practice projects: more than 21 businesses in Colombia invoice, track inventory and run payroll every day on systems I designed, deployed and keep in production.',
      cta: 'Read the case study',
      ctaSecondary: 'Download CV (PDF)',
      availability: 'Open to remote roles',
    },
    nav: {
      work: 'Experience',
      products: 'Products',
      projects: 'Projects',
      about: 'Profile',
      contact: 'Contact',
    },
    sections: {
      metrics: { title: 'By the numbers' },
      work: {
        title: 'Experience',
        intro: 'Two tracks in parallel: my own product company, and software consulting for a firm in Mexico.',
      },
      products: {
        title: 'Products',
        intro:
          'AutomatIQ is my company, building vertical SaaS for Colombian small and medium businesses; Gran Mayorista is a separate venture, with partners. Every product is multi-tenant: a single deployment serves all of its businesses, and one fix reaches all of them at once. Each status below is stated exactly as it stands today.',
      },
      productsAutomatiq: {
        title: 'AutomatIQ',
        intro: 'My company. Product, architecture, development, deployment and support.',
      },
      productsIndependent: {
        title: 'Gran Mayorista',
        intro:
          'A separate company from AutomatIQ, with two partners. I run the platform; they run commercial expansion.',
      },
      caseStudy: { title: 'Case study' },
      projects: {
        title: 'Earlier work',
        intro: 'Freelance and contract engagements before moving into my own products.',
      },
      testimonials: { title: 'References' },
      stack: { title: 'Technical stack' },
      education: { title: 'Education' },
      contact: {
        title: 'Contact',
        intro: 'Open to remote software engineering roles and to conversations about AutomatIQ.',
      },
    },
    labels: {
      present: 'Present',
      inProduction: 'In production',
      pilot: 'Pilot',
      inDevelopment: 'In development',
      readCase: 'Read the full case study',
      visitSite: 'Visit site',
      backHome: 'Back to home',
      problem: 'The problem',
      decisions: 'Architecture decisions',
      result: 'Outcome',
      whatIsNext: 'What is next',
      languages: 'Languages',
      certifications: 'Certifications',
      switchLang: 'Español',
      email: 'Email',
      location: 'Location',
      downloadCv: 'CV as PDF',
      confidential: 'Covered by a confidentiality agreement',
      emailMe: 'Email me',
      status: 'Status',
      phone: 'Phone',
      shotLanding: 'Public landing page',
      shotPanel: 'Inside the system',
      viewShots: 'View screenshots',
      hideShots: 'Hide screenshots',
      flagship: 'My largest deployment',
    },
  },
}

/* ------------------------------------------------------------------ */
/* 4. EXPERIENCIA                                                      */
/* ------------------------------------------------------------------ */

export type Job = {
  id: string
  org: Localized
  /** Título tal como lo confirmaría una verificación de referencias. */
  title: { es: string; en: string }
  period: { es: string; en: string }
  /** Fechas ISO para el JSON-LD y para ordenar. */
  start: string
  end: string | null
  place: { es: string; en: string }
  note?: { es: string; en: string }
  bullets: { es: string[]; en: string[] }
}

export const jobs: Job[] = [
  {
    id: 'automatiq',
    org: 'AutomatIQ',
    title: { es: 'Fundador y Desarrollador Principal', en: 'Founder & Lead Developer' },
    // PENDIENTE: confirmar mes de inicio de la marca AutomatIQ.
    period: { es: 'Diciembre 2025 – Actualidad', en: 'December 2025 – Present' },
    start: '2025-12',
    end: null,
    place: { es: 'Bucaramanga, Colombia', en: 'Bucaramanga, Colombia' },
    bullets: {
      es: [
        'Empresa propia de software SaaS para pequeñas y medianas empresas. Responsable de producto, arquitectura, desarrollo, despliegue, soporte y relación con clientes.',
        'Escalé Gran Mayorista —proyecto con socios, societariamente independiente de AutomatIQ— de sistema mono-empresa a SaaS multi-tenant; hoy opera para más de 10 negocios mayoristas con ventas, inventario, tienda en línea, empleados y nómina.',
        'Lancé AutomatIQ POS: punto de venta en la nube con catálogo web, gestión de mesas, modo offline con sincronización diferida, reportes en tiempo real, aislamiento de datos por negocio y control de acceso por roles.',
        'Construyo un portal de facturación electrónica DIAN sobre la API de Factus: una sola pieza de infraestructura que cubre los documentos electrónicos que necesita una empresa y administra paquetes, clientes y asignaciones por separado para AutomatIQ y para Gran Mayorista.',
      ],
      en: [
        'My own SaaS software company serving small and medium businesses. Responsible for product, architecture, development, deployment, support and customer relationships.',
        'Scaled Gran Mayorista —a venture with partners, a separate company from AutomatIQ— from a single-tenant system to multi-tenant SaaS; it now runs operations for more than 10 wholesale businesses across sales, inventory, online storefront, employees and payroll.',
        'Shipped AutomatIQ POS: a cloud point-of-sale platform with web catalog, table management, offline mode with deferred sync, real-time reporting, per-business data isolation and role-based access control.',
        'Building a DIAN electronic invoicing portal on top of the Factus API: a single piece of infrastructure covering the electronic documents a company needs, with document packages, clients and allocation administered separately for AutomatIQ and for Gran Mayorista.',
      ],
    },
  },
  {
    id: 'vectux',
    org: 'Vectux Analytics',
    title: {
      es: 'Frontend Developer — Next.js & TypeScript',
      en: 'Frontend Developer — Next.js & TypeScript',
    },
    period: { es: 'Mayo 2025 – Actualidad', en: 'May 2025 – Present' },
    start: '2025-05',
    end: null,
    place: { es: 'Ciudad de México (remoto)', en: 'Mexico City (remote)' },
    note: {
      es: 'Consultora de inteligencia artificial y analítica avanzada con clientes corporativos en México, Chile, Guatemala y El Salvador. Vinculación por contrato de prestación de servicios profesionales.',
      en: 'AI and advanced analytics consultancy serving enterprise clients across Mexico, Chile, Guatemala and El Salvador. Engaged under a professional services contract.',
    },
    bullets: {
      es: [
        'Desarrollo de interfaces con React, Next.js y TypeScript, aplicando renderizado en servidor, regeneración estática incremental, code splitting y optimización de Core Web Vitals.',
        'Integración con APIs REST y GraphQL, manejo de estado global y autenticación de usuarios con JWT y OAuth2.',
        'Alcance ampliado más allá del frontend: entrega de MVPs completos, incluyendo backend, y configuración de infraestructura en Google Cloud Platform.',
        'Pruebas unitarias y de integración con Jest y React Testing Library; code reviews, documentación técnica y ceremonias ágiles bajo Scrum.',
        'Proyectos empresariales para clientes de la región; nombres y detalles sujetos a acuerdo de confidencialidad.',
      ],
      en: [
        'Build user interfaces with React, Next.js and TypeScript, applying server-side rendering, incremental static regeneration, code splitting and Core Web Vitals optimization.',
        'Integrate REST and GraphQL APIs, manage global state and implement user authentication with JWT and OAuth2.',
        'Scope extended beyond frontend: delivery of complete MVPs including backend, and setup of Google Cloud Platform infrastructure.',
        'Unit and integration tests with Jest and React Testing Library; code reviews, technical documentation and agile ceremonies under Scrum.',
        'Enterprise projects for clients across the region; client names and details are covered by a confidentiality agreement.',
      ],
    },
  },
  {
    id: 'independent',
    org: { es: 'Proyectos independientes', en: 'Independent projects' },
    title: { es: 'Desarrollo freelance y por contrato', en: 'Freelance & contract development' },
    period: { es: 'Julio 2023 – Marzo 2025', en: 'July 2023 – March 2025' },
    start: '2023-07',
    end: '2025-03',
    place: { es: 'Remoto', en: 'Remote' },
    bullets: {
      es: [
        'Entregué aplicaciones web y móviles de punta a punta para clientes en Colombia y el exterior, cubriendo backend, frontend, despliegue y soporte.',
        'Trabajo detallado en la sección de proyectos.',
      ],
      en: [
        'Delivered web and mobile applications end to end for clients in Colombia and abroad, covering backend, frontend, deployment and support.',
        'Detailed work in the projects section below.',
      ],
    },
  },
]

/* ------------------------------------------------------------------ */
/* 5. PRODUCTOS AUTOMATIQ                                              */
/* ------------------------------------------------------------------ */

export type ProductStatus = 'production' | 'pilot' | 'development'

/**
 * Titularidad. AutomatIQ es mi empresa; Gran Mayorista es una sociedad
 * aparte, con socios. El diseño los presenta en bloques separados para que
 * nadie deduzca que todo pertenece a la misma compañía.
 */
export type ProductOwner = 'automatiq' | 'independent'

/** Captura de producto. El `alt` describe lo que se ve, no el nombre a secas. */
export type Shot = {
  src: string
  alt: { es: string; en: string }
}

export type Product = {
  id: string
  name: string
  owner: ProductOwner
  /** Marca del producto. Si falta, la tarjeta compone un monograma. */
  logo?: string
  logoAlt?: { es: string; en: string }
  url?: string
  status: ProductStatus
  metric?: { es: string; en: string }
  summary: { es: string; en: string }
  features: { es: string[]; en: string[] }
  /** Encabeza la sección por ser el despliegue con más empresas encima. */
  flagship?: boolean
  /** Galería: portada pública y sistema por dentro. */
  gallery?: Shot[]
  caseStudy?: string
}

export const products: Product[] = [
  {
    id: 'automatiq-pos',
    name: 'AutomatIQ POS',
    owner: 'automatiq',
    logo: '/img/productos/automatiq-pos.webp',
    logoAlt: { es: 'Logotipo de AutomatIQ', en: 'AutomatIQ logo' },
    url: 'https://automatiqpos.com',
    status: 'production',
    metric: { es: '7 negocios · desde mayo 2026', en: '7 businesses · since May 2026' },
    summary: {
      es: 'Punto de venta en la nube para negocios de retail y gastronomía. Base de clientes deliberadamente pequeña: la uso para validar cada función en operación real antes de abrir el producto.',
      en: 'Cloud point-of-sale for retail and food businesses. The customer base is deliberately small: I use it to validate every feature in real operation before opening the product up.',
    },
    features: {
      es: [
        'Catálogo web público por negocio',
        'Gestión de mesas',
        'Modo offline con sincronización diferida',
        'Reportes en tiempo real',
        'Aislamiento de datos por negocio y control de acceso por roles',
      ],
      en: [
        'Public web catalog per business',
        'Table management',
        'Offline mode with deferred sync',
        'Real-time reporting',
        'Per-business data isolation and role-based access control',
      ],
    },
    gallery: [
      {
        src: '/img/productos/galeria/automatiq-pos-landing.webp',
        alt: {
          es: 'Portada de AutomatIQ POS: titular «Cobra más rápido, vende más y controla todo tu negocio», con botones de demo y tres tarjetas de funciones.',
          en: 'AutomatIQ POS landing page: headline “Charge faster, sell more and control your whole business”, with demo buttons and three feature cards.',
        },
      },
      {
        src: '/img/productos/galeria/automatiq-pos-panel.webp',
        alt: {
          es: 'Panel de AutomatIQ POS en la pantalla de configuración, con los métodos de pago —efectivo, tarjeta y transferencia— y sus datos de cuenta.',
          en: 'AutomatIQ POS dashboard on the settings screen, showing payment methods — cash, card and bank transfer — and their account details.',
        },
      },
    ],
  },
  {
    id: 'gran-mayorista',
    name: 'Gran Mayorista',
    owner: 'independent',
    flagship: true,
    url: 'https://granmayorista.co',
    status: 'production',
    metric: { es: '+10 negocios · desde diciembre 2025', en: '+10 businesses · since December 2025' },
    summary: {
      es: 'Proyecto con socios, societariamente aparte de AutomatIQ. Sistema de administración para distribuidores mayoristas: nació en diciembre de 2025 como software a la medida de un solo negocio y en mayo de 2026 lo reescribí como SaaS multi-tenant.',
      en: 'A venture with partners, a separate company from AutomatIQ. Management system for wholesale distributors: it started in December 2025 as custom software for a single business, and in May 2026 I rebuilt it as multi-tenant SaaS.',
    },
    features: {
      es: ['Ventas y facturación', 'Inventario', 'Tienda en línea', 'Gestión de empleados', 'Nómina'],
      en: ['Sales and invoicing', 'Inventory', 'Online storefront', 'Employee management', 'Payroll'],
    },
    gallery: [
      {
        src: '/img/productos/galeria/gran-mayorista-landing.webp',
        alt: {
          es: 'Portada de Gran Mayorista: titular «Sabes qué tienes, qué vendiste y quién te debe», con el distintivo «En producción hoy».',
          en: 'Gran Mayorista landing page: headline “You know what you have, what you sold and who owes you”, with an “In production today” badge.',
        },
      },
      {
        src: '/img/productos/galeria/gran-mayorista-panel.webp',
        alt: {
          es: 'Panel de Gran Mayorista con ventas del mes, transacciones, alertas de stock, gráfica de los últimos siete días y plan activo.',
          en: 'Gran Mayorista dashboard showing monthly sales, transactions, stock alerts, a seven-day trend chart and the active plan.',
        },
      },
    ],
    caseStudy: 'gran-mayorista',
  },
  {
    id: 'automatiq-repair',
    name: 'AutomatIQ Repair',
    owner: 'automatiq',
    logo: '/img/productos/automatiq-repair.webp',
    logoAlt: { es: 'Logotipo de AutomatIQ Repair', en: 'AutomatIQ Repair logo' },
    status: 'pilot',
    metric: { es: 'Sale a producción en agosto 2026', en: 'Going live August 2026' },
    summary: {
      es: 'Inventario y ventas para negocios de tecnología, con un portal donde el cliente final consulta el estado de su reparación. Entra en producción con un negocio piloto.',
      en: 'Inventory and sales for technology retailers, with a portal where the end customer tracks the status of their repair. Going live with a pilot business.',
    },
    features: {
      es: ['Inventario y ventas', 'Órdenes de reparación', 'Portal de seguimiento para el cliente final'],
      en: ['Inventory and sales', 'Repair orders', 'Customer-facing tracking portal'],
    },
    gallery: [
      {
        src: '/img/productos/galeria/automatiq-repair-landing.webp',
        alt: {
          es: 'Portada de AutomatIQ Repair: titular «Tu taller, ordenado y profesional» junto a una maqueta con los tipos de equipo que recibe el taller.',
          en: 'AutomatIQ Repair landing page: headline “Your workshop, organised and professional” next to a mockup of the device types the workshop takes in.',
        },
      },
      {
        src: '/img/productos/galeria/automatiq-repair-panel.webp',
        alt: {
          es: 'Panel de AutomatIQ Repair con la vista consolidada de dos sucursales: ingresos del mes, equipos en taller, citas del día y stock crítico.',
          en: 'AutomatIQ Repair dashboard with a consolidated view of two branches: monthly revenue, devices in the workshop, appointments today and critical stock.',
        },
      },
    ],
  },
  {
    id: 'mechss',
    name: 'AutomatIQ Mechss',
    owner: 'automatiq',
    logo: '/img/productos/automatiq-mechss.webp',
    logoAlt: { es: 'Logotipo de AutomatIQ Mechss', en: 'AutomatIQ Mechss logo' },
    url: 'https://mechss.com',
    status: 'production',
    metric: { es: '4 negocios · desde junio 2026', en: '4 businesses · since June 2026' },
    summary: {
      es: 'El equivalente de Repair para mecánicos y talleres automotrices. Recepción, mecánicos y administración trabajan sobre la misma información, y el cliente consulta el estado de su vehículo desde el celular.',
      en: 'The Repair equivalent for mechanics and automotive workshops. Front desk, mechanics and back office work off the same information, and the customer checks their vehicle status from their phone.',
    },
    features: {
      es: ['Órdenes de servicio', 'Inventario de repuestos', 'Avisos de estado por WhatsApp'],
      en: ['Service orders', 'Parts inventory', 'WhatsApp status notifications'],
    },
    gallery: [
      {
        src: '/img/productos/galeria/automatiq-mechss-landing.webp',
        alt: {
          es: 'Portada de Mechss sobre fondo oscuro: titular «Tu taller, en una sola plataforma», con accesos para asesores y para clientes.',
          en: 'Mechss landing page on a dark background: headline “Your workshop, on a single platform”, with entry points for advisors and for customers.',
        },
      },
      {
        src: '/img/productos/galeria/automatiq-mechss-panel.webp',
        alt: {
          es: 'Panel de Mechss en modo oscuro, con la puesta en marcha del taller al 83 % y el resumen mensual de dos sucursales.',
          en: 'Mechss dashboard in dark mode, showing workshop onboarding at 83% and the monthly summary for two branches.',
        },
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* 6. CASO DE ESTUDIO                                                  */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  slug: string
  product: string
  title: { es: string; en: string }
  summary: { es: string; en: string }
  meta: { es: { k: string; v: string }[]; en: { k: string; v: string }[] }
  sections: {
    key: 'problem' | 'decisions' | 'result' | 'whatIsNext'
    body: { es: string[]; en: string[] }
  }[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'gran-mayorista',
    product: 'Gran Mayorista',
    title: {
      es: 'De software a la medida a SaaS multi-tenant en cinco meses',
      en: 'From custom software to multi-tenant SaaS in five months',
    },
    summary: {
      es: 'Gran Mayorista empezó resolviendo el problema de un solo distribuidor. Cuando otros negocios del mismo sector lo pidieron, la decisión no fue vender copias del sistema: fue reescribir la base para que un solo despliegue sirviera a muchas empresas sin que sus datos se tocaran nunca.',
      en: 'Gran Mayorista started by solving one distributor’s problem. When other businesses in the same sector asked for it, the decision was not to sell copies of the system: it was to rebuild the foundation so a single deployment could serve many companies without their data ever touching.',
    },
    meta: {
      es: [
        { k: 'Rol', v: 'Arquitectura, desarrollo, despliegue y soporte' },
        { k: 'Periodo', v: 'Diciembre 2025 – actualidad' },
        { k: 'Estado', v: 'En producción, más de 10 negocios' },
        { k: 'Equipo', v: 'Yo en tecnología, 2 socios en expansión comercial' },
      ],
      en: [
        { k: 'Role', v: 'Architecture, development, deployment and support' },
        { k: 'Period', v: 'December 2025 – present' },
        { k: 'Status', v: 'In production, more than 10 businesses' },
        { k: 'Team', v: 'Me on engineering, 2 partners on commercial expansion' },
      ],
    },
    sections: [
      {
        key: 'problem',
        body: {
          es: [
            'La primera versión se construyó para un solo distribuidor mayorista: su catálogo, sus precios, sus empleados, su nómina. Funcionaba porque cada supuesto del negocio estaba incrustado en el código y en el esquema de datos.',
            'En pocos meses aparecieron otros mayoristas pidiendo lo mismo. El camino corto —clonar el proyecto y desplegar una instancia por cliente— resuelve la primera venta y destruye la décima: cada corrección hay que aplicarla diez veces, cada base de datos evoluciona por su lado y el costo de soporte crece linealmente con los clientes.',
            'El problema real no era agregar clientes. Era dejar de tener un sistema por cliente.',
          ],
          en: [
            'The first version was built for one wholesale distributor: their catalog, their prices, their employees, their payroll. It worked because every business assumption was baked into the code and the data schema.',
            'Within months other wholesalers asked for the same thing. The short path — cloning the project and deploying one instance per customer — solves the first sale and destroys the tenth: every fix has to be applied ten times, every database drifts on its own, and support cost grows linearly with customers.',
            'The real problem was not adding customers. It was no longer having one system per customer.',
          ],
        },
      },
      {
        key: 'decisions',
        body: {
          es: [
            'Un solo despliegue, muchas empresas. Toda entidad del dominio pasó a colgar de un identificador de empresa, y el acceso a datos se cerró de forma que ninguna consulta pueda ejecutarse sin ese filtro. El aislamiento no depende de que el desarrollador se acuerde de aplicarlo: si falta el contexto de empresa, la consulta falla.',
            'Roles y permisos por empresa, no globales. Un usuario existe dentro de una empresa y sus permisos se resuelven en ese ámbito, porque el dueño, el vendedor y el bodeguero ven cosas distintas del mismo sistema.',
            'La facturación electrónica DIAN se construyó una sola vez, fuera del producto. En vez de integrar la normativa en cada sistema, hice un servicio compartido sobre la API de Factus del que consumen Gran Mayorista, AutomatIQ POS y Mechss. Factus permite que la empresa madre compre un paquete de documentos electrónicos y lo distribuya entre las empresas usuarias, lo que evita que cada negocio pequeño tenga que gestionar su propio proveedor.',
            'El módulo DIAN es una pieza aparte del sistema principal. Fue una petición explícita de los usuarios, y coincide con la decisión técnica: mantiene el cumplimiento normativo desacoplado del núcleo de operación.',
            // PENDIENTE (Sebastián): añade aquí 2 o 3 decisiones técnicas concretas y verificables:
            //   · Estrategia de tenencia exacta (¿columna tenant_id?, ¿esquema por empresa?, ¿RLS?)
            //   · Base de datos y por qué esa
            //   · Cómo migraste los datos del primer cliente sin cortar su operación
            //   · Cómo manejas migraciones de esquema con 10+ empresas en producción
          ],
          en: [
            'One deployment, many companies. Every domain entity now hangs off a company identifier, and data access was locked down so no query can run without that filter. Isolation does not depend on a developer remembering to apply it: if the company context is missing, the query fails.',
            'Roles and permissions scoped per company, not globally. A user exists inside a company and their permissions resolve within that scope, because the owner, the salesperson and the warehouse clerk see different parts of the same system.',
            'DIAN electronic invoicing was built once, outside the product. Instead of embedding the regulation into each system, I built a shared service on top of the Factus API that Gran Mayorista, AutomatIQ POS and Mechss all consume. Factus lets a parent company buy a package of electronic documents and distribute it across the businesses using its software, so no small business has to manage its own provider.',
            'The DIAN module is a separate piece from the main system. That was an explicit user request, and it lines up with the technical decision: it keeps regulatory compliance decoupled from the operational core.',
          ],
        },
      },
      {
        key: 'result',
        body: {
          es: [
            'Más de 10 negocios mayoristas operan hoy sobre un solo despliegue. Una corrección se despliega una vez y llega a todos.',
            'Sumar un cliente nuevo dejó de ser un proyecto de infraestructura y pasó a ser un registro en el sistema.',
            'La expansión comercial la llevan mis dos socios; yo sostengo la plataforma. Esa división es la razón por la que el crecimiento no está limitado por mi tiempo.',
          ],
          en: [
            'More than 10 wholesale businesses run on a single deployment today. A fix ships once and reaches all of them.',
            'Onboarding a new customer stopped being an infrastructure project and became a record in the system.',
            'Commercial expansion is run by my two partners; I keep the platform standing. That split is why growth is not capped by my available hours.',
          ],
        },
      },
      {
        key: 'whatIsNext',
        body: {
          es: [
            'Terminar la facturación electrónica DIAN vía Factus y llevarla a los tres productos.',
            'La visión de producto es una red entre los mayoristas asociados, para que los negocios que ya comparten la plataforma puedan comerciar entre ellos.',
          ],
          en: [
            'Finish DIAN electronic invoicing via Factus and roll it out across all three products.',
            'The product vision is a network across the associated wholesalers, so businesses already sharing the platform can trade with each other.',
          ],
        },
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* 6b. DIAGRAMA DEL CASO DE ESTUDIO                                    */
/*     Rótulos del SVG. El SVG se dibuja inline en el componente, pero */
/*     todo su texto vive aquí, igual que el resto del contenido.      */
/* ------------------------------------------------------------------ */

export type DiagramCopy = {
  /** Descripción accesible completa: hace de "alt" del SVG. */
  alt: string
  caption: string
  before: {
    label: string
    tenants: string[]
    app: string
    db: string
    note: string
  }
  after: {
    label: string
    tenants: string[]
    app: string
    db: string
    rows: string[]
    note: string
  }
}

export const caseDiagram: Record<Lang, DiagramCopy> = {
  es: {
    alt: 'Diagrama comparativo. A la izquierda, el modelo anterior: cada negocio tenía su propia copia de la aplicación y su propia base de datos, tres despliegues independientes. A la derecha, el modelo actual: los tres negocios entran a un único despliegue que consulta una sola base de datos, donde cada fila cuelga de un identificador de empresa.',
    caption:
      'La reescritura en una imagen: de una copia del sistema por cliente, a un solo despliegue en el que el identificador de empresa es obligatorio en toda consulta.',
    before: {
      label: 'Antes · una instancia por cliente',
      tenants: ['Negocio 1', 'Negocio 2', 'Negocio 3'],
      app: 'App',
      db: 'BD',
      note: 'Cada corrección se aplica N veces y cada base de datos evoluciona por su lado.',
    },
    after: {
      label: 'Hoy · un despliegue, muchas empresas',
      tenants: ['Negocio 1', 'Negocio 2', '+10'],
      app: 'Un solo despliegue',
      db: 'Base de datos compartida',
      rows: ['empresa_1', 'empresa_2', 'empresa_n'],
      note: 'Sin contexto de empresa, la consulta falla: el aislamiento no depende de recordarlo.',
    },
  },
  en: {
    alt: 'Comparison diagram. On the left, the previous model: each business had its own copy of the application and its own database, three independent deployments. On the right, the current model: all three businesses enter a single deployment that queries one database, where every row hangs off a company identifier.',
    caption:
      'The rewrite in one picture: from one copy of the system per customer, to a single deployment where the company identifier is mandatory on every query.',
    before: {
      label: 'Before · one instance per customer',
      tenants: ['Business 1', 'Business 2', 'Business 3'],
      app: 'App',
      db: 'DB',
      note: 'Every fix is applied N times, and every database drifts on its own.',
    },
    after: {
      label: 'Today · one deployment, many companies',
      tenants: ['Business 1', 'Business 2', '+10'],
      app: 'One deployment',
      db: 'Shared database',
      rows: ['company_1', 'company_2', 'company_n'],
      note: 'With no company context the query fails: isolation does not depend on remembering it.',
    },
  },
}

/* ------------------------------------------------------------------ */
/* 7. PROYECTOS ANTERIORES                                             */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string
  name: Localized
  year: string
  image?: string
  imageAlt: { es: string; en: string }
  url?: string
  summary: { es: string; en: string }
  stack: string[]
  featured: boolean
  /**
   * Encabeza el listado de trabajo anterior por ser el encargo principal de
   * ese periodo, no por ser el más reciente. El resto va detrás, del año más
   * reciente al más antiguo.
   */
  lead?: boolean
}

export const projects: Project[] = [
  {
    id: 'tesla-lift',
    name: 'Tesla Lift',
    year: '2025',
    image: '/img/proyectos/tesla-lift.webp',
    imageAlt: {
      es: 'Logotipo de Tesla Lift',
      en: 'Tesla Lift logo',
    },
    summary: {
      es: 'Aplicación móvil de gestión de servicios de instalación, mantenimiento y soporte de ascensores. Publicada en App Store y Play Store.',
      en: 'Mobile application for elevator installation, maintenance and support service management. Published on the App Store and Play Store.',
    },
    stack: ['React Native', 'Expo', 'Next.js', 'Supabase', 'Push notifications'],
    featured: true,
  },
  {
    id: 'lalista-wbc',
    name: 'LaLista WBC',
    year: '2024–2025',
    image: '/img/proyectos/lalista-wbc.webp',
    imageAlt: {
      es: 'Logotipo de LaLista WBC',
      en: 'LaLista WBC logo',
    },
    // Sin enlace público a petición de Sebastián: el sitio ya no representa
    // el trabajo. El proyecto se queda; el enlace no.
    summary: {
      es: 'Plataforma web completa: backend propio, gestión multimedia, chat en tiempo real, dominio, hosting y despliegue.',
      en: 'Full web platform: custom backend, media management, real-time chat, domain, hosting and deployment.',
    },
    stack: ['Node.js', 'Express', 'MongoDB', 'Next.js', 'React', 'Cloudinary', 'Vercel'],
    featured: true,
  },
  {
    id: 'cs-tracer',
    name: 'CS Tracer — CardSoftware',
    year: '2025',
    image: '/img/proyectos/cs-tracer.webp',
    imageAlt: {
      es: 'Logotipo de Card Software Traceability',
      en: 'Card Software Traceability logo',
    },
    summary: {
      es: 'Desarrollo frontend del producto CS Tracer bajo contrato de un mes, integrado al equipo del cliente.',
      en: 'Frontend development for the CS Tracer product under a one-month contract, embedded in the client team.',
    },
    stack: ['Next.js', 'React', 'TypeScript'],
    featured: true,
  },
  /* --- Trabajo anterior. Trascender encabeza por ser el encargo principal
         del periodo; el resto sigue en orden cronológico descendente. --- */
  {
    id: 'trascender',
    name: 'Trascender Global',
    year: '2024',
    imageAlt: { es: '', en: '' },
    summary: {
      es: 'Desarrollo y optimización de interfaces, refactorización para rendimiento y mantenibilidad, gestión de sprints en Azure DevOps bajo Scrum.',
      en: 'Interface development and optimization, refactoring for performance and maintainability, sprint management in Azure DevOps under Scrum.',
    },
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Azure DevOps'],
    featured: false,
    lead: true,
  },
  {
    id: 'asesorias',
    name: { es: 'Asesorías en desarrollo de software', en: 'Software development consulting' },
    year: '2024',
    imageAlt: { es: '', en: '' },
    summary: {
      es: 'Acompañamiento técnico puntual a equipos y emprendedores.',
      en: 'Point-in-time technical guidance for teams and founders.',
    },
    stack: [],
    featured: false,
  },
  {
    id: 'rifas',
    name: { es: 'Plataforma de gestión de rifas', en: 'Raffle management platform' },
    year: '2023–2024',
    imageAlt: { es: '', en: '' },
    summary: {
      es: 'Plataforma completa con pasarela de pagos Wompi y autenticación propia.',
      en: 'Full platform with the Wompi payment gateway and custom authentication.',
    },
    stack: ['Node.js', 'Express', 'MongoDB', 'Vue 3', 'Quasar', 'Wompi', 'JWT'],
    featured: false,
  },
  {
    id: 'transporte',
    name: { es: 'Sistema para empresa de transporte', en: 'Transport company system' },
    year: '2023',
    imageAlt: { es: '', en: '' },
    summary: {
      es: 'Primer sistema de gestión que construí de punta a punta.',
      en: 'The first management system I built end to end.',
    },
    stack: ['Node.js', 'MySQL'],
    featured: false,
  },
]

/* ------------------------------------------------------------------ */
/* 8. REFERENCIAS                                                      */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  id: string
  name: string
  position: { es: string; en: string }
  logo?: string
  logoAlt: { es: string; en: string }
  text: { es: string; en: string }
}

export const testimonials: Testimonial[] = [
  {
    id: 'tesla-lift',
    name: 'Miguel Gaibor',
    position: { es: 'CEO, Tesla Lift', en: 'CEO, Tesla Lift' },
    logo: '/img/referencias/tesla-lift.webp',
    logoAlt: { es: 'Logotipo de Tesla Lift', en: 'Tesla Lift logo' },
    text: {
      es: 'Trabajar con Sebastián en el desarrollo de nuestra aplicación Tesla Lift fue una experiencia extraordinaria. Su comprensión de nuestras necesidades y su capacidad para implementar soluciones innovadoras transformaron nuestra idea en una aplicación robusta y funcional.',
      en: 'Working with Sebastián on our Tesla Lift application was an outstanding experience. His grasp of our needs and his ability to implement innovative solutions turned our idea into a robust, functional application.',
    },
  },
  {
    id: 'cardsoftware',
    name: 'Jonathan Hernández',
    position: { es: 'CEO, CardSoftware', en: 'CEO, CardSoftware' },
    logo: '/img/referencias/cardsoftware.webp',
    logoAlt: { es: 'Logotipo de CardSoftware', en: 'CardSoftware logo' },
    text: {
      es: 'Sebastián se integró rápidamente a nuestro equipo y entregó un trabajo excepcional en el proyecto CS Tracer. A pesar del corto plazo de un mes, su dominio de Next.js y React nos permitió avanzar significativamente en el desarrollo front-end.',
      en: 'Sebastián integrated into our team quickly and delivered exceptional work on the CS Tracer project. Despite a one-month timeline, his command of Next.js and React moved our front-end development forward significantly.',
    },
  },
  {
    id: 'lalista',
    name: 'Diego Ballesteros',
    position: { es: 'Propietario, LaLista WBC', en: 'Owner, LaLista WBC' },
    logo: '/img/referencias/lalista.webp',
    logoAlt: { es: 'Logotipo de LaLista WBC', en: 'LaLista WBC logo' },
    text: {
      es: 'Sebastián desarrolló LaListaWBC.com exactamente como lo necesitábamos. Su enfoque meticuloso y su habilidad para implementar funcionalidades complejas como el chat en tiempo real superaron mis expectativas.',
      en: 'Sebastián built LaListaWBC.com exactly as we needed it. His meticulous approach and his ability to implement complex features such as real-time chat exceeded my expectations.',
    },
  },
  {
    id: 'trascender-cto',
    name: 'Andrés Martiliano',
    position: { es: 'CTO, Trascender Global', en: 'CTO, Trascender Global' },
    logo: '/img/referencias/trascender.webp',
    logoAlt: { es: 'Logotipo de Trascender Global', en: 'Trascender Global logo' },
    text: {
      es: 'Sebastián demostró ser un desarrollador excepcional. Su capacidad para resolver problemas complejos y su atención al detalle hicieron que nuestros proyectos fueran un éxito. Siempre cumplió con los plazos.',
      en: 'Sebastián proved to be an exceptional developer. His ability to solve complex problems and his attention to detail made our projects a success. He always met deadlines.',
    },
  },
]

/* ------------------------------------------------------------------ */
/* 8b. IA EN EL FLUJO DE TRABAJO                                       */
/*                                                                     */
/* REVISAR (Sebastián): esto lo redacté yo a partir de lo que ya       */
/* declaras en el resto del sitio. Ajusta la primera y la segunda       */
/* entrada para que digan exactamente cómo trabajas: es una afirmación  */
/* sobre ti y en una entrevista te van a preguntar por ella.            */
/* ------------------------------------------------------------------ */

export const aiPractice: Record<
  Lang,
  { title: string; lede: string; points: { k: string; v: string }[] }
> = {
  es: {
    title: 'IA en el flujo de trabajo',
    lede: 'La IA es parte de cómo construyo, no una línea suelta en el currículum. Es también una de las razones por las que cuatro productos en operación no consumen cuatro veces mi tiempo.',
    points: [
      {
        k: 'Cómo la uso',
        v: 'Generar y refactorizar código, contrastar alternativas de arquitectura antes de decidir, revisar mis propios cambios y mantener la documentación al día.',
      },
      {
        k: 'Qué no delego',
        v: 'El criterio. Entiendo y reviso todo lo que llega a producción: hay negocios reales que dependen de esos sistemas y el que responde soy yo.',
      },
      {
        k: 'En el trabajo',
        v: 'En Vectux Analytics —consultora de inteligencia artificial y analítica avanzada— desarrollo las interfaces y entrego MVPs completos para sus clientes corporativos.',
      },
    ],
  },
  en: {
    title: 'AI in my workflow',
    lede: 'AI is part of how I build, not a line on a résumé. It is also one of the reasons four products in production do not take four times the work.',
    points: [
      {
        k: 'How I use it',
        v: 'Writing and refactoring code, weighing architecture options before committing to one, reviewing my own changes and keeping documentation current.',
      },
      {
        k: 'What I never delegate',
        v: 'Judgement. I understand and review everything that reaches production: real businesses depend on these systems and I am the one accountable for them.',
      },
      {
        k: 'At work',
        v: 'At Vectux Analytics — an AI and advanced analytics consultancy — I build the interfaces and deliver complete MVPs for their enterprise clients.',
      },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* 9. STACK                                                            */
/* ------------------------------------------------------------------ */

export const stack: { group: { es: string; en: string }; items: string[] }[] = [
  {
    group: { es: 'Frontend', en: 'Frontend' },
    items: ['React', 'Next.js', 'TypeScript', 'Vue 3', 'Quasar', 'Tailwind CSS'],
  },
  {
    group: { es: 'Móvil', en: 'Mobile' },
    items: ['React Native', 'Expo'],
  },
  {
    group: { es: 'Backend', en: 'Backend' },
    items: ['Node.js', 'Express', 'APIs REST', 'GraphQL', 'JWT', 'OAuth2'],
  },
  {
    group: { es: 'Datos', en: 'Data' },
    items: ['MySQL', 'MongoDB', 'Supabase'],
  },
  {
    group: { es: 'Cloud e infraestructura', en: 'Cloud & infrastructure' },
    items: ['Google Cloud Platform', 'Vercel', 'Arquitectura multi-tenant', 'CI/CD'],
  },
  {
    group: { es: 'Integraciones', en: 'Integrations' },
    items: ['Facturación electrónica DIAN (Factus)', 'Wompi', 'WhatsApp', 'Cloudinary'],
  },
  {
    group: { es: 'Prácticas', en: 'Practices' },
    items: ['Git', 'Jest', 'React Testing Library', 'Code review', 'Scrum', 'Azure DevOps', 'Jira'],
  },
]

/* ------------------------------------------------------------------ */
/* 10. FORMACIÓN                                                       */
/* ------------------------------------------------------------------ */

export const education: {
  id: string
  org: Localized
  degree: { es: string; en: string }
  period: { es: string; en: string }
}[] = [
  {
    id: 'ingenieria',
    org: {
      es: 'Corporación Unificada Nacional de Educación Superior (CUN) · Modalidad virtual',
      en: 'Corporación Unificada Nacional de Educación Superior (CUN) — Colombian university · Online',
    },
    degree: {
      // En inglés NO se traduce como "B.Sc.": el título colombiano no equivale
      // a un Bachelor of Science estadounidense.
      es: 'Ingeniería de Software (en curso)',
      en: 'Software Engineering degree (in progress)',
    },
    period: { es: 'Grado previsto: 2027', en: 'Expected graduation: 2027' },
  },
  {
    id: 'sena',
    // La glosa en inglés evita que "SENA" y "Tecnólogo" no signifiquen nada
    // para un reclutador de EE.UU., sin inflar el título.
    org: {
      es: 'SENA · San Gil, Colombia',
      en: "SENA — Colombia's national vocational training institute · San Gil, Colombia",
    },
    degree: {
      es: 'Tecnólogo en Análisis y Desarrollo de Software',
      en: 'Technologist Degree (Tecnólogo) in Software Analysis and Development',
    },
    period: { es: '2024', en: '2024' },
  },
  {
    id: 'bachillerato',
    org: {
      es: 'Colegio San José de Guanentá · San Gil, Colombia',
      en: 'Colegio San José de Guanentá · San Gil, Colombia',
    },
    degree: {
      es: 'Bachiller académico con énfasis técnico en Electrónica',
      en: 'High school diploma, technical emphasis in Electronics',
    },
    period: { es: '2021', en: '2021' },
  },
]

export const certifications = {
  es: 'Platzi — ruta de Desarrollo Full Stack y certificaciones en React, Vue, React Native y Scrum.',
  en: 'Platzi — Full Stack Development track, with certifications in React, Vue, React Native and Scrum.',
}

export const languages = {
  es: ['Español — nativo', 'Inglés — básico: leo documentación técnica y trabajo por escrito; conversación en formación activa'],
  en: ['Spanish — native', 'English — basic: I read technical documentation and work in writing; conversational level actively in progress'],
}

/* ------------------------------------------------------------------ */
/* 11. CV                                                              */
/* ------------------------------------------------------------------ */

export const cv: Record<Lang, string> = {
  es: '/cv/sebastian-aparicio-cv-es.pdf',
  en: '/cv/sebastian-aparicio-cv-en.pdf',
}

/* ------------------------------------------------------------------ */
/* Helper: campos que pueden venir como string o como par ES/EN        */
/* ------------------------------------------------------------------ */

export function t(value: Localized, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang]
}
