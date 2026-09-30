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
  images?: string[]
  type: 'House' | 'Apartment' | 'Villa'
  description: string
  features: string[]
  yearBuilt: number
  parking: string
  lotSize?: string
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
  countTo: number
  countDecimals?: number
  countPrefix?: string
  countSuffix?: string
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
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
    ],
    type: 'House',
    description: 'An architectural masterpiece perched in the coveted hills of Bel Air, this 7,200 sq ft estate offers sweeping canyon and city views from nearly every room. Designed by noted LA architect James Harmon, the home blends warm natural materials with contemporary lines — floor-to-ceiling Fleetwood doors, Calacatta marble throughout, and a chef\'s kitchen anchored by custom Bulthaup cabinetry. The resort-style grounds feature a zero-edge infinity pool, a detached 1-bed guest house, and mature olive trees for absolute privacy.',
    features: ['Infinity pool & spa', 'Home theatre', 'Wine cellar (1,200 bottles)', 'Smart home automation', 'Guest house', 'Chef\'s kitchen', '4-car garage', 'Canyon views'],
    yearBuilt: 2019,
    parking: '4-car garage',
    lotSize: '0.72 acres',
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
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80',
    ],
    type: 'House',
    description: 'Steps from the sand on Santa Monica\'s iconic Oceanfront Walk, this newly completed coastal contemporary offers unobstructed Pacific views from its upper-level primary suite and a rooftop terrace designed for year-round entertaining. The 3,800 sq ft interior features white oak floors, a Venetian plaster fireplace, and Thermador appliances in an open-plan kitchen that flows seamlessly to the shaded outdoor living room. Bike to Abbot Kinney or walk to the Santa Monica Pier — the California lifestyle begins at your front door.',
    features: ['Rooftop terrace', 'Ocean views', 'Outdoor kitchen', 'Thermador appliances', 'White oak floors', 'Fireplace', '2-car garage', 'Smart home'],
    yearBuilt: 2024,
    parking: '2-car garage',
    lotSize: '3,200 sq ft lot',
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
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&q=80',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80',
    ],
    type: 'Villa',
    description: 'Tucked at the end of a quiet cul-de-sac in Beverly Hills Post Office, this Mediterranean-inspired villa combines old-world elegance with thoughtfully updated interiors. The 2,900 sq ft floor plan offers three generous en-suite bedrooms, a formal living room with coffered ceilings, and a renovated kitchen with Carrara marble countertops. French doors open onto a private courtyard with a manicured garden and built-in BBQ — ideal for intimate al fresco dining. Just minutes to Rodeo Drive and Beverly Hills\' finest restaurants.',
    features: ['Private courtyard', 'Coffered ceilings', 'Carrara marble', 'Built-in BBQ', 'French doors', 'Updated kitchen', '2-car garage', 'Cul-de-sac privacy'],
    yearBuilt: 2008,
    parking: '2-car garage',
    lotSize: '0.18 acres',
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
    image: 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
    type: 'House',
    description: 'A rare beachfront compound on Malibu\'s storied "Billionaire\'s Beach," this 5,100 sq ft estate sits directly on the sand with its own private stretch of beach. Four generous bedroom suites — each with ocean views — surround a central living space defined by 20-foot ceilings, a dramatic stone fireplace, and walls of glass that dissolve the boundary between inside and out. The lower level includes a gym, a wine room, and a media lounge that opens to the beach patio. A trophy property in one of the world\'s most coveted addresses.',
    features: ['Direct beach access', '20-ft ceilings', 'Home gym', 'Wine room', 'Media lounge', 'Stone fireplace', '3-car carport', 'Ocean views'],
    yearBuilt: 2015,
    parking: '3-car carport',
    lotSize: '60 ft beach frontage',
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
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    ],
    type: 'Apartment',
    description: 'On the 32nd floor of the architecturally acclaimed Wilshire Tower, this sky-high two-bedroom residence commands 270-degree views from downtown\'s glittering skyline to the Santa Monica Mountains. The 1,850 sq ft open floor plan features polished concrete floors, floor-to-ceiling glass, and a chef\'s kitchen with Miele appliances. Residents enjoy 24-hour concierge, a rooftop pool and terrace, a state-of-the-art fitness center, and valet parking. Cultural venues, award-winning restaurants, and Grand Central Market are steps away.',
    features: ['270° city views', '32nd floor', 'Concierge 24/7', 'Rooftop pool', 'Fitness center', 'Miele appliances', 'Valet parking', 'EV charging'],
    yearBuilt: 2020,
    parking: 'Valet + 2 deeded spaces',
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
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&q=80',
    ],
    type: 'House',
    description: 'One of Brentwood\'s most significant estates — sold by Meridian Estates in 12 days at full asking price. This 9,400 sq ft compound occupies a gated, tree-lined lot and offers six bedroom suites, a grand formal living room with 14-foot ceilings, a professional chef\'s kitchen, and a dedicated screening room. The meticulously landscaped grounds include a 50-foot lap pool, a full outdoor kitchen, and a self-contained 2-bed staff or guest wing. An irreplaceable Brentwood address that sets the standard for compound living.',
    features: ['50-ft lap pool', 'Screening room', 'Outdoor kitchen', 'Staff quarters', '14-ft ceilings', 'Chef\'s kitchen', '4-car garage', 'Gated & private'],
    yearBuilt: 2012,
    parking: '4-car garage + motor court',
    lotSize: '1.1 acres',
  },
]

