"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ToolCardProps {
  name: string
  description: string
  icon: LucideIcon
  href: string
  tier: string
  color: "pink" | "cyan"
  monitoringStats?: {
    statOneLabel: string
    statOneValue: string | number
    statTwoLabel: string
    statTwoValue: string | number
  }
}

export function ToolCard({ name, description, icon: Icon, href, tier, color, monitoringStats }: ToolCardProps) {
  const [isLaunched, setIsLaunched] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(Math.floor(Math.random() * 60) + 20) // Random progress between 20-80%
  const [stats, setStats] = useState(monitoringStats)
  const [isRealTimeUpdating, setIsRealTimeUpdating] = useState(false)

  // Toggle active state for demo purposes
  const toggleActive = () => {
    setIsActive(!isActive)

    // If this is the Flashloan Lab tool, simulate real-time updates
    if (name === "Flashloan Lab" && !isActive) {
      setIsRealTimeUpdating(true)
      startRealTimeUpdates()
    } else if (name === "Flashloan Lab" && isActive) {
      setIsRealTimeUpdating(false)
    }
  }

  // Simulate real-time updates for Flashloan Lab
  const startRealTimeUpdates = () => {
    const interval = setInterval(() => {
      if (name === "Flashloan Lab") {
        // Update capital deployed randomly
        const newCapital = Math.floor(Math.random() * 300000) + 900000

        // Update strategies count occasionally
        const strategiesCount = Math.floor(Math.random() * 3) + 3

        setStats((prevStats) => ({
          statOneLabel: "CAPITAL",
          statOneValue: `$${(newCapital / 1000).toFixed(1)}K`,
          statTwoLabel: "STRATEGIES",
          statTwoValue: strategiesCount.toString(),
        }))

        // Update progress
        setProgress(Math.floor(Math.random() * 30) + 60)
      }
    }, 5000)

    return () => clearInterval(interval)
  }

  // Cleanup on unmount
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRealTimeUpdating) {
      interval = setInterval(startRealTimeUpdates, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRealTimeUpdating])

  // Launch the tool
  const handleLaunch = () => {
    setIsLaunched(true)

    // If this is the Flashloan Lab, start with active state
    if (name === "Flashloan Lab") {
      setIsActive(true)
      setIsRealTimeUpdating(true)
      startRealTimeUpdates()
    }
  }

  // Return to standard view
  const handleClose = () => {
    setIsLaunched(false)
    setIsActive(false)
    setIsRealTimeUpdating(false)
  }

  // Format tier name safely
  const formatTierName = (tierName: string | undefined) => {
    if (!tierName) return "UNKNOWN"
    return tierName.replace("_", " ")
  }

  if (!isLaunched) {
    // Standard card format (pre-launch)
    return (
      <CyberCard className="bg-black/60">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-full bg-neon-${color}/10`}>
              <Icon className={`h-5 w-5 text-neon-${color}`} alt={`${name} icon`} />
            </div>
            <h3 className={`text-lg font-bold text-neon-${color}`}>{name}</h3>
          </div>
          <div className={`bg-neon-${color}/10 text-neon-${color} text-xs font-tech-mono px-2 py-1 rounded`}>
            {formatTierName(tier)}
          </div>
        </div>
        <p className="text-zinc-400 font-tech-mono text-sm mb-4 pl-1">{description}</p>
        <CyberButton size="sm" glowColor={color} onClick={handleLaunch} className="w-full">
          LAUNCH
        </CyberButton>
      </CyberCard>
    )
  }

  // Monitoring view (post-launch)
  return (
    <CyberCard className="bg-black/60">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full bg-neon-${color}/10`}>
            <Icon className={`h-5 w-5 text-neon-${color}`} alt={`${name} icon`} />
          </div>
          <h3 className={`font-bold text-neon-${color}`}>{name}</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded bg-black/40 border border-zinc-800">
          <div className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-zinc-700"}`} />
          <span className={`text-xs font-tech-mono ${isActive ? "text-green-500" : "text-zinc-700"}`}>
            {isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
      </div>

      <p className="text-xs text-zinc-500 font-tech-mono mb-3">{description}</p>

      {isActive && (
        <div className="mb-4 p-2 border border-zinc-800 rounded-md bg-black/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-zinc-500 font-tech-mono">PROGRESS</span>
            <span className={`text-xs text-neon-${color} font-tech-mono`}>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-2 border border-zinc-800 rounded-md bg-black/40">
            <div className="text-xs text-zinc-500 font-tech-mono mb-1">{stats.statOneLabel}</div>
            <div className="text-lg font-bold text-white">
              {typeof stats.statOneValue === "number" && stats.statOneValue > 1000
                ? `$${stats.statOneValue.toLocaleString()}`
                : stats.statOneValue}
            </div>
          </div>
          <div className="p-2 border border-zinc-800 rounded-md bg-black/40">
            <div className="text-xs text-zinc-500 font-tech-mono mb-1">{stats.statTwoLabel}</div>
            <div className="text-lg font-bold text-white">{stats.statTwoValue}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <CyberButton
          size="sm"
          variant={isActive ? "default" : "outline"}
          glowColor={isActive ? "red" : "green"}
          onClick={toggleActive}
        >
          {isActive ? "STOP" : "START"}
        </CyberButton>
        <div className="grid grid-cols-2 gap-2">
          <CyberButton size="sm" variant="outline" glowColor="red" onClick={handleClose}>
            CLOSE
          </CyberButton>
          <Link href={href} className="block">
            <CyberButton size="sm" variant="outline" glowColor={color} className="w-full">
              <span className="flex items-center justify-center gap-1">
                CONFIG <ArrowRight size={12} />
              </span>
            </CyberButton>
          </Link>
        </div>
      </div>
    </CyberCard>
  )
}

export default ToolCard
