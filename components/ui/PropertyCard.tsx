'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Square, ArrowRight } from 'lucide-react'
import type { Property } from '@/lib/data'

interface PropertyCardProps {
  property: Property
}

const tagColors: Record<NonNullable<Property['tag']>, string> = {
  New: 'bg-primary text-dark-bg',
  Featured: 'bg-dark-bg text-primary',
  Sold: 'bg-text-muted text-white',
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.article
      whileHover={
        shouldReduce ? {} : { y: -8, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }
      }
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-surface rounded-sm overflow-hidden group cursor-pointer"
    >
    <Link href={`/properties/${property.id}`} className="block" aria-label={`View ${property.address}`}>
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '8/5' }}>
        <motion.div
          whileHover={shouldReduce ? {} : { scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={property.image}
            alt={`${property.address}, ${property.neighborhood}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {property.tag && (
          <span
            className={`absolute top-4 right-4 px-3 py-1 text-xs font-body font-medium tracking-widest uppercase ${tagColors[property.tag]}`}
          >
            {property.tag}
          </span>
        )}

        {/* Slide-up CTA */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-primary px-6 py-3 flex items-center justify-between">
          <span className="font-body text-sm font-medium tracking-widest uppercase text-dark-bg">
            View Property
          </span>
          <ArrowRight size={16} className="text-dark-bg" aria-hidden="true" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-display text-2xl font-bold text-text-primary mb-1">
          {formatPrice(property.price)}
        </p>
        <h3 className="font-body text-base font-medium text-text-primary mb-1">
          {property.address}
        </h3>
        <p className="font-body text-sm text-text-secondary mb-4">
          {property.neighborhood}, {property.city}
        </p>
        <div className="flex items-center gap-4 border-t border-border pt-4">
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Bed size={14} aria-hidden="true" />
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Bath size={14} aria-hidden="true" />
            {property.baths} Baths
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Square size={14} aria-hidden="true" />
            {property.sqft.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </Link>
    </motion.article>
  )
}
