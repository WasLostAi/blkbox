import type { WalletTier } from "@/context/wallet-context"

// Define tier levels for comparison
export const tierLevels = {
  UNAUTHORIZED: 0,
  ENTRY_LEVEL: 1,
  OPERATOR: 2,
  SHADOW_ELITE: 3,
  PHANTOM_COUNCIL: 4,
}

// Define access levels
export const ACCESS_LEVELS = {
  SHADOW_COUNCIL: 4,
  TIER_3: 3,
  TIER_2: 2,
  TIER_1: 1,
  BASIC: 0,
}

export type AccessTier = "PHANTOM_COUNCIL" | "SHADOW_ELITE" | "OPERATOR" | "ENTRY_LEVEL" | "UNAUTHORIZED"

/**
 * Check if a user's tier meets or exceeds the required tier level
 * @param userTier The user's current tier
 * @param requiredTier The minimum tier required for access
 * @returns boolean indicating if the user has access
 */
export function checkTierAccess(userTier: WalletTier, requiredTier: WalletTier): boolean {
  const userLevel = tierLevels[userTier]
  const requiredLevel = tierLevels[requiredTier]

  return userLevel >= requiredLevel
}

/**
 * Get the minimum tier required for a specific tool
 * @param toolPath The path of the tool (e.g., "shadow-swap", "liquidation-hunter")
 * @returns The minimum tier required for the tool
 */
export function getToolRequiredTier(toolPath: string): WalletTier {
  // Map tool paths to their required tiers
  const toolTierMap: Record<string, WalletTier> = {
    "shadow-swap": "ENTRY_LEVEL",
    "whale-tracker": "ENTRY_LEVEL",
    "ai-strategy": "ENTRY_LEVEL",
    "mev-extraction": "SHADOW_ELITE",
    "liquidation-hunter": "SHADOW_ELITE",
    "flashloan-lab": "PHANTOM_COUNCIL",
    "stealth-router": "OPERATOR",
    "sniper-bot": "OPERATOR",
    "dark-launch": "SHADOW_ELITE",
    "wash-trading": "SHADOW_ELITE",
    "manipulation-detection": "SHADOW_ELITE",
    "quantum-manipulator": "PHANTOM_COUNCIL",
    "temporal-fragmentation": "PHANTOM_COUNCIL",
    "hidden-tax-implementer": "SHADOW_ELITE",
  }

  // Default to ENTRY_LEVEL if the tool is not found in the map
  return toolTierMap[toolPath] || "ENTRY_LEVEL"
}

/**
 * Simulates getting the user's access level.
 * In a real application, this would fetch the user's access level from authentication.
 * @returns The user's access level.
 */
export function getUserAccessLevel(): number {
  // Replace this with actual authentication logic
  // For now, we'll return a random access level for demonstration purposes
  const accessLevels = Object.values(ACCESS_LEVELS)
  return accessLevels[Math.floor(Math.random() * accessLevels.length)]
}
