"use client"

import { useEffect, useRef } from "react"

export default function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Characters to use in the rain
    const chars = "01BLKBOX$SHADOW"

    // Create raindrops
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const raindrops: number[] = []

    for (let i = 0; i < columns; i++) {
      raindrops[i] = Math.floor(Math.random() * -100)
    }

    // Animation loop
    const animate = () => {
      // Add semi-transparent black rectangle to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set font and color
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`

      // Loop through each raindrop
      for (let i = 0; i < raindrops.length; i++) {
        // Choose a random character
        const char = chars[Math.floor(Math.random() * chars.length)]

        // Choose color based on position
        if (i % 3 === 0) {
          ctx.fillStyle = "#ff00aa"
        } else if (i % 3 === 1) {
          ctx.fillStyle = "#00e5ff"
        } else {
          ctx.fillStyle = "#ffffff"
        }

        // Draw the character
        ctx.fillText(char, i * fontSize, raindrops[i] * fontSize)

        // Move the raindrop down
        raindrops[i]++

        // Reset when off the screen
        if (raindrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          raindrops[i] = 0
        }
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-20" />
}
