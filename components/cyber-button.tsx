import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-tech-mono relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-neon-pink text-black hover:bg-neon-pink/90",
        outline: "border border-neon-pink/50 bg-transparent hover:bg-neon-pink/10 text-neon-pink",
        secondary: "bg-neon-cyan text-black hover:bg-neon-cyan/90",
        ghost: "hover:bg-neon-pink/10 text-neon-pink hover:text-neon-pink",
        link: "text-neon-pink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      glowColor: {
        pink: "hover:shadow-glow-pink",
        cyan: "hover:shadow-glow-cyan",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glowColor: "pink",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const CyberButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glowColor, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, glowColor, className }))} ref={ref} {...props} />
  },
)
CyberButton.displayName = "CyberButton"

export default CyberButton
