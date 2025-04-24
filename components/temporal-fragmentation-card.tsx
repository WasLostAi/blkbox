"use client"

import { useState } from "react"
import Link from "next/link"
import { Shuffle, ArrowRight } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "./cyber-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TerminalCode } from "@/components/terminal-code"

export default function TemporalFragmentationEngine() {
  const [isLaunched, setIsLaunched] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [fragments, setFragments] = useState(5)
  const [volume, setVolume] = useState(124500)
  const [targetToken, setTargetToken] = useState("BLKBOX")
  const [manipulationType, setManipulationType] = useState("increase_price")
  const [manipulationAmount, setManipulationAmount] = useState("10")
  const [isManipulating, setIsManipulating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

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

  const handleManipulate = async () => {
    setIsManipulating(true)
    setResult(null)

    // Simulate quantum manipulation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setResult(`Successfully manipulated ${targetToken} state by ${manipulationAmount}% using ${manipulationType}`)
    setIsManipulating(false)
  }

  if (!isLaunched) {
    // Standard card format (pre-launch)
    return (
      <CyberCard className="bg-black/60">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-neon-pink/10">
            <Shuffle className="h-6 w-6 text-neon-pink" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neon-pink mb-1">Temporal Fragmentation Engine</h3>
            <p className="text-zinc-400 font-tech-mono text-sm mb-4">
              Orchestrate token movements across time to maximize alpha.
            </p>
            <div className="flex items-center gap-2">
              <CyberButton size="sm" glowColor="pink" onClick={handleLaunch}>
                LAUNCH
              </CyberButton>
              <div className="bg-neon-pink/10 text-neon-pink text-xs font-tech-mono px-2 py-1 rounded">
                PHANTOM COUNCIL
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
            <Shuffle className="h-5 w-5 text-neon-pink" />
          </div>
          <div>
            <h3 className="font-bold text-neon-pink">Temporal Fragmentation Engine</h3>
            <p className="text-xs text-zinc-500 font-tech-mono">Orchestrate token movements across time</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-zinc-700"}`} />
          <span className={`text-xs font-tech-mono ${isActive ? "text-green-500" : "text-zinc-700"}`}>
            {isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2 border border-zinc-800 rounded-md bg-black/40">
          <div className="text-xs text-zinc-500 font-tech-mono mb-1">FRAGMENTS</div>
          <div className="text-lg font-bold text-white">{fragments}</div>
        </div>
        <div className="p-2 border border-zinc-800 rounded-md bg-black/40">
          <div className="text-xs text-zinc-500 font-tech-mono mb-1">VOLUME (24H)</div>
          <div className="text-lg font-bold text-white">${volume.toLocaleString()}</div>
        </div>
      </div>

      <div className="space-y-2">
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

      <div className="space-y-2">
        <label className="text-sm font-tech-mono text-neon-cyan">Manipulation Type</label>
        <Select value={manipulationType} onValueChange={setManipulationType}>
          <SelectTrigger className="bg-black border-zinc-800">
            <SelectValue placeholder="Select manipulation" />
          </SelectTrigger>
          <SelectContent className="bg-black border-zinc-800">
            <SelectItem value="increase_price">Increase Price</SelectItem>
            <SelectItem value="decrease_price">Decrease Price</SelectItem>
            <SelectItem value="increase_volume">Increase Volume</SelectItem>
            <SelectItem value="decrease_volume">Decrease Volume</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-tech-mono text-neon-cyan">Manipulation Amount (%)</label>
        <Input
          type="number"
          placeholder="Enter amount"
          value={manipulationAmount}
          onChange={(e) => setManipulationAmount(e.target.value)}
          className="bg-black border-zinc-800"
        />
      </div>

      <CyberButton onClick={handleManipulate} disabled={isManipulating} glowColor="pink" className="w-full">
        {isManipulating ? "MANIPULATING..." : "INITIATE TEMPORAL FRAGMENTATION"}
      </CyberButton>

      {result && (
        <div className="mt-4">
          <TerminalCode code={result} />
        </div>
      )}

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
          <Link href="/dashboard/tools/temporal-fragmentation">
            <CyberButton size="sm" variant="outline" glowColor="cyan" className="gap-1">
              CONFIGURE <ArrowRight size={12} />
            </CyberButton>
          </Link>
        </div>
      </div>
    </CyberCard>
  )
}
