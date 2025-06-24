import { Loader2 } from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"

export default function QuantumManipulatorLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-neon-cyan animate-spin mb-4" />
        <GlitchText text="LOADING QUANTUM STATE MANIPULATOR" className="text-xl font-tech-mono text-neon-cyan mb-2" />
        <DataPulse className="w-48 mt-4" />
      </div>
    </div>
  )
}
