// This is a mock implementation for demo purposes
// In a real application, this would connect to an AI service

const toolResponses: Record<string, string[]> = {
  "risk-management": [
    "Based on your portfolio, I recommend reducing exposure to small-cap altcoins by 15% to mitigate current market volatility.",
    "Your portfolio has a high correlation with BTC. Consider diversifying with some uncorrelated assets like LINK or DOT to reduce systemic risk.",
    "I've analyzed your holdings and detected a 32% risk of significant drawdown in the next market cycle. Consider implementing stop-losses at these levels: BTC: $38,500, ETH: $2,100, SOL: $75.",
  ],
  "arbitrage-bot": [
    "I've detected a 2.3% arbitrage opportunity for SOL between Binance and Kraken. Estimated profit after fees: $127.45 per $5,000 traded.",
    "Current market conditions show limited arbitrage opportunities. The highest spread is 0.8% for AVAX between Kucoin and Bitfinex, which is below our 1% threshold after fees.",
    "Triangle arbitrage detected: BTC → ETH → SOL → BTC offers 1.7% profit potential with current liquidity of approximately $35,000.",
  ],
  "staking-advisor": [
    "For your SOL holdings, I recommend delegating to validator 'Figment' with 6.8% APY and 99.98% uptime over the last 6 months.",
    "Based on your risk profile, consider liquid staking through Marinade Finance for SOL (6.2% APY) to maintain liquidity while earning rewards.",
    "Your current validator has underperformed by 0.7% compared to the network average. Consider redelegating to these top 3 alternatives for better returns.",
  ],
  "lending-advisor": [
    "Current best lending rates for SOL: Solend: 3.2% APY, Mango Markets: 2.9% APY, Jet Protocol: 3.5% APY. Jet Protocol offers the highest return with comparable risk profile.",
    "Based on current market conditions, borrowing against your SOL at 2.5% to yield farm on Raydium's USDC-SOL pool (24% APY) could generate approximately 21.5% net APY.",
    "Warning: Your collateralization ratio on Solend is approaching 130%. Consider adding more collateral or repaying part of your loan to avoid liquidation risk.",
  ],
  "price-prediction": [
    "Based on technical analysis and on-chain metrics, SOL has a 68% probability of reaching $120-135 range within the next 30 days. Key resistance levels: $95, $105, $118.",
    "Our AI model predicts a short-term consolidation for SOL between $85-92, followed by potential upward movement if BTC holds above $42,000.",
    "Sentiment analysis from social media and news indicates increasingly bullish outlook for SOL. This correlates with 73% probability of price appreciation in the next 2 weeks.",
  ],
  "scam-detector": [
    "Warning: The contract 0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9 contains suspicious functions that allow the owner to mint unlimited tokens. High risk of rug pull detected.",
    "This project shows multiple red flags: anonymous team, unrealistic roadmap, copied whitepaper (87% similarity to existing projects), and contract not verified on Etherscan.",
    "The Twitter account promoting this token was created 2 weeks ago and is using fake engagement. The website domain was registered yesterday. Extreme caution advised.",
  ],
  "ico-advisor": [
    "Analysis of upcoming SOL ecosystem token XYZ: Team background verified (ex-Solana Labs developers), tokenomics show reasonable distribution (15% team with 3-year vesting), use case addresses actual market need. Overall rating: 7.8/10.",
    "This IDO has concerning tokenomics: 30% to team with only 6-month cliff, 25% for 'ecosystem development' with no clear allocation plan. Recommend caution.",
    "Comparison of upcoming IDOs this week: Project A (8.2/10), Project B (6.5/10), Project C (3.8/10). Project A shows strongest fundamentals with experienced team and working product.",
  ],
  "trading-assistant": [
    "SOL is approaching a key resistance level at $92.50 with declining volume. Consider waiting for confirmation of breakout before adding to position.",
    "RSI indicates SOL is currently overbought at 78.3. Historical patterns suggest a short-term pullback is likely before continuation of uptrend.",
    "Your recent trades show a pattern of selling too early. Average profit taking at +12% while average loss at -18%. Consider adjusting your risk-reward ratio to minimum 1:2.",
  ],
  "portfolio-optimizer": [
    "Your current portfolio allocation (60% SOL, 25% ETH, 15% BTC) has a Sharpe ratio of 1.2. Recommended optimization: 45% SOL, 30% ETH, 20% BTC, 5% USDC would increase Sharpe ratio to 1.7.",
    "Your portfolio shows high correlation (0.85) across holdings. Adding 10-15% exposure to ATOM and DOT could reduce overall volatility by approximately 18%.",
    "Historical analysis shows your portfolio underperformed SOL by 12% over the last quarter due to timing of trades. Consider reducing trading frequency and implementing dollar-cost averaging.",
  ],
  "yield-farming": [
    "Highest risk-adjusted yields currently: Raydium USDC-SOL pool (24% APY, moderate IL risk), Orca USDC-USDT pool (8% APY, minimal IL risk), Marinade SOL staking (6.2% APY, lowest risk).",
    "New opportunity: Atrix Finance launched new incentivized pool with 42% APY. Initial high yield likely to decrease. Estimated sustainable yield: 15-20% APY after first week.",
    "Warning: The farm you're currently using has declining TVL (-35% in 7 days) which indicates potential risk. Consider moving funds to more established protocols.",
  ],
  "trading-bot": [
    "Bot performance this week: 8 trades executed, 5 profitable, 3 losses. Net profit: +2.8% vs. SOL spot performance of +1.2%. Largest winning trade: +4.2%, largest loss: -1.8%.",
    "Market volatility has increased 45% over the past 24 hours. Bot has automatically adjusted parameters to reduce position sizes and widen stop-loss thresholds.",
    "New strategy backtest results: Strategy B shows 34% annual return with 12% maximum drawdown over 2-year historical data. This outperforms current Strategy A by 8% with similar risk profile.",
  ],
  "news-aggregator": [
    "Breaking: Solana Foundation announces new $5M developer grants program focused on DeFi applications. Sentiment analysis: Highly Positive. Market impact probability: 85%.",
    "Compiled from 137 sources: SOL ecosystem growth metrics show 27% increase in active developers QoQ and 42% increase in TVL. Overall sentiment trending increasingly positive.",
    "Whale alert: Large wallet transferred 2.1M SOL ($189M) to Binance in the last hour. Similar patterns historically preceded 5-8% market movements within 24-48 hours.",
  ],
}

// Default responses when no specific tool is selected
const defaultResponses = [
  "I can help you analyze market trends, optimize your portfolio, or provide trading insights. What specific information are you looking for?",
  "Based on current market conditions, SOL is showing strong momentum with increasing developer activity and ecosystem growth.",
  "I recommend diversifying your crypto portfolio across large caps (BTC, ETH), mid caps (SOL, AVAX), and some strategic small caps for optimal risk-adjusted returns.",
  "The current market structure suggests we're in an accumulation phase. This historically precedes significant upward price movement within 3-6 months.",
]

export async function getToolResponse(userInput: string, toolContext?: string): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // If we have a specific tool context, return a response for that tool
  if (toolContext && toolResponses[toolContext]) {
    const responses = toolResponses[toolContext]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Otherwise return a default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}
