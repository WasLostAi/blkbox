"use client"

import { useEffect, useRef } from "react"

export function CircuitPattern() {
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

    // Draw circuit pattern
    const drawCircuit = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid size
      const gridSize = 50

      // Draw horizontal and vertical lines
      ctx.strokeStyle = "rgba(255, 0, 170, 0.1)"
      ctx.lineWidth = 1

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw nodes and connections
      const nodes: { x: number; y: number }[] = []

      // Create random nodes at grid intersections
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          if (Math.random() > 0.85) {
            nodes.push({ x, y })
          }
        }
      }

      // Draw connections between some nodes
      ctx.strokeStyle = "rgba(0, 229, 255, 0.15)"
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Find closest nodes
        const closestNodes = nodes
          .filter((n) => n !== node)
          .sort((a, b) => {
            const distA = Math.sqrt(Math.pow(a.x - node.x, 2) + Math.pow(a.y - node.y, 2))
            const distB = Math.sqrt(Math.pow(b.x - node.x, 2) + Math.pow(b.y - node.y, 2))
            return distA - distB
          })
          .slice(0, 2)

        // Draw connections to closest nodes
        for (const closestNode of closestNodes) {
          if (Math.random() > 0.3) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(closestNode.x, closestNode.y)
            ctx.stroke()
          }
        }

        // Draw node
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(255, 0, 170, 0.3)" : "rgba(0, 229, 255, 0.3)"
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    drawCircuit()

    // Redraw occasionally to create subtle changes
    const interval = setInterval(drawCircuit, 5000)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20 opacity-30" />
}

// Keep the default export for backward compatibility
export default CircuitPattern
