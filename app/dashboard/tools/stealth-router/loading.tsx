import { CircleIcon as CircleNotch } from "lucide-react"
import { CircuitPattern } from "@/components/circuit-pattern"
import { TerminalText } from "@/components/terminal-text"

export default function Loading() {
  return (
    <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-black p-6">
      <CircuitPattern />

      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <CircleNotch className="h-12 w-12 animate-spin text-neon-cyan" />

        <div className="max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-white">
            <TerminalText text="Initializing Stealth Router..." />
          </h2>

          <div className="space-y-2 text-sm text-gray-400">
            <p className="font-tech-mono">
              <TerminalText text="Establishing secure connection to shadow network..." typingSpeed={30} />
            </p>
            <p className="font-tech-mono">
              <TerminalText text="Routing through decentralized proxies..." typingSpeed={30} />
            </p>
            <p className="font-tech-mono">
              <TerminalText text="Obfuscating transaction fingerprints..." typingSpeed={30} />
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 w-full text-center text-xs text-gray-500">
        <TerminalText text="$BLKBOX | Stealth Router v2.1.4" typingSpeed={20} />
      </div>
    </div>
  )
}
