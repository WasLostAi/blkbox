"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { CyberButton } from "@/components/cyber-button"
import { GlitchText } from "@/components/glitch-text"
import { CircuitPattern } from "@/components/circuit-pattern"
import { ParticleSystem } from "@/components/particle-system"
import { AnimatedGradient } from "@/components/animated-gradient"
import { CyberText } from "@/components/cyber-text"
import { ThreeDCard } from "@/components/3d-card"
import { InteractiveRoadmap } from "@/components/interactive-roadmap"
import TypingAnimation from "@/components/typing-animation"

// Define our slides with enhanced content
const slides = [
  {
    id: "intro",
    title: "$BLKBOX: THE SHADOW PROTOCOL",
    subtitle: "PARTNER OPPORTUNITY BRIEF",
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative mb-8">
          <Image src="/blkbox-logo-large.png" alt="BLKBOX Logo" width={500} height={500} className="relative z-10" />
          <div className="absolute inset-0 bg-neon-pink/20 blur-3xl rounded-full animate-pulse"></div>
        </div>

        <GlitchText text="THE SHADOW PROTOCOL" className="text-4xl md:text-7xl font-bold mb-4 text-center" />
        <div className="w-48 h-1 bg-gradient-to-r from-pink-600 to-cyan-400 mx-auto my-6"></div>
        <CyberText
          text="They tried to erase me. Now I'm erasing the rules."
          className="text-xl md:text-3xl text-center mb-8"
          typingEffect={true}
          typingSpeed={30}
          color="cyan"
        />

        <div className="mt-8 h-16">
          <TypingAnimation
            baseText=""
            replacementWords={[
              "Quant and Algo Trading Tools",
              "Platform Dark Pool Dividends",
              "DAO Driven Disruption",
              "100% Fair Launch",
              "Shadow Protocol Access",
              "Stealth Router Technology",
              "New and Evolving Tools",
            ]}
            className="text-2xl md:text-3xl font-tech text-neon-cyan"
            typingSpeed={70}
            deletingSpeed={50}
            delayAfterComplete={2000}
          />
        </div>
      </div>
    ),
  },
  {
    id: "opportunity",
    title: "THE OPPORTUNITY",
    content: (
      <div className="space-y-8">
        <ThreeDCard className="p-6 bg-black/70 rounded-sm mb-6">
          <CyberText
            text="While mainstream DeFi plays by established rules, a parallel ecosystem operates beneath the surface—where real alpha is generated and value is extracted before retail even sees the opportunity."
            className="text-xl"
            typingEffect={true}
            typingSpeed={20}
          />
        </ThreeDCard>

        <div className="flex items-center gap-6 mb-8">
          <div className="w-1 h-24 bg-gradient-to-b from-neon-pink to-neon-cyan"></div>
          <motion.p
            className="text-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            $BLKBOX is the first comprehensive toolkit bringing these capabilities to a wider audience through a
            sustainable, token-gated business model.
          </motion.p>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-xl neon-text-pink p-6 border-l-4 border-neon-pink">
            We're seeking strategic partners who understand this vision and want to position themselves at the forefront
            of next-generation DeFi operations.
          </p>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-neon-pink"></div>
        </motion.div>
      </div>
    ),
  },
  {
    id: "product",
    title: "THE PRODUCT: BEYOND BASIC DEFI",
    content: (
      <div className="space-y-8">
        <CyberText
          text="$BLKBOX isn't another trading interface—it's warfare technology for financial markets:"
          className="text-xl block mb-8"
          typingEffect={true}
          typingSpeed={30}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ThreeDCard className="p-6 bg-black/70 rounded-sm h-full">
            <h3 className="text-2xl font-bold text-pink-500 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                <span className="text-pink-500">1</span>
              </span>
              Core Systems
            </h3>
            <ul className="space-y-4">
              {[
                "Alpha Network Extraction Suite",
                "Dark Launch Toolkit",
                "Shadow Swap System",
                "AI Strategy Lab",
                "Predictive Market Intelligence",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                >
                  <ArrowRight className="text-pink-500 mr-2 h-4 w-4" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </ThreeDCard>

          <ThreeDCard className="p-6 bg-black/70 rounded-sm h-full" borderColor="rgba(0, 229, 255, 0.3)">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center mr-3">
                <span className="text-cyan-400">2</span>
              </span>
              Advanced Systems
            </h3>
            <ul className="space-y-4">
              {[
                "Shadow Protocol Interoperability",
                "Quantum State Processing Engine",
                "Temporal Fragmentation Engine",
                "Cross-Chain Arbitrage Network",
                "Predictive Liquidity Mapping",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.8 }}
                >
                  <ArrowRight className="text-cyan-400 mr-2 h-4 w-4" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </ThreeDCard>
        </div>

        <motion.div
          className="mt-8 p-6 border border-pink-500/30 bg-black/50 rounded-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <CyberText
            text="We don't just offer tools—we provide systematic advantages previously unavailable outside closed circles."
            className="text-xl neon-text-pink"
            glitchIntensity="medium"
          />
        </motion.div>
      </div>
    ),
  },
  {
    id: "token-model",
    title: "THE TOKEN MODEL",
    subtitle: "SUSTAINABLE VALUE CREATION",
    content: (
      <div className="space-y-8">
        <CyberText
          text="$BLKBOX combines access utility with direct financial rewards:"
          className="text-xl block mb-8"
          typingEffect={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Token-Gated Access",
              description: "Hold to use the tools (tiered by holding amount)",
              icon: "🔒",
              color: "pink",
            },
            {
              title: "Direct USDC Dividends",
              description: "Daily distributions from platform revenue",
              icon: "💰",
              color: "cyan",
            },
            {
              title: "Governance Rights",
              description: "High-tier holders direct platform development",
              icon: "🏛️",
              color: "pink",
            },
          ].map((item, i) => (
            <ThreeDCard
              key={i}
              className="p-6 bg-black/70 rounded-sm"
              borderColor={item.color === "pink" ? "rgba(255, 0, 170, 0.3)" : "rgba(0, 229, 255, 0.3)"}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className={`text-xl font-bold ${item.color === "pink" ? "text-pink-500" : "text-cyan-400"} mb-3`}>
                {item.title}
              </h3>
              <p>{item.description}</p>
            </ThreeDCard>
          ))}
        </div>

        <ThreeDCard className="mt-8 p-6 bg-black/70 rounded-sm" borderColor="rgba(0, 229, 255, 0.3)">
          <h3 className="text-xl font-bold text-cyan-400 mb-3">This creates a flywheel effect:</h3>
          <div className="flex flex-wrap items-center justify-center gap-4 text-lg">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tools generate value
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <ArrowRight className="text-pink-500 h-6 w-6" />
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Value drives dividends
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
              <ArrowRight className="text-pink-500 h-6 w-6" />
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Dividends increase demand
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <ArrowRight className="text-pink-500 h-6 w-6" />
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              Better tools generate more value
            </motion.div>
          </div>
        </ThreeDCard>
      </div>
    ),
  },
  {
    id: "timeline",
    title: "DEVELOPMENT TIMELINE",
    content: (
      <div className="space-y-8">
        <InteractiveRoadmap
          items={[
            {
              id: "phase1",
              phase: "Phase 1",
              title: "Core Infrastructure",
              description:
                "Development of fundamental trading systems and infrastructure components that form the backbone of the $BLKBOX ecosystem.",
              status: "completed",
              date: "Q1 2025",
            },
            {
              id: "phase2",
              phase: "Phase 2",
              title: "Advanced Extraction Modules",
              description:
                "Implementation of AI-powered extraction systems and advanced trading algorithms with microsecond precision execution.",
              status: "in-progress",
              date: "Q2 2025",
            },
            {
              id: "phase3",
              phase: "Phase 3",
              title: "Full Protocol Release",
              description:
                "Complete integration of all planned systems with cross-chain functionality and advanced user interfaces.",
              status: "upcoming",
              date: "Q3 2025",
            },
            {
              id: "phase4",
              phase: "Phase 4",
              title: "Partner Integrations",
              description:
                "Development of partner-specific modules and custom integrations based on strategic partnerships.",
              status: "upcoming",
              date: "Q4 2025",
            },
          ]}
          className="mb-12"
        />

        <ThreeDCard className="p-6 bg-black/70 rounded-sm">
          <CyberText
            text="Partners joining now influence development priority and receive access to each feature 30 days before public release."
            className="text-xl neon-text-pink"
            glitchIntensity="low"
          />
        </ThreeDCard>
      </div>
    ),
  },
  {
    id: "next-steps",
    title: "NEXT STEPS",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ThreeDCard className="p-6 bg-black/70 rounded-sm h-full">
            <h3 className="text-2xl font-bold text-pink-500 mb-4">Immediate Actions</h3>
            <ol className="list-decimal pl-6 space-y-6 text-lg">
              {[
                "Sign NDA for technical documentation access",
                "Schedule technical demonstration of existing systems",
                "Discuss partnership structure and economics",
                "Finalize allocation and integration details",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="transform transition-all duration-300 hover:translate-x-2 hover:text-neon-pink"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  {item}
                </motion.li>
              ))}
            </ol>
          </ThreeDCard>

          <ThreeDCard className="p-6 bg-black/70 rounded-sm h-full" borderColor="rgba(0, 229, 255, 0.3)">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Partner Benefits</h3>
            <ul className="space-y-4">
              {[
                "Early access to all tools regardless of holding tier",
                "Revenue sharing from referred users (lifetime)",
                "Custom-branded features and interfaces",
                "Priority technical support and implementation",
                "Input on development roadmap priorities",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 + 0.4 }}
                >
                  <ArrowRight className="text-cyan-400 mr-2 h-4 w-4 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </ThreeDCard>
        </div>

        <motion.div
          className="mt-12 p-8 border border-pink-500 bg-black/50 rounded-sm text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-cyan-900/20 transform hover:scale-110 transition-transform duration-500"></div>
          <p className="text-2xl font-bold text-pink-500 mb-4 relative z-10">Contact:</p>
          <p className="text-2xl font-tech relative z-10 hover:text-neon-cyan transition-colors duration-300">
            mail@waslost.ai
          </p>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pink-500"></div>
        </motion.div>
      </div>
    ),
  },
]

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")
  const containerRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (isTransitioning) return

    setSlideDirection("right")
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }, 300)
  }

  const prevSlide = () => {
    if (isTransitioning) return

    setSlideDirection("left")
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }, 300)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return

    setSlideDirection(index > currentSlide ? "right" : "left")
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }, 300)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isTransitioning])

  const slide = slides[currentSlide]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Dynamic backgrounds */}
      <AnimatedGradient className="opacity-20" />
      <ParticleSystem className="opacity-30" />
      <CircuitPattern className="fixed inset-0 opacity-10" />

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <CyberButton variant="outline" size="sm">
            &larr; Back to Home
          </CyberButton>
        </Link>
      </div>

      {/* Slide counter */}
      <div className="fixed top-4 right-4 z-50 font-tech text-sm bg-black/50 px-3 py-1 rounded-full border border-pink-500/30">
        <span className="text-neon-pink">{currentSlide + 1}</span>
        <span className="text-zinc-500">/</span>
        <span className="text-neon-cyan">{slides.length}</span>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="w-full max-w-5xl mx-auto"
              initial={{
                opacity: 0,
                x: slideDirection === "right" ? 100 : -100,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: slideDirection === "right" ? -100 : 100,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <ThreeDCard className="p-8 md:p-12 bg-black/80 backdrop-blur-xl rounded-sm" glareIntensity={0.2}>
                <div className="mb-8 relative">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-3xl md:text-5xl font-bold mb-2 neon-text-pink">{slide.title}</h2>
                    {slide.subtitle && <h3 className="text-xl md:text-2xl text-cyan-400">{slide.subtitle}</h3>}
                  </motion.div>

                  <motion.div
                    className="w-full h-0.5 bg-gradient-to-r from-pink-600 to-cyan-400 mt-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 }}
                  ></motion.div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-neon-pink"></div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-neon-cyan"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-neon-cyan"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-neon-pink"></div>
                </div>

                <div className="min-h-[500px] relative">
                  {slide.content}

                  {/* Scan line effect */}
                  <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-70 animate-scan"></div>
                </div>
              </ThreeDCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-6 z-50">
        <motion.button
          onClick={prevSlide}
          className="p-3 rounded-full bg-black/70 border border-pink-500 hover:bg-pink-900/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-neon-pink" />
        </motion.button>

        <div className="flex gap-3 bg-black/50 px-4 py-2 rounded-full border border-gray-800">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all transform ${
                index === currentSlide ? "bg-pink-500 scale-125" : "bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={nextSlide}
          className="p-3 rounded-full bg-black/70 border border-pink-500 hover:bg-pink-900/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-neon-pink" />
        </motion.button>
      </div>
    </div>
  )
}
