import type React from "react"
import { cn } from "@/lib/utils"

interface TransactionVisualizerProps {
  transactionData: any
  className?: string
}

const TransactionVisualizer: React.FC<TransactionVisualizerProps> = ({ transactionData, className }) => {
  return (
    <div className={cn("p-4 border border-zinc-700 rounded-md", className)}>
      <h3 className="text-lg font-bold text-neon-pink mb-2">Transaction Details</h3>
      <pre className="text-xs text-zinc-400 whitespace-pre-wrap">{JSON.stringify(transactionData, null, 2)}</pre>
    </div>
  )
}

export default TransactionVisualizer
