import { Connection, clusterApiUrl } from "@solana/web3.js"

// Define the RPC endpoints we'll use
const ENDPOINTS = {
  MAINNET: process.env.NEXT_PUBLIC_QUICKNODE_RPC || clusterApiUrl("mainnet-beta"),
  DEVNET: clusterApiUrl("devnet"),
  TESTNET: clusterApiUrl("testnet"),
}

// Connection options for better performance
const CONNECTION_OPTIONS = {
  commitment: "confirmed",
  disableRetryOnRateLimit: false,
  confirmTransactionInitialTimeout: 60000,
}

/**
 * Creates and returns a Solana connection with the specified endpoint
 * @param endpoint - The RPC endpoint to connect to
 * @returns A Solana Connection instance
 */
export function createConnection(endpoint: string = ENDPOINTS.MAINNET): Connection {
  return new Connection(endpoint, CONNECTION_OPTIONS)
}

/**
 * Gets the current connection based on the environment
 * @param useMainnet - Whether to use mainnet or devnet
 * @returns A Solana Connection instance
 */
export function getConnection(useMainnet = true): Connection {
  const endpoint = useMainnet ? ENDPOINTS.MAINNET : ENDPOINTS.DEVNET
  return createConnection(endpoint)
}

/**
 * Enhanced RPC connection with additional methods for advanced operations
 */
export class EnhancedRpcConnection {
  private connection: Connection

  constructor(endpoint: string = ENDPOINTS.MAINNET) {
    this.connection = createConnection(endpoint)
  }

  /**
   * Get the underlying Solana connection
   */
  getConnection(): Connection {
    return this.connection
  }

  /**
   * Switch the connection to a different endpoint
   * @param endpoint - The new RPC endpoint
   */
  switchEndpoint(endpoint: string): void {
    this.connection = createConnection(endpoint)
  }

  /**
   * Check if the connection is healthy
   * @returns Promise resolving to a boolean indicating health status
   */
  async isHealthy(): Promise<boolean> {
    try {
      const health = await this.connection.getHealth()
      return health === "ok"
    } catch (error) {
      console.error("RPC health check failed:", error)
      return false
    }
  }

  /**
   * Get the current transaction count per second
   * @returns Promise resolving to the TPS
   */
  async getTransactionsPerSecond(): Promise<number> {
    try {
      const perfSamples = await this.connection.getRecentPerformanceSamples(1)
      if (perfSamples.length > 0) {
        return perfSamples[0].numTransactions / perfSamples[0].samplePeriodSecs
      }
      return 0
    } catch (error) {
      console.error("Failed to get TPS:", error)
      return 0
    }
  }
}

// Export a singleton instance for app-wide use
export const enhancedRpc = new EnhancedRpcConnection()

// Export the endpoints for use elsewhere
export { ENDPOINTS }
