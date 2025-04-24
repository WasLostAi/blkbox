"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Zap,
  Lock,
  Users,
  Brain,
  Crosshair,
  Rocket,
  Target,
  Eye,
  RefreshCw,
  Lightbulb,
  AlertTriangle,
  Loader2,
  Wallet,
} from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import CyberCard from "@/components/cyber-card"
import DataPulse from "@/components/data-pulse"
import CyberButton from "@/components/cyber-button"
import WalletModal from "@/components/wallet-modal"
import { useWallet } from "@/context/wallet-context"
import ToolCard from "@/components/tool-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TokenPriceChart from "@/components/token-price-chart"
import TierProgress from "@/components/tier-progress"
import MarketActivity from "@/components/market-activity"
import GatedFeatures from "@/components/gated-features"
import GlitchText from "@/components/glitch-text"

export default function DashboardPage() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { connected, address, balance, tier, isAdmin } = useWallet()

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const openWalletModal = () => {
    setWalletModalOpen(true)
  }

  // Format balance with commas
  const formattedBalance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const tools = [
    {
      name: "Whale Tracker",
      description: "Monitor large wallet movements",
      icon: Users,
      href: "/dashboard/tools/whale-tracker",
      tier: "ENTRY_LEVEL",
      color: "cyan",
      monitoringStats: {
        statOneLabel: "WHALES TRACKED",
        statOneValue: "247",
        statTwoLabel: "ALERTS",
        statTwoValue: "12",
      },
    },
    {
      name: "Shadow Swap",
      description: "Private, zero-slippage token swaps",
      icon: Zap,
      href: "/dashboard/tools/shadow-swap",
      tier: "ENTRY_LEVEL",
      color: "pink",
      monitoringStats: {
        statOneLabel: "VOLUME (24H)",
        statOneValue: 89750,
        statTwoLabel: "ROUTES",
        statTwoValue: "8",
      },
    },
    {
      name: "AI Strategy Lab",
      description: "Generate custom trading algorithms",
      icon: Brain,
      href: "/dashboard/tools/ai-strategy",
      tier: "ENTRY_LEVEL",
      color: "pink",
      monitoringStats: {
        statOneLabel: "STRATEGIES",
        statOneValue: "3",
        statTwoLabel: "WIN RATE",
        statTwoValue: "68%",
      },
    },
    {
      name: "MEV Extraction",
      description: "Capture value from the mempool",
      icon: Zap,
      href: "/dashboard/tools/mev-extraction",
      tier: "OPERATOR",
      color: "pink",
      monitoringStats: {
        statOneLabel: "EXTRACTED",
        statOneValue: 12450,
        statTwoLabel: "PENDING",
        statTwoValue: "$3,200",
      },
    },
    {
      name: "Sniper Bot",
      description: "Microsecond-precision execution for token launches",
      icon: Crosshair,
      href: "/dashboard/tools/sniper-bot",
      tier: "OPERATOR",
      color: "cyan",
      monitoringStats: {
        statOneLabel: "TARGETS",
        statOneValue: "5",
        statTwoLabel: "SUCCESS RATE",
        statTwoValue: "92%",
      },
    },
    {
      name: "Dark Launch Toolkit",
      description: "Deploy tokens with perfect liquidity curves",
      icon: Rocket,
      href: "/dashboard/tools/dark-launch",
      tier: "SHADOW_ELITE",
      color: "pink",
      monitoringStats: {
        statOneLabel: "PROJECTS",
        statOneValue: "2",
        statTwoLabel: "LIQUIDITY",
        statTwoValue: "$215K",
      },
    },
    {
      name: "Liquidation Hunter",
      description: "Profit from market volatility",
      icon: Target,
      href: "/dashboard/tools/liquidation-hunter",
      tier: "SHADOW_ELITE",
      color: "cyan",
      monitoringStats: {
        statOneLabel: "POSITIONS",
        statOneValue: "8",
        statTwoLabel: "PROFIT",
        statTwoValue: "$5,320",
      },
    },
    {
      name: "Stealth Router",
      description: "Conceal transaction routes and minimize footprint",
      icon: Eye,
      href: "/dashboard/tools/stealth-router",
      tier: "OPERATOR",
      color: "pink",
      monitoringStats: {
        statOneLabel: "ROUTES",
        statOneValue: "12",
        statTwoLabel: "OBFUSCATION",
        statTwoValue: "97%",
      },
    },
    {
      name: "Wash Trading Engine",
      description: "Volume simulation with anti-detection algorithms",
      icon: RefreshCw,
      href: "/dashboard/tools/wash-trading",
      tier: "SHADOW_ELITE",
      color: "pink",
      monitoringStats: {
        statOneLabel: "VOLUME (24H)",
        statOneValue: 124500,
        statTwoLabel: "DETECTION RISK",
        statTwoValue: "Low",
      },
    },
    {
      name: "Flashloan Lab",
      description: "Create and test flashloan strategies",
      icon: Lightbulb,
      href: "/dashboard/tools/flashloan-lab",
      tier: "PHANTOM_COUNCIL",
      color: "cyan",
      monitoringStats: {
        statOneLabel: "CAPITAL",
        statOneValue: "$1.2M",
        statTwoLabel: "STRATEGIES",
        statTwoValue: "4",
      },
    },
    {
      name: "Market Manipulation Detection",
      description: "Identify and analyze market manipulation patterns",
      icon: AlertTriangle,
      href: "/dashboard/tools/manipulation-detection",
      tier: "SHADOW_ELITE",
      color: "cyan",
      monitoringStats: {
        statOneLabel: "ALERTS",
        statOneValue: "7",
        statTwoLabel: "CONFIDENCE",
        statTwoValue: "High",
      },
    },
  ]

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <MatrixBackground />
        <CircuitPattern />
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-neon-pink animate-spin mb-4" />
          <GlitchText text="LOADING DASHBOARD" className="text-xl font-tech-mono text-neon-cyan mb-2" />
          <DataPulse className="w-48 mt-4" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />

      <main className="flex-1 px-4 py-6 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <GlitchText
              text="$BLKBOX DASHBOARD"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">SHADOW PROTOCOL CONTROL CENTER</p>
            <DataPulse className="my-6" />
          </div>

          {!connected ? (
            <div className="bg-black/60 border border-neon-pink p-8 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-pink/20 mb-4">
                <Wallet className="h-8 w-8 text-neon-pink" />
              </div>
              <h2 className="text-2xl font-bold text-neon-pink mb-4 font-tech-mono">WALLET CONNECTION REQUIRED</h2>
              <p className="text-zinc-300 font-tech-mono mb-6 max-w-lg mx-auto">
                Connect your wallet to access the $BLKBOX dashboard. Your gateway to exclusive tools and weekly USDC
                dividends.
              </p>
              <CyberButton size="lg" glowColor="cyan" onClick={openWalletModal}>
                CONNECT_WALLET
              </CyberButton>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <CyberCard>
                  <h3 className="text-sm font-medium text-zinc-500 mb-1 font-tech-mono">Your $BLKBOX Balance</h3>
                  <p className="text-2xl font-bold text-neon-pink">{formattedBalance}</p>
                  <p className="text-sm text-zinc-400">Current tier: {tier.replace("_", " ")}</p>
                </CyberCard>
                <CyberCard variant="cyan">
                  <h3 className="text-sm font-medium text-zinc-500 mb-1 font-tech-mono">Next USDC Dividend</h3>
                  <p className="text-2xl font-bold text-neon-cyan">{(balance * 0.00005).toFixed(2)} USDC</p>
                  <p className="text-sm text-zinc-400">Estimated payout in 3 days</p>
                </CyberCard>
                <CyberCard>
                  <h3 className="text-sm font-medium text-zinc-500 mb-1 font-tech-mono">Total Earned</h3>
                  <p className="text-2xl font-bold text-neon-pink">{(balance * 0.00035).toFixed(2)} USDC</p>
                  <p className="text-sm text-zinc-400">Since you joined</p>
                </CyberCard>
              </div>

              <Tabs defaultValue="tools" className="w-full">
                <TabsList className="grid grid-cols-2 sm:grid-cols-5 mb-8">
                  <TabsTrigger value="tools" className="font-tech-mono">
                    TOOLS
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="font-tech-mono">
                    ANALYTICS
                  </TabsTrigger>
                  <TabsTrigger value="dividends" className="font-tech-mono">
                    DIVIDENDS
                  </TabsTrigger>
                  <TabsTrigger value="features" className="font-tech-mono">
                    FEATURES
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="font-tech-mono">
                    SETTINGS
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tools">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Render tool cards based on user's tier */}
                    {tools.map((tool, index) => {
                      // Define tier levels for comparison
                      const tierLevels = {
                        UNAUTHORIZED: 0,
                        ENTRY_LEVEL: 1,
                        OPERATOR: 2,
                        SHADOW_ELITE: 3,
                        PHANTOM_COUNCIL: 4,
                      }

                      const userTierLevel = tierLevels[tier] || 0
                      const toolTierLevel = tierLevels[tool.tier] || 0

                      // For tools that require higher tier than user has
                      if (toolTierLevel > userTierLevel) {
                        return (
                          <CyberCard key={index} className="bg-black/60">
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-full bg-zinc-800">
                                <tool.icon className="h-6 w-6 text-zinc-400" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-zinc-400 mb-1">{tool.name}</h3>
                                <p className="text-zinc-500 font-tech-mono text-sm mb-4">{tool.description}</p>
                                <div className="flex items-center gap-2 bg-zinc-800/50 text-zinc-400 px-3 py-1 rounded text-sm">
                                  <Lock size={14} />
                                  <span className="font-tech-mono">{tool.tier.replace("_", " ")} TIER REQUIRED</span>
                                </div>
                              </div>
                            </div>
                          </CyberCard>
                        )
                      }

                      // For tools the user has access to
                      return (
                        <ToolCard
                          key={index}
                          name={tool.name}
                          description={tool.description}
                          icon={tool.icon}
                          href={tool.href}
                          tier={tool.tier}
                          color={tool.color}
                          monitoringStats={tool.monitoringStats}
                        />
                      )
                    })}
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-zinc-400 font-tech-mono mb-4">Upgrade your tier to unlock more powerful tools</p>
                    <Link href="/dashboard/upgrade">
                      <CyberButton glowColor="pink">UPGRADE TIER</CyberButton>
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <CyberCard className="bg-black/60">
                        <h3 className="text-xl font-bold text-neon-cyan mb-4">$BLKBOX Price Chart</h3>
                        <TokenPriceChart />
                        <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
                          <div>
                            <p className="text-xs text-zinc-500 font-tech-mono">Current Price</p>
                            <p className="text-lg font-bold text-neon-pink">$0.000247</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 font-tech-mono">24h Change</p>
                            <p className="text-lg font-bold text-neon-cyan">+5.8%</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 font-tech-mono">7d Change</p>
                            <p className="text-lg font-bold text-neon-pink">+12.3%</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 font-tech-mono">Market Cap</p>
                            <p className="text-lg font-bold text-neon-cyan">$24.7M</p>
                          </div>
                        </div>
                      </CyberCard>
                    </div>

                    <div>
                      <TierProgress currentBalance={balance} />
                    </div>

                    <div className="md:col-span-3">
                      <MarketActivity />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dividends">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <CyberCard className="bg-black/60">
                        <h3 className="text-xl font-bold text-neon-pink mb-6">Dividend History</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                            <span className="text-zinc-400 font-tech-mono">April 15, 2025</span>
                            <span className="text-white font-tech-mono">{(balance * 0.00005).toFixed(2)} USDC</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                            <span className="text-zinc-400 font-tech-mono">April 8, 2025</span>
                            <span className="text-white font-tech-mono">{(balance * 0.00005).toFixed(2)} USDC</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                            <span className="text-zinc-400 font-tech-mono">April 1, 2025</span>
                            <span className="text-white font-tech-mono">{(balance * 0.00005).toFixed(2)} USDC</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                            <span className="text-zinc-400 font-tech-mono">March 25, 2025</span>
                            <span className="text-white font-tech-mono">{(balance * 0.00005).toFixed(2)} USDC</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                            <span className="text-zinc-400 font-tech-mono">March 18, 2025</span>
                            <span className="text-white font-tech-mono">{(balance * 0.00005).toFixed(2)} USDC</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                            <span className="text-zinc-400 font-tech-mono">March 11, 2025</span>
                            <span className="text-white font-tech-mono">{(balance * 0.00005).toFixed(2)} USDC</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                            <span className="text-zinc-400 font-tech-mono">March 4, 2025</span>
                            <span className="text-white font-tech-mono">{(balance * 0.00005).toFixed(2)} USDC</span>
                          </div>
                        </div>
                      </CyberCard>
                    </div>

                    <div>
                      <CyberCard className="bg-black/60 mb-6">
                        <h3 className="text-xl font-bold text-neon-cyan mb-4">Dividend Summary</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 font-tech-mono">Total Earned</span>
                            <span className="text-neon-pink font-tech-mono">{(balance * 0.00035).toFixed(2)} USDC</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 font-tech-mono">Next Payout</span>
                            <span className="text-neon-cyan font-tech-mono">{(balance * 0.00005).toFixed(2)} USDC</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 font-tech-mono">Payout Date</span>
                            <span className="text-white font-tech-mono">April 22, 2025</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 font-tech-mono">Payout Address</span>
                            <span className="text-white font-tech-mono">Same as connected wallet</span>
                          </div>
                        </div>
                      </CyberCard>

                      <CyberCard className="bg-black/60">
                        <h3 className="text-xl font-bold text-neon-pink mb-4">Dividend Boost</h3>
                        <p className="text-zinc-400 font-tech-mono text-sm mb-4">
                          Increase your holdings to earn more weekly dividends.
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 font-tech-mono">Current Rate</span>
                            <span className="text-neon-cyan font-tech-mono">0.005% weekly</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 font-tech-mono">Next Tier Rate</span>
                            <span className="text-neon-pink font-tech-mono">0.007% weekly</span>
                          </div>
                        </div>
                        <Link href="/dashboard/upgrade">
                          <CyberButton glowColor="cyan" className="w-full">
                            UPGRADE TIER
                          </CyberButton>
                        </Link>
                      </CyberCard>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features">
                  <GatedFeatures userTier={tier} />
                </TabsContent>

                <TabsContent value="settings">
                  <CyberCard className="bg-black/60">
                    <h3 className="text-xl font-bold text-neon-cyan mb-6">Account Settings</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400 font-tech-mono">Connected Wallet</span>
                        <span className="text-white font-tech-mono">
                          {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400 font-tech-mono">Current Tier</span>
                        <span className="text-neon-pink font-tech-mono">{tier.replace("_", " ")}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400 font-tech-mono">$BLKBOX Balance</span>
                        <span className="text-white font-tech-mono">{formattedBalance}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400 font-tech-mono">Dividend Payout Address</span>
                        <span className="text-white font-tech-mono">Same as connected wallet</span>
                      </div>
                    </div>
                  </CyberCard>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>

      <WalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </div>
  )
}
