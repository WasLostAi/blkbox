import { Loader2 } from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import GlitchText from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"

export default function QuantumStateManipulatorLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-neon-pink animate-spin mb-4" />
        <GlitchText text="LOADING QUANTUM STATE MANIPULATOR" className="text-xl font-tech-mono text-neon-cyan mb-2" />
        <p className="text-zinc-500 font-tech-mono mb-4">Initializing quantum entanglement protocols...</p>
        <DataPulse className="w-48 mt-4" />
      </div>
    </div>
  )
}
