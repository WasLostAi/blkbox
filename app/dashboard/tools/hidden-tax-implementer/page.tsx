"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"

export default function HiddenTaxImplementer() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-neon-pink/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_DASHBOARD</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <GlitchText
              text="HIDDEN TAX IMPLEMENTER"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">IMPLEMENT STEALTH TAXES ON TOKEN TRANSFERS</p>
            <DataPulse className="my-6" />
          </div>

          <CyberCard className="bg-black/60">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">Hidden Tax Implementer</h2>
              <p className="text-zinc-300 font-tech-mono">This tool implements stealth taxes on token transfers.</p>
            </div>
          </CyberCard>
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