export const team: TeamMember[] = [
  {
    id: 'team-001',
    name: 'Alexandra Voss',
    title: 'Principal Broker & Founder',
    yearsExperience: 18,
    bio: "Alexandra founded Meridian Estates after 18 years navigating luxury residential markets. She has closed over $800M in transactions and is recognized as one of LA's top 10 luxury brokers.",
    email: 'alexandra@meridianestates.com',
    phone: '+1 (310) 555-0191',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    id: 'team-002',
    name: 'Marcus Chen',
    title: 'Senior Luxury Specialist',
    yearsExperience: 12,
    bio: 'Marcus specializes in off-market Bel Air and Beverly Hills estates. His deep network of private sellers gives Meridian clients access to properties never listed publicly.',
    email: 'marcus@meridianestates.com',
    phone: '+1 (310) 555-0192',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: 'team-003',
    name: 'Isabelle Laurent',
    title: 'Director of International Sales',
    yearsExperience: 9,
    bio: "Isabelle leads cross-border transactions for international buyers seeking Los Angeles properties. Fluent in French and Mandarin, she bridges global buyers with LA's finest estates.",
    email: 'isabelle@meridianestates.com',
    phone: '+1 (310) 555-0193',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'test-001',
    clientName: 'Jonathan & Sarah Whitmore',
    propertySold: 'Bel Air Estate — $4.2M',
    quote:
      "Meridian Estates found us our dream home in six weeks. Alexandra's knowledge of the Bel Air market is unmatched — she knew about the listing before it was public.",
    rating: 5,
    date: 'March 2026',
  },
  {
    id: 'test-002',
    clientName: 'David Nakamura',
    propertySold: 'Malibu Beach House — $3.8M',
    quote:
      "Marcus secured a private showing on a Malibu property I'd been searching for years. The entire process was seamless. Meridian operates at a level I hadn't experienced before.",
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
      "Sold our Brentwood estate in 12 days at full asking price. Meridian's marketing was exceptional — professional photography, virtual tours, and an international buyer network.",
    rating: 5,
    date: 'September 2025',
  },
  {
    id: 'test-005',
    clientName: 'Priya & Arjun Mehta',
    propertySold: 'Santa Monica Home — $2.4M',
    quote:
      "First-time luxury buyers and nervous about the process. Marcus walked us through every step and never made us feel rushed. We're in our perfect home and couldn't be happier.",
    rating: 5,
    date: 'July 2025',
  },
  {
    id: 'test-006',
    clientName: 'Elizabeth Harmon',
    propertySold: 'Downtown Penthouse — $1.2M',
    quote:
      "I've worked with five different brokerages over the years. Meridian Estates is in a different category — responsive, knowledgeable, and genuinely invested in getting the right outcome.",
    rating: 5,
    date: 'May 2025',
  },
]

export const stats: AgencyStat[] = [
  { label: 'Properties Sold', value: '350', suffix: '+', countTo: 350, countSuffix: '+' },
  { label: 'Total Transaction Volume', value: '$2.4B', countTo: 2.4, countDecimals: 1, countPrefix: '$', countSuffix: 'B' },
  { label: 'Years of Excellence', value: '12', countTo: 12 },
  { label: 'Average Client Rating', value: '4.9', suffix: '★', countTo: 4.9, countDecimals: 1, countSuffix: '★' },
]
