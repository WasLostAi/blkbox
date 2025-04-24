"use client"

import { useState } from "react"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TerminalCode } from "@/components/terminal-code"

export default function QuantumStateManipulator() {
  const [targetToken, setTargetToken] = useState("BLKBOX")
  const [manipulationType, setManipulationType] = useState("increase_price")
  const [manipulationAmount, setManipulationAmount] = useState("10")
  const [isManipulating, setIsManipulating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleManipulate = async () => {
    setIsManipulating(true)
    setResult(null)

    // Simulate quantum manipulation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setResult(`Successfully manipulated ${targetToken} state by ${manipulationAmount}% using ${manipulationType}`)
    setIsManipulating(false)
  }

  return (
    <CyberCard className="bg-black/60">
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-neon-cyan">Quantum Controls</h3>

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
          {isManipulating ? "MANIPULATING..." : "INITIATE QUANTUM MANIPULATION"}
        </CyberButton>

        {result && (
          <div className="mt-4">
            <TerminalCode code={result} />
          </div>
        )}
      </div>
    </CyberCard>
  )
}
