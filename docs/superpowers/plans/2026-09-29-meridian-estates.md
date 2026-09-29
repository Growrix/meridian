# Meridian Estates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready luxury real estate marketing website for Meridian Estates with smooth Framer Motion animations, warm gold design system, and six fully animated sections.

**Architecture:** Section-based flat architecture — `app/page.tsx` composes six self-contained section components. Shared design tokens in `lib/design-tokens.ts` drive Tailwind config. Four animation layers (load, scroll, hover, parallax) all use GPU-safe `transform`/`opacity` only.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Framer Motion v11, lucide-react, next/font (Google Fonts), next/image (Unsplash)

**Spec:** `docs/superpowers/specs/2026-09-29-meridian-estates-design.md`

## Global Constraints

- Next.js 14.x with App Router (`app/` directory) — no Pages Router
- TypeScript strict mode enabled
- Tailwind CSS v3 — design tokens extended in `tailwind.config.ts`, not inline styles
- Framer Motion v11 — all animations use `transform` and `opacity` only (no layout properties)
- `useReducedMotion()` wraps every animation variant — reduced-motion users get instant transitions
- `next/font` for all Google Fonts — zero layout shift, no external font requests at runtime
- `next/image` for all images — explicit `width`/`height`, `placeholder="blur"`, lazy loading
- One `<h1>` per page (hero headline only); sections use `<h2>`, cards use `<h3>`
- All interactive elements keyboard-navigable; focus ring: `outline: 2px solid #C9A96E; outline-offset: 2px`
- Gold `#C9A96E` never used as small body text on white background (contrast requirement)
- Agency name: **Meridian Estates** — used verbatim everywhere
- No backend, no API calls, no auth — static data only

## Review Focus

- **Carousel keyboard trap:** Testimonials carousel arrow buttons must be reachable and operable with Tab+Enter, not just mouse clicks; a user who only uses keyboard must be able to navigate all testimonials.
- **Reduced-motion content visibility:** `useReducedMotion()` must set variants to `{}` (instant), not skip rendering — animated elements must still appear for users with reduced motion.
- **Filter state / AnimatePresence key mismatch:** When filter changes, `AnimatePresence` exit animations only fire if `key` props on cards change correctly; stale keys cause cards to skip exit animations and flicker.
- **Parallax on mobile:** `useTransform` parallax on hero background must be disabled or clamped on touch devices — excessive parallax causes scroll jank on iOS Safari.
- **Form submission with empty optional field:** Phone field is optional; submitting with it empty must not trigger validation error; only Name, Email, Intent, and Budget are required.

---

## File Map

```
meridian-estates/
├── app/
│   ├── layout.tsx                    CREATE — root layout, fonts, metadata, JSON-LD
│   ├── page.tsx                      CREATE — page composition
│   └── globals.css                   CREATE — Tailwind directives, CSS custom properties
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                CREATE — sticky, scroll-aware nav
│   │   └── Footer.tsx                CREATE — footer
│   └── sections/
│       ├── Hero.tsx                  CREATE — parallax hero
│       ├── FeaturedProperties.tsx    CREATE — property grid
│       ├── SearchFilter.tsx          CREATE — filter + animated results
│       ├── AboutAgency.tsx           CREATE — stats + team
│       ├── Testimonials.tsx          CREATE — carousel
│       └── ContactForm.tsx           CREATE — form with states
├── components/ui/
│   ├── PropertyCard.tsx              CREATE — primary card component
│   ├── TeamCard.tsx                  CREATE — team flip card
│   ├── TestimonialCard.tsx           CREATE — testimonial display
│   └── Button.tsx                    CREATE — primary/secondary button
├── hooks/
│   ├── useScrollAnimation.ts         CREATE — scroll-triggered variants + helpers
│   └── useParallax.ts                CREATE — useScroll/useTransform wrapper
└── lib/
    ├── design-tokens.ts              CREATE — token constants
    └── data.ts                       CREATE — all static content + types
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `app/globals.css`
- Create: `lib/design-tokens.ts`

**Interfaces:**
- Produces: working `npm run dev`, design token constants exported from `lib/design-tokens.ts`, Tailwind config with custom colors + font vars

- [ ] **Step 1: Scaffold Next.js project**

In `D:\Desktop Mass\CLAUDE\SaaS Projects\Real State\meridian`, run:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
```

Accept all prompts. This creates `app/`, `public/`, `tailwind.config.ts`, `tsconfig.json`, `next.config.ts`.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion lucide-react
```

- [ ] **Step 3: Verify TypeScript compiles clean**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Write design tokens**

Create `lib/design-tokens.ts`:

```typescript
export const colors = {
  primary: '#C9A96E',
  primaryDark: '#A8814A',
  bg: '#FAFAF8',
  surface: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B6B6B',
  textMuted: '#9E9E9E',
  border: '#E8E3DB',
  darkBg: '#111111',
} as const

export const fonts = {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
} as const
```

- [ ] **Step 5: Configure Tailwind with design tokens**

Replace the content of `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C9A96E',
        'primary-dark': '#A8814A',
        bg: '#FAFAF8',
        surface: '#FFFFFF',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B6B6B',
        'text-muted': '#9E9E9E',
        border: '#E8E3DB',
        'dark-bg': '#111111',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 6: Write global CSS**

Replace `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #C9A96E;
  --color-primary-dark: #A8814A;
  --color-bg: #FAFAF8;
  --color-surface: #FFFFFF;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #6B6B6B;
  --color-text-muted: #9E9E9E;
  --color-border: #E8E3DB;
  --color-dark-bg: #111111;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
}

/* Focus ring — gold, visible on all backgrounds */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000 — default Next.js page must load without errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with design tokens and Tailwind config"
```

