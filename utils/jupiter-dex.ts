import { type Connection, type PublicKey, type Transaction, TransactionInstruction } from "@solana/web3.js"
import { enhancedRpc } from "./rpc-connection"
import { TransactionBuilder } from "./transaction-framework"

/**
 * Interface for swap parameters
 */
export interface JupiterSwapParams {
  inputMint: string
  outputMint: string
  amount: number
  slippageBps: number
  onlyDirectRoutes?: boolean
  asLegacyTransaction?: boolean
  maxAccounts?: number
}

/**
 * Interface for swap quote
 */
export interface JupiterSwapQuote {
  inAmount: number
  outAmount: number
  priceImpactPct: number
  marketInfos: any[]
  routePlan: any[]
  slippageBps: number
  otherAmountThreshold: string
  swapMode: string
}

/**
 * Jupiter DEX integration for optimal token swaps
 */
export class JupiterDex {
  private connection: Connection
  private jupiterApiUrl = "https://quote-api.jup.ag/v6"

  /**
   * Create a new Jupiter DEX instance
   * @param connection - Solana connection
   */
  constructor(connection?: Connection) {
    this.connection = connection || enhancedRpc.getConnection()
  }

  /**
   * Get swap quote from Jupiter
   * @param params - Swap parameters
   * @returns Swap quote
   */
  async getSwapQuote(params: JupiterSwapParams): Promise<JupiterSwapQuote> {
    try {
      const { inputMint, outputMint, amount, slippageBps, onlyDirectRoutes, maxAccounts } = params

      // Build query parameters
      const queryParams = new URLSearchParams({
        inputMint,
        outputMint,
        amount: amount.toString(),
        slippageBps: slippageBps.toString(),
        onlyDirectRoutes: onlyDirectRoutes ? "true" : "false",
      })

      if (maxAccounts) {
        queryParams.append("maxAccounts", maxAccounts.toString())
      }

      // Fetch quote from Jupiter API
      const response = await fetch(`${this.jupiterApiUrl}/quote?${queryParams}`)

      if (!response.ok) {
        throw new Error(`Jupiter API error: ${response.status} ${response.statusText}`)
      }

      const quoteResponse = await response.json()
      return quoteResponse as JupiterSwapQuote
    } catch (error) {
      console.error("Error getting Jupiter swap quote:", error)
      throw new Error(`Failed to get swap quote: ${error.message}`)
    }
  }

  /**
   * Get swap instructions from Jupiter
   * @param quoteResponse - Swap quote response
   * @param userPublicKey - User's public key
   * @param asLegacyTransaction - Whether to use legacy transaction
   * @returns Transaction instructions
   */
  async getSwapInstructions(
    quoteResponse: JupiterSwapQuote,
    userPublicKey: PublicKey,
    asLegacyTransaction = false,
  ): Promise<{
    setupInstructions: TransactionInstruction[]
    swapInstruction: TransactionInstruction
    cleanupInstruction: TransactionInstruction
    addressLookupTableAddresses: string[]
  }> {
    try {
      const response = await fetch(`${this.jupiterApiUrl}/swap-instructions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse,
          userPublicKey: userPublicKey.toString(),
          asLegacyTransaction,
        }),
      })

      if (!response.ok) {
        throw new Error(`Jupiter API error: ${response.status} ${response.statusText}`)
      }

      const swapInstructionsResponse = await response.json()

      // Parse instructions
      const setupInstructions = swapInstructionsResponse.setupInstructions.map((ix: any) =>
        TransactionInstruction.from(ix),
      )
      const swapInstruction = TransactionInstruction.from(swapInstructionsResponse.swapInstruction)
      const cleanupInstruction = TransactionInstruction.from(swapInstructionsResponse.cleanupInstruction)
      const addressLookupTableAddresses = swapInstructionsResponse.addressLookupTableAddresses || []

      return {
        setupInstructions,
        swapInstruction,
        cleanupInstruction,
        addressLookupTableAddresses,
      }
    } catch (error) {
      console.error("Error getting Jupiter swap instructions:", error)
      throw new Error(`Failed to get swap instructions: ${error.message}`)
    }
  }

  /**
   * Create a swap transaction
   * @param quote - Swap quote
   * @param userPublicKey - User's public key
   * @param asLegacyTransaction - Whether to use legacy transaction
   * @returns Transaction builder
   */
  async createSwapTransaction(
    quote: JupiterSwapQuote,
    userPublicKey: PublicKey,
    asLegacyTransaction = false,
  ): Promise<TransactionBuilder> {
    try {
      // Get swap instructions
      const { setupInstructions, swapInstruction, cleanupInstruction } = await this.getSwapInstructions(
        quote,
        userPublicKey,
        asLegacyTransaction,
      )

      // Create transaction builder
      const txBuilder = new TransactionBuilder(this.connection)
        .setFeePayer(userPublicKey)
        .addInstructions(setupInstructions)
        .addInstruction(swapInstruction)
        .addInstruction(cleanupInstruction)

      return txBuilder
    } catch (error) {
      console.error("Error creating Jupiter swap transaction:", error)
      throw new Error(`Failed to create swap transaction: ${error.message}`)
    }
  }

  /**
   * Get supported input tokens
   * @returns Array of token mints
   */
  async getSupportedInputTokens(): Promise<string[]> {
    try {
      const response = await fetch(`${this.jupiterApiUrl}/tokens`)

      if (!response.ok) {
        throw new Error(`Jupiter API error: ${response.status} ${response.statusText}`)
      }

      const tokens = await response.json()
      return tokens.map((token: any) => token.address)
    } catch (error) {
      console.error("Error getting supported tokens:", error)
      throw new Error(`Failed to get supported tokens: ${error.message}`)
    }
  }

  /**
   * Get price for a token pair
   * @param inputMint - Input token mint
   * @param outputMint - Output token mint
   * @returns Price
   */
  async getPrice(inputMint: string, outputMint: string): Promise<number> {
    try {
      const response = await fetch(`${this.jupiterApiUrl}/price?inputMint=${inputMint}&outputMint=${outputMint}`)

      if (!response.ok) {
        throw new Error(`Jupiter API error: ${response.status} ${response.statusText}`)
      }

      const priceData = await response.json()
      return priceData.price
    } catch (error) {
      console.error("Error getting token price:", error)
      throw new Error(`Failed to get token price: ${error.message}`)
    }
  }

  /**
   * Execute a token swap
   * @param params - Swap parameters
   * @param userPublicKey - User's public key
   * @param signTransaction - Function to sign transaction
   * @returns Transaction signature
   */
  async executeSwap(
    params: JupiterSwapParams,
    userPublicKey: PublicKey,
    signTransaction: (transaction: Transaction) => Promise<Transaction>,
  ): Promise<string> {
    try {
      // Get swap quote
      const quote = await this.getSwapQuote(params)

      // Create swap transaction
      const txBuilder = await this.createSwapTransaction(quote, userPublicKey, params.asLegacyTransaction || false)

      // Build transaction
      const transaction = await txBuilder.buildLegacyTransaction()

      // Sign transaction
      const signedTransaction = await signTransaction(transaction)

      // Send transaction
      const signature = await this.connection.sendRawTransaction(signedTransaction.serialize())

      // Confirm transaction
      await this.connection.confirmTransaction(signature)

      return signature
    } catch (error) {
      console.error("Error executing Jupiter swap:", error)
      throw new Error(`Failed to execute swap: ${error.message}`)
    }
  }
}

// Export a singleton instance for app-wide use
export const jupiterDex = new JupiterDex()
