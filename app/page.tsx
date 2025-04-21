"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, Shield, Zap, BarChart3, Lock, Users, DollarSign, Brain, Eye } from "lucide-react"
import CountdownTimer from "@/components/countdown-timer"
import TokenomicsChart from "@/components/tokenomics-chart"
import TierCard from "@/components/tier-card"
import DividendCard from "@/components/dividend-card"
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
import WalletModal from "@/components/wallet-modal"
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
                <span className="font-bold italic text-neon-pink">THEY WANTED ME GONE.</span>
                <span className="text-neon-cyan"> I BUILT SOMETHING DARKER.</span>
              </p>
              <div className="mx-auto max-w-3xl mb-8 font-tech-mono text-sm">
                <p className="text-zinc-300">
                  Ten years in exile taught me one thing: Playing by their rules is a game designed for you to lose.
                </p>
                <p className="text-zinc-300 mt-4">
                  While you've been chasing pump and dumps, following influencer signals, and settling for breadcrumbs –
                  the real players have been operating with tools you never knew existed.
                </p>
                <div className="mt-4 inline-block">
                  <HackerText text="Until now." className="text-xl font-bold text-neon-pink" />
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
              <span className="text-neon-cyan">THE OFFERING</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" color="cyan" />
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-xl text-zinc-300 font-tech-mono">
                $BLKBOX isn't another shitcoin. It's access to the darkest toolbox ever built for Solana. A system that
                gives you what the whales, insiders, and shadow teams have been using while you've been settling for
                scraps.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <CyberCard>
                <Shield className="h-10 w-10 mb-4 text-neon-pink" />
                <h3 className="text-xl font-bold mb-2 text-neon-pink">Exclusive Access</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Gain entry to tools previously available only to insiders and whales.
                </p>
              </CyberCard>
              <CyberCard variant="cyan">
                <Zap className="h-10 w-10 mb-4 text-neon-cyan" />
                <h3 className="text-xl font-bold mb-2 text-neon-cyan">MEV Extraction</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Capture value others miss with AI-powered MEV extraction systems.
                </p>
              </CyberCard>
              <CyberCard>
                <BarChart3 className="h-10 w-10 mb-4 text-neon-pink" />
                <h3 className="text-xl font-bold mb-2 text-neon-pink">USDC Dividends</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Earn automated weekly USDC distributions directly to your wallet.
                </p>
              </CyberCard>
              <CyberCard variant="cyan">
                <Lock className="h-10 w-10 mb-4 text-neon-cyan" />
                <h3 className="text-xl font-bold mb-2 text-neon-cyan">Stealth Routing</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Conceal your trading intent and minimize slippage with advanced routing.
                </p>
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
              <span className="text-neon-cyan">THE TOKEN: $BLKBOX</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" />
            <div className="mx-auto max-w-3xl text-center mb-12">
              <p className="text-xl text-zinc-300 mb-4 font-tech-mono">
                This isn't charity. Access requires skin in the game.
              </p>
              <p className="text-2xl font-bold text-neon-pink">HOLD TO ACCESS. HOLD TO PROFIT.</p>
            </div>

            <h3 className="text-2xl font-bold text-center mb-8 text-neon-cyan font-tech-mono">TIER ACCESS SYSTEM</h3>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <TierCard
                tier="ENTRY LEVEL"
                amount="10,000"
                features={["Basic toolkit", "Manual execution", "Weekly USDC dividends"]}
                color="from-neon-pink/20 to-neon-pink/10"
                borderColor="border-neon-pink/50"
              />
              <TierCard
                tier="OPERATOR"
                amount="50,000"
                features={["Advanced features", "Semi-automated strategies", "Higher dividend rate"]}
                color="from-neon-pink/30 to-neon-cyan/20"
                borderColor="border-neon-pink/50"
              />
              <TierCard
                tier="SHADOW ELITE"
                amount="250,000"
                features={["Full arsenal", "Priority execution", "Custom AI agents"]}
                color="from-neon-pink/40 to-neon-cyan/30"
                borderColor="border-neon-cyan/50"
              />
              <TierCard
                tier="PHANTOM COUNCIL"
                amount="1,000,000+"
                features={["Governance rights", "Alpha group access", "Direct developer line"]}
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
}

