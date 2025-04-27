"use client"

import { useState } from "react"
import Link from "next/link"
import { Shuffle } from "lucide-react"
import CyberCard from "./cyber-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TerminalCode from "@/components/terminal-code"

interface TemporalFragmentationEngineProps {
  inDashboard?: boolean
}

export default function TemporalFragmentationEngine({ inDashboard = false }: TemporalFragmentationEngineProps) {
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

  const handleManipulate = async () => {
    setIsManipulating(true)
    setResult(null)

    // Simulate temporal fragmentation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setResult(`Successfully fragmented ${targetToken} transactions by ${manipulationAmount}% using ${manipulationType}`)
    setIsManipulating(false)
  }

  // If we're in the dashboard view, show the compact card with launch button
  if (inDashboard) {
    return (
      <CyberCard className="bg-black/60">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-neon-pink/10">
            <Shuffle className="h-6 w-6 text-neon-pink" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neon-pink mb-1 text-center">Temporal Fragmentation Engine</h3>
            <p className="text-zinc-400 font-tech-mono text-sm mb-4 text-left">
              Orchestrate token movements across time to maximize alpha.
            </p>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/tools/temporal-fragmentation">
                <Button size="sm" className="bg-neon-pink text-black hover:bg-neon-pink/80">
                  LAUNCH
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
            <Shuffle className="h-5 w-5 text-neon-pink" />
          </div>
          <div>
            <h3 className="font-bold text-neon-pink text-center">Temporal Fragmentation Engine</h3>
            <p className="text-xs text-zinc-500 font-tech-mono text-left">Orchestrate token movements across time</p>
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
          <div className="text-xs text-zinc-500 font-tech-mono mb-1 text-center">FRAGMENTS</div>
          <div className="text-lg font-bold text-white text-center">{fragments}</div>
        </div>
        <div className="p-2 border border-zinc-800 rounded-md bg-black/40">
          <div className="text-xs text-zinc-500 font-tech-mono mb-1 text-center">VOLUME (24H)</div>
          <div className="text-lg font-bold text-white text-center">${volume.toLocaleString()}</div>
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

      <div className="space-y-2 mb-4">
        <label className="text-sm font-tech-mono text-neon-cyan">Manipulation Amount (%)</label>
        <Input
          type="number"
          placeholder="Enter amount"
          value={manipulationAmount}
          onChange={(e) => setManipulationAmount(e.target.value)}
          className="bg-black border-zinc-800"
        />
      </div>

      <Button
        onClick={handleManipulate}
        disabled={isManipulating}
        className="w-full bg-neon-pink text-black hover:bg-neon-pink/80"
      >
        {isManipulating ? "FRAGMENTING..." : "INITIATE TEMPORAL FRAGMENTATION"}
      </Button>

      {result && (
        <div className="mt-4">
          <TerminalCode code={result} />
        </div>
      )}

      <div className="flex items-center justify-center mt-4">
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
