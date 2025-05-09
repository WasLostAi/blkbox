"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { TemporalFragmentationEngine } from "@/utils/temporal-fragmentation-engine"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import DataPulse from "@/components/data-pulse"
import TerminalCode from "@/components/terminal-code"
import { useWallet } from "@/context/wallet-context"
import TierGate from "@/components/tier-gate"

export default function TemporalFragmentationPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [lookAheadSlots, setLookAheadSlots] = useState(10)
  const [opportunityWindow, setOpportunityWindow] = useState(500)
  const [operationId, setOperationId] = useState<string | null>(null)
  const [operationStatus, setOperationStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const [logs, setLogs] = useState<string[]>([])
  const [validatorSlots, setValidatorSlots] = useState<Map<string, number[]> | null>(null)
  const { connected, address, tier } = useWallet()
  const router = useRouter()

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Initialize the engine
  const temporalEngine = new TemporalFragmentationEngine()

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toISOString()}] ${message}`])
  }

  const handlePredictValidatorSlots = async () => {
    if (!connected) return

    try {
      setOperationStatus("processing")
      setStatusMessage(`Predicting validator slots for next ${lookAheadSlots} slots...`)
      addLog(`Initiating validator slot prediction for ${lookAheadSlots} slots`)

      const slots = await temporalEngine.predictValidatorSlots(lookAheadSlots)
      setValidatorSlots(slots)

      // Log the results
      addLog(`Predicted slots for ${slots.size} validators`)
      slots.forEach((slotArray, validator) => {
        addLog(`Validator ${validator.substring(0, 8)}... predicted for slots: ${slotArray.join(", ")}`)
      })

      setOperationStatus("success")
      setStatusMessage("Validator slots predicted successfully")
    } catch (error) {
      console.error(error)
      setOperationStatus("error")
      setStatusMessage("Error predicting validator slots")
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleExecuteTemporalArbitrage = async () => {
    if (!connected || !address) return

    try {
      setOperationStatus("processing")
      setStatusMessage(`Executing temporal arbitrage with ${opportunityWindow}ms window...`)
      addLog(`Initiating temporal arbitrage with ${opportunityWindow}ms window`)

      const opId = await temporalEngine.executeTemporalArbitrage(opportunityWindow, address)
      setOperationId(opId)
      addLog(`Operation initiated with ID: ${opId}`)

      // Simulate processing
      setTimeout(() => {
        setOperationStatus("success")
        setStatusMessage("Temporal arbitrage executed successfully")
        addLog("Temporal arbitrage executed successfully")
      }, 3000)
    } catch (error) {
      console.error(error)
      setOperationStatus("error")
      setStatusMessage("Error executing temporal arbitrage")
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
          <GlitchText
            text="LOADING TEMPORAL FRAGMENTATION ENGINE"
            className="text-xl font-tech-mono text-neon-cyan mb-2"
          />
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
              text="TEMPORAL FRAGMENTATION ENGINE"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">EXPLOIT SOLANA'S TIME-BASED PROCESSING MECHANICS</p>
            <DataPulse className="my-6" />
          </div>

          <TierGate requiredTier="PHANTOM_COUNCIL">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <CyberCard className="h-full">
                  <h2 className="text-xl font-bold text-neon-pink mb-4">Temporal Control Panel</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">
                        LOOK AHEAD SLOTS
                      </label>
                      <input
                        type="number"
                        value={lookAheadSlots}
                        onChange={(e) => setLookAheadSlots(Number.parseInt(e.target.value) || 10)}
                        min={1}
                        max={100}
                        className="w-full bg-black/50 border border-neon-pink/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-pink"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">
                        OPPORTUNITY WINDOW (MS)
                      </label>
                      <input
                        type="number"
                        value={opportunityWindow}
                        onChange={(e) => setOpportunityWindow(Number.parseInt(e.target.value) || 500)}
                        min={100}
                        max={5000}
                        step={100}
                        className="w-full bg-black/50 border border-neon-pink/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-pink"
                      />
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <CyberButton
                        onClick={handlePredictValidatorSlots}
                        disabled={operationStatus === "processing"}
                        glowColor="cyan"
                      >
                        PREDICT VALIDATOR SLOTS
                      </CyberButton>

                      <CyberButton
                        onClick={handleExecuteTemporalArbitrage}
                        disabled={operationStatus === "processing"}
                        glowColor="pink"
                      >
                        EXECUTE TEMPORAL ARBITRAGE
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
                          {operationStatus === "success" && <Clock className="h-4 w-4 text-green-500" />}
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
                <h2 className="text-xl font-bold text-neon-cyan mb-4">Temporal Theory</h2>
                <p className="text-zinc-400 text-sm mb-4 font-tech-mono">
                  The Temporal Fragmentation Engine exploits Solana's unique time-based processing mechanics to create
                  temporal arbitrage opportunities invisible to standard monitoring tools.
                </p>
                <p className="text-zinc-400 text-sm font-tech-mono">
                  By predicting validator slot assignments and fragmenting transactions across time, you can exploit
                  momentary inconsistencies in the network.
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
