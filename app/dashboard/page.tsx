"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import { Loader2, Wallet } from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import CyberCard from "@/components/cyber-card"
import DataPulse from "@/components/data-pulse"
import CyberButton from "@/components/ui/button"
import WalletModal from "@/components/wallet-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TokenPriceChart from "@/components/token-price-chart"
import TierProgress from "@/components/tier-progress"
import MarketActivity from "@/components/market-activity"
import GatedFeatures from "@/components/gated-features"
import GlitchText from "@/components/glitch-text"
import { useWallet } from "@/context/wallet-context"
import DraggableDashboard from "@/components/draggable-dashboard"
import { getUserAccessLevel } from "@/utils/access-control"

// Define tools with their tiers
const tools = [
  {
    id: "quantum-manipulator",
    name: "Quantum Manipulator",
    description: "Manipulate market perception through quantum state interference",
    icon: "🔮",
    href: "/dashboard/tools/quantum-manipulator",
    status: "operational",
    tier: 3,
    isRealTimeMonitoring: true,
    monitoringData: {
      activeManipulations: 3,
      successRate: "92%",
      profitGenerated: "$14,325",
    },
  },
  {
    id: "temporal-fragmentation",
    name: "Temporal Fragmentation",
    description: "Fragment transactions across time to avoid detection",
    icon: "⏱️",
    href: "/dashboard/tools/temporal-fragmentation",
    status: "operational",
    tier: 3,
    isRealTimeMonitoring: true,
    monitoringData: {
      activeFragmentations: 7,
      detectionAvoidance: "99.2%",
      transactionsProcessed: 1432,
    },
  },
  {
    id: "phantom-vault",
    name: "Phantom Vault",
    description: "Create undetectable storage for assets",
    icon: "👻",
    href: "/dashboard/tools/phantom-vault",
    status: "operational",
    tier: 3,
    isRealTimeMonitoring: false,
  },
  {
    id: "mev-extraction",
    name: "MEV Extraction",
    description: "Extract value from pending transactions",
    icon: "💎",
    href: "/dashboard/tools/mev-extraction",
    status: "operational",
    tier: 2,
    isRealTimeMonitoring: true,
    monitoringData: {
      extractionOpportunities: 12,
      estimatedValue: "$2,450",
      successfulExtractions: 8,
    },
  },
  {
    id: "liquidity-mirage",
    name: "Liquidity Mirage",
    description: "Create false perception of market liquidity",
    icon: "🌊",
    href: "/dashboard/tools/liquidity-mirage",
    status: "operational",
    tier: 2,
    isRealTimeMonitoring: true,
    monitoringData: {
      activeMirages: 4,
      impactLevel: "High",
      targetedPairs: ["ETH/USDT", "BTC/USDC"],
    },
  },
  {
    id: "function-masquerading",
    name: "Function Masquerading",
    description: "Disguise contract functions to hide true intent",
    icon: "🎭",
    href: "/dashboard/tools/function-masquerading",
    status: "operational",
    tier: 2,
    isRealTimeMonitoring: false,
  },
  {
    id: "shadow-swap",
    name: "Shadow Swap",
    description: "Execute trades through shadow routes",
    icon: "🕶️",
    href: "/dashboard/tools/shadow-swap",
    status: "operational",
    tier: 1,
    isRealTimeMonitoring: true,
    monitoringData: {
      activeSwaps: 5,
      volumeProcessed: "$32,450",
      savingsGenerated: "$1,245",
    },
  },
  {
    id: "whale-tracker",
    name: "Whale Tracker",
    description: "Track and analyze whale movements",
    icon: "🐋",
    href: "/dashboard/tools/whale-tracker",
    status: "operational",
    tier: 1,
    isRealTimeMonitoring: true,
    monitoringData: {
      whalesTracked: 17,
      recentMovements: 3,
      largestMovement: "$2.4M",
    },
  },
  {
    id: "sniper-bot",
    name: "Sniper Bot",
    description: "Automatically snipe token launches",
    icon: "🎯",
    href: "/dashboard/tools/sniper-bot",
    status: "operational",
    tier: 1,
    isRealTimeMonitoring: true,
    monitoringData: {
      activeTargets: 2,
      successfulSnipes: 8,
      profitGenerated: "$5,780",
    },
  },
].sort((a, b) => b.tier - a.tier)

export default function DashboardPage() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { connected, address, balance, tier } = useWallet()
  const [userTier, setUserTier] = useState(1)
  const [accessLevel, setAccessLevel] = useState(0)

  useEffect(() => {
    // In a real app, this would come from authentication
    const level = getUserAccessLevel()
    setAccessLevel(level)
    setUserTier(level)
  }, [])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const openWalletModal = () => {
    setWalletModalOpen(true)
  }

  // Format balance with commas
  const formattedBalance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

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
    <div className="relative min-h-screen">
      <MatrixBackground />
      <CircuitPattern />
      <div className="relative z-10">
        <PageHeader title="Dashboard" description="Monitor your assets and access your tools" />
        <div className="container mx-auto px-4 py-6">
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
                <CyberCard className="bg-black/60">
                  <div className="border-b border-zinc-800 pb-2 mb-3">
                    <h3 className="text-lg font-bold text-neon-pink">$BLKBOX Balance</h3>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-3xl font-bold text-neon-pink">{formattedBalance}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="px-2 py-1 bg-neon-pink/10 rounded text-xs font-tech-mono text-neon-pink">
                        {tier ? tier.replace("_", " ") : "UNAUTHORIZED"}
                      </div>
                    </div>
                  </div>
                </CyberCard>

                <CyberCard className="bg-black/60">
                  <div className="border-b border-zinc-800 pb-2 mb-3">
                    <h3 className="text-lg font-bold text-neon-cyan">Next USDC Dividend</h3>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-3xl font-bold text-neon-cyan">{(balance * 0.00005).toFixed(2)} USDC</p>
                    <p className="text-xs text-zinc-400 font-tech-mono mt-2">Estimated payout in 3 days</p>
                  </div>
                </CyberCard>

                <CyberCard className="bg-black/60">
                  <div className="border-b border-zinc-800 pb-2 mb-3">
                    <h3 className="text-lg font-bold text-neon-pink">Total Earned</h3>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-3xl font-bold text-neon-pink">{(balance * 0.00035).toFixed(2)} USDC</p>
                    <p className="text-xs text-zinc-400 font-tech-mono mt-2">Since you joined</p>
                  </div>
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
                  <DraggableDashboard tools={tools} userTier={userTier} />
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <CyberCard title="$BLKBOX Price Chart" className="bg-black/60">
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
                      <CyberCard title="Dividend History" className="bg-black/60">
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
                      <CyberCard title="Dividend Summary" className="bg-black/60 mb-6">
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

                      <CyberCard title="Dividend Boost" className="bg-black/60">
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
                  <GatedFeatures userTier={tier || "UNAUTHORIZED"} />
                </TabsContent>

                <TabsContent value="settings">
                  <CyberCard title="Account Settings" className="bg-black/60">
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
                          {tier ? tier.replace("_", " ") : "UNAUTHORIZED"}
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
      </div>

      <WalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </div>
  )
}
