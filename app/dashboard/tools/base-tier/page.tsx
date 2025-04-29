"use client"

import { useState } from "react"
import { CircuitPattern } from "@/components/circuit-pattern"
import { TerminalText } from "@/components/terminal-text"
import { CyberButton } from "@/components/cyber-button"
import { AiChatInterface } from "@/components/ai-chat-interface"
import { ToolCard } from "@/components/tool-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  BarChart3,
  Coins,
  DollarSign,
  TrendingUp,
  Shield,
  Rocket,
  Bot,
  PieChart,
  Sprout,
  Zap,
  Newspaper,
} from "lucide-react"

export default function BaseTierTools() {
  const [activeTab, setActiveTab] = useState("tools")
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const tools = [
    {
      id: "risk-management",
      name: "AI-Powered Risk Management",
      description: "Advanced risk assessment and mitigation strategies for your crypto portfolio",
      icon: <Shield className="w-10 h-10 text-emerald-400" />,
      color: "from-emerald-900/20 to-emerald-700/20 border-emerald-500/30",
    },
    {
      id: "arbitrage-bot",
      name: "Crypto Arbitrage Bot",
      description: "Identify and capitalize on price differences across exchanges",
      icon: <Zap className="w-10 h-10 text-yellow-400" />,
      color: "from-yellow-900/20 to-yellow-700/20 border-yellow-500/30",
    },
    {
      id: "staking-advisor",
      name: "Crypto Staking Advisor",
      description: "Optimize your staking strategy with AI-powered recommendations",
      icon: <Coins className="w-10 h-10 text-blue-400" />,
      color: "from-blue-900/20 to-blue-700/20 border-blue-500/30",
    },
    {
      id: "lending-advisor",
      name: "Crypto Lending & Borrowing Advisor",
      description: "Find the best rates and strategies for lending or borrowing crypto",
      icon: <DollarSign className="w-10 h-10 text-purple-400" />,
      color: "from-purple-900/20 to-purple-700/20 border-purple-500/30",
    },
    {
      id: "price-prediction",
      name: "Crypto Price Prediction Tool",
      description: "AI-driven price forecasts based on technical and fundamental analysis",
      icon: <TrendingUp className="w-10 h-10 text-pink-400" />,
      color: "from-pink-900/20 to-pink-700/20 border-pink-500/30",
    },
    {
      id: "scam-detector",
      name: "Crypto Scam Detector",
      description: "Identify potential scams and protect your investments",
      icon: <Shield className="w-10 h-10 text-red-400" />,
      color: "from-red-900/20 to-red-700/20 border-red-500/30",
    },
    {
      id: "ico-advisor",
      name: "ICO & Token Sale Advisor",
      description: "Evaluate new token offerings with comprehensive analysis",
      icon: <Rocket className="w-10 h-10 text-orange-400" />,
      color: "from-orange-900/20 to-orange-700/20 border-orange-500/30",
    },
    {
      id: "trading-assistant",
      name: "Crypto Trading Assistant",
      description: "Get real-time trading advice and market insights",
      icon: <BarChart3 className="w-10 h-10 text-cyan-400" />,
      color: "from-cyan-900/20 to-cyan-700/20 border-cyan-500/30",
    },
    {
      id: "portfolio-optimizer",
      name: "Crypto Portfolio Optimizer",
      description: "Optimize your portfolio allocation for maximum returns",
      icon: <PieChart className="w-10 h-10 text-indigo-400" />,
      color: "from-indigo-900/20 to-indigo-700/20 border-indigo-500/30",
    },
    {
      id: "yield-farming",
      name: "DeFi Yield Farming Advisor",
      description: "Discover the best yield farming opportunities with risk assessment",
      icon: <Sprout className="w-10 h-10 text-green-400" />,
      color: "from-green-900/20 to-green-700/20 border-green-500/30",
    },
    {
      id: "trading-bot",
      name: "AI Crypto Trading Bot",
      description: "Automated trading strategies powered by advanced AI",
      icon: <Bot className="w-10 h-10 text-violet-400" />,
      color: "from-violet-900/20 to-violet-700/20 border-violet-500/30",
    },
    {
      id: "news-aggregator",
      name: "Crypto News Aggregator",
      description: "Stay informed with AI-curated news and sentiment analysis",
      icon: <Newspaper className="w-10 h-10 text-teal-400" />,
      color: "from-teal-900/20 to-teal-700/20 border-teal-500/30",
    },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <CircuitPattern className="absolute inset-0 opacity-20" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              $BLKBOX Community Warchest
            </h1>
            <p className="text-gray-400 max-w-2xl">
              <TerminalText text="Base tier access to powerful AI-driven crypto tools. Hold 10,000+ $BLKBOX to unlock." />
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <CyberButton>
              <Brain className="mr-2 h-4 w-4" />
              Upgrade Tier
            </CyberButton>
          </div>
        </div>

        <Tabs defaultValue="tools" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8 bg-black/50 border border-cyan-500/20">
            <TabsTrigger value="tools" className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-400">
              Tools Grid
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-400">
              AI Chat Interface
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  title={tool.name}
                  description={tool.description}
                  icon={tool.icon}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`bg-gradient-to-br ${tool.color}`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-4 h-[600px]">
              <AiChatInterface initialMessage="Welcome to the $BLKBOX Community Warchest. How can I assist you with your crypto strategy today?" />
            </div>
          </TabsContent>
        </Tabs>

        {selectedTool && activeTab === "tools" && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-black/90 border border-cyan-500/30 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    {tools.find((t) => t.id === selectedTool)?.name}
                  </h2>
                  <button onClick={() => setSelectedTool(null)} className="text-gray-400 hover:text-white">
                    <span className="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <AiChatInterface
                    initialMessage={`I'm your ${tools.find((t) => t.id === selectedTool)?.name} assistant. How can I help you today?`}
                    toolContext={selectedTool}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
