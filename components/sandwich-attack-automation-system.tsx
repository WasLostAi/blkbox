"use client"

import { useState } from "react"
import CyberCard from "@/components/cyber-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TerminalCode from "@/components/terminal-code"
import { CyberButton } from "@/components/cyber-button"

export default function SandwichAttackAutomationSystem() {
  const [isActive, setIsActive] = useState(false)
  const [targetToken, setTargetToken] = useState("BLKBOX")
  const [slippage, setSlippage] = useState("0.5")
  const [gasPrice, setGasPrice] = useState("100")
  const [isAttacking, setIsAttacking] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  // Toggle active state for demo purposes
  const toggleActive = () => {
    setIsActive(!isActive)
  }

  const handleAttack = async () => {
    setIsAttacking(true)
    setResult(null)

    // Simulate sandwich attack
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setResult(
      `Successfully executed sandwich attack on ${targetToken} with ${slippage}% slippage and ${gasPrice} gas price`,
    )
    setIsAttacking(false)
  }

  return (
    <CyberCard className="bg-black/60">
      <div className="p-6">
        <h3 className="text-xl font-bold text-neon-cyan mb-4">Sandwich Attack Automation</h3>

        <div className="space-y-4">
          <div>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-tech-mono text-neon-cyan">Slippage (%)</label>
              <Input
                type="number"
                placeholder="Enter slippage"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="bg-black border-zinc-800"
              />
            </div>

            <div>
              <label className="text-sm font-tech-mono text-neon-cyan">Gas Price (Gwei)</label>
              <Input
                type="number"
                placeholder="Enter gas price"
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
                className="bg-black border-zinc-800"
              />
            </div>
          </div>

          <CyberButton onClick={handleAttack} disabled={isAttacking} glowColor="pink" className="w-full">
            {isAttacking ? "ATTACKING..." : "INITIATE SANDWICH ATTACK"}
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
              className={
                isActive
                  ? "bg-red-500 hover:bg-red-700 text-white"
                  : "text-neon-green border-neon-green hover:bg-neon-green/10"
              }
              onClick={toggleActive}
            >
              {isActive ? "STOP ENGINE" : "START ENGINE"}
            </CyberButton>
          </div>
        </div>
      </div>
    </CyberCard>
  )
}
