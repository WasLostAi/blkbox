"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/context/wallet-context"
import { getToolRequiredTier } from "@/utils/access-control"

interface AuthCheckProps {
  toolPath?: string
  requiredTier?: string
  children: React.ReactNode
}

/**
 * A component that checks if the user is authenticated and has the required tier
 * but doesn't block access - just redirects if not connected
 */
export default function AuthCheck({ toolPath, requiredTier, children }: AuthCheckProps) {
  const { connected, tier } = useWallet()
  const router = useRouter()

  // Determine the required tier
  const actualRequiredTier = requiredTier || (toolPath ? getToolRequiredTier(toolPath) : "UNAUTHORIZED")

  useEffect(() => {
    // Only redirect if not connected
    if (!connected) {
      router.push("/dashboard")
    }
    // We don't check tier level here since the user should have access to all tools
  }, [connected, router])

  return <>{children}</>
}
