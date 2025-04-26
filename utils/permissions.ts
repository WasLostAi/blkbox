// Define permission types
export type PermissionAction =
  // Tool access permissions
  | "access:shadow-swap"
  | "access:whale-tracker"
  | "access:ai-strategy"
  | "access:mev-extraction"
  | "access:liquidation-hunter"
  | "access:stealth-router"
  | "access:sniper-bot"
  | "access:dark-launch"
  | "access:flashloan-lab"
  | "access:wash-trading"
  | "access:manipulation-detection"
  | "access:quantum-manipulator"
  | "access:temporal-fragmentation"
  | "access:hidden-tax-implementer"
  | "access:phantom-vault"
  | "access:emissions-skimming"
  | "access:sandwich-attack"
  | "access:token-creation"
  | "access:automated-arbitrage"
  | "access:interoperability"

  // Admin permissions
  | "admin:view-users"
  | "admin:manage-users"
  | "admin:manage-roles"
  | "admin:manage-permissions"
  | "admin:system-settings"
  | "admin:view-logs"
  | "admin:manage-whitelist"
  | "admin:kill-switch"

  // Financial permissions
  | "finance:view-dividends"
  | "finance:claim-dividends"
  | "finance:view-pool-stats"
  | "finance:participate-dark-pool"
  | "finance:view-treasury"
  | "finance:manage-treasury"

  // Governance permissions
  | "governance:view-proposals"
  | "governance:create-proposals"
  | "governance:vote"
  | "governance:execute-proposals"

// Define role types
export type UserRole =
  | "user"
  | "entry_level"
  | "operator"
  | "shadow_elite"
  | "phantom_council"
  | "admin"
  | "super_admin"

// Define role hierarchy
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  user: 0,
  entry_level: 1,
  operator: 2,
  shadow_elite: 3,
  phantom_council: 4,
  admin: 5,
  super_admin: 6,
}

// Define default permissions for each role
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, PermissionAction[]> = {
  user: ["finance:view-dividends", "governance:view-proposals"],
  entry_level: [
    "access:shadow-swap",
    "access:whale-tracker",
    "access:ai-strategy",
    "finance:view-dividends",
    "finance:claim-dividends",
    "finance:view-pool-stats",
    "governance:view-proposals",
    "governance:vote",
  ],
  operator: [
    "access:shadow-swap",
    "access:whale-tracker",
    "access:ai-strategy",
    "access:stealth-router",
    "access:sniper-bot",
    "access:token-creation",
    "finance:view-dividends",
    "finance:claim-dividends",
    "finance:view-pool-stats",
    "finance:participate-dark-pool",
    "governance:view-proposals",
    "governance:vote",
  ],
  shadow_elite: [
    "access:shadow-swap",
    "access:whale-tracker",
    "access:ai-strategy",
    "access:stealth-router",
    "access:sniper-bot",
    "access:mev-extraction",
    "access:liquidation-hunter",
    "access:dark-launch",
    "access:wash-trading",
    "access:manipulation-detection",
    "access:hidden-tax-implementer",
    "access:phantom-vault",
    "access:token-creation",
    "access:interoperability",
    "finance:view-dividends",
    "finance:claim-dividends",
    "finance:view-pool-stats",
    "finance:participate-dark-pool",
    "finance:view-treasury",
    "governance:view-proposals",
    "governance:create-proposals",
    "governance:vote",
  ],
  phantom_council: [
    "access:shadow-swap",
    "access:whale-tracker",
    "access:ai-strategy",
    "access:stealth-router",
    "access:sniper-bot",
    "access:mev-extraction",
    "access:liquidation-hunter",
    "access:dark-launch",
    "access:flashloan-lab",
    "access:wash-trading",
    "access:manipulation-detection",
    "access:quantum-manipulator",
    "access:temporal-fragmentation",
    "access:hidden-tax-implementer",
    "access:phantom-vault",
    "access:emissions-skimming",
    "access:sandwich-attack",
    "access:token-creation",
    "access:automated-arbitrage",
    "access:interoperability",
    "finance:view-dividends",
    "finance:claim-dividends",
    "finance:view-pool-stats",
    "finance:participate-dark-pool",
    "finance:view-treasury",
    "governance:view-proposals",
    "governance:create-proposals",
    "governance:vote",
    "governance:execute-proposals",
  ],
  admin: [
    "admin:view-users",
    "admin:manage-users",
    "admin:view-logs",
    "admin:manage-whitelist",
    "finance:view-treasury",
    "finance:manage-treasury",
  ],
  super_admin: [
    "admin:view-users",
    "admin:manage-users",
    "admin:manage-roles",
    "admin:manage-permissions",
    "admin:system-settings",
    "admin:view-logs",
    "admin:manage-whitelist",
    "admin:kill-switch",
    "finance:view-treasury",
    "finance:manage-treasury",
  ],
}

// Helper function to check if a user has a specific permission
export function hasPermission(userPermissions: PermissionAction[], requiredPermission: PermissionAction): boolean {
  return userPermissions.includes(requiredPermission)
}

// Helper function to check if a user has any of the specified permissions
export function hasAnyPermission(
  userPermissions: PermissionAction[],
  requiredPermissions: PermissionAction[],
): boolean {
  return requiredPermissions.some((permission) => userPermissions.includes(permission))
}

// Helper function to check if a user has all of the specified permissions
export function hasAllPermissions(
  userPermissions: PermissionAction[],
  requiredPermissions: PermissionAction[],
): boolean {
  return requiredPermissions.every((permission) => userPermissions.includes(permission))
}

// Helper function to check if a role is at least at the specified level
export function isRoleAtLeast(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

// Helper function to get permissions for a role
export function getPermissionsForRole(role: UserRole): PermissionAction[] {
  return DEFAULT_ROLE_PERMISSIONS[role] || []
}

// Helper function to get all available permissions
export function getAllPermissions(): PermissionAction[] {
  return Object.values(DEFAULT_ROLE_PERMISSIONS).flat()
}

// Helper function to get unique permissions
export function getUniquePermissions(): PermissionAction[] {
  const allPermissions = getAllPermissions()
  return [...new Set(allPermissions)]
}
