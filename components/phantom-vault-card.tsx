"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "@/components/ui/button"

export default function PhantomVaultCard() {
  return (
    <CyberCard className="bg-black/60">
      <div className="flex flex-col items-center">
        <div className="p-3 rounded-full bg-neon-pink/10 mb-2">
          <Lock className="h-6 w-6 text-neon-pink" />
        </div>
        <h3 className="text-lg font-bold text-neon-pink mb-1 text-center">Phantom Vault Constructor</h3>
        <p className="text-zinc-400 font-tech-mono text-sm mb-4 text-left w-full">
          Create secure, time-locked token vaults with advanced privacy features.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/tools/phantom-vault">
            <CyberButton size="sm" glowColor="pink">
              LAUNCH
            </CyberButton>
          </Link>
          <div className="bg-neon-pink/10 text-neon-pink text-xs font-tech-mono px-2 py-1 rounded">SHADOW ELITE</div>
        </div>
      </div>
    </CyberCard>
  )
}
