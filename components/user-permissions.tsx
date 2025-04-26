"use client"

import { useState } from "react"
import { useWallet } from "@/context/wallet-context"
import { type PermissionAction, getUniquePermissions } from "@/utils/permissions"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import { Shield, Plus, Minus, AlertTriangle, Search } from "lucide-react"

export default function UserPermissions() {
  const { getUsers, addPermission, removePermission, hasPermission } = useWallet()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedPermission, setSelectedPermission] = useState<PermissionAction | "">("")
  const [actionType, setActionType] = useState<"add" | "remove">("add")
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const users = getUsers()
  const canManagePermissions = hasPermission("admin:manage-permissions")
  const allPermissions = getUniquePermissions()

  // Filter permissions based on search term
  const filteredPermissions = allPermissions.filter((permission) =>
    permission.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAction = () => {
    if (!selectedUser || !selectedPermission || !canManagePermissions) return

    try {
      if (actionType === "add") {
        addPermission(selectedUser, selectedPermission)
        setStatusMessage({
          type: "success",
          message: `Permission ${selectedPermission} added to user ${selectedUser.substring(0, 8)}...`,
        })
      } else {
        removePermission(selectedUser, selectedPermission)
        setStatusMessage({
          type: "success",
          message: `Permission ${selectedPermission} removed from user ${selectedUser.substring(0, 8)}...`,
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

  const getUserPermissions = (address: string) => {
    const user = users.find((u) => u.address === address)
    if (!user) return []

    // Get user from context
    const userDetails = getUsers().find((u) => u.address === address)
    if (!userDetails) return []

    return userDetails.customPermissions || []
  }

  if (!canManagePermissions) {
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
        <h2 className="text-xl font-bold text-neon-cyan mb-2 font-tech-mono">User Permissions</h2>
        <p className="text-zinc-400 text-sm">Grant or revoke specific permissions for users.</p>
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

        {selectedUser && (
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Current Custom Permissions</label>
            <div className="bg-zinc-900 border border-zinc-700 rounded-md p-2 min-h-[60px] max-h-[120px] overflow-y-auto">
              {getUserPermissions(selectedUser).length > 0 ? (
                <ul className="list-disc pl-5 text-sm">
                  {getUserPermissions(selectedUser).map((permission) => (
                    <li key={permission} className="text-zinc-300">
                      {permission}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500 text-sm italic">No custom permissions assigned</p>
              )}
            </div>
          </div>
        )}

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
              <Plus className="h-4 w-4 inline mr-1" />
              Add Permission
            </button>
            <button
              onClick={() => setActionType("remove")}
              className={`flex-1 p-2 rounded-md ${
                actionType === "remove"
                  ? "bg-neon-cyan/20 border border-neon-cyan text-neon-cyan"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              <Minus className="h-4 w-4 inline mr-1" />
              Remove Permission
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Search Permissions</label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search permissions..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 pl-8 text-white"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Select Permission</label>
          <select
            value={selectedPermission}
            onChange={(e) => setSelectedPermission(e.target.value as PermissionAction)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-white"
          >
            <option value="">Select a permission...</option>
            {filteredPermissions.map((permission) => (
              <option key={permission} value={permission}>
                {permission}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <CyberButton
            onClick={handleAction}
            disabled={!selectedUser || !selectedPermission}
            className="w-full"
            glowColor={actionType === "add" ? "pink" : "cyan"}
          >
            <Shield className="h-4 w-4 mr-2 inline" />
            {actionType === "add" ? "GRANT_PERMISSION" : "REVOKE_PERMISSION"}
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
