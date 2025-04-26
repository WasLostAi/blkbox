"use client"

import { useState } from "react"
import { useWallet } from "@/context/wallet-context"
import type { UserRole } from "@/utils/permissions"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import { Shield, UserPlus, UserMinus, AlertTriangle } from "lucide-react"

export default function RoleManagement() {
  const { getUsers, addRole, removeRole, hasPermission } = useWallet()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole>("user")
  const [actionType, setActionType] = useState<"add" | "remove">("add")
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const users = getUsers()
  const canManageRoles = hasPermission("admin:manage-roles")

  const availableRoles: UserRole[] = ["user", "entry_level", "operator", "shadow_elite", "phantom_council", "admin"]

  const handleAction = () => {
    if (!selectedUser || !selectedRole || !canManageRoles) return

    try {
      if (actionType === "add") {
        addRole(selectedUser, selectedRole)
        setStatusMessage({
          type: "success",
          message: `Role ${selectedRole} added to user ${selectedUser.substring(0, 8)}...`,
        })
      } else {
        removeRole(selectedUser, selectedRole)
        setStatusMessage({
          type: "success",
          message: `Role ${selectedRole} removed from user ${selectedUser.substring(0, 8)}...`,
        })
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    }

    // Clear status message after 3 seconds
    setTimeout(() => {
      setStatusMessage(null)
    }, 3000)
  }

  if (!canManageRoles) {
    return (
      <CyberCard className="bg-black/60">
        <div className="flex items-center justify-center p-6 text-red-500">
          <AlertTriangle className="mr-2 h-6 w-6" />
          <span className="text-lg font-tech-mono">Access Denied: Insufficient permissions</span>
        </div>
      </CyberCard>
    )
  }

  return (
    <CyberCard className="bg-black/60">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-neon-cyan mb-2 font-tech-mono">Role Management</h2>
        <p className="text-zinc-400 text-sm">Assign or remove roles from users to control their access levels.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Select User</label>
          <select
            value={selectedUser || ""}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-white"
          >
            <option value="">Select a user...</option>
            {users.map((user) => (
              <option key={user.address} value={user.address}>
                {user.address.substring(0, 8)}... ({user.tier}) - {user.balance} $BLKBOX
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Action</label>
          <div className="flex space-x-2">
            <button
              onClick={() => setActionType("add")}
              className={`flex-1 p-2 rounded-md ${
                actionType === "add"
                  ? "bg-neon-pink/20 border border-neon-pink text-neon-pink"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              <UserPlus className="h-4 w-4 inline mr-1" />
              Add Role
            </button>
            <button
              onClick={() => setActionType("remove")}
              className={`flex-1 p-2 rounded-md ${
                actionType === "remove"
                  ? "bg-neon-cyan/20 border border-neon-cyan text-neon-cyan"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              <UserMinus className="h-4 w-4 inline mr-1" />
              Remove Role
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Select Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-white"
          >
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <CyberButton
            onClick={handleAction}
            disabled={!selectedUser || !selectedRole}
            className="w-full"
            glowColor={actionType === "add" ? "pink" : "cyan"}
          >
            <Shield className="h-4 w-4 mr-2 inline" />
            {actionType === "add" ? "ASSIGN_ROLE" : "REMOVE_ROLE"}
          </CyberButton>
        </div>

        {statusMessage && (
          <div
            className={`mt-2 p-2 rounded-md ${
              statusMessage.type === "success" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
            }`}
          >
            {statusMessage.message}
          </div>
        )}
      </div>
    </CyberCard>
  )
}
