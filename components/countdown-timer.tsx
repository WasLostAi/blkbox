"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="grid grid-cols-4 gap-4">
      <TimeUnit value={timeLeft.days} label="Days" variant="pink" />
      <TimeUnit value={timeLeft.hours} label="Hours" variant="cyan" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" variant="pink" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" variant="cyan" />
    </div>
  )
}

interface TimeUnitProps {
  value: number
  label: string
  variant?: "pink" | "cyan"
}

function TimeUnit({ value, label, variant = "pink" }: TimeUnitProps) {
  return (
    <Card
      className={cn(
        "bg-black/50 border-zinc-700 relative overflow-hidden",
        variant === "pink" ? "cyber-card" : "cyber-card-cyan",
      )}
    >
      <div className="hud-corner hud-corner-tl"></div>
      <div className="hud-corner hud-corner-tr"></div>
      <div className="hud-corner hud-corner-bl"></div>
      <div className="hud-corner hud-corner-br"></div>

      <div className="p-4 text-center">
        <div
          className={cn("text-3xl font-bold font-tech-mono", variant === "pink" ? "text-neon-pink" : "text-neon-cyan")}
        >
          {value.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-zinc-400 mt-1 font-tech-mono">{label}</div>
      </div>
    </Card>
  )
}
