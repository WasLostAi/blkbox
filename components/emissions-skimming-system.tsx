"use client"

import Link from "next/link"

import { useState } from "react"
import { Zap } from "lucide-react"
import CyberCard from "./cyber-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TerminalCode from "@/components/terminal-code"

interface EmissionsSkimmingSystemProps {
  inDashboard?: boolean
}

export default function EmissionsSkimmingSystem({ inDashboard = false }: EmissionsSkimmingSystemProps) {
  const [isActive, setIsActive] = useState(false)
  const [targetToken, setTargetToken] = useState("BLKBOX")
  const [skimmingRate, setSkimmingRate] = useState("1")
  const [isSkimming, setIsSkimming] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  // Toggle active state for demo purposes
  const toggleActive = () => {
    setIsActive(!isActive)
    console.log("Emissions Skimming Engine toggled:", !isActive)
  }

  const handleSkim = async () => {
    setIsSkimming(true)
    setResult(null)

    // Simulate emissions skimming
    console.log("Initiating emissions skimming...")
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const skimmedAmount = (Number(skimmingRate) / 100) * 1000 // Mock calculation
    const resultMessage = `Successfully skimmed ${skimmedAmount} ${targetToken} emissions`
    setResult(resultMessage)
    console.log(resultMessage)
    setIsSkimming(false)
  }

  // If we're in the dashboard view, show the compact card with launch button
  if (inDashboard) {
    return (
      <CyberCard className="bg-black/60">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-neon-pink/10">
            <Zap className="h-6 w-6 text-neon-pink" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neon-pink mb-1">Emissions Skimming</h3>
            <p className="text-zinc-400 font-tech-mono text-sm mb-4">
              Extract value from token emissions with surgical precision.
            </p>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/tools/emissions-skimming">
                <Button size="sm" className="bg-neon-pink text-black hover:bg-neon-pink/80">
                  CONFIGURE
                </Button>
              </Link>
              <div className="bg-neon-pink/10 text-neon-pink text-xs font-tech-mono px-2 py-1 rounded">
                PHANTOM COUNCIL
              </div>
            </div>
          </div>
        </div>
      </CyberCard>
    )
  }

  // Full view (for the dedicated page)
  return (
    <CyberCard className="bg-black/60">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-neon-pink/10">
            <Zap className="h-5 w-5 text-neon-pink" />
          </div>
          <div>
            <h3 className="font-bold text-neon-pink">Emissions Skimming System</h3>
            <p className="text-xs text-zinc-500 font-tech-mono">Extract value from token emissions</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-zinc-700"}`} />
          <span className={`text-xs font-tech-mono ${isActive ? "text-green-500" : "text-zinc-700"}`}>
            {isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <label className="text-sm font-tech-mono text-neon-cyan">Target Token</label>
        <Select value={targetToken} onValueChange={setTargetToken}>
          <SelectTrigger className="bg-black border-zinc-800">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent className="bg-black border-zinc-800">
            <SelectItem value="BLKBOX">$BLKBOX</SelectItem>
            <SelectItem value="USDC">USDC</SelectItem>
            <SelectItem value="SOL">SOL</SelectItem>
            <SelectItem value="ETH">ETH</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 mb-4">
        <label className="text-sm font-tech-mono text-neon-cyan">Skimming Rate (%)</label>
        <Input
          type="number"
          placeholder="Enter amount"
          value={skimmingRate}
          onChange={(e) => setSkimmingRate(e.target.value)}
          className="bg-black border-zinc-800"
        />
      </div>

      <Button
        onClick={handleSkim}
        disabled={isSkimming}
        className="w-full bg-neon-pink text-black hover:bg-neon-pink/80"
      >
        {isSkimming ? "SKIMMING..." : "INITIATE EMISSIONS SKIMMING"}
      </Button>

      {result && (
        <div className="mt-4">
          <TerminalCode code={result} />
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <Button
          size="sm"
          variant={isActive ? "default" : "outline"}
          className={
            isActive
              ? "bg-red-500 hover:bg-red-700 text-white"
              : "text-neon-green border-neon-green hover:bg-neon-green/10"
          }
          onClick={toggleActive}
        >
          {isActive ? "STOP ENGINE" : "START ENGINE"}
        </Button>
      </div>
    </CyberCard>
  )
}
