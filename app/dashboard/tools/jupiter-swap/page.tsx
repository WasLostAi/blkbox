"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw } from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import GlitchText from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"
import CyberCard from "@/components/cyber-card"
import TierGate from "@/components/tier-gate"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"
import JupiterSwap from "@/components/jupiter-swap"

export default function JupiterSwapPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { connected } = useWallet()

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <MatrixBackground />
        <CircuitPattern />
        <div className="flex flex-col items-center">
          <RefreshCw className="h-12 w-12 text-neon-pink animate-spin mb-4" />
          <GlitchText text="LOADING JUPITER DEX" className="text-xl font-tech-mono text-neon-cyan mb-2" />
          <DataPulse className="w-48 mt-4" />
        </div>
      </div>
    )
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
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="JUPITER DEX"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">OPTIMAL TOKEN SWAPS WITH STEALTH ROUTING</p>
              <DataPulse className="my-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <JupiterSwap />
              </div>

              <div className="space-y-6">
                <CyberCard className="bg-black/60">
                  <h3 className="text-xl font-bold text-neon-cyan mb-4">Jupiter Features</h3>
                  <ul className="space-y-2 text-zinc-300 font-tech-mono text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-neon-pink shrink-0"></div>
                      <span>Best price execution across all Solana DEXs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-neon-pink shrink-0"></div>
                      <span>Split routes for optimal pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-neon-pink shrink-0"></div>
                      <span>Low price impact for large swaps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-neon-pink shrink-0"></div>
                      <span>Stealth routing to minimize front-running</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-neon-pink shrink-0"></div>
                      <span>Access to deep liquidity pools</span>
                    </li>
                  </ul>
                </CyberCard>

                <CyberCard variant="cyan" className="bg-black/60">
                  <h3 className="text-xl font-bold text-neon-pink mb-4">$BLKBOX Enhancements</h3>
                  <ul className="space-y-2 text-zinc-300 font-tech-mono text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-neon-cyan shrink-0"></div>
                      <span>Shadow routing for complete privacy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-neon-cyan shrink-0"></div>
                      <span>MEV protection against sandwich attacks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-neon-cyan shrink-0"></div>
                      <span>Transaction fragmentation for large orders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-neon-cyan shrink-0"></div>
                      <span>Priority execution with optimized gas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-neon-cyan shrink-0"></div>
                      <span>Advanced slippage protection</span>
                    </li>
                  </ul>
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
