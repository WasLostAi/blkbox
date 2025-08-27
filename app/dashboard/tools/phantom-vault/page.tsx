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
import PhantomVaultConstructor from "@/components/phantom-vault-constructor"

export default function PhantomVaultConstructorPage() {
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
        <AuthCheck toolPath="phantom-vault" requiredTier="SHADOW_ELITE">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="PHANTOM VAULT CONSTRUCTOR"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">
                Create secure, time-locked token vaults with advanced privacy features
              </p>
              <DataPulse className="my-6" />
            </div>

            {/* Phantom Vault Constructor Component */}
            <PhantomVaultConstructor />

            <div className="mt-8 bg-black/60 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-neon-cyan mb-4">About Phantom Vaults</h2>
              <p className="text-zinc-400 mb-4">
                Phantom Vaults are advanced token storage mechanisms that provide time-locked security and enhanced
                privacy. These vaults are designed to protect your assets from unauthorized access and market
                volatility.
              </p>
              <p className="text-zinc-400 mb-4">
                With Phantom Vaults, you can create custom vesting schedules, implement multi-signature access controls,
                and obfuscate transaction histories.
              </p>
              <div className="bg-green-900/20 border border-green-800 rounded p-4 mt-6">
                <h3 className="text-green-400 font-bold mb-2">SECURITY NOTICE</h3>
                <p className="text-zinc-400 text-sm">
                  Phantom Vaults provide enhanced security and privacy, but they are not foolproof. Always exercise
                  caution and follow best practices for securing your assets.
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
