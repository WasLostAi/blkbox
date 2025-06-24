"use client"

import Link from "next/link"

import { useState } from "react"
import { Eye } from "lucide-react"
import CyberCard from "./cyber-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TerminalCode from "@/components/terminal-code"

interface LiquidityMirageSystemProps {
  inDashboard?: boolean
}

export default function LiquidityMirageSystem({ inDashboard = false }: LiquidityMirageSystemProps) {
  const [isActive, setIsActive] = useState(false)
  const [targetToken, setTargetToken] = useState("BLKBOX")
  const [mirageDuration, setMirageDuration] = useState("24")
  const [isCreating, setIsCreating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  // Toggle active state for demo purposes
  const toggleActive = () => {
    setIsActive(!isActive)
    console.log("Liquidity Mirage Creator toggled:", !isActive)
  }

  const handleCreate = async () => {
    setIsCreating(true)
    setResult(null)

    // Simulate liquidity mirage creation
    console.log("Creating liquidity mirage...")
    console.log("Target token:", targetToken)
    console.log("Mirage duration:", mirageDuration)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    console.log("Liquidity mirage created successfully!")

    const resultMessage = `Successfully created liquidity mirage for ${targetToken} lasting ${mirageDuration} hours`
    setResult(resultMessage)
    console.log(resultMessage)
    setIsCreating(false)
  }

  // If we're in the dashboard view, show the compact card with launch button
  if (inDashboard) {
    return (
      <CyberCard className="bg-black/60">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-neon-cyan/10">
            <Eye className="h-6 w-6 text-neon-cyan" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neon-cyan mb-1">Liquidity Mirage Creator</h3>
            <p className="text-zinc-400 font-tech-mono text-sm mb-4">
              Create temporary liquidity pools to attract attention and volume.
            </p>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/tools/liquidity-mirage">
                <Button size="sm" className="bg-neon-cyan text-black hover:bg-neon-cyan/80">
                  CONFIGURE
                </Button>
              </Link>
              <div className="bg-neon-cyan/10 text-neon-cyan text-xs font-tech-mono px-2 py-1 rounded">
                SHADOW ELITE
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
          <div className="p-2 rounded-full bg-neon-cyan/10">
            <Eye className="h-5 w-5 text-neon-cyan" />
          </div>
          <div>
            <h3 className="font-bold text-neon-cyan">Liquidity Mirage Creator</h3>
            <p className="text-xs text-zinc-500 font-tech-mono">Create temporary liquidity pools</p>
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
        <label className="text-sm font-tech-mono text-neon-cyan">Mirage Duration (Hours)</label>
        <Input
          type="number"
          placeholder="Enter duration"
          value={mirageDuration}
          onChange={(e) => setMirageDuration(e.target.value)}
          className="bg-black border-zinc-800"
        />
      </div>

      <Button
        onClick={handleCreate}
        disabled={isCreating}
        className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/80"
      >
        {isCreating ? "CREATING MIRAGE..." : "CREATE LIQUIDITY MIRAGE"}
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
