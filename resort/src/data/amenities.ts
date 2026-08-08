import type { LucideIcon } from "lucide-react"
import { Waves, UtensilsCrossed, Sparkles, Sailboat, Dumbbell, Wine } from "lucide-react"

export type Amenity = {
  icon: LucideIcon
  title: string
  description: string
}

export const amenities: Amenity[] = [
  {
    icon: Waves,
    title: "Two Infinity Pools",
    description: "Tiered pools step down toward the beach, lit by lantern light after dark.",
  },
  {
    icon: UtensilsCrossed,
    title: "Reef-to-Table Dining",
    description: "Daily catch from local longtail boats, served on the terrace at sunset.",
  },
  {
    icon: Sparkles,
    title: "Andaman Spa House",
    description: "Traditional Thai therapies in open-air salas set back in the palms.",
  },
  {
    icon: Sailboat,
    title: "Longtail Excursions",
    description: "Private boat trips to the outer islands, snorkeling gear included.",
  },
  {
    icon: Dumbbell,
    title: "Open-Air Wellness Deck",
    description: "Sunrise yoga and a fully equipped gym overlooking the bay.",
  },
  {
    icon: Wine,
    title: "Sunset Bar",
    description: "Barefoot cocktails on the sand as the sky turns gold.",
  },
]
