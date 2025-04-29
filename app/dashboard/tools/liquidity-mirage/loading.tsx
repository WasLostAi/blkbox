import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-neon-pink animate-spin mb-4" />
        <div className="text-xl text-neon-cyan mb-2">LOADING LIQUIDITY MIRAGE CREATOR</div>
      </div>
    </div>
  )
}
