"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Users, Search, Filter, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import TierGate from "@/components/tier-gate"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"
import { type WhaleActivity, generateWhaleActivities } from "@/utils/mock-data"

export default function WhaleTrackerPage() {
  const { connected } = useWallet()
  const [searchQuery, setSearchQuery] = useState("")
  const [tokenFilter, setTokenFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [whaleActivities, setWhaleActivities] = useState<WhaleActivity[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
        // Replace with actual data fetching logic
        const activities = await fetchWhaleActivities()
        setWhaleActivities(activities)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Handle refresh
  const handleRefresh = async () => {
    if (isRefreshing) return

    setIsRefreshing(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Replace with actual data fetching logic
      const activities = await fetchWhaleActivities()
      setWhaleActivities(activities)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Filter activities based on search and filters
  const filteredActivities = whaleActivities.filter((activity) => {
    // Apply search filter
    if (
      searchQuery &&
      !activity.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !activity.token.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Apply token filter
    if (tokenFilter !== "all" && activity.token !== tokenFilter) {
      return false
    }

    // Apply action filter
    if (actionFilter !== "all" && activity.action !== actionFilter) {
      return false
    }

    return true
  })

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric" })
  }

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K"
    } else {
      return num.toFixed(2)
    }
  }

  // Get action color
  const getActionColor = (action: string) => {
    switch (action) {
      case "buy":
        return "text-green-500"
      case "sell":
        return "text-red-500"
      case "transfer":
        return "text-yellow-500"
      case "mint":
        return "text-neon-cyan"
      case "burn":
        return "text-neon-pink"
      default:
        return "text-white"
    }
  }

  // Mock function to fetch whale activities
  async function fetchWhaleActivities(): Promise<WhaleActivity[]> {
    // Replace with actual data fetching logic from a data source
    // This could be an API call to a backend server or a direct connection to a blockchain indexer
    // For this demo, we'll use mock data
    return generateWhaleActivities(20)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-neon-pink/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_DASHBOARD</span>
          </Link>

          <WalletConnector buttonSize="sm" glowColor="cyan" />
        </div>
      </header>

      <main className="flex-1 container py-12">
        <TierGate requiredTier="ENTRY_LEVEL">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="WHALE TRACKER"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">TRACK THE MOVEMENTS OF THOSE WHO MOVE MARKETS</p>
              <DataPulse className="my-6" />
            </div>

            <div className="mb-8">
              <CyberCard className="bg-black/60">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-neon-cyan/10">
                      <Users className="h-6 w-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neon-cyan">Whale Activity Monitor</h3>
                      <p className="text-zinc-400 font-tech-mono text-sm">
                        Track large transactions and wallet movements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CyberButton
                      size="sm"
                      variant="outline"
                      glowColor="cyan"
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                      REFRESH
                    </CyberButton>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                      placeholder="Search by address or token..."
                      className="pl-10 bg-black border-zinc-800 focus:border-neon-cyan"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-zinc-500" />
                      <Select value={tokenFilter} onValueChange={setTokenFilter}>
                        <SelectTrigger className="w-[120px] bg-black border-zinc-800">
                          <SelectValue placeholder="Token" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-zinc-800">
                          <SelectItem value="all">All Tokens</SelectItem>
                          <SelectItem value="SOL">SOL</SelectItem>
                          <SelectItem value="USDC">USDC</SelectItem>
                          <SelectItem value="BLKBOX">BLKBOX</SelectItem>
                          <SelectItem value="BTC">BTC</SelectItem>
                          <SelectItem value="ETH">ETH</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-zinc-500" />
                      <Select value={actionFilter} onValueChange={setActionFilter}>
                        <SelectTrigger className="w-[120px] bg-black border-zinc-800">
                          <SelectValue placeholder="Action" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-zinc-800">
                          <SelectItem value="all">All Actions</SelectItem>
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="sell">Sell</SelectItem>
                          <SelectItem value="transfer">Transfer</SelectItem>
                          <SelectItem value="mint">Mint</SelectItem>
                          <SelectItem value="burn">Burn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="activity" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="activity" className="font-tech-mono">
                      ACTIVITY
                    </TabsTrigger>
                    <TabsTrigger value="wallets" className="font-tech-mono">
                      TOP WALLETS
                    </TabsTrigger>
                    <TabsTrigger value="alerts" className="font-tech-mono">
                      ALERTS
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="activity">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <RefreshCw className="h-8 w-8 text-neon-cyan animate-spin mb-4" />
                        <p className="text-zinc-400 font-tech-mono">Loading whale activity data...</p>
                      </div>
                    ) : filteredActivities.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <AlertCircle className="h-8 w-8 text-zinc-500 mb-4" />
                        <p className="text-zinc-400 font-tech-mono">No matching activities found</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-xs font-tech-mono text-zinc-500 border-b border-zinc-800">
                              <th className="pb-2">Time</th>
                              <th className="pb-2">Address</th>
                              <th className="pb-2">Action</th>
                              <th className="pb-2">Token</th>
                              <th className="pb-2">Amount</th>
                              <th className="pb-2">Value (USD)</th>
                              <th className="pb-2 text-right">Explorer</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredActivities.map((activity) => (
                              <tr
                                key={activity.id}
                                className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors"
                              >
                                <td className="py-3 text-xs font-tech-mono">
                                  <div>{formatTime(activity.timestamp)}</div>
                                  <div className="text-zinc-500">{formatDate(activity.timestamp)}</div>
                                </td>
                                <td className="py-3">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-neon-cyan mr-2"></div>
                                    <span className="font-tech-mono text-xs">
                                      {activity.address.slice(0, 6)}...{activity.address.slice(-4)}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3">
                                  <span
                                    className={`font-tech-mono text-xs uppercase ${getActionColor(activity.action)}`}
                                  >
                                    {activity.action}
                                  </span>
                                </td>
                                <td className="py-3">
                                  <span className="font-tech-mono text-xs">{activity.token}</span>
                                </td>
                                <td className="py-3">
                                  <span className="font-tech-mono text-xs">{formatNumber(activity.amount)}</span>
                                </td>
                                <td className="py-3">
                                  <span className="font-tech-mono text-xs">${formatNumber(activity.value)}</span>
                                </td>
                                <td className="py-3 text-right">
                                  <a
                                    href="#"
                                    className="inline-flex items-center text-neon-cyan hover:text-neon-pink transition-colors"
                                  >
                                    <ExternalLink size={14} />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="wallets">
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-zinc-400 font-tech-mono mb-4">Top Wallets feature coming soon</p>
                      <CyberButton variant="outline" glowColor="pink" size="sm">
                        UPGRADE TO OPERATOR TIER
                      </CyberButton>
                    </div>
                  </TabsContent>

                  <TabsContent value="alerts">
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-zinc-400 font-tech-mono mb-4">Whale Alerts feature coming soon</p>
                      <CyberButton variant="outline" glowColor="pink" size="sm">
                        UPGRADE TO OPERATOR TIER
                      </CyberButton>
                    </div>
                  </TabsContent>
                </Tabs>
              </CyberCard>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-pink mb-4">Whale Insights</h3>
                <p className="text-zinc-400 font-tech-mono text-sm mb-4">
                  AI-powered analysis of whale behavior patterns
                </p>
                <div className="space-y-4">
                  <div className="p-3 border border-zinc-800 rounded-md">
                    <p className="text-neon-cyan font-tech-mono text-xs mb-2">ACCUMULATION DETECTED</p>
                    <p className="text-zinc-300 text-sm">
                      3 whales have accumulated 2.4M $BLKBOX in the last 24 hours.
                    </p>
                  </div>
                  <div className="p-3 border border-zinc-800 rounded-md">
                    <p className="text-neon-pink font-tech-mono text-xs mb-2">UNUSUAL ACTIVITY</p>
                    <p className="text-zinc-300 text-sm">
                      Large transfer of 500K SOL between unknown wallets detected.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <CyberButton variant="outline" glowColor="cyan" size="sm" className="w-full">
                    VIEW DETAILED ANALYSIS
                  </CyberButton>
                </div>
              </CyberCard>

              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-cyan mb-4">Wallet Clusters</h3>
                <p className="text-zinc-400 font-tech-mono text-sm mb-4">Identified groups of related wallets</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400 font-tech-mono text-xs">Cluster #1</span>
                    <span className="text-neon-pink font-tech-mono text-xs">12 wallets</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400 font-tech-mono text-xs">Cluster #2</span>
                    <span className="text-neon-pink font-tech-mono text-xs">8 wallets</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400 font-tech-mono text-xs">Cluster #3</span>
                    <span className="text-neon-pink font-tech-mono text-xs">5 wallets</span>
                  </div>
                </div>
                <div className="mt-4">
                  <CyberButton variant="outline" glowColor="pink" size="sm" className="w-full">
                    EXPLORE CLUSTERS
                  </CyberButton>
                </div>
              </CyberCard>

              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-pink mb-4">Whale Watch</h3>
                <p className="text-zinc-400 font-tech-mono text-sm mb-4">Set up custom alerts for whale movements</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300 font-tech-mono text-sm">Active Alerts</span>
                    <span className="text-neon-cyan font-tech-mono text-sm">2/5</span>
                  </div>
                  <div className="p-3 border border-zinc-800 rounded-md">
                    <div className="flex justify-between items-center">
                      <p className="text-neon-cyan font-tech-mono text-xs">$BLKBOX MOVEMENT</p>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-zinc-300 text-sm mt-1">Alert when &gt;100K $BLKBOX moves</p>
                  </div>
                  <div className="p-3 border border-zinc-800 rounded-md">
                    <div className="flex justify-between items-center">
                      <p className="text-neon-pink font-tech-mono text-xs">WALLET TRACKING</p>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-zinc-300 text-sm mt-1">Track wallet 0x7a...3f4d</p>
                  </div>
                </div>
                <div className="mt-4">
                  <CyberButton variant="outline" glowColor="cyan" size="sm" className="w-full">
                    CREATE NEW ALERT
                  </CyberButton>
                </div>
              </CyberCard>
            </div>
          </div>
        </TierGate>
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
