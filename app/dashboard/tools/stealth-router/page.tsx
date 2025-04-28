"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Shield, AlertCircle, Loader2, Eye, Network } from "lucide-react"
import Link from "next/link"
import { StealthTransactionRouter } from "@/utils/stealth-transaction-router"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import DataPulse from "@/components/data-pulse"
import TerminalCode from "@/components/terminal-code"
import { useWallet } from "@/context/wallet-context"
import TierGate from "@/components/tier-gate"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StealthRouterPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [networkConditions, setNetworkConditions] = useState<any>(null)
  const [fragmentationLevel, setFragmentationLevel] = useState(3)
  const [obfuscationStrength, setObfuscationStrength] = useState(70)
  const [priorityLevel, setPriorityLevel] = useState(2)
  const [useDecoys, setUseDecoys] = useState(true)
  const [useRelayNetwork, setUseRelayNetwork] = useState(false)
  const [routingResult, setRoutingResult] = useState<any>(null)
  const [isRouting, setIsRouting] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const { connected, address, tier } = useWallet()
  const router = useRouter()

  // Initialize the router
  const stealthRouter = new StealthTransactionRouter()

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toISOString()}] ${message}`])
  }

  const analyzeNetwork = async () => {
    if (isAnalyzing) return

    setIsAnalyzing(true)
    addLog("Analyzing network conditions...")

    try {
      const conditions = await stealthRouter.analyzeNetworkConditions()
      setNetworkConditions(conditions)
      addLog(`Network analysis complete: ${conditions.congestionLevel} congestion detected`)
      addLog(`Current TPS: ${conditions.currentTps}`)
      addLog(`Recommended strategy: ${conditions.optimalStrategy}`)
    } catch (error) {
      console.error(error)
      addLog(`Error analyzing network: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const simulateTransaction = async () => {
    if (isRouting || !connected) return

    setIsRouting(true)
    addLog("Preparing transaction for stealth routing...")

    try {
      // Configure the router with current settings
      stealthRouter.configure({
        fragmentationLevel,
        obfuscationStrength,
        priorityLevel,
        useDecoys,
        useRelayNetwork,
      })

      addLog(`Router configured with fragmentation level ${fragmentationLevel}`)
      addLog(`Obfuscation strength set to ${obfuscationStrength}%`)
      addLog(`Using decoys: ${useDecoys ? "Yes" : "No"}`)
      addLog(`Using relay network: ${useRelayNetwork ? "Yes" : "No"}`)

      // Simulate a transaction (in a real implementation, this would be a real transaction)
      const mockTransaction = {} as any
      const mockSigner = { publicKey: address } as any

      // Route the transaction
      addLog("Routing transaction through stealth network...")
      const result = await stealthRouter.routeTransaction(mockTransaction, mockSigner)
      setRoutingResult(result)

      if (result.success) {
        addLog(`Transaction routed successfully: ${result.signature}`)
        if (result.fragmentSignatures?.length) {
          addLog(`Created ${result.fragmentSignatures.length} transaction fragments`)
        }
        if (result.decoySignatures?.length) {
          addLog(`Created ${result.decoySignatures.length} decoy transactions`)
        }
        addLog(`Detection risk: ${result.detectionRisk}`)
      } else {
        addLog("Transaction routing failed")
      }
    } catch (error) {
      console.error(error)
      addLog(`Error routing transaction: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsRouting(false)
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
            text="LOADING STEALTH TRANSACTION ROUTER"
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
              text="STEALTH TRANSACTION ROUTER"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">ROUTE TRANSACTIONS THROUGH OBFUSCATION LAYERS</p>
            <DataPulse className="my-6" />
          </div>

          <TierGate requiredTier="OPERATOR">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <CyberCard className="h-full">
                  <h2 className="text-xl font-bold text-neon-pink mb-4">Stealth Router Control Panel</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-tech-mono text-neon-cyan">Fragmentation Level</label>
                        <span className="text-sm font-tech-mono text-neon-pink">{fragmentationLevel}</span>
                      </div>
                      <Slider
                        value={[fragmentationLevel]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(value) => setFragmentationLevel(value[0])}
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500">
                        Higher fragmentation splits transactions into more parts, increasing stealth but may reduce
                        reliability
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-tech-mono text-neon-cyan">Obfuscation Strength</label>
                        <span className="text-sm font-tech-mono text-neon-pink">{obfuscationStrength}%</span>
                      </div>
                      <Slider
                        value={[obfuscationStrength]}
                        min={10}
                        max={100}
                        step={10}
                        onValueChange={(value) => setObfuscationStrength(value[0])}
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500">
                        Higher obfuscation increases stealth but may increase transaction cost
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-tech-mono text-neon-cyan">Priority Level</label>
                        <span className="text-sm font-tech-mono text-neon-pink">{priorityLevel}x</span>
                      </div>
                      <Slider
                        value={[priorityLevel]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => setPriorityLevel(value[0])}
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500">
                        Higher priority increases transaction fee but improves confirmation speed
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-neon-cyan">Use Decoy Transactions</label>
                      <Switch
                        checked={useDecoys}
                        onCheckedChange={setUseDecoys}
                        className="data-[state=checked]:bg-neon-pink"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-neon-cyan">Use Relay Network</label>
                      <Switch
                        checked={useRelayNetwork}
                        onCheckedChange={setUseRelayNetwork}
                        className="data-[state=checked]:bg-neon-pink"
                      />
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <CyberButton onClick={analyzeNetwork} disabled={isAnalyzing} glowColor="cyan">
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> ANALYZING...
                          </>
                        ) : (
                          <>
                            <Network className="h-4 w-4 mr-2" /> ANALYZE NETWORK
                          </>
                        )}
                      </CyberButton>

                      <CyberButton onClick={simulateTransaction} disabled={isRouting} glowColor="pink">
                        {isRouting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> ROUTING...
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" /> ROUTE TRANSACTION
                          </>
                        )}
                      </CyberButton>
                    </div>
                  </div>
                </CyberCard>
              </div>

              <CyberCard variant="cyan">
                <h2 className="text-xl font-bold text-neon-cyan mb-4">Stealth Theory</h2>
                <p className="text-zinc-400 text-sm mb-4 font-tech-mono">
                  The Stealth Transaction Router conceals your trading intent by fragmenting transactions and routing
                  them through multiple layers of obfuscation.
                </p>
                <p className="text-zinc-400 text-sm font-tech-mono">
                  By using decoy transactions and relay networks, your actual transaction becomes indistinguishable from
                  background noise, preventing front-running and surveillance.
                </p>
              </CyberCard>
            </div>

            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="results" className="font-tech-mono">
                  RESULTS
                </TabsTrigger>
                <TabsTrigger value="network" className="font-tech-mono">
                  NETWORK
                </TabsTrigger>
                <TabsTrigger value="logs" className="font-tech-mono">
                  LOGS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="results">
                <CyberCard className="bg-black/60 min-h-[300px]">
                  <h2 className="text-xl font-bold text-neon-pink mb-4">Routing Results</h2>

                  {routingResult ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 rounded-md bg-black/40 border border-neon-pink/30">
                        <div
                          className={`p-2 rounded-full ${routingResult.success ? "bg-green-500/20" : "bg-red-500/20"}`}
                        >
                          {routingResult.success ? (
                            <Shield className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-neon-cyan">
                            {routingResult.success ? "Transaction Routed Successfully" : "Routing Failed"}
                          </h3>
                          {routingResult.success && (
                            <p className="text-zinc-400 font-tech-mono text-sm">
                              Transaction signature: {routingResult.signature}
                            </p>
                          )}
                        </div>
                      </div>

                      {routingResult.success && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 border border-zinc-800 rounded-md">
                              <p className="text-xs text-zinc-400 font-tech-mono">Detection Risk</p>
                              <p
                                className={`text-lg font-bold ${
                                  routingResult.detectionRisk === "low"
                                    ? "text-green-500"
                                    : routingResult.detectionRisk === "medium"
                                      ? "text-yellow-500"
                                      : "text-red-500"
                                }`}
                              >
                                {routingResult.detectionRisk.toUpperCase()}
                              </p>
                            </div>
                            <div className="p-3 border border-zinc-800 rounded-md">
                              <p className="text-xs text-zinc-400 font-tech-mono">Time to Confirmation</p>
                              <p className="text-lg font-bold text-neon-cyan">{routingResult.timeToConfirmation}ms</p>
                            </div>
                          </div>

                          {routingResult.fragmentSignatures && (
                            <div className="p-3 border border-zinc-800 rounded-md">
                              <p className="text-xs text-zinc-400 font-tech-mono mb-2">Transaction Fragments</p>
                              <div className="space-y-1 max-h-[100px] overflow-y-auto">
                                {routingResult.fragmentSignatures.map((sig: string, index: number) => (
                                  <p key={index} className="text-xs font-tech-mono text-zinc-300">
                                    Fragment {index + 1}: {sig}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}

                          {routingResult.decoySignatures && (
                            <div className="p-3 border border-zinc-800 rounded-md">
                              <p className="text-xs text-zinc-400 font-tech-mono mb-2">Decoy Transactions</p>
                              <div className="space-y-1 max-h-[100px] overflow-y-auto">
                                {routingResult.decoySignatures.map((sig: string, index: number) => (
                                  <p key={index} className="text-xs font-tech-mono text-zinc-300">
                                    Decoy {index + 1}: {sig}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px]">
                      <Eye className="h-12 w-12 text-zinc-500 mb-4" />
                      <p className="text-zinc-400 font-tech-mono mb-2">No transactions routed yet</p>
                      <p className="text-zinc-500 text-sm text-center max-w-md">
                        Configure your stealth settings and route a transaction to see results
                      </p>
                    </div>
                  )}
                </CyberCard>
              </TabsContent>

              <TabsContent value="network">
                <CyberCard className="bg-black/60 min-h-[300px]">
                  <h2 className="text-xl font-bold text-neon-pink mb-4">Network Analysis</h2>

                  {networkConditions ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-3 border border-zinc-800 rounded-md">
                          <p className="text-xs text-zinc-400 font-tech-mono">Current TPS</p>
                          <p className="text-lg font-bold text-neon-cyan">{networkConditions.currentTps}</p>
                        </div>
                        <div className="p-3 border border-zinc-800 rounded-md">
                          <p className="text-xs text-zinc-400 font-tech-mono">Congestion Level</p>
                          <p
                            className={`text-lg font-bold ${
                              networkConditions.congestionLevel === "low"
                                ? "text-green-500"
                                : networkConditions.congestionLevel === "medium"
                                  ? "text-yellow-500"
                                  : "text-red-500"
                            }`}
                          >
                            {networkConditions.congestionLevel.toUpperCase()}
                          </p>
                        </div>
                        <div className="p-3 border border-zinc-800 rounded-md">
                          <p className="text-xs text-zinc-400 font-tech-mono">Recent Slot</p>
                          <p className="text-lg font-bold text-neon-pink">{networkConditions.recentSlot}</p>
                        </div>
                      </div>

                      <div className="p-4 border border-zinc-800 rounded-md">
                        <p className="text-xs text-zinc-400 font-tech-mono mb-2">Optimal Strategy</p>
                        <p className="text-sm font-tech-mono text-neon-cyan">{networkConditions.optimalStrategy}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border border-zinc-800 rounded-md">
                          <p className="text-xs text-zinc-400 font-tech-mono">Recommended Fragmentation</p>
                          <p className="text-lg font-bold text-neon-pink">
                            {networkConditions.recommendedFragmentation}
                          </p>
                        </div>
                        <div className="p-3 border border-zinc-800 rounded-md">
                          <p className="text-xs text-zinc-400 font-tech-mono">Recommended Decoys</p>
                          <p className="text-lg font-bold text-neon-cyan">{networkConditions.recommendedDecoys}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px]">
                      <Network className="h-12 w-12 text-zinc-500 mb-4" />
                      <p className="text-zinc-400 font-tech-mono mb-2">No network analysis yet</p>
                      <p className="text-zinc-500 text-sm text-center max-w-md">
                        Click "Analyze Network" to get current network conditions and recommendations
                      </p>
                    </div>
                  )}
                </CyberCard>
              </TabsContent>

              <TabsContent value="logs">
                <CyberCard className="bg-black/60 min-h-[300px]">
                  <h2 className="text-xl font-bold text-neon-pink mb-4">Operation Logs</h2>
                  <TerminalCode
                    lines={logs.length > 0 ? logs : ["No operations performed yet."]}
                    className="h-[250px] overflow-auto"
                  />
                </CyberCard>
              </TabsContent>
            </Tabs>
          </TierGate>
        </div>
      </main>
    </div>
  )
}
