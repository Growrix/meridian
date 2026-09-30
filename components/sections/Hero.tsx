'use client'

import { useRef } from 'react'
import { motion, useScroll, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { useFadeUpVariants, useStaggerContainerVariants } from '@/hooks/useScrollAnimation'
import { useParallax } from '@/hooks/useParallax'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollY } = useScroll()
  const parallaxY = useParallax(scrollY, [0, 600], shouldReduce ? [0, 0] : [0, 120])

  const fadeUp = useFadeUpVariants()
  const stagger = useStaggerContainerVariants()

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Hero"
    >
      {/* Parallax background with clip-path reveal */}
      <motion.div
        style={{ y: parallaxY }}
        initial={shouldReduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary"
          >
            Luxury Real Estate · Meridian Estates
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display font-light text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl"
          >
            Find Your Perfect
            <br />
            <span className="text-primary">Luxury Home</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
          >
            Exclusive properties in Los Angeles&apos;s most sought-after neighborhoods.
            Curated for those who demand the extraordinary.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore Properties
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Meet Our Team
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-body text-xs tracking-widest uppercase text-white/50">Scroll</span>
          <motion.div
            animate={shouldReduce ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-white/30"
          />
        </motion.div>
      </div>
    </section>
  )
}
