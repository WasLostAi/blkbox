// Types for our mock data
export interface TokenData {
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  logo?: string
}

export interface Transaction {
  id: string
  type: "buy" | "sell" | "swap" | "transfer"
  amount: number
  token: string
  price: number
  timestamp: Date
  address: string
  status: "completed" | "pending" | "failed"
}

export interface DividendPayment {
  id: string
  amount: number
  timestamp: Date
  status: "paid" | "pending"
}

export interface WhaleActivity {
  id: string
  address: string
  action: "buy" | "sell" | "transfer" | "mint" | "burn"
  token: string
  amount: number
  value: number
  timestamp: Date
}

// Generate random token data
export function generateTokenData(count = 10): TokenData[] {
  const tokens: TokenData[] = [
    {
      symbol: "BLKBOX",
      name: "BlackBox Protocol",
      price: 0.000247,
      change24h: 5.8,
      volume24h: 1250000,
      marketCap: 24700000,
    },
    { symbol: "SOL", name: "Solana", price: 142.35, change24h: 2.3, volume24h: 1250000000, marketCap: 62500000000 },
    { symbol: "USDC", name: "USD Coin", price: 1.0, change24h: 0.01, volume24h: 45000000, marketCap: 45000000000 },
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 65432.1,
      change24h: -1.2,
      volume24h: 32000000000,
      marketCap: 1250000000000,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 3456.78,
      change24h: 0.8,
      volume24h: 15000000000,
      marketCap: 420000000000,
    },
  ]

  // Generate additional random tokens if needed
  while (tokens.length < count) {
    const randomSymbol = `TKN${Math.floor(Math.random() * 1000)}`
    const randomName = `Token ${Math.floor(Math.random() * 1000)}`
    const randomPrice = Math.random() * 100
    const randomChange = Math.random() * 20 - 10 // -10% to +10%
    const randomVolume = Math.random() * 10000000
    const randomMarketCap = randomPrice * (Math.random() * 1000000 + 1000000)

    tokens.push({
      symbol: randomSymbol,
      name: randomName,
      price: randomPrice,
      change24h: randomChange,
      volume24h: randomVolume,
      marketCap: randomMarketCap,
    })
  }

  return tokens
}

// Generate random transactions
export function generateTransactions(count = 10): Transaction[] {
  const transactions: Transaction[] = []
  const tokens = ["BLKBOX", "SOL", "USDC", "BTC", "ETH"]
  const types: Transaction["type"][] = ["buy", "sell", "swap", "transfer"]
  const statuses: Transaction["status"][] = ["completed", "pending", "failed"]

  for (let i = 0; i < count; i++) {
    const token = tokens[Math.floor(Math.random() * tokens.length)]
    const type = types[Math.floor(Math.random() * types.length)]
    const amount = Math.random() * 1000 + 10
    const price = token === "BLKBOX" ? 0.000247 : Math.random() * 100 + 1
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
    const status = Math.random() > 0.9 ? "pending" : Math.random() > 0.95 ? "failed" : "completed"

    transactions.push({
      id: `tx-${Math.random().toString(36).substring(2, 10)}`,
      type,
      amount,
      token,
      price,
      timestamp,
      address: `0x${Math.random().toString(36).substring(2, 10)}`,
      status,
    })
  }

  // Sort by timestamp, newest first
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// Generate random dividend payments
export function generateDividendPayments(count = 10): DividendPayment[] {
  const payments: DividendPayment[] = []

  for (let i = 0; i < count; i++) {
    const amount = Math.random() * 100 + 5
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
    const status = Math.random() > 0.1 ? "paid" : "pending"

    payments.push({
      id: `div-${Math.random().toString(36).substring(2, 10)}`,
      amount,
      timestamp,
      status,
    })
  }

  // Sort by timestamp, newest first
  return payments.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// Generate random whale activities
export function generateWhaleActivities(count = 20): WhaleActivity[] {
  const activities: WhaleActivity[] = []
  const tokens = ["BLKBOX", "SOL", "USDC", "BTC", "ETH"]
  const actions: WhaleActivity["action"][] = ["buy", "sell", "transfer", "mint", "burn"]

  for (let i = 0; i < count; i++) {
    const token = tokens[Math.floor(Math.random() * tokens.length)]
    const action = actions[Math.floor(Math.random() * actions.length)]
    const amount = Math.random() * 100000 + 10000
    const price =
      token === "BLKBOX"
        ? 0.000247
        : token === "SOL"
          ? 142.35
          : token === "BTC"
            ? 65432.1
            : token === "ETH"
              ? 3456.78
              : 1.0
    const value = amount * price
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000))

    activities.push({
      id: `whale-${Math.random().toString(36).substring(2, 10)}`,
      address: `0x${Math.random().toString(36).substring(2, 15)}`,
      action,
      token,
      amount,
      value,
      timestamp,
    })
  }

  // Sort by timestamp, newest first
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}
