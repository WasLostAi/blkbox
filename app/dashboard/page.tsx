"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Wallet,
  Users,
  Zap,
  Eye,
  Brain,
  Shuffle,
  Target,
  Lightbulb,
  Crosshair,
  Rocket,
  Settings,
  Shield,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import WalletModal from "@/components/wallet-modal"
import GatedFeatures from "@/components/gated-features"
import TokenPriceChart from "@/components/token-price-chart"
import MarketActivity from "@/components/market-activity"
import TierProgress from "@/components/tier-progress"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"

export default function DashboardPage() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { connected, address, balance, tier, isAdmin } = useWallet()
  const router = useRouter()

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
    },
    {
      name: "Shadow Swap",
      description: "Private, zero-slippage token swaps",
      icon: Shuffle,
      href: "/dashboard/tools/shadow-swap",
      tier: "ENTRY_LEVEL",
    },
    {
      name: "AI Strategy Lab",
      description: "Generate custom trading algorithms",
      icon: Brain,
      href: "/dashboard/tools/ai-strategy",
      tier: "ENTRY_LEVEL",
    },
    {
      name: "MEV Extraction",
      description: "Capture value from the mempool",
      icon: Zap,
      href: "/dashboard/tools/mev-extraction",
      tier: "OPERATOR",
    },
    {
      name: "Sniper Bot",
      description: "Microsecond-precision execution for token launches",
      icon: Crosshair,
      href: "/dashboard/tools/sniper-bot",
      tier: "OPERATOR",
    },
    {
      name: "Dark Launch Toolkit",
      description: "Deploy tokens with perfect liquidity curves",
      icon: Rocket,
      href: "/dashboard/tools/dark-launch",
      tier: "SHADOW_ELITE",
    },
    {
      name: "Liquidation Hunter",
      description: "Profit from market volatility",
      icon: Target,
      href: "/dashboard/tools/liquidation-hunter",
      tier: "SHADOW_ELITE",
    },
    {
      name: "Stealth Router",
      description: "Conceal transaction routes and minimize footprint",
      icon: Eye,
      href: "/dashboard/tools/stealth-router",
      tier: "SHADOW_ELITE",
    },
    {
      name: "Flashloan Lab",
      description: "Create and test flashloan strategies",
      icon: Lightbulb,
      href: "/dashboard/tools/flashloan-lab",
      tier: "PHANTOM_COUNCIL",
    },
    {
      name: "Wash Trading Engine",
      description: "Automate wash trading to inflate volume",
      icon: Shuffle,
      href: "/dashboard/tools/wash-trading-engine",
      tier: "PHANTOM_COUNCIL",
    },
    {
      name: "Market Manipulation Detection",
      description: "Identify and exploit market manipulation tactics",
      icon: Eye,
      href: "/dashboard/tools/market-manipulation-detection",
      tier: "SHADOW_ELITE",
    },
    {
      name: "Interoperability Hijacker",
      description: "Exploit interoperability vulnerabilities",
      icon: Zap,
      href: "/dashboard/tools/shadow-protocol-interoperability-hijacker",
      tier: "PHANTOM_COUNCIL",
    },
    {
      name: "Quantum Manipulator",
      description: "Manipulate token states with quantum computing",
      icon: Brain,
      href: "/dashboard/tools/quantum-state-token-manipulator",
      tier: "PHANTOM_COUNCIL",
    },
    {
      name: "Temporal Fragmentation",
      description: "Fragment transactions across time",
      icon: Target,
      href: "/dashboard/tools/temporal-fragmentation-engine",
      tier: "PHANTOM_COUNCIL",
    },
    {
      name: "Function Masquerading",
      description: "Hide transaction intent",
      icon: Shield,
      href: "/dashboard/tools/function-masquerading-system",
      tier: "SHADOW_ELITE",
    },
    {
      name: "Hidden Tax Implementer",
      description: "Implement stealth taxes on token transfers",
      icon: Rocket,
      href: "/dashboard/tools/hidden-tax-implementer",
      tier: "PHANTOM_COUNCIL",
    },
    {
      name: "Phantom Vault Constructor",
      description: "Create impenetrable vaults",
      icon: Crosshair,
      href: "/dashboard/tools/phantom-vault-constructor",
      tier: "SHADOW_ELITE",
    },
    {
      name: "Emissions Skimming",
      description: "Skim rewards from token emissions programs",
      icon: Lightbulb,
      href: "/dashboard/tools/emissions-skimming-system",
      tier: "PHANTOM_COUNCIL",
    },
    {
      name: "Liquidity Mirage",
      description: "Create illusions of liquidity",
      icon: Shuffle,
      href: "/dashboard/tools/liquidity-mirage-creator",
      tier: "SHADOW_ELITE",
    },
    {
      name: "Sandwich Attack",
      description: "Automate sandwich attacks",
      icon: Eye,
      href: "/dashboard/tools/sandwich-attack-automation",
      tier: "OPERATOR",
    },
    {
      name: "Token Creation",
      description: "Launch custom tokens",
      icon: Zap,
      href: "/dashboard/tools/token-creation-wizard",
      tier: "SHADOW_ELITE",
    },
    {
      name: "Automated Arbitrage",
      description: "Profit from price discrepancies",
      icon: Brain,
      href: "/dashboard/tools/automated-arbitrage",
      tier: "OPERATOR",
    },
    {
      name: "Upgrade",
      href: "/dashboard/upgrade",
      icon: Zap,
      requiresAuth: true,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-neon-pink/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors">
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_HOME</span>
          </Link>

          <WalletConnector buttonSize="sm" glowColor="cyan" />
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <GlitchText
              text="$BLKBOX DASHBOARD"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">SHADOW PROTOCOL CONTROL CENTER</p>
            <DataPulse className="my-6" />
          </div>

          {isAdmin && (
            <div className="mb-6">
              <Link href="/admin/settings">
                <CyberButton glowColor="pink" className="gap-2">
                  <Settings className="h-4 w-4" />
                  ADMIN SETTINGS
                </CyberButton>
              </Link>
            </div>
          )}

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
                  <p className="text-sm text-zinc-400">Current tier: {tier ? tier.replace("_", " ") : "Loading..."}</p>
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
                <TabsList className="grid grid-cols-5 mb-8">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                      <CyberCard key={index} className="bg-black/60">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-neon-pink/10">{tool.icon}</div>
                          <div>
                            <h3 className="text-lg font-bold text-neon-pink mb-1">{tool.name}</h3>
                            <p className="text-zinc-400 font-tech-mono text-sm mb-4">{tool.description}</p>
                            <div className="flex items-center gap-2">
                              <Link href={tool.href}>
                                <CyberButton size="sm" glowColor="pink">
                                  LAUNCH
                                </CyberButton>
                              </Link>
                              <div className="bg-neon-pink/10 text-neon-pink text-xs font-tech-mono px-2 py-1 rounded">
                                {tool.tier.replace("_", " ")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CyberCard>
                    ))}
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
                        <div className="flex justify-between items-center mt-4">
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
                        <span className="text-neon-pink font-tech-mono">
                          {tier ? tier.replace("_", " ") : "Loading..."}
                        </span>
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
