"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CyberCard from "@/components/cyber-card"
import { LineChart, BarChart, PieChart, Download, Share2 } from "lucide-react"

interface BacktestVisualizationProps {
  backtestResults: any
}

export default function BacktestVisualization({ backtestResults }: BacktestVisualizationProps) {
  const [chartType, setChartType] = useState<string>("equity")
  const [timeframe, setTimeframe] = useState<string>("all")
  const [showDrawdown, setShowDrawdown] = useState<boolean>(true)

  if (!backtestResults) return null

  const {
    totalTrades,
    winRate,
    profitFactor,
    sharpeRatio,
    maxDrawdown,
    annualizedReturn,
    monthlyReturns,
    dailyReturns,
    equityCurve,
    tradeDistribution,
    drawdownPeriods,
  } = backtestResults

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("equity")}
            className={`p-2 rounded ${chartType === "equity" ? "bg-neon-pink/20 text-neon-pink" : "bg-zinc-800 text-zinc-400"}`}
          >
            <LineChart size={16} />
          </button>
          <button
            onClick={() => setChartType("trades")}
            className={`p-2 rounded ${chartType === "trades" ? "bg-neon-pink/20 text-neon-pink" : "bg-zinc-800 text-zinc-400"}`}
          >
            <BarChart size={16} />
          </button>
          <button
            onClick={() => setChartType("distribution")}
            className={`p-2 rounded ${chartType === "distribution" ? "bg-neon-pink/20 text-neon-pink" : "bg-zinc-800 text-zinc-400"}`}
          >
            <PieChart size={16} />
          </button>
        </div>

        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="h-8 bg-black border-zinc-800 w-[100px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-black border-zinc-800">
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="year">1 Year</SelectItem>
              <SelectItem value="6month">6 Months</SelectItem>
              <SelectItem value="month">1 Month</SelectItem>
              <SelectItem value="week">1 Week</SelectItem>
            </SelectContent>
          </Select>

          <button className="p-2 bg-zinc-800 rounded hover:bg-zinc-700">
            <Download size={16} className="text-zinc-400" />
          </button>
          <button className="p-2 bg-zinc-800 rounded hover:bg-zinc-700">
            <Share2 size={16} className="text-zinc-400" />
          </button>
        </div>
      </div>

      <div className="h-[300px] bg-black/30 border border-zinc-800 rounded-md relative">
        {chartType === "equity" && (
          <div className="p-4 h-full">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
                <span className="text-xs text-zinc-400 font-tech-mono">Equity</span>
              </div>
              {showDrawdown && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-neon-pink"></div>
                  <span className="text-xs text-zinc-400 font-tech-mono">Drawdown</span>
                </div>
              )}
              <button
                onClick={() => setShowDrawdown(!showDrawdown)}
                className="text-xs text-neon-cyan hover:text-neon-pink"
              >
                {showDrawdown ? "Hide Drawdown" : "Show Drawdown"}
              </button>
            </div>

            {/* This would be a real chart in a production environment */}
            <div className="flex items-end h-[220px] gap-1 mt-8">
              {equityCurve.map((value: number, index: number) => (
                <div key={index} className="flex-1 relative group" style={{ height: `${value}%` }}>
                  <div className="w-full absolute bottom-0 bg-neon-cyan" style={{ height: "100%" }}></div>
                  {showDrawdown && drawdownPeriods[index] > 0 && (
                    <div
                      className="w-full absolute bottom-0 bg-neon-pink/50"
                      style={{ height: `${drawdownPeriods[index]}%`, bottom: `${value}%` }}
                    ></div>
                  )}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs font-tech-mono z-10">
                    {value.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {chartType === "trades" && (
          <div className="p-4 h-full">
            <div className="flex items-end h-[250px] gap-2 mt-4">
              {dailyReturns.slice(0, 30).map((value: number, index: number) => (
                <div
                  key={index}
                  className="flex-1 relative group"
                  style={{ height: `${Math.abs(value) * 5}%`, minHeight: "4px" }}
                >
                  <div
                    className={`w-full absolute bottom-0 ${value >= 0 ? "bg-neon-cyan" : "bg-neon-pink"}`}
                    style={{ height: "100%" }}
                  ></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs font-tech-mono z-10">
                    {value.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {chartType === "distribution" && (
          <div className="p-4 h-full flex items-center justify-center">
            <div className="w-[200px] h-[200px] relative rounded-full border border-zinc-800 overflow-hidden">
              <div
                className="absolute bg-neon-cyan"
                style={{
                  width: "100%",
                  height: "100%",
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(winRate * 0.01 * Math.PI * 2)}% ${50 - 50 * Math.sin(winRate * 0.01 * Math.PI * 2)}%, 50% 50%)`,
                }}
              ></div>
              <div
                className="absolute bg-neon-pink"
                style={{
                  width: "100%",
                  height: "100%",
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(winRate * 0.01 * Math.PI * 2)}% ${50 - 50 * Math.sin(winRate * 0.01 * Math.PI * 2)}%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%)`,
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-white">{winRate}%</span>
                <span className="text-xs text-zinc-400 font-tech-mono">Win Rate</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <CyberCard className="bg-black/30 p-3">
          <p className="text-xs text-zinc-400 font-tech-mono">Profit Factor</p>
          <p className="text-xl font-bold text-neon-cyan">{profitFactor.toFixed(2)}</p>
        </CyberCard>
        <CyberCard className="bg-black/30 p-3">
          <p className="text-xs text-zinc-400 font-tech-mono">Sharpe Ratio</p>
          <p className="text-xl font-bold text-neon-cyan">{sharpeRatio.toFixed(2)}</p>
        </CyberCard>
        <CyberCard className="bg-black/30 p-3">
          <p className="text-xs text-zinc-400 font-tech-mono">Max Drawdown</p>
          <p className="text-xl font-bold text-neon-pink">{maxDrawdown.toFixed(2)}%</p>
        </CyberCard>
        <CyberCard className="bg-black/30 p-3">
          <p className="text-xs text-zinc-400 font-tech-mono">Annual Return</p>
          <p className="text-xl font-bold text-neon-cyan">{annualizedReturn.toFixed(2)}%</p>
        </CyberCard>
        <CyberCard className="bg-black/30 p-3">
          <p className="text-xs text-zinc-400 font-tech-mono">Total Trades</p>
          <p className="text-xl font-bold text-neon-cyan">{totalTrades}</p>
        </CyberCard>
        <CyberCard className="bg-black/30 p-3">
          <p className="text-xs text-zinc-400 font-tech-mono">Win Rate</p>
          <p className="text-xl font-bold text-neon-cyan">{winRate}%</p>
        </CyberCard>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="monthly" className="font-tech-mono text-xs">
            MONTHLY RETURNS
          </TabsTrigger>
          <TabsTrigger value="trades" className="font-tech-mono text-xs">
            TRADE ANALYSIS
          </TabsTrigger>
          <TabsTrigger value="risk" className="font-tech-mono text-xs">
            RISK METRICS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monthly">
          <div className="grid grid-cols-4 gap-2">
            {monthlyReturns.map((value: number, index: number) => (
              <div key={index} className="p-2 border border-zinc-800 rounded-md">
                <p className="text-xs text-zinc-400 font-tech-mono">Month {index + 1}</p>
                <p className={`text-sm font-bold ${value >= 0 ? "text-neon-cyan" : "text-neon-pink"}`}>
                  {value >= 0 ? "+" : ""}
                  {value.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trades">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CyberCard className="bg-black/30 p-3">
                <p className="text-xs text-zinc-400 font-tech-mono">Average Win</p>
                <p className="text-sm font-bold text-neon-cyan">+2.34%</p>
              </CyberCard>
              <CyberCard className="bg-black/30 p-3">
                <p className="text-xs text-zinc-400 font-tech-mono">Average Loss</p>
                <p className="text-sm font-bold text-neon-pink">-1.12%</p>
              </CyberCard>
              <CyberCard className="bg-black/30 p-3">
                <p className="text-xs text-zinc-400 font-tech-mono">Largest Win</p>
                <p className="text-sm font-bold text-neon-cyan">+8.76%</p>
              </CyberCard>
              <CyberCard className="bg-black/30 p-3">
                <p className="text-xs text-zinc-400 font-tech-mono">Largest Loss</p>
                <p className="text-sm font-bold text-neon-pink">-4.32%</p>
              </CyberCard>
            </div>

            <div className="p-3 border border-zinc-800 rounded-md">
              <p className="text-xs text-zinc-400 font-tech-mono mb-2">Trade Duration Distribution</p>
              <div className="flex items-end h-[100px] gap-2">
                {[15, 25, 40, 60, 45, 30, 20, 10, 5].map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-neon-cyan/30 hover:bg-neon-cyan/50 transition-colors"
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-zinc-500">Minutes</span>
                <span className="text-xs text-zinc-500">Hours</span>
                <span className="text-xs text-zinc-500">Days</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="risk">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CyberCard className="bg-black/30 p-3">
                <p className="text-xs text-zinc-400 font-tech-mono">Sortino Ratio</p>
                <p className="text-sm font-bold text-neon-cyan">1.87</p>
              </CyberCard>
              <CyberCard className="bg-black/30 p-3">
                <p className="text-xs text-zinc-400 font-tech-mono">Calmar Ratio</p>
                <p className="text-sm font-bold text-neon-cyan">2.14</p>
              </CyberCard>
              <CyberCard className="bg-black/30 p-3">
                <p className="text-xs text-zinc-400 font-tech-mono">Recovery Factor</p>
                <p className="text-sm font-bold text-neon-cyan">3.21</p>
              </CyberCard>
              <CyberCard className="bg-black/30 p-3">
                <p className="text-xs text-zinc-400 font-tech-mono">Avg Drawdown</p>
                <p className="text-sm font-bold text-neon-pink">-2.76%</p>
              </CyberCard>
            </div>

            <div className="p-3 border border-zinc-800 rounded-md">
              <p className="text-xs text-zinc-400 font-tech-mono mb-2">Drawdown Periods</p>
              <div className="space-y-2">
                {[
                  { start: "Jan 15", end: "Jan 28", depth: 12.4 },
                  { start: "Mar 03", end: "Mar 17", depth: 8.7 },
                  { start: "Jun 22", end: "Jul 14", depth: 15.2 },
                ].map((period, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-neon-pink h-full" style={{ width: `${period.depth * 5}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center min-w-[180px]">
                      <span className="text-xs text-zinc-400">
                        {period.start} - {period.end}
                      </span>
                      <span className="text-xs text-neon-pink">-{period.depth}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 border border-zinc-800 rounded-md">
              <p className="text-xs text-zinc-400 font-tech-mono mb-2">Value at Risk (VaR)</p>
              <div className="flex items-center gap-2">
                <div className="w-full h-4 bg-gradient-to-r from-neon-cyan via-neon-cyan to-neon-pink rounded-full relative">
                  <div className="absolute top-full left-[95%] transform -translate-x-1/2 mt-1">
                    <div className="w-px h-2 bg-white"></div>
                    <p className="text-xs text-white mt-1">95% VaR</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-xs text-zinc-400">
                  Daily VaR (95%): <span className="text-neon-pink">-3.42%</span>
                </span>
                <span className="text-xs text-zinc-400">
                  Expected Shortfall: <span className="text-neon-pink">-5.17%</span>
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