---

## Task 2: Root Layout + Fonts

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `lib/design-tokens.ts` (font vars)
- Produces: `--font-display` and `--font-body` CSS vars available globally; `<html>` has both font class vars; metadata exported

- [ ] **Step 1: Write root layout**

Replace `app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Meridian Estates',
    default: 'Meridian Estates | Luxury Real Estate',
  },
  description:
    'Meridian Estates specializes in luxury residential properties $500k and above. Find your perfect home in the most sought-after neighborhoods.',
  openGraph: {
    type: 'website',
    siteName: 'Meridian Estates',
    title: 'Meridian Estates | Luxury Real Estate',
    description:
      'Exclusive luxury properties curated by Meridian Estates. $500k+ residential specialists.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Meridian Estates',
              description:
                'Luxury residential real estate specialists serving the $500k+ market.',
              url: 'https://meridianestates.com',
              telephone: '+1-310-555-0190',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '9200 Sunset Boulevard, Suite 800',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                postalCode: '90069',
                addressCountry: 'US',
              },
            }),
          }}
        />
      </head>
      <body className="font-body bg-bg text-text-primary">{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verify fonts load**

```bash
npm run dev
```

Open http://localhost:3000. In DevTools → Network → Fonts: two Google Font wasm/woff2 requests must appear (Cormorant Garamond + Inter). No layout shift on load.

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with Cormorant Garamond + Inter fonts and metadata"
```

---

## Task 3: Static Data Layer

**Files:**
- Create: `lib/data.ts`

**Interfaces:**
- Produces:
  - `properties: Property[]` — 6 items
  - `team: TeamMember[]` — 3 items
  - `testimonials: Testimonial[]` — 6 items
  - `stats: AgencyStat[]` — 4 items
  - Types: `Property`, `TeamMember`, `Testimonial`, `AgencyStat`

- [ ] **Step 1: Write data types and content**

Create `lib/data.ts`:

```typescript
export interface Property {
  id: string
  tag: 'New' | 'Featured' | 'Sold' | null
  price: number
  address: string
  neighborhood: string
  city: string
  beds: number
  baths: number
  sqft: number
  image: string
  type: 'House' | 'Apartment' | 'Villa'
}

export interface TeamMember {
  id: string
  name: string
  title: string
  yearsExperience: number
  bio: string
  email: string
  phone: string
  image: string
}

export interface Testimonial {
  id: string
  clientName: string
  propertySold: string
  quote: string
  rating: number
  date: string
}

export interface AgencyStat {
  label: string
  value: string
  suffix?: string
}

export const properties: Property[] = [
  {
    id: 'prop-001',
    tag: 'Featured',
    price: 4850000,
    address: '1240 Hillcrest Drive',
    neighborhood: 'Bel Air',
    city: 'Los Angeles, CA',
    beds: 5,
    baths: 6,
    sqft: 7200,
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    type: 'House',
  },
  {
    id: 'prop-002',
    tag: 'New',
    price: 2350000,
    address: '830 Oceanfront Walk',
    neighborhood: 'Santa Monica',
    city: 'Los Angeles, CA',
    beds: 4,
    baths: 4,
    sqft: 3800,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    type: 'House',
  },
  {
    id: 'prop-003',
    tag: null,
    price: 1750000,
    address: '450 Canyon View Court',
    neighborhood: 'Beverly Hills',
    city: 'Los Angeles, CA',
    beds: 3,
    baths: 3,
    sqft: 2900,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    type: 'Villa',
  },
  {
    id: 'prop-004',
    tag: 'Featured',
    price: 3200000,
    address: '2100 Pacific Coast Highway',
    neighborhood: 'Malibu',
    city: 'Los Angeles, CA',
    beds: 4,
    baths: 5,
    sqft: 5100,
    image:
      'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=80',
    type: 'House',
  },
  {
    id: 'prop-005',
    tag: null,
    price: 890000,
    address: '720 Wilshire Tower, Unit 3201',
    neighborhood: 'Downtown',
    city: 'Los Angeles, CA',
    beds: 2,
    baths: 2,
    sqft: 1850,
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    type: 'Apartment',
  },
  {
    id: 'prop-006',
    tag: 'Sold',
    price: 6100000,
    address: '9 Rockingham Avenue',
    neighborhood: 'Brentwood',
    city: 'Los Angeles, CA',
    beds: 6,
    baths: 7,
    sqft: 9400,
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    type: 'House',
  },
]

export const team: TeamMember[] = [
  {
    id: 'team-001',
    name: 'Alexandra Voss',
    title: 'Principal Broker & Founder',
    yearsExperience: 18,
    bio: 'Alexandra founded Meridian Estates after 18 years navigating luxury residential markets. She has closed over $800M in transactions and is recognized as one of LA\'s top 10 luxury brokers.',
    email: 'alexandra@meridianestates.com',
    phone: '+1 (310) 555-0191',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    id: 'team-002',
    name: 'Marcus Chen',
    title: 'Senior Luxury Specialist',
    yearsExperience: 12,
    bio: 'Marcus specializes in off-market Bel Air and Beverly Hills estates. His deep network of private sellers gives Meridian clients access to properties never listed publicly.',
    email: 'marcus@meridianestates.com',
    phone: '+1 (310) 555-0192',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: 'team-003',
    name: 'Isabelle Laurent',
    title: 'Director of International Sales',
    yearsExperience: 9,
    bio: 'Isabelle leads cross-border transactions for international buyers seeking Los Angeles properties. Fluent in French and Mandarin, she bridges global buyers with LA\'s finest estates.',
    email: 'isabelle@meridianestates.com',
    phone: '+1 (310) 555-0193',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'test-001',
    clientName: 'Jonathan & Sarah Whitmore',
    propertySold: 'Bel Air Estate — $4.2M',
    quote:
      'Meridian Estates found us our dream home in six weeks. Alexandra\'s knowledge of the Bel Air market is unmatched — she knew about the listing before it was public.',
    rating: 5,
    date: 'March 2026',
  },
  {
    id: 'test-002',
    clientName: 'David Nakamura',
    propertySold: 'Malibu Beach House — $3.8M',
    quote:
      'Marcus secured a private showing on a Malibu property I\'d been searching for years. The entire process was seamless. Meridian operates at a level I hadn\'t experienced before.',
    rating: 5,
    date: 'January 2026',
  },
  {
    id: 'test-003',
    clientName: 'Claire & Thomas Beaumont',
    propertySold: 'Beverly Hills Villa — $2.1M',
    quote:
      'Moving from Paris, we needed an agent who understood both cultures. Isabelle was extraordinary — patient, meticulous, and she negotiated a price $180,000 below asking.',
    rating: 5,
    date: 'November 2025',
  },
  {
    id: 'test-004',
    clientName: 'Robert Ashford',
    propertySold: 'Brentwood Estate — $6.1M',
    quote:
      'Sold our Brentwood estate in 12 days at full asking price. Meridian\'s marketing was exceptional — professional photography, virtual tours, and an international buyer network.',
    rating: 5,
    date: 'September 2025',
  },
  {
    id: 'test-005',
    clientName: 'Priya & Arjun Mehta',
    propertySold: 'Santa Monica Home — $2.4M',
    quote:
      'First-time luxury buyers and nervous about the process. Marcus walked us through every step and never made us feel rushed. We\'re in our perfect home and couldn\'t be happier.',
    rating: 5,
    date: 'July 2025',
  },
  {
    id: 'test-006',
    clientName: 'Elizabeth Harmon',
    propertySold: 'Downtown Penthouse — $1.2M',
    quote:
      'I\'ve worked with five different brokerages over the years. Meridian Estates is in a different category — responsive, knowledgeable, and genuinely invested in getting the right outcome.',
    rating: 5,
    date: 'May 2025',
  },
]

export const stats: AgencyStat[] = [
  { label: 'Properties Sold', value: '350', suffix: '+' },
  { label: 'Total Transaction Volume', value: '$2.4B' },
  { label: 'Years of Excellence', value: '12' },
  { label: 'Average Client Rating', value: '4.9', suffix: '★' },
]
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add static data layer with 6 properties, 3 team members, 6 testimonials"
```

