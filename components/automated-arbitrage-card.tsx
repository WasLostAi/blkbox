"use client"

import Link from "next/link"
import { Shuffle } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "@/components/ui/button"

export default function AutomatedArbitrageCard() {
  return (
    <CyberCard className="bg-black/60">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-neon-cyan/10">
          <Shuffle className="h-6 w-6 text-neon-cyan" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-neon-cyan mb-1">Automated Arbitrage</h3>
          <p className="text-zinc-400 font-tech-mono text-sm mb-4">
            Automatically exploit arbitrage opportunities across multiple exchanges.
          </p>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/tools/automated-arbitrage">
              <CyberButton size="sm" glowColor="cyan">
                CONFIGURE
              </CyberButton>
            </Link>
            <div className="bg-neon-cyan/10 text-neon-cyan text-xs font-tech-mono px-2 py-1 rounded">
              PHANTOM COUNCIL
            </div>
          </div>
        </div>
      </div>
    </CyberCard>
  )
}
