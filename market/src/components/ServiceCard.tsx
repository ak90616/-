import { Check, Plus } from "lucide-react"
import type { Service } from "@/data/services"
import { formatPrice } from "@/data/services"
import { ProductBox } from "@/components/ProductBox"
import { ServiceFacts } from "@/components/ServiceFacts"
import { Barcode } from "@/components/Barcode"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"

export function ServiceCard({
  service,
  inCart,
  onAdd,
}: {
  service: Service
  inCart: boolean
  onAdd: () => void
}) {
  return (
    <Reveal className="flex flex-col border border-[var(--line-strong)] bg-[var(--paper-2)]/60 p-5">
      <div className="flex items-start justify-between">
        <span className="font-mono-tag rounded-sm bg-[var(--ink)] px-2 py-1 text-[10px] tracking-[0.12em] text-[var(--paper)]">
          #{String(service.aisle).padStart(2, "0")}
        </span>
        <span className="font-mono-tag text-[10px] tracking-[0.1em] text-[var(--ink-muted)]">
          {service.sku}
        </span>
      </div>

      <div className="my-6 flex justify-center">
        <ProductBox service={service} />
      </div>

      <h3 className="text-xl font-semibold">{service.name}</h3>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">{service.tagline}</p>

      <div className="mt-4">
        <ServiceFacts service={service} />
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <Barcode value={service.sku} className="max-w-[120px] text-[var(--ink)]" />
        <div className="text-right">
          <div className="text-2xl font-bold tabular-nums">
            {formatPrice(service.price)}
          </div>
          <div className="font-mono-tag text-[10px] tracking-[0.1em] text-[var(--ink-muted)]">
            {service.unit === "/mo" ? "PER MONTH" : "ONE-TIME"}
          </div>
        </div>
      </div>

      <Button
        variant={inCart ? "outline" : "default"}
        className="mt-4 w-full"
        onClick={onAdd}
      >
        {inCart ? (
          <>
            <Check className="size-3.5" /> In Cart
          </>
        ) : (
          <>
            <Plus className="size-3.5" /> Add to Cart
          </>
        )}
      </Button>
    </Reveal>
  )
}
