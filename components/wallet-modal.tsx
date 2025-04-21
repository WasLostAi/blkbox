"use client"

import { useState } from "react"
import { X, AlertCircle, Wallet, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CyberButton from "./cyber-button"
import GlitchText from "./glitch-text"
import DataPulse from "./data-pulse"
import TerminalText from "./terminal-text"
import { useWallet } from "@/context/wallet-context"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

const WALLET_TYPES = [
  { id: "phantom", name: "PHANTOM", icon: "👻" },
  { id: "solflare", name: "SOLFLARE", icon: "🔆" },
  { id: "backpack", name: "BACKPACK", icon: "🎒" },
]

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connecting, connect, connectionError, clearConnectionError } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const handleConnect = async (walletType: string) => {
    clearConnectionError()
    setSelectedWallet(walletType)

    try {
      await connect(walletType)
      onClose()
      setSelectedWallet(null)
    } catch (err) {
      // Error is handled in the wallet context
      setSelectedWallet(null)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          clearConnectionError()
          setSelectedWallet(null)
          onClose()
        }
      }}
    >
      <DialogContent className="bg-black border border-neon-pink/50 p-0 max-w-md w-full">
        <DialogHeader className="p-6 border-b border-neon-pink/30">
          <div className="flex items-center justify-between">
            <DialogTitle>
              <GlitchText text="CONNECT WALLET" className="text-xl font-bold text-neon-cyan" />
            </DialogTitle>
            <button onClick={onClose} className="text-zinc-400 hover:text-neon-pink">
              <X size={20} />
            </button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <DataPulse className="mb-6" />

          <p className="text-zinc-300 font-tech-mono text-sm mb-6">
            Connect your wallet to access the $BLKBOX Shadow Protocol. Your gateway to exclusive tools and weekly USDC
            dividends.
          </p>

          {connectionError && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-500 text-sm font-tech-mono">{connectionError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            {WALLET_TYPES.map((wallet) => (
              <CyberButton
                key={wallet.id}
                onClick={() => handleConnect(wallet.id)}
                className="w-full justify-center"
                disabled={connecting}
                variant={wallet.id === "phantom" ? "default" : "outline"}
                glowColor={wallet.id === "phantom" ? "pink" : "cyan"}
              >
                {connecting && selectedWallet === wallet.id ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <TerminalText text="CONNECTING..." className="animate-pulse" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="mr-2">{wallet.icon}</span>
                    {wallet.name}
                  </div>
                )}
              </CyberButton>
            ))}
          </div>

          <div className="mt-6 p-4 border border-zinc-800 rounded-md bg-black/30">
            <div className="flex items-start gap-3">
              <Wallet className="h-5 w-5 text-neon-cyan mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-neon-cyan mb-1">New to Solana?</h4>
                <p className="text-xs text-zinc-400 font-tech-mono">
                  You'll need a Solana wallet to connect. We recommend Phantom for the best experience.
                </p>
              </div>
            </div>
          </div>

          <p className="text-zinc-500 text-xs font-tech-mono mt-6 text-center">
            By connecting your wallet, you agree to the Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
