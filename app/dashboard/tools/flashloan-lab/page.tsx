"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Lightbulb, RefreshCw, Code, AlertTriangle, Zap, Save, Play, Copy, FileCode } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import TierGate from "@/components/tier-gate"
import { useWallet } from "@/context/wallet-context"
import WalletConnector from "@/components/wallet-connector"
import TerminalCode from "@/components/terminal-code"
import { Progress } from "@/components/ui/progress"

// Mock data for flashloan history
const MOCK_HISTORY = [
  {
    id: "fl-001",
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    protocol: "aave",
    strategy: "arbitrage",
    amount: "25000",
    token: "USDC",
    profit: "127.35",
    status: "success",
    txHash: "0x3a8e...5f2d",
  },
  {
    id: "fl-002",
    timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    protocol: "solend",
    strategy: "liquidation",
    amount: "15000",
    token: "USDC",
    profit: "312.87",
    status: "success",
    txHash: "0x7c2d...9a4b",
  },
  {
    id: "fl-003",
    timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
    protocol: "aave",
    strategy: "custom",
    amount: "50000",
    token: "DAI",
    profit: "0",
    status: "failed",
    txHash: "0x1f4e...2c8d",
    error: "Insufficient liquidity in target pool",
  },
  {
    id: "fl-004",
    timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    protocol: "aave",
    strategy: "arbitrage",
    amount: "30000",
    token: "USDC",
    profit: "189.42",
    status: "success",
    txHash: "0x9e2f...7b3a",
  },
]

// Protocol options with more details
const PROTOCOLS = [
  {
    id: "aave",
    name: "Aave V3",
    network: "Ethereum",
    fee: "0.09%",
    maxLoan: "10,000,000 USDC",
    description: "Leading DeFi lending protocol with deep liquidity pools",
  },
  {
    id: "solend",
    name: "Solend",
    network: "Solana",
    fee: "0.05%",
    maxLoan: "5,000,000 USDC",
    description: "Solana's largest lending protocol with low fees",
  },
  {
    id: "compound",
    name: "Compound",
    network: "Ethereum",
    fee: "0.08%",
    maxLoan: "8,000,000 USDC",
    description: "Algorithmic money market protocol with competitive rates",
  },
  {
    id: "dydx",
    name: "dYdX",
    network: "Ethereum",
    fee: "0.10%",
    maxLoan: "15,000,000 USDC",
    description: "Decentralized exchange with margin trading and flash loans",
  },
  {
    id: "custom",
    name: "Custom Protocol",
    network: "Various",
    fee: "Varies",
    maxLoan: "Unlimited",
    description: "Implement your own custom protocol integration",
  },
]

// Strategy options with more details
const STRATEGIES = [
  {
    id: "arbitrage",
    name: "Cross-Exchange Arbitrage",
    description: "Exploit price differences between exchanges",
    complexity: "Medium",
    risk: "Low",
    potentialReturn: "0.1-3%",
  },
  {
    id: "liquidation",
    name: "Liquidation",
    description: "Liquidate underwater positions for profit",
    complexity: "High",
    risk: "Medium",
    potentialReturn: "5-15%",
  },
  {
    id: "collateral_swap",
    name: "Collateral Swap",
    description: "Swap collateral types without closing positions",
    complexity: "Medium",
    risk: "Low",
    potentialReturn: "0.5-2%",
  },
  {
    id: "self_liquidation",
    name: "Self-Liquidation",
    description: "Liquidate your own positions to avoid liquidation penalties",
    complexity: "High",
    risk: "High",
    potentialReturn: "Varies",
  },
  {
    id: "custom",
    name: "Custom Strategy",
    description: "Implement your own custom flashloan strategy",
    complexity: "Very High",
    risk: "Varies",
    potentialReturn: "Varies",
  },
]

// Token options with more details
const TOKENS = [
  { id: "USDC", name: "USDC", decimals: 6, icon: "💵" },
  { id: "DAI", name: "DAI", decimals: 18, icon: "🔶" },
  { id: "ETH", name: "ETH", decimals: 18, icon: "💎" },
  { id: "SOL", name: "SOL", decimals: 9, icon: "☀️" },
  { id: "USDT", name: "USDT", decimals: 6, icon: "💲" },
  { id: "WBTC", name: "WBTC", decimals: 8, icon: "₿" },
]

