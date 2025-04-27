"use client"

import { useState } from "react"
import Link from "next/link"
import { RefreshCw, ArrowRight } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "./cyber-button"
import { Progress } from "@/components/ui/progress"

export default function WashTradingCard() {
  const [isLaunched, setIsLaunched] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(45)
  const [volume, setVolume] = useState(124500)

  // Toggle active state for demo purposes
  const toggleActive = () => {
    setIsActive(!isActive)
  }

  // Launch the tool
  const handleLaunch = () => {
    setIsLaunched(true)
  }

  // Return to standard view
  const handleClose = () => {
    setIsLaunched(false)
  }

  if (!isLaunched) {
    // Standard card format (pre-launch)
    return (
      <CyberCard className="bg-black/60">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-neon-pink/10">
            <RefreshCw className="h-6 w-6 text-neon-pink" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neon-pink mb-1 text-center">Wash Trading Engine</h3>
            <p className="text-zinc-400 font-tech-mono text-sm mb-4 text-left">
              Volume simulation with anti-detection algorithms.
            </p>
            <div className="flex items-center gap-2">
              <CyberButton size="sm" glowColor="pink" onClick={handleLaunch}>
                LAUNCH
              </CyberButton>
              <div className="bg-neon-pink/10 text-neon-pink text-xs font-tech-mono px-2 py-1 rounded">
                SHADOW ELITE
              </div>
            </div>
          </div>
        </div>
      </CyberCard>
    )
  }

  // Monitoring view (post-launch)
  return (
    <CyberCard className="bg-black/60">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-neon-pink/10">
            <RefreshCw className="h-5 w-5 text-neon-pink" />
          </div>
          <div>
            <h3 className="font-bold text-neon-pink text-center">Wash Trading Engine</h3>
            <p className="text-xs text-zinc-500 font-tech-mono text-left">Volume simulation with anti-detection</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-zinc-700"}`} />
          <span className={`text-xs font-tech-mono ${isActive ? "text-green-500" : "text-zinc-700"}`}>
            {isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
      </div>

      {isActive && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-zinc-500 font-tech-mono">PROGRESS</span>
            <span className="text-xs text-neon-cyan font-tech-mono">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2 border border-zinc-800 rounded-md bg-black/40">
          <div className="text-xs text-zinc-500 font-tech-mono mb-1 text-center">VOLUME (24H)</div>
          <div className="text-lg font-bold text-white text-center">${volume.toLocaleString()}</div>
        </div>
        <div className="p-2 border border-zinc-800 rounded-md bg-black/40">
          <div className="text-xs text-zinc-500 font-tech-mono mb-1 text-center">DETECTION RISK</div>
          <div className="text-lg font-bold text-white text-center">{isActive ? "Low" : "None"}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <CyberButton
          size="sm"
          variant={isActive ? "default" : "outline"}
          glowColor={isActive ? "red" : "green"}
          onClick={toggleActive}
        >
          {isActive ? "STOP ENGINE" : "START ENGINE"}
        </CyberButton>
        <div className="flex gap-2">
          <CyberButton size="sm" variant="outline" glowColor="red" onClick={handleClose}>
            CLOSE
          </CyberButton>
          <Link href="/dashboard/tools/wash-trading">
            <CyberButton size="sm" variant="outline" glowColor="cyan" className="gap-1">
              CONFIGURE <ArrowRight size={12} />
            </CyberButton>
          </Link>
        </div>
      </div>
    </CyberCard>
  )
}
