"use client"

import { useState } from "react"
import {
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp,
  Zap,
  Brain,
  Code,
  LineChart,
  Wallet,
  Shield,
  Eye,
  Sparkles,
  Layers,
  Bot,
} from "lucide-react"
import { cn } from "@/lib/utils"
import CyberButton from "./cyber-button"
import CyberCard from "./cyber-card"
import DataPulse from "./data-pulse"
import GlitchText from "./glitch-text"
import TerminalText from "./terminal-text"

interface GatedFeaturesProps {
  userTier?: "UNAUTHORIZED" | "ENTRY_LEVEL" | "OPERATOR" | "SHADOW_ELITE" | "PHANTOM_COUNCIL"
}

export default function GatedFeatures({ userTier = "UNAUTHORIZED" }: GatedFeaturesProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showUnlockPrompt, setShowUnlockPrompt] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // Define tier access levels
  const tierLevels = {
    UNAUTHORIZED: 0,
    ENTRY_LEVEL: 1,
    OPERATOR: 2,
    SHADOW_ELITE: 3,
    PHANTOM_COUNCIL: 4,
  }

  const currentTierLevel = tierLevels[userTier]

  // Feature categories with their required tier levels
  const featureCategories = [
    {
      id: "token-research",
      name: "Token Research and Analytics",
      icon: <LineChart className="h-5 w-5" />,
      requiredTier: tierLevels.ENTRY_LEVEL,
      features: [
        "AI-powered token fundamentals analysis",
        "On-chain token flow pattern recognition",
        "Social sentiment aggregation and scoring",
        "Wallet concentration analysis for risk assessment",
        "Tokenomics modeling and simulation",
      ],
    },
    {
      id: "token-templates",
      name: "Token Project Templates",
      icon: <Layers className="h-5 w-5" />,
      requiredTier: tierLevels.OPERATOR,
      features: [
        "Community-governed DAO token template",
        "DeFi protocol governance token structure",
        "Play-to-earn gaming token ecosystem",
        "Social token framework with engagement incentives",
        "Deflationary meme coin framework",
      ],
    },
    {
      id: "ai-trading",
      name: "AI/Agentic/Algo Trading",
      icon: <Bot className="h-5 w-5" />,
      requiredTier: tierLevels.SHADOW_ELITE,
      features: [
        "Autonomous trading agents with customizable risk profiles",
        "Multi-agent trading systems with specialized roles",
        "Market making agent with dynamic parameter adjustment",
        "Reinforcement learning trading environment",
        "High-frequency trading optimization for Solana",
      ],
    },
    {
      id: "ai-indicators",
      name: "AI Indicators and Coding",
      icon: <Code className="h-5 w-5" />,
      requiredTier: tierLevels.OPERATOR,
      features: [
        "Custom indicator generation based on market conditions",
        "Automated coding of trading strategies from natural language",
        "Dynamic timeframe optimization for indicators",
        "Indicator fusion techniques for signal enhancement",
        "Neural network indicator library",
      ],
    },
    {
      id: "ai-product-dev",
      name: "AI Web3 Product Development",
      icon: <Sparkles className="h-5 w-5" />,
      requiredTier: tierLevels.SHADOW_ELITE,
      features: [
        "Product ideation engine using market gap analysis",
        "Token utility modeling and simulation",
        "DApp architecture recommendation system",
        "Product-market fit prediction algorithms",
        "Token economic design patterns library",
      ],
    },
    {
      id: "wallet-management",
      name: "Wallet Creation and Management",
      icon: <Wallet className="h-5 w-5" />,
      requiredTier: tierLevels.ENTRY_LEVEL,
      features: [
        "One-click SPL token wallet generation",
        "Multi-signature wallet configuration",
        "HD wallet management with custom derivation paths",
        "Hardware wallet integration (Ledger, Trezor)",
        "Transaction batching across wallets",
      ],
    },
    {
      id: "smart-contract",
      name: "Smart Contract Tools",
      icon: <Code className="h-5 w-5" />,
      requiredTier: tierLevels.OPERATOR,
      features: [
        "Contract template library for common use cases",
        "Automated audit preparation",
        "Vulnerability scanning integration",
        "Contract optimization for gas efficiency",
        "Contract verification automation",
      ],
    },
    {
      id: "ai-assistance",
      name: "Advanced AI Assistance",
      icon: <Brain className="h-5 w-5" />,
      requiredTier: tierLevels.ENTRY_LEVEL,
      features: [
        "Context-aware trading assistant with voice interaction",
        "Market narrative summarization and analysis",
        "Portfolio optimization recommendations",
        "Risk exposure warnings and mitigation suggestions",
        "Natural language strategy formulation",
      ],
    },
    {
      id: "stealth-tools",
      name: "Stealth and Privacy Tools",
      icon: <Eye className="h-5 w-5" />,
      requiredTier: tierLevels.SHADOW_ELITE,
      features: [
        "Transaction route obfuscation techniques",
        "Multi-hop transaction routing",
        "Private RPC endpoint network",
        "Transaction fingerprint minimization",
        "Wallet connection mixing",
      ],
    },
    {
      id: "extraction-tools",
      name: "Extraction and Capture Tools",
      icon: <Zap className="h-5 w-5" />,
      requiredTier: tierLevels.PHANTOM_COUNCIL,
      features: [
        "MEV extraction frameworks with custom targeting",
        "Alpha capture systems across DeFi protocols",
        "Strategic liquidation monitoring and execution",
        "Transaction timing optimization engine",
        "Block space priority acquisition mechanisms",
      ],
    },
  ]

  const toggleUnlock = () => {
    if (currentTierLevel > 0) {
      setIsUnlocked(!isUnlocked)
    } else {
      setShowUnlockPrompt(true)
    }
  }

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(categoryId)
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neon-pink mb-1">
            <GlitchText text="SHADOW PROTOCOL FEATURES" />
          </h2>
          <p className="text-zinc-400 font-tech-mono text-sm">
            Advanced tools and capabilities unlocked by $BLKBOX holdings
          </p>
        </div>
        <CyberButton
          onClick={toggleUnlock}
          variant={isUnlocked ? "default" : "outline"}
          glowColor={isUnlocked ? "cyan" : "pink"}
          className="gap-2"
        >
          {isUnlocked ? (
            <>
              <Unlock size={16} /> HIDE_FEATURES
            </>
          ) : (
            <>
              <Lock size={16} /> REVEAL_FEATURES
            </>
          )}
        </CyberButton>
      </div>

      <DataPulse className="mb-6" color={isUnlocked ? "cyan" : "pink"} />

      {showUnlockPrompt && !isUnlocked && (
        <CyberCard className="mb-6 bg-black/60">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-neon-pink/10">
              <Lock className="h-6 w-6 text-neon-pink" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neon-pink mb-1">Access Restricted</h3>
              <p className="text-zinc-400 font-tech-mono text-sm mb-4">
                You need to hold at least 10,000 $BLKBOX tokens to access the Shadow Protocol features.
              </p>
              <div className="flex items-center gap-2">
                <CyberButton size="sm" glowColor="pink" onClick={() => setShowUnlockPrompt(false)}>
                  CLOSE
                </CyberButton>
                <CyberButton size="sm" variant="outline" glowColor="cyan">
                  UPGRADE TIER
                </CyberButton>
              </div>
            </div>
          </div>
        </CyberCard>
      )}

      {isUnlocked ? (
        <div className="space-y-4">
          {featureCategories.map((category) => {
            const isAccessible = currentTierLevel >= category.requiredTier
            const isExpanded = expandedCategory === category.id

            return (
              <CyberCard
                key={category.id}
                className={cn("bg-black/60 transition-all duration-300", isAccessible ? "" : "opacity-70")}
                variant={isAccessible ? "pink" : "cyan"}
              >
                <div
                  className={cn(
                    "flex items-center justify-between cursor-pointer",
                    !isAccessible && "pointer-events-none",
                  )}
                  onClick={() => isAccessible && toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-full", isAccessible ? "bg-neon-pink/10" : "bg-zinc-800")}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className={cn("font-bold", isAccessible ? "text-neon-pink" : "text-zinc-500")}>
                        {category.name}
                      </h3>
                      {!isAccessible && (
                        <div className="flex items-center gap-1 text-xs text-zinc-500 font-tech-mono">
                          <Lock size={10} />
                          <span>
                            {Object.keys(tierLevels).find(
                              (key) => tierLevels[key as keyof typeof tierLevels] === category.requiredTier,
                            )}{" "}
                            TIER REQUIRED
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {isAccessible && (
                    <div className="text-neon-cyan">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  )}
                </div>

                {isExpanded && isAccessible && (
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <ul className="space-y-2">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-zinc-300">
                          <div className="mt-1 h-2 w-2 rounded-full bg-neon-cyan shrink-0" />
                          <span className="font-tech-mono text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CyberCard>
            )
          })}
        </div>
      ) : (
        <CyberCard className="bg-black/60 border-dashed border-zinc-800">
          <div className="flex flex-col items-center justify-center py-12">
            <Shield className="h-16 w-16 text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold text-zinc-500 mb-2 font-tech-mono">CLASSIFIED FEATURES</h3>
            <p className="text-zinc-600 font-tech-mono text-sm text-center max-w-md mb-6">
              The Shadow Protocol contains advanced tools and capabilities that are only revealed to authenticated
              $BLKBOX holders.
            </p>
            <TerminalText text="ACCESS LEVEL: RESTRICTED // AUTHENTICATION REQUIRED" className="text-zinc-500 mb-6" />
            <CyberButton onClick={toggleUnlock} glowColor="pink" className="gap-2">
              <Lock size={16} /> AUTHENTICATE & REVEAL
            </CyberButton>
          </div>
        </CyberCard>
      )}
    </div>
  )
}
