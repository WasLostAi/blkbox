"use client"

import { useState, useEffect } from "react"
import GlitchText from "./glitch-text"

interface HeadlineSet {
  title: string
  subtitle: string
  paragraph1: string
  paragraph2: string
}

interface AnimatedHeadlineProps {
  headlines: HeadlineSet[]
  interval?: number
}

export default function AnimatedHeadline({ headlines, interval = 8000 }: AnimatedHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Use the first headline for the static title and subtitle
  const staticTitle = headlines[0].title
  const staticSubtitle = headlines[0].subtitle

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length)
        setTimeout(() => {
          setIsVisible(true)
          setTimeout(() => {
            setIsTransitioning(false)
          }, 500)
        }, 500)
      }, 500)
    }, interval)

    return () => clearInterval(timer)
  }, [headlines, interval])

  const current = headlines[currentIndex]

  return (
    <div className="transition-all duration-500">
      {/* Static title and subtitle - no animation */}
      <div className="mb-6 inline-block relative">
        <GlitchText
          text={staticTitle}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-neon-pink"
        />
        <h1 className="block font-tech-mono text-neon-cyan text-2xl sm:text-3xl md:text-4xl mt-2">{staticSubtitle}</h1>
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-neon-pink animate-pulse"></div>
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-neon-cyan animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-neon-cyan animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-neon-pink animate-pulse"></div>
      </div>

      {/* Animated subheadline section */}
      <div className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <p className="mb-4 text-xl text-zinc-400">
          <span className="font-bold italic text-neon-pink">{current.paragraph1}</span>
        </p>
        <p className="mb-8 text-xl text-zinc-400">
          <span className="text-neon-cyan">{current.paragraph2}</span>
        </p>
      </div>

      {isTransitioning && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="h-1 bg-neon-pink w-16 animate-pulse"></div>
        </div>
      )}
    </div>
  )
}
