"use client"

import { useState } from "react"
import Link from "next/link"
import { Zap } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TerminalCode from "@/components/terminal-code"

interface QuantumStateManipulatorProps {
  inDashboard?: boolean
}

export default function QuantumStateManipulator({ inDashboard = false }: QuantumStateManipulatorProps) {
  const [isActive, setIsActive] = useState(false)
  const [qubits, setQubits] = useState(5)
  const [coherence, setCoherence] = useState(87)
  const [targetToken, setTargetToken] = useState("BLKBOX")
  const [manipulationType, setManipulationType] = useState("price_increase")
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

    // Simulate quantum manipulation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setResult(
      `Successfully manipulated ${targetToken} quantum state by ${manipulationAmount}% using ${manipulationType}`,
    )
    setIsManipulating(false)
  }

  // If we're in the dashboard view, show the compact card with launch button
  if (inDashboard) {
    return (
      <CyberCard className="bg-black/60">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-neon-cyan/10">
            <Zap className="h-6 w-6 text-neon-cyan" alt="Quantum State Manipulator icon" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neon-cyan mb-1">Quantum State Manipulator</h3>
            <p className="text-zinc-400 font-tech-mono text-sm mb-4">
              Harness quantum mechanics to influence token states.
            </p>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/tools/quantum-manipulator">
                <CyberButton size="sm" glowColor="cyan">
                  LAUNCH
                </CyberButton>
              </Link>
              <div className="bg-neon-cyan/10 text-neon-cyan text-xs font-tech-mono px-2 py-1 rounded">
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
          <div className="p-2 rounded-full bg-neon-cyan/10">
            <Zap className="h-5 w-5 text-neon-cyan" alt="Quantum State Manipulator icon" />
          </div>
          <div>
            <h3 className="font-bold text-neon-cyan">Quantum State Manipulator</h3>
            <p className="text-xs text-zinc-500 font-tech-mono">Harness quantum mechanics to influence token states</p>
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
          <div className="text-xs text-zinc-500 font-tech-mono mb-1">QUBITS</div>
          <div className="text-lg font-bold text-white">{qubits}</div>
        </div>
        <div className="p-2 border border-zinc-800 rounded-md bg-black/40">
          <div className="text-xs text-zinc-500 font-tech-mono mb-1">COHERENCE</div>
          <div className="text-lg font-bold text-white">{coherence}%</div>
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
            <SelectItem value="price_increase">Price Increase</SelectItem>
            <SelectItem value="price_decrease">Price Decrease</SelectItem>
            <SelectItem value="volume_increase">Volume Increase</SelectItem>
            <SelectItem value="volatility_increase">Volatility Increase</SelectItem>
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

      <CyberButton onClick={handleManipulate} disabled={isManipulating} glowColor="cyan" className="w-full">
        {isManipulating ? "MANIPULATING..." : "INITIATE QUANTUM MANIPULATION"}
      </CyberButton>

      {result && (
        <div className="mt-4">
          <TerminalCode code={result} />
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <CyberButton
          size="sm"
          variant={isActive ? "default" : "outline"}
          glowColor={isActive ? "red" : "green"}
          onClick={toggleActive}
        >
          {isActive ? "STOP MANIPULATOR" : "START MANIPULATOR"}
        </CyberButton>
      </div>
    </CyberCard>
  )
}
