"use client"

import type React from "react"

import { useState } from "react"
import { Shield, AlertTriangle, Lock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import CyberButton from "./cyber-button"
import CyberCard from "./cyber-card"
import GlitchText from "./glitch-text"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock user data
const MOCK_USERS = [
  {
    id: "1",
    address: "AuwUfiwsXA6VibDjR579HWLhDUUoa5s6T7i7KPyLUa9F",
    tier: "PHANTOM_COUNCIL",
    isAdmin: true,
    status: "active",
    lastActive: "2025-04-25 14:32:21",
    balance: 1500000,
  },
  {
    id: "2",
    address: "8ZVmCuPTPez5i7qAMJ6WZcGWuLKuCHsW4N4xNpVDUQsK",
    tier: "SHADOW_ELITE",
    isAdmin: false,
    status: "active",
    lastActive: "2025-04-25 12:15:43",
    balance: 350000,
  },
  {
    id: "3",
    address: "6FKvsq4ydWFci6nGq9ckbjYMtnmaqAoatz5c9XWjiDuS",
    tier: "OPERATOR",
    isAdmin: false,
    status: "active",
    lastActive: "2025-04-24 23:05:11",
    balance: 75000,
  },
  {
    id: "4",
    address: "3Krd8TXwUXPxVcJn8rqhQgQYP9uZxmMBiRRYZFcUJQnw",
    tier: "ENTRY_LEVEL",
    isAdmin: false,
    status: "suspended",
    lastActive: "2025-04-23 08:45:32",
    balance: 15000,
  },
]

export default function UserAccountControls() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [searchQuery, setSearchQuery] = useState("")
  const [showLockdownConfirm, setShowLockdownConfirm] = useState(false)
  const [lockdownCode, setLockdownCode] = useState("")
  const [lockdownActive, setLockdownActive] = useState(false)
  const [lockdownError, setLockdownError] = useState<string | null>(null)
  const [showUserActionDialog, setShowUserActionDialog] = useState<{
    type: "suspend" | "promote" | "delete" | "reset"
    userId: string
  } | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.tier.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleLockdownSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLockdownError(null)

    // This would be a secure hash check in production
    if (lockdownCode === "shadow-protocol-override") {
      setLockdownActive(!lockdownActive)
      setShowLockdownConfirm(false)
      setLockdownCode("")
    } else {
      setLockdownError("Invalid lockdown code")
    }
  }

  const handleUserAction = (action: "suspend" | "promote" | "delete" | "reset", userId: string) => {
    setShowUserActionDialog({ type: action, userId })
  }

  const confirmUserAction = () => {
    if (!showUserActionDialog) return

    const { type, userId } = showUserActionDialog

    // In a real app, you would call an API to perform these actions
    // For now, we'll just update the local state for demonstration
    if (type === "suspend") {
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: user.status === "suspended" ? "active" : "suspended" } : user,
        ),
      )
    } else if (type === "promote") {
      setUsers(users.map((user) => (user.id === userId ? { ...user, isAdmin: true } : user)))
    } else if (type === "delete") {
      setUsers(users.filter((user) => user.id !== userId))
    }

    setShowUserActionDialog(null)
  }

  return (
    <>
      <CyberCard className="bg-black/60">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-neon-cyan">User Account Management</h3>
            <div className="flex gap-3">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-64 bg-black border-zinc-800 text-white"
              />
              <CyberButton
                onClick={() => setShowLockdownConfirm(true)}
                variant={lockdownActive ? "default" : "outline"}
                glowColor={lockdownActive ? "pink" : "cyan"}
                className="gap-2"
              >
                {lockdownActive ? (
                  <>
                    <Lock className="h-4 w-4" />
                    EXIT LOCKDOWN
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    LOCKDOWN MODE
                  </>
                )}
              </CyberButton>
            </div>
          </div>

          {lockdownActive && (
            <div className="mb-6">
              <CyberCard className="bg-red-900/20 border-red-500/50">
                <div className="p-4 flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <div>
                    <h3 className="text-lg font-bold text-red-500">LOCKDOWN MODE ACTIVE</h3>
                    <p className="text-zinc-300 font-tech-mono text-sm">
                      System is in restricted access mode. Only admin operations are permitted.
                    </p>
                  </div>
                </div>
              </CyberCard>
            </div>
          )}

          <div className="border border-zinc-800 rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-zinc-900">
                  <TableHead className="text-neon-cyan">User</TableHead>
                  <TableHead className="text-neon-cyan">Tier</TableHead>
                  <TableHead className="text-neon-cyan">Status</TableHead>
                  <TableHead className="text-neon-cyan">Last Active</TableHead>
                  <TableHead className="text-neon-cyan">Balance</TableHead>
                  <TableHead className="text-neon-cyan">Admin</TableHead>
                  <TableHead className="text-neon-cyan text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-900">
                    <TableCell className="font-tech-mono text-white">
                      {user.address.slice(0, 6)}...{user.address.slice(-6)}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neon-cyan/20 text-neon-cyan">
                        {user.tier.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.status === "active" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900/20 text-green-400">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-900/20 text-red-400">
                          Suspended
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-zinc-400">{user.lastActive}</TableCell>
                    <TableCell className="text-zinc-400">{user.balance.toLocaleString()}</TableCell>
                    <TableCell>
                      <Switch
                        checked={user.isAdmin}
                        disabled={user.address === "AuwUfiwsXA6VibDjR579HWLhDUUoa5s6T7i7KPyLUa9F"}
                        className="data-[state=checked]:bg-neon-cyan"
                        onCheckedChange={() => {
                          if (!user.isAdmin) {
                            handleUserAction("promote", user.id)
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {user.address === "AuwUfiwsXA6VibDjR579HWLhDUUoa5s6T7i7KPyLUa9F" ? (
                          <span className="text-xs text-zinc-500 font-tech-mono">OWNER (PROTECTED)</span>
                        ) : (
                          <>
                            <CyberButton
                              size="sm"
                              variant="outline"
                              glowColor={user.status === "suspended" ? "cyan" : "pink"}
                              onClick={() => handleUserAction("suspend", user.id)}
                            >
                              {user.status === "suspended" ? "ACTIVATE" : "SUSPEND"}
                            </CyberButton>
                            <CyberButton
                              size="sm"
                              variant="outline"
                              glowColor="pink"
                              onClick={() => handleUserAction("delete", user.id)}
                            >
                              DELETE
                            </CyberButton>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CyberCard>

      {/* Lockdown Mode Dialog */}
      <Dialog open={showLockdownConfirm} onOpenChange={setShowLockdownConfirm}>
        <DialogContent className="bg-black border border-neon-pink/50 p-0 max-w-md w-full">
          <DialogHeader className="p-6 border-b border-neon-pink/30">
            <div className="flex items-center justify-between">
              <DialogTitle>
                <GlitchText text="LOCKDOWN MODE" className="text-xl font-bold text-neon-pink" />
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="p-6">
            <p className="text-zinc-300 font-tech-mono text-sm mb-6">
              LOCKDOWN MODE requires administrative authorization. Enter your security code to continue.
            </p>

            {lockdownError && (
              <div className="bg-red-900/20 border border-red-500/50 p-3 rounded-md mb-6">
                <p className="text-red-500 text-sm font-tech-mono">{lockdownError}</p>
              </div>
            )}

            <form onSubmit={handleLockdownSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="password"
                  value={lockdownCode}
                  onChange={(e) => setLockdownCode(e.target.value)}
                  className="w-full bg-black/50 border border-neon-pink/30 rounded-md px-4 py-2 text-white font-tech-mono focus:outline-none focus:border-neon-pink"
                  placeholder="Enter lockdown code"
                  autoFocus
                />
              </div>

              <div className="flex gap-2">
                <CyberButton type="submit" className="w-full justify-center" glowColor="pink">
                  {lockdownActive ? "DEACTIVATE LOCKDOWN" : "ACTIVATE LOCKDOWN"}
                </CyberButton>

                <CyberButton
                  type="button"
                  onClick={() => setShowLockdownConfirm(false)}
                  variant="outline"
                  glowColor="cyan"
                >
                  CANCEL
                </CyberButton>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Action Confirmation Dialog */}
      <Dialog open={showUserActionDialog !== null} onOpenChange={() => setShowUserActionDialog(null)}>
        <DialogContent className="bg-black border border-zinc-800">
          <DialogHeader>
            <DialogTitle>
              {showUserActionDialog?.type === "suspend" && "Confirm User Status Change"}
              {showUserActionDialog?.type === "promote" && "Confirm Admin Promotion"}
              {showUserActionDialog?.type === "delete" && "Confirm User Deletion"}
              {showUserActionDialog?.type === "reset" && "Confirm Password Reset"}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              {showUserActionDialog?.type === "suspend" && "Are you sure you want to change this user's status?"}
              {showUserActionDialog?.type === "promote" && "Are you sure you want to promote this user to admin?"}
              {showUserActionDialog?.type === "delete" &&
                "Are you sure you want to delete this user? This action cannot be undone."}
              {showUserActionDialog?.type === "reset" && "Are you sure you want to reset this user's password?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <CyberButton variant="outline" glowColor="cyan" onClick={() => setShowUserActionDialog(null)}>
              CANCEL
            </CyberButton>
            <CyberButton glowColor="pink" onClick={confirmUserAction}>
              CONFIRM
            </CyberButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
