export const dynamic = "error"
export const dynamicParams = true
export const revalidate = 0

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LiquidityMiragePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-neon-pink/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_DASHBOARD</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4">
              LIQUIDITY MIRAGE CREATOR
            </h1>
            <p className="text-neon-cyan font-tech-mono">CREATE SYNTHETIC LIQUIDITY AND GHOST ORDERS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/50 border border-neon-pink/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-neon-pink mb-4">Synthetic Liquidity</h2>
              <p className="text-zinc-400 mb-4">
                Create synthetic liquidity pools to manipulate market depth and influence trading behavior.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">POOL ADDRESS</label>
                  <input
                    type="text"
                    disabled
                    placeholder="Enter pool address"
                    className="w-full bg-black/50 border border-neon-pink/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-pink"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">AMOUNT</label>
                  <input
                    type="number"
                    disabled
                    placeholder="10000"
                    className="w-full bg-black/50 border border-neon-pink/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-pink"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    disabled
                    className="relative bg-black border border-neon-pink text-neon-pink px-4 py-2 rounded font-tech-mono opacity-50 cursor-not-allowed"
                  >
                    CREATE SYNTHETIC LIQUIDITY
                  </button>
                  <button
                    disabled
                    className="relative bg-black border border-neon-cyan text-neon-cyan px-4 py-2 rounded font-tech-mono opacity-50 cursor-not-allowed"
                  >
                    AMPLIFY SLIPPAGE
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black/50 border border-neon-cyan/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-neon-cyan mb-4">Ghost Orders</h2>
              <p className="text-zinc-400 mb-4">
                Create phantom orders that appear in the order book but disappear when traders attempt to interact with
                them.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">DEX ADDRESS</label>
                  <input
                    type="text"
                    disabled
                    placeholder="Enter DEX address"
                    className="w-full bg-black/50 border border-neon-cyan/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">PRICE</label>
                    <input
                      type="number"
                      disabled
                      placeholder="1.0"
                      className="w-full bg-black/50 border border-neon-cyan/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">SIZE</label>
                    <input
                      type="number"
                      disabled
                      placeholder="5000"
                      className="w-full bg-black/50 border border-neon-cyan/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1 font-tech-mono">SLIPPAGE FACTOR</label>
                  <input
                    type="number"
                    disabled
                    placeholder="2"
                    className="w-full bg-black/50 border border-neon-cyan/30 rounded px-4 py-2 text-white font-tech-mono focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  />
                </div>
                <button
                  disabled
                  className="relative bg-black border border-neon-cyan text-neon-cyan px-4 py-2 rounded font-tech-mono opacity-50 cursor-not-allowed"
                >
                  CREATE GHOST ORDERS
                </button>
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-neon-pink/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-neon-pink mb-4">Operation Logs</h2>
            <div className="bg-black/70 border border-neon-cyan/30 rounded-md p-4 font-mono text-sm h-64 overflow-auto">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-zinc-400 ml-2">terminal@$BLKBOX:~</span>
              </div>
              <div className="text-neon-cyan">
                <div className="py-0.5">[INFO] Connect your wallet to access the Liquidity Mirage Creator</div>
                <div className="py-0.5">[INFO] This tool requires OPERATOR tier access</div>
                <div className="py-0.5">[SYSTEM] Waiting for wallet connection...</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-zinc-400">
              <span className="text-neon-pink">WARNING:</span> This tool is for educational purposes only. Use at your
              own risk.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
