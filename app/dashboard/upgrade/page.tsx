"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ChevronUp, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"

// Define tier thresholds
const TIER_THRESHOLDS = {
  UNAUTHORIZED: 0,
  ENTRY_LEVEL: 10000,
  OPERATOR: 50000,
  SHADOW_ELITE: 250000,
  PHANTOM_COUNCIL: 1000000,
}

export default function UpgradePage() {
  const { connected, balance, tier, updateBalance } = useWallet()
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  // Calculate how many tokens needed for next tier
  const getNextTierInfo = () => {
    if (tier === "PHANTOM_COUNCIL") return null

    const tierLevels = Object.entries(TIER_THRESHOLDS)
      .map(([key, value]) => ({ tier: key as keyof typeof TIER_THRESHOLDS, threshold: value }))
      .sort((a, b) => a.threshold - b.threshold)

    const currentTierIndex = tierLevels.findIndex((t) => t.tier === tier)
    const nextTier = tierLevels[currentTierIndex + 1]

    if (!nextTier) return null

    return {
      tier: nextTier.tier,
      threshold: nextTier.threshold,
      needed: Math.max(0, nextTier.threshold - balance),
    }
  }

  const nextTierInfo = getNextTierInfo()

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || isProcessing) return

    setIsProcessing(true)

    try {
      const amountValue = Number.parseInt(amount, 10)
      if (isNaN(amountValue) || amountValue <= 0) {
        throw new Error("Please enter a valid amount")
      }

      // Simulate transaction delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update balance
      updateBalance(balance + amountValue)
      setSuccess(true)

      // Wait a moment before redirecting
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!connected) {
    // Redirect to dashboard if not connected
    router.push("/dashboard")
    return null
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <GlitchText
              text="UPGRADE YOUR TIER"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">UNLOCK MORE POWERFUL TOOLS</p>
            <DataPulse className="my-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <CyberCard className="bg-black/60">
              <h3 className="text-xl font-bold text-neon-cyan mb-6">Current Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400 font-tech-mono">Current Tier</span>
                  <span className="text-neon-pink font-tech-mono">{tier.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400 font-tech-mono">Current Balance</span>
                  <span className="text-white font-tech-mono">{balance.toLocaleString()} $BLKBOX</span>
                </div>

                {nextTierInfo ? (
                  <>
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                      <span className="text-zinc-400 font-tech-mono">Next Tier</span>
                      <span className="text-neon-cyan font-tech-mono">{nextTierInfo.tier.replace("_", " ")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-tech-mono">Tokens Needed</span>
                      <span className="text-neon-pink font-tech-mono">
                        {nextTierInfo.needed.toLocaleString()} $BLKBOX
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-tech-mono">Status</span>
                    <span className="text-neon-cyan font-tech-mono">Maximum Tier Reached</span>
                  </div>
                )}
              </div>
            </CyberCard>

            <CyberCard className="bg-black/60">
              <h3 className="text-xl font-bold text-neon-pink mb-6">Purchase $BLKBOX</h3>

              {tier === "PHANTOM_COUNCIL" ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-cyan/20 mb-4">
                    <ChevronUp className="h-8 w-8 text-neon-cyan" />
                  </div>
                  <p className="text-zinc-300 font-tech-mono mb-4">You have reached the highest tier level.</p>
                  <Link href="/dashboard">
                    <CyberButton glowColor="cyan">RETURN TO DASHBOARD</CyberButton>
                  </Link>
                </div>
              ) : success ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-cyan/20 mb-4">
                    <ChevronUp className="h-8 w-8 text-neon-cyan" />
                  </div>
                  <p className="text-zinc-300 font-tech-mono mb-4">
                    Purchase successful! Your balance has been updated.
                  </p>
                  <p className="text-neon-pink font-tech-mono mb-6">Redirecting to dashboard...</p>
                </div>
              ) : (
                <form onSubmit={handlePurchase} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="amount" className="text-neon-cyan font-tech-mono">
                      AMOUNT TO PURCHASE
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      min="1"
                      className="bg-black border-zinc-800 focus:border-neon-pink text-white font-tech-mono"
                      placeholder="Enter amount"
                    />
                    <p className="text-xs text-zinc-500 font-tech-mono">
                      Cost: {amount ? (Number(amount) * 0.00025).toFixed(4) : "0"} SOL
                    </p>
                  </div>

                  <CyberButton type="submit" className="w-full" glowColor="pink" disabled={isProcessing}>
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>PROCESSING...</span>
                      </div>
                    ) : (
                      "PURCHASE_TOKENS"
                    )}
                  </CyberButton>

                  <p className="text-xs text-zinc-500 font-tech-mono text-center">
                    Tokens will be automatically added to your wallet balance.
                  </p>
                </form>
              )}
            </CyberCard>
          </div>
        </div>
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
