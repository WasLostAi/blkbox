"use client"

import { useState } from "react"
import CyberCard from "@/components/cyber-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TerminalCode from "@/components/terminal-code"
import CyberButton from "@/components/ui/button"

export default function TokenCreationWizard() {
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [totalSupply, setTotalSupply] = useState("1000000")
  const [taxRate, setTaxRate] = useState("3")
  const [isCreating, setIsCreating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleCreate = async () => {
    setIsCreating(true)
    setResult(null)

    // Simulate token creation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setResult(
      `Successfully created token ${tokenName} (${tokenSymbol}) with a total supply of ${totalSupply} and a tax rate of ${taxRate}%`,
    )
    setIsCreating(false)
  }

  return (
    <CyberCard className="bg-black/60">
      <div className="p-6">
        <h3 className="text-xl font-bold text-neon-cyan mb-4">Token Creation Wizard</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-tech-mono text-neon-cyan">Token Name</label>
            <Input
              type="text"
              placeholder="Enter token name"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="bg-black border-zinc-800"
            />
          </div>

          <div>
            <label className="text-sm font-tech-mono text-neon-cyan">Token Symbol</label>
            <Input
              type="text"
              placeholder="Enter token symbol"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              className="bg-black border-zinc-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-tech-mono text-neon-cyan">Total Supply</label>
              <Input
                type="number"
                placeholder="Enter total supply"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                className="bg-black border-zinc-800"
              />
            </div>

            <div>
              <label className="text-sm font-tech-mono text-neon-cyan">Tax Rate (%)</label>
              <Select value={taxRate} onValueChange={setTaxRate}>
                <SelectTrigger className="bg-black border-zinc-800">
                  <SelectValue placeholder="Select tax rate" />
                </SelectTrigger>
                <SelectContent className="bg-black border-zinc-800">
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="3">3%</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <CyberButton onClick={handleCreate} disabled={isCreating} glowColor="cyan" className="w-full">
            {isCreating ? "CREATING TOKEN..." : "CREATE TOKEN"}
          </CyberButton>

          {result && (
            <div className="mt-4">
              <TerminalCode code={result} />
            </div>
          )}
        </div>
      </div>
    </CyberCard>
  )
}
