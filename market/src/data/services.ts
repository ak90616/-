export type Service = {
  sku: string
  aisle: number
  name: string
  tagline: string
  price: number
  unit: "one-time" | "/mo"
  color: string
  colorDark: string
  facts: { label: string; value: string }[]
  netWeight: string
}

export const services: Service[] = [
  {
    sku: "SM-1001-BR",
    aisle: 1,
    name: "Brand Identity",
    tagline: "Logo, type, color & the whole system that holds them together.",
    price: 6400,
    unit: "one-time",
    color: "#e0592c",
    colorDark: "#b8451f",
    netWeight: "1 IDENTITY SYSTEM",
    facts: [
      { label: "Serving Size", value: "1 Brand" },
      { label: "Timeline", value: "4–6 Weeks" },
      { label: "Revisions", value: "3 Rounds" },
      { label: "Deliverables", value: "Logo, Type, Color, Guide" },
      { label: "Contains", value: "0% Templates" },
    ],
  },
  {
    sku: "SM-1002-WB",
    aisle: 2,
    name: "Website Design & Build",
    tagline: "A site that actually sounds like you, shipped and fast.",
    price: 9800,
    unit: "one-time",
    color: "#7d93a8",
    colorDark: "#5c7387",
    netWeight: "1 LIVE WEBSITE",
    facts: [
      { label: "Serving Size", value: "1 Site" },
      { label: "Timeline", value: "6–8 Weeks" },
      { label: "Revisions", value: "3 Rounds" },
      { label: "Deliverables", value: "Design, Build, QA, Launch" },
      { label: "Contains", value: "Real Performance Budget" },
    ],
  },
  {
    sku: "SM-1003-MO",
    aisle: 3,
    name: "Motion & Animation",
    tagline: "Product renders, launch films, and loops worth watching twice.",
    price: 4200,
    unit: "one-time",
    color: "#c99a3e",
    colorDark: "#a67c2c",
    netWeight: "1 REEL, 30–60S",
    facts: [
      { label: "Serving Size", value: "1 Edit" },
      { label: "Timeline", value: "2–3 Weeks" },
      { label: "Revisions", value: "2 Rounds" },
      { label: "Deliverables", value: "Storyboard, Cuts, Masters" },
      { label: "Contains", value: "Zero Stock Footage" },
    ],
  },
  {
    sku: "SM-1004-CS",
    aisle: 4,
    name: "Content Strategy",
    tagline: "The words, the calendar, and the reasons behind both.",
    price: 3600,
    unit: "/mo",
    color: "#6b7a5e",
    colorDark: "#4f5c45",
    netWeight: "1 MONTH SUPPLY",
    facts: [
      { label: "Serving Size", value: "1 Calendar" },
      { label: "Timeline", value: "Ongoing" },
      { label: "Revisions", value: "Unlimited" },
      { label: "Deliverables", value: "Plan, Copy, Reports" },
      { label: "Contains", value: "No Buzzword Filler" },
    ],
  },
  {
    sku: "SM-1005-PK",
    aisle: 5,
    name: "Packaging & Print",
    tagline: "Boxes, labels, and the unboxing people screenshot.",
    price: 5200,
    unit: "one-time",
    color: "#a85c46",
    colorDark: "#824434",
    netWeight: "1 PACKAGING SYSTEM",
    facts: [
      { label: "Serving Size", value: "1 SKU Family" },
      { label: "Timeline", value: "3–5 Weeks" },
      { label: "Revisions", value: "3 Rounds" },
      { label: "Deliverables", value: "Dielines, Art, Print Files" },
      { label: "Contains", value: "Print-Ready Everything" },
    ],
  },
  {
    sku: "SM-1006-SG",
    aisle: 6,
    name: "Social & Growth",
    tagline: "Posting that compounds instead of disappearing in a day.",
    price: 2800,
    unit: "/mo",
    color: "#8a6fa8",
    colorDark: "#6b5484",
    netWeight: "1 MONTH SUPPLY",
    facts: [
      { label: "Serving Size", value: "1 Channel" },
      { label: "Timeline", value: "Ongoing" },
      { label: "Revisions", value: "2 Rounds / mo" },
      { label: "Deliverables", value: "Posts, Captions, Reports" },
      { label: "Contains", value: "Actual Strategy" },
    ],
  },
]

export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
}
