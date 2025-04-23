"use client"

import { useState } from "react"
import { Sparkles, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import CyberButton from "@/components/cyber-button"
import CyberCard from "@/components/cyber-card"
import TerminalCode from "@/components/terminal-code"

type AiStrategyLabProps = {}

export default function AiStrategyLab({}: AiStrategyLabProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [strategyPrompt, setStrategyPrompt] = useState("")
  const [riskLevel, setRiskLevel] = useState(50)
  const [timeframe, setTimeframe] = useState("1h")
  const [market, setMarket] = useState("SOL-USDC")
  const [generatedStrategy, setGeneratedStrategy] = useState<string | null>(null)
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)

  const generateStrategy = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedStrategy("This is a generated strategy based on your input.")
      setGeneratedCode("// Generated code will appear here")
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <CyberCard className="bg-black/60">
      <h3 className="text-xl font-bold text-neon-pink mb-4">AI Strategy Lab</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-tech-mono text-neon-cyan">Strategy Description</label>
          <Textarea
            placeholder="Describe your trading strategy..."
            className="bg-black border-zinc-800 focus:border-neon-pink min-h-[100px]"
            value={strategyPrompt}
            onChange={(e) => setStrategyPrompt(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-tech-mono text-neon-cyan">Market</label>
          <Select value={market} onValueChange={setMarket}>
            <SelectTrigger className="bg-black border-zinc-800">
              <SelectValue placeholder="Select market" />
            </SelectTrigger>
            <SelectContent className="bg-black border-zinc-800">
              <SelectItem value="SOL-USDC">SOL-USDC</SelectItem>
              <SelectItem value="BTC-USDC">BTC-USDC</SelectItem>
              <SelectItem value="ETH-USDC">ETH-USDC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-tech-mono text-neon-cyan">Timeframe</label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="bg-black border-zinc-800">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-black border-zinc-800">
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="4h">4 Hours</SelectItem>
              <SelectItem value="1d">1 Day</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-tech-mono text-neon-cyan">Risk Level</label>
            <span className="text-sm font-tech-mono text-neon-pink">{riskLevel}%</span>
          </div>
          <Slider
            value={[riskLevel]}
            min={10}
            max={90}
            step={10}
            onValueChange={(value) => setRiskLevel(value[0])}
            className="w-full"
          />
        </div>

        <CyberButton onClick={generateStrategy} disabled={isGenerating} glowColor="cyan" className="w-full mt-4">
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> GENERATING...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" /> GENERATE STRATEGY
            </>
          )}
        </CyberButton>

        {generatedStrategy && (
          <div className="mt-6">
            <h4 className="text-lg font-bold text-neon-pink">Generated Strategy</h4>
            <p className="text-zinc-400 font-tech-mono">{generatedStrategy}</p>
          </div>
        )}

        {generatedCode && (
          <div className="mt-6">
            <h4 className="text-lg font-bold text-neon-cyan">Generated Code</h4>
            <TerminalCode code={generatedCode} />
          </div>
        )}
      </div>
    </CyberCard>
  )
}
