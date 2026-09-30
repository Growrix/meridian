import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20 bg-bg min-h-screen flex items-center justify-center">
        <div className="max-w-lg mx-auto px-6 text-center py-32">
          <p className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
            404
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-text-primary mb-6">
            Page Not Found
          </h1>
          <p className="font-body text-base text-text-secondary leading-relaxed mb-10">
            The page you&apos;re looking for has been moved or no longer exists.
            Let us help you find the perfect property.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-10 py-4 font-body text-sm font-medium tracking-widest uppercase bg-primary text-dark-bg hover:bg-primary-dark transition-colors duration-300"
            >
              Back to Home
            </Link>
            <Link
              href="/#properties"
              className="inline-flex items-center justify-center px-10 py-4 font-body text-sm font-medium tracking-widest uppercase border border-current text-text-primary hover:bg-text-primary hover:text-white transition-colors duration-300"
            >
              View Properties
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
