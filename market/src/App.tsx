import { useState } from "react"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Marquee } from "@/components/Marquee"
import { ServicesSection } from "@/components/ServicesSection"
import { WorkSection } from "@/components/WorkSection"
import { CartSection } from "@/components/CartSection"
import { Footer } from "@/components/Footer"

export default function App() {
  const [cart, setCart] = useState<Set<string>>(new Set())

  function toggle(sku: string) {
    setCart((prev) => {
      const next = new Set(prev)
      if (next.has(sku)) {
        next.delete(sku)
      } else {
        next.add(sku)
      }
      return next
    })
  }

  return (
    <div className="min-h-screen">
      <Nav cartCount={cart.size} />
      <Hero />
      <Marquee />
      <ServicesSection cart={cart} onToggle={toggle} />
      <WorkSection />
      <CartSection cart={cart} onToggle={toggle} />
      <Footer />
    </div>
  )
}
