"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, RefreshCw, AlertCircle, ChevronUp, ChevronDown } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

export default function MarketManipulationDetectionPage() {
  const { connected } = useWallet()
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [scanThreshold, setScanThreshold] = useState(90)
  const [gasMultiplier, setGasMultiplier] = useState(1.5)
  const [autoExecute, setAutoExecute] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>("settings")
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
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
    setIsScanning(false)
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
        <TierGate requiredTier="SHADOW_ELITE">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="MARKET MANIPULATION DETECTION"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">IDENTIFY AND ANALYZE MARKET MANIPULATION PATTERNS</p>
              <DataPulse className="my-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-cyan mb-4 text-center">Scan Status</h3>
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
                        <AlertTriangle className="h-4 w-4" /> START SCAN
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
                      ? "Scanning blockchain for manipulation patterns..."
                      : "Click START SCAN to begin analyzing market data."}
                  </p>
                </div>
              </CyberCard>

              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-pink mb-4 text-center">Detection Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-400 font-tech-mono">Alerts Found</p>
                    <p className="text-2xl font-bold text-neon-cyan">0</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 font-tech-mono">High Confidence</p>
                    <p className="text-2xl font-bold text-neon-pink">0</p>
                  </div>
                </div>
              </CyberCard>

              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-cyan mb-4 text-center">Analysis</h3>
                <div className="flex items-center justify-center mb-4">
                  <p className="text-sm text-zinc-400 font-tech-mono">No analysis available</p>
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
                    <TabsTrigger value="patterns" className="font-tech-mono">
                      PATTERNS
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="font-tech-mono">
                      SETTINGS
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="logs">
                    <CyberCard className="bg-black/60 h-[500px] overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-pink text-center">System Logs</h3>
                        <div className="flex gap-2">
                          <CyberButton variant="outline" size="sm" glowColor="cyan" className="h-8 px-2">
                            <RefreshCw className="h-4 w-4" />
                          </CyberButton>
                        </div>
                      </div>
                      <div className="h-[440px] overflow-y-auto bg-black/50 rounded-md p-4 font-tech-mono text-xs">
                        <p>No logs yet</p>
                      </div>
                    </CyberCard>
                  </TabsContent>

                  <TabsContent value="patterns">
                    <CyberCard className="bg-black/60 h-[500px] overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-cyan text-center">Detected Patterns</h3>
                      </div>
                      <div className="flex flex-col items-center justify-center h-[440px]">
                        <AlertCircle className="h-12 w-12 text-zinc-500 mb-4" />
                        <p className="text-zinc-400 font-tech-mono mb-2">No patterns detected yet</p>
                        <p className="text-zinc-500 text-sm text-center max-w-md">
                          Start a scan to analyze market data
                        </p>
                      </div>
                    </CyberCard>
                  </TabsContent>

                  <TabsContent value="settings">
                    <CyberCard className="bg-black/60">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("settings")}
                      >
                        <h3 className="text-lg font-bold text-neon-cyan text-center">Scan Settings</h3>
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
                              <label className="text-sm font-tech-mono text-zinc-400">Scan Threshold</label>
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
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <CyberCard className="bg-black/60">
                  <h3 className="text-lg font-bold text-neon-pink mb-4 text-center">Detection Methods</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Wash Trading Detection</label>
                      <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Pump and Dump Detection</label>
                      <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Front Running Detection</label>
                      <Switch className="data-[state=checked]:bg-neon-pink" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Insider Trading Detection</label>
                      <Switch className="data-[state=checked]:bg-neon-pink" />
                    </div>
                  </div>
                </CyberCard>

                <CyberCard className="bg-black/60">
                  <h3 className="text-lg font-bold text-neon-cyan mb-4 text-center">Alert Configuration</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Email Notifications</label>
                      <Switch defaultChecked className="data-[state=checked]:bg-neon-cyan" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-tech-mono text-zinc-400">Telegram Alerts</label>
                      <Switch className="data-[state=checked]:bg-neon-cyan" />
                    </div>
                    <div className="mt-4">
                      <CyberButton variant="outline" size="sm" glowColor="pink" className="w-full">
                        CONFIGURE ALERT SETTINGS
                      </CyberButton>
                    </div>
                  </div>
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
