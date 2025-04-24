"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/context/wallet-context"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import GlitchText from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"
import { Lock, Users, Settings, Database, Shield, Activity, Terminal, UserPlus, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const { connected, tier, address, isAdmin, accessMode, setAccessMode } = useWallet()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [lockdownConfirm, setLockdownConfirm] = useState(false)

  // Check if the user is authorized (admin status)
  useEffect(() => {
    setIsLoading(false)
  }, [])

  // Redirect to home if not connected
  useEffect(() => {
    if (!connected && !isLoading) {
      router.push("/")
    }
  }, [connected, isLoading, router])

  const toggleLockdownMode = () => {
    if (accessMode === "LOCKDOWN") {
      setAccessMode("NORMAL")
      setLockdownConfirm(false)
    } else {
      if (lockdownConfirm) {
        setAccessMode("LOCKDOWN")
        setLockdownConfirm(false)
      } else {
        setLockdownConfirm(true)
      }
    }
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
          <div className="flex justify-between items-center">
            <div>
              <GlitchText text="ADMIN CONTROL CENTER" className="text-3xl font-bold text-neon-cyan mb-2" />
              <p className="text-zinc-400 font-tech-mono">System administration and management interface</p>
            </div>

            <div>
              {accessMode === "LOCKDOWN" ? (
                <CyberButton onClick={toggleLockdownMode} glowColor="pink" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  EXIT LOCKDOWN MODE
                </CyberButton>
              ) : (
                <CyberButton
                  onClick={toggleLockdownMode}
                  glowColor="pink"
                  variant={lockdownConfirm ? "default" : "outline"}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  {lockdownConfirm ? "CONFIRM LOCKDOWN" : "ENTER LOCKDOWN MODE"}
                </CyberButton>
              )}
            </div>
          </div>
        </div>

        {accessMode === "LOCKDOWN" && (
          <div className="mb-8">
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

        <DataPulse className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/whitelist">
            <AdminCard
              title="Whitelist Management"
              icon={<UserPlus className="h-6 w-6" />}
              description="Manage whitelisted addresses and access permissions"
            />
          </Link>

          <AdminCard
            title="User Management"
            icon={<Users className="h-6 w-6" />}
            description="Manage user accounts, permissions, and access levels"
          />

          <AdminCard
            title="System Settings"
            icon={<Settings className="h-6 w-6" />}
            description="Configure global system parameters and settings"
          />

          <AdminCard
            title="Database Controls"
            icon={<Database className="h-6 w-6" />}
            description="Direct database access and management tools"
          />

          <AdminCard
            title="Security Center"
            icon={<Shield className="h-6 w-6" />}
            description="Security logs, alerts, and system integrity monitoring"
          />

          <AdminCard
            title="Activity Logs"
            icon={<Activity className="h-6 w-6" />}
            description="System-wide activity and transaction logs"
          />

          <AdminCard
            title="Developer Console"
            icon={<Terminal className="h-6 w-6" />}
            description="Advanced developer tools and system console"
            onClick={() => router.push("/dev-access")}
          />
        </div>
      </div>
    </div>
  )
}

function AdminCard({
  title,
  icon,
  description,
  onClick,
}: {
  title: string
  icon: React.ReactNode
  description: string
  onClick?: () => void
}) {
  return (
    <CyberCard className="h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer" onClick={onClick}>
      <div className="p-6 flex flex-col h-full">
        <div className="h-12 w-12 rounded-lg bg-black/50 border border-gray-800 flex items-center justify-center text-neon-cyan mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 flex-grow">{description}</p>
      </div>
    </CyberCard>
  )
}
