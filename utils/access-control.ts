export const ACCESS_LEVELS = {
  SHADOW_COUNCIL: 4,
  TIER_3: 3,
  TIER_2: 2,
  TIER_1: 1,
  BASIC: 0,
}

export function getUserAccessLevel(): number {
  return ACCESS_LEVELS.SHADOW_COUNCIL
}

export function hasAccess(userLevel: number, requiredLevel: number): boolean {
  return userLevel >= requiredLevel
}

export function getToolRequiredTier(toolPath: string): string {
  switch (toolPath) {
    case "quantum-manipulator":
      return "PHANTOM_COUNCIL"
    case "temporal-fragmentation":
      return "PHANTOM_COUNCIL"
    case "phantom-vault":
      return "SHADOW_ELITE"
    case "mev-extraction":
      return "OPERATOR"
    case "liquidity-mirage":
      return "SHADOW_ELITE"
    case "function-masquerading":
      return "SHADOW_ELITE"
    case "stealth-router":
      return "SHADOW_ELITE"
    case "sniper-bot":
      return "OPERATOR"
    case "whale-tracker":
      return "ENTRY_LEVEL"
    case "liquidation-hunter":
      return "SHADOW_ELITE"
    case "ai-strategy":
      return "ENTRY_LEVEL"
    case "token-creation":
      return "OPERATOR"
    default:
      return "UNAUTHORIZED"
  }
}
