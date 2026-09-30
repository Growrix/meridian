'use client'

import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useMagneticCursor() {
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Dot follows tightly
  const dotX = useSpring(rawX, { stiffness: 800, damping: 40, mass: 0.3 })
  const dotY = useSpring(rawY, { stiffness: 800, damping: 40, mass: 0.3 })

  // Ring lags behind for a trailing effect
  const ringX = useSpring(rawX, { stiffness: 200, damping: 28, mass: 0.6 })
  const ringY = useSpring(rawY, { stiffness: 200, damping: 28, mass: 0.6 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [rawX, rawY])

  return { dotX, dotY, ringX, ringY }
}
