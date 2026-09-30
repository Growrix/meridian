'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import TeamCard from '@/components/ui/TeamCard'
import { team, stats } from '@/lib/data'
import { useFadeUpVariants, useStaggerContainerVariants } from '@/hooks/useScrollAnimation'

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl md:text-4xl font-bold text-primary"
      >
        {value}
      </motion.p>
      <p className="font-body text-sm text-text-secondary tracking-wide mt-1">{label}</p>
    </div>
  )
}

export default function AboutAgency() {
  const fadeUp = useFadeUpVariants()
  const stagger = useStaggerContainerVariants()

  return (
    <section id="about" className="py-24 bg-bg" aria-label="About Meridian Estates">
      <div className="max-w-7xl mx-auto px-6">
        {/* Two-column intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-sm overflow-hidden"
            style={{ aspectRatio: '4/5' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="Meridian Estates office interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-8 right-8 bg-primary p-6 text-dark-bg">
              <p className="font-display text-4xl font-bold">12</p>
              <p className="font-body text-xs tracking-widest uppercase mt-1">Years of Excellence</p>
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p
              variants={fadeUp}
              className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-3"
            >
              Our Story
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-6"
            >
              A Different Kind of Real Estate Agency
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-body text-base text-text-secondary leading-relaxed mb-4"
            >
              Founded in 2014 by Alexandra Voss, Meridian Estates was built on a single conviction:
              that luxury homebuyers deserve more than a transaction. They deserve a trusted advisor
              who understands both the art of fine living and the complexity of high-value real estate.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-body text-base text-text-secondary leading-relaxed mb-8"
            >
              Over twelve years, we have closed more than 350 transactions totaling $2.4B in volume.
              Our clientele includes executives, entertainers, and international investors who return
              to us because we deliver what others simply cannot.
            </motion.p>
            <motion.div variants={fadeUp} className="w-16 h-px bg-primary" />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 py-12 border-y border-border">
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={`${stat.value}${stat.suffix ?? ''}`}
              label={stat.label}
            />
          ))}
        </div>

        {/* Team */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-3">
              The People Behind Meridian
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-text-primary">
              Meet Our Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <motion.div key={member.id} variants={fadeUp}>
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
