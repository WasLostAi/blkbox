"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface DataPulseProps {
  className?: string
  height?: number
  color?: "pink" | "cyan"
}

export default function DataPulse({ className, height = 2, color = "pink" }: DataPulseProps) {
  const [pulses, setPulses] = useState<{ id: number; width: number; left: number; opacity: number }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      // Add new pulse
      if (Math.random() > 0.7) {
        setPulses((prev) => [
          ...prev,
          {
            id: Date.now(),
            width: 10 + Math.random() * 30,
            left: Math.random() * 100,
            opacity: 0.5 + Math.random() * 0.5,
          },
        ])
      }

      // Remove old pulses
      setPulses((prev) => prev.filter((pulse) => pulse.id > Date.now() - 3000))
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height: `${height}px`, background: "rgba(0,0,0,0.3)" }}
    >
      {pulses.map((pulse) => (
        <div
          key={pulse.id}
          className={cn("absolute top-0 h-full", color === "pink" ? "bg-neon-pink" : "bg-neon-cyan")}
          style={{
            width: `${pulse.width}px`,
            left: `${pulse.left}%`,
            opacity: pulse.opacity,
            boxShadow: `0 0 10px ${color === "pink" ? "#ff00aa" : "#00e5ff"}`,
          }}
        />
      ))}
    </div>
  )
}
