"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Target, RefreshCw, AlertCircle, ChevronDown, ChevronUp, Zap, Crosshair, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"
import { generateLiquidationTargets } from "@/utils/mock-data"
import TerminalCode from "@/components/terminal-code"

export default function LiquidationHunterPage() {
  const { connected, tier } = useWallet()
  const [isLoading, setIsLoading] = useState(true)
  const [isScanning, setIsScanning] = useState(false)
  const [liquidationTargets, setLiquidationTargets] = useState<any[]>([])
  const [selectedTarget, setSelectedTarget] = useState<any | null>(null)
  const [scanThreshold, setScanThreshold] = useState(90)
  const [gasMultiplier, setGasMultiplier] = useState(1.5)
  const [autoExecute, setAutoExecute] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>("settings")
  const [scanProgress, setScanProgress] = useState(0)

  // Redirect if not connected - this replaces the TierGate component
  useEffect(() => {
    // We only check if connected, not tier level since the user should have access to all tools
    if (!connected) {
      // You could add a redirect here if needed
      console.log("User not connected")
    }
  }, [connected])

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
        const targets = generateLiquidationTargets(5)
        setLiquidationTargets(targets)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  // Handle scan start
  const startScan = () => {
    if (isScanning) return

    setIsScanning(true)
    setScanProgress(0)

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          finishScan()
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  // Handle scan completion
  const finishScan = () => {
    // Generate new targets
    const newTargets = generateLiquidationTargets(8)
    setLiquidationTargets(newTargets)
    setIsScanning(false)
  }

  // Select a target
  const selectTarget = (target: any) => {
    setSelectedTarget(target)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Calculate health factor color
  const getHealthColor = (health: number) => {
    if (health < 1.1) return "text-red-500"
    if (health < 1.25) return "text-yellow-500"
    return "text-green-500"
  }

  // Calculate liquidation profit
  const calculateProfit = (target: any) => {
    const liquidationBonus = target.collateralValue * 0.08 // 8% liquidation bonus
    const gasCost = 0.05 * gasMultiplier // Estimated gas cost in ETH
    const gasCostUSD = gasCost * 3500 // Assuming ETH price of $3500
    return liquidationBonus - gasCostUSD
  }

  // If not connected, show a minimal connection prompt instead of nothing
  if (!connected) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <MatrixBackground />
        <CircuitPattern />
        <div className="z-10 max-w-md w-full p-8">
          <GlitchText text="AUTHENTICATION REQUIRED" className="text-2xl font-bold text-neon-pink mb-4 text-center" />
          <p className="text-zinc-300 font-tech-mono mb-6 text-center">
            Connect your wallet to access the Liquidation Hunter tool.
          </p>
          <div className="flex justify-center">
            <WalletConnector buttonSize="lg" glowColor="cyan" />
          </div>
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

          <WalletConnector buttonSize="sm" glowColor="cyan" />
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <GlitchText
              text="LIQUIDATION HUNTER"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">TARGET VULNERABLE POSITIONS BEFORE THEY COLLAPSE</p>
            <DataPulse className="my-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <CyberCard className="bg-black/60">
              <h3 className="text-lg font-bold text-neon-cyan mb-4">Scan Status</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isScanning ? "bg-green-500" : "bg-red-500"}`}></div>
                  <p className="text-lg font-bold text-neon-pink">{isScanning ? "SCANNING" : "IDLE"}</p>
                </div>
                <CyberButton
                  onClick={startScan}
                  disabled={isScanning}
                  glowColor={isScanning ? "pink" : "cyan"}
                  size="sm"
                  className="gap-2"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" /> SCANNING...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4" /> START SCAN
                    </>
                  )}
                </CyberButton>
              </div>
              {isScanning && (
                <div className="space-y-2">
                  <Progress value={scanProgress} className="h-2 bg-zinc-800" indicatorClassName="bg-neon-cyan" />
                  <p className="text-xs text-zinc-400 font-tech-mono text-right">{scanProgress}% complete</p>
                </div>
              )}
              <div className="mt-4">
                <p className="text-sm text-zinc-400 font-tech-mono">
                  {isScanning
                    ? "Scanning blockchain for vulnerable positions..."
                    : "Click START SCAN to begin searching for liquidation opportunities."}
                </p>
              </div>
            </CyberCard>

            <CyberCard className="bg-black/60">
              <h3 className="text-lg font-bold text-neon-pink mb-4">Liquidation Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400 font-tech-mono">Targets Found</p>
                  <p className="text-2xl font-bold text-neon-cyan">{liquidationTargets.length}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 font-tech-mono">High Priority</p>
                  <p className="text-2xl font-bold text-neon-pink">
                    {liquidationTargets.filter((t) => t.healthFactor < 1.1).length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 font-tech-mono">Total Value</p>
                  <p className="text-xl font-bold text-neon-cyan">
                    {formatCurrency(liquidationTargets.reduce((sum, t) => sum + t.collateralValue, 0))}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 font-tech-mono">Potential Profit</p>
                  <p className="text-xl font-bold text-neon-pink">
                    {formatCurrency(liquidationTargets.reduce((sum, t) => sum + calculateProfit(t), 0))}
                  </p>
                </div>
              </div>
            </CyberCard>

            <CyberCard className="bg-black/60">
              <h3 className="text-lg font-bold text-neon-cyan mb-4">Execution Status</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <p className="text-lg font-bold text-neon-pink">READY</p>
                </div>
                <CyberButton disabled={!selectedTarget} glowColor="cyan" size="sm" className="gap-2">
                  <Zap className="h-4 w-4" /> EXECUTE
                </CyberButton>
              </div>
              <div className="mt-4">
                <p className="text-sm text-zinc-400 font-tech-mono">
                  {selectedTarget
                    ? `Target selected: ${selectedTarget.protocol} position with ${formatCurrency(selectedTarget.collateralValue)} collateral`
                    : "Select a target from the list below to execute liquidation."}
                </p>
              </div>
            </CyberCard>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="targets" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="targets" className="font-tech-mono">
                    TARGETS
                  </TabsTrigger>
                  <TabsTrigger value="history" className="font-tech-mono">
                    HISTORY
                  </TabsTrigger>
                  <TabsTrigger value="simulation" className="font-tech-mono">
                    SIMULATION
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="targets">
                  <CyberCard className="bg-black/60 h-[500px] overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-neon-pink">Liquidation Targets</h3>
                      <div className="flex gap-2">
                        <CyberButton variant="outline" size="sm" glowColor="cyan" className="h-8 px-2">
                          <RefreshCw className="h-4 w-4" />
                        </CyberButton>
                      </div>
                    </div>
                    <div className="h-[440px] overflow-y-auto">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full">
                          <RefreshCw className="h-8 w-8 text-neon-cyan animate-spin mb-4" />
                          <p className="text-zinc-400 font-tech-mono">Loading liquidation targets...</p>
                        </div>
                      ) : liquidationTargets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                          <AlertCircle className="h-8 w-8 text-zinc-500 mb-4" />
                          <p className="text-zinc-400 font-tech-mono">No liquidation targets found</p>
                          <p className="text-zinc-500 text-sm mt-2">Start a scan to find vulnerable positions</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {liquidationTargets.map((target, index) => (
                            <div
                              key={index}
                              className={`p-4 border rounded-md transition-colors cursor-pointer ${
                                selectedTarget === target
                                  ? "border-neon-cyan bg-neon-cyan/10"
                                  : "border-zinc-800 hover:border-neon-pink/50"
                              }`}
                              onClick={() => selectTarget(target)}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 rounded-full bg-neon-pink/10">
                                    <Target className="h-4 w-4 text-neon-pink" />
                                  </div>
                                  <span className="font-tech-mono text-neon-cyan">{target.protocol}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-tech-mono text-zinc-400">Health Factor:</span>
                                  <span className={`text-sm font-bold ${getHealthColor(target.healthFactor)}`}>
                                    {target.healthFactor.toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                                <div>
                                  <p className="text-xs text-zinc-400 font-tech-mono">Collateral</p>
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-tech-mono text-white">
                                      {target.collateralAmount.toFixed(4)} {target.collateralToken}
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                      ({formatCurrency(target.collateralValue)})
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-zinc-400 font-tech-mono">Debt</p>
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-tech-mono text-white">
                                      {target.debtAmount.toFixed(4)} {target.debtToken}
                                    </span>
                                    <span className="text-xs text-zinc-500">({formatCurrency(target.debtValue)})</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-zinc-400 font-tech-mono">Liquidation Threshold</p>
                                  <p className="text-sm font-tech-mono text-white">{target.liquidationThreshold}%</p>
                                </div>
                                <div>
                                  <p className="text-xs text-zinc-400 font-tech-mono">Potential Profit</p>
                                  <p className="text-sm font-tech-mono text-neon-pink">
                                    {formatCurrency(calculateProfit(target))}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-3 flex justify-end">
                                <CyberButton
                                  size="sm"
                                  variant={selectedTarget === target ? "default" : "outline"}
                                  glowColor="cyan"
                                >
                                  {selectedTarget === target ? "SELECTED" : "SELECT"}
                                </CyberButton>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CyberCard>
                </TabsContent>

                <TabsContent value="history">
                  <CyberCard className="bg-black/60 h-[500px] overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-neon-cyan">Liquidation History</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[440px]">
                      <AlertCircle className="h-12 w-12 text-zinc-500 mb-4" />
                      <p className="text-zinc-400 font-tech-mono mb-2">No liquidation history yet</p>
                      <p className="text-zinc-500 text-sm text-center max-w-md">
                        Your executed liquidations will appear here
                      </p>
                    </div>
                  </CyberCard>
                </TabsContent>

                <TabsContent value="simulation">
                  <CyberCard className="bg-black/60 h-[500px] overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-neon-pink">Liquidation Simulator</h3>
                    </div>
                    {selectedTarget ? (
                      <div className="h-[440px] overflow-y-auto">
                        <div className="mb-6">
                          <h4 className="text-sm font-tech-mono text-neon-cyan mb-2">Simulation Parameters</h4>
                          <div className="grid grid-cols-2 gap-4 p-4 border border-zinc-800 rounded-md">
                            <div>
                              <p className="text-xs text-zinc-400 font-tech-mono">Protocol</p>
                              <p className="text-sm font-tech-mono text-white">{selectedTarget.protocol}</p>
                            </div>
                            <div>
                              <p className="text-xs text-zinc-400 font-tech-mono">Health Factor</p>
                              <p className={`text-sm font-bold ${getHealthColor(selectedTarget.healthFactor)}`}>
                                {selectedTarget.healthFactor.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-zinc-400 font-tech-mono">Collateral</p>
                              <p className="text-sm font-tech-mono text-white">
                                {selectedTarget.collateralAmount.toFixed(4)} {selectedTarget.collateralToken}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-zinc-400 font-tech-mono">Debt</p>
                              <p className="text-sm font-tech-mono text-white">
                                {selectedTarget.debtAmount.toFixed(4)} {selectedTarget.debtToken}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-zinc-400 font-tech-mono">Gas Price (Gwei)</p>
                              <p className="text-sm font-tech-mono text-white">25</p>
                            </div>
                            <div>
                              <p className="text-xs text-zinc-400 font-tech-mono">Gas Multiplier</p>
                              <p className="text-sm font-tech-mono text-white">{gasMultiplier}x</p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm font-tech-mono text-neon-cyan mb-2">Simulation Results</h4>
                          <div className="grid grid-cols-2 gap-4 p-4 border border-zinc-800 rounded-md">
                            <div>
                              <p className="text-xs text-zinc-400 font-tech-mono">Liquidation Bonus</p>
                              <p className="text-sm font-tech-mono text-neon-pink">
                                {formatCurrency(selectedTarget.collateralValue * 0.08)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-zinc-400 font-tech-mono">Gas Cost</p>
                              <p className="text-sm font-tech-mono text-white">
                                {formatCurrency(0.05 * gasMultiplier * 3500)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-zinc-400 font-tech-mono">Net Profit</p>
                              <p className="text-sm font-tech-mono text-neon-cyan">
                                {formatCurrency(calculateProfit(selectedTarget))}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-zinc-400 font-tech-mono">Success Probability</p>
                              <p className="text-sm font-tech-mono text-white">
                                {selectedTarget.healthFactor < 1.05
                                  ? "95%"
                                  : selectedTarget.healthFactor < 1.1
                                    ? "80%"
                                    : "60%"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm font-tech-mono text-neon-cyan mb-2">Transaction Preview</h4>
                          <TerminalCode
                            code={`// Liquidation Transaction
const liquidationTx = {
  to: "${selectedTarget.protocol.toLowerCase()}.liquidationProxy.sol",
  data: encodeFunctionCall("liquidatePosition", [
    "${selectedTarget.positionId}",
    "${selectedTarget.collateralToken}",
    "${selectedTarget.debtToken}",
    ${selectedTarget.debtAmount.toFixed(4)},
    true // Receive collateral as reward
  ]),
  value: "0",
  gasLimit: 850000,
  gasPrice: ${Math.floor(25 * gasMultiplier * 1e9)} // ${gasMultiplier}x priority fee
};

// Expected outcome:
// - Repay ${selectedTarget.debtAmount.toFixed(4)} ${selectedTarget.debtToken}
// - Receive ~${(selectedTarget.collateralAmount * 0.08).toFixed(4)} ${selectedTarget.collateralToken} as bonus
// - Net profit: ${formatCurrency(calculateProfit(selectedTarget))}`}
                          />
                        </div>

                        <div className="flex justify-end">
                          <CyberButton glowColor="pink" className="gap-2">
                            <Zap className="h-4 w-4" /> EXECUTE LIQUIDATION
                          </CyberButton>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[440px]">
                        <Crosshair className="h-12 w-12 text-zinc-500 mb-4" />
                        <p className="text-zinc-400 font-tech-mono mb-2">No target selected</p>
                        <p className="text-zinc-500 text-sm text-center max-w-md">
                          Select a liquidation target to run simulation
                        </p>
                      </div>
                    )}
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
                  <h3 className="text-lg font-bold text-neon-cyan">Scan Settings</h3>
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
                        <label className="text-sm font-tech-mono text-zinc-400">Health Factor Threshold</label>
                        <span className="text-sm font-tech-mono text-neon-pink">{scanThreshold}%</span>
                      </div>
                      <Slider
                        value={[scanThreshold]}
                        min={80}
                        max={110}
                        step={1}
                        onValueChange={(value) => setScanThreshold(value[0])}
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500">
                        Only show positions with health factor below {scanThreshold / 100}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Gas Price Multiplier</label>
                        <span className="text-sm font-tech-mono text-neon-cyan">{gasMultiplier}x</span>
                      </div>
                      <Slider
                        value={[gasMultiplier * 10]}
                        min={10}
                        max={30}
                        step={5}
                        onValueChange={(value) => setGasMultiplier(value[0] / 10)}
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500">
                        Higher multiplier increases chance of transaction inclusion
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Auto-Execute Liquidations</label>
                      <Switch
                        checked={autoExecute}
                        onCheckedChange={setAutoExecute}
                        className="data-[state=checked]:bg-neon-cyan"
                      />
                    </div>
                  </div>
                )}
              </CyberCard>

              <CyberCard className="bg-black/60">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection("protocols")}
                >
                  <h3 className="text-lg font-bold text-neon-pink">Protocol Filters</h3>
                  {expandedSection === "protocols" ? (
                    <ChevronUp className="h-5 w-5 text-neon-cyan" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neon-cyan" />
                  )}
                </div>

                {expandedSection === "protocols" && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Aave</label>
                      <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Compound</label>
                      <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Solend</label>
                      <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Jet Protocol</label>
                      <Switch className="data-[state=checked]:bg-neon-pink" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Kamino Finance</label>
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
                      <label className="text-sm font-tech-mono text-zinc-400">Flash Loan Liquidation</label>
                      <Switch defaultChecked className="data-[state=checked]:bg-neon-cyan" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Private RPC Endpoints</label>
                      <Switch defaultChecked className="data-[state=checked]:bg-neon-cyan" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Profit Threshold</label>
                      <span className="text-sm font-tech-mono text-neon-cyan">$50</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Receive as</label>
                      <span className="text-sm font-tech-mono text-neon-cyan">Collateral</span>
                    </div>
                    <div className="mt-4">
                      <CyberButton variant="outline" size="sm" glowColor="pink" className="w-full">
                        CONFIGURE ADVANCED SETTINGS
                      </CyberButton>
                    </div>
                  </div>
                )}
              </CyberCard>

              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-pink mb-4">Liquidation Protection</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-neon-cyan/10">
                    <Shield className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-sm font-tech-mono text-white">Shadow Council Protection</p>
                    <p className="text-xs text-zinc-400">Your positions are protected from liquidation</p>
                  </div>
                </div>
                <CyberButton variant="outline" glowColor="cyan" size="sm" className="w-full">
                  MANAGE PROTECTION
                </CyberButton>
              </CyberCard>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
