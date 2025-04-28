"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Droplets, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { LiquidityMirageCreator } from "@/utils/liquidity-mirage-creator"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import DataPulse from "@/components/data-pulse"
import TerminalCode from "@/components/terminal-code"
import { useWallet } from "@/context/wallet-context"
import TierGate from "@/components/tier-gate"

export default function LiquidityMiragePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [poolAddress, setPoolAddress] = useState("")
  const [dexAddress, setDexAddress] = useState("")
  const [amount, setAmount] = useState(10000)
  const [price, setPrice] = useState(1.0)
  const [size, setSize] = useState(5000)
  const [slippageFactor, setSlippageFactor] = useState(2)
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

  // Initialize the creator
  const liquidityMirage = new LiquidityMirageCreator()

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toISOString()}] ${message}`])
  }

  const handleCreateSyntheticLiquidity = async () => {
    if (!connected || !address || !poolAddress) return

    try {
      setOperationStatus("processing")
      setStatusMessage(`Creating ${amount} synthetic liquidity...`)
      addLog(`Initiating synthetic liquidity creation for pool ${poolAddress}`)

      const opId = await liquidityMirage.createSyntheticLiquidity(poolAddress, amount, address)
      setOperationId(opId)
      addLog(`Operation initiated with ID: ${opId}`)

      // Simulate processing
      setTimeout(() => {
        setOperationStatus("success")
        setStatusMessage("Synthetic liquidity created successfully")
        addLog("Synthetic liquidity created successfully")
      }, 3000)
    } catch (error) {
      console.error(error)
      setOperationStatus("error")
      setStatusMessage("Error creating synthetic liquidity")
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleCreateGhostOrders = async () => {
    if (!connected || !address || !dexAddress) return

    try {
      setOperationStatus("processing")
      setStatusMessage(`Creating ghost orders at price ${price}...`)
      addLog(`Initiating ghost order creation on DEX ${dexAddress}`)

      const opId = await liquidityMirage.createGhostOrders(dexAddress, price, size, address)
      setOperationId(opId)
      addLog(`Operation initiated with ID: ${opId}`)

      // Simulate processing
      setTimeout(() => {
        setOperationStatus("success")
        setStatusMessage("Ghost orders created successfully")
        addLog("Ghost orders created successfully")
      }, 3000)
    } catch (error) {
      console.error(error)
      setOperationStatus("error")
      setStatusMessage("Error creating ghost orders")
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleAmplifySlippage = async () => {
    if (!connected || !address || !poolAddress) return

    try {
      setOperationStatus("processing")
      setStatusMessage(`Amplifying slippage by factor ${slippageFactor}...`)
      addLog(`Initiating slippage amplification for pool ${poolAddress}`)

      const success = await liquidityMirage.amplifySlippage(poolAddress, slippageFactor, address)

      if (success) {
        setOperationStatus("success")
        setStatusMessage("Slippage amplified successfully")
        addLog("Slippage amplified successfully")
      } else {
        setOperationStatus("error")
        setStatusMessage("Failed to amplify slippage")
        addLog("Failed to amplify slippage")
      }
    } catch (error) {
      console.error(error)
      setOperationStatus("error")
      setStatusMessage("Error amplifying slippage")
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
          <GlitchText text="LOADING LIQUIDITY MIRAGE CREATOR" className="text-xl font-tech-mono text-neon-cyan mb-2" />
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
              text="LIQUIDITY MIRAGE CREATOR"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">CREATE SYNTHETIC LIQUIDITY AND GHOST ORDERS</p>
            <DataPulse className="my-6" />
          </div>

          <TierGate requiredTier="OPERATOR">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <CyberCard>
                <h2 className="text-xl font-bold text-neon-pink mb-4">Synthetic Liquidity</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">POOL ADDRESS</label>
                    <input
                      type="text"
                      value={poolAddress}
                      onChange={(e) => setPoolAddress(e.target.value)}
                      placeholder="Enter pool address"
                      className="w-full bg-black/50 border border-neon-pink/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-pink"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">AMOUNT</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number.parseInt(e.target.value) || 0)}
                      min={1000}
                      step={1000}
                      className="w-full bg-black/50 border border-neon-pink/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-pink"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <CyberButton
                      onClick={handleCreateSyntheticLiquidity}
                      disabled={operationStatus === "processing" || !poolAddress}
                      glowColor="pink"
                    >
                      CREATE SYNTHETIC LIQUIDITY
                    </CyberButton>

                    <CyberButton
                      onClick={handleAmplifySlippage}
                      disabled={operationStatus === "processing" || !poolAddress}
                      glowColor="cyan"
                    >
                      AMPLIFY SLIPPAGE
                    </CyberButton>
                  </div>
                </div>
              </CyberCard>

              <CyberCard>
                <h2 className="text-xl font-bold text-neon-cyan mb-4">Ghost Orders</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">DEX ADDRESS</label>
                    <input
                      type="text"
                      value={dexAddress}
                      onChange={(e) => setDexAddress(e.target.value)}
                      placeholder="Enter DEX address"
                      className="w-full bg-black/50 border border-neon-cyan/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">PRICE</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number.parseFloat(e.target.value) || 0)}
                        min={0.0001}
                        step={0.0001}
                        className="w-full bg-black/50 border border-neon-cyan/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">SIZE</label>
                      <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(Number.parseInt(e.target.value) || 0)}
                        min={100}
                        step={100}
                        className="w-full bg-black/50 border border-neon-cyan/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">
                      SLIPPAGE FACTOR
                    </label>
                    <input
                      type="number"
                      value={slippageFactor}
                      onChange={(e) => setSlippageFactor(Number.parseInt(e.target.value) || 1)}
                      min={1}
                      max={10}
                      className="w-full bg-black/50 border border-neon-cyan/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    />
                  </div>

                  <CyberButton
                    onClick={handleCreateGhostOrders}
                    disabled={operationStatus === "processing" || !dexAddress}
                    glowColor="cyan"
                  >
                    CREATE GHOST ORDERS
                  </CyberButton>
                </div>
              </CyberCard>
            </div>

            {operationStatus !== "idle" && (
              <div
                className={`mb-8 p-4 rounded ${
                  operationStatus === "processing"
                    ? "bg-neon-cyan/10 border border-neon-cyan/30"
                    : operationStatus === "success"
                      ? "bg-green-500/10 border border-green-500/30"
                      : "bg-red-500/10 border border-red-500/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  {operationStatus === "processing" && <Loader2 className="h-4 w-4 text-neon-cyan animate-spin" />}
                  {operationStatus === "success" && <Droplets className="h-4 w-4 text-green-500" />}
                  {operationStatus === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                  <span className="font-tech-mono text-sm">{statusMessage}</span>
                </div>

                {operationId && (
                  <div className="mt-2 text-xs text-zinc-400 font-tech-mono">Operation ID: {operationId}</div>
                )}
              </div>
            )}

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
