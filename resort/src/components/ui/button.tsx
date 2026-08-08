import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs uppercase tracking-[0.16em] font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gold)]/40",
  {
    variants: {
      variant: {
        default: "bg-[var(--sunset)] text-[var(--sand)] hover:bg-[var(--ocean)]",
        outline:
          "border border-[var(--sand)]/70 text-[var(--sand)] bg-transparent hover:bg-[var(--sand)]/10",
        dark: "border border-[var(--line-strong)] text-[var(--ink)] bg-transparent hover:border-[var(--ink)]",
        ghost: "text-[var(--ink)] hover:text-[var(--sunset)]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4",
        lg: "h-13 px-8 text-[13px]",
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
