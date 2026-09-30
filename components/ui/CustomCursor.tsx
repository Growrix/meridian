'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMagneticCursor } from '@/hooks/useMagneticCursor'

// Detect pointer device — only show custom cursor when hover is available
function useIsPointerDevice() {
  const [isPointer, setIsPointer] = useState(false)
  useEffect(() => {
    setIsPointer(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])
  return isPointer
}

export default function CustomCursor() {
  const isPointer = useIsPointerDevice()
  const { dotX, dotY, ringX, ringY } = useMagneticCursor()
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    if (!isPointer) return

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], [data-magnetic]')) {
        setIsHovering(true)
      }
    }
    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], [data-magnetic]')) {
        setIsHovering(false)
      }
    }
    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
    }
  }, [isPointer])

  if (!isPointer) return null

  return (
    <>
      {/* Ring */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99999,
          pointerEvents: 'none',
        }}
        animate={{
          width: isHovering ? 48 : isClicking ? 20 : 32,
          height: isHovering ? 48 : isClicking ? 20 : 32,
          borderColor: isHovering ? 'rgba(201,169,110,0.9)' : 'rgba(201,169,110,0.5)',
          opacity: isClicking ? 0.6 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="rounded-full border"
      />

      {/* Dot */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99999,
          pointerEvents: 'none',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#C9A96E',
        }}
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
