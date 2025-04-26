"use client"

import { useRef, useEffect } from "react"

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

interface ParticleSystemProps {
  className?: string
  particleCount?: number
  particleColors?: string[]
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
  minLife?: number
  maxLife?: number
}

export function ParticleSystem({
  className = "",
  particleCount = 50,
  particleColors = ["#ff00aa", "#00e5ff", "#ffffff"],
  minSize = 1,
  maxSize = 3,
  minSpeed = 0.1,
  maxSpeed = 0.5,
  minLife = 5,
  maxLife = 10,
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reset particles when resizing
      particlesRef.current = []
      initParticles()
    }

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        const maxLifeValue = Math.random() * (maxLife - minLife) + minLife
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
          speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          opacity: Math.random() * 0.5 + 0.2,
          life: 0,
          maxLife: maxLifeValue,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Update particle life
        particle.life += 0.01

        // Calculate opacity based on life
        const lifeRatio = particle.life / particle.maxLife
        particle.opacity = 0.7 - lifeRatio * 0.7

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle =
          particle.color +
          Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Reset particle if it's out of bounds or its life is over
        if (
          particle.x < -particle.size ||
          particle.x > canvas.width + particle.size ||
          particle.y < -particle.size ||
          particle.y > canvas.height + particle.size ||
          particle.life >= particle.maxLife
        ) {
          const maxLifeValue = Math.random() * (maxLife - minLife) + minLife
          particlesRef.current[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (maxSize - minSize) + minSize,
            speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
            speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
            color: particleColors[Math.floor(Math.random() * particleColors.length)],
            opacity: Math.random() * 0.5 + 0.2,
            life: 0,
            maxLife: maxLifeValue,
          }
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [particleCount, particleColors, minSize, maxSize, minSpeed, maxSpeed, minLife, maxLife])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none z-0 ${className}`} />
}
