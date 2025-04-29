"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ToolCardProps {
  title: string
  description: string
  icon: ReactNode
  onClick?: () => void
  className?: string
}

export function ToolCard({ title, description, icon, onClick, className }: ToolCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-cyan-500/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <div className="mb-4">{icon}</div>

      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">{title}</h3>

      <p className="text-gray-400 text-sm">{description}</p>

      <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-cyan-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  )
}
