"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, Shield, Zap, BarChart3, Lock, DollarSign, Eye } from "lucide-react"
import TierCard from "@/components/tier-card"
import DashboardBackground from "@/components/dashboard-background"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import CyberCard from "@/components/cyber-card"
import TerminalCode from "@/components/terminal-code"
import GlitchText from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"
import ParticleEffect from "@/components/particle-effect"
import HackerText from "@/components/hacker-text"
import FloatingIcons from "@/components/floating-icons"
import MobileNav from "@/components/mobile-nav"
import CyberButton from "@/components/cyber-button"
import DigitalRain from "@/components/digital-rain"
import { useWallet } from "@/context/wallet-context"

export default function Home() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const { connected, address } = useWallet()

  const openWalletModal = () => {
    setWalletModalOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <DashboardBackground />
      <MatrixBackground />
      <CircuitPattern />
      <ParticleEffect />
      <DigitalRain />
      <FloatingIcons />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-neon-pink/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight neon-text-pink font-tech-mono">$BLKBOX</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#offering" className="text-sm font-medium text-zinc-400 hover:text-neon-cyan transition-colors">
              <span className="font-tech-mono">01.</span> OFFERING
            </Link>
            <Link href="#utility" className="text-sm font-medium text-zinc-400 hover:text-neon-pink transition-colors">
              <span className="font-tech-mono">02.</span> UTILITY
            </Link>
            <Link
              href="#tokenomics"
              className="text-sm font-medium text-zinc-400 hover:text-neon-cyan transition-colors"
            >
              <span className="font-tech-mono">03.</span> TOKENOMICS
            </Link>
            <Link href="#system" className="text-sm font-medium text-zinc-400 hover:text-neon-pink transition-colors">
              <span className="font-tech-mono">04.</span> SYSTEM
            </Link>
            <Link href="#launch" className="text-sm font-medium text-zinc-400 hover:text-neon-cyan transition-colors">
              <span className="font-tech-mono">05.</span> LAUNCH
            </Link>
            <Link href="/roadmap" className="text-sm font-medium text-zinc-400 hover:text-neon-pink transition-colors">
              <span className="font-tech-mono">06.</span> ROADMAP
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {connected ? (
              <Link href="/dashboard">
                <CyberButton>DASHBOARD</CyberButton>
              </Link>
            ) : (
              <CyberButton onClick={openWalletModal}>CONNECT_WALLET</CyberButton>
            )}
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-block relative">
                <GlitchText
                  text="$BLKBOX"
                  className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-neon-pink"
                />
                <h1 className="block font-tech-mono text-neon-cyan text-2xl sm:text-3xl md:text-4xl mt-2">
                  THE SHADOW PROTOCOL
                </h1>
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-neon-pink animate-pulse"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-neon-cyan animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-neon-cyan animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-neon-pink animate-pulse"></div>
              </div>
              <DataPulse className="my-6" />
              <p className="mb-8 text-xl text-zinc-400">
                <span className="font-bold italic text-neon-pink">THE SYSTEM HAS FAILED US. I BUILT THE ANSWER</span>
              </p>
              <div className="mx-auto max-w-3xl mb-8 font-tech-mono text-sm">
                <p className="text-zinc-300">
                  While you've watched elite players extract billions from the market, they've used tools you never had
                  access to.
                </p>
                <div className="mt-4 inline-block">
                  <HackerText text="Until Now." className="text-xl font-bold text-neon-pink" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/presale">
                  <CyberButton size="lg" glowColor="pink">
                    JOIN_PRESALE <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </CyberButton>
                </Link>
                <Link href="/whitepaper">
                  <CyberButton size="lg" glowColor="cyan" variant="outline">
                    READ_WHITEPAPER
                  </CyberButton>
                </Link>
              </div>
              <div className="mt-8">
                <CyberButton size="lg" className="px-8 py-6 text-xl" glowColor="pink" onClick={openWalletModal}>
                  CONNECT_WALLET
                </CyberButton>
              </div>
              <div className="mt-12">
                <Link
                  href="#system"
                  className="inline-flex items-center text-neon-cyan hover:text-white font-tech-mono"
                >
                  SCROLL_DOWN <ChevronDown className="ml-1 h-4 w-4 animate-bounce" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Offering Section */}
        <section id="offering" className="py-20 bg-black/80 relative">
          <div className="absolute inset-0 dashboard-bg opacity-30"></div>
          <div className="container relative z-10">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-center sm:text-4xl">
              <span className="text-neon-pink font-tech-mono">[</span>
              <span className="text-neon-cyan">THE REVOLUTION</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" color="cyan" />
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-xl text-zinc-300 font-tech-mono">
                $BLKBOX isn't software. It's warfare against a rigged system.
              </p>
            </div>

            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-xl text-zinc-300 font-tech-mono">
                A comprehensive Solana DeFi arsenal built by operators who engineered trading systems before most had
                heard of blockchain. Using cutting-edge AI, dedicated infrastructure, and techniques refined in the
                shadows.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-center mb-8 text-neon-cyan font-tech-mono">WHAT'S IN THE BOX?</h3>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <CyberCard>
                <Shield className="h-10 w-10 mb-4 text-neon-pink" />
                <h3 className="text-xl font-bold mb-2 text-neon-pink">Stealth MEV Extraction</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Capture value before others even see the opportunity.
                </p>
              </CyberCard>
              <CyberCard variant="cyan">
                <Zap className="h-10 w-10 mb-4 text-neon-cyan" />
                <h3 className="text-xl font-bold mb-2 text-neon-cyan">Dark Launch Toolkit</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Deploy tokens with perfect liquidity curves and hidden backdoors.
                </p>
              </CyberCard>
              <CyberCard>
                <Lock className="h-10 w-10 mb-4 text-neon-pink" />
                <h3 className="text-xl font-bold mb-2 text-neon-pink">Shadow Swap System</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Route transactions through obfuscation layers to hide intent.
                </p>
              </CyberCard>
              <CyberCard variant="cyan">
                <BarChart3 className="h-10 w-10 mb-4 text-neon-cyan" />
                <h3 className="text-xl font-bold mb-2 text-neon-cyan">Predictive Liquidation Engine</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Target vulnerable positions before they collapse.
                </p>
              </CyberCard>
              <CyberCard>
                <DollarSign className="h-10 w-10 mb-4 text-neon-pink" />
                <h3 className="text-xl font-bold mb-2 text-neon-pink">Sniping Automation</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Microsecond-precision execution when promising tokens launch.
                </p>
              </CyberCard>
              <CyberCard variant="cyan">
                <Eye className="h-10 w-10 mb-4 text-neon-cyan" />
                <h3 className="text-xl font-bold mb-2 text-neon-cyan">Whale Intelligence Network</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">Track the movements of those who move markets.</p>
              </CyberCard>
            </div>
          </div>
        </section>

        {/* Utility Model Section */}
        <section id="utility" className="py-20 bg-black relative">
          <div className="absolute inset-0 dashboard-bg opacity-20"></div>
          <div className="container relative z-10">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-center sm:text-4xl">
              <span className="text-neon-pink font-tech-mono">[</span>
              <span className="text-neon-cyan">THE DARK POOL: POWER IN NUMBERS</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" />
            <div className="mx-auto max-w-3xl text-center mb-12">
              <p className="text-xl text-zinc-300 mb-4 font-tech-mono">
                For too long, sophisticated market operations required massive capital or insider connections. We're
                changing that forever.
              </p>
              <p className="text-2xl font-bold text-neon-pink">COORDINATED POWER</p>
            </div>

            <div className="mx-auto max-w-3xl text-center mb-12">
              <p className="text-xl text-zinc-300 font-tech-mono">
                The $BLKBOX Dark Pool allows even smaller investors to participate in high-level market operations:
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <CyberCard>
                <Shield className="h-10 w-10 mb-4 text-neon-pink" />
                <h3 className="text-xl font-bold mb-2 text-neon-pink">Pooled Capital Deployment</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Execute strategies that require significant resources
                </p>
              </CyberCard>
              <CyberCard variant="cyan">
                <Zap className="h-10 w-10 mb-4 text-neon-cyan" />
                <h3 className="text-xl font-bold mb-2 text-neon-cyan">Proportional USDC Returns</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">Daily dividends based on your contribution</p>
              </CyberCard>
              <CyberCard>
                <BarChart3 className="h-10 w-10 mb-4 text-neon-pink" />
                <h3 className="text-xl font-bold mb-2 text-neon-pink">Illusory Network Compliance</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Safety in grouped actions that mask individual intent
                </p>
              </CyberCard>
              <CyberCard variant="cyan">
                <Lock className="h-10 w-10 mb-4 text-neon-cyan" />
                <h3 className="text-xl font-bold mb-2 text-neon-cyan">Counter-Offensive Capabilities</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">Level the playing field against predatory whales</p>
              </CyberCard>
              <CyberCard>
                <DollarSign className="h-10 w-10 mb-4 text-neon-pink" />
                <h3 className="text-xl font-bold mb-2 text-neon-pink">Professional Execution</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Benefit from advanced algorithms without technical expertise
                </p>
              </CyberCard>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl font-bold text-neon-cyan font-tech-mono">
                Join operations with as little as 0.5 SOL and receive daily profits directly in USDC.
              </p>
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section id="tokenomics" className="py-20 bg-black relative">
          <div className="absolute inset-0 dashboard-bg opacity-20"></div>
          <div className="container relative z-10">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-center sm:text-4xl">
              <span className="text-neon-pink font-tech-mono">[</span>
              <span className="text-neon-cyan">THE TOKEN: $BLKBOX</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" />
            <div className="mx-auto max-w-3xl text-center mb-12">
              <p className="text-xl text-zinc-300 mb-4 font-tech-mono">
                This isn't charity. Access requires skin in the game.
              </p>
              <p className="text-2xl font-bold text-neon-pink">
                HOLD TO ACCESS. CONTRIBUTE TO PROFIT. GOVERN TO CONTROL.
              </p>
            </div>

            <div className="mx-auto max-w-3xl text-center mb-12">
              <p className="text-xl text-zinc-300 mb-4 font-tech-mono">
                FAIR LAUNCH - NO INFLUENCERS, NO VCs, NO GAMES
              </p>
              <p className="text-2xl font-bold text-neon-pink">
                Initial Price: $0.001 | Launch Platform: Solana P2P Fair Launch
              </p>
              <p className="text-2xl font-bold text-neon-cyan">
                Hard Cap: $1,000,000 | Total Supply: 1,000,000,000 $BLKBOX
              </p>
              <p className="text-xl text-zinc-300 mt-4 font-tech-mono">
                No vesting. No allocations to influencers. What you buy is immediately yours.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-center mb-8 text-neon-cyan font-tech-mono">DAILY USDC DIVIDENDS</h3>

            <div className="mx-auto max-w-3xl text-center mb-12">
              <p className="text-xl text-zinc-300 mb-4 font-tech-mono">
                From day one – even during platform development:
              </p>
              <p className="text-2xl font-bold text-neon-pink">
                2% of all swap volume | 5% of MEV profits | 10% of Dark Pool revenue
              </p>
              <p className="text-xl text-zinc-300 mt-4 font-tech-mono">
                3% of all token transfers → Automatic buyback and burn
              </p>
              <p className="text-2xl font-bold text-neon-cyan">
                No staking. No claiming. USDC sent directly to your wallet. Every. Single. Day.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-center mb-8 text-neon-cyan font-tech-mono">TIER ACCESS SYSTEM</h3>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <TierCard
                tier="ENTRY LEVEL"
                amount="10,000"
                features={["Basic toolkit", "Dark Pool access (0.5-5 SOL min contribution)"]}
                color="from-neon-pink/20 to-neon-pink/10"
                borderColor="border-neon-pink/50"
              />
              <TierCard
                tier="OPERATOR"
                amount="50,000"
                features={["Advanced features", "Dark Pool priority (5-25 SOL min contribution)"]}
                color="from-neon-pink/30 to-neon-cyan/20"
                borderColor="border-neon-pink/50"
              />
              <TierCard
                tier="SHADOW ELITE"
                amount="250,000"
                features={["Full arsenal", "Dark Pool strategy input (25-100 SOL min contribution)"]}
                color="from-neon-pink/40 to-neon-cyan/30"
                borderColor="border-neon-cyan/50"
              />
              <TierCard
                tier="PHANTOM COUNCIL"
                amount="1,000,000+"
                features={["Governance rights", "Dark Pool operation management", "Private alpha group"]}
                color="from-neon-pink/50 to-neon-cyan/40"
                borderColor="border-neon-cyan/50"
                featured={true}
              />
            </div>

            <div className="mt-12">
              <TerminalCode
                code={`// Access tier calculation
function calculateTier(holdings) {
  if (holdings >= 1000000) return "PHANTOM_COUNCIL";
  if (holdings >= 250000) return "SHADOW_ELITE";
  if (holdings >= 50000) return "OPERATOR";
  if (holdings >= 10000) return "ENTRY_LEVEL";
  return "UNAUTHORIZED";
}`}
                className="max-w-2xl mx-auto"
              />
            </div>

            <h3 className="text-2xl font-bold text-center mb-8 text-neon-cyan font-tech-mono">
              SMART CONTRACT BONUSES
            </h3>

            <div className="mx-auto max-w-3xl text-center mb-12">
              <p className="text-xl text-zinc-300 mb-4 font-tech-mono">
                Diamond Hands Multiplier | Volume Generation Rewards | Referral Commissions | DAO Participation Bonuses
              </p>
            </div>
          </div>
        </section>
        {/* From The Shadows Section */}
        <section className="py-20 bg-black/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/matrix-pattern.svg')] opacity-10"></div>
          <div className="container relative z-10">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-center sm:text-4xl">
              <span className="text-neon-pink font-tech-mono">[</span>
              <span className="text-neon-cyan">FROM THE DEVELOPER</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" color="cyan" />
            <div className="mx-auto max-w-3xl">
              <CyberCard className="bg-black/60">
                <div className="prose prose-invert prose-lg mx-auto font-tech-mono text-sm">
                  <p>
                    Ten years building systems for those who claimed to be innovating while simply extracting. Watching
                    as retail investors were systematically separated from their capital through information asymmetry
                    and technical advantages.
                  </p>
                  <p>
                    The blockchain promised democratization but delivered a more sophisticated version of the same
                    rigged game.
                  </p>
                  <p>
                    $BLKBOX changes that. By giving you the same tools the predators use, while allowing coordinated
                    action through the Dark Pool.
                  </p>
                </div>
              </CyberCard>
            </div>
          </div>
        </section>
        {/* DAO Section */}
        <section className="py-20 bg-black/80 relative">
          <div className="absolute inset-0 dashboard-bg opacity-30"></div>
          <div className="container relative z-10">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-center sm:text-4xl">
              <span className="text-neon-pink font-tech-mono">[</span>
              <span className="text-neon-cyan">THE DAO: CONTROL THE SHADOWS</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" color="cyan" />
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-xl text-zinc-300 font-tech-mono">
                $BLKBOX isn't controlled by developers or VCs. The community governs:
              </p>
              <p className="text-2xl font-bold text-neon-pink">
                Strategy Selection | Parameter Adjustment | Profit Distribution | Development Roadmap | Partnership
                Approvals
              </p>
              <p className="text-xl text-zinc-300 mt-4 font-tech-mono">
                Voting power is calculated through a combination of token holdings, Dark Pool participation, and
                platform activity.
              </p>
            </div>
          </div>
        </section>
        {/* Growth & Partnerships Section */}
        <section className="py-20 bg-black/80 relative">
          <div className="absolute inset-0 dashboard-bg opacity-30"></div>
          <div className="container relative z-10">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-center sm:text-4xl">
              <span className="text-neon-pink font-tech-mono">[</span>
              <span className="text-neon-cyan">GROWTH & PARTNERSHIPS</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" color="cyan" />
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-xl text-zinc-300 font-tech-mono">
                $BLKBOX is building strategic relationships to expand capabilities:
              </p>
              <p className="text-2xl font-bold text-neon-pink">
                RPC Collaborations | DEX Integrations | Protocol Partnerships | Cross-Chain Expansion | AI Development
              </p>
              <p className="text-xl text-zinc-300 mt-4 font-tech-mono">
                Each partnership is subject to DAO approval and must demonstrate direct value to token holders.
              </p>
            </div>
          </div>
        </section>
        {/* Join The Dark Renaissance */}
        <section className="py-20 bg-black/80 relative">
          <div className="absolute inset-0 dashboard-bg opacity-30"></div>
          <div className="container relative z-10">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-center sm:text-4xl">
              <span className="text-neon-pink font-tech-mono">[</span>
              <span className="text-neon-cyan">THIS IS NOT FOR EVERYONE</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" color="cyan" />
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-xl text-zinc-300 font-tech-mono">
                If you're looking for cute memes and safe investments, you're in the wrong place.
              </p>
              <p className="text-xl text-zinc-300 mt-4 font-tech-mono">
                $BLKBOX is for operators. Those who understand that in a rigged game, the only winning move is to change
                the rules.
              </p>
              <p className="text-xl text-zinc-300 mt-4 font-tech-mono">
                The system already knows we're coming. They're already trying to stop what's building in the shadows.
              </p>
              <p className="text-2xl font-bold mt-8 text-neon-pink">Are you ready to join the counterattack?</p>
              <div className="mt-8">
                <CyberButton size="lg" className="px-8 py-6 text-xl" glowColor="pink" onClick={openWalletModal}>
                  <span className="relative z-10">CONNECT_WALLET</span>
                </CyberButton>
              </div>
            </div>
          </div>
        </section>
        {/* Legal Disclaimer */}
        <section className="py-12 bg-black/50">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm text-zinc-400 italic font-tech-mono">
                Legal Disclaimer: $BLKBOX is an experimental utility token. Users bear sole responsibility for their
                actions with the provided tools and for compliance with all applicable laws in their jurisdictions. The
                Dark Pool operates as a collective trading coordination system, not as an investment fund or financial
                advisor.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
