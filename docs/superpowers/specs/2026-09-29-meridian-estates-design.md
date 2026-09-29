# Meridian Estates — Design Spec
**Date:** 2026-09-29
**Status:** Approved

---

## 1. Project Overview

A luxury real estate marketing website for **Meridian Estates**, targeting the $500k+ residential property market. The site is a single-page scrolling experience composed of six sections. It is a pure marketing/portfolio site — no CMS, no authentication, no database. Static data drives all content.

**Success criteria:**
- Looks and feels like a $10,000+ bespoke agency website
- Lighthouse score 90+ across Performance, Accessibility, Best Practices, SEO
- WCAG 2.1 AA compliant
- 60fps animations on all devices
- Fully responsive, mobile-first

---

## 2. Technical Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 (App Router) | SSG, `next/image`, `next/font`, metadata API |
| Styling | Tailwind CSS v3 | Utility-first, design token extension |
| Animations | Framer Motion v11 | GPU-safe transforms, scroll triggers, AnimatePresence |
| Icons | lucide-react | Lightweight, tree-shakable |
| Images | Unsplash (next/image) | No API key, blur placeholder, WebP auto |
| Fonts | Google Fonts via next/font | Zero layout shift |
| Deployment | Vercel | Zero-config Next.js |

**No other runtime dependencies.** Keeps bundle lean and Lighthouse score high.

---

## 3. Architecture

### 3.1 Folder Structure

```
meridian-estates/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, JSON-LD
│   ├── page.tsx                # Composes all 6 section components
│   └── globals.css             # Tailwind directives + CSS custom properties
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky, scroll-aware transparency
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── FeaturedProperties.tsx
│       ├── SearchFilter.tsx
│       ├── AboutAgency.tsx
│       ├── Testimonials.tsx
│       └── ContactForm.tsx
├── components/ui/
│   ├── PropertyCard.tsx        # Primary reusable card
│   ├── TeamCard.tsx
│   ├── TestimonialCard.tsx
│   └── Button.tsx
├── hooks/
│   ├── useScrollAnimation.ts   # Framer scroll-triggered variants
│   └── useStaggerChildren.ts   # Staggered entrance container variants
└── lib/
    ├── design-tokens.ts        # Single source of truth for all tokens
    └── data.ts                 # All static content (properties, team, etc.)
```

### 3.2 Page Composition

`app/page.tsx` imports section components in order:
1. `<Navbar />`
2. `<Hero />`
3. `<FeaturedProperties />`
4. `<SearchFilter />`
5. `<AboutAgency />`
6. `<Testimonials />`
7. `<ContactForm />`
8. `<Footer />`

Each section is self-contained: it imports its own data slice from `lib/data.ts` and its own animation hooks. Sections do not share state.

---

## 4. Design System

### 4.1 Color Tokens

Defined as CSS custom properties on `:root` in `globals.css` and mirrored in `tailwind.config.ts` for utility-class access.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#C9A96E` | Gold — CTAs, accents, active states |
| `--color-primary-dark` | `#A8814A` | Gold hover state |
| `--color-bg` | `#FAFAF8` | Off-white page background |
| `--color-surface` | `#FFFFFF` | Cards, form fields |
| `--color-text-primary` | `#1A1A1A` | Headlines, body |
| `--color-text-secondary` | `#6B6B6B` | Subheadings, metadata |
| `--color-text-muted` | `#9E9E9E` | Placeholders, captions |
| `--color-border` | `#E8E3DB` | Warm-toned dividers and card borders |
| `--color-dark-bg` | `#111111` | Hero overlay, footer |

**Contrast check (WCAG 2.1 AA):**
- `#1A1A1A` on `#FAFAF8` → 17.5:1 ✓ (AAA)
- `#C9A96E` on `#111111` → 5.2:1 ✓ (AA large text)
- Gold is never used as small body text on white — only as large display text or on dark backgrounds.

### 4.2 Typography

```typescript
// app/layout.tsx
import { Cormorant_Garamond, Inter } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})
```

| Role | Font | Weight | Tailwind class |
|------|------|--------|----------------|
| Hero headline | Cormorant Garamond | 300 | `font-display text-6xl font-light` |
| Section titles | Cormorant Garamond | 600 | `font-display text-4xl font-semibold` |
| Card titles | Cormorant Garamond | 400 | `font-display text-2xl` |
| Body / UI | Inter | 400 | `font-body text-base` |
| Labels / caps | Inter | 500 | `font-body text-sm font-medium tracking-widest uppercase` |
| Price display | Cormorant Garamond | 700 | `font-display text-2xl font-bold` |

