"use client"

import type React from "react"
import { createContext, useContext, useMemo } from "react"
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
  useWallet as useSolanaWallet,
} from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl, type PublicKey } from "@solana/web3.js"

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css"

// Define the context type
interface RealWalletContextType {
  publicKey: PublicKey | null
  connected: boolean
  connecting: boolean
  disconnect: () => Promise<void>
  select: (walletName: string) => void
  connect: () => Promise<void>
  wallets: any[]
  wallet: any
}

// Create the context
const RealWalletContext = createContext<RealWalletContextType | undefined>(undefined)

// Provider component
export function RealWalletContextProvider({ children }: { children: React.ReactNode }) {
  // You can also provide a custom RPC endpoint
  const endpoint = process.env.NEXT_PUBLIC_QUICKNODE_RPC || clusterApiUrl(WalletAdapterNetwork.Mainnet)

  // Initialize wallet adapters
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [],
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <RealWalletContextContent>{children}</RealWalletContextContent>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}

// Content component to use the wallet hooks
function RealWalletContextContent({ children }: { children: React.ReactNode }) {
  const { publicKey, connected, connecting, disconnect, select, connect, wallets, wallet } = useSolanaWallet()

  // Create the context value
  const contextValue = {
    publicKey,
    connected,
    connecting,
    disconnect,
    select,
    connect,
    wallets,
    wallet,
  }

  return <RealWalletContext.Provider value={contextValue}>{children}</RealWalletContext.Provider>
}

// Custom hook to use the wallet context
export function useRealWallet() {
  const context = useContext(RealWalletContext)
  if (context === undefined) {
    throw new Error("useRealWallet must be used within a RealWalletContextProvider")
  }
  return context
}
