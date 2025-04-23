"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Zap, ArrowRightLeft, Settings, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import TierGate from "@/components/tier-gate"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"

export default function ShadowSwapPage() {
  const { connected } = useWallet()
  const [fromToken, setFromToken] = useState("SOL")
  const [toToken, setToToken] = useState("USDC")
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [estimatedOutput, setEstimatedOutput] = useState("0.0")

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || isProcessing) return

    setIsProcessing(true)

    try {
      // Simulate transaction delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate swap execution and calculate output
      const output = Number.parseFloat(amount) * 0.95 // Simulate 5% slippage
      setEstimatedOutput(output.toFixed(4))

      setIsComplete(true)

      // Reset after a few seconds
      setTimeout(() => {
        setIsComplete(false)
        setAmount("")
        setEstimatedOutput("0.0")
      }, 5000)
    } catch (error) {
      console.error("Swap failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-neon-pink/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_DASHBOARD</span>
          </Link>

          <WalletConnector buttonSize="sm" glowColor="cyan" />
        </div>
      </header>

      <main className="flex-1 container py-12">
        <TierGate requiredTier="ENTRY_LEVEL">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="SHADOW SWAP"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">ROUTE TRANSACTIONS THROUGH OBFUSCATION LAYERS</p>
              <DataPulse className="my-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <CyberCard className="bg-black/60">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-neon-pink">Swap Tokens</h3>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-neon-cyan transition-colors">
                        <Settings size={18} />
                      </button>
                      <button className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-neon-cyan transition-colors">
                        <Info size={18} />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSwap} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-neon-cyan font-tech-mono text-sm">FROM</label>
                      <div className="flex gap-2">
                        <Select value={fromToken} onValueChange={setFromToken}>
                          <SelectTrigger className="w-[120px] bg-black border-zinc-800">
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-zinc-800">
                            <SelectItem value="SOL">SOL</SelectItem>
                            <SelectItem value="USDC">USDC</SelectItem>
                            <SelectItem value="BLKBOX">BLKBOX</SelectItem>
                            <SelectItem value="BTC">BTC</SelectItem>
                            <SelectItem value="ETH">ETH</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          className="flex-1 bg-black border-zinc-800 focus:border-neon-pink text-white font-tech-mono"
                          placeholder="0.0"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="p-2 rounded-full bg-zinc-800 hover:bg-neon-pink/20 text-zinc-400 hover:text-neon-pink transition-all"
                        onClick={() => {
                          const temp = fromToken
                          setFromToken(toToken)
                          setToToken(temp)
                        }}
                      >
                        <ArrowRightLeft size={18} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-neon-cyan font-tech-mono text-sm">TO</label>
                      <div className="flex gap-2">
                        <Select value={toToken} onValueChange={setToToken}>
                          <SelectTrigger className="w-[120px] bg-black border-zinc-800">
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-zinc-800">
                            <SelectItem value="SOL">SOL</SelectItem>
                            <SelectItem value="USDC">USDC</SelectItem>
                            <SelectItem value="BLKBOX">BLKBOX</SelectItem>
                            <SelectItem value="BTC">BTC</SelectItem>
                            <SelectItem value="ETH">ETH</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="text"
                          value={estimatedOutput}
                          readOnly
                          className="flex-1 bg-black border-zinc-800 text-white font-tech-mono"
                          placeholder="0.0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-tech-mono">
                        <span className="text-zinc-400">Price Impact</span>
                        <span className="text-neon-cyan">~0.05%</span>
                      </div>
                      <div className="flex justify-between text-xs font-tech-mono">
                        <span className="text-zinc-400">Route</span>
                        <span className="text-neon-pink">Shadow Route (3 hops)</span>
                      </div>
                      <div className="flex justify-between text-xs font-tech-mono">
                        <span className="text-zinc-400">Slippage Tolerance</span>
                        <span className="text-neon-cyan">0.5%</span>
                      </div>
                    </div>

                    <CyberButton
                      type="submit"
                      className="w-full"
                      glowColor="pink"
                      disabled={isProcessing || isComplete || !amount}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 animate-pulse" />
                          <span>ROUTING THROUGH SHADOW NETWORK...</span>
                        </div>
                      ) : isComplete ? (
                        "SWAP COMPLETE"
                      ) : (
                        "EXECUTE SHADOW SWAP"
                      )}
                    </CyberButton>
                  </form>
                </CyberCard>
              </div>

              <div>
                <CyberCard className="bg-black/60 mb-6">
                  <h3 className="text-lg font-bold text-neon-cyan mb-4">Shadow Route</h3>
                  <p className="text-zinc-400 font-tech-mono text-sm mb-4">
                    Your transaction will be routed through multiple hops to obfuscate the trading intent.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-neon-pink"></div>
                      <div className="h-px flex-1 bg-neon-pink/30"></div>
                      <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                      <div className="h-px flex-1 bg-neon-cyan/30"></div>
                      <div className="w-2 h-2 rounded-full bg-neon-pink"></div>
                      <div className="h-px flex-1 bg-neon-pink/30"></div>
                      <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                    </div>
                    <div className="flex justify-between text-xs font-tech-mono">
                      <span className="text-neon-pink">Entry</span>
                      <span className="text-neon-cyan">Exit</span>
                    </div>
                  </div>
                </CyberCard>

                <CyberCard className="bg-black/60">
                  <h3 className="text-lg font-bold text-neon-pink mb-4">Privacy Level</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-tech-mono text-sm">Current Level</span>
                      <span className="text-neon-cyan font-tech-mono text-sm">Standard</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full">
                      <div className="bg-gradient-to-r from-neon-pink to-neon-cyan h-2 rounded-full w-1/2"></div>
                    </div>
                    <div className="flex justify-between text-xs font-tech-mono text-zinc-500">
                      <span>Basic</span>
                      <span>Standard</span>
                      <span>Maximum</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <CyberButton variant="outline" size="sm" glowColor="cyan" className="w-full">
                      UPGRADE PRIVACY
                    </CyberButton>
                  </div>
                </CyberCard>
              </div>
            </div>
          </div>
        </TierGate>
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