### 4.3 Spacing

- Section vertical padding: `py-24` desktop / `py-16` mobile
- Max content width: `max-w-7xl mx-auto px-6`
- Card grid gap: `gap-8` desktop / `gap-6` mobile
- Component internal padding: `p-6` cards / `p-8` forms

### 4.4 Border Radius

- Hero and full-bleed images: `rounded-none` (editorial)
- Cards: `rounded-sm` (2px — subtle, not playful)
- Buttons: `rounded-none` (sharp, authoritative)
- Form inputs: `rounded-sm`

---

## 5. Section Specifications

### 5.1 Navbar
- Fixed at top, `z-50`
- Initial state: transparent background, white logo/links
- After 80px scroll: white background, dark logo/links, subtle `shadow-sm`
- Transition driven by Framer `useScroll` + `useTransform`
- Links: Properties · About · Testimonials · Contact
- CTA button: "Schedule a Viewing" → scrolls to `#contact`
- Mobile: hamburger menu with Framer `AnimatePresence` slide-down drawer

### 5.2 Hero Section
- Full-viewport height (`h-screen`)
- Background: full-bleed property image with dark overlay (`bg-black/50`)
- Parallax: `useScroll` + `useTransform` moves background `y` from `0%` to `20%` as user scrolls
- Content centered, white text:
  - Eyebrow label: "LUXURY REAL ESTATE · MERIDIAN ESTATES"
  - H1: "Find Your Perfect Luxury Home"
  - Subheadline: "Exclusive properties in the most sought-after neighborhoods"
  - Two CTAs: Primary "Explore Properties" (gold) + Secondary "Meet Our Team" (outlined)
- Load animation: staggered entrance — label → headline → subheadline → CTAs, each `y: 30 → 0`, `opacity: 0 → 1`, 150ms stagger

### 5.3 Featured Properties Grid
- Section title + "View All Properties" link at top
- 3-column grid (desktop) / 2-column (tablet) / 1-column (mobile)
- 6 property cards
- Cards animate in with staggered `whileInView` on scroll
- **PropertyCard spec:**
  - Image: 16:10 aspect, `object-cover`, `overflow-hidden`
  - On hover: image subtle `scale(1.03)`, card `translateY(-8px)`, shadow deepens
  - Tag badge (New / Featured / Sold): absolute top-right, gold background
  - Price: Cormorant Garamond bold
  - Address + neighborhood in Inter
  - Beds / Baths / Sqft row with Lucide icons
  - "View Property →" CTA slides up from bottom on hover via `clipPath` clip

### 5.4 Search & Filter Section
- Full-width section with warm surface background
- Filter row: Property Type (All / House / Apartment / Villa) + Price Range + Bedrooms
- Filters implemented as pill-style toggle buttons
- On filter change: results re-render with Framer `AnimatePresence` (exit old cards, enter new)
- Layout shift prevented: grid maintains fixed height during transitions
- Shows filtered count: "Showing 4 of 6 properties"

### 5.5 About Agency Section
- Two-column layout (desktop): large image left, text right
- Stats row: 4 agency stats (`350+ Properties Sold`, `$2.4B Total Volume`, `12 Years Experience`, `4.9★ Average Rating`)
- Stats animate via `useInView` counter animation (numbers count up when section enters viewport)
- Team grid: 3 cards below
- **TeamCard spec:**
  - Square image with circular mask
  - Name + title
  - On hover: card flips (CSS 3D transform) revealing email + phone + LinkedIn link
  - Scroll-triggered `opacity: 0 → 1` + `y: 20 → 0` entrance

### 5.6 Testimonials Section
- Dark background (`#111111`) for visual contrast
- Automated carousel: advances every 5 seconds, pauses on hover/focus
- Manual navigation: prev/next arrows + dot indicators
- Transitions: `AnimatePresence` with `initial={{ opacity: 0, x: 40 }}` → `animate={{ opacity: 1, x: 0 }}` → `exit={{ opacity: 0, x: -40 }}`
- Each testimonial: large quote mark (gold), quote text, client name, property address, star rating

