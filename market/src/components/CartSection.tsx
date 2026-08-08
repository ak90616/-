import { X } from "lucide-react"
import { services, formatPrice } from "@/data/services"
import { Barcode } from "@/components/Barcode"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"

const TAX_RATE = 0.08
const ORDER_ID = "SM-000482-9"

export function CartSection({
  cart,
  onToggle,
}: {
  cart: Set<string>
  onToggle: (sku: string) => void
}) {
  const items = services.filter((s) => cart.has(s.sku))
  const subtotal = items.reduce((sum, s) => sum + s.price, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax
  const hasRecurring = items.some((s) => s.unit === "/mo")

  const mailBody = items
    .map((s) => `${s.name} — ${formatPrice(s.price)}${s.unit === "/mo" ? "/mo" : ""}`)
    .join("%0D%0A")
  const mailHref = `mailto:hello@studiomarket.example?subject=${encodeURIComponent(
    `Order ${ORDER_ID} — Studio Market`,
  )}&body=${encodeURIComponent("Hi Studio Market, I'd like to check out with:\n\n")}${mailBody}`

  return (
    <section id="cart" className="py-24">
      <div className="mx-auto max-w-xl px-5">
        <Reveal className="mb-10 text-center">
          <div className="font-mono-tag text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Checkout
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Your Cart
          </h2>
        </Reveal>

        <Reveal
          delay={100}
          className="font-mono-tag border border-[var(--line-strong)] bg-white/40 p-6 text-sm shadow-[0_2px_0_var(--line-strong)]"
        >
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-[var(--ink-muted)]">
            <span>Order {ORDER_ID}</span>
            <span>Agent: Claude</span>
          </div>
          <div className="tear-line mt-4" />

          {items.length === 0 ? (
            <p className="py-10 text-center text-[var(--ink-muted)]">
              Cart's empty — walk down an aisle above and add a service.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {items.map((s) => (
                <li key={s.sku} className="flex items-baseline gap-2">
                  <span className="shrink-0 font-semibold text-[var(--ink)]">
                    {s.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="min-w-6 flex-1 border-b border-dotted border-[var(--line-strong)] translate-y-[-3px]"
                  />
                  <span className="shrink-0 tabular-nums">
                    {formatPrice(s.price)}
                    {s.unit === "/mo" && "/mo"}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggle(s.sku)}
                    aria-label={`Remove ${s.name}`}
                    className="shrink-0 text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    <X className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="tear-line mt-6" />

          <div className="mt-4 space-y-1.5">
            <div className="flex items-baseline gap-2">
              <span className="text-[var(--ink-muted)]">Subtotal</span>
              <span
                aria-hidden="true"
                className="min-w-6 flex-1 border-b border-dotted border-[var(--line-strong)] translate-y-[-3px]"
              />
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[var(--ink-muted)]">Creative Tax (8%)</span>
              <span
                aria-hidden="true"
                className="min-w-6 flex-1 border-b border-dotted border-[var(--line-strong)] translate-y-[-3px]"
              />
              <span className="tabular-nums">{formatPrice(tax)}</span>
            </div>
            <div className="flex items-baseline gap-2 pt-2 text-base font-bold">
              <span>Total</span>
              <span
                aria-hidden="true"
                className="min-w-6 flex-1 border-b border-dotted border-[var(--line-strong)] translate-y-[-3px]"
              />
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
          </div>

          {hasRecurring && (
            <p className="mt-3 text-[10px] uppercase tracking-[0.1em] text-[var(--ink-muted)]">
              * Total mixes one-time and monthly items — billed accordingly.
            </p>
          )}

          <Button
            className="mt-6 w-full"
            disabled={items.length === 0}
            onClick={() => {
              if (items.length > 0) window.location.href = mailHref
            }}
          >
            Proceed to Checkout
          </Button>

          <div className="mt-6 flex flex-col items-center gap-1">
            <Barcode value={ORDER_ID} showDigits={false} className="w-32 text-[var(--ink)]" />
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--ink-muted)]">
              Thank you for shopping with us
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
