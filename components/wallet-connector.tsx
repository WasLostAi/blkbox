"use client"

import { useWallet } from "@/context/wallet-context"
import CyberButton from "./cyber-button"
import { Wallet, Loader2 } from "lucide-react"

interface WalletConnectorProps {
  buttonSize?: "default" | "sm" | "lg"
  glowColor?: "pink" | "cyan"
}

export default function WalletConnector({ buttonSize = "default", glowColor = "pink" }: WalletConnectorProps) {
  const { connected, connecting, connect, disconnect, address } = useWallet()

  const handleClick = () => {
    if (connected) {
      disconnect()
    } else {
      connect()
    }
  }

  return (
    <CyberButton onClick={handleClick} size={buttonSize} glowColor={glowColor} disabled={connecting} className="gap-2">
      {connecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          CONNECTING...
        </>
      ) : connected ? (
        <>
          <Wallet className="h-4 w-4" />
          {address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "CONNECTED"}
        </>
      ) : (
        <>
          <Wallet className="h-4 w-4" />
          CONNECT WALLET
        </>
      )}
    </CyberButton>
  )
}
