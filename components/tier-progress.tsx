"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import CyberCard from "./cyber-card"

interface TierProgressProps {
  currentBalance: number
  className?: string
}

export default function TierProgress({ currentBalance, className }: TierProgressProps) {
  const [animatedBalance, setAnimatedBalance] = useState(0)

  // Tier thresholds
  const tiers = [
    { name: "ENTRY LEVEL", threshold: 10000, color: "from-zinc-500 to-neon-pink/30" },
    { name: "OPERATOR", threshold: 50000, color: "from-neon-pink/30 to-neon-pink/50" },
    { name: "SHADOW ELITE", threshold: 250000, color: "from-neon-pink/50 to-neon-cyan/50" },
    { name: "PHANTOM COUNCIL", threshold: 1000000, color: "from-neon-cyan/50 to-neon-cyan" },
  ]

  // Determine current tier
  const getCurrentTier = (balance: number) => {
    if (balance >= 1000000) return "PHANTOM COUNCIL"
    if (balance >= 250000) return "SHADOW ELITE"
    if (balance >= 50000) return "OPERATOR"
    if (balance >= 10000) return "ENTRY LEVEL"
    return "UNAUTHORIZED"
  }

  // Determine next tier
  const getNextTier = (balance: number) => {
    if (balance >= 1000000) return null
    if (balance >= 250000) return { name: "PHANTOM COUNCIL", remaining: 1000000 - balance }
    if (balance >= 50000) return { name: "SHADOW ELITE", remaining: 250000 - balance }
    if (balance >= 10000) return { name: "OPERATOR", remaining: 50000 - balance }
    return { name: "ENTRY LEVEL", remaining: 10000 - balance }
  }

  // Calculate progress percentage for the progress bar
  const calculateProgress = (balance: number) => {
    const currentTier = getCurrentTier(balance)
    const nextTier = getNextTier(balance)

    if (currentTier === "PHANTOM COUNCIL") return 100

    if (currentTier === "UNAUTHORIZED") {
      return (balance / 10000) * 100
    }

    const tierIndex = tiers.findIndex((tier) => tier.name === currentTier)
    const currentThreshold = tiers[tierIndex].threshold
    const nextThreshold = tiers[tierIndex + 1].threshold

    return ((balance - currentThreshold) / (nextThreshold - currentThreshold)) * 100
  }

  useEffect(() => {
    // Animate the balance counter
    const duration = 1000 // ms
    const start = animatedBalance
    const end = currentBalance
    const change = end - start
    const startTime = performance.now()

    const animateBalance = (currentTime: number) => {
      const elapsedTime = currentTime - startTime

      if (elapsedTime < duration) {
        const progress = elapsedTime / duration
        const currentValue = start + change * progress
        setAnimatedBalance(Math.round(currentValue))
        requestAnimationFrame(animateBalance)
      } else {
        setAnimatedBalance(end)
      }
    }

    requestAnimationFrame(animateBalance)
  }, [currentBalance])

  const currentTier = getCurrentTier(currentBalance)
  const nextTier = getNextTier(currentBalance)
  const progressPercentage = calculateProgress(currentBalance)

  return (
    <CyberCard className={cn("bg-black/60", className)}>
      <h3 className="text-xl font-bold text-neon-cyan mb-4">Tier Progress</h3>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-tech-mono text-zinc-400">Current Tier</span>
          <span className="text-sm font-tech-mono text-neon-pink">{currentTier}</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-tech-mono text-zinc-400">Balance</span>
          <span className="text-sm font-tech-mono text-white">{animatedBalance.toLocaleString()} $BLKBOX</span>
        </div>

        {nextTier && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-tech-mono text-zinc-400">Next Tier</span>
            <span className="text-sm font-tech-mono text-neon-cyan">{nextTier.name}</span>
          </div>
        )}
      </div>

      <div className="relative h-4 bg-zinc-900 rounded-full overflow-hidden mb-2">
        <div
          className={cn(
            "absolute top-0 left-0 h-full bg-gradient-to-r transition-all duration-500",
            currentTier === "UNAUTHORIZED"
              ? "from-zinc-700 to-zinc-500"
              : currentTier === "ENTRY LEVEL"
                ? "from-zinc-500 to-neon-pink/30"
                : currentTier === "OPERATOR"
                  ? "from-neon-pink/30 to-neon-pink/50"
                  : currentTier === "SHADOW ELITE"
                    ? "from-neon-pink/50 to-neon-cyan/50"
                    : "from-neon-cyan/50 to-neon-cyan",
          )}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex justify-between text-xs font-tech-mono text-zinc-500">
        {tiers.map((tier, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={cn("w-1 h-2 mb-1", currentBalance >= tier.threshold ? "bg-neon-cyan" : "bg-zinc-700")} />
            <span className={cn("text-[8px]", currentBalance >= tier.threshold ? "text-neon-cyan" : "text-zinc-600")}>
              {tier.threshold.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {nextTier && (
        <div className="mt-4 text-center">
          <p className="text-xs font-tech-mono text-zinc-400">
            <span className="text-neon-cyan">{nextTier.remaining.toLocaleString()}</span> more $BLKBOX needed for next
            tier
          </p>
        </div>
      )}
    </CyberCard>
  )
}
