"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface HackerTextProps {
  text: string
  className?: string
  duration?: number
  iterations?: number
}

export default function HackerText({ text, className, duration = 1500, iterations = 3 }: HackerTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)

  // Characters to use for scrambling
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?"

  useEffect(() => {
    const scrambleText = () => {
      let iteration = 0
      let interval: NodeJS.Timeout | null = null

      const scramble = () => {
        if (iteration >= iterations) {
          setDisplayText(text)
          setIsScrambling(false)
          if (interval) clearInterval(interval)
          return
        }

        const scrambled = text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " "
            // Gradually reveal more correct characters as iterations progress
            if (Math.random() < iteration / iterations) return char
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")

        setDisplayText(scrambled)
        iteration += 0.1
      }

      setIsScrambling(true)
      interval = setInterval(scramble, 50)

      return () => {
        if (interval) clearInterval(interval)
      }
    }

    // Initial scramble
    scrambleText()

    // Set up interval for periodic scrambling
    const intervalId = setInterval(() => {
      if (!isScrambling) {
        scrambleText()
      }
    }, duration)

    return () => clearInterval(intervalId)
  }, [text, duration, iterations, chars.length, isScrambling])

  return <span className={cn("font-tech-mono", className)}>{displayText}</span>
}
