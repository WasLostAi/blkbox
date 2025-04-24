"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { useWallet, type WalletTier } from "@/context/wallet-context"
import CyberCard from "./cyber-card"
import CyberButton from "./cyber-button"
import GlitchText from "./glitch-text"

interface TierGateProps {
  requiredTier: WalletTier
  children: React.ReactNode
}

export default function TierGate({ requiredTier, children }: TierGateProps) {
  const { connected, tier } = useWallet()
  const router = useRouter()

  // Define tier levels for comparison
  const tierLevels = {
    UNAUTHORIZED: 0,
    ENTRY_LEVEL: 1,
    OPERATOR: 2,
    SHADOW_ELITE: 3,
    PHANTOM_COUNCIL: 4,
  }

  const currentTierLevel = tierLevels[tier]
  const requiredTierLevel = tierLevels[requiredTier]

  const hasAccess = connected && currentTierLevel >= requiredTierLevel

  // Redirect to dashboard if not connected
  useEffect(() => {
    if (!connected) {
      router.push("/dashboard")
    }
  }, [connected, router])

  if (!connected) {
    return null // Will redirect in the useEffect
  }

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <CyberCard className="max-w-md w-full bg-black/60 text-center">
          <div className="p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-pink/20 mb-4">
              <Lock className="h-8 w-8 text-neon-pink" />
            </div>
            <GlitchText text="ACCESS DENIED" className="text-2xl font-bold text-neon-pink mb-4" />
            <p className="text-zinc-300 font-tech-mono mb-6">
              This feature requires {requiredTier.replace("_", " ")} tier access. Your current tier is{" "}
              {tier.replace("_", " ")}.
            </p>
            <div className="flex flex-col gap-4">
              <CyberButton onClick={() => router.push("/dashboard/upgrade")} glowColor="cyan">
                UPGRADE TIER
              </CyberButton>
              <CyberButton onClick={() => router.push("/dashboard")} variant="outline" glowColor="pink">
                RETURN TO DASHBOARD
              </CyberButton>
            </div>
          </div>
        </CyberCard>
      </div>
    )
  }

  return <>{children}</>
}
