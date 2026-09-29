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
