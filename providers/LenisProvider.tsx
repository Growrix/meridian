'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useAnimationFrame, useReducedMotion } from 'framer-motion'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) return

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: false,
    })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [shouldReduce])

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time)
  })

  return <>{children}</>
}
