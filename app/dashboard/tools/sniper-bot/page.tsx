"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Crosshair,
  RefreshCw,
  Settings,
  Play,
  Pause,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
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

export default function SniperBotPage() {
  const { connected } = useWallet()
  const [isRunning, setIsRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [targetAddress, setTargetAddress] = useState("")
  const [buyAmount, setBuyAmount] = useState("0.5")
  const [slippage, setSlippage] = useState(15)
  const [gasMultiplier, setGasMultiplier] = useState(2)
  const [autoSell, setAutoSell] = useState(false)
  const [takeProfitPercentage, setTakeProfitPercentage] = useState(200)
  const [stopLossPercentage, setStopLossPercentage] = useState(50)
  const [expandedSection, setExpandedSection] = useState<string | null>("settings")
  const [logs, setLogs] = useState<string[]>([])
  const [targets, setTargets] = useState<any[]>([])

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Set initial values
        setLogs([
          "System initialized...",
          "Connecting to mempool...",
          "Monitoring for token launches...",
          "Sniper bot ready.",
        ])

        // Set mock targets
        setTargets([
          {
            name: "PEPE2",
            address: "0x2a09fbb4d4654a4b8b702b68a5c0a412ffa2b543",
            launchTime: "2025-04-22T15:30:00Z",
            initialLiquidity: "$250,000",
            status: "upcoming",
          },
          {
            name: "MOONCAT",
            address: "0x8b7f78c9d91f3eb5c25d8ace6eb8b984588b7e8f",
            launchTime: "2025-04-22T18:00:00Z",
            initialLiquidity: "$500,000",
            status: "upcoming",
          },
          {
            name: "ROCKET",
            address: "0x4d2f3c5a5b9a242f840e5852ab4a1c9c1c81c836",
            launchTime: "2025-04-21T12:00:00Z",
            initialLiquidity: "$750,000",
            status: "active",
          },
        ])
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

  // Add log entry
  const addLog = (message: string) => {
    setLogs((prev) => {
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      return [`[${timestamp}] ${message}`, ...prev.slice(0, 99)]
    })
  }

  // Handle start/stop
  const toggleSniper = () => {
    if (isRunning) {
      setIsRunning(false)
      addLog("Sniper bot stopped.")
    } else {
      setIsRunning(true)
      addLog("Sniper bot started.")
      addLog(`Targeting token at address: ${targetAddress || "Auto-detection enabled"}`)

      // Simulate sniper activity
      simulateSniper()
    }
  }

  // Simulate sniper activity
  const simulateSniper = () => {
    if (!isRunning) return

    const sniperInterval = setInterval(() => {
      if (!isRunning) {
        clearInterval(sniperInterval)
        return
      }

      // Random chance to find token launch
      if (Math.random() > 0.7) {
        const tokenAddress = targetAddress || "0x" + Math.random().toString(16).slice(2, 42)
        addLog(`Token launch detected: ${tokenAddress}`)

        // Simulate buy transaction
        setTimeout(() => {
          if (isRunning) {
            addLog(`Executing buy for ${buyAmount} SOL with ${slippage}% slippage...`)

            // Simulate transaction confirmation
            setTimeout(() => {
              if (isRunning) {
                addLog(`Buy transaction confirmed! Acquired tokens successfully.`)

                // If auto-sell is enabled, simulate profit taking
                if (autoSell) {
                  setTimeout(() => {
                    if (isRunning) {
                      const profitPercentage = Math.floor(Math.random() * 300 + 50)
                      addLog(`Price target reached: +${profitPercentage}%`)
                      addLog(`Executing auto-sell...`)

                      setTimeout(() => {
                        addLog(`Sell transaction confirmed! Profit secured: +${profitPercentage}%`)
                      }, 2000)
                    }
                  }, 5000)
                }
              }
            }, 3000)
          }
        }, 1000)
      }
    }, 10000)

    return () => clearInterval(sniperInterval)
  }

  // Set target from list
  const setTarget = (address: string) => {
    setTargetAddress(address)
    addLog(`Target set to: ${address}`)
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
                text="SNIPER BOT"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">MICROSECOND-PRECISION EXECUTION WHEN TOKENS LAUNCH</p>
              <DataPulse className="my-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-cyan mb-4">Sniper Status</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isRunning ? "bg-green-500" : "bg-red-500"}`}></div>
                    <p className="text-lg font-bold text-neon-pink">{isRunning ? "ACTIVE" : "INACTIVE"}</p>
                  </div>
                  <CyberButton
                    onClick={toggleSniper}
                    glowColor={isRunning ? "pink" : "cyan"}
                    size="sm"
                    className="gap-2"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="h-4 w-4" /> STOP
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
                      ? "Sniper bot is active. Monitoring for token launches."
                      : "Sniper bot is inactive. Click START to begin monitoring."}
                  </p>
                </div>
              </CyberCard>

              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-pink mb-4">Target Configuration</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-tech-mono text-zinc-400">Target Token Address (Optional)</label>
                    <Input
                      placeholder="0x..."
                      value={targetAddress}
                      onChange={(e) => setTargetAddress(e.target.value)}
                      className="bg-black border-zinc-800 focus:border-neon-pink"
                    />
                    <p className="text-xs text-zinc-500">Leave empty for auto-detection</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-tech-mono text-zinc-400">Buy Amount (SOL)</label>
                    <Input
                      type="number"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      className="bg-black border-zinc-800 focus:border-neon-pink"
                    />
                  </div>
                </div>
              </CyberCard>

              <CyberCard className="bg-black/60">
                <h3 className="text-lg font-bold text-neon-cyan mb-4">Performance Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-400 font-tech-mono">Success Rate</p>
                    <p className="text-2xl font-bold text-neon-pink">92%</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 font-tech-mono">Avg. Entry Time</p>
                    <p className="text-2xl font-bold text-neon-cyan">0.8s</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 font-tech-mono">Tokens Sniped</p>
                    <p className="text-2xl font-bold text-neon-pink">24</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 font-tech-mono">Avg. Profit</p>
                    <p className="text-2xl font-bold text-neon-cyan">+187%</p>
                  </div>
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
                    <TabsTrigger value="targets" className="font-tech-mono">
                      TARGETS
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

                  <TabsContent value="targets">
                    <CyberCard className="bg-black/60 h-[400px] overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-cyan">Upcoming Launches</h3>
                        <CyberButton variant="outline" size="sm" glowColor="pink" className="gap-2">
                          <RefreshCw className="h-4 w-4" /> REFRESH
                        </CyberButton>
                      </div>
                      <div className="h-[340px] overflow-y-auto">
                        {targets.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full">
                            <AlertCircle className="h-12 w-12 text-zinc-500 mb-4" />
                            <p className="text-zinc-400 font-tech-mono">No upcoming launches found</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {targets.map((target, index) => (
                              <div
                                key={index}
                                className="p-4 border border-zinc-800 rounded-md hover:border-neon-pink/50 transition-colors"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-full bg-neon-pink/10">
                                      <Crosshair className="h-4 w-4 text-neon-pink" />
                                    </div>
                                    <span className="font-tech-mono text-neon-cyan">{target.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-xs font-tech-mono ${
                                        target.status === "active" ? "text-green-500" : "text-yellow-500"
                                      }`}
                                    >
                                      {target.status.toUpperCase()}
                                    </span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                                  <div>
                                    <p className="text-xs text-zinc-400 font-tech-mono">Address</p>
                                    <p className="text-sm font-tech-mono text-white">
                                      {target.address.slice(0, 6)}...{target.address.slice(-4)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-zinc-400 font-tech-mono">Launch Time</p>
                                    <p className="text-sm font-tech-mono text-white">
                                      {new Date(target.launchTime).toLocaleString()}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-zinc-400 font-tech-mono">Initial Liquidity</p>
                                    <p className="text-sm font-tech-mono text-white">{target.initialLiquidity}</p>
                                  </div>
                                </div>

                                <div className="mt-3 flex justify-end">
                                  <CyberButton size="sm" glowColor="cyan" onClick={() => setTarget(target.address)}>
                                    SET TARGET
                                  </CyberButton>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CyberCard>
                  </TabsContent>

                  <TabsContent value="code">
                    <CyberCard className="bg-black/60 h-[400px] overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-pink">Sniper Algorithm</h3>
                      </div>
                      <div className="h-[340px] overflow-y-auto">
                        <TerminalCode
                          code={`// Sniper Bot Core Algorithm
async function monitorAndSnipe(targetAddress = null) {
  console.log("Starting sniper bot...");
  
  // Connect to mempool
  const mempool = await connectToMempool();
  
  // Set up filters
  const filters = {
    targetAddress: targetAddress,
    minLiquidity: 5000, // Minimum liquidity in USD
    maxSlippage: ${slippage}, // Maximum allowed slippage
    gasMultiplier: ${gasMultiplier} // Gas price multiplier for priority
  };
  
  console.log("Monitoring mempool for token launches...");
  
  // Start monitoring
  mempool.on("pendingTransaction", async (tx) => {
    // Check if transaction is a liquidity add
    if (isLiquidityAdd(tx)) {
      const tokenAddress = extractTokenAddress(tx);
      
      // If target address is specified, only snipe that token
      if (filters.targetAddress && tokenAddress !== filters.targetAddress) {
        return;
      }
      
      console.log(\`Liquidity add detected for token: \${tokenAddress}\`);
      
      // Check liquidity amount
      const liquidityAmount = calculateLiquidityUSD(tx);
      if (liquidityAmount < filters.minLiquidity) {
        console.log(\`Skipping - insufficient liquidity: $\${liquidityAmount}\`);
        return;
      }
      
      // Execute buy
      console.log(\`Executing buy for \${buyAmount} SOL\`);
      const buyTx = await executeBuy(tokenAddress, ${buyAmount}, filters);
      
      // Monitor price for auto-sell if enabled
      if (${autoSell}) {
        monitorPriceForSell(tokenAddress, buyTx, {
          takeProfit: ${takeProfitPercentage},
          stopLoss: ${stopLossPercentage}
        });
      }
    }
  });
}

async function executeBuy(tokenAddress, amount, filters) {
  // Prepare transaction
  const tx = {
    to: "0xRouter",
    data: encodeBuyFunction(tokenAddress, amount),
    value: ethers.utils.parseEther(amount.toString()),
    gasLimit: 500000,
    gasPrice: (await provider.getGasPrice()).mul(filters.gasMultiplier)
  };
  
  // Sign and send transaction
  const signedTx = await wallet.signTransaction(tx);
  const receipt = await provider.sendTransaction(signedTx);
  
  console.log(\`Buy transaction sent: \${receipt.hash}\`);
  return receipt;
}

async function monitorPriceForSell(tokenAddress, buyTx, thresholds) {
  const initialPrice = await getTokenPrice(tokenAddress);
  console.log(\`Initial price: $\${initialPrice}\`);
  
  // Start price monitoring
  const interval = setInterval(async () => {
    const currentPrice = await getTokenPrice(tokenAddress);
    const priceChange = ((currentPrice - initialPrice) / initialPrice) * 100;
    
    console.log(\`Current price: $\${currentPrice} (${priceChange.toFixed(2)}%)\`);
    
    // Check take profit
    if (priceChange >= thresholds.takeProfit) {
      console.log(\`Take profit triggered at +\${priceChange.toFixed(2)}%\`);
      await executeSell(tokenAddress);
      clearInterval(interval);
    }
    
    // Check stop loss
    if (priceChange <= -thresholds.stopLoss) {
      console.log(\`Stop loss triggered at \${priceChange.toFixed(2)}%\`);
      await executeSell(tokenAddress);
      clearInterval(interval);
    }
  }, 1000);
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
                    <h3 className="text-lg font-bold text-neon-cyan">Sniper Settings</h3>
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
                          <label className="text-sm font-tech-mono text-zinc-400">Max Slippage</label>
                          <span className="text-sm font-tech-mono text-neon-pink">{slippage}%</span>
                        </div>
                        <Slider
                          value={[slippage]}
                          min={1}
                          max={50}
                          step={1}
                          onValueChange={(value) => setSlippage(value[0])}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-tech-mono text-zinc-400">Gas Multiplier</label>
                          <span className="text-sm font-tech-mono text-neon-cyan">{gasMultiplier}x</span>
                        </div>
                        <Slider
                          value={[gasMultiplier * 10]}
                          min={10}
                          max={50}
                          step={5}
                          onValueChange={(value) => setGasMultiplier(value[0] / 10)}
                          className="w-full"
                        />
                        <p className="text-xs text-zinc-500">
                          Higher multiplier increases chance of transaction inclusion
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Auto-Detect Launches</label>
                        <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                      </div>
                    </div>
                  )}
                </CyberCard>

                <CyberCard className="bg-black/60">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("autosell")}
                  >
                    <h3 className="text-lg font-bold text-neon-pink">Auto-Sell Configuration</h3>
                    {expandedSection === "autosell" ? (
                      <ChevronUp className="h-5 w-5 text-neon-cyan" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neon-cyan" />
                    )}
                  </div>

                  {expandedSection === "autosell" && (
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Enable Auto-Sell</label>
                        <Switch
                          checked={autoSell}
                          onCheckedChange={setAutoSell}
                          className="data-[state=checked]:bg-neon-cyan"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-tech-mono text-zinc-400">Take Profit</label>
                          <span className="text-sm font-tech-mono text-neon-pink">{takeProfitPercentage}%</span>
                        </div>
                        <Slider
                          value={[takeProfitPercentage]}
                          min={50}
                          max={500}
                          step={10}
                          onValueChange={(value) => setTakeProfitPercentage(value[0])}
                          className="w-full"
                          disabled={!autoSell}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-tech-mono text-zinc-400">Stop Loss</label>
                          <span className="text-sm font-tech-mono text-neon-cyan">{stopLossPercentage}%</span>
                        </div>
                        <Slider
                          value={[stopLossPercentage]}
                          min={10}
                          max={90}
                          step={5}
                          onValueChange={(value) => setStopLossPercentage(value[0])}
                          className="w-full"
                          disabled={!autoSell}
                        />
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
                        <label className="text-sm font-tech-mono text-zinc-400">Anti-Rug Protection</label>
                        <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Honeypot Detection</label>
                        <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Multi-DEX Scanning</label>
                        <Switch defaultChecked className="data-[state=checked]:bg-neon-pink" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-tech-mono text-zinc-400">Private Transaction Routing</label>
                        <Switch className="data-[state=checked]:bg-neon-pink" />
                      </div>
                      <div className="mt-4">
                        <CyberButton variant="outline" size="sm" glowColor="cyan" className="w-full">
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
