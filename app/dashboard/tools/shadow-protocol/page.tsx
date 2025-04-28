"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, LinkIcon, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { ShadowProtocolHijacker } from "@/utils/shadow-protocol-hijacker"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import DataPulse from "@/components/data-pulse"
import TerminalCode from "@/components/terminal-code"
import { useWallet } from "@/context/wallet-context"
import TierGate from "@/components/tier-gate"

export default function ShadowProtocolPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [bridges, setBridges] = useState<string[]>([])
  const [newBridge, setNewBridge] = useState("")
  const [targetChain, setTargetChain] = useState("ethereum")
  const [sessionId, setSessionId] = useState<string | null>(null)
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

  // Initialize the hijacker
  const shadowProtocol = new ShadowProtocolHijacker()

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toISOString()}] ${message}`])
  }

  const handleAddBridge = () => {
    if (!newBridge) return

    setBridges((prev) => [...prev, newBridge])
    setNewBridge("")
    addLog(`Added bridge: ${newBridge}`)
  }

  const handleRemoveBridge = (bridge: string) => {
    setBridges((prev) => prev.filter((b) => b !== bridge))
    addLog(`Removed bridge: ${bridge}`)
  }

  const handleMonitorBridges = async () => {
    if (!connected || bridges.length === 0) return

    try {
      setOperationStatus("processing")
      setStatusMessage(`Monitoring ${bridges.length} bridges...`)
      addLog(`Initiating bridge monitoring for ${bridges.length} bridges`)

      const sId = await shadowProtocol.monitorBridgeTransactions(bridges)
      setSessionId(sId)
      addLog(`Monitoring session initiated with ID: ${sId}`)

      // Simulate processing
      setTimeout(() => {
        setOperationStatus("success")
        setStatusMessage("Bridge monitoring active")
        addLog("Bridge monitoring active")
      }, 3000)
    } catch (error) {
      console.error(error)
      setOperationStatus("error")
      setStatusMessage("Error monitoring bridges")
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleSpoofChainIdentity = async () => {
    if (!connected || !address) return

    try {
      setOperationStatus("processing")
      setStatusMessage(`Spoofing chain identity for ${targetChain}...`)
      addLog(`Initiating chain identity spoofing for ${targetChain}`)

      const success = await shadowProtocol.spoofChainIdentity(targetChain, address)

      if (success) {
        setOperationStatus("success")
        setStatusMessage(`Chain identity spoofed successfully for ${targetChain}`)
        addLog(`Chain identity spoofed successfully for ${targetChain}`)
      } else {
        setOperationStatus("error")
        setStatusMessage(`Failed to spoof chain identity for ${targetChain}`)
        addLog(`Failed to spoof chain identity for ${targetChain}`)
      }
    } catch (error) {
      console.error(error)
      setOperationStatus("error")
      setStatusMessage("Error spoofing chain identity")
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
          <GlitchText text="LOADING SHADOW PROTOCOL HIJACKER" className="text-xl font-tech-mono text-neon-cyan mb-2" />
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
              text="SHADOW PROTOCOL HIJACKER"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">EXPLOIT CROSS-CHAIN BRIDGE VULNERABILITIES</p>
            <DataPulse className="my-6" />
          </div>

          <TierGate requiredTier="PHANTOM_COUNCIL">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <CyberCard className="h-full">
                  <h2 className="text-xl font-bold text-neon-pink mb-4">Bridge Monitoring</h2>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newBridge}
                        onChange={(e) => setNewBridge(e.target.value)}
                        placeholder="Enter bridge address"
                        className="flex-1 bg-black/50 border border-neon-pink/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-pink"
                      />
                      <CyberButton onClick={handleAddBridge} disabled={!newBridge} glowColor="pink" size="sm">
                        ADD
                      </CyberButton>
                    </div>

                    <div className="border border-neon-pink/30 rounded p-4 min-h-[100px] max-h-[200px] overflow-y-auto">
                      {bridges.length === 0 ? (
                        <p className="text-zinc-500 font-tech-mono text-sm">No bridges added yet</p>
                      ) : (
                        <ul className="space-y-2">
                          {bridges.map((bridge, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span className="text-zinc-300 font-tech-mono text-sm">{bridge}</span>
                              <button
                                onClick={() => handleRemoveBridge(bridge)}
                                className="text-red-500 hover:text-red-400 text-sm"
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <CyberButton
                      onClick={handleMonitorBridges}
                      disabled={operationStatus === "processing" || bridges.length === 0}
                      glowColor="cyan"
                    >
                      MONITOR BRIDGES
                    </CyberButton>
                  </div>
                </CyberCard>
              </div>

              <CyberCard variant="cyan">
                <h2 className="text-xl font-bold text-neon-cyan mb-4">Chain Identity Spoofing</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">TARGET CHAIN</label>
                    <select
                      value={targetChain}
                      onChange={(e) => setTargetChain(e.target.value)}
                      className="w-full bg-black/50 border border-neon-cyan/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    >
                      <option value="ethereum">Ethereum</option>
                      <option value="polygon">Polygon</option>
                      <option value="avalanche">Avalanche</option>
                      <option value="bsc">Binance Smart Chain</option>
                      <option value="arbitrum">Arbitrum</option>
                      <option value="optimism">Optimism</option>
                    </select>
                  </div>

                  <CyberButton
                    onClick={handleSpoofChainIdentity}
                    disabled={operationStatus === "processing"}
                    glowColor="pink"
                  >
                    SPOOF CHAIN IDENTITY
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
                  {operationStatus === "success" && <LinkIcon className="h-4 w-4 text-green-500" />}
                  {operationStatus === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                  <span className="font-tech-mono text-sm">{statusMessage}</span>
                </div>

                {sessionId && <div className="mt-2 text-xs text-zinc-400 font-tech-mono">Session ID: {sessionId}</div>}
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
