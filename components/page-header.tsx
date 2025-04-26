"use client"

import { cn } from "@/lib/utils"
import GlitchText from "./glitch-text"
import DataPulse from "./data-pulse"

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn("border-b border-zinc-800 bg-black/60 backdrop-blur-sm py-6 px-8", className)}>
      <div className="max-w-6xl mx-auto">
        <GlitchText text={title.toUpperCase()} className="text-2xl md:text-3xl font-bold text-neon-cyan mb-1" />
        {subtitle && <p className="text-zinc-400 font-tech-mono text-sm">{subtitle}</p>}
        <DataPulse className="mt-4 h-0.5" />
      </div>
    </div>
  )
}
