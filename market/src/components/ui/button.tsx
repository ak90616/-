import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "font-mono-tag inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs uppercase tracking-[0.14em] font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent)]/40",
  {
    variants: {
      variant: {
        default: "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)]",
        outline:
          "border border-[var(--line-strong)] text-[var(--ink)] hover:border-[var(--ink)] bg-transparent",
        ghost: "text-[var(--ink)] hover:text-[var(--accent)]",
        dark: "bg-[var(--dark-fg)] text-[var(--dark)] hover:bg-[var(--accent)] hover:text-[var(--dark-fg)]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4",
        lg: "h-13 px-8 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
