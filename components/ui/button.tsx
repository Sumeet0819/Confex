import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base: sharper radius, flex, transitions, focus ring
  "inline-flex shrink-0 items-center justify-center rounded-md border font-medium whitespace-nowrap transition-all duration-200 outline-none select-none cursor-pointer " +
  "focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-1 focus-visible:ring-offset-black " +
  "active:scale-95 disabled:pointer-events-none disabled:opacity-40 " +
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Filled white — kit's "selected" state
        default:
          "bg-white text-black border-transparent hover:bg-white/88",
        // White primary CTA (matches kit selected state)
        primary:
          "bg-white text-black border-transparent hover:bg-white/90 shadow-lg shadow-white/5",
        // Outline — kit's default unselected button
        outline:
          "bg-transparent text-white/85 border-white/18 hover:bg-white/6 hover:border-white/28",
        // Ghost / secondary — subtle dark fill
        secondary:
          "bg-white/5 text-white/70 border-white/6 hover:bg-white/9 hover:text-white/90",
        // Ghost — no background
        ghost:
          "bg-transparent text-white/50 border-transparent hover:bg-white/6 hover:text-white/80",
        // Danger
        destructive:
          "bg-red-500/12 text-red-400 border-red-500/20 hover:bg-red-500/20",
        // Text link
        link: "text-white underline-offset-4 hover:underline border-transparent bg-transparent",
      },
      size: {
        default: "h-9 gap-2 px-5 text-sm",
        xs: "h-7 gap-1.5 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-4 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-7 text-base",
        xl: "h-13 gap-2 px-9 text-base font-semibold",
        icon: "size-9 p-0",
        "icon-xs": "size-7 p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 p-0 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-11 p-0",
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
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
