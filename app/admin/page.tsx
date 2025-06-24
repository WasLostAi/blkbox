"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useWallet } from "@/context/wallet-context"
import CyberCard from "@/components/cyber-card"
import { Users, Settings, AlertTriangle, Lock } from "lucide-react"

export default function AdminPage() {
  const { isAdmin, connected } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (!connected) {
      router.push("/")
    } else if (!isAdmin) {
      router.push("/dashboard")
    }
  }, [connected, isAdmin, router])

  if (!connected) {
    return (
      <div className="container mx-auto p-4">
        <CyberCard className="bg-black/60">
          <div className="flex items-center justify-center p-6">
            <span className="text-lg font-tech-mono">Please connect your wallet</span>
          </div>
        </CyberCard>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-4">
        <CyberCard className="bg-black/60">
          <div className="flex items-center justify-center p-6 text-red-500">
            <AlertTriangle className="mr-2 h-6 w-6" />
            <span className="text-lg font-tech-mono">Access Denied: Admin privileges required</span>
          </div>
        </CyberCard>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-neon-cyan font-tech-mono">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/whitelist">
          <CyberCard className="bg-black/60 h-full hover:border-neon-pink transition-colors cursor-pointer">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Users className="h-12 w-12 mb-4 text-neon-pink" />
              <h2 className="text-xl font-bold mb-2 text-neon-pink">Whitelist Management</h2>
              <p className="text-zinc-400 text-sm">
                Manage whitelisted addresses for early access and special privileges
              </p>
            </div>
          </CyberCard>
        </Link>

        <Link href="/admin/roles">
          <CyberCard className="bg-black/60 h-full hover:border-neon-cyan transition-colors cursor-pointer">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Lock className="h-12 w-12 mb-4 text-neon-cyan" />
              <h2 className="text-xl font-bold mb-2 text-neon-cyan">Roles & Permissions</h2>
              <p className="text-zinc-400 text-sm">Manage user roles and granular permissions for platform access</p>
            </div>
          </CyberCard>
        </Link>

        <Link href="/admin/settings">
          <CyberCard className="bg-black/60 h-full hover:border-neon-pink transition-colors cursor-pointer">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Settings className="h-12 w-12 mb-4 text-neon-pink" />
              <h2 className="text-xl font-bold mb-2 text-neon-pink">System Settings</h2>
              <p className="text-zinc-400 text-sm">Configure global system settings and security parameters</p>
            </div>
          </CyberCard>
        </Link>
      </div>
    </div>
  )
}
