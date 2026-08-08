import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Rooms } from "@/components/Rooms"
import { Amenities } from "@/components/Amenities"
import { Gallery } from "@/components/Gallery"
import { Testimonials } from "@/components/Testimonials"
import { BookingCta } from "@/components/BookingCta"
import { Footer } from "@/components/Footer"

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <Gallery />
      <Testimonials />
      <BookingCta />
      <Footer />
    </div>
  )
}
