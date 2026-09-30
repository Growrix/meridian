'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface UseCountUpOptions {
  target: number
  duration?: number
  decimals?: number
  active: boolean
}

export function useCountUp({ target, duration = 2, decimals = 0, active }: UseCountUpOptions): string {
  const shouldReduce = useReducedMotion()
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active || shouldReduce) {
      setValue(target)
      return
    }

    startRef.current = null

    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / (duration * 1000), 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * target)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(rafRef.current)
      startRef.current = null
    }
  }, [active, target, duration, shouldReduce])

  return value.toFixed(decimals)
}
