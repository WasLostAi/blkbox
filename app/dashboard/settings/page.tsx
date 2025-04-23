"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/context/wallet-context"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import GlitchText from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"
import { Lock, Power, AlertTriangle, Eye, UserX, UserCheck, RefreshCw, Plus } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SettingsPage() {
  const { connected, tier, address, isAdmin, accessMode, setAccessMode } = useWallet()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // System settings
  const [killSwitchActive, setKillSwitchActive] = useState(false)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [blockAllConnections, setBlockAllConnections] = useState(false)
  const [whitelistOnly, setWhitelistOnly] = useState(false)
  const [logAllTransactions, setLogAllTransactions] = useState(true)

  // Whitelist management
  const [whitelistedAddresses, setWhitelistedAddresses] = useState<string[]>([
    "AuwUfiwsXA6VibDjR579HWLhDUUoa5s6T7i7KPyLUa9F", // Admin address
    "8ZVmCuPTPez5i7qAMJ6WZcGWuLKuCHsW4N4xNpVDUQsK", // Example address
    "6FKvsq4ydWFci6nGq9ckbjYMtnmaqAoatz5c9XWjiDuS", // Example address
  ])
  const [newWhitelistAddress, setNewWhitelistAddress] = useState("")
  const [isAddingAddress, setIsAddingAddress] = useState(false)

  // Blacklist management
  const [blacklistedAddresses, setBlacklistedAddresses] = useState<string[]>([
    "3Krd8TXwUXPxVcJn8rqhQgQYP9uZxmMBiRRYZFcUJQnw", // Example blacklisted address
    "7YttLkHMsEqWxNMsUqEJGJQUTJcQmvLXfTSKvMdKRYJP", // Example blacklisted address
  ])
  const [newBlacklistAddress, setNewBlacklistAddress] = useState("")
  const [isAddingBlacklist, setIsAddingBlacklist] = useState(false)

  // Emergency settings
  const [emergencyContactEmail, setEmergencyContactEmail] = useState("admin@blkbox.io")
  const [emergencyMessage, setEmergencyMessage] = useState("")
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false)

  // Confirmation dialogs
  const [showKillSwitchConfirm, setShowKillSwitchConfirm] = useState(false)
  const [showBlockAllConfirm, setShowBlockAllConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    type: "whitelist" | "blacklist"
    address: string
  } | null>(null)

  // Check if the user is authorized (admin status)
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      // In a real app, you might want to verify admin status from the server
      // For demo purposes, we'll just use the isAdmin state from the wallet context
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Redirect to home if not connected or not admin
  useEffect(() => {
    if (!isLoading && !connected) {
      router.push("/")
    }
  }, [connected, isLoading, router])

  const handleKillSwitch = () => {
    if (killSwitchActive) {
      // If already active, turn it off immediately
      setKillSwitchActive(false)
      // In a real app, you would call an API to disable the kill switch
    } else {
      // If not active, show confirmation dialog
      setShowKillSwitchConfirm(true)
    }
  }

  const confirmKillSwitch = () => {
    setKillSwitchActive(true)
    setShowKillSwitchConfirm(false)
    // In a real app, you would call an API to enable the kill switch
  }

  const handleBlockAllConnections = () => {
    if (blockAllConnections) {
      // If already active, turn it off immediately
      setBlockAllConnections(false)
      // In a real app, you would call an API to disable blocking
    } else {
      // If not active, show confirmation dialog
      setShowBlockAllConfirm(true)
    }
  }

  const confirmBlockAll = () => {
    setBlockAllConnections(true)
    setShowBlockAllConfirm(false)
    // In a real app, you would call an API to enable blocking
  }

  const addToWhitelist = () => {
    if (!newWhitelistAddress.trim()) return

    // Check if address is already in the whitelist
    if (whitelistedAddresses.includes(newWhitelistAddress)) {
      // Show error or notification
      return
    }

    setWhitelistedAddresses([...whitelistedAddresses, newWhitelistAddress])
    setNewWhitelistAddress("")
    setIsAddingAddress(false)
    // In a real app, you would call an API to update the whitelist
  }

  const removeFromWhitelist = (address: string) => {
    // Don't allow removing the admin address
    if (address === "AuwUfiwsXA6VibDjR579HWLhDUUoa5s6T7i7KPyLUa9F") {
      return
    }

    setShowDeleteConfirm({ type: "whitelist", address })
  }

  const addToBlacklist = () => {
    if (!newBlacklistAddress.trim()) return

    // Check if address is already in the blacklist
    if (blacklistedAddresses.includes(newBlacklistAddress)) {
      // Show error or notification
      return
    }

    setBlacklistedAddresses([...blacklistedAddresses, newBlacklistAddress])
    setNewBlacklistAddress("")
    setIsAddingBlacklist(false)
    // In a real app, you would call an API to update the blacklist
  }

  const removeFromBlacklist = (address: string) => {
    setShowDeleteConfirm({ type: "blacklist", address })
  }

  const confirmDelete = () => {
    if (!showDeleteConfirm) return

    if (showDeleteConfirm.type === "whitelist") {
      setWhitelistedAddresses(whitelistedAddresses.filter((addr) => addr !== showDeleteConfirm.address))
    } else {
      setBlacklistedAddresses(blacklistedAddresses.filter((addr) => addr !== showDeleteConfirm.address))
    }

    setShowDeleteConfirm(null)
    // In a real app, you would call an API to update the lists
  }

  const broadcastEmergency = () => {
    if (!emergencyMessage.trim()) return

    setShowEmergencyConfirm(true)
  }

  const confirmEmergency = () => {
    // In a real app, you would call an API to broadcast the emergency message
    setShowEmergencyConfirm(false)
    setEmergencyMessage("")
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
            <CyberButton onClick={() => router.push("/dashboard")} glowColor="pink">
              RETURN TO DASHBOARD
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
          <div className="flex justify-between items-center">
            <div>
              <GlitchText text="ADMIN SETTINGS" className="text-3xl font-bold text-neon-cyan mb-2" />
              <p className="text-zinc-400 font-tech-mono">System-wide configuration and security controls</p>
            </div>
          </div>
        </div>

        <DataPulse className="mb-8" color="cyan" />

        {killSwitchActive && (
          <CyberCard className="mb-8 bg-red-900/20 border-red-500/50">
            <div className="p-4 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <h3 className="text-lg font-bold text-red-500">KILL SWITCH ACTIVE</h3>
                <p className="text-zinc-300 font-tech-mono text-sm">
                  All tools and features are currently disabled. Only administrators can access the system.
                </p>
              </div>
              <CyberButton size="sm" glowColor="pink" className="ml-auto" onClick={handleKillSwitch}>
                DEACTIVATE
              </CyberButton>
            </div>
          </CyberCard>
        )}

        {blockAllConnections && (
          <CyberCard className="mb-8 bg-red-900/20 border-red-500/50">
            <div className="p-4 flex items-center gap-3">
              <UserX className="h-6 w-6 text-red-500" />
              <div>
                <h3 className="text-lg font-bold text-red-500">ALL CONNECTIONS BLOCKED</h3>
                <p className="text-zinc-300 font-tech-mono text-sm">
                  New wallet connections are currently blocked. Only pre-connected administrators can access the system.
                </p>
              </div>
              <CyberButton size="sm" glowColor="pink" className="ml-auto" onClick={handleBlockAllConnections}>
                ALLOW CONNECTIONS
              </CyberButton>
            </div>
          </CyberCard>
        )}

        <Tabs defaultValue="system" className="mb-8">
          <TabsList className="bg-black border border-zinc-800 mb-6">
            <TabsTrigger value="system" className="data-[state=active]:bg-zinc-800">
              System Controls
            </TabsTrigger>
            <TabsTrigger value="whitelist" className="data-[state=active]:bg-zinc-800">
              Whitelist
            </TabsTrigger>
            <TabsTrigger value="blacklist" className="data-[state=active]:bg-zinc-800">
              Blacklist
            </TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-zinc-800">
              Emergency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="system">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CyberCard className="bg-black/60">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-neon-cyan">System Security Controls</h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-red-900/20">
                          <Power className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">Kill Switch</h4>
                          <p className="text-zinc-400 text-sm">Disable all tools and features system-wide</p>
                        </div>
                      </div>
                      <CyberButton
                        size="sm"
                        variant={killSwitchActive ? "default" : "outline"}
                        glowColor={killSwitchActive ? "pink" : "cyan"}
                        onClick={handleKillSwitch}
                      >
                        {killSwitchActive ? "ACTIVE" : "INACTIVE"}
                      </CyberButton>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-amber-900/20">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">Maintenance Mode</h4>
                          <p className="text-zinc-400 text-sm">Display maintenance notice to all users</p>
                        </div>
                      </div>
                      <Switch
                        checked={maintenanceMode}
                        onCheckedChange={setMaintenanceMode}
                        className="data-[state=checked]:bg-neon-cyan"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-red-900/20">
                          <UserX className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">Block All Connections</h4>
                          <p className="text-zinc-400 text-sm">Prevent any new wallet connections</p>
                        </div>
                      </div>
                      <CyberButton
                        size="sm"
                        variant={blockAllConnections ? "default" : "outline"}
                        glowColor={blockAllConnections ? "pink" : "cyan"}
                        onClick={handleBlockAllConnections}
                      >
                        {blockAllConnections ? "ACTIVE" : "INACTIVE"}
                      </CyberButton>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-neon-cyan/20">
                          <UserCheck className="h-5 w-5 text-neon-cyan" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">Whitelist Only Mode</h4>
                          <p className="text-zinc-400 text-sm">Only allow connections from whitelisted addresses</p>
                        </div>
                      </div>
                      <Switch
                        checked={whitelistOnly}
                        onCheckedChange={setWhitelistOnly}
                        className="data-[state=checked]:bg-neon-cyan"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-neon-cyan/20">
                          <Eye className="h-5 w-5 text-neon-cyan" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">Log All Transactions</h4>
                          <p className="text-zinc-400 text-sm">Record all system transactions for auditing</p>
                        </div>
                      </div>
                      <Switch
                        checked={logAllTransactions}
                        onCheckedChange={setLogAllTransactions}
                        className="data-[state=checked]:bg-neon-cyan"
                      />
                    </div>
                  </div>
                </div>
              </CyberCard>

              <CyberCard className="bg-black/60">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-neon-cyan">System Status</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-tech-mono">System Version</span>
                      <span className="text-white font-tech-mono">0.9.7-alpha</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-tech-mono">Last Updated</span>
                      <span className="text-white font-tech-mono">2025-04-23 13:37:42</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-tech-mono">Connected Users</span>
                      <span className="text-white font-tech-mono">127</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-tech-mono">Active Tools</span>
                      <span className="text-white font-tech-mono">8/8</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-tech-mono">System Load</span>
                      <span className="text-green-400 font-tech-mono">24% (Normal)</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-tech-mono">Security Status</span>
                      <span className="text-green-400 font-tech-mono">Secure</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-zinc-800">
                    <div className="flex justify-between">
                      <CyberButton size="sm" variant="outline" glowColor="cyan" className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        REFRESH STATUS
                      </CyberButton>

                      <CyberButton size="sm" glowColor="pink">
                        SYSTEM LOGS
                      </CyberButton>
                    </div>
                  </div>
                </div>
              </CyberCard>
            </div>
          </TabsContent>

          <TabsContent value="whitelist">
            <CyberCard className="bg-black/60">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-neon-cyan">Whitelist Management</h3>
                  <CyberButton size="sm" glowColor="cyan" onClick={() => setIsAddingAddress(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    ADD ADDRESS
                  </CyberButton>
                </div>

                <div className="mb-6">
                  <p className="text-zinc-400 font-tech-mono text-sm">
                    Whitelisted addresses have guaranteed access to the system, even during lockdown or restricted
                    access modes.
                  </p>
                </div>

                {isAddingAddress && (
                  <div className="mb-6 p-4 border border-neon-cyan/30 rounded-md bg-black/50">
                    <h4 className="text-neon-cyan font-bold mb-3">Add Wallet to Whitelist</h4>
                    <div className="flex gap-3">
                      <Input
                        value={newWhitelistAddress}
                        onChange={(e) => setNewWhitelistAddress(e.target.value)}
                        placeholder="Enter wallet address"
                        className="flex-1 bg-black border-zinc-800 text-white"
                      />
                      <CyberButton size="sm" glowColor="cyan" onClick={addToWhitelist}>
                        ADD
                      </CyberButton>
                      <CyberButton
                        size="sm"
                        variant="outline"
                        glowColor="pink"
                        onClick={() => setIsAddingAddress(false)}
                      >
                        CANCEL
                      </CyberButton>
                    </div>
                  </div>
                )}

                <div className="border border-zinc-800 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-800 hover:bg-zinc-900">
                        <TableHead className="text-neon-cyan">Address</TableHead>
                        <TableHead className="text-neon-cyan">Status</TableHead>
                        <TableHead className="text-neon-cyan">Added</TableHead>
                        <TableHead className="text-neon-cyan text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {whitelistedAddresses.map((address, index) => (
                        <TableRow key={index} className="border-zinc-800 hover:bg-zinc-900">
                          <TableCell className="font-tech-mono text-white">
                            {address.slice(0, 6)}...{address.slice(-6)}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900/20 text-green-400">
                              Active
                            </span>
                          </TableCell>
                          <TableCell className="text-zinc-400">2025-04-23</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {address === "AuwUfiwsXA6VibDjR579HWLhDUUoa5s6T7i7KPyLUa9F" ? (
                                <span className="text-xs text-zinc-500 font-tech-mono">ADMIN (PROTECTED)</span>
                              ) : (
                                <CyberButton
                                  size="sm"
                                  variant="outline"
                                  glowColor="pink"
                                  onClick={() => removeFromWhitelist(address)}
                                >
                                  REMOVE
                                </CyberButton>
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
          </TabsContent>

          <TabsContent value="blacklist">
            <CyberCard className="bg-black/60">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-neon-cyan">Blacklist Management</h3>
                  <CyberButton size="sm" glowColor="cyan" onClick={() => setIsAddingBlacklist(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    ADD ADDRESS
                  </CyberButton>
                </div>

                <div className="mb-6">
                  <p className="text-zinc-400 font-tech-mono text-sm">
                    Blacklisted addresses are permanently blocked from accessing the system under any circumstances.
                  </p>
                </div>

                {isAddingBlacklist && (
                  <div className="mb-6 p-4 border border-neon-pink/30 rounded-md bg-black/50">
                    <h4 className="text-neon-pink font-bold mb-3">Add Wallet to Blacklist</h4>
                    <div className="flex gap-3">
                      <Input
                        value={newBlacklistAddress}
                        onChange={(e) => setNewBlacklistAddress(e.target.value)}
                        placeholder="Enter wallet address"
                        className="flex-1 bg-black border-zinc-800 text-white"
                      />
                      <CyberButton size="sm" glowColor="pink" onClick={addToBlacklist}>
                        ADD
                      </CyberButton>
                      <CyberButton
                        size="sm"
                        variant="outline"
                        glowColor="cyan"
                        onClick={() => setIsAddingBlacklist(false)}
                      >
                        CANCEL
                      </CyberButton>
                    </div>
                  </div>
                )}

                <div className="border border-zinc-800 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-800 hover:bg-zinc-900">
                        <TableHead className="text-neon-pink">Address</TableHead>
                        <TableHead className="text-neon-pink">Status</TableHead>
                        <TableHead className="text-neon-pink">Added</TableHead>
                        <TableHead className="text-neon-pink text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blacklistedAddresses.map((address, index) => (
                        <TableRow key={index} className="border-zinc-800 hover:bg-zinc-900">
                          <TableCell className="font-tech-mono text-white">
                            {address.slice(0, 6)}...{address.slice(-6)}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-900/20 text-red-400">
                              Blocked
                            </span>
                          </TableCell>
                          <TableCell className="text-zinc-400">2025-04-23</TableCell>
                          <TableCell className="text-right">
                            <CyberButton
                              size="sm"
                              variant="outline"
                              glowColor="pink"
                              onClick={() => removeFromBlacklist(address)}
                            >
                              REMOVE
                            </CyberButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CyberCard>
          </TabsContent>

          <TabsContent value="emergency">
            <CyberCard className="bg-black/60">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6 text-neon-cyan">Emergency Controls</h3>

                <div className="mb-6">
                  <p className="text-zinc-400 font-tech-mono text-sm">
                    These controls should only be used in emergency situations. All actions are logged and cannot be
                    undone.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-white mb-2">Emergency Contact</h4>
                    <Input
                      value={emergencyContactEmail}
                      onChange={(e) => setEmergencyContactEmail(e.target.value)}
                      className="bg-black border-zinc-800 text-white"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-2">Emergency Broadcast Message</h4>
                    <Textarea
                      value={emergencyMessage}
                      onChange={(e) => setEmergencyMessage(e.target.value)}
                      placeholder="Enter emergency message to broadcast to all users"
                      className="bg-black border-zinc-800 text-white h-32"
                    />
                  </div>

                  <div className="flex justify-end">
                    <CyberButton glowColor="pink" onClick={broadcastEmergency} disabled={!emergencyMessage.trim()}>
                      BROADCAST EMERGENCY MESSAGE
                    </CyberButton>
                  </div>

                  <div className="pt-6 border-t border-zinc-800">
                    <h4 className="font-bold text-white mb-4">Emergency Actions</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CyberButton variant="outline" glowColor="pink" className="border-red-500/50 hover:bg-red-900/20">
                        FORCE DISCONNECT ALL USERS
                      </CyberButton>

                      <CyberButton variant="outline" glowColor="pink" className="border-red-500/50 hover:bg-red-900/20">
                        LOCK ALL FUNDS
                      </CyberButton>

                      <CyberButton variant="outline" glowColor="pink" className="border-red-500/50 hover:bg-red-900/20">
                        PAUSE ALL TRANSACTIONS
                      </CyberButton>

                      <CyberButton variant="outline" glowColor="pink" className="border-red-500/50 hover:bg-red-900/20">
                        SYSTEM SHUTDOWN
                      </CyberButton>
                    </div>
                  </div>
                </div>
              </div>
            </CyberCard>
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialogs */}
      <Dialog open={showKillSwitchConfirm} onOpenChange={setShowKillSwitchConfirm}>
        <DialogContent className="bg-black border border-red-500/50">
          <DialogHeader>
            <DialogTitle className="text-red-500">Confirm Kill Switch Activation</DialogTitle>
            <DialogDescription className="text-zinc-400">
              This will disable all tools and features system-wide. Only administrators will be able to access the
              system.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-red-900/10 rounded-md border border-red-500/30 mb-4">
            <p className="text-white font-tech-mono text-sm">
              WARNING: This is a drastic measure and should only be used in emergency situations. All user operations
              will be immediately terminated.
            </p>
          </div>
          <DialogFooter>
            <CyberButton variant="outline" glowColor="cyan" onClick={() => setShowKillSwitchConfirm(false)}>
              CANCEL
            </CyberButton>
            <CyberButton glowColor="pink" onClick={confirmKillSwitch}>
              ACTIVATE KILL SWITCH
            </CyberButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBlockAllConfirm} onOpenChange={setShowBlockAllConfirm}>
        <DialogContent className="bg-black border border-red-500/50">
          <DialogHeader>
            <DialogTitle className="text-red-500">Confirm Connection Blocking</DialogTitle>
            <DialogDescription className="text-zinc-400">
              This will prevent any new wallet connections to the system. Only currently connected users will maintain
              access.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <CyberButton variant="outline" glowColor="cyan" onClick={() => setShowBlockAllConfirm(false)}>
              CANCEL
            </CyberButton>
            <CyberButton glowColor="pink" onClick={confirmBlockAll}>
              BLOCK ALL CONNECTIONS
            </CyberButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteConfirm !== null} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent className="bg-black border border-zinc-800">
          <DialogHeader>
            <DialogTitle>
              Confirm Removal from {showDeleteConfirm?.type === "whitelist" ? "Whitelist" : "Blacklist"}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Are you sure you want to remove this address?
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-black/50 rounded-md border border-zinc-800 mb-4">
            <p className="text-white font-tech-mono text-sm break-all">{showDeleteConfirm?.address}</p>
          </div>
          <DialogFooter>
            <CyberButton variant="outline" glowColor="cyan" onClick={() => setShowDeleteConfirm(null)}>
              CANCEL
            </CyberButton>
            <CyberButton glowColor="pink" onClick={confirmDelete}>
              CONFIRM REMOVAL
            </CyberButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEmergencyConfirm} onOpenChange={setShowEmergencyConfirm}>
        <DialogContent className="bg-black border border-red-500/50">
          <DialogHeader>
            <DialogTitle className="text-red-500">Confirm Emergency Broadcast</DialogTitle>
            <DialogDescription className="text-zinc-400">
              This message will be immediately displayed to all users of the system.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-red-900/10 rounded-md border border-red-500/30 mb-4">
            <p className="text-white font-tech-mono text-sm">{emergencyMessage}</p>
          </div>
          <DialogFooter>
            <CyberButton variant="outline" glowColor="cyan" onClick={() => setShowEmergencyConfirm(false)}>
              CANCEL
            </CyberButton>
            <CyberButton glowColor="pink" onClick={confirmEmergency}>
              BROADCAST MESSAGE
            </CyberButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
