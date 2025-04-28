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
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
