"use client"

import { useState, useEffect } from "react"
import { JupiterDex, type JupiterSwapQuote } from "@/utils/jupiter-dex"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CyberButton from "@/components/cyber-button"
import CyberCard from "@/components/cyber-card"
import { ArrowDownUp, RefreshCw, AlertCircle } from "lucide-react"
import { useWallet } from "@/context/wallet-context"

// Token metadata interface
interface TokenInfo {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
}

// Common tokens on Solana
const COMMON_TOKENS: TokenInfo[] = [
  {
    address: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
  },
  {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
  },
  {
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
  },
  {
    address: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
    symbol: "USDT",
    name: "Tether USD (Wormhole)",
    decimals: 6,
  },
  {
    address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    symbol: "mSOL",
    name: "Marinade staked SOL",
    decimals: 9,
  },
  {
    address: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
    symbol: "ETH",
    name: "Ethereum (Wormhole)",
    decimals: 8,
  },
]

export default function JupiterSwap() {
  const { connected, address } = useWallet()
  const [inputToken, setInputToken] = useState<string>("So11111111111111111111111111111111111111112") // SOL
  const [outputToken, setOutputToken] = useState<string>("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") // USDC
  const [inputAmount, setInputAmount] = useState<string>("1")
  const [outputAmount, setOutputAmount] = useState<string>("0")
  const [slippage, setSlippage] = useState<number>(0.5)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [quote, setQuote] = useState<JupiterSwapQuote | null>(null)
  const [priceImpact, setPriceImpact] = useState<string>("0")
  const [isSwapping, setIsSwapping] = useState<boolean>(false)

  // Initialize Jupiter DEX
  const jupiterDex = new JupiterDex()

  // Get quote when input parameters change
  useEffect(() => {
    const getQuote = async () => {
      if (!inputToken || !outputToken || !inputAmount || Number(inputAmount) <= 0) {
        setOutputAmount("0")
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const quote = await jupiterDex.getSwapQuote({
          inputMint: inputToken,
          outputMint: outputToken,
          amount: Number(inputAmount) * 10 ** getTokenDecimals(inputToken),
          slippageBps: slippage * 100, // Convert to basis points
        })

        setQuote(quote)
        setOutputAmount((quote.outAmount / 10 ** getTokenDecimals(outputToken)).toString())
        setPriceImpact((quote.priceImpactPct * 100).toFixed(2))
      } catch (err) {
        console.error("Error getting quote:", err)
        setError("Failed to get quote. Please try again.")
        setOutputAmount("0")
      } finally {
        setIsLoading(false)
      }
    }

    getQuote()
  }, [inputToken, outputToken, inputAmount, slippage])

  // Get token decimals
  const getTokenDecimals = (tokenAddress: string): number => {
    const token = COMMON_TOKENS.find((t) => t.address === tokenAddress)
    return token?.decimals || 9 // Default to 9 decimals (SOL)
  }

  // Get token symbol
  const getTokenSymbol = (tokenAddress: string): string => {
    const token = COMMON_TOKENS.find((t) => t.address === tokenAddress)
    return token?.symbol || "Unknown"
  }

  // Swap tokens
  const handleSwapTokens = () => {
    const temp = inputToken
    setInputToken(outputToken)
    setOutputToken(temp)
    setInputAmount(outputAmount)
  }

  // Execute swap
  const executeSwap = async () => {
    if (!connected || !address || !quote) return

    setIsSwapping(true)
    setError(null)

    try {
      // In a real implementation, this would call the wallet to sign and send the transaction
      // For this demo, we'll just simulate a successful swap
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success message
      alert(
        `Swap executed successfully! Swapped ${inputAmount} ${getTokenSymbol(inputToken)} for ${outputAmount} ${getTokenSymbol(outputToken)}`,
      )
    } catch (err) {
      console.error("Error executing swap:", err)
      setError("Failed to execute swap. Please try again.")
    } finally {
      setIsSwapping(false)
    }
  }

  return (
    <CyberCard className="bg-black/60 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-neon-pink">Jupiter Swap</h3>
        <div className="text-xs text-zinc-400 font-tech-mono">Powered by Jupiter</div>
      </div>

      <div className="space-y-4">
        {/* Input token */}
        <div className="space-y-2">
          <label className="text-sm font-tech-mono text-neon-cyan">You Pay</label>
          <div className="flex gap-2">
            <Select value={inputToken} onValueChange={setInputToken}>
              <SelectTrigger className="w-[120px] bg-black border-zinc-800">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent className="bg-black border-zinc-800">
                {COMMON_TOKENS.map((token) => (
                  <SelectItem key={token.address} value={token.address}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="flex-1 bg-black border-zinc-800 focus:border-neon-pink text-white font-tech-mono"
              placeholder="0.0"
            />
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwapTokens}
            className="p-2 rounded-full bg-zinc-800 hover:bg-neon-pink/20 text-zinc-400 hover:text-neon-pink transition-all"
          >
            <ArrowDownUp size={18} />
          </button>
        </div>

        {/* Output token */}
        <div className="space-y-2">
          <label className="text-sm font-tech-mono text-neon-cyan">You Receive</label>
          <div className="flex gap-2">
            <Select value={outputToken} onValueChange={setOutputToken}>
              <SelectTrigger className="w-[120px] bg-black border-zinc-800">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent className="bg-black border-zinc-800">
                {COMMON_TOKENS.map((token) => (
                  <SelectItem key={token.address} value={token.address}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={isLoading ? "Loading..." : outputAmount}
              readOnly
              className="flex-1 bg-black border-zinc-800 text-white font-tech-mono"
              placeholder="0.0"
            />
          </div>
        </div>

        {/* Slippage */}
        <div className="space-y-2">
          <label className="text-sm font-tech-mono text-neon-cyan">Slippage Tolerance</label>
          <div className="flex gap-2">
            {[0.1, 0.5, 1.0].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`px-3 py-1 rounded-md text-sm font-tech-mono ${
                  slippage === value ? "bg-neon-pink/20 text-neon-pink" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                {value}%
              </button>
            ))}
            <Input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(Number(e.target.value))}
              className="flex-1 bg-black border-zinc-800 text-white font-tech-mono"
              placeholder="Custom"
              min="0.1"
              max="10"
              step="0.1"
            />
          </div>
        </div>

        {/* Swap details */}
        {quote && (
          <div className="space-y-2 p-3 border border-zinc-800 rounded-md">
            <div className="flex justify-between text-xs font-tech-mono">
              <span className="text-zinc-400">Rate</span>
              <span className="text-white">
                1 {getTokenSymbol(inputToken)} ≈{" "}
                {(quote.outAmount / 10 ** getTokenDecimals(outputToken) / Number(inputAmount)).toFixed(6)}{" "}
                {getTokenSymbol(outputToken)}
              </span>
            </div>
            <div className="flex justify-between text-xs font-tech-mono">
              <span className="text-zinc-400">Price Impact</span>
              <span className={`${Number(priceImpact) > 5 ? "text-red-500" : "text-white"}`}>{priceImpact}%</span>
            </div>
            <div className="flex justify-between text-xs font-tech-mono">
              <span className="text-zinc-400">Route</span>
              <span className="text-neon-cyan">Jupiter (Optimal)</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-3 border border-red-500/30 rounded-md bg-red-500/10 flex items-center gap-2">
            <AlertCircle size={16} className="text-red-500" />
            <span className="text-sm text-red-500 font-tech-mono">{error}</span>
          </div>
        )}

        {/* Swap button */}
        <CyberButton
          onClick={executeSwap}
          disabled={isLoading || isSwapping || !quote || Number(inputAmount) <= 0}
          className="w-full"
          glowColor="pink"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : isSwapping ? (
            "Swapping..."
          ) : !connected ? (
            "Connect Wallet"
          ) : (
            "Swap"
          )}
        </CyberButton>
      </div>
    </CyberCard>
  )
}
