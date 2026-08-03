import { notFound } from 'next/navigation'
import { LANGS, type Lang } from '@/content/site'
import { personSchema, profilePageSchema } from '@/lib/json-ld'
import {
  AiPractice,
  Contact,
  Education,
  Experience,
  Hero,
  Metrics,
  Products,
  Projects,
  Stack,
  Testimonials,
} from '@/components/sections'

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!LANGS.includes(lang as Lang)) notFound()
  const l = lang as Lang

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(l)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema(l)) }}
      />

      <Hero lang={l} />
      <Metrics lang={l} />
      <Experience lang={l} />
      <Products lang={l} />
      <Projects lang={l} />
      <Testimonials lang={l} />
      <AiPractice lang={l} />
      <Stack lang={l} />
      <Education lang={l} />
      <Contact lang={l} />
    </>
  )
}
