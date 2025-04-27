"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CyberButton } from "@/components/cyber-button"
import { GlitchText } from "@/components/glitch-text"
import { TerminalText } from "@/components/terminal-text"
import { CircuitPattern } from "@/components/circuit-pattern"

const slides = [
  {
    id: "intro",
    title: "$BLKBOX: THE SHADOW PROTOCOL",
    subtitle: "PARTNER OPPORTUNITY BRIEF",
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <Image src="/blkbox-logo-large.png" alt="BLKBOX Logo" width={300} height={300} className="mb-8 animate-pulse" />
        <GlitchText text="THE SHADOW PROTOCOL" className="text-4xl md:text-6xl font-bold mb-4 text-center" />
        <div className="w-32 h-1 bg-gradient-to-r from-pink-600 to-cyan-400 my-6"></div>
        <TerminalText text="PARTNER OPPORTUNITY BRIEF" className="text-xl md:text-2xl text-center" />
      </div>
    ),
  },
  {
    id: "opportunity",
    title: "THE OPPORTUNITY",
    content: (
      <div className="space-y-6">
        <p className="text-lg">
          While mainstream DeFi plays by established rules, a parallel ecosystem operates beneath the surface—where real
          alpha is generated and value is extracted before retail even sees the opportunity.
        </p>
        <p className="text-lg">
          $BLKBOX is the first comprehensive toolkit bringing these capabilities to a wider audience through a
          sustainable, token-gated business model.
        </p>
        <p className="text-lg neon-text-pink">
          We're seeking strategic partners who understand this vision and want to position themselves at the forefront
          of next-generation DeFi operations.
        </p>
      </div>
    ),
  },
  {
    id: "who-we-are",
    title: "WHO WE ARE",
    content: (
      <div className="space-y-6">
        <p className="text-lg">Our team combines:</p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>10+ years of proprietary trading system development</li>
          <li>Core contributors to Solana DeFi infrastructure</li>
          <li>ML/AI specialists focused on market prediction</li>
          <li>Security researchers who understand protocol vulnerabilities</li>
        </ul>
        <div className="mt-8 p-4 border border-cyan-500 bg-black/50 rounded">
          <p className="text-lg font-bold text-cyan-400">Our Advantage</p>
          <p className="text-lg">We've built what institutional traders use internally but never share publicly.</p>
        </div>
      </div>
    ),
  },
  {
    id: "product",
    title: "THE PRODUCT: BEYOND BASIC DEFI",
    content: (
      <div className="space-y-6">
        <p className="text-lg">
          $BLKBOX isn't another trading interface—it's warfare technology for financial markets:
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-pink-500 mb-3">Core Systems Already Developed:</h3>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>
              <span className="font-bold">Alpha Network Extraction Suite</span> with microsecond-precision execution
            </li>
            <li>
              <span className="font-bold">Dark Launch Toolkit</span> for flawless token deployments
            </li>
            <li>
              <span className="font-bold">Shadow Swap System</span> for intent-hidden transactions
            </li>
            <li>
              <span className="font-bold">AI Strategy Lab</span> generating custom algorithms
            </li>
            <li>
              <span className="font-bold">Predictive Market Intelligence Engine</span> targeting opportunity zones
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-3">Advanced Systems In Development:</h3>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>
              <span className="font-bold">Shadow Protocol Interoperability Framework</span> targeting cross-chain
              dynamics
            </li>
            <li>
              <span className="font-bold">Quantum State Processing Engine</span> exploiting parallel transaction
              architecture
            </li>
            <li>
              <span className="font-bold">Temporal Fragmentation Engine</span> creating timing-based opportunities
            </li>
          </ul>
        </div>

        <p className="text-lg mt-6 neon-text-pink">
          We don't just offer tools—we provide systematic advantages previously unavailable outside closed circles.
        </p>
      </div>
    ),
  },
  {
    id: "token-model",
    title: "THE TOKEN MODEL",
    subtitle: "SUSTAINABLE VALUE CREATION",
    content: (
      <div className="space-y-6">
        <p className="text-lg">$BLKBOX combines access utility with direct financial rewards:</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="cyber-card p-4">
            <h3 className="text-xl font-bold text-pink-500 mb-2">Token-Gated Access</h3>
            <p>Hold to use the tools (tiered by holding amount)</p>
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-xl font-bold text-pink-500 mb-2">Direct USDC Dividends</h3>
            <p>Daily distributions from platform revenue</p>
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-xl font-bold text-pink-500 mb-2">Governance Rights</h3>
            <p>High-tier holders direct platform development</p>
          </div>
        </div>

        <div className="mt-6 p-4 border border-cyan-500 bg-black/50 rounded">
          <p className="text-lg font-bold text-cyan-400">This creates a flywheel effect:</p>
          <p className="text-lg">
            Tools generate value → Value drives dividends → Dividends increase demand → Demand fuels development →
            Better tools generate more value
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "partnership",
    title: "PARTNERSHIP OPPORTUNITIES",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-pink-500 mb-3">Technical Integration Partners</h3>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Access to our DEX/CEX connectors for custom integrations</li>
            <li>Early implementation of our advanced routing algorithms</li>
            <li>Co-development of specialized tools for mutual benefit</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-pink-500 mb-3">Distribution Partners</h3>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Exclusive allocation of $BLKBOX tokens at pre-sale prices</li>
            <li>Revenue sharing for referred users</li>
            <li>White-labeled tools for your community</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-pink-500 mb-3">Strategic Investment Partners</h3>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Equity stake in the operational company</li>
            <li>Priority dividend distributions</li>
            <li>Input on development roadmap and feature prioritization</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "market",
    title: "MARKET POSITIONING",
    content: (
      <div className="space-y-6">
        <div className="relative h-80 w-full border border-gray-700 bg-black/50 p-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* Y-axis label */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-gray-400">CAPABILITY</div>

              {/* X-axis label */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-400">VALUE FOR USERS</div>

              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 h-full w-px bg-gray-700"></div>

              {/* Horizontal line */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-700"></div>

              {/* Quadrant labels */}
              <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-sm text-center">
                CLOSED
                <br />
                INSIDER
                <br />
                TOOLS
              </div>

              <div className="absolute top-1/4 left-3/4 -translate-x-1/2 -translate-y-1/2 text-pink-500 font-bold text-lg">
                $BLKBOX
              </div>

              <div className="absolute top-3/4 left-1/4 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-sm text-center">
                BASIC
                <br />
                DEFI
                <br />
                TOOLS
              </div>

              <div className="absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-sm text-center">
                MAINSTREAM
                <br />
                DEFI
                <br />
                PLATFORMS
              </div>

              {/* Axis labels */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-gray-400">
                HIGH CAPABILITY
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-gray-400">
                LOW CAPABILITY
              </div>

              <div className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 text-gray-400">LOW VALUE</div>

              <div className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2 text-gray-400">HIGH VALUE</div>
            </div>
          </div>
        </div>

        <p className="text-lg mt-6 neon-text-cyan">
          We operate in an uncontested space: high-capability tools with direct user value that were previously
          unavailable outside closed circles.
        </p>
      </div>
    ),
  },
  {
    id: "token-launch",
    title: "THE TOKEN LAUNCH",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="cyber-card p-4 text-center">
            <h3 className="text-lg font-bold text-pink-500 mb-2">Initial Price</h3>
            <p className="text-2xl">$0.01</p>
          </div>

          <div className="cyber-card p-4 text-center">
            <h3 className="text-lg font-bold text-pink-500 mb-2">Hard Cap</h3>
            <p className="text-2xl">$1,000,000</p>
          </div>

          <div className="cyber-card p-4 text-center">
            <h3 className="text-lg font-bold text-pink-500 mb-2">Launch</h3>
            <p className="text-xl">Meteora.ag</p>
          </div>

          <div className="cyber-card p-4 text-center">
            <h3 className="text-lg font-bold text-pink-500 mb-2">Partner Allocation</h3>
            <p className="text-2xl">15%</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-cyan-400 mb-3">Partners receive:</h3>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Discounted token allocation (50% below public price)</li>
            <li>Early access to all tools regardless of holding tier</li>
            <li>Revenue sharing from referred users (lifetime)</li>
            <li>Custom-branded features and interfaces</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "timeline",
    title: "DEVELOPMENT TIMELINE",
    content: (
      <div className="space-y-8">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-600 to-cyan-400"></div>

          <div className="ml-12 space-y-12">
            <div className="relative">
              <div className="absolute -left-12 w-8 h-8 rounded-full bg-black border-2 border-pink-500 flex items-center justify-center">
                <span className="text-pink-500 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-pink-500">Phase 1 (Current)</h3>
                <p className="text-lg">Core infrastructure and trading systems</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-12 w-8 h-8 rounded-full bg-black border-2 border-pink-500 flex items-center justify-center">
                <span className="text-pink-500 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-pink-500">Phase 2 (Q2)</h3>
                <p className="text-lg">Advanced extraction modules and AI integration</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-12 w-8 h-8 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center">
                <span className="text-cyan-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-400">Phase 3 (Q3)</h3>
                <p className="text-lg">Full release with all planned systems</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-12 w-8 h-8 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center">
                <span className="text-cyan-400 font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-400">Phase 4 (Q4)</h3>
                <p className="text-lg">Partner-specific modules and integrations</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg mt-6 neon-text-pink">
          Partners joining now influence development priority and receive access to each feature 30 days before public
          release.
        </p>
      </div>
    ),
  },
  {
    id: "meteora",
    title: "METEORA INTEGRATION BENEFITS",
    content: (
      <div className="space-y-6">
        <p className="text-lg">Our strategic launch on Meteora.ag provides several key advantages:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="cyber-card p-4">
            <h3 className="text-xl font-bold text-pink-500 mb-2">Enhanced Security</h3>
            <p>Multi-layered audit protection</p>
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-xl font-bold text-pink-500 mb-2">Capital Efficiency</h3>
            <p>Optimized liquidity provisioning</p>
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-xl font-bold text-pink-500 mb-2">Technical Infrastructure</h3>
            <p>Leveraging battle-tested smart contracts</p>
          </div>

          <div className="cyber-card p-4">
            <h3 className="text-xl font-bold text-pink-500 mb-2">Community Exposure</h3>
            <p>Access to Meteora's established user base</p>
          </div>
        </div>

        <p className="text-lg mt-6">
          This integration ensures a smooth, fair launch while maximizing long-term sustainability.
        </p>
      </div>
    ),
  },
  {
    id: "why-partner",
    title: "WHY PARTNER NOW",
    content: (
      <div className="space-y-6">
        <ol className="list-decimal pl-6 space-y-4 text-lg">
          <li>
            <span className="font-bold text-pink-500">Early Mover Advantage:</span> Position yourself at the forefront
            of next-generation DeFi tools
          </li>
          <li>
            <span className="font-bold text-pink-500">Preferred Economics:</span> Best token pricing and revenue sharing
            terms
          </li>
          <li>
            <span className="font-bold text-pink-500">Development Input:</span> Shape the platform to meet your specific
            needs
          </li>
          <li>
            <span className="font-bold text-pink-500">Competitive Edge:</span> Provide your users capabilities
            unavailable elsewhere
          </li>
          <li>
            <span className="font-bold text-pink-500">Sustainable Revenue:</span> Ongoing USDC dividends create lasting
            value
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "next-steps",
    title: "NEXT STEPS",
    content: (
      <div className="space-y-8">
        <ol className="list-decimal pl-6 space-y-4 text-lg">
          <li>Sign NDA for technical documentation access</li>
          <li>Schedule technical demonstration of existing systems</li>
          <li>Discuss partnership structure and economics</li>
          <li>Finalize allocation and integration details</li>
        </ol>

        <p className="text-lg mt-8">
          The future of Solana DeFi belongs to those with superior tools and information. Partner with $BLKBOX to ensure
          you're on the right side of that equation.
        </p>

        <div className="mt-8 p-6 border border-pink-500 bg-black/50 rounded text-center">
          <p className="text-xl font-bold text-pink-500 mb-2">Contact:</p>
          <p className="text-xl font-tech">partnerships@blkbox.io</p>
        </div>
      </div>
    ),
  },
]

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const slide = slides[currentSlide]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <CircuitPattern className="fixed inset-0 opacity-10" />

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-10">
        <Link href="/">
          <CyberButton variant="outline" size="sm">
            &larr; Back to Home
          </CyberButton>
        </Link>
      </div>

      {/* Slide counter */}
      <div className="fixed top-4 right-4 z-10 font-tech text-sm">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl mx-auto cyber-card p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 neon-text-pink">{slide.title}</h2>
              {slide.subtitle && <h3 className="text-xl md:text-2xl text-cyan-400">{slide.subtitle}</h3>}
              <div className="w-full h-0.5 bg-gradient-to-r from-pink-600 to-cyan-400 mt-4"></div>
            </div>

            <div className="min-h-[400px]">{slide.content}</div>
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-10">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-black/50 border border-pink-500 hover:bg-pink-900/30 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-pink-500" : "bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-black/50 border border-pink-500 hover:bg-pink-900/30 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
