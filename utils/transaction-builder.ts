import {
  Transaction,
  type TransactionInstruction,
  type PublicKey,
  type Keypair,
  type Connection,
  sendAndConfirmTransaction,
  ComputeBudgetProgram,
  VersionedTransaction,
  TransactionMessage,
} from "@solana/web3.js"

/**
 * Advanced transaction builder with MEV capabilities
 */
export class TransactionBuilder {
  private instructions: TransactionInstruction[] = []
  private signers: Keypair[] = []
  private connection: Connection
  private feePayer: PublicKey
  private priorityFee = 0

  /**
   * Create a new transaction builder
   * @param connection Solana connection
   * @param feePayer Public key of the fee payer
   */
  constructor(connection: Connection, feePayer: PublicKey) {
    this.connection = connection
    this.feePayer = feePayer
  }

  /**
   * Add an instruction to the transaction
   * @param instruction Transaction instruction
   * @returns This builder for chaining
   */
  public addInstruction(instruction: TransactionInstruction): TransactionBuilder {
    this.instructions.push(instruction)
    return this
  }

  /**
   * Add multiple instructions to the transaction
   * @param instructions Array of transaction instructions
   * @returns This builder for chaining
   */
  public addInstructions(instructions: TransactionInstruction[]): TransactionBuilder {
    this.instructions.push(...instructions)
    return this
  }

  /**
   * Add a signer to the transaction
   * @param signer Keypair signer
   * @returns This builder for chaining
   */
  public addSigner(signer: Keypair): TransactionBuilder {
    this.signers.push(signer)
    return this
  }

  /**
   * Set priority fee for the transaction
   * @param microLamports Priority fee in micro-lamports
   * @returns This builder for chaining
   */
  public setPriorityFee(microLamports: number): TransactionBuilder {
    this.priorityFee = microLamports
    return this
  }

  /**
   * Build a legacy transaction
   * @returns Transaction object
   */
  public async buildLegacyTransaction(): Promise<Transaction> {
    const transaction = new Transaction()

    // Add priority fee if specified
    if (this.priorityFee > 0) {
      const priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: this.priorityFee,
      })
      transaction.add(priorityFeeInstruction)
    }

    // Add all instructions
    transaction.add(...this.instructions)

    // Get recent blockhash
    const { blockhash } = await this.connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = this.feePayer

    return transaction
  }

  /**
   * Build a versioned transaction (v0)
   * @returns VersionedTransaction object
   */
  public async buildVersionedTransaction(): Promise<VersionedTransaction> {
    // Create instruction array with priority fee if needed
    const allInstructions = [...this.instructions]

    if (this.priorityFee > 0) {
      const priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: this.priorityFee,
      })
      allInstructions.unshift(priorityFeeInstruction)
    }

    // Get recent blockhash
    const { blockhash } = await this.connection.getLatestBlockhash()

    // Create a v0 transaction message
    const messageV0 = new TransactionMessage({
      payerKey: this.feePayer,
      recentBlockhash: blockhash,
      instructions: allInstructions,
    }).compileToV0Message()

    // Create a versioned transaction
    return new VersionedTransaction(messageV0)
  }

  /**
   * Simulate the transaction
   * @returns Simulation result
   */
  public async simulate() {
    const transaction = await this.buildLegacyTransaction()
    return this.connection.simulateTransaction(transaction)
  }

  /**
   * Send and confirm the transaction
   * @param signers Additional signers
   * @returns Transaction signature
   */
  public async sendAndConfirm(signers: Keypair[] = []): Promise<string> {
    const transaction = await this.buildLegacyTransaction()
    const allSigners = [...this.signers, ...signers]
    return sendAndConfirmTransaction(this.connection, transaction, allSigners)
  }

  /**
   * Clear all instructions and signers
   * @returns This builder for chaining
   */
  public clear(): TransactionBuilder {
    this.instructions = []
    this.signers = []
    return this
  }
}
