"use client"

import { useEffect, useRef } from "react"

export default function MatrixBackground() {
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

    // Characters to display
    const chars = "01010101BLKBOXSHADOWPROTOCOL10101010"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100)
    }

    // Drawing the characters
    const draw = () => {
      // Black semi-transparent BG to show trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`

      // Loop over each column
      for (let i = 0; i < drops.length; i++) {
        // Choose a random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // Alternate between pink and cyan
        if (i % 3 === 0) {
          ctx.fillStyle = "#ff00aa"
        } else if (i % 3 === 1) {
          ctx.fillStyle = "#00e5ff"
        } else {
          ctx.fillStyle = "#ffffff"
        }

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Move the drop down
        drops[i]++

        // Reset when off the screen
        // Random reset to make it look more natural
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -100)
        }
      }
    }

    // Animation loop
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-20" />
}