// Template code snippets for different protocols and strategies
const CODE_TEMPLATES = {
  aave: {
    arbitrage: `// Aave Flashloan Arbitrage Strategy
// Generated by $BLKBOX Flashloan Lab

import { ethers } from "ethers";
import { FlashLoanReceiverBase } from "@aave/protocol-v2";

// Contract addresses
const LENDING_POOL_ADDRESS = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
const TOKEN_ADDRESS = "{{TOKEN_ADDRESS}}";
const DEX1_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3
const DEX2_ROUTER = "0x1111111254fb6c44bAC0beD2854e76F90643097d"; // 1inch

export class FlashloanStrategy extends FlashLoanReceiverBase {
  constructor(provider, address) {
    super(provider, address);
  }

  /**
   * This function is called after your contract has received the flash loaned amount
   */
  async executeOperation(
    assets,
    amounts,
    premiums,
    initiator,
    params
  ) {
    console.log(\`Flashloan received: \${ethers.utils.formatUnits(amounts[0], {{TOKEN_DECIMALS}})} {{TOKEN_SYMBOL}}\`);
    console.log(\`Fee: \${ethers.utils.formatUnits(premiums[0], {{TOKEN_DECIMALS}})} {{TOKEN_SYMBOL}}\`);
    
    // Get the borrowed amount + fee
    const amountOwed = amounts[0].add(premiums[0]);
    
    try {
      // 1. Execute arbitrage between exchanges
      console.log("Executing arbitrage strategy...");
      
      // Buy token on DEX1 at lower price
      const tokenToBuy = "0x..."; // Target token address
      await this.swapOnDex(
        DEX1_ROUTER,
        TOKEN_ADDRESS,
        tokenToBuy,
        amounts[0]
      );
      
      // Sell token on DEX2 at higher price
      const amountReceived = await this.swapOnDex(
        DEX2_ROUTER,
        tokenToBuy,
        TOKEN_ADDRESS,
        await this.getTokenBalance(tokenToBuy)
      );
      
      // Calculate profit
      const profit = amountReceived.sub(amountOwed);
      console.log(\`Profit: \${ethers.utils.formatUnits(profit, {{TOKEN_DECIMALS}})} {{TOKEN_SYMBOL}}\`);
      
      // 2. Approve the LendingPool contract to pull the owed amount
      await this.approveToken(TOKEN_ADDRESS, LENDING_POOL_ADDRESS, amountOwed);
      
      return true;
    } catch (error) {
      console.error("Error in flashloan execution:", error);
      throw error;
    }
  }
  
  async swapOnDex(routerAddress, tokenIn, tokenOut, amountIn) {
    // Implementation of swap on DEX
    console.log(\`Swapping \${ethers.utils.formatUnits(amountIn, {{TOKEN_DECIMALS}})} on \${routerAddress}\`);
    // Mock implementation - in real scenario, this would call the DEX router
    return amountIn.mul(102).div(100); // Mock 2% profit
  }
  
  async getTokenBalance(tokenAddress) {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function balanceOf(address) view returns (uint256)"],
      this.provider
    );
    return await tokenContract.balanceOf(this.address);
  }
  
  async approveToken(tokenAddress, spender, amount) {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function approve(address, uint256) returns (bool)"],
      this.provider
    );
    return await tokenContract.approve(spender, amount);
  }
}

// How to use:
// 1. Deploy this contract
// 2. Fund it with a small amount of ETH for gas
// 3. Call the flashloan function with the desired parameters`,

    liquidation: `// Aave Flashloan Liquidation Strategy
// Generated by $BLKBOX Flashloan Lab

import { ethers } from "ethers";
import { FlashLoanReceiverBase } from "@aave/protocol-v2";

// Contract addresses
const LENDING_POOL_ADDRESS = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
const TOKEN_ADDRESS = "{{TOKEN_ADDRESS}}";

export class FlashloanStrategy extends FlashLoanReceiverBase {
  constructor(provider, address) {
    super(provider, address);
  }

  /**
   * This function is called after your contract has received the flash loaned amount
   */
  async executeOperation(
    assets,
    amounts,
    premiums,
    initiator,
    params
  ) {
    console.log(\`Flashloan received: \${ethers.utils.formatUnits(amounts[0], {{TOKEN_DECIMALS}})} {{TOKEN_SYMBOL}}\`);
    console.log(\`Fee: \${ethers.utils.formatUnits(premiums[0], {{TOKEN_DECIMALS}})} {{TOKEN_SYMBOL}}\`);
    
    // Get the borrowed amount + fee
    const amountOwed = amounts[0].add(premiums[0]);
    
    try {
      // 1. Execute liquidation strategy
      console.log("Executing liquidation strategy...");
      
      // Find underwater position
      const positionToLiquidate = "0x..."; // Target position
      
      // Execute liquidation
      await this.liquidatePosition(
        positionToLiquidate,
        amounts[0]
      );
      
      // Calculate profit from liquidation bonus
      const liquidationBonus = await this.calculateLiquidationProfit();
      console.log(\`Liquidation bonus: \${ethers.utils.formatUnits(liquidationBonus, {{TOKEN_DECIMALS}})} {{TOKEN_SYMBOL}}\`);
      
      // 2. Approve the LendingPool contract to pull the owed amount
      await this.approveToken(TOKEN_ADDRESS, LENDING_POOL_ADDRESS, amountOwed);
      
      return true;
    } catch (error) {
      console.error("Error in flashloan execution:", error);
      throw error;
    }
  }
  
  async liquidatePosition(positionAddress, amount) {
    // Implementation of liquidation
    console.log(\`Liquidating position \${positionAddress} with \${ethers.utils.formatUnits(amount, {{TOKEN_DECIMALS}})}\`);
    // Mock implementation
  }
  
  async calculateLiquidationProfit() {
    // Mock implementation
    return ethers.BigNumber.from("1500000"); // 1.5 USDC profit
  }
  
  async getTokenBalance(tokenAddress) {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function balanceOf(address) view returns (uint256)"],
      this.provider
    );
    return await tokenContract.balanceOf(this.address);
  }
  
  async approveToken(tokenAddress, spender, amount) {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function approve(address, uint256) returns (bool)"],
      this.provider
    );
    return await tokenContract.approve(spender, amount);
  }
}

// How to use:
// 1. Deploy this contract
// 2. Fund it with a small amount of ETH for gas
// 3. Call the flashloan function with the desired parameters`,
  },
  solend: {
    arbitrage: `// Solend Flashloan Arbitrage Strategy
// Generated by $BLKBOX Flashloan Lab

import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { FlashLoanReceiver } from "@solendprotocol/solend-sdk";

// Constants
const SOLEND_PROGRAM_ID = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo");
const RESERVE_ADDRESS = new PublicKey("{{RESERVE_ADDRESS}}");

export class SolendFlashloanStrategy {
  constructor(connection, wallet) {
    this.connection = connection;
    this.wallet = wallet;
    this.flashLoanReceiver = new FlashLoanReceiver(
      connection,
      SOLEND_PROGRAM_ID,
      wallet
    );
  }

  async executeFlashloan() {
    console.log(\`Executing flashloan for {{AMOUNT}} {{TOKEN_SYMBOL}} on Solend\`);
    
    try {
      // 1. Prepare flashloan parameters
      const amount = {{AMOUNT}} * {{TOKEN_MULTIPLIER}}; // Convert to proper decimals
      
      // 2. Execute flashloan
      const transaction = await this.flashLoanReceiver.createFlashLoanTransaction({
        reservePublicKey: RESERVE_ADDRESS,
        amount,
        // This callback contains the logic to execute during the flashloan
        flashLoanCallback: async (tx, flashLoanContext) => {
          // Execute arbitrage strategy
          console.log("Executing arbitrage between Jupiter and Raydium");
          
          // 1. Swap on Jupiter
          const jupiterSwapInstruction = await this.createJupiterSwapInstruction(
            flashLoanContext.tokenAccountPublicKey,
            amount
          );
          tx.add(jupiterSwapInstruction);
          
          // 2. Swap back on Raydium
          const raydiumSwapInstruction = await this.createRaydiumSwapInstruction();
          tx.add(raydiumSwapInstruction);
          
          return tx;
        }
      });
      
      // 3. Sign and send transaction
      const signature = await this.wallet.sendTransaction(transaction, this.connection);
      console.log("Flashloan executed successfully:", signature);
      
      // 4. Get transaction result
      const result = await this.connection.confirmTransaction(signature);
      return {
        success: true,
        signature,
        profit: "{{PROFIT}} {{TOKEN_SYMBOL}}" // Mock profit
      };
    } catch (error) {
      console.error("Error executing flashloan:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  async createJupiterSwapInstruction(sourceTokenAccount, amount) {
    // Mock implementation - in real scenario, this would call Jupiter API
    console.log(\`Creating Jupiter swap instruction for \${amount / {{TOKEN_MULTIPLIER}}} {{TOKEN_SYMBOL}}\`);
    return new Transaction().add({
      keys: [],
      programId: new PublicKey("JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB")
    });
  }
  
  async createRaydiumSwapInstruction() {
    // Mock implementation
    console.log("Creating Raydium swap instruction");
    return new Transaction().add({
      keys: [],
      programId: new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8")
    });
  }
}

// How to use:
// 1. Create a connection to Solana
// 2. Initialize your wallet
// 3. Create an instance of SolendFlashloanStrategy
// 4. Call executeFlashloan()`,
  },
}

