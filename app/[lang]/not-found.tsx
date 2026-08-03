import Link from 'next/link'

export const metadata = { title: 'Página no encontrada · Page not found' }

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="text-muted">Esta página no existe. · This page does not exist.</p>
      <Link href="/es" className="link">
        Volver al inicio · Back to home
      </Link>
    </div>
  )
}
