"use client"

import { useState, useEffect } from "react"
import { Zap, RefreshCw, AlertCircle } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "./cyber-button"
import DataPulse from "./data-pulse"
import { scanMempool, type MevOpportunity } from "@/utils/mev-detection"

interface MevOpportunitiesProps {
  maxItems?: number
  autoRefresh?: boolean
  refreshInterval?: number
}

export default function MevOpportunities({
  maxItems = 5,
  autoRefresh = true,
  refreshInterval = 10000,
}: MevOpportunitiesProps) {
  const [opportunities, setOpportunities] = useState<MevOpportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchOpportunities = async () => {
    if (isRefreshing) return

    setIsRefreshing(true)
    try {
      const results = await scanMempool()
      setOpportunities(results.slice(0, maxItems))
    } catch (error) {
      console.error("Error fetching MEV opportunities:", error)
    } finally {
      setIsRefreshing(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOpportunities()

    if (autoRefresh) {
      const interval = setInterval(fetchOpportunities, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, refreshInterval, maxItems])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "arbitrage":
        return "text-green-500"
      case "sandwich":
        return "text-yellow-500"
      case "liquidation":
        return "text-neon-pink"
      case "frontrun":
        return "text-neon-cyan"
      default:
        return "text-white"
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  return (
    <CyberCard className="bg-black/60">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-neon-pink/10">
            <Zap className="h-5 w-5 text-neon-pink" />
          </div>
          <h3 className="text-lg font-bold text-neon-pink">MEV Opportunities</h3>
        </div>
        <CyberButton size="sm" variant="outline" glowColor="cyan" onClick={fetchOpportunities} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </CyberButton>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 text-neon-cyan animate-spin mb-4" />
          <p className="text-zinc-400 font-tech-mono">Scanning mempool for opportunities...</p>
        </div>
      ) : opportunities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-8 w-8 text-zinc-500 mb-4" />
          <p className="text-zinc-400 font-tech-mono">No MEV opportunities found</p>
          <p className="text-zinc-500 text-sm mt-2">Try again later or adjust your scan parameters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opportunity, index) => (
            <div key={index} className="p-4 border border-zinc-800 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className={`font-tech-mono text-sm uppercase ${getTypeColor(opportunity.type)}`}>
                    {opportunity.type}
                  </span>
                </div>
                <span className="text-xs text-zinc-400 font-tech-mono">{formatTime(opportunity.timestamp)}</span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                <div>
                  <p className="text-xs text-zinc-400 font-tech-mono">Expected Profit</p>
                  <p className="text-sm font-tech-mono text-neon-cyan">${opportunity.expectedProfit.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-tech-mono">Success Probability</p>
                  <p className="text-sm font-tech-mono text-neon-pink">
                    {(opportunity.successProbability * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              <DataPulse className="mt-3" height={1} color={index % 2 === 0 ? "pink" : "cyan"} />
            </div>
          ))}
        </div>
      )}
    </CyberCard>
  )
}
