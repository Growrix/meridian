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
      aria-label={`${member.name} — hover or focus to see contact details`}
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
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-border shrink-0">
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
          <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-4">
            {member.bio}
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-dark-bg p-8 flex flex-col items-center justify-center gap-5"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-display text-xl font-semibold text-white">{member.name}</h3>
          <p className="font-body text-sm text-primary tracking-wide">{member.title}</p>
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
