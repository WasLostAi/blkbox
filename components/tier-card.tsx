import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface TierCardProps {
  tier: string
  amount: string
  features: string[]
  color: string
  borderColor: string
  featured?: boolean
}

export function TierCard({ tier, amount, features, color, borderColor, featured = false }: TierCardProps) {
  return (
    <div className={cn("relative", featured && "transform hover:scale-105 transition-transform duration-300")}>
      {featured && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-sm blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
      )}
      <Card
        className={cn(
          `bg-gradient-to-b ${color} ${borderColor} relative overflow-hidden`,
          featured ? "ring-2 ring-neon-cyan shadow-lg shadow-neon-cyan/20" : "",
        )}
      >
        <div className="hud-corner hud-corner-tl"></div>
        <div className="hud-corner hud-corner-tr"></div>
        <div className="hud-corner hud-corner-bl"></div>
        <div className="hud-corner hud-corner-br"></div>

        <div className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold font-tech-mono">{tier}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">{amount}</span>
              <span className="text-sm ml-1 font-tech-mono">$BLKBOX</span>
            </div>
          </div>

          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-neon-cyan mr-2 shrink-0 mt-0.5" />
                <span className="text-sm font-tech-mono">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default TierCard
