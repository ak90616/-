import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent)]/40",
  {
    variants: {
      variant: {
        default: "bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--paper)]",
        outline:
          "border border-[var(--line-strong)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
        ghost: "text-[var(--fg)] hover:text-[var(--accent)]",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3",
        lg: "h-12 px-7 text-base",
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