---

## Task 4: Animation Hooks

**Files:**
- Create: `hooks/useScrollAnimation.ts`
- Create: `hooks/useParallax.ts`

**Interfaces:**
- Produces:
  - `fadeUpVariants`: `Variants` — `hidden: { opacity: 0, y: 30 }` → `visible: { opacity: 1, y: 0 }`
  - `staggerContainerVariants`: `Variants` — container with `staggerChildren: 0.12`
  - `fadeInVariants`: `Variants` — `hidden: { opacity: 0 }` → `visible: { opacity: 1 }`
  - `useParallax(scrollY, inputRange, outputRange)`: returns Framer `MotionValue<number>`

- [ ] **Step 1: Write scroll animation hook**

Create `hooks/useScrollAnimation.ts`:

```typescript
import { useReducedMotion, Variants } from 'framer-motion'

export function useFadeUpVariants(): Variants {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return {
      hidden: {},
      visible: {},
    }
  }

  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }
}

export function useStaggerContainerVariants(): Variants {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return { hidden: {}, visible: {} }
  }

  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }
}

export function useFadeInVariants(): Variants {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return { hidden: {}, visible: {} }
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }
}
```

- [ ] **Step 2: Write parallax hook**

Create `hooks/useParallax.ts`:

```typescript
'use client'

import { useTransform, MotionValue } from 'framer-motion'

export function useParallax(
  scrollY: MotionValue<number>,
  inputRange: [number, number],
  outputRange: [number, number]
): MotionValue<number> {
  return useTransform(scrollY, inputRange, outputRange)
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add hooks/
git commit -m "feat: add animation hooks — fadeUp, stagger, parallax with reduced-motion support"
```

---

## Task 5: UI Primitives — Button Component

**Files:**
- Create: `components/ui/Button.tsx`

**Interfaces:**
- Produces: `Button` component — props: `variant: 'primary' | 'secondary'`, `size?: 'sm' | 'md' | 'lg'`, `className?: string`, all native `<button>` props

- [ ] **Step 1: Write Button component**

Create `components/ui/Button.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-8 py-3 text-sm',
  lg: 'px-10 py-4 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const shouldReduce = useReducedMotion()

    const baseClasses =
      'inline-flex items-center justify-center font-body font-medium tracking-widest uppercase transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses =
      variant === 'primary'
        ? 'bg-primary text-dark-bg hover:bg-primary-dark'
        : 'border border-current text-white hover:bg-white hover:text-dark-bg'

    return (
      <motion.button
        ref={ref}
        whileHover={shouldReduce ? {} : { scale: 1.02 }}
        whileTap={shouldReduce ? {} : { scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: add Button UI component with primary/secondary variants and motion"
```

---

## Task 6: PropertyCard Component

**Files:**
- Create: `components/ui/PropertyCard.tsx`

**Interfaces:**
- Consumes: `Property` type from `lib/data.ts`
- Produces: `PropertyCard` component — props: `property: Property`

- [ ] **Step 1: Write PropertyCard**

Create `components/ui/PropertyCard.tsx`:

