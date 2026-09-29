'use client'

import { useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

export function useParallax(
  scrollY: MotionValue<number>,
  inputRange: [number, number],
  outputRange: [number, number]
): MotionValue<number> {
  return useTransform(scrollY, inputRange, outputRange)
}
