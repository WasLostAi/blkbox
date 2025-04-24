"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet, ADMIN_WHITELIST } from "@/context/wallet-context"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import GlitchText from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"
import { Lock, UserPlus, Trash2, ShieldAlert, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function WhitelistPage() {
  const { connected, isAdmin, address, getWhitelistedAddresses, addToWhitelist, removeFromWhitelist } = useWallet()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [newAddress, setNewAddress] = useState("")
  const [addresses, setAddresses] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  // Load whitelisted addresses
  useEffect(() => {
    if (connected && isAdmin) {
      setAddresses(getWhitelistedAddresses())
    }
    setIsLoading(false)
  }, [connected, isAdmin, getWhitelistedAddresses])

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && (!connected || !isAdmin)) {
      router.push("/admin")
    }
  }, [connected, isAdmin, isLoading, router])

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!newAddress.trim()) {
      setError("Please enter a valid address")
      return
    }

    // Validate Solana address format (simplified)
    if (newAddress.length < 32) {
      setError("Invalid Solana address format")
      return
    }

    addToWhitelist(newAddress)
    setAddresses(getWhitelistedAddresses())
    setNewAddress("")
  }

  const handleRemoveAddress = (addressToRemove: string) => {
    removeFromWhitelist(addressToRemove)
    setAddresses(getWhitelistedAddresses())
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <DataPulse className="w-16 h-16" />
      </div>
    )
  }

  if (!connected || !isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <CyberCard className="max-w-md w-full">
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-pink/20 mb-4">
              <Lock className="h-8 w-8 text-neon-pink" />
            </div>
            <GlitchText text="ACCESS DENIED" className="text-2xl font-bold text-neon-pink mb-4" />
            <p className="text-zinc-300 font-tech-mono mb-6">
              This area is restricted to authorized administrators only. Your current access level is insufficient.
            </p>
            <CyberButton onClick={() => router.push("/")} glowColor="pink">
              RETURN TO MAIN SITE
            </CyberButton>
          </div>
        </CyberCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_ADMIN</span>
          </Link>

          <GlitchText text="WHITELIST MANAGEMENT" className="text-3xl font-bold text-neon-pink mb-2" />
          <p className="text-zinc-400 font-tech-mono">Control access to the $BLKBOX Shadow Protocol</p>
        </div>

        <DataPulse className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <CyberCard className="bg-black/60">
              <div className="p-6">
                <h3 className="text-xl font-bold text-neon-cyan mb-6">Whitelisted Addresses</h3>

                {addresses.length === 0 ? (
                  <p className="text-zinc-400 font-tech-mono">No addresses in whitelist.</p>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((addr) => (
                      <div key={addr} className="flex justify-between items-center border-b border-zinc-800 pb-2">
                        <div>
                          <span className="text-zinc-300 font-tech-mono">{addr}</span>
                          {ADMIN_WHITELIST.includes(addr) && (
                            <span className="ml-2 text-xs bg-neon-pink/20 text-neon-pink px-2 py-0.5 rounded font-tech-mono">
                              ADMIN
                            </span>
                          )}
                          {addr === address && (
                            <span className="ml-2 text-xs bg-neon-cyan/20 text-neon-cyan px-2 py-0.5 rounded font-tech-mono">
                              YOU
                            </span>
                          )}
                        </div>

                        {!ADMIN_WHITELIST.includes(addr) && (
                          <button
                            onClick={() => handleRemoveAddress(addr)}
                            className="text-zinc-400 hover:text-neon-pink"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CyberCard>
          </div>

          <div>
            <CyberCard className="bg-black/60">
              <div className="p-6">
                <h3 className="text-xl font-bold text-neon-pink mb-4">Add New Address</h3>

                <form onSubmit={handleAddAddress} className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-tech-mono text-zinc-400 mb-1">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="w-full bg-black/50 border border-zinc-800 rounded-md px-3 py-2 text-white font-tech-mono focus:outline-none focus:border-neon-pink"
                      placeholder="Enter Solana address"
                    />
                    {error && <p className="mt-1 text-xs text-red-500 font-tech-mono">{error}</p>}
                  </div>

                  <CyberButton type="submit" glowColor="pink" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    ADD TO WHITELIST
                  </CyberButton>
                </form>
              </div>
            </CyberCard>

            <CyberCard className="bg-black/60 mt-6">
              <div className="p-6">
                <h3 className="text-xl font-bold text-neon-cyan mb-4">Security Notice</h3>
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-neon-pink mt-0.5" />
                  <p className="text-sm text-zinc-400 font-tech-mono">
                    Adding an address to the whitelist grants them access to the system. Only add addresses you trust.
                  </p>
                </div>
              </div>
            </CyberCard>
          </div>
        </div>
      </div>
    </div>
  )
}
