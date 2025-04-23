"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { AlertTriangle, X } from "lucide-react"
import { useWallet } from "@/context/wallet-context"
import CyberButton from "./cyber-button"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, disconnect, connected } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Reset selected wallet when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedWallet(null)
      setError(null)
    }
  }, [isOpen])

  // Handle wallet selection
  const handleConnect = async (walletName: string) => {
    setSelectedWallet(walletName)
    setConnecting(true)
    setError(null)

    try {
      // In a real implementation, this would connect to the actual wallet
      await connect(walletName)
      onClose()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      setError("Failed to connect wallet. Please try again.")
    } finally {
      setConnecting(false)
      setSelectedWallet(null)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    onClose()
  }

  if (!isOpen) return null

  const walletOptions = [
    { name: "Phantom", icon: "/img/wallets/phantom.png" },
    { name: "Solflare", icon: "/img/wallets/solflare.png" },
    { name: "Ledger", icon: "/img/wallets/ledger.png" },
    { name: "Torus", icon: "/img/wallets/torus.png" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-black border border-neon-pink/30 rounded-lg shadow-lg shadow-neon-pink/20 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-neon-pink mb-2 font-tech-mono">CONNECT WALLET</h2>
          <p className="text-zinc-400 font-tech-mono">Select a wallet to connect to $BLKBOX</p>
        </div>

        {connected ? (
          <div className="space-y-4">
            <div className="p-4 border border-zinc-800 rounded-lg">
              <p className="text-center text-zinc-400 font-tech-mono mb-4">Your wallet is connected to $BLKBOX</p>
              <CyberButton onClick={handleDisconnect} glowColor="pink" className="w-full">
                DISCONNECT
              </CyberButton>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleConnect(wallet.name.toLowerCase())}
                disabled={connecting}
                className="flex items-center justify-between w-full p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
              >
                <span className="font-tech-mono text-white">{wallet.name}</span>
                <Image src={wallet.icon || "/placeholder.svg"} alt={wallet.name} width={24} height={24} />
              </button>
            ))}

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm font-tech-mono">
                {error}
              </div>
            )}

            {connecting && (
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 text-sm font-tech-mono text-center">
                Connecting...
              </div>
            )}
          </div>
        )}

        {/* Warning */}
        <div className="flex items-start p-3 space-x-3 border border-yellow-900/50 rounded-md bg-yellow-900/20 mt-6">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-500">Security Notice</h4>
            <p className="text-xs text-yellow-500/80">
              Only connect your wallet on secure networks. The Shadow Protocol requires wallet access to verify token
              holdings.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
          <p className="text-xs text-zinc-500 font-tech-mono">
            By connecting your wallet, you agree to the $BLKBOX Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
