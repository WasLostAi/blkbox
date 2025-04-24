"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Tier = "UNAUTHORIZED" | "ENTRY_LEVEL" | "OPERATOR" | "SHADOW_ELITE" | "PHANTOM_COUNCIL"

interface WalletContextType {
  connected: boolean
  connecting: boolean
  address: string | null
  balance: number
  tier: Tier
  isAdmin: boolean
  accessMode: "public" | "private" | "admin"
  connect: () => Promise<void>
  disconnect: () => void
  setAccessMode: (mode: "public" | "private" | "admin") => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [tier, setTier] = useState<Tier>("UNAUTHORIZED")
  const [isAdmin, setIsAdmin] = useState(false)
  const [accessMode, setAccessMode] = useState<"public" | "private" | "admin">("public")

  // Simulate wallet connection
  const connect = async () => {
    setConnecting(true)
    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a random Solana-like address
      const randomAddress = "AuwUfiwsXA6VibDjR579HWLhDUUoa5s6T7i7KPyLUa9F"

      // Set random balance between 10,000 and 1,500,000
      const randomBalance = Math.floor(Math.random() * 1490000) + 10000

      // Determine tier based on balance
      let userTier: Tier = "UNAUTHORIZED"
      if (randomBalance >= 1000000) userTier = "PHANTOM_COUNCIL"
      else if (randomBalance >= 250000) userTier = "SHADOW_ELITE"
      else if (randomBalance >= 50000) userTier = "OPERATOR"
      else if (randomBalance >= 10000) userTier = "ENTRY_LEVEL"

      // Set admin status (for demo purposes, the hardcoded address is admin)
      const userIsAdmin = randomAddress === "AuwUfiwsXA6VibDjR579HWLhDUUoa5s6T7i7KPyLUa9F"

      setConnected(true)
      setAddress(randomAddress)
      setBalance(randomBalance)
      setTier(userTier)
      setIsAdmin(userIsAdmin)
    } finally {
      setConnecting(false)
    }
  }

  const disconnect = () => {
    setConnected(false)
    setAddress(null)
    setBalance(0)
    setTier("UNAUTHORIZED")
    setIsAdmin(false)
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        address,
        balance,
        tier,
        isAdmin,
        accessMode,
        connect,
        disconnect,
        setAccessMode,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
