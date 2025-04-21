"use client"

import { useEffect, useRef } from "react"

export default function DashboardBackground() {
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

    // Grid parameters
    const gridSize = 50
    const smallGridSize = 10

    // Animation parameters
    let frame = 0
    const fps = 30
    const interval = 1000 / fps

    // Data points for the animated lines
    const lines: { points: { x: number; y: number }[]; color: string; speed: number }[] = []

    // Create random lines
    for (let i = 0; i < 5; i++) {
      const points = []
      const startX = Math.random() * canvas.width
      let y = Math.random() * canvas.height

      for (let x = startX; x < canvas.width + 200; x += 20) {
        y += (Math.random() - 0.5) * 15
        points.push({ x, y })
      }

      lines.push({
        points,
        color: i % 2 === 0 ? "#ff00aa" : "#00e5ff",
        speed: 0.5 + Math.random() * 1.5,
      })
    }

    // Animation loop
    let lastTime = 0
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime

      if (deltaTime >= interval) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw main grid
        ctx.strokeStyle = "rgba(255, 0, 170, 0.15)"
        ctx.lineWidth = 1

        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }

        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }

        // Draw smaller grid
        ctx.strokeStyle = "rgba(0, 229, 255, 0.05)"

        for (let x = 0; x < canvas.width; x += smallGridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }

        for (let y = 0; y < canvas.height; y += smallGridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }

        // Draw and animate lines
        lines.forEach((line) => {
          ctx.strokeStyle = line.color
          ctx.lineWidth = 2
          ctx.shadowColor = line.color
          ctx.shadowBlur = 10

          ctx.beginPath()

          // Move all points to the left
          line.points.forEach((point) => {
            point.x -= line.speed
          })

          // Add new point if needed
          if (line.points[line.points.length - 1].x < canvas.width) {
            const lastPoint = line.points[line.points.length - 1]
            const newX = lastPoint.x + 20
            const newY = lastPoint.y + (Math.random() - 0.5) * 15
            line.points.push({ x: newX, y: newY })
          }

          // Remove points that are off-screen
          while (line.points.length > 0 && line.points[0].x < -100) {
            line.points.shift()
          }

          // Draw the line
          if (line.points.length > 0) {
            ctx.moveTo(line.points[0].x, line.points[0].y)
            for (let i = 1; i < line.points.length; i++) {
              ctx.lineTo(line.points[i].x, line.points[i].y)
            }
            ctx.stroke()
          }
        })

        // Add some random data points
        if (Math.random() > 0.97) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const size = 2 + Math.random() * 4

          ctx.fillStyle = Math.random() > 0.5 ? "#ff00aa" : "#00e5ff"
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }

        frame++
        lastTime = currentTime - (deltaTime % interval)
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-40" />
}
