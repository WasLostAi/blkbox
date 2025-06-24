import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"

export default function RoadmapPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-neon-pink/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors">
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_HOME</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <GlitchText
              text="$BLKBOX ROADMAP"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono text-xl">THE SHADOW PROTOCOL EVOLUTION</p>
            <DataPulse className="my-6" />
          </div>

          <div className="space-y-24">
            {/* Phase 1 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-neon-pink via-neon-cyan to-transparent"></div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-black border-2 border-neon-pink flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neon-pink"></div>
                </div>

                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-neon-pink font-tech-mono">PHASE 1: GENESIS</h2>
                  <p className="text-neon-cyan">Q2 2025</p>
                </div>

                <CyberCard className="bg-black/60">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-pink mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-cyan">Token Launch</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Initial token offering through tiered presale structure, followed by DEX listing with locked
                          liquidity.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-pink mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-cyan">Basic Toolkit Deployment</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Release of entry-level tools including Shadow Swap System and Whale Intelligence Network.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-pink mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-cyan">First Dividend Distribution</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Initial USDC dividend payment to all token holders based on tier structure.
                        </p>
                      </div>
                    </div>
                  </div>
                </CyberCard>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-neon-cyan via-neon-pink to-transparent"></div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-black border-2 border-neon-cyan flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                </div>

                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-neon-cyan font-tech-mono">PHASE 2: EXPANSION</h2>
                  <p className="text-neon-pink">Q3 2025</p>
                </div>

                <CyberCard variant="cyan" className="bg-black/60">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-pink">AI Strategy Lab Release</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Launch of AI-powered trading strategy generator with custom risk profiles and backtesting.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-pink">Advanced MEV Extraction</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Release of sophisticated MEV extraction algorithms with priority transaction routing.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-pink">Whale Intelligence Network Expansion</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Enhanced whale tracking with pattern recognition and predictive alerts.
                        </p>
                      </div>
                    </div>
                  </div>
                </CyberCard>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-neon-pink to-transparent"></div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-black border-2 border-neon-pink flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neon-pink"></div>
                </div>

                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-neon-pink font-tech-mono">PHASE 3: EVOLUTION</h2>
                  <p className="text-neon-cyan">Q4 2025</p>
                </div>

                <CyberCard className="bg-black/60">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-pink mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-cyan">Cross-Chain Expansion</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Extension of $BLKBOX tools to additional blockchains, starting with Ethereum and Arbitrum.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-pink mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-cyan">Institutional Partnerships</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Strategic partnerships with trading firms and DeFi protocols to enhance tool capabilities.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-pink mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-cyan">Governance System Activation</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Launch of Phantom Council governance for protocol decisions and treasury management.
                        </p>
                      </div>
                    </div>
                  </div>
                </CyberCard>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-neon-cyan to-transparent"></div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-black border-2 border-neon-cyan flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                </div>

                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-neon-cyan font-tech-mono">PHASE 4: DOMINANCE</h2>
                  <p className="text-neon-pink">Q1-Q2 2026</p>
                </div>

                <CyberCard variant="cyan" className="bg-black/60">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-pink">Decentralized Trading Network</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Launch of peer-to-peer trading network with shared liquidity and execution capabilities.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-pink">Advanced Predictive Analytics</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Integration of machine learning models for market prediction and automated strategy
                          adjustment.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2"></div>
                      <div>
                        <h3 className="text-lg font-bold text-neon-pink">Shadow Protocol 2.0</h3>
                        <p className="text-zinc-300 font-tech-mono text-sm">
                          Complete ecosystem overhaul with enhanced security, performance, and feature set.
                        </p>
                      </div>
                    </div>
                  </div>
                </CyberCard>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/">
              <CyberButton size="lg" glowColor="cyan">
                RETURN_TO_HOME
              </CyberButton>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-neon-pink font-bold">$BLK</span>
            <span className="text-neon-cyan font-bold">BOX</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="https://twitter.com" className="text-zinc-400 hover:text-neon-pink transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="https://t.me" className="text-zinc-400 hover:text-neon-pink transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </Link>
            <Link href="https://discord.com" className="text-zinc-400 hover:text-neon-pink transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 9a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h4"></path>
                <path d="M16 3v5"></path>
                <path d="M8 3v5"></path>
                <path d="M12 12h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"></path>
              </svg>
            </Link>
            <Link href="https://medium.com" className="text-zinc-400 hover:text-neon-pink transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 3v18"></path>
                <path d="M6 3v18"></path>
                <path d="M12 3v18"></path>
              </svg>
            </Link>
          </div>
          <div className="text-xs text-zinc-500">
            © 2025 $BLKBOX. All rights reserved.{" "}
            <Link href="/pitch-deck" className="text-zinc-500 hover:text-neon-cyan transition-colors opacity-60">
              [pitch]
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
