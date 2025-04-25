"use client"

import Link from "next/link"
import { Zap } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "@/components/ui/button"

export default function EmissionsSkimmingCard() {
  return (
    <CyberCard className="bg-black/60">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-neon-pink/10">
          <Zap className="h-6 w-6 text-neon-pink" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-neon-pink mb-1">Emissions Skimming</h3>
          <p className="text-zinc-400 font-tech-mono text-sm mb-4">
            Extract value from token emissions with surgical precision.
          </p>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/tools/emissions-skimming">
              <CyberButton size="sm" glowColor="pink">
                CONFIGURE
              </CyberButton>
            </Link>
            <div className="bg-neon-pink/10 text-neon-pink text-xs font-tech-mono px-2 py-1 rounded">
              PHANTOM COUNCIL
            </div>
          </div>
        </div>
      </div>
    </CyberCard>
  )
}
