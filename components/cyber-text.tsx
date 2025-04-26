"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CyberTextProps {
  text: string
  className?: string
  glitchIntensity?: "low" | "medium" | "high"
  color?: "pink" | "cyan" | "white"
  typingEffect?: boolean
  typingSpeed?: number
  delay?: number
}

export function CyberText({
  text,
  className = "",
  glitchIntensity = "medium",
  color = "pink",
  typingEffect = false,
  typingSpeed = 50,
  delay = 0,
}: CyberTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [glitching, setGlitching] = useState(false)

  // Color classes
  const colorClasses = {
    pink: "text-pink-500 neon-text-pink",
    cyan: "text-cyan-400 neon-text-cyan",
    white: "text-white",
  }

  // Typing effect
  useEffect(() => {
    if (!typingEffect) {
      setDisplayText(text)
      return
    }

    let currentIndex = 0
    const finalText = text
    setDisplayText("")

    const typingTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < finalText.length) {
          setDisplayText(finalText.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingInterval)
        }
      }, typingSpeed)

      return () => clearInterval(typingInterval)
    }, delay)

    return () => clearTimeout(typingTimeout)
  }, [text, typingEffect, typingSpeed, delay])

  // Glitch effect
  useEffect(() => {
    if (glitchIntensity === "low") {
      const glitchInterval = setInterval(() => {
        const shouldGlitch = Math.random() < 0.02
        if (shouldGlitch) {
          setGlitching(true)
          setTimeout(() => setGlitching(false), 100)
        }
      }, 2000)

      return () => clearInterval(glitchInterval)
    } else if (glitchIntensity === "medium") {
      const glitchInterval = setInterval(() => {
        const shouldGlitch = Math.random() < 0.05
        if (shouldGlitch) {
          setGlitching(true)
          setTimeout(() => setGlitching(false), 150)
        }
      }, 1000)

      return () => clearInterval(glitchInterval)
    } else if (glitchIntensity === "high") {
      const glitchInterval = setInterval(() => {
        const shouldGlitch = Math.random() < 0.1
        if (shouldGlitch) {
          setGlitching(true)
          setTimeout(() => setGlitching(false), 200)
        }
      }, 500)

      return () => clearInterval(glitchInterval)
    }
  }, [glitchIntensity])

  return (
    <motion.span
      className={`inline-block relative ${colorClasses[color]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {displayText}

      {glitching && (
        <>
          <span className="absolute top-0 left-0.5 text-pink-500 opacity-70 mix-blend-screen">{displayText}</span>
          <span className="absolute top-0 -left-0.5 text-cyan-400 opacity-70 mix-blend-screen">{displayText}</span>
        </>
      )}
    </motion.span>
  )
}
