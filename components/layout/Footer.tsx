import { Globe, Users, MessageCircle } from 'lucide-react'

const footerLinks = {
  Properties: ['Featured Listings', 'New Arrivals', 'Sold Properties', 'Luxury Rentals'],
  Company: ['About Us', 'Our Team', 'Testimonials', 'Careers'],
  Services: ['Buyer Representation', 'Seller Services', 'Investment Properties', 'Relocation'],
}

const socialIcons = [
  { Icon: Globe, label: 'Instagram' },
  { Icon: Users, label: 'LinkedIn' },
  { Icon: MessageCircle, label: 'Facebook' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-bg text-white pt-20 pb-10" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <p className="font-display text-xl font-semibold tracking-wider mb-4">
              MERIDIAN ESTATES
            </p>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
              Los Angeles&apos;s premier luxury real estate agency. Exceptional properties
              for discerning buyers since 2014.
            </p>
            <div className="flex gap-4">
              {socialIcons.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

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
