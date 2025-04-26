"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/context/wallet-context"
import RoleManagement from "@/components/role-management"
import UserPermissions from "@/components/user-permissions"
import CyberCard from "@/components/cyber-card"
import { AlertTriangle } from "lucide-react"

export default function RolesAndPermissionsPage() {
  const { isAdmin, connected, hasPermission } = useWallet()
  const router = useRouter()

  const canViewPage = isAdmin && (hasPermission("admin:manage-roles") || hasPermission("admin:manage-permissions"))

  useEffect(() => {
    if (!connected) {
      router.push("/")
    } else if (!canViewPage) {
      router.push("/dashboard")
    }
  }, [connected, canViewPage, router])

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

  if (!canViewPage) {
    return (
      <div className="container mx-auto p-4">
        <CyberCard className="bg-black/60">
          <div className="flex items-center justify-center p-6 text-red-500">
            <AlertTriangle className="mr-2 h-6 w-6" />
            <span className="text-lg font-tech-mono">Access Denied: Insufficient permissions</span>
          </div>
        </CyberCard>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-neon-cyan font-tech-mono">Roles & Permissions Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RoleManagement />
        <UserPermissions />
      </div>
    </div>
  )
}
