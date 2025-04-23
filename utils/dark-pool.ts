// Pool participant interface
export interface PoolParticipant {
  wallet: string
  contribution: number
  joinedAt: number
}

// Dark pool interface
export interface DarkPool {
  id: string
  name: string
  description: string
  totalContribution: number
  participants: PoolParticipant[]
  createdAt: number
  lastDistribution: number
  performanceHistory: { date: string; profit: number }[]
  minimumContribution: number
  requiredTier: string
}

// Mock dark pools
const darkPools: DarkPool[] = [
  {
    id: "alpha-seekers",
    name: "Alpha Seekers",
    description: "A pool focused on capturing alpha from new token launches and market inefficiencies.",
    totalContribution: 50000,
    participants: [],
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    lastDistribution: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    performanceHistory: generatePerformanceHistory(30, 0.5, 3),
    minimumContribution: 1000,
    requiredTier: "ENTRY_LEVEL",
  },
  {
    id: "shadow-operators",
    name: "Shadow Operators",
    description: "Specialized in MEV extraction and sandwich trading strategies.",
    totalContribution: 120000,
    participants: [],
    createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60 days ago
    lastDistribution: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    performanceHistory: generatePerformanceHistory(60, 1, 5),
    minimumContribution: 5000,
    requiredTier: "OPERATOR",
  },
  {
    id: "phantom-elite",
    name: "Phantom Elite",
    description: "High-risk, high-reward strategies for experienced traders only.",
    totalContribution: 350000,
    participants: [],
    createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000, // 90 days ago
    lastDistribution: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    performanceHistory: generatePerformanceHistory(90, 2, 10),
    minimumContribution: 25000,
    requiredTier: "SHADOW_ELITE",
  },
]

// Generate performance history
function generatePerformanceHistory(
  days: number,
  minDailyReturn: number,
  maxDailyReturn: number,
): { date: string; profit: number }[] {
  const history: { date: string; profit: number }[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    history.push({
      date: date.toISOString().split("T")[0],
      profit: minDailyReturn + Math.random() * (maxDailyReturn - minDailyReturn),
    })
  }

  return history
}

// Get all dark pools
export function getDarkPools(): DarkPool[] {
  return darkPools
}

// Get a dark pool by ID
export function getDarkPool(id: string): DarkPool | undefined {
  return darkPools.find((pool) => pool.id === id)
}

// Join a dark pool
export async function joinDarkPool(
  poolId: string,
  wallet: string,
  contribution: number,
): Promise<{ success: boolean; message: string }> {
  const pool = getDarkPool(poolId)

  if (!pool) {
    return { success: false, message: `Pool ${poolId} not found` }
  }

  if (contribution < pool.minimumContribution) {
    return {
      success: false,
      message: `Minimum contribution for this pool is ${pool.minimumContribution} USDC`,
    }
  }

  // Check if already a participant
  const existingParticipant = pool.participants.find((p) => p.wallet === wallet)

  if (existingParticipant) {
    // Update contribution
    existingParticipant.contribution += contribution
  } else {
    // Add new participant
    pool.participants.push({
      wallet,
      contribution,
      joinedAt: Date.now(),
    })
  }

  // Update total contribution
  pool.totalContribution += contribution

  return { success: true, message: `Successfully joined ${pool.name} with ${contribution} USDC` }
}

// Leave a dark pool
export async function leaveDarkPool(
  poolId: string,
  wallet: string,
): Promise<{ success: boolean; message: string; withdrawnAmount?: number }> {
  const pool = getDarkPool(poolId)

  if (!pool) {
    return { success: false, message: `Pool ${poolId} not found` }
  }

  // Find participant
  const participantIndex = pool.participants.findIndex((p) => p.wallet === wallet)

  if (participantIndex === -1) {
    return { success: false, message: `Wallet ${wallet} is not a participant in pool ${poolId}` }
  }

  const withdrawnAmount = pool.participants[participantIndex].contribution

  // Update total contribution
  pool.totalContribution -= withdrawnAmount

  // Remove participant
  pool.participants.splice(participantIndex, 1)

  return {
    success: true,
    message: `Successfully left ${pool.name} and withdrew ${withdrawnAmount} USDC`,
    withdrawnAmount,
  }
}

// Distribute profits
export async function distributeProfits(
  poolId: string,
  amount: number,
): Promise<{ success: boolean; message: string; distributions?: Record<string, number> }> {
  const pool = getDarkPool(poolId)

  if (!pool) {
    return { success: false, message: `Pool ${poolId} not found` }
  }

  if (pool.participants.length === 0) {
    return { success: false, message: `Pool ${poolId} has no participants` }
  }

  // Calculate shares
  const distributions: Record<string, number> = {}
  for (const participant of pool.participants) {
    const share = (participant.contribution / pool.totalContribution) * amount
    distributions[participant.wallet] = share
  }

  // Update last distribution
  pool.lastDistribution = Date.now()

  return {
    success: true,
    message: `Successfully distributed ${amount} USDC to ${pool.participants.length} participants`,
    distributions,
  }
}

// Get pool performance
export function getPoolPerformance(poolId: string): {
  totalProfit: number
  weeklyProfit: number
  monthlyProfit: number
  profitPerContribution: number
  participantCount: number
  annualizedReturn: number
} {
  const pool = getDarkPool(poolId)

  if (!pool) {
    throw new Error(`Pool ${poolId} not found`)
  }

  const history = pool.performanceHistory
  const totalProfit = history.reduce((sum, day) => sum + day.profit, 0)
  const weeklyProfit = history.slice(-7).reduce((sum, day) => sum + day.profit, 0)
  const monthlyProfit = history.slice(-30).reduce((sum, day) => sum + day.profit, 0)

  const profitPerContribution = pool.totalContribution > 0 ? totalProfit / pool.totalContribution : 0
  const annualizedReturn = (profitPerContribution * 365) / history.length

  return {
    totalProfit,
    weeklyProfit,
    monthlyProfit,
    profitPerContribution,
    participantCount: pool.participants.length,
    annualizedReturn: annualizedReturn * 100, // Convert to percentage
  }
}
