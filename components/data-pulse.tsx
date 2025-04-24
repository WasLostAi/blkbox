import { cn } from "@/lib/utils"

interface DataPulseProps {
  className?: string
  color?: "pink" | "cyan"
  height?: number
}

export default function DataPulse({ className, color = "pink", height = 4 }: DataPulseProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div
        className={cn(
          "animate-pulse-data bg-gradient-to-r",
          color === "pink"
            ? "from-neon-pink/20 via-neon-pink to-neon-pink/20"
            : "from-neon-cyan/20 via-neon-cyan to-neon-cyan/20",
        )}
        style={{ height: `${height}px` }}
      ></div>
    </div>
  )
}
