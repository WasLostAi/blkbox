"use client"

import { useState } from "react"
import { X, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CyberButton from "./cyber-button"
import GlitchText from "./glitch-text"
import DataPulse from "./data-pulse"
import TerminalText from "./terminal-text"
import { useWallet } from "@/context/wallet-context"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connecting, connect } = useWallet()
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async (walletType: string) => {
    setError(null)

    try {
      await connect(walletType)
      onClose()
    } catch (err) {
      setError("Connection failed. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-md p-3 mb-6 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" />
              <p className="text-red-500 text-sm font-tech-mono">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <CyberButton
              onClick={() => handleConnect("phantom")}
              className="w-full justify-center"
              disabled={connecting}
              glowColor="pink"
            >
              {connecting ? <TerminalText text="CONNECTING..." className="animate-pulse" /> : "PHANTOM"}
            </CyberButton>

            <CyberButton
              onClick={() => handleConnect("solflare")}
              className="w-full justify-center"
              disabled={connecting}
              variant="outline"
              glowColor="cyan"
            >
              {connecting ? <TerminalText text="CONNECTING..." className="animate-pulse" /> : "SOLFLARE"}
            </CyberButton>

            <CyberButton
              onClick={() => handleConnect("backpack")}
              className="w-full justify-center"
              disabled={connecting}
              variant="outline"
              glowColor="pink"
            >
              {connecting ? <TerminalText text="CONNECTING..." className="animate-pulse" /> : "BACKPACK"}
            </CyberButton>
          </div>

          <p className="text-zinc-500 text-xs font-tech-mono mt-6 text-center">
            By connecting your wallet, you agree to the Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
