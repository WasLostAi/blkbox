"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define tier thresholds
export const TIER_THRESHOLDS = {
  UNAUTHORIZED: 0,
  ENTRY_LEVEL: 10000,
  OPERATOR: 50000,
  SHADOW_ELITE: 250000,
  PHANTOM_COUNCIL: 1000000,
}

export type WalletTier = keyof typeof TIER_THRESHOLDS

// Admin whitelist - only these addresses have admin access
export const ADMIN_WHITELIST = [
  "AuwUfiwsXA6VibDjR579HWLhDUUoa5s6T7i7KPyLUa9F", // Owner's address
]

// Define access modes
export type AccessMode = "NORMAL" | "LOCKDOWN"

type WalletContextType = {
  connected: boolean
  connecting: boolean
  connectionError: string | null
  address: string | null
  balance: number
  tier: WalletTier
  isAdmin: boolean
  accessMode: AccessMode
  connect: (walletType: string) => Promise<void>
  disconnect: () => void
  updateBalance: (newBalance: number) => void
  refreshBalance: () => Promise<void>
  clearConnectionError: () => void
  setAccessMode: (mode: AccessMode) => void
  addToWhitelist: (address: string) => void
  removeFromWhitelist: (address: string) => void
  getWhitelistedAddresses: () => string[]
  // New admin features
  killSwitchActive: boolean
  setKillSwitchActive: (active: boolean) => void
  blockAllConnections: boolean
  setBlockAllConnections: (block: boolean) => void
  whitelistOnly: boolean
  setWhitelistOnly: (whitelistOnly: boolean) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [tier, setTier] = useState<WalletTier>("UNAUTHORIZED")
  const [isAdmin, setIsAdmin] = useState(false)
  const [accessMode, setAccessMode] = useState<AccessMode>("NORMAL")
  const [whitelist, setWhitelist] = useState<string[]>([...ADMIN_WHITELIST])
  // Add these new state variables to the WalletProvider
  const [killSwitchActive, setKillSwitchActive] = useState(false)
  const [blockAllConnections, setBlockAllConnections] = useState(false)
  const [whitelistOnly, setWhitelistOnly] = useState(false)

  // Calculate tier based on balance
  const calculateTier = (balance: number): WalletTier => {
    if (balance >= TIER_THRESHOLDS.PHANTOM_COUNCIL) return "PHANTOM_COUNCIL"
    if (balance >= TIER_THRESHOLDS.SHADOW_ELITE) return "SHADOW_ELITE"
    if (balance >= TIER_THRESHOLDS.OPERATOR) return "OPERATOR"
    if (balance >= TIER_THRESHOLDS.ENTRY_LEVEL) return "ENTRY_LEVEL"
    return "UNAUTHORIZED"
  }

  // Check if address is admin
  const checkIsAdmin = (walletAddress: string | null) => {
    if (!walletAddress) return false
    return ADMIN_WHITELIST.includes(walletAddress)
  }

  // Initialize wallet state from localStorage on component mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAddress = localStorage.getItem("walletAddress")
      const storedBalance = localStorage.getItem("walletBalance")
      const storedAccessMode = localStorage.getItem("accessMode") as AccessMode | null

      if (storedAddress) {
        setConnected(true)
        setAddress(storedAddress)
        setIsAdmin(checkIsAdmin(storedAddress))
        const balanceNum = storedBalance ? Number.parseInt(storedBalance) : 0
        setBalance(balanceNum)
        setTier(calculateTier(balanceNum))
      }

      if (storedAccessMode) {
        setAccessMode(storedAccessMode)
      }

      // Load whitelist from localStorage if available
      const storedWhitelist = localStorage.getItem("whitelist")
      if (storedWhitelist) {
        try {
          const parsedWhitelist = JSON.parse(storedWhitelist)
          // Ensure admin addresses are always included
          const mergedWhitelist = [...new Set([...ADMIN_WHITELIST, ...parsedWhitelist])]
          setWhitelist(mergedWhitelist)
        } catch (e) {
          console.error("Failed to parse whitelist from localStorage", e)
        }
      }
    }
  }, [])

  const clearConnectionError = () => {
    setConnectionError(null)
  }

  const connect = async (walletType: string) => {
    setConnecting(true)
    clearConnectionError()

    try {
      // In a real implementation, this would connect to an actual wallet
      // For now, we'll simulate it with a delay and always use the admin address
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Always use the admin address for testing
      const connectedAddress = "AuwUfiwsXA6VibDjR579HWLhDUUoa5s6T7i7KPyLUa9F"

      // Check if the address is admin
      const adminStatus = checkIsAdmin(connectedAddress)

      // For admin, always give highest tier
      const randomBalance = 1500000 // Phantom Council tier for admin

      // Update state
      setAddress(connectedAddress)
      setBalance(randomBalance)
      setTier(calculateTier(randomBalance))
      setIsAdmin(true) // Force admin status to true
      setConnected(true)

      // Store in localStorage
      localStorage.setItem("walletAddress", connectedAddress)
      localStorage.setItem("walletBalance", randomBalance.toString())

      return Promise.resolve()
    } catch (error) {
      console.error("Error connecting wallet:", error)
      setConnectionError(error instanceof Error ? error.message : "Unknown error connecting wallet")
      return Promise.reject(error)
    } finally {
      setConnecting(false)
    }
  }

  const refreshBalance = async () => {
    // In a real app, this would fetch the latest balance from the blockchain
    // For demo purposes, we'll just return the current balance
    return Promise.resolve()
  }

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance)
    setTier(calculateTier(newBalance))

    // Update localStorage
    localStorage.setItem("walletBalance", newBalance.toString())
  }

  const disconnect = () => {
    setConnected(false)
    setAddress(null)
    setBalance(0)
    setTier("UNAUTHORIZED")
    setIsAdmin(false)
    clearConnectionError()

    // Clear localStorage
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("walletBalance")
  }

  const updateAccessMode = (mode: AccessMode) => {
    setAccessMode(mode)
    localStorage.setItem("accessMode", mode)
  }

  const addToWhitelist = (newAddress: string) => {
    if (!isAdmin) return // Only admins can modify whitelist

    setWhitelist((prev) => {
      const updated = [...new Set([...prev, newAddress])]
      localStorage.setItem("whitelist", JSON.stringify(updated))
      return updated
    })
  }

  const removeFromWhitelist = (addressToRemove: string) => {
    if (!isAdmin) return // Only admins can modify whitelist
    if (ADMIN_WHITELIST.includes(addressToRemove)) return // Can't remove permanent admins

    setWhitelist((prev) => {
      const updated = prev.filter((addr) => addr !== addressToRemove)
      localStorage.setItem("whitelist", JSON.stringify(updated))
      return updated
    })
  }

  const getWhitelistedAddresses = () => {
    return [...whitelist]
  }

  const updateKillSwitchActive = (active: boolean) => {
    if (!isAdmin) return
    setKillSwitchActive(active)
  }

  const updateBlockAllConnections = (block: boolean) => {
    if (!isAdmin) return
    setBlockAllConnections(block)
  }

  const updateWhitelistOnly = (whitelistOnly: boolean) => {
    if (!isAdmin) return
    setWhitelistOnly(whitelistOnly)
  }

  // Add the new admin features to the context value
  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        connectionError,
        address,
        balance,
        tier,
        isAdmin,
        accessMode,
        connect,
        disconnect,
        updateBalance,
        refreshBalance,
        clearConnectionError,
        setAccessMode: updateAccessMode,
        addToWhitelist,
        removeFromWhitelist,
        getWhitelistedAddresses,
        // New admin features
        killSwitchActive,
        setKillSwitchActive: updateKillSwitchActive,
        blockAllConnections,
        setBlockAllConnections: updateBlockAllConnections,
        whitelistOnly,
        setWhitelistOnly: updateWhitelistOnly,
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
