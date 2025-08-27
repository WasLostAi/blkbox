"use client"

import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"
import CyberCard from "@/components/cyber-card"

export default function HiddenTaxImplementerPage() {
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <GlitchText
              text="HIDDEN TAX IMPLEMENTER"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">Obfuscate transaction taxes for maximum stealth</p>
            <DataPulse className="my-6" />
          </div>

          {/* Hidden Tax Implementer Content */}
          <CyberCard className="bg-black/60">
            <div className="p-6 text-center">
              <Shield className="h-12 w-12 text-neon-pink mx-auto mb-4" />
              <h3 className="text-xl font-bold text-neon-cyan mb-2">Hidden Tax Implementation</h3>
              <p className="text-zinc-400 font-tech-mono mb-4">
                Deploy stealth transaction taxes that remain undetectable to standard blockchain explorers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-black/40 border border-zinc-800 rounded-lg p-4">
                  <h4 className="text-neon-pink font-bold mb-2">Features</h4>
                  <ul className="text-zinc-400 text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-neon-pink"></div>
                      <span>Obfuscated transaction fee collection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-neon-pink"></div>
                      <span>Stealth redistribution mechanisms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-neon-pink"></div>
                      <span>Customizable tax parameters</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/40 border border-zinc-800 rounded-lg p-4">
                  <h4 className="text-neon-cyan font-bold mb-2">Controls</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-zinc-400 text-sm mb-1">Tax Rate</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        defaultValue="3"
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-zinc-500 mt-1">
                        <span>0%</span>
                        <span>10%</span>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <button className="bg-neon-pink/20 hover:bg-neon-pink/30 text-neon-pink px-4 py-2 rounded-md font-tech-mono text-sm transition-colors">
                        DEPLOY TAX SYSTEM
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CyberCard>

          <div className="mt-8 bg-black/60 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-neon-cyan mb-4">About Hidden Tax Implementation</h2>
            <p className="text-zinc-400 mb-4">
              The Hidden Tax Implementer tool allows Shadow Elite members to obfuscate transaction taxes, making it
              difficult to track and analyze on-chain activity.
            </p>
            <p className="text-zinc-400 mb-4">
              This tool is useful for hiding the purpose of transactions, preventing front-running, and maintaining
              privacy while still collecting fees for your protocol.
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
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