// Example usage
const myHoldings = 500000;
const myTier = calculateTier(myHoldings);
console.log(\`Access granted: \${myTier}\`); // Access granted: SHADOW_ELITE`}
                className="max-w-2xl mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Dividend Mechanism */}
        <section className="py-20 bg-black/80 relative">
          <div className="absolute inset-0 dashboard-bg opacity-30"></div>
          <div className="container relative z-10">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-center sm:text-4xl">
              <span className="text-neon-pink font-tech-mono">[</span>
              <span className="text-neon-cyan">WEEKLY USDC DIVIDENDS</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" color="cyan" />
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-xl text-zinc-300 font-tech-mono">
                Every time $BLKBOX tools extract value from the market, holders get paid:
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <DividendCard
                percentage="2%"
                title="Swap Volume"
                description="Of all swap volume → USDC Dividend Pool"
                icon={<DollarSign className="h-10 w-10 text-neon-pink" />}
              />
              <DividendCard
                percentage="5%"
                title="MEV Profits"
                description="Of MEV profits → Direct holder distributions"
                icon={<Zap className="h-10 w-10 text-neon-cyan" />}
              />
              <DividendCard
                percentage="10%"
                title="Subscription Revenue"
                description="Of subscription revenue → Weekly USDC payouts"
                icon={<Users className="h-10 w-10 text-neon-pink" />}
              />
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl font-bold text-neon-cyan font-tech-mono">
                No staking. No claiming. USDC sent directly to your wallet. Every. Single. Week.
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
              <span className="text-neon-cyan">TOKENOMICS</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" />
            <div className="mx-auto max-w-3xl text-center mb-8">
              <p className="text-xl text-zinc-300 mb-4 font-tech-mono">
                <span className="font-bold text-neon-pink">Total Supply:</span> 100,000,000 $BLKBOX
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <TokenomicsChart />
              </div>
              <div className="space-y-6">
                <CyberCard className="bg-black/60">
                  <h3 className="text-xl font-bold mb-3 text-neon-cyan">Distribution</h3>
                  <ul className="space-y-2 text-zinc-300 font-tech-mono text-sm">
                    <li className="flex items-center">
                      <span className="w-8 h-1 bg-neon-pink mr-3"></span>
                      <span>30% Community Sale</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-8 h-1 bg-neon-cyan mr-3"></span>
                      <span>20% Development Fund (3-year linear vesting)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-8 h-1 bg-neon-pink/80 mr-3"></span>
                      <span>15% Liquidity Pool (locked for 2 years)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-8 h-1 bg-neon-cyan/80 mr-3"></span>
                      <span>15% Marketing & Partnerships</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-8 h-1 bg-neon-pink/60 mr-3"></span>
                      <span>10% Team (1-year cliff, 3-year vesting)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-8 h-1 bg-neon-cyan/60 mr-3"></span>
                      <span>10% Future Shadow Operations</span>
                    </li>
                  </ul>
                </CyberCard>

                <CyberCard variant="cyan" className="bg-black/60">
                  <h3 className="text-xl font-bold mb-3 text-neon-pink">Tax Structure</h3>
                  <ul className="space-y-2 text-zinc-300 font-tech-mono text-sm">
                    <li>3% Buy Tax (2% USDC Dividends, 1% Treasury)</li>
                    <li>5% Sell Tax (3% USDC Dividends, 2% Auto-LP)</li>
                    <li>0% Transfer Tax Between Holders</li>
                  </ul>
                </CyberCard>

                <CyberCard className="bg-black/60">
                  <h3 className="text-xl font-bold mb-3 text-neon-cyan">Liquidity Security</h3>
                  <ul className="space-y-2 text-zinc-300 font-tech-mono text-sm">
                    <li>Initial LP tokens locked for 2 years</li>
                    <li>Auto-compounding LP mechanism</li>
                    <li>Tiered exit penalties that decrease with holding time</li>
                  </ul>
                </CyberCard>
              </div>
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
                    They called me a criminal for showing how the system was vulnerable. Then they took my work, built
                    empires on it, and left me in the shadows.
                  </p>
                  <p>
                    One "influencer" with the right connections, and my reputation was destroyed. For a decade, I
                    watched as lesser developers implemented watered-down versions of systems I'd built years before.
                  </p>
                  <p>
                    I tried returning as a "white hat." Building "compliant" tools. Attending the right conferences.
                  </p>
                  <p>
                    But when I saw that same face – the one who ended my career with lies – still profiting from
                    destroying others, I realized:
                  </p>
                  <p className="text-xl font-bold text-neon-pink">
                    The system isn't broken. It's working exactly as designed.
                  </p>
                  <p>
                    So I'm done asking permission. $BLKBOX is my response. A complete system that gives the power back
                    to those willing to take it.
                  </p>
                </div>
              </CyberCard>
            </div>
          </div>
        </section>

        {/* The System Section */}
        <section id="system" className="py-20 bg-black relative">
          <div className="absolute inset-0 dashboard-bg opacity-20"></div>
          <div className="container relative z-10">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-center sm:text-4xl">
              <span className="text-neon-pink font-tech-mono">[</span>
              <span className="text-neon-cyan">THE SYSTEM</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" />
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-xl text-neon-pink font-tech-mono">$BLKBOX isn't software. It's warfare.</p>
              <p className="text-zinc-300 mt-4 font-tech-mono text-sm">
                A comprehensive suite of Solana DeFi tools built by someone who engineered trading systems before most
                had heard the word "blockchain." Using cutting-edge AI, dedicated QuickNode infrastructure, and
                techniques refined in the shadows for a decade.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-center mb-8 text-neon-cyan font-tech-mono">WHAT'S IN THE BOX?</h3>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <CyberCard>
                <div className="mb-4 p-3 rounded-full bg-neon-pink/10 w-fit">
                  <Zap className="h-6 w-6 text-neon-pink" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">Stealth MEV Extraction</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Capture value before others even see the opportunity.
                </p>
              </CyberCard>
              <CyberCard variant="cyan">
                <div className="mb-4 p-3 rounded-full bg-neon-cyan/10 w-fit">
                  <Shield className="h-6 w-6 text-neon-cyan" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-neon-cyan">Dark Launch Toolkit</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Deploy tokens with perfect liquidity curves and hidden backdoors.
                </p>
              </CyberCard>
              <CyberCard>
                <div className="mb-4 p-3 rounded-full bg-neon-pink/10 w-fit">
                  <Lock className="h-6 w-6 text-neon-pink" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">Shadow Swap System</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Route transactions through obfuscation layers to hide intent.
                </p>
              </CyberCard>
              <CyberCard variant="cyan">
                <div className="mb-4 p-3 rounded-full bg-neon-cyan/10 w-fit">
                  <BarChart3 className="h-6 w-6 text-neon-cyan" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-neon-cyan">Predictive Liquidation Engine</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Target vulnerable positions before they collapse.
                </p>
              </CyberCard>
              <CyberCard>
                <div className="mb-4 p-3 rounded-full bg-neon-pink/10 w-fit">
                  <DollarSign className="h-6 w-6 text-neon-pink" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">Sniping Automation</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Microsecond-precision execution when promising tokens launch.
                </p>
              </CyberCard>
              <CyberCard variant="cyan">
                <div className="mb-4 p-3 rounded-full bg-neon-cyan/10 w-fit">
                  <Eye className="h-6 w-6 text-neon-cyan" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-neon-cyan">Whale Intelligence Network</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">Track the movements of those who move markets.</p>
              </CyberCard>
            </div>

            <div className="mt-8 text-center">
              <CyberCard className="bg-black/60 inline-block mx-auto">
                <div className="mb-4 p-3 rounded-full bg-neon-pink/10 w-fit mx-auto">
                  <Brain className="h-6 w-6 text-neon-pink" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">AI Strategy Lab</h3>
                <p className="text-zinc-400 font-tech-mono text-sm">
                  Generate custom trading algorithms tuned to your risk profile.
                </p>
              </CyberCard>
            </div>

            <div className="mt-12">
              <TerminalCode
                code={`// Example MEV extraction algorithm
async function extractMEV(mempool) {
  const opportunities = await scanMempool(mempool);
  
  // Filter for high-value opportunities
  const highValueOps = opportunities.filter(op => {
    return op.expectedValue > 0.5 && op.successProbability > 0.8;
  });
  
  if (highValueOps.length > 0) {
    // Sort by expected value
    const bestOp = highValueOps.sort((a, b) => 
      b.expectedValue - a.expectedValue
    )[0];
    
    // Execute with priority gas
    return executeTransaction(bestOp, {priority: "maximum"});
  }
  
  return null;
}`}
                className="max-w-2xl mx-auto"
              />
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
                $BLKBOX is for operators. Ghost traders. Those who understand that in a rigged game, the only winning
                move is to change the rules.
              </p>
              <p className="text-xl text-zinc-300 mt-4 font-tech-mono">
                The clock is ticking. They already know I'm back. They're already trying to stop what's coming.
              </p>
              <p className="text-2xl font-bold mt-8 text-neon-pink">Are you ready to step into the shadows?</p>
              <div className="mt-8">
                <CyberButton size="lg" className="px-8 py-6 text-xl" glowColor="pink" onClick={openWalletModal}>
                  <span className="relative z-10">CONNECT_WALLET</span>
                </CyberButton>
              </div>
            </div>
          </div>
        </section>

        {/* Launch Details */}
        <section id="launch" className="py-20 bg-black relative">
          <div className="absolute inset-0 dashboard-bg opacity-20"></div>
          <div className="container relative z-10">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-center sm:text-4xl">
              <span className="text-neon-pink font-tech-mono">[</span>
              <span className="text-neon-cyan">THE LAUNCH: GROUND ZERO</span>
              <span className="text-neon-pink font-tech-mono">]</span>
            </h2>
            <DataPulse className="mb-8" />

            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <CyberCard>
                    <h3 className="text-sm font-medium text-zinc-500 mb-1 font-tech-mono">Initial price</h3>
                    <p className="text-2xl font-bold text-neon-pink">(TBD)</p>
                  </CyberCard>
                  <CyberCard variant="cyan">
                    <h3 className="text-sm font-medium text-zinc-500 mb-1 font-tech-mono">Platform</h3>
                    <p className="text-2xl font-bold text-neon-cyan">(TBD)</p>
                  </CyberCard>
                  <CyberCard variant="cyan">
                    <h3 className="text-sm font-medium text-zinc-500 mb-1 font-tech-mono">Min contribution</h3>
                    <p className="text-2xl font-bold text-neon-cyan">(TBD)</p>
                  </CyberCard>
                  <CyberCard>
                    <h3 className="text-sm font-medium text-zinc-500 mb-1 font-tech-mono">Max contribution</h3>
                    <p className="text-2xl font-bold text-neon-pink">(TBD)</p>
                  </CyberCard>
                </div>

                <CyberCard>
                  <h3 className="text-sm font-medium text-zinc-500 mb-1 font-tech-mono">Hard cap</h3>
                  <p className="text-3xl font-bold text-neon-pink">(TBD)</p>
                </CyberCard>

                <CyberCard variant="cyan">
                  <h3 className="text-sm font-medium text-zinc-500 mb-1 font-tech-mono">Total Supply</h3>
                  <p className="text-3xl font-bold text-neon-cyan">100,000,000 $BLKBOX</p>
                </CyberCard>

                <div className="text-center">
                  <p className="text-lg font-bold text-neon-pink font-tech-mono">
                    No vesting. No bullshit. What you buy is immediately yours.
                  </p>
                </div>
              </div>

              <div>
                <CyberCard className="bg-black/60">
                  <h3 className="text-2xl font-bold mb-6 text-center text-neon-cyan font-tech-mono">
                    Presale Starts In
                  </h3>
                  <CountdownTimer targetDate="2025-05-01T00:00:00Z" />
                  <div className="mt-8 space-y-4">
                    <Link href="/whitelist">
                      <CyberButton className="w-full h-12 text-lg" glowColor="pink">
                        JOIN_WHITELIST
                      </CyberButton>
                    </Link>
                    <CyberButton
                      className="w-full h-12 text-lg"
                      glowColor="cyan"
                      variant="outline"
                      onClick={openWalletModal}
                    >
                      CONNECT_WALLET
                    </CyberButton>
                  </div>
                </CyberCard>
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
                actions with the provided tools and for compliance with all applicable laws in their jurisdictions. Not
                available to persons in restricted territories.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neon-pink/30 py-8 bg-black">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-lg font-bold tracking-tight text-neon-pink">$BLKBOX</span>
            </div>
            <div className="flex gap-6">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-sm text-zinc-400 hover:text-neon-pink transition-colors font-tech-mono"
              >
                Twitter
              </Link>
              <Link
                href="https://t.me"
                target="_blank"
                className="text-sm text-zinc-400 hover:text-neon-cyan transition-colors font-tech-mono"
              >
                Telegram
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                className="text-sm text-zinc-400 hover:text-neon-pink transition-colors font-tech-mono"
              >
                Discord
              </Link>
              <Link
                href="https://medium.com"
                target="_blank"
                className="text-sm text-zinc-400 hover:text-neon-cyan transition-colors font-tech-mono"
              >
                Medium
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      <WalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </div>
  )
}
