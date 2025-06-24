"use client"

import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import AuthCheck from "@/components/auth-check"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"
import CyberCard from "@/components/cyber-card"
import FunctionMasqueradingCard from "@/components/function-masquerading-card"

export default function FunctionMasqueradingPage() {
  const { connected } = useWallet()

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
        <AuthCheck toolPath="function-masquerading" requiredTier="SHADOW_ELITE">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="FUNCTION MASQUERADING"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">Obfuscate smart contract interactions</p>
              <DataPulse className="my-6" />
            </div>

            {/* Function Masquerading Content */}
            <FunctionMasqueradingCard />

            <CyberCard className="bg-black/60">
              <div className="p-6 text-center">
                <Shield className="h-12 w-12 text-neon-pink mx-auto mb-4" />
                <h3 className="text-xl font-bold text-neon-cyan mb-2">Under Development</h3>
                <p className="text-zinc-400 font-tech-mono">
                  This tool is currently under development. Check back soon for updates.
                </p>
              </div>
            </CyberCard>

            <div className="mt-8 bg-black/60 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-neon-cyan mb-4">About Function Masquerading</h2>
              <p className="text-zinc-400 mb-4">
                The Function Masquerading tool allows Shadow Elite members to obfuscate their smart contract
                interactions, making it difficult to track and analyze their on-chain activity.
              </p>
              <p className="text-zinc-400 mb-4">
                This tool is particularly useful for hiding the purpose of transactions, preventing front-running, and
                maintaining privacy.
              </p>
              <div className="bg-yellow-900/20 border border-yellow-800 rounded p-4 mt-6">
                <h3 className="text-yellow-400 font-bold mb-2">DISCLAIMER</h3>
                <p className="text-zinc-400 text-sm">
                  This tool is intended for advanced users only. Misuse of function masquerading techniques may have
                  unintended consequences. The Shadow Council assumes no responsibility for any losses or damages
                  resulting from the use of this tool.
                </p>
              </div>
            </div>
          </div>
        </AuthCheck>
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
