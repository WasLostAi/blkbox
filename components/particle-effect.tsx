"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

export default function ParticleEffect() {
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

    // Particles array
    const particles: Particle[] = []

    // Create particles
    const createParticles = (x: number, y: number, amount: number) => {
      for (let i = 0; i < amount; i++) {
        const size = Math.random() * 3 + 1
        const speedX = (Math.random() - 0.5) * 2
        const speedY = (Math.random() - 0.5) * 2
        const color = Math.random() > 0.5 ? "#ff00aa" : "#00e5ff"
        const opacity = 0.7 + Math.random() * 0.3
        const maxLife = 100 + Math.random() * 100

        particles.push({
          x,
          y,
          size,
          speedX,
          speedY,
          color,
          opacity,
          life: 0,
          maxLife,
        })
      }
    }

    // Animation loop
    const animate = () => {
      // Add slight fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Update life
        p.life++

        // Calculate opacity based on life
        const opacity = 1 - p.life / p.maxLife

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle =
          p.color +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Remove dead particles
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          i--
        }
      }

      // Randomly create new particles
      if (Math.random() > 0.95) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        createParticles(x, y, 3)
      }

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Add mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.8) {
        createParticles(e.clientX, e.clientY, 2)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Add touch interaction
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (Math.random() > 0.5) {
        createParticles(touch.clientX, touch.clientY, 3)
      }
    }

    window.addEventListener("touchmove", handleTouchMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
}
