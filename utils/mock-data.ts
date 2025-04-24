export interface WhaleActivity {
  id: string
  timestamp: Date
  address: string
  action: string
  token: string
  amount: number
  value: number
  healthFactor?: number
  protocol?: string
  collateralValue?: number
  debtValue?: number
  collateralAmount?: number
  collateralToken?: string
  debtAmount?: number
  debtToken?: string
  liquidationThreshold?: number
  positionId?: string
}

export function generateWhaleActivities(count: number): WhaleActivity[] {
  const activities: WhaleActivity[] = []
  const actions = ["buy", "sell", "transfer", "mint", "burn"]
  const tokens = ["SOL", "USDC", "BLKBOX", "BTC", "ETH"]
  const protocols = ["Aave", "Compound", "Solend", "Jet Protocol", "Kamino Finance"]

  for (let i = 0; i < count; i++) {
    const action = actions[Math.floor(Math.random() * actions.length)]
    const token = tokens[Math.floor(Math.random() * tokens.length)]
    const amount = Math.floor(Math.random() * 10000) + 1
    const value = amount * (Math.random() * 100)

    activities.push({
      id: Math.random().toString(36).substring(2, 15),
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)), // within the last hour
      address: "0x" + Math.random().toString(16).slice(2, 10),
      action,
      token,
      amount,
      value,
    })
  }

  return activities
}

export function generateLiquidationTargets(count: number): WhaleActivity[] {
  const targets: WhaleActivity[] = []
  const protocols = ["Aave", "Compound", "Solend"]
  const collateralTokens = ["ETH", "BTC", "SOL"]
  const debtTokens = ["USDC", "DAI"]

  for (let i = 0; i < count; i++) {
    const protocol = protocols[Math.floor(Math.random() * protocols.length)]
    const collateralToken = collateralTokens[Math.floor(Math.random() * collateralTokens.length)]
    const debtToken = debtTokens[Math.floor(Math.random() * debtTokens.length)]
    const collateralAmount = Math.random() * 10 + 1
    const debtAmount = Math.random() * 5 + 0.5
    const collateralValue = collateralAmount * (Math.random() * 3000 + 500)
    const debtValue = debtAmount * 1
    const healthFactor = 1 + Math.random() * 0.2 // Between 1 and 1.2
    const liquidationThreshold = 80 + Math.random() * 10 // Between 80 and 90

    targets.push({
      id: Math.random().toString(36).substring(2, 15),
      timestamp: new Date(),
      address: "0x" + Math.random().toString(16).slice(2, 10),
      action: "liquidation",
      token: collateralToken,
      amount: collateralAmount,
      value: collateralValue,
      healthFactor,
      protocol,
      collateralValue,
      debtValue,
      collateralAmount,
      collateralToken,
      debtAmount,
      debtToken,
      liquidationThreshold,
      positionId: "0x" + Math.random().toString(16).slice(2, 10),
    })
  }

  return targets
}
