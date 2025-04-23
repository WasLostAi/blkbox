"use client"

import { useState } from "react"
import { useWallet } from "@/context/wallet-context"
import CyberButton from "./cyber-button"

interface WalletConnectorProps {
  buttonSize?: "default" | "sm" | "lg" | "icon"
  buttonText?: string
  glowColor?: "pink" | "cyan"
}

export default function WalletConnector({
  buttonSize = "default",
  buttonText = "CONNECT_WALLET",
  glowColor = "pink",
}: WalletConnectorProps) {
  const { connected, address, connect, disconnect } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    if (connected) {
      disconnect()
      return
    }

    setIsConnecting(true)
    try {
      await connect("phantom")
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <CyberButton
      onClick={handleConnect}
      size={buttonSize}
      glowColor={glowColor}
      disabled={isConnecting}
      className="font-tech-mono"
    >
      {isConnecting ? "CONNECTING..." : connected ? `${address?.slice(0, 4)}...${address?.slice(-4)}` : buttonText}
    </CyberButton>
  )
}
