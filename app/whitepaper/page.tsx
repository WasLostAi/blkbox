import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import TerminalCode from "@/components/terminal-code"

export default function WhitepaperPage() {
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
              text="$BLKBOX WHITEPAPER"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono text-xl">THE SHADOW PROTOCOL</p>
            <DataPulse className="my-6" />
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-neon-cyan font-tech-mono">1. INTRODUCTION</h2>
            <p>
              $BLKBOX represents a paradigm shift in the Solana ecosystem. It's not merely a token; it's a complete
              system designed to level the playing field between retail traders and institutional players who have long
              dominated the market with proprietary tools and privileged access.
            </p>

            <h2 className="text-neon-cyan font-tech-mono">2. MARKET PROBLEM</h2>
            <p>
              The cryptocurrency market suffers from significant information asymmetry. While retail investors are
              limited to public interfaces and basic tools, institutional players leverage sophisticated algorithms,
              high-frequency trading systems, and privileged network access to extract value from the market at the
              expense of average participants.
            </p>
            <p>
              This asymmetry is particularly acute in the Solana ecosystem, where the high throughput and low
              transaction costs create opportunities for MEV extraction, front-running, and other advanced trading
              strategies that are typically inaccessible to retail traders.
            </p>

            <h2 className="text-neon-cyan font-tech-mono">3. THE $BLKBOX SOLUTION</h2>
            <p>
              $BLKBOX democratizes access to institutional-grade trading tools and strategies through a token-gated
              access model. By holding $BLKBOX tokens, users gain access to a suite of tools that were previously
              available only to insiders and large trading firms.
            </p>

            <h3>3.1 Core Components</h3>
            <ul>
              <li>
                <strong className="text-neon-pink">Stealth MEV Extraction:</strong> Algorithms that identify and capture
                Maximal Extractable Value before others can see the opportunity.
              </li>
              <li>
                <strong className="text-neon-pink">Shadow Swap System:</strong> Transaction routing through obfuscation
                layers to hide trading intent and minimize slippage.
              </li>
              <li>
                <strong className="text-neon-pink">Predictive Liquidation Engine:</strong> AI-powered system to identify
                vulnerable positions before they collapse.
              </li>
              <li>
                <strong className="text-neon-pink">Whale Intelligence Network:</strong> Real-time tracking of
                significant market movers and their transaction patterns.
              </li>
              <li>
                <strong className="text-neon-pink">AI Strategy Lab:</strong> Custom trading algorithm generation based
                on individual risk profiles.
              </li>
            </ul>

            <h2 className="text-neon-cyan font-tech-mono">4. TOKENOMICS</h2>
            <h3>4.1 Token Distribution</h3>
            <ul>
              <li>50% Public Fair Launch via Meteora</li>
              <li>12% Platform Development Treasury</li>
              <li>10% Initial Liquidity Pool (locked for 2 years)</li>
              <li>8% DAO Treasury (governance-controlled)</li>
              <li>5% Bug Bounty & Security Program</li>
              <li>5% Founder Allocation</li>
              <li>5% Dark Pool Treasury (locked until $1M MCap)</li>
              <li>5% Alpha Pool Operations (locked until $1M MCap)</li>
            </ul>

            <h3>4.2 Tax Structure</h3>
            <ul>
              <li>3% Buy Tax (2% USDC Dividends, 1% Treasury)</li>
              <li>5% Sell Tax (3% USDC Dividends, 2% Auto-LP)</li>
              <li>0% Transfer Tax Between Holders</li>
            </ul>

            <h2 className="text-neon-cyan font-tech-mono">5. ACCESS TIERS</h2>
            <p>$BLKBOX implements a tiered access system based on token holdings:</p>

            <TerminalCode
              code={`// Access tier calculation
function calculateTier(holdings) {
  if (holdings >= 1000000) return "PHANTOM_COUNCIL";
  if (holdings >= 250000) return "SHADOW_ELITE";
  if (holdings >= 50000) return "OPERATOR";
  if (holdings >= 10000) return "ENTRY_LEVEL";
  return "UNAUTHORIZED";
}`}
              className="my-6"
            />

            <ul>
              <li>
                <strong className="text-neon-pink">Entry Level (10,000 $BLKBOX):</strong> Basic toolkit access, manual
                execution, weekly USDC dividends
              </li>
              <li>
                <strong className="text-neon-pink">Operator (50,000 $BLKBOX):</strong> Advanced features, semi-automated
                strategies, higher dividend rate
              </li>
              <li>
                <strong className="text-neon-pink">Shadow Elite (250,000 $BLKBOX):</strong> Full arsenal access,
                priority execution, custom AI agents
              </li>
              <li>
                <strong className="text-neon-pink">Phantom Council (1,000,000+ $BLKBOX):</strong> Governance rights,
                alpha group access, direct developer line
              </li>
            </ul>

            <h2 className="text-neon-cyan font-tech-mono">6. DIVIDEND MECHANISM</h2>
            <p>$BLKBOX implements an automated USDC dividend distribution system:</p>
            <ul>
              <li>2% of all swap volume captured for dividend pool</li>
              <li>5% of all profitable MEV extraction distributed to holders</li>
              <li>10% of subscription revenue converted to USDC dividends</li>
            </ul>
            <p>Dividends are distributed weekly directly to holder wallets with no staking or claiming required.</p>

            <h2 className="text-neon-cyan font-tech-mono">7. ROADMAP</h2>
            <h3>Phase 1: Genesis</h3>
            <ul>
              <li>Token launch</li>
              <li>Initial tool suite deployment</li>
              <li>First dividend distribution</li>
            </ul>

            <h3>Phase 2: Expansion</h3>
            <ul>
              <li>AI Strategy Lab release</li>
              <li>Advanced MEV extraction algorithms</li>
              <li>Whale Intelligence Network expansion</li>
            </ul>

            <h3>Phase 3: Evolution</h3>
            <ul>
              <li>Cross-chain expansion</li>
              <li>Institutional partnerships</li>
              <li>Governance system activation</li>
            </ul>

            <h2 className="text-neon-cyan font-tech-mono">8. CONCLUSION</h2>
            <p>
              $BLKBOX represents a new paradigm in DeFi - one where sophisticated trading tools are not the exclusive
              domain of insiders and institutions. By democratizing access to these tools and creating a sustainable
              economic model through dividends, $BLKBOX aims to level the playing field and create a more equitable
              trading environment for all participants.
            </p>
            <p>
              This is not just another token. This is warfare against a system designed to keep you on the outside. The
              time has come to step into the shadows.
            </p>
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
