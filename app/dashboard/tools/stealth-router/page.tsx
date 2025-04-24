"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, RefreshCw, Shield, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import TierGate from "@/components/tier-gate"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"
import TerminalCode from "@/components/terminal-code"

export default function StealthRouterPage() {
  const { connected, tier } = useWallet()
  const [isLoading, setIsLoading] = useState(true)
  const [isRouting, setIsRouting] = useState(false)
  const [privacyLevel, setPrivacyLevel] = useState(70)
  const [routeHops, setRouteHops] = useState(3)
  const [usePrivateRPC, setUsePrivateRPC] = useState(true)
  const [obfuscateMetadata, setObfuscateMetadata] = useState(true)
  const [selectedNetwork, setSelectedNetwork] = useState("solana")
  const [routeType, setRouteType] = useState("transaction")
  const [routeStatus, setRouteStatus] = useState<string | null>(null)
  const [routeLog, setRouteLog] = useState<string[]>([])

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Set initial route log
        setRouteLog([
          "Stealth Router initialized",
          "Private RPC endpoints connected",
          "Obfuscation layers ready",
          "System ready for secure routing",
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Start routing
  const startRouting = async () => {
    if (isRouting) return

    setIsRouting(true)
    setRouteStatus("initializing")
    addRouteLog("Starting secure routing process...")

    try {
      // Simulate routing process
      await simulateRoutingProcess()
      setRouteStatus("complete")
      addRouteLog("Routing complete. Transaction successfully obfuscated.")
    } catch (error) {
      console.error("Routing error:", error)
      addRouteLog("Routing failed. Please try again.")
    } finally {
      setIsRouting(false)
    }
  }

  // Simulate routing process
  const simulateRoutingProcess = async () => {
    // Step 1: Initialize
    addRouteLog("Initializing stealth routing protocol...")
    await delay(1000)

    // Step 2: Connect to private RPC
    if (usePrivateRPC) {
      addRouteLog("Connecting to private RPC endpoints...")
      await delay(1500)
      addRouteLog("Private RPC connection established")
    }

    // Step 3: Generate route path
    addRouteLog(`Generating route path with ${routeHops} hops...`)
    await delay(2000)

    // Step 4: Apply obfuscation
    if (obfuscateMetadata) {
      addRouteLog("Applying metadata obfuscation...")
      await delay(1000)
      addRouteLog("Transaction metadata successfully obfuscated")
    }

    // Step 5: Route through hops
    for (let i = 1; i <= routeHops; i++) {
      addRouteLog(`Routing through hop ${i}/${routeHops}...`)
      await delay(1000)
      addRouteLog(`Hop ${i} complete`)
    }

    // Step 6: Finalize
    addRouteLog("Finalizing transaction...")
    await delay(1500)
  }

  // Add log entry
  const addRouteLog = (message: string) => {
    setRouteLog((prev) => {
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      return [`[${timestamp}] ${message}`, ...prev]
    })
  }

  // Helper function for delay
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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

          <WalletConnector buttonSize="sm" glowColor="cyan" />
        </div>
      </header>

      <main className="flex-1 container py-12">
        <TierGate requiredTier="SHADOW_ELITE">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="STEALTH ROUTER"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">CONCEAL TRANSACTION ROUTES AND MINIMIZE FOOTPRINT</p>
              <DataPulse className="my-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <CyberCard className="bg-black/60">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-neon-pink/10">
                      <Eye className="h-6 w-6 text-neon-pink" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neon-pink">Stealth Settings</h3>
                      <p className="text-zinc-400 font-tech-mono text-sm">Configure privacy parameters</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-tech-mono text-neon-cyan">Privacy Level</label>
                        <span className="text-sm font-tech-mono text-neon-pink">{privacyLevel}%</span>
                      </div>
                      <Slider
                        value={[privacyLevel]}
                        min={10}
                        max={100}
                        step={10}
                        onValueChange={(value) => setPrivacyLevel(value[0])}
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500">Higher privacy requires more gas and time</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-tech-mono text-neon-cyan">Route Hops</label>
                        <span className="text-sm font-tech-mono text-neon-pink">{routeHops}</span>
                      </div>
                      <Slider
                        value={[routeHops]}
                        min={1}
                        max={7}
                        step={1}
                        onValueChange={(value) => setRouteHops(value[0])}
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500">More hops = better privacy, higher cost</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-neon-cyan">Use Private RPC</label>
                        <Switch
                          checked={usePrivateRPC}
                          onCheckedChange={setUsePrivateRPC}
                          className="data-[state=checked]:bg-neon-pink"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-neon-cyan">Obfuscate Metadata</label>
                        <Switch
                          checked={obfuscateMetadata}
                          onCheckedChange={setObfuscateMetadata}
                          className="data-[state=checked]:bg-neon-pink"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-tech-mono text-neon-cyan">Network</label>
                      <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                        <SelectTrigger className="bg-black border-zinc-800">
                          <SelectValue placeholder="Select network" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-zinc-800">
                          <SelectItem value="solana">Solana</SelectItem>
                          <SelectItem value="ethereum">Ethereum</SelectItem>
                          <SelectItem value="arbitrum">Arbitrum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-tech-mono text-neon-cyan">Route Type</label>
                      <Select value={routeType} onValueChange={setRouteType}>
                        <SelectTrigger className="bg-black border-zinc-800">
                          <SelectValue placeholder="Select route type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-zinc-800">
                          <SelectItem value="transaction">Transaction</SelectItem>
                          <SelectItem value="swap">Token Swap</SelectItem>
                          <SelectItem value="transfer">Token Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <CyberButton onClick={startRouting} disabled={isRouting} glowColor="cyan" className="w-full mt-4">
                      {isRouting ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> ROUTING...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" /> START ROUTING
                        </>
                      )}
                    </CyberButton>
                  </div>
                </CyberCard>

                <CyberCard className="bg-black/60 mt-6">
                  <h3 className="text-lg font-bold text-neon-cyan mb-4">Route Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          routeStatus === "initializing"
                            ? "bg-yellow-500"
                            : routeStatus === "complete"
                              ? "bg-green-500"
                              : routeStatus === "failed"
                                ? "bg-red-500"
                                : "bg-zinc-500"
                        }`}
                      ></div>
                      <p className="text-sm font-tech-mono">
                        {routeStatus === "initializing"
                          ? "ROUTING IN PROGRESS"
                          : routeStatus === "complete"
                            ? "ROUTING COMPLETE"
                            : routeStatus === "failed"
                              ? "ROUTING FAILED"
                              : "READY TO ROUTE"}
                      </p>
                    </div>

                    {routeStatus === "complete" && (
                      <div className="p-3 border border-green-500/30 rounded-md bg-green-500/10">
                        <p className="text-green-500 font-tech-mono text-sm">
                          Transaction successfully routed through {routeHops} hops with {privacyLevel}% privacy level.
                        </p>
                      </div>
                    )}

                    {routeStatus === "failed" && (
                      <div className="p-3 border border-red-500/30 rounded-md bg-red-500/10">
                        <p className="text-red-500 font-tech-mono text-sm">
                          Routing failed. Please check your settings and try again.
                        </p>
                      </div>
                    )}
                  </div>
                </CyberCard>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="logs" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="logs" className="font-tech-mono">
                      LOGS
                    </TabsTrigger>
                    <TabsTrigger value="visualization" className="font-tech-mono">
                      VISUALIZATION
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="font-tech-mono">
                      ADVANCED
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="logs">
                    <CyberCard className="bg-black/60 h-[500px] overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-pink">Routing Logs</h3>
                        <div className="flex gap-2">
                          <CyberButton variant="outline" size="sm" glowColor="cyan" className="h-8 px-2">
                            <RefreshCw className="h-4 w-4" />
                          </CyberButton>
                        </div>
                      </div>
                      <div className="h-[440px] overflow-y-auto bg-black/50 rounded-md p-4 font-tech-mono text-xs">
                        {routeLog.map((log, index) => (
                          <div key={index} className="mb-1 text-zinc-300">
                            {log}
                          </div>
                        ))}
                      </div>
                    </CyberCard>
                  </TabsContent>

                  <TabsContent value="visualization">
                    <CyberCard className="bg-black/60 h-[500px] overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-cyan">Route Visualization</h3>
                      </div>
                      <div className="h-[440px] flex flex-col items-center justify-center">
                        {routeStatus === "complete" ? (
                          <div className="w-full max-w-md">
                            <div className="mb-6">
                              <h4 className="text-sm font-tech-mono text-neon-pink mb-2">Route Path</h4>
                              <div className="relative h-20">
                                {/* Source node */}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-neon-pink/20 border border-neon-pink flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-neon-pink"></div>
                                </div>

                                {/* Route hops */}
                                {Array.from({ length: routeHops }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-neon-cyan/20 border border-neon-cyan flex items-center justify-center"
                                    style={{ left: `${((i + 1) * 100) / (routeHops + 1)}%` }}
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></div>
                                  </div>
                                ))}

                                {/* Destination node */}
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-neon-pink/20 border border-neon-pink flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-neon-pink"></div>
                                </div>

                                {/* Connection lines */}
                                <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-pink"></div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-tech-mono text-zinc-400">Privacy Score</span>
                                <span className="text-sm font-tech-mono text-neon-cyan">{privacyLevel}/100</span>
                              </div>
                              <div className="w-full bg-zinc-800 h-2 rounded-full">
                                <div
                                  className="bg-gradient-to-r from-neon-pink to-neon-cyan h-2 rounded-full"
                                  style={{ width: `${privacyLevel}%` }}
                                ></div>
                              </div>

                              <div className="p-4 border border-zinc-800 rounded-md">
                                <p className="text-xs text-zinc-400 font-tech-mono mb-2">Traceability Analysis</p>
                                <p className="text-sm text-white">
                                  {privacyLevel < 30
                                    ? "High risk of transaction tracing."
                                    : privacyLevel < 70
                                      ? "Moderate privacy protection. Basic tracking prevention."
                                      : "Strong privacy protection. Transaction origin effectively concealed."}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <AlertCircle className="h-12 w-12 text-zinc-500 mb-4 mx-auto" />
                            <p className="text-zinc-400 font-tech-mono mb-2">No active route</p>
                            <p className="text-zinc-500 text-sm">Start routing to see visualization</p>
                          </div>
                        )}
                      </div>
                    </CyberCard>
                  </TabsContent>

                  <TabsContent value="advanced">
                    <CyberCard className="bg-black/60 h-[500px] overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-pink">Advanced Configuration</h3>
                      </div>
                      <div className="h-[440px] overflow-y-auto">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-tech-mono text-neon-cyan mb-4">Custom RPC Endpoints</h4>
                            <div className="p-4 border border-zinc-800 rounded-md">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-tech-mono">Private RPC #1</span>
                                <span className="text-xs text-green-500 font-tech-mono">CONNECTED</span>
                              </div>
                              <p className="text-xs text-zinc-500 font-tech-mono">
                                https://rpc-shadow-1.blkbox.network
                              </p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-tech-mono text-neon-cyan mb-4">Routing Algorithm</h4>
                            <TerminalCode
                              code={`// Stealth routing algorithm configuration
{
"algorithm": "shadow_path_v2",
"parameters": {
  "minHops": ${routeHops},
  "maxHops": ${routeHops + 2},
  "privacyLevel": ${privacyLevel},
  "usePrivateRPC": ${usePrivateRPC},
  "obfuscateMetadata": ${obfuscateMetadata},
  "network": "${selectedNetwork}",
  "routeType": "${routeType}",
  "timeoutMs": 30000,
  "retryCount": 3,
  "gasMultiplier": 1.2
},
"securityFeatures": {
  "antiFingerprinting": true,
  "timeShuffling": true,
  "dummyTransactions": ${privacyLevel > 70},
  "metadataScrubbing": true
}
}`}
                            />
                          </div>

                          <div>
                            <h4 className="text-sm font-tech-mono text-neon-cyan mb-4">Security Settings</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-tech-mono text-zinc-400">Anti-Fingerprinting</label>
                                <Switch defaultChecked className="data-[state=checked]:bg-neon-cyan" />
                              </div>
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-tech-mono text-zinc-400">Time Shuffling</label>
                                <Switch defaultChecked className="data-[state=checked]:bg-neon-cyan" />
                              </div>
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-tech-mono text-zinc-400">Dummy Transactions</label>
                                <Switch checked={privacyLevel > 70} className="data-[state=checked]:bg-neon-cyan" />
                              </div>
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-tech-mono text-zinc-400">Metadata Scrubbing</label>
                                <Switch defaultChecked className="data-[state=checked]:bg-neon-cyan" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CyberCard>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </TierGate>
      </main>
    </div>
  )
}
