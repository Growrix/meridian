import { Star } from 'lucide-react'
import type { Testimonial } from '@/lib/data'

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-6">
      <span className="font-display text-8xl text-primary leading-none mb-4" aria-hidden="true">
        &ldquo;
      </span>
      <div className="flex gap-1 mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-primary text-primary" />
        ))}
      </div>
      <blockquote className="font-display text-xl md:text-2xl font-light text-white leading-relaxed mb-8">
        {testimonial.quote}
      </blockquote>
      <div>
        <p className="font-body font-medium text-white">{testimonial.clientName}</p>
        <p className="font-body text-sm text-white/60 mt-1">{testimonial.propertySold}</p>
        <p className="font-body text-xs text-white/40 mt-1">{testimonial.date}</p>
      </div>
    </div>
  )
}
