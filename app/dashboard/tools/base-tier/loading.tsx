import { CircuitPattern } from "@/components/circuit-pattern"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <CircuitPattern className="absolute inset-0 opacity-20" />

      <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            </div>
            <div className="absolute -inset-1 rounded-full border border-cyan-500/20 animate-pulse"></div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Loading Community Warchest
            </h2>
            <p className="text-gray-400 max-w-md">Initializing AI systems and connecting to the Solana network...</p>
          </div>

          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add this to your globals.css or as a style tag
// @keyframes loading {
//   0% { width: 0%; }
//   50% { width: 100%; }
//   100% { width: 0%; }
// }
