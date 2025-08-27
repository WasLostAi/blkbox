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
import QuantumStateManipulator from "@/components/quantum-state-manipulator"

export default function QuantumManipulatorPage() {
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
        <AuthCheck toolPath="quantum-manipulator" requiredTier="PHANTOM_COUNCIL">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="QUANTUM STATE MANIPULATOR"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-cyan mb-4"
              />
              <p className="text-neon-pink font-tech-mono">Harness quantum mechanics to influence token states</p>
              <DataPulse className="my-6" />
            </div>

            {/* Quantum State Manipulator Component */}
            <QuantumStateManipulator inDashboard={false} />

            <div className="mt-8 bg-black/60 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-neon-pink mb-4">About Quantum State Manipulation</h2>
              <p className="text-zinc-400 mb-4">
                The Quantum State Manipulator is a cutting-edge tool that leverages quantum computing principles to
                influence the state of tokens on the blockchain. By exploiting quantum superposition and entanglement,
                this tool can create subtle market movements that are impossible to trace.
              </p>
              <p className="text-zinc-400 mb-4">
                This technology is still experimental and results may vary. The Shadow Council has exclusive access to
                this tool as it represents the bleeding edge of market manipulation technology.
              </p>
              <div className="bg-red-900/20 border border-red-800 rounded p-4 mt-6">
                <h3 className="text-red-400 font-bold mb-2">EXPERIMENTAL TECHNOLOGY WARNING</h3>
                <p className="text-zinc-400 text-sm">
                  This tool is highly experimental and may produce unpredictable results. Use with extreme caution and
                  only on test networks until you are comfortable with its operation. The Shadow Council assumes no
                  responsibility for unintended consequences.
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
