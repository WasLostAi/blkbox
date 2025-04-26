"use client"

import { useEffect, useRef } from "react"

interface AnimatedGradientProps {
  className?: string
  colors?: string[]
  speed?: number
}

export function AnimatedGradient({
  className = "",
  colors = ["#ff00aa", "#00e5ff", "#120458", "#000000"],
  speed = 0.002,
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = (timestamp: number) => {
      if (!timeRef.current) timeRef.current = timestamp
      const elapsed = timestamp - timeRef.current
      timeRef.current = timestamp

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const time = timestamp * speed

      // Create multiple gradient points that move over time
      const gradientPoints = [
        {
          x: Math.sin(time * 0.3) * canvas.width * 0.5 + canvas.width * 0.5,
          y: Math.cos(time * 0.2) * canvas.height * 0.5 + canvas.height * 0.5,
          radius: canvas.width * 0.8,
        },
        {
          x: Math.sin(time * 0.2 + 2) * canvas.width * 0.3 + canvas.width * 0.7,
          y: Math.cos(time * 0.3 + 1) * canvas.height * 0.3 + canvas.height * 0.3,
          radius: canvas.width * 0.6,
        },
        {
          x: Math.sin(time * 0.1 + 4) * canvas.width * 0.4 + canvas.width * 0.3,
          y: Math.cos(time * 0.4 + 3) * canvas.height * 0.4 + canvas.height * 0.7,
          radius: canvas.width * 0.7,
        },
      ]

      // Draw gradients
      gradientPoints.forEach((point, index) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

        const colorIndex = index % colors.length
        const nextColorIndex = (colorIndex + 1) % colors.length

        gradient.addColorStop(0, colors[colorIndex] + "40") // Semi-transparent
        gradient.addColorStop(1, colors[nextColorIndex] + "00") // Transparent

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [colors, speed])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none z-0 ${className}`} />
}
