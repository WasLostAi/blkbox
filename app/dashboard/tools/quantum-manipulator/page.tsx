"use client"

import { useState } from "react"
import DashboardShell from "@/components/core/dashboard-shell"
import CyberCard from "@/components/cyber-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import TransactionVisualizer from "@/components/core/transaction-visualizer"
import { GlitchText } from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"

const QuantumManipulator = () => {
  const [transactionInput, setTransactionInput] = useState("")
  const [simulatedTransaction, setSimulatedTransaction] = useState<any>(null)

  const simulateTransaction = () => {
    try {
      const transaction = JSON.parse(transactionInput)
      setSimulatedTransaction(transaction)
    } catch (error) {
      console.error("Invalid JSON:", error)
      setSimulatedTransaction({ error: "Invalid JSON" })
    }
  }

  return (
    <DashboardShell>
      <GlitchText
        text="Quantum Manipulator"
        className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
      />
      <DataPulse className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CyberCard>
          <h3 className="text-xl font-bold text-neon-cyan mb-4">Transaction Input</h3>
          <Input
            type="text"
            placeholder="Enter transaction JSON"
            className="bg-black border-zinc-800 focus:border-neon-pink text-white font-tech-mono"
            value={transactionInput}
            onChange={(e) => setTransactionInput(e.target.value)}
          />
          <Button onClick={simulateTransaction} className="w-full mt-4">
            Simulate Transaction
          </Button>
        </CyberCard>
        <CyberCard>
          <h3 className="text-xl font-bold text-neon-pink mb-4">Simulation Results</h3>
          {simulatedTransaction ? (
            <TransactionVisualizer transactionData={simulatedTransaction} />
          ) : (
            <p className="text-zinc-400 font-tech-mono">Enter transaction data to view simulation results.</p>
          )}
        </CyberCard>
      </div>
    </DashboardShell>
  )
}

export default QuantumManipulator
