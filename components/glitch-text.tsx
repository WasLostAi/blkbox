"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  glitchInterval?: number
  glitchDuration?: number
}

export default function GlitchText({ text, className, glitchInterval = 5000, glitchDuration = 200 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchIntervalId = setInterval(() => {
      setIsGlitching(true)

      const glitchDurationId = setTimeout(() => {
        setIsGlitching(false)
      }, glitchDuration)

      return () => clearTimeout(glitchDurationId)
    }, glitchInterval)

    return () => clearInterval(glitchIntervalId)
  }, [glitchDuration, glitchInterval])

  return (
    <span
      className={cn(
        "relative inline-block",
        isGlitching &&
          "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[45%] before:bg-current before:opacity-30 before:animate-glitch-skew",
        isGlitching &&
          "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[45%] after:bg-current after:opacity-30 after:animate-glitch-skew",
        className,
      )}
      data-text={text}
    >
      {text}
    </span>
  )
}
