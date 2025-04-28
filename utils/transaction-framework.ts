import {
  type Connection,
  type Keypair,
  type PublicKey,
  Transaction,
  type TransactionInstruction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js"
import { enhancedRpc } from "./rpc-connection"

/**
 * Transaction priority levels for fee calculation
 */
export enum TransactionPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  MAXIMUM = "maximum",
}

/**
 * Transaction options interface
 */
export interface TransactionOptions {
  priority?: TransactionPriority
  maxRetries?: number
  skipPreflight?: boolean
  useVersioned?: boolean
}

/**
 * Default transaction options
 */
const DEFAULT_OPTIONS: TransactionOptions = {
  priority: TransactionPriority.MEDIUM,
  maxRetries: 3,
  skipPreflight: false,
  useVersioned: true,
}

/**
 * Transaction builder class for creating and sending transactions
 */
export class TransactionBuilder {
  private connection: Connection
  private instructions: TransactionInstruction[] = []
  private signers: Keypair[] = []
  private feePayer?: PublicKey
  private options: TransactionOptions
  private recentBlockhash?: string

  /**
   * Create a new transaction builder
   * @param connection - Solana connection
   * @param options - Transaction options
   */
  constructor(connection?: Connection, options: TransactionOptions = DEFAULT_OPTIONS) {
    this.connection = connection || enhancedRpc.getConnection()
    this.options = { ...DEFAULT_OPTIONS, ...options }
  }

  /**
   * Set the fee payer for the transaction
   * @param feePayer - Public key of the fee payer
   */
  setFeePayer(feePayer: PublicKey): TransactionBuilder {
    this.feePayer = feePayer
    return this
  }

  /**
   * Add an instruction to the transaction
   * @param instruction - Transaction instruction to add
   */
  addInstruction(instruction: TransactionInstruction): TransactionBuilder {
    this.instructions.push(instruction)
    return this
  }

  /**
   * Add multiple instructions to the transaction
   * @param instructions - Array of transaction instructions
   */
  addInstructions(instructions: TransactionInstruction[]): TransactionBuilder {
    this.instructions.push(...instructions)
    return this
  }

  /**
   * Add a signer to the transaction
   * @param signer - Keypair of the signer
   */
  addSigner(signer: Keypair): TransactionBuilder {
    this.signers.push(signer)
    return this
  }

  /**
   * Add multiple signers to the transaction
   * @param signers - Array of keypairs
   */
  addSigners(signers: Keypair[]): TransactionBuilder {
    this.signers.push(...signers)
    return this
  }

  /**
   * Set transaction options
   * @param options - Transaction options
   */
  setOptions(options: Partial<TransactionOptions>): TransactionBuilder {
    this.options = { ...this.options, ...options }
    return this
  }

  /**
   * Build a legacy transaction
   * @returns Transaction object
   */
  async buildLegacyTransaction(): Promise<Transaction> {
    if (!this.feePayer) {
      throw new Error("Fee payer not set")
    }

    const { blockhash } = await this.connection.getLatestBlockhash()
    this.recentBlockhash = blockhash

    const transaction = new Transaction()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = this.feePayer
    transaction.add(...this.instructions)

    return transaction
  }

  /**
   * Build a versioned transaction
   * @returns VersionedTransaction object
   */
  async buildVersionedTransaction(): Promise<VersionedTransaction> {
    if (!this.feePayer) {
      throw new Error("Fee payer not set")
    }

    const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash()
    this.recentBlockhash = blockhash

    const messageV0 = new TransactionMessage({
      payerKey: this.feePayer,
      recentBlockhash: blockhash,
      instructions: this.instructions,
    }).compileToV0Message()

    return new VersionedTransaction(messageV0)
  }

  /**
   * Build the transaction based on options
   * @returns Transaction or VersionedTransaction
   */
  async build(): Promise<Transaction | VersionedTransaction> {
    if (this.options.useVersioned) {
      return this.buildVersionedTransaction()
    } else {
      return this.buildLegacyTransaction()
    }
  }

  /**
   * Sign the transaction with the provided signers
   * @param transaction - Transaction to sign
   * @returns Signed transaction
   */
  sign(transaction: Transaction | VersionedTransaction): Transaction | VersionedTransaction {
    if (transaction instanceof Transaction) {
      if (this.signers.length > 0) {
        transaction.sign(...this.signers)
      }
      return transaction
    } else {
      // For versioned transactions
      if (this.signers.length > 0) {
        transaction.sign(this.signers)
      }
      return transaction
    }
  }

  /**
   * Send the transaction to the network
   * @param signedTransaction - Signed transaction
   * @returns Transaction signature
   */
  async send(signedTransaction: Transaction | VersionedTransaction): Promise<string> {
    const { skipPreflight } = this.options

    if (signedTransaction instanceof Transaction) {
      // For legacy transactions
      const signature = await this.connection.sendRawTransaction(signedTransaction.serialize(), { skipPreflight })
      return signature
    } else {
      // For versioned transactions
      const signature = await this.connection.sendRawTransaction(signedTransaction.serialize(), { skipPreflight })
      return signature
    }
  }

  /**
   * Build, sign, and send the transaction
   * @returns Transaction signature
   */
  async buildAndSend(): Promise<string> {
    const transaction = await this.build()
    const signedTransaction = this.sign(transaction)
    return this.send(signedTransaction)
  }

  /**
   * Calculate the transaction fee based on priority
   * @returns Estimated fee in lamports
   */
  async calculateFee(): Promise<number> {
    const transaction = await this.build()
    const fee = await this.connection.getFeeForMessage(
      transaction instanceof VersionedTransaction ? transaction.message : transaction.compileMessage(),
    )

    if (!fee.value) return 5000 // Default fallback fee

    // Apply priority multiplier
    const priorityMultiplier = this.getPriorityMultiplier()
    return Math.ceil(fee.value * priorityMultiplier)
  }

  /**
   * Get the priority multiplier based on the transaction priority
   * @returns Priority multiplier
   */
  private getPriorityMultiplier(): number {
    switch (this.options.priority) {
      case TransactionPriority.LOW:
        return 1.0
      case TransactionPriority.MEDIUM:
        return 1.5
      case TransactionPriority.HIGH:
        return 2.0
      case TransactionPriority.MAXIMUM:
        return 3.0
      default:
        return 1.0
    }
  }

  /**
   * Create a transfer SOL transaction
   * @param from - Sender keypair
   * @param to - Recipient public key
   * @param amount - Amount in SOL
   * @returns TransactionBuilder instance
   */
  static transferSol(from: Keypair, to: PublicKey, amount: number, connection?: Connection): TransactionBuilder {
    const builder = new TransactionBuilder(connection)

    const instruction = SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: amount * LAMPORTS_PER_SOL,
    })

    return builder.setFeePayer(from.publicKey).addInstruction(instruction).addSigner(from)
  }
}

/**
 * Utility function to simulate a transaction without sending it
 * @param connection - Solana connection
 * @param transaction - Transaction to simulate
 * @param signers - Signers for the transaction
 * @returns Simulation result
 */
export async function simulateTransaction(
  connection: Connection,
  transaction: Transaction | VersionedTransaction,
  signers?: Keypair[],
): Promise<any> {
  if (transaction instanceof Transaction && signers) {
    transaction.sign(...signers)
  } else if (transaction instanceof VersionedTransaction && signers) {
    transaction.sign(signers)
  }

  const serializedTransaction = transaction.serialize()

  return connection.simulateTransaction(serializedTransaction)
}
