import { Loader2 } from "lucide-react"
import CyberCard from "@/components/cyber-card"
import GlitchText from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"

export default function WashTradingEngineLoading() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-neon-pink mb-2">
          <GlitchText text="WASH TRADING ENGINE" />
        </h1>
        <p className="text-zinc-400 font-tech-mono text-sm">Advanced volume simulation with anti-detection protocols</p>
      </div>

      <DataPulse className="mb-6" color="pink" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <CyberCard key={i} className="bg-black/60 h-[120px] animate-pulse">
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 text-zinc-700 animate-spin" />
              </div>
            </CyberCard>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <CyberCard key={i} className="bg-black/60 h-[300px] animate-pulse">
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 text-zinc-700 animate-spin" />
              </div>
            </CyberCard>
          ))}
      </div>

      <CyberCard className="bg-black/60 h-[200px] animate-pulse">
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 text-zinc-700 animate-spin" />
        </div>
      </CyberCard>
    </div>
  )
}
