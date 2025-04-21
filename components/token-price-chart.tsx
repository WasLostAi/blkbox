"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface TokenPriceChartProps {
  className?: string
  color?: "pink" | "cyan"
}

export default function TokenPriceChart({ className, color = "pink" }: TokenPriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Generate random price data
    const generatePriceData = () => {
      const dataPoints = 50
      const data = []
      let price = 0.00025 // Starting price

      for (let i = 0; i < dataPoints; i++) {
        // Add some randomness to the price
        const change = (Math.random() - 0.45) * 0.00001
        price += change
        price = Math.max(0.00015, price) // Ensure price doesn't go too low
        data.push(price)
      }

      return data
    }

    const priceData = generatePriceData()

    // Draw the chart
    const drawChart = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate scaling factors
      const maxPrice = Math.max(...priceData) * 1.1
      const minPrice = Math.min(...priceData) * 0.9
      const priceRange = maxPrice - minPrice

      const xStep = canvas.width / (priceData.length - 1)

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i <= 4; i++) {
        const y = canvas.height - canvas.height * (i / 4)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let i = 0; i <= 6; i++) {
        const x = canvas.width * (i / 6)
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw price line
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - ((priceData[0] - minPrice) / priceRange) * canvas.height)

      for (let i = 1; i < priceData.length; i++) {
        const x = i * xStep
        const y = canvas.height - ((priceData[i] - minPrice) / priceRange) * canvas.height
        ctx.lineTo(x, y)
      }

      // Line style
      ctx.strokeStyle = color === "pink" ? "#ff00aa" : "#00e5ff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      if (color === "pink") {
        gradient.addColorStop(0, "rgba(255, 0, 170, 0.3)")
        gradient.addColorStop(1, "rgba(255, 0, 170, 0)")
      } else {
        gradient.addColorStop(0, "rgba(0, 229, 255, 0.3)")
        gradient.addColorStop(1, "rgba(0, 229, 255, 0)")
      }

      // Fill area under the line
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      // Add glow effect
      ctx.shadowColor = color === "pink" ? "#ff00aa" : "#00e5ff"
      ctx.shadowBlur = 10
      ctx.strokeStyle = color === "pink" ? "#ff00aa" : "#00e5ff"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - ((priceData[0] - minPrice) / priceRange) * canvas.height)

      for (let i = 1; i < priceData.length; i++) {
        const x = i * xStep
        const y = canvas.height - ((priceData[i] - minPrice) / priceRange) * canvas.height
        ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Add price labels
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px 'Share Tech Mono', monospace"
      ctx.textAlign = "left"
      ctx.fillText(`$${maxPrice.toFixed(6)}`, 5, 15)
      ctx.textAlign = "left"
      ctx.fillText(`$${minPrice.toFixed(6)}`, 5, canvas.height - 5)

      // Add current price indicator
      const currentPrice = priceData[priceData.length - 1]
      const currentY = canvas.height - ((currentPrice - minPrice) / priceRange) * canvas.height

      ctx.beginPath()
      ctx.arc(canvas.width - 10, currentY, 4, 0, Math.PI * 2)
      ctx.fillStyle = color === "pink" ? "#ff00aa" : "#00e5ff"
      ctx.fill()

      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "right"
      ctx.fillText(`$${currentPrice.toFixed(6)}`, canvas.width - 20, currentY - 5)
    }

    drawChart()

    // Animate the chart
    const animate = () => {
      // Shift data points to the left
      priceData.shift()

      // Add a new data point
      const lastPrice = priceData[priceData.length - 1]
      const change = (Math.random() - 0.45) * 0.00001
      let newPrice = lastPrice + change
      newPrice = Math.max(0.00015, newPrice)
      priceData.push(newPrice)

      drawChart()
    }

    const interval = setInterval(animate, 2000)

    return () => clearInterval(interval)
  }, [color])

  return (
    <div className={cn("relative w-full h-64 bg-black/30 rounded-md overflow-hidden", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
