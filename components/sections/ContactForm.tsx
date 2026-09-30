'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, MapPin, Phone, Mail } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useFadeUpVariants, useStaggerContainerVariants } from '@/hooks/useScrollAnimation'

type FormStatus = 'idle' | 'loading' | 'success'

interface FormData {
  name: string
  email: string
  phone: string
  intent: string
  budget: string
  message: string
}

const inputClasses =
  'w-full bg-bg border border-border px-4 py-3 font-body text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200'

function FormField({
  label,
  id,
  required,
  error,
  children,
}: {
  label: string
  id: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
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

export default function ContactForm() {
  const uid = useId()
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', intent: '', budget: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const fadeUp = useFadeUpVariants()
  const stagger = useStaggerContainerVariants()

  function validate(): boolean {
    const next: Partial<FormData> = {}
    if (!form.name.trim()) next.name = 'Full name is required'
    if (!form.email.trim()) next.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email'
    if (!form.intent) next.intent = 'Please select an option'
    if (!form.budget) next.budget = 'Please select a budget range'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
  }

  return (
    <section id="contact" className="py-24 bg-surface" aria-label="Contact Meridian Estates">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="font-body text-xs font-medium tracking-[0.3em] uppercase text-primary mb-3">
            Get In Touch
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-semibold text-text-primary">
            Start Your Journey
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-base text-text-secondary mt-4 max-w-xl mx-auto">
            Whether you&apos;re buying, selling, or simply exploring — our team responds within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
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
                    <h3 className="font-display text-3xl font-semibold text-text-primary">Thank You</h3>
                    <p className="font-body text-base text-text-secondary">
                      We&apos;ve received your message. A member of the Meridian team will be in touch within 24 hours.
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
                      <FormField label="Full Name" id={`${uid}-name`} required error={errors.name}>
                        <input id={`${uid}-name`} name="name" type="text" value={form.name} onChange={handleChange}
                          placeholder="Alexandra Voss" className={inputClasses} aria-required="true"
                          aria-describedby={errors.name ? `${uid}-name-error` : undefined} />
                      </FormField>
                      <FormField label="Email Address" id={`${uid}-email`} required error={errors.email}>
                        <input id={`${uid}-email`} name="email" type="email" value={form.email} onChange={handleChange}
                          placeholder="you@example.com" className={inputClasses} aria-required="true"
                          aria-describedby={errors.email ? `${uid}-email-error` : undefined} />
                      </FormField>
                    </div>

                    <FormField label="Phone (Optional)" id={`${uid}-phone`}>
                      <input id={`${uid}-phone`} name="phone" type="tel" value={form.phone} onChange={handleChange}
                        placeholder="+1 (310) 555-0100" className={inputClasses} />
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField label="I'm Looking To" id={`${uid}-intent`} required error={errors.intent}>
                        <select id={`${uid}-intent`} name="intent" value={form.intent} onChange={handleChange}
                          className={`${inputClasses} cursor-pointer`} aria-required="true"
                          aria-describedby={errors.intent ? `${uid}-intent-error` : undefined}>
                          <option value="">Select...</option>
                          <option value="buy">Buy</option>
                          <option value="sell">Sell</option>
                          <option value="both">Buy &amp; Sell</option>
                          <option value="browse">Just Browsing</option>
                        </select>
                      </FormField>
                      <FormField label="Budget Range" id={`${uid}-budget`} required error={errors.budget}>
                        <select id={`${uid}-budget`} name="budget" value={form.budget} onChange={handleChange}
                          className={`${inputClasses} cursor-pointer`} aria-required="true"
                          aria-describedby={errors.budget ? `${uid}-budget-error` : undefined}>
                          <option value="">Select...</option>
                          <option value="500k-1m">$500k – $1M</option>
                          <option value="1m-2m">$1M – $2M</option>
                          <option value="2m-5m">$2M – $5M</option>
                          <option value="5m-plus">$5M+</option>
                        </select>
                      </FormField>
                    </div>

                    <FormField label="Message" id={`${uid}-message`}>
                      <textarea id={`${uid}-message`} name="message" value={form.message} onChange={handleChange}
                        rows={5} placeholder="Tell us about the property you're looking for..."
                        className={`${inputClasses} resize-none`} />
                    </FormField>

                    <Button type="submit" variant="primary" size="lg" disabled={status === 'loading'} className="self-start">
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-6">Meridian Estates</h3>
              <div className="flex flex-col gap-5">
                {[
                  { Icon: MapPin, label: 'Office', content: '9200 Sunset Boulevard, Suite 800\nLos Angeles, CA 90069' },
                  { Icon: Phone, label: 'Phone', content: '+1 (310) 555-0190', href: 'tel:+13105550190' },
                  { Icon: Mail, label: 'Email', content: 'hello@meridianestates.com', href: 'mailto:hello@meridianestates.com' },
                ].map(({ Icon, label, content, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <Icon size={18} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-body text-sm font-medium text-text-primary">{label}</p>
                      {href ? (
                        <a href={href} className="font-body text-sm text-text-secondary hover:text-primary transition-colors">
                          {content}
                        </a>
                      ) : (
                        <p className="font-body text-sm text-text-secondary whitespace-pre-line">{content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-8">
              <p className="font-body text-xs font-medium tracking-widest uppercase text-text-muted mb-4">Office Hours</p>
              <div className="flex flex-col gap-2 font-body text-sm text-text-secondary">
                {[
                  ['Monday – Friday', '9:00 AM – 6:00 PM'],
                  ['Saturday', '10:00 AM – 4:00 PM'],
                  ['Sunday', 'By appointment'],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span>{day}</span><span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
