import { Connection, clusterApiUrl, type Commitment } from "@solana/web3.js"

// Connection pool to manage multiple RPC endpoints
class ConnectionPool {
  private connections: Connection[] = []
  private currentIndex = 0
  private healthStatus: boolean[] = []

  constructor(endpoints: string[], commitment: Commitment = "confirmed") {
    this.connections = endpoints.map((endpoint) => new Connection(endpoint, commitment))
    this.healthStatus = new Array(endpoints.length).fill(true)
  }

  // Get a healthy connection from the pool
  public getConnection(): Connection {
    // Find the next healthy connection
    const startIndex = this.currentIndex
    do {
      if (this.healthStatus[this.currentIndex]) {
        const connection = this.connections[this.currentIndex]
        this.currentIndex = (this.currentIndex + 1) % this.connections.length
        return connection
      }
      this.currentIndex = (this.currentIndex + 1) % this.connections.length
    } while (this.currentIndex !== startIndex)

    // If all connections are unhealthy, return the first one
    console.warn("All RPC connections are unhealthy. Using the first one.")
    return this.connections[0]
  }

  // Mark a connection as unhealthy
  public markUnhealthy(index: number): void {
    this.healthStatus[index] = false
    setTimeout(() => {
      this.healthStatus[index] = true
    }, 60000) // Try again after 1 minute
  }

  // Check the health of all connections
  public async checkHealth(): Promise<void> {
    for (let i = 0; i < this.connections.length; i++) {
      try {
        const connection = this.connections[i]
        await connection.getVersion()
        this.healthStatus[i] = true
      } catch (error) {
        console.error(`RPC endpoint ${i} is unhealthy:`, error)
        this.healthStatus[i] = false
      }
    }
  }
}

// Create a connection pool with the available RPC endpoints
const endpoints = [
  process.env.NEXT_PUBLIC_QUICKNODE_RPC || clusterApiUrl("mainnet-beta"),
  process.env.NEXT_PUBLIC_QUICKNODE_WS || clusterApiUrl("mainnet-beta"),
  clusterApiUrl("mainnet-beta"), // Fallback to public RPC
]

const connectionPool = new ConnectionPool(endpoints)

// Start health checks
setInterval(() => {
  connectionPool.checkHealth()
}, 300000) // Check every 5 minutes

// Get a connection from the pool
export function getConnection(): Connection {
  return connectionPool.getConnection()
}

// Execute a transaction with retry logic
export async function executeWithRetry<T>(
  operation: (connection: Connection) => Promise<T>,
  maxRetries = 3,
): Promise<T> {
  let retries = 0
  while (retries < maxRetries) {
    try {
      const connection = getConnection()
      return await operation(connection)
    } catch (error) {
      retries++
      if (retries >= maxRetries) {
        throw error
      }
      console.warn(`Operation failed, retrying (${retries}/${maxRetries})...`, error)
      await new Promise((resolve) => setTimeout(resolve, 1000 * retries)) // Exponential backoff
    }
  }
  throw new Error("Max retries exceeded")
}
