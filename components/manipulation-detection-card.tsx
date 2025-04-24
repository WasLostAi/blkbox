"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowRight } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "./cyber-button"
import { Progress } from "@/components/ui/progress"

export default function ManipulationDetectionCard() {
  const [isLaunched, setIsLaunched] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(72)
  const [alerts, setAlerts] = useState(7)

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
          <div className="p-3 rounded-full bg-neon-cyan/10">
            <AlertTriangle className="h-6 w-6 text-neon-cyan" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neon-cyan mb-1">Market Manipulation Detection</h3>
            <p className="text-zinc-400 font-tech-mono text-sm mb-4">
              Identify and analyze market manipulation patterns.
            </p>
            <div className="flex items-center gap-2">
              <CyberButton size="sm" glowColor="cyan" onClick={handleLaunch}>
                LAUNCH
              </CyberButton>
              <div className="bg-neon-cyan/10 text-neon-cyan text-xs font-tech-mono px-2 py-1 rounded">
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
          <div className="p-2 rounded-full bg-neon-cyan/10">
            <AlertTriangle className="h-5 w-5 text-neon-cyan" />
          </div>
          <div>
            <h3 className="font-bold text-neon-cyan">Market Manipulation Detection</h3>
            <p className="text-xs text-zinc-500 font-tech-mono">Pattern recognition and alerts</p>
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
            <span className="text-xs text-zinc-500 font-tech-mono">SCAN PROGRESS</span>
            <span className="text-xs text-neon-cyan font-tech-mono">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2 border border-zinc-800 rounded-md bg-black/40">
          <div className="text-xs text-zinc-500 font-tech-mono mb-1">ALERTS</div>
          <div className="text-lg font-bold text-white">{alerts}</div>
        </div>
        <div className="p-2 border border-zinc-800 rounded-md bg-black/40">
          <div className="text-xs text-zinc-500 font-tech-mono mb-1">CONFIDENCE</div>
          <div className="text-lg font-bold text-white">High</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <CyberButton
          size="sm"
          variant={isActive ? "default" : "outline"}
          glowColor={isActive ? "red" : "green"}
          onClick={toggleActive}
        >
          {isActive ? "STOP SCAN" : "START SCAN"}
        </CyberButton>
        <div className="flex gap-2">
          <CyberButton size="sm" variant="outline" glowColor="red" onClick={handleClose}>
            CLOSE
          </CyberButton>
          <Link href="/dashboard/tools/manipulation-detection">
            <CyberButton size="sm" variant="outline" glowColor="cyan" className="gap-1">
              ANALYZE <ArrowRight size={12} />
            </CyberButton>
          </Link>
        </div>
      </div>
    </CyberCard>
  )
}
