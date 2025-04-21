"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Settings, Play, Pause, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function MevExtractionPage() {
  const { connected } = useWallet()
  const [isRunning, setIsRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [extractionSpeed, setExtractionSpeed] = useState(50)
  const [profitThreshold, setProfitThreshold] = useState(0.05)
  const [autoReinvest, setAutoReinvest] = useState(false)
  const [priorityFee, setPriorityFee] = useState(2)
  const [extractedValue, setExtractedValue] = useState(0)
  const [pendingValue, setPendingValue] = useState(0)
  const [totalExtracted, setTotalExtracted] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [expandedSection, setExpandedSection] = useState<string | null>("settings")

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Set initial values
        setExtractedValue(0)
        setPendingValue(0)
        setTotalExtracted(Math.random() * 500 + 100)
        setLogs([
          "System initialized...",
          "Connecting to Solana RPC endpoints...",
          "Establishing mempool connection...",
          "MEV extraction system ready.",
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Handle start/stop extraction
  const toggleExtraction = () => {
    if (isRunning) {
      setIsRunning(false)
      addLog("MEV extraction paused.")
    } else {
      setIsRunning(true)
      addLog("MEV extraction started.")

      // Simulate extraction process
      simulateExtraction()
    }
  }

  // Add log entry
  const addLog = (message: string) => {
    setLogs((prev) => {
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      return [`[${timestamp}] ${message}`, ...prev.slice(0, 99)]
    })
  }

  // Simulate MEV extraction
  const simulateExtraction = () => {
    if (!isRunning) return

    const extractionInterval = setInterval(() => {
      if (!isRunning) {
        clearInterval(extractionInterval)
        return
      }

      // Random chance to find MEV opportunity
      if (Math.random() > 0.7) {
        const amount = Math.random() * 5 + 0.1
        setPendingValue((prev) => prev + amount)
        addLog(`MEV opportunity detected: +${amount.toFixed(4)} USDC`)

        // Simulate transaction confirmation delay
        setTimeout(() => {
          if (isRunning) {
            setExtractedValue((prev) => prev + amount)
            setPendingValue((prev) => prev - amount)
            setTotalExtracted((prev) => prev + amount)
            addLog(`MEV extraction confirmed: +${amount.toFixed(4)} USDC`)
          }
        }, 3000)
      }
    }, 2000)

    return () => clearInterval(extractionInterval)
  }

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
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

          <WalletConnector buttonSize="sm" glowColor="cyan" />
        </div>
      </header>

      <main className="flex-1 container py-12">
        <TierGate requiredTier="OPERATOR">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="MEV EXTRACTION"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">CAPTURE VALUE BEFORE OTHERS EVEN SEE THE OPPORTUNITY</p>
              <DataPulse className="my-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-cyan mb-4">Extracted Value</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-neon-pink">{extractedValue.toFixed(4)}</p>
                    <p className="text-sm text-zinc-400 font-tech-mono">USDC (current session)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-400 font-tech-mono">Pending</p>
                    <p className="text-lg font-bold text-neon-cyan">{pendingValue.toFixed(4)} USDC</p>
                  </div>
                </div>
              </CyberCard>

              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-pink mb-4">Total Extracted</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-neon-cyan">{totalExtracted.toFixed(4)}</p>
                    <p className="text-sm text-zinc-400 font-tech-mono">USDC (all time)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-400 font-tech-mono">Your Share</p>
                    <p className="text-lg font-bold text-neon-pink">100%</p>
                  </div>
                </div>
              </CyberCard>

              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-cyan mb-4">Extraction Status</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isRunning ? "bg-green-500" : "bg-red-500"}`}></div>
                    <p className="text-lg font-bold text-neon-pink">{isRunning ? "ACTIVE" : "INACTIVE"}</p>
                  </div>
                  <CyberButton
                    onClick={toggleExtraction}
                    glowColor={isRunning ? "pink" : "cyan"}
                    size="sm"
                    className="gap-2"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="h-4 w-4" /> PAUSE
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" /> START
                      </>
                    )}
                  </CyberButton>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-zinc-400 font-tech-mono">
                    {isRunning
                      ? "MEV extraction is running. Monitoring mempool for opportunities."
                      : "MEV extraction is paused. Click START to begin."}
                  </p>
                </div>
              </CyberCard>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Tabs defaultValue="logs" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="logs" className="font-tech-mono">
                      LOGS
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="font-tech-mono">
                      ANALYTICS
                    </TabsTrigger>
                    <TabsTrigger value="code" className="font-tech-mono">
                      CODE
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="logs">
                    <CyberCard className="bg-black/60 h-[400px] overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-pink">System Logs</h3>
                        <div className="flex gap-2">
                          <CyberButton variant="outline" size="sm" glowColor="cyan" className="h-8 px-2">
                            <RefreshCw className="h-4 w-4" />
                          </CyberButton>
                          <CyberButton variant="outline" size="sm" glowColor="pink" className="h-8 px-2">
                            <Settings className="h-4 w-4" />
                          </CyberButton>
                        </div>
                      </div>
                      <div className="h-[340px] overflow-y-auto bg-black/50 rounded-md p-4 font-tech-mono text-xs">
                        {logs.map((log, index) => (
                          <div key={index} className="mb-1 text-zinc-300">
                            {log}
                          </div>
                        ))}
                      </div>
                    </CyberCard>
                  </TabsContent>

                  <TabsContent value="analytics">
                    <CyberCard className="bg-black/60 h-[400px] overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-cyan">Extraction Analytics</h3>
                      </div>
                      <div className="flex flex-col items-center justify-center h-[340px]">
                        <AlertCircle className="h-12 w-12 text-zinc-500 mb-4" />
                        <p className="text-zinc-400 font-tech-mono">
                          Analytics will be available after 24 hours of extraction
                        </p>
                      </div>
                    </CyberCard>
                  </TabsContent>

                  <TabsContent value="code">
                    <CyberCard className="bg-black/60 h-[400px] overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-pink">Extraction Algorithm</h3>
                      </div>
                      <div className="h-[340px] overflow-y-auto">
                        <TerminalCode
                          code={`// MEV Extraction Core Algorithm
async function scanMempool(mempool) {
  const opportunities = [];
  
  for (const tx of mempool.pendingTransactions) {
    // Skip small transactions
    if (tx.value < MIN_TRANSACTION_VALUE) continue;
    
    // Check for arbitrage opportunities
    const arbOpportunity = await checkArbitrage(tx);
    if (arbOpportunity) {
      opportunities.push({
        type: 'arbitrage',
        expectedValue: arbOpportunity.profit,
        successProbability: arbOpportunity.probability,
        transaction: buildArbitrageTransaction(arbOpportunity)
      });
    }
    
    // Check for sandwich opportunities
    const sandwichOpportunity = await checkSandwich(tx);
    if (sandwichOpportunity) {
      opportunities.push({
        type: 'sandwich',
        expectedValue: sandwichOpportunity.profit,
        successProbability: sandwichOpportunity.probability,
        transaction: buildSandwichTransaction(sandwichOpportunity)
      });
    }
    
    // Check for liquidation opportunities
    const liquidationOpportunity = await checkLiquidation(tx);
    if (liquidationOpportunity) {
      opportunities.push({
        type: 'liquidation',
        expectedValue: liquidationOpportunity.profit,
        successProbability: liquidationOpportunity.probability,
        transaction: buildLiquidationTransaction(liquidationOpportunity)
      });
    }
  }
  
  return opportunities;
}

async function extractMEV() {
  const mempool = await getMempool();
  const opportunities = await scanMempool(mempool);
  
  // Filter for high-value opportunities
  const highValueOps = opportunities.filter(op => {
    return op.expectedValue > PROFIT_THRESHOLD && 
           op.successProbability > SUCCESS_PROBABILITY_THRESHOLD;
  });
  
  if (highValueOps.length > 0) {
    // Sort by expected value
    const bestOp = highValueOps.sort((a, b) => 
      b.expectedValue - a.expectedValue
    )[0];
    
    // Execute with priority gas
    return executeTransaction(bestOp.transaction, {
      priority: PRIORITY_FEE_LEVEL
    });
  }
  
  return null;
}`}
                        />
                      </div>
                    </CyberCard>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <CyberCard className="bg-black/60">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("settings")}
                  >
                    <h3 className="text-lg font-bold text-neon-cyan">Extraction Settings</h3>
                    {expandedSection === "settings" ? (
                      <ChevronUp className="h-5 w-5 text-neon-pink" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neon-pink" />
                    )}
                  </div>

                  {expandedSection === "settings" && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-tech-mono text-zinc-400">Extraction Speed</label>
                          <span className="text-sm font-tech-mono text-neon-pink">{extractionSpeed}%</span>
                        </div>
                        <Slider
                          value={[extractionSpeed]}
                          min={10}
                          max={100}
                          step={10}
                          onValueChange={(value) => setExtractionSpeed(value[0])}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-tech-mono text-zinc-400">Profit Threshold</label>
                          <span className="text-sm font-tech-mono text-neon-cyan">{profitThreshold} USDC</span>
                        </div>
                        <Slider
                          value={[profitThreshold * 100]}
                          min={1}
                          max={50}
                          step={1}
                          onValueChange={(value) => setProfitThreshold(value[0] / 100)}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-tech-mono text-zinc-400">Priority Fee</label>
                          <span className="text-sm font-tech-mono text-neon-pink">{priorityFee}x</span>
                        </div>
                        <Slider
                          value={[priorityFee]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => setPriorityFee(value[0])}
                          className="w-full"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Auto-Reinvest Profits</label>
                        <Switch
                          checked={autoReinvest}
                          onCheckedChange={setAutoReinvest}
                          className="data-[state=checked]:bg-neon-cyan"
                        />
                      </div>
                    </div>
                  )}
                </CyberCard>

                <CyberCard className="bg-black/60">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("strategies")}
                  >
                    <h3 className="text-lg font-bold text-neon-pink">Extraction Strategies</h3>
                    {expandedSection === "strategies" ? (
                      <ChevronUp className="h-5 w-5 text-neon-cyan" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neon-cyan" />
                    )}
                  </div>

                  {expandedSection === "strategies" && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Arbitrage</label>
                        <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Sandwich Trading</label>
                        <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Liquidations</label>
                        <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Just-in-Time Liquidity</label>
                        <Switch className="data-[state=checked]:bg-neon-pink" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Backrunning</label>
                        <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                      </div>
                    </div>
                  )}
                </CyberCard>

                <CyberCard className="bg-black/60">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("advanced")}
                  >
                    <h3 className="text-lg font-bold text-neon-cyan">Advanced Options</h3>
                    {expandedSection === "advanced" ? (
                      <ChevronUp className="h-5 w-5 text-neon-pink" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neon-pink" />
                    )}
                  </div>

                  {expandedSection === "advanced" && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Private RPC Endpoints</label>
                        <Switch defaultChecked className="data-[state=checked]:bg-neon-cyan" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Flashbots Integration</label>
                        <Switch className="data-[state=checked]:bg-neon-cyan" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Custom Gas Settings</label>
                        <Switch defaultChecked className="data-[state=checked]:bg-neon-cyan" />
                      </div>
                      <div className="mt-4">
                        <CyberButton variant="outline" size="sm" glowColor="pink" className="w-full">
                          CONFIGURE ADVANCED SETTINGS
                        </CyberButton>
                      </div>
                    </div>
                  )}
                </CyberCard>
              </div>
            </div>
          </div>
        </TierGate>
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
