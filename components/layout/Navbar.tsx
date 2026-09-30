'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Properties', href: '#properties' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ['rgba(0,0,0,0)', 'rgba(255,255,255,1)']
  )
  const textColor = useTransform(scrollY, [0, 80], ['#FFFFFF', '#1A1A1A'])
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.08])
  const boxShadow = useTransform(shadowOpacity, (v) => `0 1px 0 rgba(0,0,0,${v})`)

  return (
    <>
      <motion.header
        style={{ backgroundColor, boxShadow }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a
            href="#"
            style={{ color: textColor }}
            className="font-display text-xl font-semibold tracking-wider"
          >
            MERIDIAN ESTATES
          </motion.a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                style={{ color: textColor }}
                className="font-body text-xs font-medium tracking-widest uppercase hover:opacity-70 transition-opacity"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Schedule Viewing
            </Button>
          </div>

          <motion.button
            style={{ color: textColor }}
            className="md:hidden p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-0 right-0 z-40 bg-surface shadow-lg px-6 py-8 md:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm font-medium tracking-widest uppercase text-text-primary hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setMobileOpen(false)
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Schedule Viewing
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
