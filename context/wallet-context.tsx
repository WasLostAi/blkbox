"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  type PermissionAction,
  type UserRole,
  DEFAULT_ROLE_PERMISSIONS,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  isRoleAtLeast,
  getPermissionsForRole,
} from "@/utils/permissions"

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

// Define user type
export interface User {
  address: string
  balance: number
  tier: WalletTier
  roles: UserRole[]
  customPermissions: PermissionAction[]
  lastActive: Date
  joinedAt: Date
}

type WalletContextType = {
  connected: boolean
  connecting: boolean
  connectionError: string | null
  address: string | null
  balance: number
  tier: WalletTier
  isAdmin: boolean
  accessMode: AccessMode
  roles: UserRole[]
  permissions: PermissionAction[]
  connect: (walletType: string) => Promise<void>
  disconnect: () => void
  updateBalance: (newBalance: number) => void
  refreshBalance: () => Promise<void>
  clearConnectionError: () => void
  setAccessMode: (mode: AccessMode) => void
  addToWhitelist: (address: string) => void
  removeFromWhitelist: (address: string) => void
  getWhitelistedAddresses: () => string[]
  // Permission methods
  hasPermission: (permission: PermissionAction) => boolean
  hasAnyPermission: (permissions: PermissionAction[]) => boolean
  hasAllPermissions: (permissions: PermissionAction[]) => boolean
  isRoleAtLeast: (role: UserRole) => boolean
  // Role management
  addRole: (address: string, role: UserRole) => void
  removeRole: (address: string, role: UserRole) => void
  // Permission management
  addPermission: (address: string, permission: PermissionAction) => void
  removePermission: (address: string, permission: PermissionAction) => void
  // User management
  getUsers: () => User[]
  getUserByAddress: (address: string) => User | null
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
  const [roles, setRoles] = useState<UserRole[]>([])
  const [permissions, setPermissions] = useState<PermissionAction[]>([])
  const [users, setUsers] = useState<User[]>([])

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

  // Map tier to role
  const tierToRole = (tier: WalletTier): UserRole => {
    switch (tier) {
      case "PHANTOM_COUNCIL":
        return "phantom_council"
      case "SHADOW_ELITE":
        return "shadow_elite"
      case "OPERATOR":
        return "operator"
      case "ENTRY_LEVEL":
        return "entry_level"
      default:
        return "user"
    }
  }

  // Check if address is admin
  const checkIsAdmin = (walletAddress: string | null) => {
    if (!walletAddress) return false
    return ADMIN_WHITELIST.includes(walletAddress)
  }

  // Update roles and permissions based on tier and admin status
  const updateRolesAndPermissions = (walletAddress: string | null, walletTier: WalletTier, adminStatus: boolean) => {
    if (!walletAddress) {
      setRoles([])
      setPermissions([])
      return
    }

    // Get user from users list or create a new one
    const user = users.find((u) => u.address === walletAddress) || {
      address: walletAddress,
      balance: balance,
      tier: walletTier,
      roles: [],
      customPermissions: [],
      lastActive: new Date(),
      joinedAt: new Date(),
    }

    // Determine roles based on tier and admin status
    const tierRole = tierToRole(walletTier)
    const newRoles: UserRole[] = [tierRole]

    if (adminStatus) {
      newRoles.push("admin")
      // Check if super admin
      if (walletAddress === ADMIN_WHITELIST[0]) {
        newRoles.push("super_admin")
      }
    }

    // Get permissions from roles and custom permissions
    let allPermissions: PermissionAction[] = []
    newRoles.forEach((role) => {
      allPermissions = [...allPermissions, ...getPermissionsForRole(role)]
    })

    // Add custom permissions
    if (user.customPermissions.length > 0) {
      allPermissions = [...allPermissions, ...user.customPermissions]
    }

    // Remove duplicates
    allPermissions = [...new Set(allPermissions)]

    // Update state
    setRoles(newRoles)
    setPermissions(allPermissions)

    // Update user in users list
    const updatedUser: User = {
      ...user,
      balance: balance,
      tier: walletTier,
      roles: newRoles,
      lastActive: new Date(),
    }

    setUsers((prevUsers) => {
      const otherUsers = prevUsers.filter((u) => u.address !== walletAddress)
      return [...otherUsers, updatedUser]
    })
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
        const adminStatus = checkIsAdmin(storedAddress)
        setIsAdmin(adminStatus)
        const balanceNum = storedBalance ? Number.parseInt(storedBalance) : 0
        setBalance(balanceNum)
        const calculatedTier = calculateTier(balanceNum)
        setTier(calculatedTier)

        // Update roles and permissions
        updateRolesAndPermissions(storedAddress, calculatedTier, adminStatus)
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

      // Load users from localStorage if available
      const storedUsers = localStorage.getItem("users")
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers)
          setUsers(parsedUsers)
        } catch (e) {
          console.error("Failed to parse users from localStorage", e)
        }
      }
    }
  }, [])

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users))
    }
  }, [users])

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
      const calculatedTier = calculateTier(randomBalance)
      setTier(calculatedTier)
      setIsAdmin(true) // Force admin status to true
      setConnected(true)

      // Update roles and permissions
      updateRolesAndPermissions(connectedAddress, calculatedTier, true)

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
    const calculatedTier = calculateTier(newBalance)
    setTier(calculatedTier)

    // Update roles and permissions
    if (address) {
      updateRolesAndPermissions(address, calculatedTier, isAdmin)
    }

    // Update localStorage
    localStorage.setItem("walletBalance", newBalance.toString())
  }

  const disconnect = () => {
    setConnected(false)
    setAddress(null)
    setBalance(0)
    setTier("UNAUTHORIZED")
    setIsAdmin(false)
    setRoles([])
    setPermissions([])
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

  // Permission check methods
  const checkHasPermission = (permission: PermissionAction) => {
    return hasPermission(permissions, permission)
  }

  const checkHasAnyPermission = (requiredPermissions: PermissionAction[]) => {
    return hasAnyPermission(permissions, requiredPermissions)
  }

  const checkHasAllPermissions = (requiredPermissions: PermissionAction[]) => {
    return hasAllPermissions(permissions, requiredPermissions)
  }

  const checkIsRoleAtLeast = (requiredRole: UserRole) => {
    // Find the highest role the user has
    const highestRoleIndex = Math.max(
      ...roles.map((role) => {
        return Object.keys(DEFAULT_ROLE_PERMISSIONS).indexOf(role)
      }),
    )

    const highestRole = Object.keys(DEFAULT_ROLE_PERMISSIONS)[highestRoleIndex] as UserRole
    return isRoleAtLeast(highestRole, requiredRole)
  }

  // Role management
  const addRole = (userAddress: string, role: UserRole) => {
    if (!isAdmin) return

    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.address === userAddress) {
          const updatedRoles = [...new Set([...user.roles, role])]
          return { ...user, roles: updatedRoles }
        }
        return user
      })
    })

    // Update current user if it's the active address
    if (address === userAddress) {
      setRoles((prevRoles) => [...new Set([...prevRoles, role])])

      // Update permissions
      const rolePermissions = getPermissionsForRole(role)
      setPermissions((prevPermissions) => [...new Set([...prevPermissions, ...rolePermissions])])
    }
  }

  const removeRole = (userAddress: string, role: UserRole) => {
    if (!isAdmin) return

    // Don't allow removing the base user role
    if (role === "user") return

    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.address === userAddress) {
          const updatedRoles = user.roles.filter((r) => r !== role)
          return { ...user, roles: updatedRoles }
        }
        return user
      })
    })

    // Update current user if it's the active address
    if (address === userAddress) {
      setRoles((prevRoles) => prevRoles.filter((r) => r !== role))

      // Recalculate permissions
      const newRoles = roles.filter((r) => r !== role)
      let newPermissions: PermissionAction[] = []
      newRoles.forEach((r) => {
        newPermissions = [...newPermissions, ...getPermissionsForRole(r)]
      })

      // Add custom permissions
      const user = users.find((u) => u.address === userAddress)
      if (user && user.customPermissions.length > 0) {
        newPermissions = [...newPermissions, ...user.customPermissions]
      }

      // Remove duplicates
      newPermissions = [...new Set(newPermissions)]
      setPermissions(newPermissions)
    }
  }

  // Permission management
  const addPermission = (userAddress: string, permission: PermissionAction) => {
    if (!isAdmin) return

    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.address === userAddress) {
          const updatedPermissions = [...new Set([...user.customPermissions, permission])]
          return { ...user, customPermissions: updatedPermissions }
        }
        return user
      })
    })

    // Update current user if it's the active address
    if (address === userAddress) {
      setPermissions((prevPermissions) => [...new Set([...prevPermissions, permission])])
    }
  }

  const removePermission = (userAddress: string, permission: PermissionAction) => {
    if (!isAdmin) return

    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.address === userAddress) {
          const updatedPermissions = user.customPermissions.filter((p) => p !== permission)
          return { ...user, customPermissions: updatedPermissions }
        }
        return user
      })
    })

    // Update current user if it's the active address
    if (address === userAddress) {
      // Check if this permission comes from a role
      let permissionFromRole = false
      roles.forEach((role) => {
        if (getPermissionsForRole(role).includes(permission)) {
          permissionFromRole = true
        }
      })

      // Only remove if it's not from a role
      if (!permissionFromRole) {
        setPermissions((prevPermissions) => prevPermissions.filter((p) => p !== permission))
      }
    }
  }

  // User management
  const getAllUsers = () => {
    return [...users]
  }

  const getUserByAddress = (userAddress: string) => {
    return users.find((user) => user.address === userAddress) || null
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
        roles,
        permissions,
        connect,
        disconnect,
        updateBalance,
        refreshBalance,
        clearConnectionError,
        setAccessMode: updateAccessMode,
        addToWhitelist,
        removeFromWhitelist,
        getWhitelistedAddresses,
        // Permission methods
        hasPermission: checkHasPermission,
        hasAnyPermission: checkHasAnyPermission,
        hasAllPermissions: checkHasAllPermissions,
        isRoleAtLeast: checkIsRoleAtLeast,
        // Role management
        addRole,
        removeRole,
        // Permission management
        addPermission,
        removePermission,
        // User management
        getUsers: getAllUsers,
        getUserByAddress,
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
