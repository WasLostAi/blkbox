"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CyberCardProps {
  children: ReactNode
  className?: string
  variant?: "pink" | "cyan"
  interactive?: boolean
}

export default function CyberCard({ children, className, variant = "pink", interactive = true }: CyberCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "cyber-card relative rounded-sm overflow-hidden p-4 transition-all duration-300",
        variant === "cyan" && "cyber-card-cyan",
        interactive && "hover:shadow-lg",
        variant === "pink" && interactive && isHovered && "hover:shadow-neon-pink/30",
        variant === "cyan" && interactive && isHovered && "hover:shadow-neon-cyan/30",
        interactive && isHovered && "scale-[1.02]",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hud-corner hud-corner-tl">{"<"}</div>
      <div className="hud-corner hud-corner-tr">{">"}</div>
      <div className="hud-corner hud-corner-bl">{"<"}</div>
      <div className="hud-corner hud-corner-br">{">"}</div>

      {/* Animated scan line */}
      {interactive && isHovered && (
        <div
          className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-70 animate-scan"
          style={{
            backgroundColor: variant === "pink" ? "#ff00aa" : "#00e5ff",
          }}
        />
      )}

      {children}
    </div>
  )
}
