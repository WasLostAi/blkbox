import type { Connection } from "@solana/web3.js"

export async function scanMempool(connection: Connection): Promise<any[]> {
  try {
    // Get recent transactions from the ledger
    const signatures = await connection.getConfirmedSignaturesForAddress2(
      connection.identity, // Replace with the actual address you want to monitor
      { limit: 100 }, // Adjust the limit as needed
    )

    // Fetch transaction details for each signature
    const transactions = await Promise.all(
      signatures.map(async (signature) => {
        return await connection.getConfirmedTransaction(signature.signature)
      }),
    )

    // Filter out null transactions
    const validTransactions = transactions.filter((tx) => tx !== null)

    return validTransactions
  } catch (error) {
    console.error("Error scanning mempool:", error)
    return []
  }
}
