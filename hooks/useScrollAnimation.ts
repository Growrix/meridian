'use client'

import { useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'

export function useFadeUpVariants(): Variants {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return { hidden: {}, visible: {} }
  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  }
}

export function useStaggerContainerVariants(): Variants {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return { hidden: {}, visible: {} }
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  }
}

export function useFadeInVariants(): Variants {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return { hidden: {}, visible: {} }
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  }
}
