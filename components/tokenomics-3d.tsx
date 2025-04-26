"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"

interface TokenomicsData {
  label: string
  value: number
  color: string
}

interface Tokenomics3DProps {
  data: TokenomicsData[]
  className?: string
  rotationSpeed?: number
}

export function Tokenomics3D({ data, className = "", rotationSpeed = 0.5 }: Tokenomics3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      const container = canvas.parentElement
      if (!container) return

      const { width, height } = container.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    let rotation = 0

    const drawPieChart = (time: number) => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate center and radius
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) * 0.8

      // Calculate total value
      const total = data.reduce((sum, item) => sum + item.value, 0)

      // Draw segments
      let startAngle = rotation

      data.forEach((item, index) => {
        const segmentAngle = (item.value / total) * Math.PI * 2
        const endAngle = startAngle + segmentAngle

        // Calculate midpoint angle for 3D effect
        const midAngle = startAngle + segmentAngle / 2

        // 3D effect - draw side
        const isHovered = hoveredSegment === index
        const depth = isHovered ? 20 : 15

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        for (let angle = startAngle; angle <= endAngle; angle += 0.01) {
          ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
        }
        ctx.lineTo(centerX, centerY)
        ctx.closePath()

        // Fill with gradient
        const gradient = ctx.createLinearGradient(
          centerX - radius,
          centerY - radius,
          centerX + radius,
          centerY + radius,
        )
        gradient.addColorStop(0, item.color)
        gradient.addColorStop(1, adjustColor(item.color, -30))

        ctx.fillStyle = isHovered ? adjustColor(item.color, 20) : gradient
        ctx.fill()

        // Draw segment outline
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw label
        const labelRadius = radius * 0.7
        const labelX = centerX + Math.cos(midAngle) * labelRadius
        const labelY = centerY + Math.sin(midAngle) * labelRadius

        ctx.fillStyle = "#fff"
        ctx.font = isHovered ? "bold 14px Arial" : "12px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${item.label}`, labelX, labelY)
        ctx.fillText(`${Math.round(item.value)}%`, labelX, labelY + 20)

        startAngle = endAngle
      })

      // Update rotation
      rotation += rotationSpeed * 0.001

      animationFrameRef.current = requestAnimationFrame(drawPieChart)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    animationFrameRef.current = requestAnimationFrame(drawPieChart)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [data, rotationSpeed, hoveredSegment])

  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    const hexToRgb = (hex: string): [number, number, number] => {
      const r = Number.parseInt(hex.slice(1, 3), 16)
      const g = Number.parseInt(hex.slice(3, 5), 16)
      const b = Number.parseInt(hex.slice(5, 7), 16)
      return [r, g, b]
    }

    const rgbToHex = (r: number, g: number, b: number): string => {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }

    const [r, g, b] = hexToRgb(color)

    return rgbToHex(
      Math.max(0, Math.min(255, r + amount)),
      Math.max(0, Math.min(255, g + amount)),
      Math.max(0, Math.min(255, b + amount)),
    )
  }

  // Handle mouse interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    // Calculate angle from center to mouse position
    const angle = Math.atan2(y - centerY, x - centerX)

    // Calculate distance from center
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))

    // Only detect segments if mouse is within the pie chart radius
    if (distance <= radius) {
      // Calculate total value
      const total = data.reduce((sum, item) => sum + item.value, 0)

      // Find which segment the angle corresponds to
      let startAngle = rotation
      for (let i = 0; i < data.length; i++) {
        const segmentAngle = (data[i].value / total) * Math.PI * 2
        const endAngle = startAngle + segmentAngle

        // Normalize angles for comparison
        const normalizedAngle = angle < 0 ? angle + Math.PI * 2 : angle
        const normalizedStartAngle = startAngle % (Math.PI * 2)
        const normalizedEndAngle = endAngle % (Math.PI * 2)

        if (
          (normalizedStartAngle < normalizedEndAngle &&
            normalizedAngle >= normalizedStartAngle &&
            normalizedAngle <= normalizedEndAngle) ||
          (normalizedStartAngle > normalizedEndAngle &&
            (normalizedAngle >= normalizedStartAngle || normalizedAngle <= normalizedEndAngle))
        ) {
          setHoveredSegment(i)
          return
        }

        startAngle = endAngle
      }
    } else {
      setHoveredSegment(null)
    }
  }

  const handleMouseLeave = () => {
    setHoveredSegment(null)
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  )
}
