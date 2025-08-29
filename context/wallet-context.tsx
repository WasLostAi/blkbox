"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type WalletContextType = {
  connected: boolean
  connecting: boolean
  address: string | null
  balance: number
  tier: "UNAUTHORIZED" | "ENTRY_LEVEL" | "OPERATOR" | "SHADOW_ELITE" | "PHANTOM_COUNCIL"
  connect: (walletType: string) => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [tier, setTier] = useState<"UNAUTHORIZED" | "ENTRY_LEVEL" | "OPERATOR" | "SHADOW_ELITE" | "PHANTOM_COUNCIL">(
    "UNAUTHORIZED",
  )

  // Initialize wallet state from localStorage on component mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAddress = localStorage.getItem("walletAddress")
      const storedBalance = localStorage.getItem("walletBalance")

      if (storedAddress) {
        setConnected(true)
        setAddress(storedAddress)
        setBalance(storedBalance ? Number.parseInt(storedBalance) : 0)

        // Determine tier based on balance
        const balanceNum = storedBalance ? Number.parseInt(storedBalance) : 0
        if (balanceNum >= 1000000) {
          setTier("PHANTOM_COUNCIL")
        } else if (balanceNum >= 250000) {
          setTier("SHADOW_ELITE")
        } else if (balanceNum >= 50000) {
          setTier("OPERATOR")
        } else if (balanceNum >= 10000) {
          setTier("ENTRY_LEVEL")
        } else {
          setTier("UNAUTHORIZED")
        }
      }
    }
  }, [])

  const connect = async (walletType: string) => {
    setConnecting(true)

    try {
      // Simulate wallet connection delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate random wallet address and balance
      const randomAddress = "0x" + Math.random().toString(16).slice(2, 14)

      // For demo purposes, assign a random balance that corresponds to a tier
      // In a real app, this would be fetched from the blockchain
      const tiers = [
        { min: 0, max: 9999, tier: "UNAUTHORIZED" },
        { min: 10000, max: 49999, tier: "ENTRY_LEVEL" },
        { min: 50000, max: 249999, tier: "OPERATOR" },
        { min: 250000, max: 999999, tier: "SHADOW_ELITE" },
        { min: 1000000, max: 2000000, tier: "PHANTOM_COUNCIL" },
      ]

      // Randomly select a tier for demo purposes
      const selectedTierIndex = Math.floor(Math.random() * tiers.length)
      const selectedTier = tiers[selectedTierIndex]
      const randomBalance = Math.floor(Math.random() * (selectedTier.max - selectedTier.min) + selectedTier.min)

      // Update state
      setAddress(randomAddress)
      setBalance(randomBalance)
      setTier(selectedTier.tier as any)
      setConnected(true)

      // Store in localStorage
      localStorage.setItem("walletAddress", randomAddress)
      localStorage.setItem("walletBalance", randomBalance.toString())

      return Promise.resolve()
    } catch (error) {
      console.error("Error connecting wallet:", error)
      return Promise.reject(error)
    } finally {
      setConnecting(false)
    }
  }

  const disconnect = () => {
    setConnected(false)
    setAddress(null)
    setBalance(0)
    setTier("UNAUTHORIZED")

    // Clear localStorage
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("walletBalance")
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        address,
        balance,
        tier,
        connect,
        disconnect,
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
