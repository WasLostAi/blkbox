"use client"

import { useState } from "react"
import WalletModal from "./wallet-modal"
import CyberButton from "./cyber-button"
import { useWallet } from "@/context/wallet-context"

interface WalletConnectorProps {
  buttonText?: string
  buttonSize?: "default" | "sm" | "lg"
  buttonVariant?: "default" | "outline" | "secondary"
  glowColor?: "pink" | "cyan"
  className?: string
}

export default function WalletConnector({
  buttonText = "CONNECT_WALLET",
  buttonSize = "default",
  buttonVariant = "default",
  glowColor = "pink",
  className,
}: WalletConnectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { connected, address, disconnect } = useWallet()

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (connected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-zinc-400 font-tech-mono text-sm">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <CyberButton size={buttonSize} variant="outline" glowColor="pink" className={className} onClick={disconnect}>
          DISCONNECT
        </CyberButton>
      </div>
    )
  }

  return (
    <>
      <CyberButton
        size={buttonSize}
        variant={buttonVariant}
        glowColor={glowColor}
        className={className}
        onClick={openModal}
      >
        {buttonText}
      </CyberButton>
      <WalletModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
