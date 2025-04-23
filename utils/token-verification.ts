import { PublicKey } from "@solana/web3.js"
import { getConnection } from "./solana-connection"
import { TIER_THRESHOLDS, type WalletTier } from "@/context/wallet-context"

// Mock BLKBOX token address - would be replaced with actual token address
const BLKBOX_TOKEN_ADDRESS = new PublicKey("BLKBXqxQvzSBvnkNqLHMiEPVkhNJS5UtgyzE2r2tUxAs")

// Get the BLKBOX token balance for a wallet
export async function getTokenBalance(walletAddress: PublicKey): Promise<number> {
  try {
    const connection = getConnection()

    // In a real implementation, you would fetch the SPL token balance
    // For this demo, we'll return a mock balance
    const mockBalance = Math.floor(Math.random() * 500000) + 10000
    return mockBalance
  } catch (error) {
    console.error("Error getting token balance:", error)
    return 0
  }
}

// Determine the tier level based on token balance
export function determineTierLevel(balance: number): WalletTier {
  if (balance >= TIER_THRESHOLDS.PHANTOM_COUNCIL) return "PHANTOM_COUNCIL"
  if (balance >= TIER_THRESHOLDS.SHADOW_ELITE) return "SHADOW_ELITE"
  if (balance >= TIER_THRESHOLDS.OPERATOR) return "OPERATOR"
  if (balance >= TIER_THRESHOLDS.ENTRY_LEVEL) return "ENTRY_LEVEL"
  return "UNAUTHORIZED"
}

// Check if a wallet has access to a specific tier
export async function hasAccessToTier(walletAddress: PublicKey, requiredTier: WalletTier): Promise<boolean> {
  const balance = await getTokenBalance(walletAddress)
  const tier = determineTierLevel(balance)

  // Convert tiers to numeric values for comparison
  const tierValues: Record<WalletTier, number> = {
    UNAUTHORIZED: 0,
    ENTRY_LEVEL: 1,
    OPERATOR: 2,
    SHADOW_ELITE: 3,
    PHANTOM_COUNCIL: 4,
  }

  return tierValues[tier] >= tierValues[requiredTier]
}

// Calculate progress to next tier
export function calculateNextTierProgress(balance: number): { nextTier: WalletTier; progress: number } {
  const currentTier = determineTierLevel(balance)

  if (currentTier === "PHANTOM_COUNCIL") {
    // Already at highest tier
    return { nextTier: "PHANTOM_COUNCIL", progress: 100 }
  }

  let nextTier: WalletTier
  let nextThreshold: number
  let currentThreshold: number

  switch (currentTier) {
    case "UNAUTHORIZED":
      nextTier = "ENTRY_LEVEL"
      nextThreshold = TIER_THRESHOLDS.ENTRY_LEVEL
      currentThreshold = 0
      break
    case "ENTRY_LEVEL":
      nextTier = "OPERATOR"
      nextThreshold = TIER_THRESHOLDS.OPERATOR
      currentThreshold = TIER_THRESHOLDS.ENTRY_LEVEL
      break
    case "OPERATOR":
      nextTier = "SHADOW_ELITE"
      nextThreshold = TIER_THRESHOLDS.SHADOW_ELITE
      currentThreshold = TIER_THRESHOLDS.OPERATOR
      break
    case "SHADOW_ELITE":
      nextTier = "PHANTOM_COUNCIL"
      nextThreshold = TIER_THRESHOLDS.PHANTOM_COUNCIL
      currentThreshold = TIER_THRESHOLDS.SHADOW_ELITE
      break
    default:
      nextTier = "PHANTOM_COUNCIL"
      nextThreshold = TIER_THRESHOLDS.PHANTOM_COUNCIL
      currentThreshold = TIER_THRESHOLDS.SHADOW_ELITE
  }

  const progress = Math.min(100, Math.floor(((balance - currentThreshold) / (nextThreshold - currentThreshold)) * 100))

  return { nextTier, progress }
}
