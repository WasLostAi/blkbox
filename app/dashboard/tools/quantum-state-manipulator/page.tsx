"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Zap, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { QuantumStateManipulator } from "@/utils/quantum-state-manipulator"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import DataPulse from "@/components/data-pulse"
import TerminalCode from "@/components/terminal-code"
import { useWallet } from "@/context/wallet-context"
import TierGate from "@/components/tier-gate"

export default function QuantumStateManipulatorPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [tokenAddress, setTokenAddress] = useState("")
  const [operationId, setOperationId] = useState<string | null>(null)
  const [operationStatus, setOperationStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const [logs, setLogs] = useState<string[]>([])
  const { connected, address, tier } = useWallet()
  const router = useRouter()

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Initialize the manipulator
  const quantumStateManipulator = new QuantumStateManipulator()

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toISOString()}] ${message}`])
  }

  const handleCreateStateUncertainty = async () => {
    if (!connected || !address || !tokenAddress) return

    try {
      setOperationStatus("processing")
      setStatusMessage("Creating quantum state uncertainty...")
      addLog(`Initiating quantum state uncertainty for token ${tokenAddress}`)

      const opId = await quantumStateManipulator.createStateUncertainty(tokenAddress, address)
      setOperationId(opId)
      addLog(`Operation initiated with ID: ${opId}`)

      // Simulate processing
      setTimeout(() => {
        setOperationStatus("success")
        setStatusMessage("Quantum state uncertainty created successfully")
        addLog("Quantum state uncertainty created successfully")
      }, 3000)
    } catch (error) {
      console.error(error)
      setOperationStatus("error")
      setStatusMessage("Error creating quantum state uncertainty")
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handlePredictLeaderSchedule = async () => {
    if (!connected || !address) return

    try {
      setOperationStatus("processing")
      setStatusMessage("Predicting leader schedule...")
      addLog("Initiating leader schedule prediction and exploitation")

      const opIds = await quantumStateManipulator.predictAndExploitLeaderSchedule(address)
      setOperationId(opIds[0])
      addLog(`Generated ${opIds.length} operations`)

      // Simulate processing
      setTimeout(() => {
        setOperationStatus("success")
        setStatusMessage("Leader schedule predicted and exploited successfully")
        addLog("Leader schedule predicted and exploited successfully")
      }, 4000)
    } catch (error) {
      console.error(error)
      setOperationStatus("error")
      setStatusMessage("Error predicting leader schedule")
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <MatrixBackground />
        <CircuitPattern />
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-neon-pink animate-spin mb-4" />
          <GlitchText text="LOADING QUANTUM STATE MANIPULATOR" className="text-xl font-tech-mono text-neon-cyan mb-2" />
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
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_DASHBOARD</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <GlitchText
              text="QUANTUM STATE MANIPULATOR"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">EXPLOIT SOLANA'S PARALLEL TRANSACTION PROCESSING</p>
            <DataPulse className="my-6" />
          </div>

          <TierGate requiredTier="SHADOW_ELITE">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <CyberCard className="h-full">
                  <h2 className="text-xl font-bold text-neon-pink mb-4">Quantum State Control Panel</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">
                        TARGET TOKEN ADDRESS
                      </label>
                      <input
                        type="text"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        placeholder="Enter token address"
                        className="w-full bg-black/50 border border-neon-pink/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-pink"
                      />
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <CyberButton
                        onClick={handleCreateStateUncertainty}
                        disabled={operationStatus === "processing" || !tokenAddress}
                        glowColor="pink"
                      >
                        CREATE STATE UNCERTAINTY
                      </CyberButton>

                      <CyberButton
                        onClick={handlePredictLeaderSchedule}
                        disabled={operationStatus === "processing"}
                        glowColor="cyan"
                      >
                        PREDICT & EXPLOIT LEADER SCHEDULE
                      </CyberButton>
                    </div>

                    {operationStatus !== "idle" && (
                      <div
                        className={`mt-4 p-4 rounded ${
                          operationStatus === "processing"
                            ? "bg-neon-cyan/10 border border-neon-cyan/30"
                            : operationStatus === "success"
                              ? "bg-green-500/10 border border-green-500/30"
                              : "bg-red-500/10 border border-red-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {operationStatus === "processing" && (
                            <Loader2 className="h-4 w-4 text-neon-cyan animate-spin" />
                          )}
                          {operationStatus === "success" && <Zap className="h-4 w-4 text-green-500" />}
                          {operationStatus === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                          <span className="font-tech-mono text-sm">{statusMessage}</span>
                        </div>

                        {operationId && (
                          <div className="mt-2 text-xs text-zinc-400 font-tech-mono">Operation ID: {operationId}</div>
                        )}
                      </div>
                    )}
                  </div>
                </CyberCard>
              </div>

              <CyberCard variant="cyan">
                <h2 className="text-xl font-bold text-neon-cyan mb-4">Quantum Theory</h2>
                <p className="text-zinc-400 text-sm mb-4 font-tech-mono">
                  The Quantum State Manipulator exploits Solana's parallel transaction processing to create tokens that
                  can exist in multiple contradictory states simultaneously.
                </p>
                <p className="text-zinc-400 text-sm font-tech-mono">
                  By leveraging race conditions and timing attacks, you can create temporary state inconsistencies that
                  can be exploited for profit.
                </p>
              </CyberCard>
            </div>

            <CyberCard>
              <h2 className="text-xl font-bold text-neon-pink mb-4">Operation Logs</h2>
              <TerminalCode
                lines={logs.length > 0 ? logs : ["No operations performed yet."]}
                className="h-64 overflow-auto"
              />
            </CyberCard>
          </TierGate>
        </div>
      </main>
    </div>
  )
}
