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
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    type: 'House',
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
  { label: 'Properties Sold', value: '350', suffix: '+' },
  { label: 'Total Transaction Volume', value: '$2.4B' },
  { label: 'Years of Excellence', value: '12' },
  { label: 'Average Client Rating', value: '4.9', suffix: '★' },
]
