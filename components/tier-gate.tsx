"use client"

import type { ReactNode } from "react"
import { useWallet } from "@/context/wallet-context"
import CyberCard from "./cyber-card"
import CyberButton from "./cyber-button"
import GlitchText from "./glitch-text"
import { Lock } from "lucide-react"

type Tier = "UNAUTHORIZED" | "ENTRY_LEVEL" | "OPERATOR" | "SHADOW_ELITE" | "PHANTOM_COUNCIL"

interface TierGateProps {
  children: ReactNode
  requiredTier: Tier | string
}

const tierLevels = {
  UNAUTHORIZED: 0,
  ENTRY_LEVEL: 1,
  OPERATOR: 2,
  SHADOW_ELITE: 3,
  PHANTOM_COUNCIL: 4,
}

export default function TierGate({ children, requiredTier }: TierGateProps) {
  const { connected, tier } = useWallet()

  // Convert string to tier if needed
  const requiredTierKey = requiredTier as keyof typeof tierLevels
  const userTierKey = tier as keyof typeof tierLevels

  // Check if user has sufficient tier level
  const hasAccess = connected && tierLevels[userTierKey] >= tierLevels[requiredTierKey]

  if (!connected) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <CyberCard className="max-w-md w-full">
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-pink/20 mb-4">
              <Lock className="h-8 w-8 text-neon-pink" />
            </div>
            <GlitchText text="WALLET REQUIRED" className="text-2xl font-bold text-neon-pink mb-4" />
            <p className="text-zinc-300 font-tech-mono mb-6">
              Connect your wallet to access the Shadow Protocol features.
            </p>
            <CyberButton glowColor="pink">CONNECT WALLET</CyberButton>
          </div>
        </CyberCard>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <CyberCard className="max-w-md w-full">
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-pink/20 mb-4">
              <Lock className="h-8 w-8 text-neon-pink" />
            </div>
            <GlitchText text="ACCESS DENIED" className="text-2xl font-bold text-neon-pink mb-4" />
            <p className="text-zinc-300 font-tech-mono mb-6">
              You need {requiredTier} tier or higher to access this feature.
            </p>
            <CyberButton glowColor="pink">UPGRADE TIER</CyberButton>
          </div>
        </CyberCard>
      </div>
    )
  }

  return <>{children}</>
}
