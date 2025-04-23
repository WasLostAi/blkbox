"use client"

import type React from "react"

import { useState } from "react"
import { X, AlertCircle, Wallet, Loader2, UserX } from "lucide-react"
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
  const { connecting, connect, connectionError, clearConnectionError, blockAllConnections, whitelistOnly } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [lockdownMode, setLockdownMode] = useState(false)
  const [lockdownCode, setLockdownCode] = useState("")
  const [lockdownError, setLockdownError] = useState<string | null>(null)

  // Check if connections are blocked
  if (blockAllConnections && !lockdownMode) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose()
        }}
      >
        <DialogContent className="bg-black border border-red-500/50 p-0 max-w-md w-full">
          <DialogHeader className="p-6 border-b border-neon-pink/30">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-red-500">Connections Blocked</DialogTitle>
              <button onClick={onClose} className="text-zinc-400 hover:text-neon-pink">
                <X size={20} />
              </button>
            </div>
          </DialogHeader>
          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-full bg-red-900/20">
                <UserX className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <p className="text-zinc-300 font-tech-mono text-sm text-center mb-6">
              New wallet connections are currently disabled by the system administrator. Please try again later or
              contact support if you believe this is an error.
            </p>
            <div className="flex justify-center">
              <CyberButton onClick={onClose} glowColor="pink">
                CLOSE
              </CyberButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const handleConnect = async (walletType: string) => {
    if (clearConnectionError) {
      clearConnectionError()
    }
    setSelectedWallet(walletType)

    try {
      // In a real implementation, you would check if the address is whitelisted
      // before allowing the connection when whitelistOnly is true
      await connect(walletType)
      onClose()
      setSelectedWallet(null)
    } catch (err) {
      // Error is handled in the wallet context
      setSelectedWallet(null)
    }
  }

  const handleLockdownSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLockdownError(null)

    // This would be a secure hash check in production
    if (lockdownCode === "shadow-protocol-override") {
      // In a real implementation, this would verify with a secure backend
      handleConnect("phantom") // Connect with phantom wallet in lockdown mode
    } else {
      setLockdownError("Invalid lockdown code")
    }
  }

  const toggleLockdownMode = () => {
    setLockdownMode(!lockdownMode)
    setLockdownError(null)
    setLockdownCode("")
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          if (clearConnectionError) {
            clearConnectionError()
          }
          setSelectedWallet(null)
          setLockdownMode(false)
          setLockdownError(null)
          onClose()
        }
      }}
    >
      <DialogContent className="bg-black border border-neon-pink/50 p-0 max-w-md w-full">
        <DialogHeader className="p-6 border-b border-neon-pink/30">
          <div className="flex items-center justify-between">
            <DialogTitle>
              <GlitchText
                text={lockdownMode ? "LOCKDOWN MODE" : "CONNECT WALLET"}
                className="text-xl font-bold text-neon-cyan"
              />
            </DialogTitle>
            <button onClick={onClose} className="text-zinc-400 hover:text-neon-pink">
              <X size={20} />
            </button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <DataPulse className="mb-6" />

          {lockdownMode ? (
            <>
              <p className="text-zinc-300 font-tech-mono text-sm mb-6">
                LOCKDOWN MODE requires administrative authorization. Enter your security code to continue.
              </p>

              {lockdownError && (
                <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-500 text-sm font-tech-mono">{lockdownError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLockdownSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    value={lockdownCode}
                    onChange={(e) => setLockdownCode(e.target.value)}
                    className="w-full bg-black/50 border border-neon-pink/30 rounded-md px-4 py-2 text-white font-tech-mono focus:outline-none focus:border-neon-pink"
                    placeholder="Enter lockdown code"
                    autoFocus
                  />
                </div>

                <div className="flex gap-2">
                  <CyberButton type="submit" className="w-full justify-center" disabled={connecting} glowColor="pink">
                    {connecting ? (
                      <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <TerminalText text="AUTHORIZING..." className="animate-pulse" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span>AUTHORIZE</span>
                      </div>
                    )}
                  </CyberButton>

                  <CyberButton type="button" onClick={toggleLockdownMode} variant="outline" glowColor="cyan">
                    CANCEL
                  </CyberButton>
                </div>
              </form>
            </>
          ) : (
            <>
              <p className="text-zinc-300 font-tech-mono text-sm mb-6">
                Connect your wallet to access the $BLKBOX Shadow Protocol. Your gateway to exclusive tools and weekly
                USDC dividends.
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

              <div className="mt-6 flex justify-between items-center">
                <p className="text-zinc-500 text-xs font-tech-mono">By connecting, you agree to the Terms of Service</p>
                <button
                  onClick={toggleLockdownMode}
                  className="text-zinc-500 text-xs hover:text-neon-pink font-tech-mono"
                >
                  [LOCKDOWN]
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
