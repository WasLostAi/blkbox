"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useWallet } from "@/context/wallet-context"
import {
  LayoutDashboard,
  Zap,
  Brain,
  Target,
  Lightbulb,
  Rocket,
  Crosshair,
  Settings,
  Shield,
  ChevronLeft,
  RefreshCw,
  Users,
  AlertTriangle,
  Menu,
  X,
  Eye,
} from "lucide-react"
import WalletConnector from "@/components/wallet-connector"
import { useState } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { connected, tier, isAdmin } = useWallet()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Check if we're on a sub-page that needs the back arrow
  const isSubPage = pathname !== "/dashboard" && pathname !== "/"

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      name: "Swap",
      href: "/dashboard/tools/shadow-swap",
      icon: <Zap className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "ENTRY_LEVEL",
    },
    {
      name: "Whale Tracker",
      href: "/dashboard/tools/whale-tracker",
      icon: <Users className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "ENTRY_LEVEL",
    },
    {
      name: "AI Strategy",
      href: "/dashboard/tools/ai-strategy",
      icon: <Brain className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "ENTRY_LEVEL",
    },
    {
      name: "MEV",
      href: "/dashboard/tools/mev-extraction",
      icon: <Zap className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Liquidation",
      href: "/dashboard/tools/liquidation-hunter",
      icon: <Target className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Flashloan",
      href: "/dashboard/tools/flashloan-lab",
      icon: <Lightbulb className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Router",
      href: "/dashboard/tools/stealth-router",
      icon: <Eye className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "OPERATOR",
    },
    {
      name: "Sniper",
      href: "/dashboard/tools/sniper-bot",
      icon: <Crosshair className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "OPERATOR",
    },
    {
      name: "Launch",
      href: "/dashboard/tools/dark-launch",
      icon: <Rocket className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Wash",
      href: "/dashboard/tools/wash-trading",
      icon: <RefreshCw className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Detect",
      href: "/dashboard/tools/manipulation-detection",
      icon: <AlertTriangle className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Upgrade",
      href: "/dashboard/upgrade",
      icon: <Zap className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      requiresAuth: true,
    },
  ]

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - desktop */}
      <aside className="hidden md:block w-48 border-r border-zinc-800 bg-black/90 backdrop-blur-sm fixed h-full z-30">
        <div className="p-3 border-b border-zinc-800">
          <Link href="/" className="flex items-center">
            <Image src="/blkbox-logo-new.png" alt="BLKBOX" width={36} height={36} className="rounded-sm" />
            <span className="ml-2 text-lg font-bold text-neon-pink">$BLKBOX</span>
          </Link>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto py-2 h-[calc(100%-160px)]">
          <nav className="px-1 space-y-1">
            {navItems
              .filter(
                (item) =>
                  !item.requiresAuth ||
                  (connected &&
                    (!item.adminOnly || isAdmin) &&
                    (!item.minTier || tier === item.minTier || tierLevelCheck(tier, item.minTier))),
              )
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-start px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-zinc-800 text-neon-cyan border-l-2 border-neon-cyan"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                  )}
                >
                  <span className="mr-3 mt-0.5">{item.icon}</span>
                  <span className="font-tech-mono leading-tight">{item.name}</span>
                </Link>
              ))}
          </nav>
        </div>

        {/* Admin button at bottom of sidebar */}
        {isAdmin && (
          <div className="p-3 border-t border-zinc-800 absolute bottom-[60px] w-full">
            <Link
              href="/admin"
              className="flex items-center px-2 py-2 rounded-md text-sm font-medium bg-red-900/20 text-red-400 hover:bg-red-900/30 transition-colors"
            >
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-tech-mono">ADMIN</span>
            </Link>
          </div>
        )}

        {/* Wallet connector at bottom of sidebar */}
        <div className="p-3 border-t border-zinc-800 absolute bottom-0 w-full">
          <WalletConnector buttonText="CONNECT" />
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-zinc-800 flex items-center justify-between p-4">
        <button onClick={() => setSidebarOpen(true)} className="text-neon-cyan hover:text-neon-pink transition-colors">
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/" className="flex items-center">
          <Image src="/blkbox-logo-new.png" alt="BLKBOX" width={36} height={36} className="rounded-sm" />
          <span className="ml-2 text-lg font-bold text-neon-pink">$BLKBOX</span>
        </Link>
        <WalletConnector buttonSize="sm" />
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/95 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
          <Link href="/" className="flex items-center">
            <Image src="/blkbox-logo-new.png" alt="BLKBOX" width={40} height={40} className="rounded-sm" />
            <span className="ml-3 text-lg font-bold text-neon-pink">$BLKBOX</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-neon-pink hover:text-neon-cyan transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto py-4 px-2 h-[calc(100%-80px)]">
          <nav className="space-y-1">
            {navItems
              .filter(
                (item) =>
                  !item.requiresAuth ||
                  (connected &&
                    (!item.adminOnly || isAdmin) &&
                    (!item.minTier || tier === item.minTier || tierLevelCheck(tier, item.minTier))),
              )
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-zinc-800 text-neon-cyan border-l-2 border-neon-cyan"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-tech-mono">{item.name}</span>
                </Link>
              ))}
          </nav>
        </div>

        {/* Admin button in mobile sidebar */}
        {isAdmin && (
          <div className="px-2 py-4 border-t border-zinc-800 absolute bottom-0 w-full">
            <Link
              href="/admin"
              className="flex items-center px-3 py-3 rounded-md text-sm font-medium bg-red-900/20 text-red-400 hover:bg-red-900/30 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <Shield className="h-5 w-5 mr-3" />
              <span className="font-tech-mono">ADMIN</span>
            </Link>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="w-full md:pl-48">
        {/* Back button for sub-pages */}
        {isSubPage && (
          <div className="py-2 px-4 border-b border-zinc-800 md:hidden">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white flex items-center">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="font-tech-mono text-sm">Back to Dashboard</span>
            </Link>
          </div>
        )}

        {/* Main content area */}
        <main className="pt-16 md:pt-0">{children}</main>
      </div>
    </div>
  )
}

// Helper function to check if user tier is high enough
function tierLevelCheck(userTier: string, requiredTier: string) {
  const tierLevels = {
    UNAUTHORIZED: 0,
    ENTRY_LEVEL: 1,
    OPERATOR: 2,
    SHADOW_ELITE: 3,
    PHANTOM_COUNCIL: 4,
  }

  // Always return true for PHANTOM_COUNCIL tier (highest tier)
  if (userTier === "PHANTOM_COUNCIL") return true

  return tierLevels[userTier as keyof typeof tierLevels] >= tierLevels[requiredTier as keyof typeof tierLevels]
}
