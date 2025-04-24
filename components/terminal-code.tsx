import { cn } from "@/lib/utils"

interface TerminalCodeProps {
  code: string
  className?: string
}

export default function TerminalCode({ code, className }: TerminalCodeProps) {
  return (
    <div className={cn("bg-black border border-zinc-800 rounded-md overflow-hidden", className)}>
      <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-xs text-zinc-400 font-tech-mono">terminal</div>
      </div>
      <pre className="p-4 text-xs text-neon-cyan font-tech-mono overflow-x-auto">{code}</pre>
    </div>
  )
}