### 5.7 Contact Form Section
- Two-column (desktop): form left, agency info right (address, phone, email, map placeholder)
- Fields: Full Name · Email · Phone (optional) · "I'm looking to" dropdown · Budget Range dropdown · Message
- Real estate dropdowns:
  - Intent: Buy / Sell / Both / Just browsing
  - Budget: $500k–$1M / $1M–$2M / $2M–$5M / $5M+
- **Input animation:** on focus, floating label moves `y: 0 → -24px`, border transitions to gold
- **Submit states:**
  1. Idle: "Send Message" button
  2. Loading: spinner replaces text, button disabled
  3. Success: Framer `AnimatePresence` swaps form for success card ("Thank you, we'll be in touch within 24 hours")
  4. Error: inline error message below field
- Form is client-side only; ready to wire to Resend/Formspree

---

## 6. Animation System

### 6.1 Four Animation Layers

| Layer | Mechanism | Properties animated |
|-------|-----------|---------------------|
| Page load | `AnimatePresence` + stagger variants | `opacity`, `y` |
| Scroll triggers | `whileInView` + `viewport: { once: true, amount: 0.2 }` | `opacity`, `y` |
| Hover micro-interactions | `whileHover` / `whileTap` | `scale`, `y`, `boxShadow` |
| Parallax | `useScroll` + `useTransform` | `y` (background only) |

### 6.2 Standard Variants

```typescript
// hooks/useScrollAnimation.ts
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
}

export const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}
```

### 6.3 Performance Rules
- **Only animate `transform` and `opacity`** — never `width`, `height`, `top`, `left`, `margin`
- This keeps all animations on the GPU compositor thread (no layout recalculation)
- `will-change: transform` applied sparingly, only on elements that animate continuously (parallax bg)
- All `whileInView` use `once: true` — no repeated re-animation on scroll back

### 6.4 Reduced Motion
```typescript
// In every animated component
const shouldReduceMotion = useReducedMotion()
const variants = shouldReduceMotion ? { hidden: {}, visible: {} } : fadeUpVariants
```

Users with `prefers-reduced-motion: reduce` see instant transitions. Content is never hidden.

---

## 7. Data Layer

### 7.1 `lib/data.ts` Types

```typescript
interface Property {
  id: string
  tag: 'New' | 'Featured' | 'Sold' | null
  price: number               // raw number, formatted on display
  address: string
  neighborhood: string
  beds: number
  baths: number
  sqft: number
  image: string               // Unsplash URL
  type: 'House' | 'Apartment' | 'Villa'
}

interface TeamMember {
  id: string
  name: string
  title: string
  yearsExperience: number
  bio: string
  email: string
  phone: string
  image: string
}

interface Testimonial {
  id: string
  clientName: string
  propertySold: string
  quote: string
  rating: number              // 1–5
  date: string
}
```

6 properties, 3 team members, 6 testimonials — all with realistic luxury content.

---

## 8. SEO & Metadata

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: { template: '%s | Meridian Estates', default: 'Meridian Estates | Luxury Real Estate' },
  description: 'Meridian Estates specializes in luxury residential properties $500k and above...',
  openGraph: { type: 'website', images: ['/og-image.jpg'] },
}
```

JSON-LD structured data (`RealEstateAgent` schema) injected in root layout for local SEO.

Semantic HTML hierarchy: one `<h1>` (hero), `<h2>` per section title, `<h3>` for card titles. All sections wrapped in `<section>` with `aria-label`.

---

## 9. Accessibility

- All interactive elements reachable via keyboard (`Tab` order logical)
- Focus ring: `outline: 2px solid var(--color-primary)` offset `2px` — visible on all backgrounds
- Carousel: `aria-live="polite"`, pause on focus, prev/next have `aria-label`
- Form inputs: `<label>` associated via `htmlFor`, error messages via `aria-describedby`
- Images: meaningful `alt` text on all property/team photos
- Decorative images: `alt=""`
- Color contrast: all text passes WCAG 2.1 AA minimum 4.5:1

---

## 10. Out of Scope

- Property detail pages (single property view)
- User authentication or saved properties
- Real MLS/property data integration
- CMS or admin panel
- Backend email sending (form is client-side only)
- Blog or news section
- Map integration (placeholder only)
