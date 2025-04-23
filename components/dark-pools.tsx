"use client"

import { useState, useEffect } from "react"
import { Users, RefreshCw, AlertCircle, TrendingUp } from "lucide-react"
import CyberCard from "./cyber-card"
import CyberButton from "./cyber-button"
import { getDarkPools, getPoolPerformance, type DarkPool } from "@/utils/dark-pool"

interface DarkPoolsProps {
  maxItems?: number
  showPerformance?: boolean
}

export default function DarkPools({ maxItems = 3, showPerformance = true }: DarkPoolsProps) {
 const [pools, setPools] = useState<DarkPool[]>([])
 const [performances, setPerformances] = useState<Record<string, any>>({})
 const [isLoading, setIsLoading] = useState(true)
 const [isRefreshing, setIsRefreshing] = useState(false)

 const fetchPools = async () => {
   if (isRefreshing) return

   setIsRefreshing(true)
   try {
     const results = getDarkPools()
     setPools(results.slice(0, maxItems))

     if (showPerformance) {
       const performanceData: Record<string, any> = {}
       for (const pool of results) {
         performanceData[pool.id] = getPoolPerformance(pool.id)
       }
       setPerformances(performanceData)
     }
   } catch (error) {
     console.error("Error fetching dark pools:", error)
   } finally {
     setIsRefreshing(false)
     setIsLoading(false)
   }
 }

 useEffect(() => {
   fetchPools()
 }, [maxItems, showPerformance])

 const formatDate = (timestamp: number) => {
   const date = new Date(timestamp)
   return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
 }

 const formatCurrency = (value: number) => {
   return new Intl.NumberFormat("en-US", {
     style: "currency",
     currency: "USD",
     minimumFractionDigits: 0,
     maximumFractionDigits: 0,
   }).format(value)
 }

 return (
   <CyberCard className="bg-black/60">
     <div className="flex items-center justify-between mb-6">
       <div className="flex items-center gap-3">
         <div className="p-2 rounded-full bg-neon-cyan/10">
           <Users className="h-5 w-5 text-neon-cyan" />
         </div>
         <h3 className="text-lg font-bold text-neon-cyan">Dark Pools</h3>
       </div>
       <CyberButton
         size="sm"
         variant="outline"
         glowColor="pink"
         onClick={fetchPools}
         disabled={isRefreshing}
       >
         <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
       </CyberButton>
     </div>

     {isLoading ? (
       <div className="flex flex-col items-center justify-center py-12">
         <RefreshCw className="h-8 w-8 text-neon-cyan animate-spin mb-4" />
         <p className="text-zinc-400 font-tech-mono">Loading dark pools...</p>
       </div>
     ) : pools.length === 0 ? (
       <div className="flex flex-col items-center justify-center py-12">
         <AlertCircle className="h-8 w-8 text-zinc-500 mb-4" />
         <p className="text-zinc-400 font-tech-mono">No dark pools available</p>
         <p className="text-zinc-500 text-sm mt-2">Check back later or create a new pool</p>
       </div>
     ) : (
       <div className="space-y-6">
         {pools.map((pool, index) => (
           <div key={pool.id} className="border border-zinc-800 rounded-md overflow-hidden">
             <div className="p-4">
               <div className="flex justify-between items-center mb-3">
                 <h4 className="font-bold text-neon-pink">{pool.name}</h4>
                 <span className="text-xs text-zinc-400 font-tech-mono">Created {formatDate(pool.createdAt)}</span>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-4">
                 <div>
                   <p className="text-xs text-zinc-400 font-tech-mono">Total Contribution</p>
                   <p className="text-sm font-tech-mono text-white">{formatCurrency(pool.totalContribution)}</p>
                 </div>
                 <div>
                   <p className="text-xs text-zinc-400 font-tech-mono">Participants</p>
                   <p className="text-sm font-tech-mono text-white">{pool.participants.length}</p>
                 </div>
                 <div>
                   <p className="text-xs text-zinc-400 font-tech-mono">Last Distribution</p>
                   <p className="text-sm font-tech-mono text-white">{formatDate(pool.lastDistribution)}</p>
                 </div>
                 <div>
                   <p className="text-xs text-zinc-400 font-tech-mono">Min Entry</p>
                   <p className="text-sm font-tech-mono text-white">
                     {index === 0 ? "5 SOL" : index === 1 ? "25 SOL" : "100 SOL"}
                   </p>
                 </div>
               </div>

               {showPerformance && performances[pool.id] && (
                 <div className="mt-4 pt-4 border-t border-zinc-800">
                   <div className="flex items-center gap-2 mb-3">
                     <TrendingUp className="h-4 w-4 text-neon-cyan" />
                     <h5 className="font-bold text-neon-cyan text-sm">Performance</h5>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <p className="text-xs text-zinc-400 font-tech-mono">Weekly Profit</p>
                       <p className="text-sm font-tech-mono text-neon-pink">
                         {formatCurrency(performances[pool.id].weeklyProfit)}
                       </p>
                     </div>
                     <div>
                       <p className="text-xs text-zinc-400 font-tech-mono">Monthly Profit</p>
                       <p className="text-sm font-tech-mono text-neon-cyan">
                         {formatCurrency(performances[pool.id].monthlyProfit)}
                       </p>
                 

\
