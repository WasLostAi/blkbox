"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CyberButtonProps extends React.ComponentProps<typeof Button> {
  glowColor?: "pink" | "cyan"
}

export default function CyberButton({ children, className, glowColor = "pink", ...props }: CyberButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group">
      <div
        className={cn(
          "absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition duration-300 blur-sm rounded-sm",
          glowColor === "pink" ? "bg-neon-pink" : "bg-neon-cyan",
        )}
      ></div>
      <Button
        className={cn(
          "relative bg-black border",
          glowColor === "pink"
            ? "border-neon-pink text-neon-pink hover:bg-neon-pink/10"
            : "border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10",
          "font-tech-mono transition-all duration-300",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </Button>
    </div>
  )
}
