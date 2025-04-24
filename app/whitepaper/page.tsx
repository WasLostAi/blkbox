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
              <li>30% Community Sale</li>
              <li>20% Development Fund (3-year linear vesting)</li>
              <li>15% Liquidity Pool (locked for 2 years)</li>
              <li>15% Marketing & Partnerships</li>
              <li>10% Team (1-year cliff, 3-year vesting)</li>
              <li>10% Future Shadow Operations</li>
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
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
