import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-primary-button-color text-action-text-color border-r-2 border-b-2 border-primary-button-border-color hover:border-card-bg',
        ghost:
          "bg-secondary-button-color text-action-text-color",
        outline:
          "bg-card-bg text-action-text-color border border-2 border-tag-stroke-color hover:bg-secondary-button-color rounded-md",
        modal:
          "text-action-text-color",
        tag:
          "border-2 border-tag-stroke-color text-tag-text-color text-sm px-3 py-2 rounded-md",
        // link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-3 text-base",
        xs: "px-[12px] py-2 text-xs",
        sm: "px-[10px] py-2",
        md: 'px-4 py-[10px]',
        lg: "px-6 py-3",
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
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
