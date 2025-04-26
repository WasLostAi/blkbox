"use client"

import { useEffect, useRef } from "react"

export default function TokenomicsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Data for the pie chart
    const data = [
      { value: 60, color: "#ff00aa", label: "Public Fair Launch" },
      { value: 15, color: "#00e5ff", label: "Platform Development" },
      { value: 10, color: "#ff33bb", label: "Initial Liquidity Pool" },
      { value: 10, color: "#33eeff", label: "DAO Treasury" },
      { value: 5, color: "#ff66cc", label: "Bug Bounty & Security" },
    ]

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw the pie chart
    let startAngle = -0.5 * Math.PI // Start at the top
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    data.forEach((item) => {
      // Calculate the angle
      const sliceAngle = (2 * Math.PI * item.value) / total

      // Draw the slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      // Fill the slice
      ctx.fillStyle = item.color
      ctx.fill()

      // Add a slight shadow/glow effect
      ctx.shadowColor = item.color
      ctx.shadowBlur = 15
      ctx.stroke()
      ctx.shadowBlur = 0

      // Update the starting angle for the next slice
      startAngle += sliceAngle
    })

    // Add a center circle for a donut chart effect
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI)
    ctx.fillStyle = "#000000" // Match background color
    ctx.fill()

    // Add text in the center
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 16px 'Share Tech Mono', monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("100M", centerX, centerY - 10)
    ctx.font = "12px 'Share Tech Mono', monospace"
    ctx.fillText("Total Supply", centerX, centerY + 10)

    // Add digital circuit lines
    ctx.strokeStyle = "rgba(255, 0, 170, 0.3)"
    ctx.lineWidth = 1

    // Draw random circuit lines
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2
      const innerRadius = radius * 0.5
      const outerRadius = radius * 1.1

      const innerX = centerX + Math.cos(angle) * innerRadius
      const innerY = centerY + Math.sin(angle) * innerRadius
      const outerX = centerX + Math.cos(angle) * outerRadius
      const outerY = centerY + Math.sin(angle) * outerRadius

      ctx.beginPath()
      ctx.moveTo(innerX, innerY)
      ctx.lineTo(outerX, outerY)
      ctx.stroke()

      // Add a small node at the end
      ctx.fillStyle = Math.random() > 0.5 ? "#ff00aa" : "#00e5ff"
      ctx.beginPath()
      ctx.arc(outerX, outerY, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  return (
    <div className="aspect-square w-full max-w-md mx-auto relative">
      <div className="absolute inset-0 rounded-full border border-neon-pink/30 animate-pulse"></div>
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
