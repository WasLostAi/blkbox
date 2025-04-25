"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import AuthCheck from "@/components/auth-check"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"
import TemporalFragmentationEngine from "@/components/temporal-fragmentation-card"

export default function TemporalFragmentationEnginePage() {
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
            title="Back to Dashboard"
          >
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_DASHBOARD</span>
          </Link>

          <WalletConnector buttonSize="sm" glowColor="cyan" />
        </div>
      </header>

      <main className="flex-1 container py-12">
        <AuthCheck toolPath="temporal-fragmentation" requiredTier="PHANTOM_COUNCIL">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="TEMPORAL FRAGMENTATION ENGINE"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">Orchestrate token movements across time to maximize alpha</p>
              <DataPulse className="my-6" />
            </div>

            {/* Temporal Fragmentation Engine Component */}
            <TemporalFragmentationEngine inDashboard={false} />

            <div className="mt-8 bg-black/60 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-neon-cyan mb-4">About Temporal Fragmentation</h2>
              <p className="text-zinc-400 mb-4">
                The Temporal Fragmentation Engine is an advanced tool that allows Shadow Council members to orchestrate
                token movements across time, creating fragmented trading patterns that are impossible to track by
                conventional means.
              </p>
              <p className="text-zinc-400 mb-4">
                By fragmenting transactions across multiple timeframes, you can effectively manipulate market perception
                while maintaining plausible deniability. This tool is particularly effective for creating artificial
                price movements that trigger bot activity.
              </p>
              <div className="bg-red-900/20 border border-red-800 rounded p-4 mt-6">
                <h3 className="text-red-400 font-bold mb-2">SECURITY WARNING</h3>
                <p className="text-zinc-400 text-sm">
                  This tool operates in a legal gray area. Use with caution and only on networks where regulatory
                  oversight is minimal. The Shadow Council assumes no responsibility for legal consequences resulting
                  from improper use.
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
