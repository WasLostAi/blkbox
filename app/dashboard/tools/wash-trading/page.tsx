"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  RefreshCw,
  Play,
  Pause,
  Settings,
  BarChart3,
  Wallet,
  Clock,
  Zap,
  AlertTriangle,
  ArrowRight,
  Trash2,
  Plus,
  Save,
} from "lucide-react"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import GlitchText from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"
import TerminalCode from "@/components/terminal-code"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

export default function WashTradingEnginePage() {
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [progress, setProgress] = useState(0)
  const [tradingVolume, setTradingVolume] = useState(0)
  const [tradingPairs, setTradingPairs] = useState([
    { id: 1, pair: "BLKBOX/USDC", active: true, volume: 0, trades: 0 },
    { id: 2, pair: "BLKBOX/SOL", active: false, volume: 0, trades: 0 },
  ])
  const [settings, setSettings] = useState({
    tradeFrequency: 60, // trades per minute
    volumeVariance: 30, // percentage
    priceImpact: 15, // percentage
    walletRotation: true,
    antiDetectionMode: true,
    timeRandomization: true,
    gasOptimization: true,
  })
  const [wallets, setWallets] = useState([
    { id: 1, address: "8xH4...j9Kz", balance: "12,450 USDC", active: true },
    { id: 2, address: "3rT7...p2Wx", balance: "8,230 USDC", active: true },
    { id: 3, address: "9qL5...m7Ry", balance: "15,780 USDC", active: true },
  ])

  // Simulated logs
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Wash Trading Engine initialized",
    "[CONFIG] Default parameters loaded",
    "[READY] Engine awaiting activation",
  ])

  // Add log entry
  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message])
  }

  // Toggle engine running state
  const toggleEngine = () => {
    if (!isRunning) {
      addLog("[SYSTEM] Engine starting...")
      addLog("[SECURITY] Anti-detection protocols engaged")
      addLog("[WALLETS] Rotating wallets for transaction distribution")
      setIsRunning(true)
    } else {
      addLog("[SYSTEM] Engine shutting down...")
      addLog("[SECURITY] Clearing transaction fingerprints")
      setIsRunning(false)
    }
  }

  // Update settings
  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    addLog(`[CONFIG] Updated ${key} to ${value}`)
  }

  // Toggle trading pair active state
  const toggleTradingPair = (id: number) => {
    setTradingPairs((prev) => prev.map((pair) => (pair.id === id ? { ...pair, active: !pair.active } : pair)))
    const pair = tradingPairs.find((p) => p.id === id)
    if (pair) {
      addLog(`[PAIRS] ${pair.pair} ${!pair.active ? "activated" : "deactivated"}`)
    }
  }

  // Toggle wallet active state
  const toggleWallet = (id: number) => {
    setWallets((prev) => prev.map((wallet) => (wallet.id === id ? { ...wallet, active: !wallet.active } : wallet)))
    const wallet = wallets.find((w) => w.id === id)
    if (wallet) {
      addLog(`[WALLETS] Wallet ${wallet.address} ${!wallet.active ? "activated" : "deactivated"}`)
    }
  }

  // Simulate trading activity
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      // Update progress
      setProgress((prev) => {
        const newProgress = prev + 1
        return newProgress > 100 ? 0 : newProgress
      })

      // Simulate trading volume increase
      setTradingVolume((prev) => {
        const increase = Math.random() * 500 + 100
        return prev + increase
      })

      // Update trading pairs
      setTradingPairs((prev) =>
        prev.map((pair) => {
          if (!pair.active) return pair

          const volumeIncrease = Math.random() * 1000 + 200
          const tradesIncrease = Math.floor(Math.random() * 5) + 1

          return {
            ...pair,
            volume: pair.volume + volumeIncrease,
            trades: pair.trades + tradesIncrease,
          }
        }),
      )

      // Add random log entries
      const logMessages = [
        `[TRADE] Executed ${Math.floor(Math.random() * 5) + 1} trades on BLKBOX/USDC`,
        `[VOLUME] Added ${Math.floor(Math.random() * 1000) + 200} USDC in wash volume`,
        `[WALLET] Rotated to wallet ${Math.floor(Math.random() * 999) + 100}`,
        `[SECURITY] Randomized transaction timing by ${Math.floor(Math.random() * 10) + 1} seconds`,
        `[GAS] Optimized gas usage for transaction batch`,
        `[PRICE] Simulated market buy with 0.${Math.floor(Math.random() * 99) + 1}% price impact`,
      ]

      if (Math.random() > 0.7) {
        addLog(logMessages[Math.floor(Math.random() * logMessages.length)])
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neon-pink mb-2">
            <GlitchText text="WASH TRADING ENGINE" />
          </h1>
          <p className="text-zinc-400 font-tech-mono text-sm">
            Advanced volume simulation with anti-detection protocols
          </p>
        </div>

        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <CyberButton onClick={toggleEngine} glowColor={isRunning ? "red" : "green"} className="gap-2">
                    {isRunning ? (
                      <>
                        <Pause size={16} /> STOP_ENGINE
                      </>
                    ) : (
                      <>
                        <Play size={16} /> START_ENGINE
                      </>
                    )}
                  </CyberButton>
                  {isRunning && (
                    <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isRunning ? "Stop the wash trading engine" : "Start the wash trading engine"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <CyberButton variant="outline" glowColor="cyan" className="gap-2" onClick={() => setActiveTab("settings")}>
            <Settings size={16} /> CONFIG
          </CyberButton>
        </div>
      </div>

      <DataPulse className="mb-6" color={isRunning ? "green" : "pink"} />

      {isRunning && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-500 font-tech-mono text-sm">ENGINE ACTIVE</span>
            <Progress value={progress} className="flex-1 h-2" />
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="dashboard" className="font-tech-mono">
            DASHBOARD
          </TabsTrigger>
          <TabsTrigger value="settings" className="font-tech-mono">
            SETTINGS
          </TabsTrigger>
          <TabsTrigger value="logs" className="font-tech-mono">
            LOGS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CyberCard className="bg-black/60">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-neon-cyan" />
                    <span className="font-tech-mono text-zinc-400 text-sm">TOTAL VOLUME</span>
                  </div>
                  <RefreshCw className="h-4 w-4 text-zinc-600" />
                </div>
                <div className="text-2xl font-bold text-neon-pink mb-1">
                  ${tradingVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-green-500 font-tech-mono">
                  +${(Math.random() * 1000 + 500).toLocaleString(undefined, { maximumFractionDigits: 0 })} (24h)
                </div>
              </div>
            </CyberCard>

            <CyberCard className="bg-black/60">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-neon-cyan" />
                    <span className="font-tech-mono text-zinc-400 text-sm">TRADE FREQUENCY</span>
                  </div>
                  <RefreshCw className="h-4 w-4 text-zinc-600" />
                </div>
                <div className="text-2xl font-bold text-neon-pink mb-1">{settings.tradeFrequency}/min</div>
                <div className="text-xs text-green-500 font-tech-mono">
                  {settings.timeRandomization ? "Randomized timing active" : "Fixed intervals"}
                </div>
              </div>
            </CyberCard>

            <CyberCard className="bg-black/60">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-neon-cyan" />
                    <span className="font-tech-mono text-zinc-400 text-sm">ACTIVE WALLETS</span>
                  </div>
                  <RefreshCw className="h-4 w-4 text-zinc-600" />
                </div>
                <div className="text-2xl font-bold text-neon-pink mb-1">
                  {wallets.filter((w) => w.active).length}/{wallets.length}
                </div>
                <div className="text-xs text-green-500 font-tech-mono">
                  {settings.walletRotation ? "Auto-rotation enabled" : "Manual selection"}
                </div>
              </div>
            </CyberCard>

            <CyberCard className="bg-black/60">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-neon-cyan" />
                    <span className="font-tech-mono text-zinc-400 text-sm">DETECTION RISK</span>
                  </div>
                  <RefreshCw className="h-4 w-4 text-zinc-600" />
                </div>
                <div className="text-2xl font-bold text-neon-pink mb-1">
                  {settings.antiDetectionMode ? "LOW" : "HIGH"}
                </div>
                <div className="text-xs text-green-500 font-tech-mono">
                  {settings.antiDetectionMode ? "Anti-detection active" : "Standard mode"}
                </div>
              </div>
            </CyberCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CyberCard className="bg-black/60">
              <h3 className="text-lg font-bold text-neon-cyan mb-4">Trading Pairs</h3>
              <div className="space-y-4">
                {tradingPairs.map((pair) => (
                  <div
                    key={pair.id}
                    className="flex items-center justify-between p-3 border border-zinc-800 rounded-md bg-black/40"
                  >
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={pair.active}
                        onCheckedChange={() => toggleTradingPair(pair.id)}
                        className="data-[state=checked]:bg-neon-cyan"
                      />
                      <div>
                        <div className="font-bold text-white">{pair.pair}</div>
                        <div className="text-xs text-zinc-500 font-tech-mono">
                          {pair.trades} trades • ${pair.volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
                          volume
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${pair.active ? "bg-green-500 animate-pulse" : "bg-zinc-700"}`}
                      />
                      <span className={`text-xs font-tech-mono ${pair.active ? "text-green-500" : "text-zinc-700"}`}>
                        {pair.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>
                  </div>
                ))}
                <CyberButton variant="outline" size="sm" className="w-full gap-2">
                  <Plus size={14} /> ADD TRADING PAIR
                </CyberButton>
              </div>
            </CyberCard>

            <CyberCard className="bg-black/60">
              <h3 className="text-lg font-bold text-neon-cyan mb-4">Wallet Rotation</h3>
              <div className="space-y-4">
                {wallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="flex items-center justify-between p-3 border border-zinc-800 rounded-md bg-black/40"
                  >
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={wallet.active}
                        onCheckedChange={() => toggleWallet(wallet.id)}
                        className="data-[state=checked]:bg-neon-cyan"
                      />
                      <div>
                        <div className="font-bold text-white">{wallet.address}</div>
                        <div className="text-xs text-zinc-500 font-tech-mono">Balance: {wallet.balance}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${wallet.active ? "bg-green-500 animate-pulse" : "bg-zinc-700"}`}
                      />
                      <span className={`text-xs font-tech-mono ${wallet.active ? "text-green-500" : "text-zinc-700"}`}>
                        {wallet.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>
                  </div>
                ))}
                <CyberButton variant="outline" size="sm" className="w-full gap-2">
                  <Plus size={14} /> ADD WALLET
                </CyberButton>
              </div>
            </CyberCard>
          </div>

          <CyberCard className="bg-black/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neon-cyan">Risk Assessment</h3>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-yellow-900/50 bg-yellow-950/20 rounded-md">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Legal Disclaimer</h4>
                    <p className="text-sm text-zinc-400 font-tech-mono">
                      Wash trading is prohibited on regulated exchanges. This tool is provided for educational and
                      testing purposes only. Users are responsible for compliance with all applicable laws and
                      regulations in their jurisdiction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 border border-zinc-800 rounded-md bg-black/40">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs font-tech-mono text-zinc-400">DETECTION RISK</span>
                  </div>
                  <div className="text-lg font-bold text-white mb-1">Low</div>
                  <div className="text-xs text-zinc-500 font-tech-mono">Anti-detection protocols active</div>
                </div>

                <div className="p-3 border border-zinc-800 rounded-md bg-black/40">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-xs font-tech-mono text-zinc-400">VOLUME ANOMALY</span>
                  </div>
                  <div className="text-lg font-bold text-white mb-1">Medium</div>
                  <div className="text-xs text-zinc-500 font-tech-mono">Consider reducing trade frequency</div>
                </div>

                <div className="p-3 border border-zinc-800 rounded-md bg-black/40">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs font-tech-mono text-zinc-400">WALLET PATTERNS</span>
                  </div>
                  <div className="text-lg font-bold text-white mb-1">Low</div>
                  <div className="text-xs text-zinc-500 font-tech-mono">Wallet rotation functioning properly</div>
                </div>
              </div>
            </div>
          </CyberCard>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <CyberCard className="bg-black/60">
            <h3 className="text-lg font-bold text-neon-cyan mb-4">Engine Configuration</h3>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-zinc-400 font-tech-mono">Trade Frequency (per minute)</Label>
                    <span className="text-neon-pink font-bold">{settings.tradeFrequency}</span>
                  </div>
                  <Slider
                    value={[settings.tradeFrequency]}
                    min={1}
                    max={120}
                    step={1}
                    onValueChange={(value) => updateSetting("tradeFrequency", value[0])}
                    className="py-2"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-zinc-400 font-tech-mono">Volume Variance (%)</Label>
                    <span className="text-neon-pink font-bold">{settings.volumeVariance}%</span>
                  </div>
                  <Slider
                    value={[settings.volumeVariance]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => updateSetting("volumeVariance", value[0])}
                    className="py-2"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-zinc-400 font-tech-mono">Price Impact (%)</Label>
                    <span className="text-neon-pink font-bold">{settings.priceImpact}%</span>
                  </div>
                  <Slider
                    value={[settings.priceImpact]}
                    min={0}
                    max={50}
                    step={1}
                    onValueChange={(value) => updateSetting("priceImpact", value[0])}
                    className="py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-md bg-black/40">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-neon-cyan" />
                    <Label className="text-zinc-400 font-tech-mono">Wallet Rotation</Label>
                  </div>
                  <Switch
                    checked={settings.walletRotation}
                    onCheckedChange={(checked) => updateSetting("walletRotation", checked)}
                    className="data-[state=checked]:bg-neon-cyan"
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-md bg-black/40">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-neon-cyan" />
                    <Label className="text-zinc-400 font-tech-mono">Anti-Detection Mode</Label>
                  </div>
                  <Switch
                    checked={settings.antiDetectionMode}
                    onCheckedChange={(checked) => updateSetting("antiDetectionMode", checked)}
                    className="data-[state=checked]:bg-neon-cyan"
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-md bg-black/40">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-neon-cyan" />
                    <Label className="text-zinc-400 font-tech-mono">Time Randomization</Label>
                  </div>
                  <Switch
                    checked={settings.timeRandomization}
                    onCheckedChange={(checked) => updateSetting("timeRandomization", checked)}
                    className="data-[state=checked]:bg-neon-cyan"
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-md bg-black/40">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-neon-cyan" />
                    <Label className="text-zinc-400 font-tech-mono">Gas Optimization</Label>
                  </div>
                  <Switch
                    checked={settings.gasOptimization}
                    onCheckedChange={(checked) => updateSetting("gasOptimization", checked)}
                    className="data-[state=checked]:bg-neon-cyan"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <CyberButton variant="outline" glowColor="red" className="gap-2">
                  <Trash2 size={14} /> RESET DEFAULTS
                </CyberButton>
                <CyberButton glowColor="cyan" className="gap-2">
                  <Save size={14} /> SAVE CONFIGURATION
                </CyberButton>
              </div>
            </div>
          </CyberCard>

          <CyberCard className="bg-black/60">
            <h3 className="text-lg font-bold text-neon-cyan mb-4">Advanced Settings</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-400 font-tech-mono mb-2 block">Transaction Routing</Label>
                  <Select defaultValue="smart">
                    <SelectTrigger className="bg-black border-zinc-800">
                      <SelectValue placeholder="Select routing method" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-zinc-800">
                      <SelectItem value="direct">Direct</SelectItem>
                      <SelectItem value="smart">Smart Routing</SelectItem>
                      <SelectItem value="multi">Multi-hop</SelectItem>
                      <SelectItem value="stealth">Stealth Mode</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-zinc-400 font-tech-mono mb-2 block">Gas Strategy</Label>
                  <Select defaultValue="dynamic">
                    <SelectTrigger className="bg-black border-zinc-800">
                      <SelectValue placeholder="Select gas strategy" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-zinc-800">
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="dynamic">Dynamic Adjustment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-zinc-400 font-tech-mono mb-2 block">Trade Size Distribution</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger className="bg-black border-zinc-800">
                      <SelectValue placeholder="Select distribution" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-zinc-800">
                      <SelectItem value="uniform">Uniform</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="pareto">Pareto (80/20)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-zinc-400 font-tech-mono mb-2 block">Timing Pattern</Label>
                  <Select defaultValue="random">
                    <SelectTrigger className="bg-black border-zinc-800">
                      <SelectValue placeholder="Select timing pattern" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-zinc-800">
                      <SelectItem value="fixed">Fixed Intervals</SelectItem>
                      <SelectItem value="random">Randomized</SelectItem>
                      <SelectItem value="burst">Burst Mode</SelectItem>
                      <SelectItem value="natural">Natural Pattern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-zinc-400 font-tech-mono mb-2 block">Custom RPC Endpoints</Label>
                <Input placeholder="https://rpc.example.com" className="bg-black border-zinc-800" />
                <p className="text-xs text-zinc-500 mt-1">
                  Enter custom RPC endpoints for transaction routing (comma separated)
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <CyberButton variant="outline" glowColor="red" className="gap-2">
                  <ArrowRight size={14} /> EXPORT CONFIG
                </CyberButton>
                <CyberButton glowColor="cyan" className="gap-2">
                  <Save size={14} /> SAVE ADVANCED SETTINGS
                </CyberButton>
              </div>
            </div>
          </CyberCard>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <CyberCard className="bg-black/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neon-cyan">System Logs</h3>
              <div className="flex items-center gap-2">
                <CyberButton variant="outline" size="sm" glowColor="cyan" className="gap-1">
                  <RefreshCw size={12} /> REFRESH
                </CyberButton>
                <CyberButton variant="outline" size="sm" glowColor="red" className="gap-1">
                  <Trash2 size={12} /> CLEAR
                </CyberButton>
              </div>
            </div>

            <div className="h-[400px] overflow-y-auto font-mono text-sm bg-black/80 rounded-md p-4 border border-zinc-800">
              <TerminalCode>
                {logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-zinc-500">[{new Date().toISOString().slice(11, 19)}]</span> {log}
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center gap-2 text-green-500">
                    <span className="animate-pulse">▋</span> Engine running...
                  </div>
                )}
              </TerminalCode>
            </div>
          </CyberCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}