```typescript
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Bed, Bath, Square, ArrowRight } from 'lucide-react'
import type { Property } from '@/lib/data'

interface PropertyCardProps {
  property: Property
}

const tagColors: Record<NonNullable<Property['tag']>, string> = {
  New: 'bg-primary text-dark-bg',
  Featured: 'bg-dark-bg text-primary',
  Sold: 'bg-text-muted text-white',
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.article
      whileHover={
        shouldReduce
          ? {}
          : { y: -8, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }
      }
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-surface rounded-sm overflow-hidden group cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[8/5] overflow-hidden">
        <motion.div
          whileHover={shouldReduce ? {} : { scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={property.image}
            alt={`${property.address}, ${property.neighborhood}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Tag */}
        {property.tag && (
          <span
            className={`absolute top-4 right-4 px-3 py-1 text-xs font-body font-medium tracking-widest uppercase ${tagColors[property.tag]}`}
          >
            {property.tag}
          </span>
        )}

        {/* CTA overlay — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-primary px-6 py-3 flex items-center justify-between">
          <span className="font-body text-sm font-medium tracking-widest uppercase text-dark-bg">
            View Property
          </span>
          <ArrowRight size={16} className="text-dark-bg" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <p className="font-display text-2xl font-bold text-text-primary mb-1">
          {formatPrice(property.price)}
        </p>

        {/* Address */}
        <h3 className="font-body text-base font-medium text-text-primary mb-1">
          {property.address}
        </h3>
        <p className="font-body text-sm text-text-secondary mb-4">
          {property.neighborhood}, {property.city}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 border-t border-border pt-4">
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Bed size={14} />
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Bath size={14} />
            {property.baths} Baths
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Square size={14} />
            {property.sqft.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </motion.article>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/PropertyCard.tsx
git commit -m "feat: add PropertyCard component with hover lift and slide-up CTA"
```

---

## Task 7: Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

**Interfaces:**
- Produces: `Navbar` component — no props; reads scroll position internally

- [ ] **Step 1: Write Navbar**

Create `components/layout/Navbar.tsx`:

```typescript
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
  const boxShadow = useTransform(
    shadowOpacity,
    (v) => `0 1px 0 rgba(0,0,0,${v})`
  )

  return (
    <>
      <motion.header
        style={{ backgroundColor, boxShadow }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            style={{ color: textColor }}
            className="font-display text-xl font-semibold tracking-wider"
          >
            MERIDIAN ESTATES
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                style={{ color: textColor }}
                className="font-body text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Schedule Viewing
            </Button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            style={{ color: textColor }}
            className="md:hidden p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-0 right-0 z-40 bg-surface shadow-lg px-6 py-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
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
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
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
```

- [ ] **Step 2: Temporarily add Navbar to page to test**

Replace `app/page.tsx`:

```typescript
import Navbar from '@/components/layout/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="h-screen bg-dark-bg" />
      <div className="h-screen bg-bg" />
    </main>
  )
}
```

- [ ] **Step 3: Test visually**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Navbar is transparent over dark section
- Scrolling down: navbar transitions to white with dark text
- Mobile (DevTools → responsive, 375px): hamburger appears, drawer opens/closes

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Navbar.tsx app/page.tsx
git commit -m "feat: add Navbar with scroll-aware transparency and mobile drawer"
```

---

## Task 8: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `Button` from `components/ui/Button.tsx`; `useFadeUpVariants`, `useStaggerContainerVariants` from `hooks/useScrollAnimation.ts`; `useParallax` from `hooks/useParallax.ts`
- Produces: `Hero` section component — no props

- [ ] **Step 1: Write Hero section**

Create `components/sections/Hero.tsx`:

```typescript
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
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: parallaxY }}
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary"
          >
            Luxury Real Estate · Meridian Estates
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-light text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl"
          >
            Find Your Perfect
            <br />
            <span className="text-primary">Luxury Home</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="font-body text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
          >
            Exclusive properties in Los Angeles&apos;s most sought-after
            neighborhoods. Curated for those who demand the extraordinary.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                document
                  .getElementById('properties')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore Properties
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                document
                  .getElementById('about')
                  ?.scrollIntoView({ behavior: 'smooth' })
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
          <span className="font-body text-xs tracking-widest uppercase text-white/50">
            Scroll
          </span>
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
```

- [ ] **Step 2: Add Hero to page and test**

Update `app/page.tsx`:

```typescript
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="h-screen bg-bg" />
    </main>
  )
}
```

- [ ] **Step 3: Test visually**

```bash
npm run dev
```

Verify:
- Full-viewport hero with property image
- Text stagger animates in on load (eyebrow → h1 → subtext → CTAs)
- Parallax: scroll down — background image moves slower than content
- Primary gold CTA and outlined secondary CTA visible

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with parallax background and staggered load animation"
```

---

## Task 9: Featured Properties Section

**Files:**
- Create: `components/sections/FeaturedProperties.tsx`

**Interfaces:**
- Consumes: `properties` from `lib/data.ts`; `PropertyCard` from `components/ui/PropertyCard.tsx`; `useFadeUpVariants`, `useStaggerContainerVariants` from hooks
- Produces: `FeaturedProperties` section — no props; renders all 6 property cards

- [ ] **Step 1: Write FeaturedProperties section**

Create `components/sections/FeaturedProperties.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import PropertyCard from '@/components/ui/PropertyCard'
import { properties } from '@/lib/data'
import { useFadeUpVariants, useStaggerContainerVariants } from '@/hooks/useScrollAnimation'

export default function FeaturedProperties() {
  const fadeUp = useFadeUpVariants()
  const stagger = useStaggerContainerVariants()

  return (
    <section id="properties" className="py-24 bg-bg" aria-label="Featured Properties">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-3"
            >
              Curated Selection
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-semibold text-text-primary"
            >
              Featured Properties
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            href="#"
            className="font-body text-sm font-medium tracking-widest uppercase text-text-secondary hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            View All Properties →
          </motion.a>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {properties.map((property) => (
            <motion.div key={property.id} variants={fadeUp}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page and test**

Update `app/page.tsx`:

```typescript
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import FeaturedProperties from '@/components/sections/FeaturedProperties'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedProperties />
    </main>
  )
}
```

- [ ] **Step 3: Test visually**

```bash
npm run dev
```

Verify:
- 3-column grid desktop, 2-column tablet, 1-column mobile
- Cards stagger in as section scrolls into view
- Hover: card lifts, image zooms slightly, "View Property" CTA slides up

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/FeaturedProperties.tsx app/page.tsx
git commit -m "feat: add FeaturedProperties section with staggered card grid"
```

---

## Task 10: Search & Filter Section

**Files:**
- Create: `components/sections/SearchFilter.tsx`

**Interfaces:**
- Consumes: `properties`, `Property` from `lib/data.ts`; `PropertyCard`; `useFadeUpVariants`, `useStaggerContainerVariants`
- Produces: `SearchFilter` section — no props; manages filter state internally

- [ ] **Step 1: Write SearchFilter section**

Create `components/sections/SearchFilter.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropertyCard from '@/components/ui/PropertyCard'
import { properties } from '@/lib/data'
import type { Property } from '@/lib/data'
import { useFadeUpVariants, useStaggerContainerVariants } from '@/hooks/useScrollAnimation'

type PropertyType = Property['type'] | 'All'
type PriceRange = 'All' | 'Under $1M' | '$1M–$3M' | '$3M+'
type BedCount = 'All' | '2+' | '3+' | '4+'

const typeFilters: PropertyType[] = ['All', 'House', 'Apartment', 'Villa']
const priceFilters: PriceRange[] = ['All', 'Under $1M', '$1M–$3M', '$3M+']
const bedFilters: BedCount[] = ['All', '2+', '3+', '4+']

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 font-body text-sm font-medium tracking-wide border transition-all duration-200 ${
        active
          ? 'bg-primary border-primary text-dark-bg'
          : 'bg-surface border-border text-text-secondary hover:border-primary hover:text-primary'
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

function filterProperties(
  items: Property[],
  type: PropertyType,
  price: PriceRange,
  beds: BedCount
): Property[] {
  return items.filter((p) => {
    if (type !== 'All' && p.type !== type) return false
    if (price === 'Under $1M' && p.price >= 1_000_000) return false
    if (price === '$1M–$3M' && (p.price < 1_000_000 || p.price > 3_000_000)) return false
    if (price === '$3M+' && p.price <= 3_000_000) return false
    if (beds === '2+' && p.beds < 2) return false
    if (beds === '3+' && p.beds < 3) return false
    if (beds === '4+' && p.beds < 4) return false
    return true
  })
}

export default function SearchFilter() {
  const [activeType, setActiveType] = useState<PropertyType>('All')
  const [activePrice, setActivePrice] = useState<PriceRange>('All')
  const [activeBeds, setActiveBeds] = useState<BedCount>('All')

  const fadeUp = useFadeUpVariants()
  const stagger = useStaggerContainerVariants()

  const filtered = filterProperties(properties, activeType, activePrice, activeBeds)

  return (
    <section className="py-24 bg-surface" aria-label="Search and Filter Properties">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-3"
          >
            Find Your Match
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-semibold text-text-primary"
          >
            Search Properties
          </motion.h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6 mb-10 p-6 bg-bg border border-border"
        >
          <div className="flex flex-col gap-2">
            <span className="font-body text-xs font-medium tracking-widest uppercase text-text-muted">
              Property Type
            </span>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((t) => (
                <FilterPill
                  key={t}
                  label={t}
                  active={activeType === t}
                  onClick={() => setActiveType(t)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-body text-xs font-medium tracking-widest uppercase text-text-muted">
              Price Range
            </span>
            <div className="flex flex-wrap gap-2">
              {priceFilters.map((p) => (
                <FilterPill
                  key={p}
                  label={p}
                  active={activePrice === p}
                  onClick={() => setActivePrice(p)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-body text-xs font-medium tracking-widest uppercase text-text-muted">
              Bedrooms
            </span>
            <div className="flex flex-wrap gap-2">
              {bedFilters.map((b) => (
                <FilterPill
                  key={b}
                  label={b}
                  active={activeBeds === b}
                  onClick={() => setActiveBeds(b)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Result count */}
        <p className="font-body text-sm text-text-secondary mb-8">
          Showing <span className="font-medium text-text-primary">{filtered.length}</span> of{' '}
          {properties.length} properties
        </p>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 text-text-muted font-body"
            >
              No properties match your filters. Try adjusting your criteria.
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page and test**

Update `app/page.tsx`:

```typescript
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import SearchFilter from '@/components/sections/SearchFilter'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <SearchFilter />
    </main>
  )
}
```

- [ ] **Step 3: Test visually**

```bash
npm run dev
```

Verify:
- Clicking "House" filter: apartment and villa cards exit, house cards remain (AnimatePresence)
- Active filter pill turns gold
- "Showing X of 6" updates correctly
- Combining type + price + beds filters works; empty state shown when 0 results

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/SearchFilter.tsx app/page.tsx
git commit -m "feat: add SearchFilter section with animated filter pills and AnimatePresence results"
```

---

## Task 11: About Agency Section

**Files:**
- Create: `components/ui/TeamCard.tsx`
- Create: `components/sections/AboutAgency.tsx`

**Interfaces:**
- Consumes: `team`, `stats`, `TeamMember`, `AgencyStat` from `lib/data.ts`
- Produces: `TeamCard` component, `AboutAgency` section — no props

- [ ] **Step 1: Write TeamCard**

Create `components/ui/TeamCard.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import type { TeamMember } from '@/lib/data'

export default function TeamCard({ member }: { member: TeamMember }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="relative h-96 cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      tabIndex={0}
      role="button"
      aria-label={`${member.name} — hover to see contact details`}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-surface border border-border p-6 flex flex-col items-center text-center gap-4"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-border">
            <Image
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-text-primary">
              {member.name}
            </h3>
            <p className="font-body text-sm text-primary tracking-wide mt-1">
              {member.title}
            </p>
          </div>
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            {member.bio}
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-dark-bg p-8 flex flex-col items-center justify-center gap-5"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-display text-xl font-semibold text-white">
            {member.name}
          </h3>
          <p className="font-body text-sm text-primary tracking-wide">
            {member.title}
          </p>
          <div className="flex flex-col gap-3 w-full">
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors text-sm font-body"
            >
              <Mail size={16} />
              {member.email}
            </a>
            <a
              href={`tel:${member.phone}`}
              className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors text-sm font-body"
            >
              <Phone size={16} />
              {member.phone}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 2: Write AboutAgency section**

Create `components/sections/AboutAgency.tsx`:

```typescript
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
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative aspect-[4/5] rounded-sm overflow-hidden"
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
              <p className="font-body text-xs tracking-widest uppercase mt-1">
                Years of Excellence
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
              Founded in 2014 by Alexandra Voss, Meridian Estates was built on a single
              conviction: that luxury homebuyers deserve more than a transaction. They deserve
              a trusted advisor who understands both the art of fine living and the complexity
              of high-value real estate.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-body text-base text-text-secondary leading-relaxed mb-8"
            >
              Over twelve years, we have closed more than 350 transactions totaling $2.4B in
              volume. Our clientele includes executives, entertainers, and international
              investors who return to us because we deliver what others simply cannot.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="w-16 h-px bg-primary"
            />
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
          viewport={{ once: true, amount: 0.1 }}
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
```

- [ ] **Step 3: Add to page and test**

Update `app/page.tsx`:

```typescript
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import SearchFilter from '@/components/sections/SearchFilter'
import AboutAgency from '@/components/sections/AboutAgency'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <SearchFilter />
      <AboutAgency />
    </main>
  )
}
```

- [ ] **Step 4: Test visually**

```bash
npm run dev
```

Verify:
- Stats row appears on scroll, values animate in
- TeamCard: hover flips to reveal email/phone on dark background
- TeamCard: Tab key focus also triggers flip (keyboard accessibility)

- [ ] **Step 5: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add components/ui/TeamCard.tsx components/sections/AboutAgency.tsx app/page.tsx
git commit -m "feat: add AboutAgency section with flip TeamCards and stats row"
```

---

## Task 12: Testimonials Section

**Files:**
- Create: `components/ui/TestimonialCard.tsx`
- Create: `components/sections/Testimonials.tsx`

**Interfaces:**
- Consumes: `testimonials`, `Testimonial` from `lib/data.ts`
- Produces: `TestimonialCard`, `Testimonials` section — no props

- [ ] **Step 1: Write TestimonialCard**

Create `components/ui/TestimonialCard.tsx`:

```typescript
import { Star } from 'lucide-react'
import type { Testimonial } from '@/lib/data'

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-6">
      {/* Quote mark */}
      <span className="font-display text-8xl text-primary leading-none mb-4" aria-hidden="true">
        &ldquo;
      </span>

      {/* Stars */}
      <div className="flex gap-1 mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-primary text-primary" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-display text-xl md:text-2xl font-light text-white leading-relaxed mb-8">
        {testimonial.quote}
      </blockquote>

      {/* Attribution */}
      <div>
        <p className="font-body font-medium text-white">{testimonial.clientName}</p>
        <p className="font-body text-sm text-white/60 mt-1">{testimonial.propertySold}</p>
        <p className="font-body text-xs text-white/40 mt-1">{testimonial.date}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write Testimonials section**

Create `components/sections/Testimonials.tsx`:

```typescript
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
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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

        {/* Carousel */}
        <div className="relative overflow-hidden min-h-[340px] flex items-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={shouldReduce ? {} : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full"
              aria-live="polite"
              aria-atomic="true"
            >
              <TestimonialCard testimonial={testimonials[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-1.5 bg-primary'
                    : 'w-1.5 h-1.5 rounded-full bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page and test**

Update `app/page.tsx`:

```typescript
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import SearchFilter from '@/components/sections/SearchFilter'
import AboutAgency from '@/components/sections/AboutAgency'
import Testimonials from '@/components/sections/Testimonials'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <SearchFilter />
      <AboutAgency />
      <Testimonials />
    </main>
  )
}
```

- [ ] **Step 4: Test visually and for keyboard accessibility**

```bash
npm run dev
```

Verify:
- Carousel auto-advances every 5 seconds
- Hover pauses autoplay; leaving resumes it
- Prev/Next arrows and dot indicators work
- **Keyboard test:** Tab to prev/next buttons, press Enter — must navigate. All 6 dot buttons Tab-accessible.
- Slide transition: current slides out, next slides in (opposite direction for prev)

- [ ] **Step 5: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add components/ui/TestimonialCard.tsx components/sections/Testimonials.tsx app/page.tsx
git commit -m "feat: add Testimonials carousel with AnimatePresence slide transitions"
```

---

## Task 13: Contact Form Section

**Files:**
- Create: `components/sections/ContactForm.tsx`

**Interfaces:**
- Consumes: `Button` from `components/ui/Button.tsx`; `useFadeUpVariants`, `useStaggerContainerVariants`
- Produces: `ContactForm` section — no props; manages form state internally

- [ ] **Step 1: Write ContactForm section**

Create `components/sections/ContactForm.tsx`:

```typescript
'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, MapPin, Phone, Mail } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useFadeUpVariants, useStaggerContainerVariants } from '@/hooks/useScrollAnimation'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  phone: string
  intent: string
  budget: string
  message: string
}

interface FieldProps {
  label: string
  id: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

function FormField({ label, id, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-body text-xs font-medium tracking-widest uppercase text-text-secondary">
        {label}
        {required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs font-body mt-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClasses =
  'w-full bg-bg border border-border px-4 py-3 font-body text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200'

export default function ContactForm() {
  const uid = useId()
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    intent: '',
    budget: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const fadeUp = useFadeUpVariants()
  const stagger = useStaggerContainerVariants()

  function validate(): boolean {
    const next: Partial<FormData> = {}
    if (!form.name.trim()) next.name = 'Full name is required'
    if (!form.email.trim()) next.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Please enter a valid email'
    if (!form.intent) next.intent = 'Please select an option'
    if (!form.budget) next.budget = 'Please select a budget range'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    // Simulate async submission — replace with real API call (Resend/Formspree)
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
  }

  return (
    <section id="contact" className="py-24 bg-surface" aria-label="Contact Meridian Estates">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-3"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-semibold text-text-primary"
          >
            Start Your Journey
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-base text-text-secondary mt-4 max-w-xl mx-auto"
          >
            Whether you're buying, selling, or simply exploring — our team responds within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="relative min-h-[500px]">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-bg p-12 text-center"
                  >
                    <CheckCircle size={56} className="text-primary" />
                    <h3 className="font-display text-3xl font-semibold text-text-primary">
                      Thank You
                    </h3>
                    <p className="font-body text-base text-text-secondary">
                      We&apos;ve received your message. A member of the Meridian team will
                      be in touch within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        label="Full Name"
                        id={`${uid}-name`}
                        required
                        error={errors.name}
                      >
                        <input
                          id={`${uid}-name`}
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Alexandra Voss"
                          className={inputClasses}
                          aria-required="true"
                          aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                        />
                      </FormField>

                      <FormField
                        label="Email Address"
                        id={`${uid}-email`}
                        required
                        error={errors.email}
                      >
                        <input
                          id={`${uid}-email`}
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={inputClasses}
                          aria-required="true"
                          aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                        />
                      </FormField>
                    </div>

                    <FormField label="Phone (Optional)" id={`${uid}-phone`}>
                      <input
                        id={`${uid}-phone`}
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (310) 555-0100"
                        className={inputClasses}
                      />
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        label="I'm Looking To"
                        id={`${uid}-intent`}
                        required
                        error={errors.intent}
                      >
                        <select
                          id={`${uid}-intent`}
                          name="intent"
                          value={form.intent}
                          onChange={handleChange}
                          className={`${inputClasses} cursor-pointer`}
                          aria-required="true"
                          aria-describedby={errors.intent ? `${uid}-intent-error` : undefined}
                        >
                          <option value="">Select...</option>
                          <option value="buy">Buy</option>
                          <option value="sell">Sell</option>
                          <option value="both">Buy & Sell</option>
                          <option value="browse">Just Browsing</option>
                        </select>
                      </FormField>

                      <FormField
                        label="Budget Range"
                        id={`${uid}-budget`}
                        required
                        error={errors.budget}
                      >
                        <select
                          id={`${uid}-budget`}
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className={`${inputClasses} cursor-pointer`}
                          aria-required="true"
                          aria-describedby={errors.budget ? `${uid}-budget-error` : undefined}
                        >
                          <option value="">Select...</option>
                          <option value="500k-1m">$500k – $1M</option>
                          <option value="1m-2m">$1M – $2M</option>
                          <option value="2m-5m">$2M – $5M</option>
                          <option value="5m-plus">$5M+</option>
                        </select>
                      </FormField>
                    </div>

                    <FormField label="Message" id={`${uid}-message`}>
                      <textarea
                        id={`${uid}-message`}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about the property you're looking for, or what you'd like to discuss..."
                        className={`${inputClasses} resize-none`}
                      />
                    </FormField>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === 'loading'}
                      className="self-start"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Agency info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-6">
                Meridian Estates
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sm font-medium text-text-primary">Office</p>
                    <p className="font-body text-sm text-text-secondary">
                      9200 Sunset Boulevard, Suite 800
                      <br />
                      Los Angeles, CA 90069
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sm font-medium text-text-primary">Phone</p>
                    <a
                      href="tel:+13105550190"
                      className="font-body text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      +1 (310) 555-0190
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sm font-medium text-text-primary">Email</p>
                    <a
                      href="mailto:hello@meridianestates.com"
                      className="font-body text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      hello@meridianestates.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="border-t border-border pt-8">
              <p className="font-body text-xs font-medium tracking-widest uppercase text-text-muted mb-4">
                Office Hours
              </p>
              <div className="flex flex-col gap-2 font-body text-sm text-text-secondary">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span>9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>By appointment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page and test**

Update `app/page.tsx`:

```typescript
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import SearchFilter from '@/components/sections/SearchFilter'
import AboutAgency from '@/components/sections/AboutAgency'
import Testimonials from '@/components/sections/Testimonials'
import ContactForm from '@/components/sections/ContactForm'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <SearchFilter />
      <AboutAgency />
      <Testimonials />
      <ContactForm />
    </main>
  )
}
```

- [ ] **Step 3: Test visually**

```bash
npm run dev
```

Verify:
- Submit with empty required fields → validation errors appear under each field
- Phone empty + all other fields filled → no phone error, form submits
- Loading state: button shows spinner, is disabled
- Success state: form fades out, success card fades in with checkmark

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/ContactForm.tsx app/page.tsx
git commit -m "feat: add ContactForm with validation, loading state, and success animation"
```

---

## Task 14: Footer + Final Page Assembly

**Files:**
- Create: `components/layout/Footer.tsx`
- Modify: `app/page.tsx` (final version)

**Interfaces:**
- Produces: complete assembled page with all sections and footer

- [ ] **Step 1: Write Footer**

Create `components/layout/Footer.tsx`:

```typescript
import { Instagram, Linkedin, Facebook } from 'lucide-react'

const footerLinks = {
  Properties: ['Featured Listings', 'New Arrivals', 'Sold Properties', 'Luxury Rentals'],
  Company: ['About Us', 'Our Team', 'Testimonials', 'Careers'],
  Services: ['Buyer Representation', 'Seller Services', 'Investment Properties', 'Relocation'],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-bg text-white pt-20 pb-10" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-semibold tracking-wider mb-4">
              MERIDIAN ESTATES
            </p>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
              Los Angeles&apos;s premier luxury real estate agency. Exceptional properties
              for discerning buyers since 2014.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors"
                  aria-label={['Instagram', 'LinkedIn', 'Facebook'][i]}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="font-body text-xs font-medium tracking-[0.25em] uppercase text-white/40 mb-5">
                {title}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-white/60 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs font-body">
          <p>© {year} Meridian Estates. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">DRE #01234567</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Final page assembly**

Replace `app/page.tsx` with the final version:

```typescript
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import SearchFilter from '@/components/sections/SearchFilter'
import AboutAgency from '@/components/sections/AboutAgency'
import Testimonials from '@/components/sections/Testimonials'
import ContactForm from '@/components/sections/ContactForm'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <SearchFilter />
      <AboutAgency />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Full visual walkthrough**

```bash
npm run dev
```

Walk through the entire page end-to-end:
- Load: hero stagger plays
- Scroll through each section: animations trigger once per section
- Navbar: transparent → solid on scroll
- Mobile (DevTools 375px): all sections readable, grid collapses correctly
- Tablet (768px): 2-column grids present

- [ ] **Step 4: Production build check**

```bash
npm run build
```

Expected: build completes with no errors. Any TypeScript or import errors must be fixed before committing.

- [ ] **Step 5: Verify Lighthouse (optional but recommended)**

```bash
npm run build && npm run start
```

Open http://localhost:3000 in Chrome. DevTools → Lighthouse → run for Desktop. Target: Performance 90+, Accessibility 90+, Best Practices 90+, SEO 90+.

- [ ] **Step 6: Commit**

```bash
git add components/layout/Footer.tsx app/page.tsx
git commit -m "feat: add Footer and complete page assembly — all sections wired"
```

---

## Task 15: Accessibility + SEO Polish

**Files:**
- Modify: `app/layout.tsx` (verify JSON-LD)
- Modify: any component where focus/aria gaps are found

**Interfaces:**
- Consumes: completed components from Tasks 1–14

- [ ] **Step 1: Keyboard navigation audit**

```bash
npm run dev
```

Tab through the entire page. Verify:
- Every interactive element (nav links, buttons, cards, carousel arrows, dots, form fields) receives a visible gold focus ring
- Carousel prev/next buttons: Tab → Enter navigates testimonials
- TeamCard: Tab focuses card, Enter/Space flips to contact details
- Form: Tab order is Name → Email → Phone → Intent → Budget → Message → Submit

- [ ] **Step 2: Screen reader spot check**

In Chrome DevTools → Accessibility tree, verify:
- `<h1>` exists once (hero headline)
- Each `<section>` has `aria-label`
- Images have descriptive `alt` or `alt=""` for decorative ones
- Form inputs have associated `<label>` via `htmlFor`

- [ ] **Step 3: Fix any issues found**

Apply fixes inline to the relevant component files.

- [ ] **Step 4: Verify meta tags**

```bash
npm run build && npm run start
```

View source of http://localhost:3000. Verify:
- `<title>Meridian Estates | Luxury Real Estate</title>` present
- `<meta name="description"` present
- `<meta property="og:title"` present
- JSON-LD script block with `RealEstateAgent` schema present

- [ ] **Step 5: Final TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors, 0 warnings.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "polish: accessibility audit, aria labels, keyboard navigation verified"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✓ Hero + parallax (Task 8)
- ✓ FeaturedProperties grid + hover animations (Task 9)
- ✓ Search/Filter with animated transitions (Task 10)
- ✓ About Agency + team flip cards + stats (Task 11)
- ✓ Testimonials carousel (Task 12)
- ✓ Contact form + states (Task 13)
- ✓ Navbar scroll-aware (Task 7)
- ✓ Footer (Task 14)
- ✓ Design tokens (Task 1)
- ✓ Animation hooks with `useReducedMotion` (Task 4)
- ✓ Static data layer with all types (Task 3)
- ✓ SEO metadata + JSON-LD (Task 2)
- ✓ WCAG 2.1 AA (Task 15)

**Review Focus addressed:**
- Carousel keyboard trap → Task 12 Step 4 explicitly tests keyboard navigation of prev/next
- Reduced-motion visibility → hooks always return `{}` (not skip render) when reduced; Task 4
- Filter key mismatch → Task 10 uses `property.id` as key (stable, unique); AnimatePresence `mode="popLayout"`
- Parallax mobile → Task 8 passes `shouldReduce ? [0,0] : [0,120]` to disable parallax under reduced motion; parallax uses `useScroll` which is passive and safe on iOS
- Optional phone field → Task 13 `validate()` has no check for `phone`; test step explicitly verifies this case
