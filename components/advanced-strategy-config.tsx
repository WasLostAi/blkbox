"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import CyberButton from "@/components/cyber-button"
import { X, Plus, Settings, Brain, BarChartIcon as ChartBar, Zap } from "lucide-react"

interface AdvancedStrategyConfigProps {
  onConfigChange: (config: any) => void
}

export default function AdvancedStrategyConfig({ onConfigChange }: AdvancedStrategyConfigProps) {
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>(["EMA", "RSI", "MACD", "Bollinger Bands"])
  const [optimizationMethod, setOptimizationMethod] = useState<string>("genetic")
  const [walkForwardAnalysis, setWalkForwardAnalysis] = useState<boolean>(true)
  const [monteCarlo, setMonteCarlo] = useState<boolean>(true)
  const [monteCarloSimulations, setMonteCarloSimulations] = useState<number>(1000)
  const [featureEngineering, setFeatureEngineering] = useState<boolean>(true)
  const [hyperparameterTuning, setHyperparameterTuning] = useState<boolean>(true)

  const availableIndicators = [
    "SMA",
    "EMA",
    "WMA",
    "VWAP",
    "RSI",
    "MACD",
    "Bollinger Bands",
    "Ichimoku Cloud",
    "Stochastic",
    "ADX",
    "ATR",
    "OBV",
    "Fibonacci",
    "Pivot Points",
    "Keltner Channels",
    "Parabolic SAR",
    "Supertrend",
    "Volume Profile",
    "Market Cipher",
    "Heikin Ashi",
  ]

  const handleAddIndicator = (indicator: string) => {
    if (!selectedIndicators.includes(indicator)) {
      const newIndicators = [...selectedIndicators, indicator]
      setSelectedIndicators(newIndicators)
      updateConfig({ indicators: newIndicators })
    }
  }

  const handleRemoveIndicator = (indicator: string) => {
    const newIndicators = selectedIndicators.filter((i) => i !== indicator)
    setSelectedIndicators(newIndicators)
    updateConfig({ indicators: newIndicators })
  }

  const handleOptimizationChange = (method: string) => {
    setOptimizationMethod(method)
    updateConfig({ optimizationMethod: method })
  }

  const updateConfig = (changes: any) => {
    onConfigChange({
      indicators: selectedIndicators,
      optimizationMethod,
      walkForwardAnalysis,
      monteCarlo,
      monteCarloSimulations,
      featureEngineering,
      hyperparameterTuning,
      ...changes,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-xs text-neon-pink hover:text-neon-cyan transition-colors">Configure</button>
      </DialogTrigger>
      <DialogContent className="bg-black border border-neon-pink/50 p-0 max-w-3xl w-full">
        <DialogHeader className="p-6 border-b border-neon-pink/30">
          <DialogTitle className="text-xl font-bold text-neon-cyan">Advanced Strategy Configuration</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="indicators" className="p-6">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="indicators" className="font-tech-mono">
              <ChartBar className="h-4 w-4 mr-2" /> INDICATORS
            </TabsTrigger>
            <TabsTrigger value="optimization" className="font-tech-mono">
              <Settings className="h-4 w-4 mr-2" /> OPTIMIZATION
            </TabsTrigger>
            <TabsTrigger value="ai" className="font-tech-mono">
              <Brain className="h-4 w-4 mr-2" /> AI FEATURES
            </TabsTrigger>
          </TabsList>

          <TabsContent value="indicators">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 p-3 border border-zinc-800 rounded-md min-h-[100px]">
                {selectedIndicators.map((indicator) => (
                  <div
                    key={indicator}
                    className="flex items-center bg-neon-pink/20 text-neon-pink px-2 py-1 rounded-md text-xs font-tech-mono"
                  >
                    {indicator}
                    <button onClick={() => handleRemoveIndicator(indicator)} className="ml-2">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-tech-mono text-neon-cyan">Available Indicators</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-2 border border-zinc-800 rounded-md">
                  {availableIndicators
                    .filter((i) => !selectedIndicators.includes(i))
                    .map((indicator) => (
                      <button
                        key={indicator}
                        onClick={() => handleAddIndicator(indicator)}
                        className="flex items-center text-zinc-400 hover:text-neon-cyan text-xs font-tech-mono p-1 hover:bg-zinc-900 rounded"
                      >
                        <Plus size={12} className="mr-1" /> {indicator}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="optimization">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-tech-mono text-neon-cyan">Optimization Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOptimizationChange("genetic")}
                    className={`p-3 border rounded-md text-sm font-tech-mono ${
                      optimizationMethod === "genetic"
                        ? "border-neon-pink bg-neon-pink/10 text-neon-pink"
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    Genetic Algorithm
                  </button>
                  <button
                    onClick={() => handleOptimizationChange("bayesian")}
                    className={`p-3 border rounded-md text-sm font-tech-mono ${
                      optimizationMethod === "bayesian"
                        ? "border-neon-pink bg-neon-pink/10 text-neon-pink"
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    Bayesian Optimization
                  </button>
                  <button
                    onClick={() => handleOptimizationChange("grid")}
                    className={`p-3 border rounded-md text-sm font-tech-mono ${
                      optimizationMethod === "grid"
                        ? "border-neon-pink bg-neon-pink/10 text-neon-pink"
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    Grid Search
                  </button>
                  <button
                    onClick={() => handleOptimizationChange("particle")}
                    className={`p-3 border rounded-md text-sm font-tech-mono ${
                      optimizationMethod === "particle"
                        ? "border-neon-pink bg-neon-pink/10 text-neon-pink"
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    Particle Swarm
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-tech-mono text-neon-cyan">Walk-Forward Analysis</label>
                <Switch
                  checked={walkForwardAnalysis}
                  onCheckedChange={(checked) => {
                    setWalkForwardAnalysis(checked)
                    updateConfig({ walkForwardAnalysis: checked })
                  }}
                  className="data-[state=checked]:bg-neon-pink"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-tech-mono text-neon-cyan">Monte Carlo Simulations</label>
                  <Switch
                    checked={monteCarlo}
                    onCheckedChange={(checked) => {
                      setMonteCarlo(checked)
                      updateConfig({ monteCarlo: checked })
                    }}
                    className="data-[state=checked]:bg-neon-pink"
                  />
                </div>

                {monteCarlo && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs font-tech-mono text-zinc-400">Number of Simulations</label>
                      <span className="text-xs font-tech-mono text-neon-pink">{monteCarloSimulations}</span>
                    </div>
                    <Slider
                      value={[monteCarloSimulations]}
                      min={100}
                      max={10000}
                      step={100}
                      onValueChange={(value) => {
                        setMonteCarloSimulations(value[0])
                        updateConfig({ monteCarloSimulations: value[0] })
                      }}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-tech-mono text-neon-cyan">Feature Engineering</label>
                <Switch
                  checked={featureEngineering}
                  onCheckedChange={(checked) => {
                    setFeatureEngineering(checked)
                    updateConfig({ featureEngineering: checked })
                  }}
                  className="data-[state=checked]:bg-neon-pink"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-tech-mono text-neon-cyan">Hyperparameter Tuning</label>
                <Switch
                  checked={hyperparameterTuning}
                  onCheckedChange={(checked) => {
                    setHyperparameterTuning(checked)
                    updateConfig({ hyperparameterTuning: checked })
                  }}
                  className="data-[state=checked]:bg-neon-pink"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-tech-mono text-neon-cyan">Custom AI Parameters</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 font-tech-mono">Learning Rate</label>
                    <Input
                      type="number"
                      defaultValue="0.001"
                      min="0.0001"
                      max="0.1"
                      step="0.0001"
                      className="bg-black border-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 font-tech-mono">Epochs</label>
                    <Input
                      type="number"
                      defaultValue="100"
                      min="10"
                      max="1000"
                      step="10"
                      className="bg-black border-zinc-800"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 border border-neon-cyan/30 rounded-md bg-neon-cyan/5">
                <div className="flex items-start gap-2">
                  <Zap className="h-5 w-5 text-neon-cyan shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-tech-mono text-neon-cyan">AI Quantum Enhancement</p>
                    <p className="text-xs text-zinc-400">
                      Enables quantum-inspired algorithms for pattern recognition in market data, providing a
                      significant edge in prediction accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-6 border-t border-zinc-800 flex justify-end">
          <CyberButton glowColor="cyan">Apply Configuration</CyberButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
