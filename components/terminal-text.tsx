"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TerminalTextProps {
  text: string
  className?: string
  typingSpeed?: number
  showCursor?: boolean
  onComplete?: () => void
}

export default function TerminalText({
  text,
  className,
  typingSpeed = 50,
  showCursor = true,
  onComplete,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, text, typingSpeed, isComplete, onComplete])

  return (
    <span className={cn("font-tech-mono text-neon-cyan", showCursor && !isComplete && "terminal-text", className)}>
      {displayedText}
    </span>
  )
}
