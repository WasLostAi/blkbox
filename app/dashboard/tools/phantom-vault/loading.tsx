import { Loader2 } from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import GlitchText from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"

export default function PhantomVaultLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-neon-pink animate-spin mb-4" />
        <GlitchText text="LOADING PHANTOM VAULT" className="text-xl font-tech-mono text-neon-cyan mb-2" />
        <DataPulse className="w-48 mt-4" />
      </div>
    </div>
  )
}
