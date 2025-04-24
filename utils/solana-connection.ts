import { Connection, clusterApiUrl } from "@solana/web3.js"

let solanaConnection: Connection | null = null

export function getSolanaConnection(): Connection {
  if (!solanaConnection) {
    solanaConnection = new Connection(process.env.NEXT_PUBLIC_QUICKNODE_RPC || clusterApiUrl("mainnet-beta"))
  }
  return solanaConnection
}
