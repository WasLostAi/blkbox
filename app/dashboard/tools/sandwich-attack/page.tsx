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
import SandwichAttackAutomationSystem from "@/components/sandwich-attack-automation-system"

export default function SandwichAttackAutomationPage() {
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
        <AuthCheck toolPath="sandwich-attack" requiredTier="PHANTOM_COUNCIL">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="SANDWICH ATTACK AUTOMATION"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">
                Automate sandwich attacks to extract value from unsuspecting traders
              </p>
              <DataPulse className="my-6" />
            </div>

            {/* Sandwich Attack Automation System Component */}
            <SandwichAttackAutomationSystem />
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
