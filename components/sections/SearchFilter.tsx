'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropertyCard from '@/components/ui/PropertyCard'
import { properties } from '@/lib/data'
import type { Property } from '@/lib/data'
import { useFadeUpVariants, useStaggerContainerVariants } from '@/hooks/useScrollAnimation'

type PropertyType = Property['type'] | 'All'
type PriceRange = 'All' | 'Under $1M' | '$1M–$3M' | '$3M+'
type BedCount = 'All' | '2+' | '3+' | '4+'

const typeFilters: PropertyType[] = ['All', 'House', 'Apartment', 'Villa']
const priceFilters: PriceRange[] = ['All', 'Under $1M', '$1M–$3M', '$3M+']
const bedFilters: BedCount[] = ['All', '2+', '3+', '4+']

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-5 py-2 font-body text-sm font-medium tracking-wide border transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-primary border-primary text-dark-bg'
          : 'bg-surface border-border text-text-secondary hover:border-primary hover:text-primary'
      }`}
    >
      {label}
    </button>
  )
}

function filterProperties(
  items: Property[],
  type: PropertyType,
  price: PriceRange,
  beds: BedCount
): Property[] {
  return items.filter((p) => {
    if (type !== 'All' && p.type !== type) return false
    if (price === 'Under $1M' && p.price >= 1_000_000) return false
    if (price === '$1M–$3M' && (p.price < 1_000_000 || p.price > 3_000_000)) return false
    if (price === '$3M+' && p.price <= 3_000_000) return false
    if (beds === '2+' && p.beds < 2) return false
    if (beds === '3+' && p.beds < 3) return false
    if (beds === '4+' && p.beds < 4) return false
    return true
  })
}

export default function SearchFilter() {
  const [activeType, setActiveType] = useState<PropertyType>('All')
  const [activePrice, setActivePrice] = useState<PriceRange>('All')
  const [activeBeds, setActiveBeds] = useState<BedCount>('All')

  const fadeUp = useFadeUpVariants()
  const stagger = useStaggerContainerVariants()
  const filtered = filterProperties(properties, activeType, activePrice, activeBeds)

  return (
    <section className="py-24 bg-surface" aria-label="Search and Filter Properties">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-3"
          >
            Find Your Match
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-semibold text-text-primary"
          >
            Search Properties
          </motion.h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6 mb-10 p-6 bg-bg border border-border"
        >
          <div className="flex flex-col gap-2">
            <span className="font-body text-xs font-medium tracking-widest uppercase text-text-muted">
              Property Type
            </span>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((t) => (
                <FilterPill key={t} label={t} active={activeType === t} onClick={() => setActiveType(t)} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-body text-xs font-medium tracking-widest uppercase text-text-muted">
              Price Range
            </span>
            <div className="flex flex-wrap gap-2">
              {priceFilters.map((p) => (
                <FilterPill key={p} label={p} active={activePrice === p} onClick={() => setActivePrice(p)} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-body text-xs font-medium tracking-widest uppercase text-text-muted">
              Bedrooms
            </span>
            <div className="flex flex-wrap gap-2">
              {bedFilters.map((b) => (
                <FilterPill key={b} label={b} active={activeBeds === b} onClick={() => setActiveBeds(b)} />
              ))}
            </div>
          </div>
        </motion.div>

        <p className="font-body text-sm text-text-secondary mb-8">
          Showing <span className="font-medium text-text-primary">{filtered.length}</span> of{' '}
          {properties.length} properties
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 text-text-muted font-body"
            >
              No properties match your filters. Try adjusting your criteria.
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
