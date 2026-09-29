'use client'

import { motion } from 'framer-motion'
import PropertyCard from '@/components/ui/PropertyCard'
import { properties } from '@/lib/data'
import { useFadeUpVariants, useStaggerContainerVariants } from '@/hooks/useScrollAnimation'

export default function FeaturedProperties() {
  const fadeUp = useFadeUpVariants()
  const stagger = useStaggerContainerVariants()

  return (
    <section id="properties" className="py-24 bg-bg" aria-label="Featured Properties">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-3"
            >
              Curated Selection
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-semibold text-text-primary"
            >
              Featured Properties
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            href="#"
            className="font-body text-sm font-medium tracking-widest uppercase text-text-secondary hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            View All Properties →
          </motion.a>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {properties.map((property) => (
            <motion.div key={property.id} variants={fadeUp}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
