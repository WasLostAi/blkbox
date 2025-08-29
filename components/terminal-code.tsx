"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TerminalCodeProps {
  code: string
  className?: string
  speed?: number
}

export default function TerminalCode({ code, className, speed = 30 }: TerminalCodeProps) {
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < code.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode((prev) => prev + code[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, code, speed])

  return (
    <pre className={cn("font-tech-mono text-xs overflow-x-auto p-4 bg-black/50 rounded-sm", className)}>
      <code>
        {displayedCode}
        {currentIndex < code.length && <span className="animate-pulse">_</span>}
      </code>
    </pre>
  )
}
