"use client"

import { useEffect, useState } from "react"
import { Code, Database, Lock, Zap, Shield, BarChart3, Eye, Brain } from "lucide-react"
import type { JSX } from "react"

interface FloatingIcon {
  id: number
  x: number
  y: number
  speedX: number
  speedY: number
  icon: JSX.Element
  size: number
  opacity: number
}

export default function FloatingIcons() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    // Create initial icons
    const initialIcons: FloatingIcon[] = []
    const iconComponents = [
      <Code key="code" size={24} className="text-neon-pink" />,
      <Database key="database" size={24} className="text-neon-cyan" />,
      <Lock key="lock" size={24} className="text-neon-pink" />,
      <Zap key="zap" size={24} className="text-neon-cyan" />,
      <Shield key="shield" size={24} className="text-neon-pink" />,
      <BarChart3 key="barChart3" size={24} className="text-neon-cyan" />,
      <Eye key="eye" size={24} className="text-neon-pink" />,
      <Brain key="brain" size={24} className="text-neon-cyan" />,
    ]

    for (let i = 0; i < 15; i++) {
      initialIcons.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        icon: iconComponents[Math.floor(Math.random() * iconComponents.length)],
        size: 16 + Math.random() * 16,
        opacity: 0.3 + Math.random() * 0.3,
      })
    }

    setIcons(initialIcons)

    // Animation frame
    const animateIcons = () => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => {
          let newX = icon.x + icon.speedX
          let newY = icon.y + icon.speedY

          // Bounce off edges
          if (newX < 0 || newX > 100) {
            icon.speedX *= -1
            newX = icon.x + icon.speedX
          }

          if (newY < 0 || newY > 100) {
            icon.speedY *= -1
            newY = icon.y + icon.speedY
          }

          return {
            ...icon,
            x: newX,
            y: newY,
          }
        }),
      )
    }

    const intervalId = setInterval(animateIcons, 50)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            opacity: icon.opacity,
            fontSize: `${icon.size}px`,
          }}
        >
          {icon.icon}
        </div>
      ))}
    </div>
  )
}
