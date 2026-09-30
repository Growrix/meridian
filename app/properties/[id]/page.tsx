import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Bed, Bath, Square, MapPin, Calendar, Car, CheckCircle } from 'lucide-react'
import { properties } from '@/lib/data'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const property = properties.find((p) => p.id === id)
  if (!property) return {}
  return {
    title: property.address,
    description: `${property.beds}-bedroom ${property.type.toLowerCase()} in ${property.neighborhood}, ${property.city}. ${property.sqft.toLocaleString()} sq ft — ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(property.price)}.`,
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

const tagColors: Record<string, string> = {
  New: 'bg-primary text-dark-bg',
  Featured: 'bg-dark-bg text-primary',
  Sold: 'bg-text-muted text-white',
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params
  const property = properties.find((p) => p.id === id)
  if (!property) notFound()

  const images = property.images ?? [property.image]

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20 bg-bg min-h-screen">
        {/* Back link */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            href="/#properties"
            className="inline-flex items-center gap-2 font-body text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Properties
          </Link>
        </div>

        {/* Image gallery */}
        <section className="max-w-7xl mx-auto px-6 mb-12" aria-label="Property images">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <Image
                src={images[0]}
                alt={`${property.address} — main view`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {property.tag && (
                <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-body font-medium tracking-widest uppercase ${tagColors[property.tag]}`}>
                  {property.tag}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {images.slice(1, 5).map((src, i) => (
                <div key={i} className="relative rounded-sm overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <Image
                    src={src}
                    alt={`${property.address} — view ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left: details */}
            <div className="lg:col-span-2">
              <p className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-2">
                {property.neighborhood} · {property.city}
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-3">
                {property.address}
              </h1>
              <p className="font-display text-3xl font-bold text-primary mb-8">
                {formatPrice(property.price)}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-border">
                {[
                  { icon: Bed, label: `${property.beds} Bedrooms` },
                  { icon: Bath, label: `${property.baths} Bathrooms` },
                  { icon: Square, label: `${property.sqft.toLocaleString()} sq ft` },
                  { icon: MapPin, label: `${property.neighborhood}` },
                  { icon: Calendar, label: `Built ${property.yearBuilt}` },
                  { icon: Car, label: property.parking },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-text-secondary font-body text-sm">
                    <Icon size={16} className="text-primary" aria-hidden="true" />
                    {label}
                  </div>
                ))}
                {property.lotSize && (
                  <div className="flex items-center gap-2 text-text-secondary font-body text-sm">
                    <Square size={16} className="text-primary" aria-hidden="true" />
                    {property.lotSize}
                  </div>
                )}
              </div>

              {/* Description */}
              <section aria-label="Property description" className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-text-primary mb-4">
                  About This Property
                </h2>
                <p className="font-body text-base text-text-secondary leading-relaxed">
                  {property.description}
                </p>
              </section>

              {/* Features */}
              <section aria-label="Property features">
                <h2 className="font-display text-2xl font-semibold text-text-primary mb-6">
                  Property Features
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 font-body text-sm text-text-secondary">
                      <CheckCircle size={16} className="text-primary shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right: sticky enquiry card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-surface border border-border p-8">
                <p className="font-display text-2xl font-semibold text-text-primary mb-1">
                  Enquire About This Property
                </p>
                <p className="font-body text-sm text-text-secondary mb-6">
                  Our team responds within 24 hours. All enquiries are confidential.
                </p>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/#contact"
                    className="w-full text-center font-body text-sm font-medium tracking-widest uppercase bg-primary text-dark-bg px-8 py-4 hover:bg-primary-dark transition-colors duration-300 block"
                  >
                    Schedule a Viewing
                  </Link>
                  <a
                    href="tel:+13105550190"
                    className="w-full text-center font-body text-sm font-medium tracking-widest uppercase border border-text-primary text-text-primary px-8 py-4 hover:bg-text-primary hover:text-white transition-colors duration-300"
                  >
                    Call +1 (310) 555-0190
                  </a>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="font-body text-xs text-text-muted text-center">
                    Listed by Meridian Estates · DRE #01234567
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
