export type Room = {
  name: string
  size: string
  occupancy: string
  tagline: string
  features: string[]
  priceFrom: number
}

export const rooms: Room[] = [
  {
    name: "Garden Sala Room",
    size: "52 m²",
    occupancy: "2 guests",
    tagline: "A quiet start among the palms, a short walk from the sand.",
    features: ["Private rain shower", "Garden-view balcony", "Ceiling fan + AC"],
    priceFrom: 210,
  },
  {
    name: "Ocean Cliff Suite",
    size: "78 m²",
    occupancy: "2–3 guests",
    tagline: "Elevated on the headland, facing open water and the sunset line.",
    features: ["Soaking tub for two", "Wraparound terrace", "In-room espresso bar"],
    priceFrom: 385,
  },
  {
    name: "Beachfront Pool Villa",
    size: "140 m²",
    occupancy: "2–4 guests",
    tagline: "Steps from the tideline, with a plunge pool that catches the sky.",
    features: ["Private infinity plunge pool", "Outdoor rain shower", "Butler on call"],
    priceFrom: 620,
  },
]
