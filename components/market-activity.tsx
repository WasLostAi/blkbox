"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import CyberCard from "./cyber-card"

interface Transaction {
  id: string
  type: "buy" | "sell"
  amount: number
  price: number
  time: string
  address: string
}

export default function MarketActivity() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Generate initial transactions
    const initialTransactions = generateRandomTransactions(10)
    setTransactions(initialTransactions)

    // Add new transactions periodically
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const newTransaction = generateRandomTransactions(1)[0]
        const updated = [newTransaction, ...prev]
        if (updated.length > 20) {
          updated.pop()
        }
        return updated
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Function to generate random transactions
  function generateRandomTransactions(count: number): Transaction[] {
    const result = []

    for (let i = 0; i < count; i++) {
      const type = Math.random() > 0.5 ? "buy" : "sell"
      const amount = Math.floor(Math.random() * 50000) + 1000
      const price = 0.00025 + (Math.random() - 0.5) * 0.00005

      // Generate random time within the last hour
      const now = new Date()
      const randomMinutesAgo = Math.floor(Math.random() * 60)
      now.setMinutes(now.getMinutes() - randomMinutesAgo)
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      // Generate random address
      const address = "0x" + Math.random().toString(16).slice(2, 10)

      result.push({
        id: Math.random().toString(36).substring(2, 15),
        type,
        amount,
        price,
        time,
        address,
      })
    }

    return result.sort((a, b) => {
      const timeA = new Date(`1970/01/01 ${a.time}`).getTime()
      const timeB = new Date(`1970/01/01 ${b.time}`).getTime()
      return timeB - timeA
    })
  }

  return (
    <CyberCard className="bg-black/60 h-full">
      <h3 className="text-xl font-bold text-neon-cyan mb-4">Market Activity</h3>

      <div className="overflow-hidden">
        <div className="grid grid-cols-12 text-xs font-tech-mono text-zinc-500 mb-2 px-2">
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-3">Price</div>
          <div className="col-span-3">Address</div>
          <div className="col-span-2 text-right">Time</div>
        </div>

        <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className={cn(
                "grid grid-cols-12 text-xs py-2 px-2 rounded-sm items-center",
                tx.type === "buy" ? "bg-neon-cyan/5" : "bg-neon-pink/5",
              )}
            >
              <div className="col-span-2 flex items-center">
                {tx.type === "buy" ? (
                  <>
                    <ArrowUp size={14} className="text-neon-cyan mr-1" /> <span className="text-neon-cyan">Buy</span>
                  </>
                ) : (
                  <>
                    <ArrowDown size={14} className="text-neon-pink mr-1" /> <span className="text-neon-pink">Sell</span>
                  </>
                )}
              </div>
              <div className="col-span-2 font-tech-mono">{tx.amount.toLocaleString()}</div>
              <div className="col-span-3 font-tech-mono">${tx.price.toFixed(6)}</div>
              <div className="col-span-3 font-tech-mono text-zinc-400">{tx.address}...</div>
              <div className="col-span-2 text-right font-tech-mono text-zinc-400">{tx.time}</div>
            </div>
          ))}
        </div>
      </div>
    </CyberCard>
  )
}
