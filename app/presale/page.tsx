"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import TerminalText from "@/components/terminal-text"
import CountdownTimer from "@/components/countdown-timer"

export default function PresalePage() {
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  const handleConnect = () => {
    setLoading(true)

    // Simulate wallet connection
    setTimeout(() => {
      setLoading(false)
      setWalletConnected(true)
    }, 2000)
  }

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate purchase
    setTimeout(() => {
      setLoading(false)
      alert("Purchase successful! You have acquired " + amount + " $BLKBOX tokens.")
      setAmount("")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-neon-pink/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors">
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_HOME</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <GlitchText
              text="$BLKBOX PRESALE"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">SECURE YOUR POSITION IN THE SHADOW PROTOCOL</p>
            <DataPulse className="my-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/60 border border-neon-cyan p-8 rounded-lg">
              <h2 className="text-xl font-bold text-neon-cyan mb-4 font-tech-mono">PRESALE DETAILS</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400 font-tech-mono">Token Price:</span>
                  <span className="text-white font-tech-mono">0.01 SOL</span>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400 font-tech-mono">Min Purchase:</span>
                  <span className="text-white font-tech-mono">0.1 SOL</span>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400 font-tech-mono">Max Purchase:</span>
                  <span className="text-white font-tech-mono">50 SOL</span>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400 font-tech-mono">Hard Cap:</span>
                  <span className="text-white font-tech-mono">$1,000,000</span>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400 font-tech-mono">Tokens for Sale:</span>
                  <span className="text-white font-tech-mono">30,000,000 $BLKBOX</span>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400 font-tech-mono">Platform:</span>
                  <span className="text-white font-tech-mono">Meteora.ag</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-neon-pink mb-2 font-tech-mono">PRESALE ENDS IN</h3>
                <CountdownTimer targetDate="2025-05-01T00:00:00Z" />
              </div>
            </div>

            <div className="bg-black/60 border border-neon-pink p-8 rounded-lg">
              <h2 className="text-xl font-bold text-neon-pink mb-4 font-tech-mono">PURCHASE $BLKBOX</h2>

              {walletConnected ? (
                <form onSubmit={handlePurchase} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-neon-cyan font-tech-mono">
                      AMOUNT TO PURCHASE
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      min="10000"
                      max="1000000"
                      className="bg-black border-zinc-800 focus:border-neon-pink text-white font-tech-mono"
                      placeholder="Enter amount (min 10,000)"
                    />
                    <p className="text-xs text-zinc-500 font-tech-mono">
                      Cost: {amount ? (Number(amount) * 0.00025).toFixed(4) : "0"} SOL
                    </p>
                  </div>

                  <CyberButton type="submit" className="w-full" glowColor="pink" disabled={loading}>
                    {loading ? <TerminalText text="PROCESSING..." className="animate-pulse" /> : "PURCHASE_TOKENS"}
                  </CyberButton>

                  <p className="text-xs text-zinc-500 font-tech-mono text-center">
                    Tokens will be automatically sent to your connected wallet after the presale ends.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-zinc-300 font-tech-mono mb-6">
                    Connect your wallet to participate in the $BLKBOX presale
                  </p>
                  <CyberButton onClick={handleConnect} glowColor="cyan" disabled={loading}>
                    {loading ? <TerminalText text="CONNECTING..." className="animate-pulse" /> : "CONNECT_WALLET"}
                  </CyberButton>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 bg-black/60 border border-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-neon-cyan mb-4 font-tech-mono">PRESALE PROGRESS</h2>

            <div className="mb-2 flex justify-between text-sm font-tech-mono">
              <span className="text-zinc-400">3,245 SOL raised</span>
              <span className="text-zinc-400">7,500 SOL goal</span>
            </div>

            <div className="w-full bg-zinc-800 rounded-full h-4 mb-4">
              <div
                className="bg-gradient-to-r from-neon-pink to-neon-cyan h-4 rounded-full"
                style={{ width: "43%" }}
              ></div>
            </div>

            <div className="flex justify-between text-sm font-tech-mono">
              <span className="text-zinc-400">43% complete</span>
              <span className="text-zinc-400">12,980,000 / 30,000,000 tokens sold</span>
            </div>
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