// Function to get token address based on token symbol
const getTokenAddress = (token) => {
  switch (token) {
    case "USDC":
      return "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    case "DAI":
      return "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    case "ETH":
      return "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    case "USDT":
      return "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    case "WBTC":
      return "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
    default:
      return "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" // Default to USDC
  }
}

// Function to get reserve address for Solend based on token symbol
const getSolendReserveAddress = (token) => {
  switch (token) {
    case "USDC":
      return "BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw"
    case "SOL":
      return "8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36"
    case "USDT":
      return "8K9WC8xoh2rtQNY7iEGXtPvfbDCi563SdWhLV8cjWNsD"
    default:
      return "BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw" // Default to USDC
  }
}

// Function to get token decimals
const getTokenDecimals = (token) => {
  const tokenObj = TOKENS.find((t) => t.id === token)
  return tokenObj ? tokenObj.decimals : 6 // Default to 6 decimals
}

// Function to get token multiplier based on decimals
const getTokenMultiplier = (token) => {
  const decimals = getTokenDecimals(token)
  return `1${"0".repeat(decimals)}`
}

export default function FlashloanLabPage() {
  const { connected, tier } = useWallet()
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)
  const [selectedProtocol, setSelectedProtocol] = useState("aave")
  const [selectedStrategy, setSelectedStrategy] = useState("arbitrage")
  const [loanAmount, setLoanAmount] = useState("10000")
  const [loanToken, setLoanToken] = useState("USDC")
  const [customCode, setCustomCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)
  const [simulationResult, setSimulationResult] = useState<any | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>("settings")
  const [savedStrategies, setSavedStrategies] = useState<any[]>([])
  const [executionHistory, setExecutionHistory] = useState<any[]>(MOCK_HISTORY)
  const [advancedSettings, setAdvancedSettings] = useState({
    gasLimit: "500000",
    slippageTolerance: 0.5,
    maxExecutionTime: 30,
    autoRepay: true,
    useFlashbots: false,
    priorityFee: "2",
  })
  const [monitoringStats, setMonitoringStats] = useState({
    activeStrategies: 0,
    totalExecutions: MOCK_HISTORY.length,
    successRate: Math.round((MOCK_HISTORY.filter((h) => h.status === "success").length / MOCK_HISTORY.length) * 100),
    totalProfit: MOCK_HISTORY.reduce((acc, curr) => acc + Number.parseFloat(curr.profit), 0).toFixed(2),
    avgExecutionTime: "1.8s",
    capitalDeployed: "0",
  })
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [strategyName, setStrategyName] = useState("")
  const [strategyDescription, setStrategyDescription] = useState("")
  const [activeExecution, setActiveExecution] = useState<any | null>(null)
  const [executionProgress, setExecutionProgress] = useState(0)
  const [executionLogs, setExecutionLogs] = useState<string[]>([])
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredHistory, setFilteredHistory] = useState(executionHistory)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [sortField, setSortField] = useState<string>("timestamp")
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("medium")
  const [profitEstimate, setProfitEstimate] = useState<string>("0")
  const [showRiskWarning, setShowRiskWarning] = useState(false)

  // Refs for monitoring dashboard connection
  const dashboardConnectionRef = useRef<any>(null)
  const executionIntervalRef = useRef<any>(null)
  const simulationTimeoutRef = useRef<any>(null)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Set initial custom code
        updateCustomCode(selectedProtocol, selectedStrategy, loanAmount, loanToken)

        // Load saved strategies (mock data)
        setSavedStrategies([
          {
            id: "strat-001",
            name: "Uniswap-Sushiswap Arbitrage",
            description: "Arbitrage between Uniswap V3 and Sushiswap",
            protocol: "aave",
            strategy: "arbitrage",
            amount: "25000",
            token: "USDC",
            createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            lastExecuted: new Date(Date.now() - 86400000 * 2).toISOString(),
            successRate: "92%",
            avgProfit: "134.25",
          },
          {
            id: "strat-002",
            name: "Liquidation Hunter",
            description: "Target underwater Aave positions",
            protocol: "aave",
            strategy: "liquidation",
            amount: "50000",
            token: "DAI",
            createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
            lastExecuted: new Date(Date.now() - 86400000 * 3).toISOString(),
            successRate: "78%",
            avgProfit: "312.87",
          },
        ])

        // Calculate profit estimate
        calculateProfitEstimate()

        // Initialize dashboard connection
        initializeDashboardConnection()
      } finally {
        setIsLoading(false)
      }
    }

    loadData()

    // Cleanup function
    return () => {
      if (dashboardConnectionRef.current) {
        clearInterval(dashboardConnectionRef.current)
      }
      if (executionIntervalRef.current) {
        clearInterval(executionIntervalRef.current)
      }
      if (simulationTimeoutRef.current) {
        clearTimeout(simulationTimeoutRef.current)
      }
    }
  }, [])

  // Filter history when search query changes
  useEffect(() => {
    filterAndSortHistory()
  }, [searchQuery, sortOrder, sortField, executionHistory])

  // Initialize connection to dashboard card
  const initializeDashboardConnection = () => {
    // Simulate real-time connection to dashboard card
    dashboardConnectionRef.current = setInterval(() => {
      // Update monitoring stats periodically
      setMonitoringStats((prev) => ({
        ...prev,
        capitalDeployed: activeExecution ? loanAmount : "0",
        activeStrategies: activeExecution ? 1 : 0,
      }))
    }, 5000)
  }

  // Filter and sort history
  const filterAndSortHistory = () => {
    let filtered = [...executionHistory]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.protocol.toLowerCase().includes(query) ||
          item.strategy.toLowerCase().includes(query) ||
          item.token.toLowerCase().includes(query) ||
          item.amount.includes(query) ||
          item.profit.includes(query),
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortField === "timestamp") {
        return sortOrder === "asc"
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      } else if (sortField === "amount") {
        return sortOrder === "asc"
          ? Number.parseFloat(a.amount) - Number.parseFloat(b.amount)
          : Number.parseFloat(b.amount) - Number.parseFloat(a.amount)
      } else if (sortField === "profit") {
        return sortOrder === "asc"
          ? Number.parseFloat(a.profit) - Number.parseFloat(b.profit)
          : Number.parseFloat(b.profit) - Number.parseFloat(a.profit)
      }
      return 0
    })

    setFilteredHistory(filtered)
  }

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  // Handle protocol change
  const handleProtocolChange = (value: string) => {
    setSelectedProtocol(value)
    updateCustomCode(value, selectedStrategy, loanAmount, loanToken)
    calculateProfitEstimate()
  }

  // Handle strategy change
  const handleStrategyChange = (value: string) => {
    setSelectedStrategy(value)
    updateCustomCode(selectedProtocol, value, loanAmount, loanToken)
    calculateProfitEstimate()

    // Show risk warning for high-risk strategies
    const strategy = STRATEGIES.find((s) => s.id === value)
    if (strategy && strategy.risk === "High") {
      setShowRiskWarning(true)
    } else {
      setShowRiskWarning(false)
    }
  }

  // Handle loan amount change
  const handleLoanAmountChange = (value: string) => {
    // Only allow numbers
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setLoanAmount(value)
      updateCustomCode(selectedProtocol, selectedStrategy, value, loanToken)
      calculateProfitEstimate()
    }
  }

  // Handle loan token change
  const handleLoanTokenChange = (value: string) => {
    setLoanToken(value)
    updateCustomCode(selectedProtocol, selectedStrategy, loanAmount, value)
    calculateProfitEstimate()
  }

  // Update custom code based on selections
  const updateCustomCode = (protocol: string, strategy: string, amount: string, token: string) => {
    if (protocol === "custom") {
      setCustomCode(`// Custom flashloan strategy
// Protocol: ${protocol}
// Strategy: ${strategy}
// Amount: ${amount} ${token}

async function executeFlashloan() {
  // Your custom logic here
  
  // 1. Borrow funds from lending protocol
  // 2. Execute ${strategy} strategy
  // 3. Repay loan with fee
  // 4. Keep the profit
}`)
      return
    }

    // Get template code for the selected protocol and strategy
    let templateCode = CODE_TEMPLATES[protocol]?.[strategy]

    if (!templateCode) {
      // Fallback to arbitrage if the specific strategy doesn't exist
      templateCode = CODE_TEMPLATES[protocol]?.arbitrage || ""
    }

    // Replace placeholders with actual values
    const tokenAddress = getTokenAddress(token)
    const reserveAddress = getSolendReserveAddress(token)
    const tokenDecimals = getTokenDecimals(token)
    const tokenMultiplier = getTokenMultiplier(token)
    const profit = (Number.parseFloat(amount) * 0.02).toFixed(2) // Mock 2% profit

    const code = templateCode
      .replace(/{{TOKEN_ADDRESS}}/g, tokenAddress)
      .replace(/{{RESERVE_ADDRESS}}/g, reserveAddress)
      .replace(/{{TOKEN_DECIMALS}}/g, tokenDecimals.toString())
      .replace(/{{TOKEN_SYMBOL}}/g, token)
      .replace(/{{AMOUNT}}/g, amount)
      .replace(/{{TOKEN_MULTIPLIER}}/g, tokenMultiplier)
      .replace(/{{PROFIT}}/g, profit)

    setCustomCode(code)
  }

  // Calculate estimated profit based on current settings
  const calculateProfitEstimate = () => {
    const amount = Number.parseFloat(loanAmount) || 0
    let profitPercentage = 0

    // Base profit percentage on strategy and protocol
    if (selectedStrategy === "arbitrage") {
      profitPercentage = 0.01 + Math.random() * 0.02 // 1-3%
    } else if (selectedStrategy === "liquidation") {
      profitPercentage = 0.05 + Math.random() * 0.1 // 5-15%
    } else if (selectedStrategy === "collateral_swap") {
      profitPercentage = 0.005 + Math.random() * 0.015 // 0.5-2%
    } else {
      profitPercentage = 0.01 + Math.random() * 0.01 // 1-2%
    }

    // Adjust based on risk level
    if (riskLevel === "high") {
      profitPercentage *= 1.5
    } else if (riskLevel === "low") {
      profitPercentage *= 0.7
    }

    // Calculate estimated profit
    const profit = amount * profitPercentage
    setProfitEstimate(profit.toFixed(2))
  }

  // Generate flashloan code
  const generateFlashloanCode = async () => {
    if (isGenerating) return

    setIsGenerating(true)
    setGeneratedCode(null)
    setSimulationResult(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Set generated code
      setGeneratedCode(customCode)

      // Show success message
      setExecutionLogs((prev) => [...prev, "Code generation successful"])
    } catch (error) {
      console.error("Error generating flashloan code:", error)
      setExecutionLogs((prev) => [...prev, `Error generating code: ${error.message}`])
    } finally {
      setIsGenerating(false)
    }
  }

  // Simulate flashloan execution
  const simulateFlashloan = async () => {
    if (isSimulating || !generatedCode) return

    setIsSimulating(true)
    setSimulationResult(null)
    setExecutionProgress(0)
    setExecutionLogs([
      `Starting simulation for ${loanAmount} ${loanToken} flashloan using ${selectedProtocol} protocol`,
    ])

    try {
      // Simulate execution steps with progress updates
      setExecutionProgress(10)
      setExecutionLogs((prev) => [...prev, `Initializing ${selectedProtocol} flashloan contract`])
      await new Promise((resolve) => setTimeout(resolve, 500))

      setExecutionProgress(20)
      setExecutionLogs((prev) => [...prev, `Preparing ${selectedStrategy} strategy parameters`])
      await new Promise((resolve) => setTimeout(resolve, 700))

      setExecutionProgress(30)
      setExecutionLogs((prev) => [...prev, `Calculating gas costs and execution path`])
      await new Promise((resolve) => setTimeout(resolve, 600))

      setExecutionProgress(40)
      setExecutionLogs((prev) => [...prev, `Requesting ${loanAmount} ${loanToken} from lending pool`])
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Simulate potential failure based on risk level and random chance
      const failureChance = riskLevel === "high" ? 0.2 : riskLevel === "medium" ? 0.1 : 0.05
      const willFail = Math.random() < failureChance

      if (willFail) {
        setExecutionProgress(60)
        setExecutionLogs((prev) => [...prev, `ERROR: Insufficient liquidity in target pool`])
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate failure result
        setSimulationResult({
          success: false,
          error: "Insufficient liquidity in target pool",
          executionTime: Math.floor(Math.random() * 2000 + 1000),
          gasUsed: Math.floor(Math.random() * 300000 + 200000),
        })
      } else {
        // Continue successful execution
        setExecutionProgress(60)
        if (selectedStrategy === "arbitrage") {
          setExecutionLogs((prev) => [...prev, `Executing arbitrage between exchanges`])
        } else if (selectedStrategy === "liquidation") {
          setExecutionLogs((prev) => [...prev, `Executing liquidation of underwater position`])
        } else {
          setExecutionLogs((prev) => [...prev, `Executing ${selectedStrategy} strategy`])
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setExecutionProgress(80)
        setExecutionLogs((prev) => [...prev, `Repaying flashloan with fee`])
        await new Promise((resolve) => setTimeout(resolve, 700))

        setExecutionProgress(90)
        const profit = Number.parseFloat(profitEstimate)
        setExecutionLogs((prev) => [...prev, `Profit secured: $${profit.toFixed(2)}`])
        await new Promise((resolve) => setTimeout(resolve, 500))

        setExecutionProgress(100)
        setExecutionLogs((prev) => [...prev, `Simulation completed successfully`])

        // Generate simulation result
        const fee = Number.parseFloat(loanAmount) * (selectedProtocol === "aave" ? 0.0009 : 0.0005)

        setSimulationResult({
          success: true,
          profit: profit.toFixed(2),
          fee: fee.toFixed(2),
          netProfit: (profit - fee).toFixed(2),
          executionTime: Math.floor(Math.random() * 3000 + 1000),
          gasUsed: Math.floor(Math.random() * 500000 + 200000),
          transactions: [
            {
              type: "flashloan",
              amount: loanAmount,
              token: loanToken,
              status: "success",
            },
            {
              type: selectedStrategy,
              amount: (Number.parseFloat(loanAmount) * 1.02).toFixed(2),
              token: loanToken,
              status: "success",
            },
            {
              type: "repayment",
              amount: (Number.parseFloat(loanAmount) * (1 + (selectedProtocol === "aave" ? 0.0009 : 0.0005))).toFixed(
                2,
              ),
              token: loanToken,
              status: "success",
            },
          ],
          riskAnalysis: {
            slippage: (Math.random() * 0.5 + 0.1).toFixed(2) + "%",
            frontrunningRisk: riskLevel === "high" ? "High" : riskLevel === "medium" ? "Medium" : "Low",
            mevExposure: riskLevel === "high" ? "Significant" : riskLevel === "medium" ? "Moderate" : "Minimal",
            gasOptimization: Math.floor(Math.random() * 30 + 70) + "%",
          },
        })
      }
    } catch (error) {
      console.error("Error simulating flashloan:", error)
      setExecutionLogs((prev) => [...prev, `Error during simulation: ${error.message}`])
      setSimulationResult({
        success: false,
        error: error.message,
      })
    } finally {
      setIsSimulating(false)
    }
  }

  // Execute flashloan on-chain
  const executeFlashloan = async () => {
    if (isExecuting || !generatedCode || !simulationResult?.success) return

    setIsExecuting(true)
    setActiveExecution({
      protocol: selectedProtocol,
      strategy: selectedStrategy,
      amount: loanAmount,
      token: loanToken,
      startTime: new Date().toISOString(),
    })
    setExecutionProgress(0)
    setExecutionLogs([`Starting execution of ${loanAmount} ${loanToken} flashloan on ${selectedProtocol}`])

    try {
      // Simulate real execution with progress updates
      executionIntervalRef.current = setInterval(() => {
        setExecutionProgress((prev) => {
          if (prev >= 95) {
            clearInterval(executionIntervalRef.current)
            return prev
          }
          return prev + Math.floor(Math.random() * 5 + 1)
        })
      }, 500)

      // Add execution logs
      setExecutionLogs((prev) => [...prev, `Connecting to ${selectedProtocol} protocol`])
      await new Promise((resolve) => setTimeout(resolve, 800))

      setExecutionLogs((prev) => [...prev, `Preparing transaction with gas price ${advancedSettings.priorityFee} gwei`])
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setExecutionLogs((prev) => [...prev, `Sending transaction to blockchain...`])
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setExecutionLogs((prev) => [...prev, `Transaction confirmed! Executing flashloan strategy...`])
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful execution
      clearInterval(executionIntervalRef.current)
      setExecutionProgress(100)

      const profit = Number.parseFloat(profitEstimate)
      const txHash =
        "0x" + Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("")

      setExecutionLogs((prev) => [
        ...prev,
        `Strategy execution complete`,
        `Profit secured: $${profit.toFixed(2)}`,
        `Transaction hash: ${txHash}`,
      ])

      // Add to execution history
      const newHistoryItem = {
        id: `fl-${executionHistory.length + 1}`.padStart(6, "0"),
        timestamp: new Date().toISOString(),
        protocol: selectedProtocol,
        strategy: selectedStrategy,
        amount: loanAmount,
        token: loanToken,
        profit: profit.toFixed(2),
        status: "success",
        txHash,
      }

      setExecutionHistory((prev) => [newHistoryItem, ...prev])

      // Update monitoring stats
      setMonitoringStats((prev) => ({
        ...prev,
        totalExecutions: prev.totalExecutions + 1,
        successRate: Math.round(
          ((prev.totalExecutions * (prev.successRate / 100) + 1) / (prev.totalExecutions + 1)) * 100,
        ),
        totalProfit: (Number.parseFloat(prev.totalProfit) + profit).toFixed(2),
      }))
    } catch (error) {
      console.error("Error executing flashloan:", error)
      setExecutionLogs((prev) => [...prev, `Error during execution: ${error.message}`])

      // Add failed execution to history
      const newHistoryItem = {
        id: `fl-${executionHistory.length + 1}`.padStart(6, "0"),
        timestamp: new Date().toISOString(),
        protocol: selectedProtocol,
        strategy: selectedStrategy,
        amount: loanAmount,
        token: loanToken,
        profit: "0",
        status: "failed",
        txHash: "",
        error: error.message,
      }

      setExecutionHistory((prev) => [newHistoryItem, ...prev])

      // Update monitoring stats
      setMonitoringStats((prev) => ({
        ...prev,
        totalExecutions: prev.totalExecutions + 1,
        successRate: Math.round(((prev.totalExecutions * (prev.successRate / 100)) / (prev.totalExecutions + 1)) * 100),
      }))
    } finally {
      setIsExecuting(false)
      setActiveExecution(null)
    }
  }

  // Save strategy
  const saveStrategy = () => {
    if (!strategyName) return

    const newStrategy = {
      id: `strat-${savedStrategies.length + 1}`.padStart(6, "0"),
      name: strategyName,
      description: strategyDescription,
      protocol: selectedProtocol,
      strategy: selectedStrategy,
      amount: loanAmount,
      token: loanToken,
      createdAt: new Date().toISOString(),
      lastExecuted: null,
      successRate: "0%",
      avgProfit: "0",
      code: customCode,
    }

    setSavedStrategies((prev) => [newStrategy, ...prev])
    setShowSaveDialog(false)
    setStrategyName("")
    setStrategyDescription("")

    setExecutionLogs((prev) => [...prev, `Strategy "${strategyName}" saved successfully`])
  }

  // Load saved strategy
  const loadStrategy = (strategy: any) => {
    setSelectedProtocol(strategy.protocol)
    setSelectedStrategy(strategy.strategy)
    setLoanAmount(strategy.amount)
    setLoanToken(strategy.token)

    if (strategy.code) {
      setCustomCode(strategy.code)
    } else {
      updateCustomCode(strategy.protocol, strategy.strategy, strategy.amount, strategy.token)
    }

    calculateProfitEstimate()
    setExecutionLogs((prev) => [...prev, `Strategy "${strategy.name}" loaded`])
  }

  // Delete saved strategy
  const deleteStrategy = (id: string) => {
    setSavedStrategies((prev) => prev.filter((s) => s.id !== id))
    setExecutionLogs((prev) => [...prev, `Strategy deleted`])
  }

  // View history item details
  const viewHistoryDetails = (item: any) => {
    setSelectedHistoryItem(item)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Get protocol details
  const getProtocolDetails = (protocolId: string) => {
    return PROTOCOLS.find((p) => p.id === protocolId) || PROTOCOLS[0]
  }

  // Get strategy details
  const getStrategyDetails = (strategyId: string) => {
    return STRATEGIES.find((s) => s.id === strategyId) || STRATEGIES[0]
  }

  // Get token details
  const getTokenDetails = (tokenId: string) => {
    return TOKENS.find((t) => t.id === tokenId) || TOKENS[0]
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-neon-pink/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_DASHBOARD</span>
          </Link>

          <WalletConnector buttonSize="sm" glowColor="cyan" />
        </div>
      </header>

      <main className="flex-1 container py-12">
        <TierGate requiredTier="PHANTOM_COUNCIL">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <GlitchText
                text="FLASHLOAN LAB"
                className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
              />
              <p className="text-neon-cyan font-tech-mono">CREATE AND TEST FLASHLOAN STRATEGIES</p>
              <DataPulse className="my-6" />
            </div>

            {showRiskWarning && (
              <Alert className="mb-6 bg-black/60 border-red-500">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertTitle className="text-red-500">High Risk Strategy</AlertTitle>
                <AlertDescription className="text-zinc-400">
                  The selected strategy carries significant risk. Ensure you understand the potential for loss before
                  execution.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <CyberCard className="bg-black/60 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-neon-pink/10">
                      <Lightbulb className="h-6 w-6 text-neon-pink" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neon-pink">Strategy Builder</h3>
                      <p className="text-zinc-400 font-tech-mono text-sm">Create flashloan strategies</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-tech-mono text-neon-cyan">Protocol</label>
                      <Select value={selectedProtocol} onValueChange={handleProtocolChange}>
                        <SelectTrigger className="bg-black border-zinc-800">
                          <SelectValue placeholder="Select protocol" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-zinc-800">
                          {PROTOCOLS.map((protocol) => (
                            <SelectItem key={protocol.id} value={protocol.id}>
                              {protocol.name} ({protocol.network})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-zinc-500 mt-1">{getProtocolDetails(selectedProtocol).description}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-tech-mono text-neon-cyan">Strategy Type</label>
                      <Select value={selectedStrategy} onValueChange={handleStrategyChange}>
                        <SelectTrigger className="bg-black border-zinc-800">
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-zinc-800">
                          {STRATEGIES.map((strategy) => (
                            <SelectItem key={strategy.id} value={strategy.id}>
                              {strategy.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex justify-between text-xs text-zinc-500 mt-1">
                        <span>Complexity: {getStrategyDetails(selectedStrategy).complexity}</span>
                        <span>Risk: {getStrategyDetails(selectedStrategy).risk}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-tech-mono text-neon-cyan">Loan Amount</label>
                        <Input
                          type="text"
                          value={loanAmount}
                          onChange={(e) => handleLoanAmountChange(e.target.value)}
                          className="bg-black border-zinc-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-tech-mono text-neon-cyan">Token</label>
                        <Select value={loanToken} onValueChange={handleLoanTokenChange}>
                          <SelectTrigger className="bg-black border-zinc-800">
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-zinc-800">
                            {TOKENS.map((token) => (
                              <SelectItem key={token.id} value={token.id}>
                                {token.icon} {token.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-tech-mono text-neon-cyan">Risk Level</label>
                        <Badge
                          variant="outline"
                          className={`
                          ${
                            riskLevel === "low"
                              ? "bg-green-500/20 text-green-500"
                              : riskLevel === "medium"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-red-500/20 text-red-500"
                          }
                        `}
                        >
                          {riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          className={`px-3 py-1 rounded text-xs font-tech-mono ${riskLevel === "low" ? "bg-green-500/20 text-green-500" : "bg-black border border-zinc-800 text-zinc-400"}`}
                          onClick={() => setRiskLevel("low")}
                        >
                          LOW
                        </button>
                        <button
                          className={`px-3 py-1 rounded text-xs font-tech-mono ${riskLevel === "medium" ? "bg-yellow-500/20 text-yellow-500" : "bg-black border border-zinc-800 text-zinc-400"}`}
                          onClick={() => setRiskLevel("medium")}
                        >
                          MEDIUM
                        </button>
                        <button
                          className={`px-3 py-1 rounded text-xs font-tech-mono ${riskLevel === "high" ? "bg-red-500/20 text-red-500" : "bg-black border border-zinc-800 text-zinc-400"}`}
                          onClick={() => setRiskLevel("high")}
                        >
                          HIGH
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-tech-mono text-neon-cyan">Estimated Profit</span>
                        <span className="text-lg font-bold text-neon-pink">${profitEstimate}</span>
                      </div>
                      <p className="text-xs text-zinc-500">
                        Based on current market conditions and historical performance
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                        className="text-xs text-neon-cyan hover:text-neon-pink transition-colors"
                      >
                        {showAdvancedSettings ? "Hide Advanced Settings" : "Show Advanced Settings"}
                      </button>

                      <div className="flex gap-2">
                        <CyberButton
                          onClick={() => setShowSaveDialog(true)}
                          variant="outline"
                          size="sm"
                          glowColor="cyan"
                        >
                          <Save className="h-4 w-4 mr-1" /> SAVE
                        </CyberButton>

                        <CyberButton onClick={generateFlashloanCode} disabled={isGenerating} glowColor="cyan" size="sm">
                          {isGenerating ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-1 animate-spin" /> GENERATING...
                            </>
                          ) : (
                            <>
                              <Code className="h-4 w-4 mr-1" /> GENERATE
                            </>
                          )}
                        </CyberButton>
                      </div>
                    </div>
                  </div>
                </CyberCard>

                {showAdvancedSettings && (
                  <CyberCard className="bg-black/60 mb-6">
                    <h3 className="text-lg font-bold text-neon-cyan mb-4">Advanced Settings</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-tech-mono text-zinc-400">Gas Limit</label>
                          <span className="text-sm text-zinc-500">{advancedSettings.gasLimit}</span>
                        </div>
                        <Input
                          type="text"
                          value={advancedSettings.gasLimit}
                          onChange={(e) => setAdvancedSettings({ ...advancedSettings, gasLimit: e.target.value })}
                          className="bg-black border-zinc-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-tech-mono text-zinc-400">Slippage Tolerance</label>
                          <span className="text-sm text-zinc-500">{advancedSettings.slippageTolerance}%</span>
                        </div>
                        <Slider
                          value={[advancedSettings.slippageTolerance]}
                          min={0.1}
                          max={5}
                          step={0.1}
                          onValueChange={(value) =>
                            setAdvancedSettings({ ...advancedSettings, slippageTolerance: value[0] })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-tech-mono text-zinc-400">Max Execution Time (sec)</label>
                          <span className="text-sm text-zinc-500">{advancedSettings.maxExecutionTime}s</span>
                        </div>
                        <Slider
                          value={[advancedSettings.maxExecutionTime]}
                          min={10}
                          max={60}
                          step={5}
                          onValueChange={(value) =>
                            setAdvancedSettings({ ...advancedSettings, maxExecutionTime: value[0] })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-tech-mono text-zinc-400">Priority Fee (gwei)</label>
                          <span className="text-sm font-tech-mono text-zinc-500">{advancedSettings.priorityFee}</span>
                        </div>
                        <Input
                          type="text"
                          value={advancedSettings.priorityFee}
                          onChange={(e) => setAdvancedSettings({ ...advancedSettings, priorityFee: e.target.value })}
                          className="bg-black border-zinc-800"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <label className="text-sm font-tech-mono text-zinc-400">Auto-Repay</label>
                          <span className="text-xs text-zinc-500">Automatically repay flashloan</span>
                        </div>
                        <Switch
                          checked={advancedSettings.autoRepay}
                          onCheckedChange={(checked) =>
                            setAdvancedSettings({ ...advancedSettings, autoRepay: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <label className="text-sm font-tech-mono text-zinc-400">Use Flashbots</label>
                          <span className="text-xs text-zinc-500">Private transaction routing</span>
                        </div>
                        <Switch
                          checked={advancedSettings.useFlashbots}
                          onCheckedChange={(checked) =>
                            setAdvancedSettings({ ...advancedSettings, useFlashbots: checked })
                          }
                        />
                      </div>
                    </div>
                  </CyberCard>
                )}
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="code" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="code" className="font-tech-mono">
                      CODE
                    </TabsTrigger>
                    <TabsTrigger value="simulation" className="font-tech-mono">
                      SIMULATION
                    </TabsTrigger>
                    <TabsTrigger value="history" className="font-tech-mono">
                      HISTORY
                    </TabsTrigger>
                    <TabsTrigger value="saved" className="font-tech-mono">
                      SAVED
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="code">
                    <CyberCard className="bg-black/60 min-h-[500px]">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <RefreshCw className="h-8 w-8 text-neon-cyan animate-spin mb-4" />
                          <p className="text-zinc-400 font-tech-mono">Loading flashloan lab...</p>
                        </div>
                      ) : generatedCode ? (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-neon-pink">Generated Code</h3>
                            <div className="flex gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button className="p-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors">
                                      <Copy className="h-4 w-4 text-zinc-400" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Copy code</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button className="p-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors">
                                      <FileCode className="h-4 w-4 text-zinc-400" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Export as file</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>

                          <TerminalCode code={generatedCode} />

                          <div className="flex justify-end mt-6 gap-2">
                            <CyberButton
                              variant="outline"
                              size="sm"
                              glowColor="cyan"
                              onClick={simulateFlashloan}
                              disabled={isSimulating}
                            >
                              {isSimulating ? (
                                <>
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> SIMULATING...
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" /> SIMULATE
                                </>
                              )}
                            </CyberButton>

                            <CyberButton
                              size="sm"
                              glowColor="pink"
                              disabled={!simulationResult?.success || isExecuting}
                              onClick={executeFlashloan}
                            >
                              {isExecuting ? (
                                <>
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> EXECUTING...
                                </>
                              ) : (
                                <>
                                  <Zap className="h-4 w-4 mr-2" /> EXECUTE LIVE
                                </>
                              )}
                            </CyberButton>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Code className="h-12 w-12 text-zinc-500 mb-4" />
                          <p className="text-zinc-400 font-tech-mono mb-2">No code generated yet</p>
                          <p className="text-zinc-500 text-sm text-center max-w-md">
                            Configure your flashloan parameters and click "Generate Code" to create a strategy
                          </p>
                        </div>
                      )}
                    </CyberCard>
                  </TabsContent>

                  <TabsContent value="simulation">
                    <CyberCard className="bg-black/60 min-h-[500px]">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <RefreshCw className="h-8 w-8 text-neon-cyan animate-spin mb-4" />
                          <p className="text-zinc-400 font-tech-mono">Loading simulation engine...</p>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-bold text-neon-pink mb-4">Execution Status</h3>

                            {(isSimulating || isExecuting || executionProgress > 0) && (
                              <div className="mb-6">
                                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                                  <span>Progress</span>
                                  <span>{executionProgress}%</span>
                                </div>
                                <Progress value={executionProgress} className="h-2" />
                              </div>
                            )}

                            <div className="border border-zinc-800 rounded-md bg-black/40 p-4 h-[300px] overflow-y-auto font-mono text-xs">
                              {executionLogs.length > 0 ? (
                                executionLogs.map((log, index) => (
                                  <div
                                    key={index}
                                    className={`mb-1 ${
                                      log.startsWith("ERROR")
                                        ? "text-red-500"
                                        : log.includes("Profit")
                                          ? "text-green-500"
                                          : "text-zinc-400"
                                    }`}
                                  >
                                    <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span> {log}
                                  </div>
                                ))
                              ) : (
                                <div className="text-zinc-600 italic">Execution logs will appear here...</div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-neon-cyan mb-4">Simulation Results</h3>

                            {simulationResult ? (
                              <div>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                  <div className="p-4 border border-zinc-800 rounded-md">
                                    <p className="text-xs text-zinc-400 font-tech-mono">Status</p>
                                    <p
                                      className={`text-xl font-bold ${simulationResult.success ? "text-green-500" : "text-red-500"}`}
                                    >
                                      {simulationResult.success ? "SUCCESS" : "FAILED"}
                                    </p>
                                    {!simulationResult.success && simulationResult.error && (
                                      <p className="text-xs text-red-500 mt-1">{simulationResult.error}</p>
                                    )}
                                  </div>

                                  {simulationResult.success && (
                                    <div className="p-4 border border-zinc-800 rounded-md">
                                      <p className="text-xs text-zinc-400 font-tech-mono">Net Profit</p>
                                      <p className="text-xl font-bold text-green-500">${simulationResult.netProfit}</p>
                                      <div className="flex justify-between text-xs text-zinc-500 mt-1">
                                        <span>Gross: ${simulationResult.profit}</span>
                                        <span>Fee: ${simulationResult.fee}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {simulationResult.success && (
                                  <>
                                    <h4 className="text-sm font-bold text-neon-cyan mb-2">Transaction Flow</h4>
                                    <div className="space-y-2 mb-6">
                                      {simulationResult.transactions.map((tx: any, index: number) => (
                                        <div key={index} className="p-3 border border-zinc-800 rounded-md">
                                          <div className="flex justify-between items-center">
                                            <div>
                                              <p className="text-sm font-bold text-white capitalize">{tx.type}</p>
                                              <p className="text-xs text-zinc-400 font-tech-mono">
                                                {tx.amount} {tx.token}
                                              </p>
                                            </div>
                                            <div
                                              className={`text-xs font-tech-mono ${tx.status === "success" ? "text-green-500" : "text-red-500"}`}
                                            >
                                              {tx.status.toUpperCase()}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    <h4 className="text-sm font-bold text-neon-cyan mb-2">Risk Analysis</h4>
                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                      <div className="p-3 border border-zinc-800 rounded-md">
                                        <p className="text-xs text-zinc-400 font-tech-mono">Slippage</p>
                                        <p className="text-sm font-tech-mono text-white">
                                          {simulationResult.riskAnalysis.slippage}
                                        </p>
                                      </div>
                                      <div className="p-3 border border-zinc-800 rounded-md">
                                        <p className="text-xs text-zinc-400 font-tech-mono">Frontrunning Risk</p>
                                        <p className="text-sm font-tech-mono text-white">
                                          {simulationResult.riskAnalysis.frontrunningRisk}
                                        </p>
                                      </div>
                                      <div className="p-3 border border-zinc-800 rounded-md">
                                        <p className="text-xs text-zinc-400 font-tech-mono">MEV Exposure</p>
                                        <p className="text-sm font-tech-mono text-white">
                                          {simulationResult.riskAnalysis.mevExposure}
                                        </p>
                                      </div>
                                      <div className="p-3 border border-zinc-800 rounded-md">
                                        <p className="text-xs text-zinc-400 font-tech-mono">Gas Optimization</p>
                                        <p className="text-sm font-tech-mono text-white">
                                          {simulationResult.riskAnalysis.gasOptimization}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-12">
                                <Play className="h-12 w-12 text-zinc-500 mb-4" />
                                <p className="text-zinc-400 font-tech-mono mb-2">No simulation results yet</p>
                                <p className="text-zinc-500 text-sm text-center max-w-md">
                                  Generate a flashloan strategy first, then click "Simulate" to run a simulation
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CyberCard>
                  </TabsContent>

                  <TabsContent value="history">
                    <CyberCard className="bg-black/60 min-h-[500px]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-neon-pink">Execution History</h3>
                        <div className="flex gap-2">
                          <CyberButton variant="outline" size="sm" glowColor="cyan" className="h-8 px-2">
                            <RefreshCw className="h-4 w-4" />
                          </CyberButton>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center h-[440px]">
                        <Code className="h-12 w-12 text-zinc-500 mb-4" />
                        <p className="text-zinc-400 font-tech-mono mb-2">No execution history yet</p>
                        <p className="text-zinc-500 text-sm text-center max-w-md">
                          Your executed flashloan strategies will appear here
                        </p>
                      </div>
                    </CyberCard>
                  </TabsContent>

                  <TabsContent value="saved">
                    <CyberCard className="bg-black/60 min-h-[500px]">
                      <div className="flex flex-col items-center justify-center py-12">
                        <Code className="h-12 w-12 text-zinc-500 mb-4" />
                        <p className="text-zinc-400 font-tech-mono mb-2">No saved strategies</p>
                        <p className="text-zinc-500 text-sm text-center max-w-md">
                          Your saved flashloan strategies will appear here
                        </p>
                      </div>
                    </CyberCard>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </TierGate>
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
