"use client"

import Link from "next/link"
import { Eye } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "@/components/ui/button"

export default function LiquidityMirageCard() {
  return (
    <CyberCard className="bg-black/60">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-neon-cyan/10">
          <Eye className="h-6 w-6 text-neon-cyan" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-neon-cyan mb-1">Liquidity Mirage Creator</h3>
          <p className="text-zinc-400 font-tech-mono text-sm mb-4">
            Create temporary liquidity pools to attract attention and volume.
          </p>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/tools/liquidity-mirage">
              <CyberButton size="sm" glowColor="cyan">
                CONFIGURE
              </CyberButton>
            </Link>
            <div className="bg-neon-cyan/10 text-neon-cyan text-xs font-tech-mono px-2 py-1 rounded">SHADOW ELITE</div>
          </div>
        </div>
      </div>
    </CyberCard>
  )
}
