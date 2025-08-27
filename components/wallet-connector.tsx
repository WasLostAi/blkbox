"use client"

import { useState } from "react"
import { useWallet } from "@/context/wallet-context"
import { cn } from "@/lib/utils"
import { Wallet } from "lucide-react"

interface WalletConnectorProps {
  buttonText?: string
  buttonSize?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function WalletConnector({
  buttonText = "Connect Wallet",
  buttonSize = "default",
  className,
}: WalletConnectorProps) {
  const { connected, address, balance, connect, disconnect } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      await connect()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  // Icon-only mode
  if (buttonSize === "icon") {
    return (
      <button
        onClick={connected ? handleDisconnect : handleConnect}
        disabled={isConnecting}
        className={cn(
          "flex items-center justify-center p-2 rounded-md transition-colors",
          connected ? "bg-zinc-800 text-neon-cyan hover:bg-zinc-700" : "bg-neon-pink text-black hover:bg-neon-cyan",
          isConnecting && "opacity-70 cursor-not-allowed",
          className,
        )}
        title={connected ? `Disconnect: ${formatAddress(address)}` : "Connect Wallet"}
      >
        <Wallet className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={connected ? handleDisconnect : handleConnect}
      disabled={isConnecting}
      className={cn(
        "flex items-center justify-center w-full rounded-md font-tech-mono transition-colors",
        buttonSize === "sm" ? "px-2 py-1 text-xs" : "px-4 py-2 text-sm",
        buttonSize === "lg" && "px-6 py-3 text-base",
        connected ? "bg-zinc-800 text-neon-cyan hover:bg-zinc-700" : "bg-neon-pink text-black hover:bg-neon-cyan",
        isConnecting && "opacity-70 cursor-not-allowed",
        className,
      )}
    >
      {connected ? (
        <span className="truncate">
          {formatAddress(address)} ({balance} $BLKBOX)
        </span>
      ) : (
        <span>{isConnecting ? "Connecting..." : buttonText || "CONNECT"}</span>
      )}
    </button>
  )
}
