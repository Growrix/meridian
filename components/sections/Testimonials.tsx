'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestimonialCard from '@/components/ui/TestimonialCard'
import { testimonials } from '@/lib/data'
import { useFadeUpVariants, useStaggerContainerVariants } from '@/hooks/useScrollAnimation'

const AUTOPLAY_INTERVAL = 5000

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)
  const shouldReduce = useReducedMotion()

  const fadeUp = useFadeUpVariants()
  const stagger = useStaggerContainerVariants()

  const goTo = useCallback((index: number, dir: 1 | -1) => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, -1)
  }, [current, goTo])

  useEffect(() => {
    if (paused || shouldReduce) return
    const id = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [paused, shouldReduce, next])

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  }

  return (
    <section
      id="testimonials"
      className="py-24 bg-dark-bg"
      aria-label="Client Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-3"
          >
            Client Stories
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-semibold text-white"
          >
            What Our Clients Say
          </motion.h2>
        </motion.div>

        <div
          className="relative overflow-hidden min-h-[340px] flex items-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={shouldReduce ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full"
            >
              <TestimonialCard testimonial={testimonials[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`transition-all duration-300 cursor-pointer ${
                  i === current
                    ? 'w-6 h-1.5 bg-primary'
                    : 'w-1.5 h-1.5 rounded-full bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
