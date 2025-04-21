import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"
import DataPulse from "./data-pulse"

interface DividendCardProps {
  percentage: string
  title: string
  description: string
  icon: ReactNode
}

export default function DividendCard({ percentage, title, description, icon }: DividendCardProps) {
  return (
    <Card className="bg-black/50 border-zinc-700 overflow-hidden relative cyber-card">
      <div className="hud-corner hud-corner-tl"></div>
      <div className="hud-corner hud-corner-tr"></div>
      <div className="hud-corner hud-corner-bl"></div>
      <div className="hud-corner hud-corner-br"></div>

      <DataPulse height={2} color={title.includes("MEV") ? "cyan" : "pink"} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          {icon}
          <span className="text-3xl font-bold font-tech-mono text-neon-pink">{percentage}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-zinc-400 font-tech-mono text-sm">{description}</p>
      </div>
    </Card>
  )
}
