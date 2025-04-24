import type { WalletTier } from "@/context/wallet-context"

// Define tier levels for comparison
export const tierLevels = {
  UNAUTHORIZED: 0,
  ENTRY_LEVEL: 1,
  OPERATOR: 2,
  SHADOW_ELITE: 3,
  PHANTOM_COUNCIL: 4,
}

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
  }

  // Default to ENTRY_LEVEL if the tool is not found in the map
  return toolTierMap[toolPath] || "ENTRY_LEVEL"
}
