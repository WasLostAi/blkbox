"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Wallet,
  Users,
  Zap,
  Lock,
  Brain,
  Loader2,
  Shuffle,
  Target,
  Lightbulb,
  Clock,
  Droplets,
  LinkIcon,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import TokenPriceChart from "@/components/token-price-chart"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"
import MarketActivity from "@/components/market-activity"
import TierProgress from "@/components/tier-progress"

export default function DashboardPage() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { connected, address, balance, tier } = useWallet()
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
      name: "MEV Extraction",
      description: "Capture value from the mempool",
      icon: Zap,
      href: "/dashboard/tools/mev-extraction",
      tier: "OPERATOR",
    },
    {
      name: "AI Strategy Lab",
      description: "Generate custom trading algorithms",
      icon: Brain,
      href: "/dashboard/tools/ai-strategy",
      tier: "ENTRY_LEVEL",
    },
    {
      name: "Shadow Swap",
      description: "Private, zero-slippage token swaps",
      icon: Shuffle,
      href: "/dashboard/tools/shadow-swap",
      tier: "OPERATOR",
    },
    {
      name: "Quantum State Manipulator",
      description: "Exploit parallel transaction processing",
      icon: Zap,
      href: "/dashboard/tools/quantum-state-manipulator",
      tier: "SHADOW_ELITE",
    },
    {
      name: "Temporal Fragmentation",
      description: "Exploit time-based processing mechanics",
      icon: Clock,
      href: "/dashboard/tools/temporal-fragmentation",
      tier: "PHANTOM_COUNCIL",
    },
    {
      name: "Liquidity Mirage Creator",
      description: "Create synthetic liquidity positions",
      icon: Droplets,
      href: "/dashboard/tools/liquidity-mirage",
      tier: "OPERATOR",
    },
    {
      name: "Shadow Protocol Hijacker",
      description: "Exploit cross-chain bridge vulnerabilities",
      icon: LinkIcon,
      href: "/dashboard/tools/shadow-protocol",
      tier: "PHANTOM_COUNCIL",
    },
    {
      name: "Liquidation Hunter",
      description: "Profit from market volatility",
      icon: Target,
      href: "/dashboard/tools/liquidation-hunter",
      tier: "SHADOW_COUNCIL",
    },
    {
      name: "Flashloan Lab",
      description: "Create and test flashloan strategies",
      icon: Lightbulb,
      href: "/dashboard/tools/flashloan-lab",
      tier: "SHADOW_COUNCIL",
      comingSoon: true,
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => {
                      const isAccessible =
                        tier === "PHANTOM_COUNCIL" ||
                        (tier === "SHADOW_ELITE" && tool.tier !== "PHANTOM_COUNCIL") ||
                        (tier === "OPERATOR" && (tool.tier === "OPERATOR" || tool.tier === "ENTRY_LEVEL")) ||
                        (tier === "ENTRY_LEVEL" && tool.tier === "ENTRY_LEVEL")

                      return (
                        <CyberCard key={tool.name} className="bg-black/60">
                          <div className="flex items-start gap-4">
                            <div
                              className={
                                isAccessible ? "p-3 rounded-full bg-neon-pink/10" : "p-3 rounded-full bg-zinc-800"
                              }
                            >
                              <tool.icon
                                className={isAccessible ? "h-6 w-6 text-neon-pink" : "h-6 w-6 text-zinc-400"}
                              />
                            </div>
                            <div>
                              <h3
                                className={
                                  isAccessible
                                    ? "text-lg font-bold text-neon-pink mb-1"
                                    : "text-lg font-bold text-zinc-400 mb-1"
                                }
                              >
                                {tool.name}
                              </h3>
                              <p
                                className={
                                  isAccessible
                                    ? "text-zinc-400 font-tech-mono text-sm mb-4"
                                    : "text-zinc-500 font-tech-mono text-sm mb-4"
                                }
                              >
                                {tool.description}
                              </p>
                              <div className="flex items-center gap-2">
                                {!isAccessible ? (
                                  <div className="flex items-center gap-2 bg-zinc-800/50 text-zinc-400 px-3 py-1 rounded text-sm">
                                    <Lock size={14} />
                                    <span className="font-tech-mono">{tool.tier.replace("_", " ")} TIER REQUIRED</span>
                                  </div>
                                ) : tool.comingSoon ? (
                                  <div className="flex items-center gap-2 bg-amber-500/10 text-amber-500 px-3 py-1 rounded text-sm">
                                    <Clock size={14} />
                                    <span className="font-tech-mono">COMING SOON</span>
                                  </div>
                                ) : (
                                  <>
                                    <Link href={tool.href}>
                                      <CyberButton size="sm" glowColor="pink">
                                        LAUNCH
                                      </CyberButton>
                                    </Link>
                                    <div className="bg-neon-pink/10 text-neon-pink text-xs font-tech-mono px-2 py-1 rounded">
                                      {tool.tier.replace("_", " ")}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </CyberCard>
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
                            <p className="text-lg font-bold text-neon-cyan">+12.3%</p>
                          </div>
                        </div>
                      </CyberCard>
                    </div>
                    <div>
                      <CyberCard className="bg-black/60">
                        <h3 className="text-xl font-bold text-neon-cyan mb-4">Market Stats</h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-zinc-500 font-tech-mono">Market Cap</p>
                            <p className="text-lg font-bold text-neon-pink">$24,700,000</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 font-tech-mono">24h Volume</p>
                            <p className="text-lg font-bold text-neon-pink">$1,245,678</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 font-tech-mono">Circulating Supply</p>
                            <p className="text-lg font-bold text-neon-pink">100,000,000 BLKBOX</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 font-tech-mono">Holders</p>
                            <p className="text-lg font-bold text-neon-pink">2,478</p>
                          </div>
                        </div>
                      </CyberCard>
                    </div>
                  </div>

                  <div className="mt-6">
                    <CyberCard className="bg-black/60">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4">Recent Market Activity</h3>
                      <MarketActivity />
                    </CyberCard>
                  </div>
                </TabsContent>

                <TabsContent value="dividends">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CyberCard className="bg-black/60">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4">Dividend History</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 border border-neon-pink/20 rounded-md bg-black/40">
                          <div>
                            <p className="text-neon-pink font-tech-mono">APR 15, 2024</p>
                            <p className="text-sm text-zinc-400">Weekly Distribution</p>
                          </div>
                          <div className="text-right">
                            <p className="text-neon-cyan font-bold">0.75 USDC</p>
                            <p className="text-xs text-zinc-500">From 15,000 $BLKBOX</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 border border-neon-pink/20 rounded-md bg-black/40">
                          <div>
                            <p className="text-neon-pink font-tech-mono">APR 08, 2024</p>
                            <p className="text-sm text-zinc-400">Weekly Distribution</p>
                          </div>
                          <div className="text-right">
                            <p className="text-neon-cyan font-bold">0.75 USDC</p>
                            <p className="text-xs text-zinc-500">From 15,000 $BLKBOX</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 border border-neon-pink/20 rounded-md bg-black/40">
                          <div>
                            <p className="text-neon-pink font-tech-mono">APR 01, 2024</p>
                            <p className="text-sm text-zinc-400">Weekly Distribution</p>
                          </div>
                          <div className="text-right">
                            <p className="text-neon-cyan font-bold">0.75 USDC</p>
                            <p className="text-xs text-zinc-500">From 15,000 $BLKBOX</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 border border-neon-pink/20 rounded-md bg-black/40">
                          <div>
                            <p className="text-neon-pink font-tech-mono">MAR 25, 2024</p>
                            <p className="text-sm text-zinc-400">Weekly Distribution</p>
                          </div>
                          <div className="text-right">
                            <p className="text-neon-cyan font-bold">0.75 USDC</p>
                            <p className="text-xs text-zinc-500">From 15,000 $BLKBOX</p>
                          </div>
                        </div>
                      </div>
                    </CyberCard>

                    <CyberCard className="bg-black/60">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4">Dividend Stats</h3>
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs text-zinc-500 font-tech-mono">Total Earned</p>
                          <p className="text-2xl font-bold text-neon-pink">5.25 USDC</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-tech-mono">Next Distribution</p>
                          <p className="text-2xl font-bold text-neon-pink">0.75 USDC</p>
                          <p className="text-sm text-zinc-400">In 3 days</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-tech-mono">Current APY</p>
                          <p className="text-2xl font-bold text-neon-cyan">26.4%</p>
                          <p className="text-sm text-zinc-400">Based on current token price</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-tech-mono">Dividend Pool</p>
                          <p className="text-2xl font-bold text-neon-pink">24,578 USDC</p>
                          <p className="text-sm text-zinc-400">Total for next distribution</p>
                        </div>
                      </div>
                    </CyberCard>
                  </div>
                </TabsContent>

                <TabsContent value="features">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CyberCard className="bg-black/60">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4">Your Tier Progress</h3>
                      <TierProgress />
                      <div className="mt-6">
                        <h4 className="text-lg font-bold text-neon-pink mb-2">
                          Current Tier: {tier.replace("_", " ")}
                        </h4>
                        <p className="text-zinc-400 mb-4">
                          You need {tier === "ENTRY_LEVEL" ? "40,000" : tier === "OPERATOR" ? "200,000" : "750,000"}{" "}
                          more $BLKBOX to reach the next tier.
                        </p>
                        <Link href="/dashboard/upgrade">
                          <CyberButton glowColor="pink">UPGRADE TIER</CyberButton>
                        </Link>
                      </div>
                    </CyberCard>

                    <CyberCard className="bg-black/60">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4">Tier Benefits</h3>
                      <div className="space-y-4">
                        <div className="p-3 border border-neon-pink/20 rounded-md bg-black/40">
                          <h4 className="text-neon-pink font-tech-mono">ENTRY LEVEL</h4>
                          <p className="text-sm text-zinc-400 mb-2">10,000 $BLKBOX</p>
                          <ul className="text-sm text-zinc-300 space-y-1">
                            <li>• Basic toolset access</li>
                            <li>• Weekly USDC dividends</li>
                            <li>• Whale Tracker</li>
                            <li>• AI Strategy Lab</li>
                          </ul>
                        </div>
                        <div className="p-3 border border-neon-pink/20 rounded-md bg-black/40">
                          <h4 className="text-neon-pink font-tech-mono">OPERATOR</h4>
                          <p className="text-sm text-zinc-400 mb-2">50,000 $BLKBOX</p>
                          <ul className="text-sm text-zinc-300 space-y-1">
                            <li>• All Entry Level features</li>
                            <li>• MEV Extraction</li>
                            <li>• Shadow Swap</li>
                            <li>• Liquidity Mirage Creator</li>
                          </ul>
                        </div>
                        <div className="p-3 border border-neon-pink/20 rounded-md bg-black/40">
                          <h4 className="text-neon-pink font-tech-mono">SHADOW ELITE</h4>
                          <p className="text-sm text-zinc-400 mb-2">250,000 $BLKBOX</p>
                          <ul className="text-sm text-zinc-300 space-y-1">
                            <li>• All Operator features</li>
                            <li>• Quantum State Manipulator</li>
                            <li>• Priority execution</li>
                            <li>• Alpha group access</li>
                          </ul>
                        </div>
                        <div className="p-3 border border-neon-pink/20 rounded-md bg-black/40">
                          <h4 className="text-neon-pink font-tech-mono">PHANTOM COUNCIL</h4>
                          <p className="text-sm text-zinc-400 mb-2">1,000,000+ $BLKBOX</p>
                          <ul className="text-sm text-zinc-300 space-y-1">
                            <li>• All Shadow Elite features</li>
                            <li>• Temporal Fragmentation</li>
                            <li>• Shadow Protocol Hijacker</li>
                            <li>• Governance rights</li>
                          </ul>
                        </div>
                      </div>
                    </CyberCard>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CyberCard className="bg-black/60">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4">Account Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-zinc-500 font-tech-mono">Connected Wallet</p>
                          <p className="text-lg font-bold text-neon-pink truncate">{address}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-tech-mono">Notification Settings</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-zinc-300">Dividend Alerts</p>
                            <div className="w-12 h-6 bg-neon-pink/20 rounded-full relative">
                              <div className="absolute left-1 top-1 w-4 h-4 bg-neon-pink rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-zinc-300">Price Alerts</p>
                            <div className="w-12 h-6 bg-neon-pink/20 rounded-full relative">
                              <div className="absolute left-1 top-1 w-4 h-4 bg-neon-pink rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-zinc-300">Tool Updates</p>
                            <div className="w-12 h-6 bg-neon-pink/20 rounded-full relative">
                              <div className="absolute left-7 top-1 w-4 h-4 bg-neon-pink rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4">
                          <CyberButton glowColor="pink" className="w-full">
                            SAVE SETTINGS
                          </CyberButton>
                        </div>
                      </div>
                    </CyberCard>

                    <CyberCard className="bg-black/60">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-zinc-500 font-tech-mono">Two-Factor Authentication</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-zinc-300">Enable 2FA</p>
                            <div className="w-12 h-6 bg-neon-pink/20 rounded-full relative">
                              <div className="absolute left-7 top-1 w-4 h-4 bg-neon-pink rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-tech-mono">Transaction Signing</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-zinc-300">Require confirmation for all transactions</p>
                            <div className="w-12 h-6 bg-neon-pink/20 rounded-full relative">
                              <div className="absolute left-7 top-1 w-4 h-4 bg-neon-pink rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-tech-mono">Session Timeout</p>
                          <select className="w-full bg-black border border-neon-pink/30 text-zinc-300 rounded-md p-2 mt-2">
                            <option>15 minutes</option>
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>Never</option>
                          </select>
                        </div>
                        <div className="pt-4">
                          <CyberButton glowColor="pink" className="w-full">
                            SAVE SECURITY SETTINGS
                          </CyberButton>
                        </div>
                      </div>
                    </CyberCard>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
