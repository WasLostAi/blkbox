import { Connection, type ConnectionConfig, type Commitment } from "@solana/web3.js"

/**
 * Enhanced RPC connection with failover, load balancing, and monitoring
 */
export class EnhancedRPCConnection {
  private connections: Connection[] = []
  private currentIndex = 0
  private lastUsed: number[] = []
  private healthStatus: boolean[] = []

  /**
   * Create a new enhanced RPC connection
   * @param endpoints Array of RPC endpoints
   * @param config Connection configuration
   */
  constructor(endpoints: string[], config?: ConnectionConfig) {
    // Initialize with the provided QuickNode RPC endpoint
    const defaultEndpoint = process.env.NEXT_PUBLIC_QUICKNODE_RPC || endpoints[0]

    // If no endpoints provided, use the default
    if (endpoints.length === 0) {
      endpoints = [defaultEndpoint]
    }

    // Create connections for each endpoint
    this.connections = endpoints.map((endpoint) => new Connection(endpoint, config))
    this.lastUsed = endpoints.map(() => Date.now())
    this.healthStatus = endpoints.map(() => true)
  }

  /**
   * Get a connection with automatic failover
   * @param preferHealthy Prefer healthy connections
   * @returns Solana connection
   */
  public getConnection(preferHealthy = true): Connection {
    // If we prefer healthy connections and have any, use those
    if (preferHealthy) {
      const healthyIndices = this.healthStatus
        .map((status, index) => (status ? index : -1))
        .filter((index) => index !== -1)

      if (healthyIndices.length > 0) {
        // Use the least recently used healthy connection
        const sortedIndices = [...healthyIndices].sort((a, b) => this.lastUsed[a] - this.lastUsed[b])
        this.currentIndex = sortedIndices[0]
      }
    } else {
      // Round-robin selection
      this.currentIndex = (this.currentIndex + 1) % this.connections.length
    }

    // Update last used timestamp
    this.lastUsed[this.currentIndex] = Date.now()

    return this.connections[this.currentIndex]
  }

  /**
   * Check health of all connections
   * @returns Array of health status
   */
  public async checkHealth(): Promise<boolean[]> {
    const healthChecks = this.connections.map(async (connection, index) => {
      try {
        // Simple health check - get recent blockhash
        await connection.getLatestBlockhash()
        this.healthStatus[index] = true
        return true
      } catch (error) {
        console.error(`RPC endpoint ${index} health check failed:`, error)
        this.healthStatus[index] = false
        return false
      }
    })

    return Promise.all(healthChecks)
  }

  /**
   * Get all connections
   * @returns Array of connections
   */
  public getAllConnections(): Connection[] {
    return this.connections
  }
}

// Singleton instance for app-wide use
let rpcConnectionInstance: EnhancedRPCConnection | null = null

/**
 * Get the global RPC connection instance
 * @returns EnhancedRPCConnection instance
 */
export function getRPCConnection(): EnhancedRPCConnection {
  if (!rpcConnectionInstance) {
    const endpoints = [process.env.NEXT_PUBLIC_QUICKNODE_RPC || "https://api.mainnet-beta.solana.com"]
    rpcConnectionInstance = new EnhancedRPCConnection(endpoints, {
      commitment: "confirmed" as Commitment,
    })
  }
  return rpcConnectionInstance
}

export const enhancedRpc = new EnhancedRPCConnection()
