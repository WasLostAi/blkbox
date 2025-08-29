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
  Crosshair,
  Rocket,
  Target,
  Eye,
  RefreshCw,
  Lightbulb,
  AlertTriangle,
  Shuffle,
  Layers,
  Lock,
  Users,
  Shield,
  Settings,
  Menu,
  ChevronLeft,
  FileCode,
  Activity,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import WalletConnector from "@/components/wallet-connector"
import { useState, useEffect } from "react"
import PageHeader from "@/components/page-header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { connected, tier, isAdmin } = useWallet()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  // Load collapsed state from localStorage on component mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed")
    if (savedCollapsed !== null) {
      setCollapsed(savedCollapsed === "true")
    }
  }, [])

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(collapsed))
  }, [collapsed])

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Check if we're on a sub-page that needs the back arrow
  const isSubPage = pathname !== "/dashboard" && pathname !== "/"

  // Get current page title based on pathname
  const getPageTitle = () => {
    // Extract the last part of the path
    const pathSegments = pathname.split("/")
    const lastSegment = pathSegments[pathSegments.length - 1]

    // If we're at the dashboard root
    if (pathname === "/dashboard") {
      return "Dashboard"
    }

    // If we're in a tool page
    if (pathname.includes("/tools/")) {
      // Convert kebab-case to Title Case
      return lastSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    }

    // Default case - capitalize the last segment
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
  }

  const navItems = [
    {
      name: "Dashboard",
      fullName: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      name: "Swap",
      fullName: "Shadow Swap",
      href: "/dashboard/tools/shadow-swap",
      icon: <Shuffle className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "ENTRY_LEVEL",
    },
    {
      name: "Whale Track",
      fullName: "Whale Tracker",
      href: "/dashboard/tools/whale-tracker",
      icon: <Users className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "ENTRY_LEVEL",
    },
    {
      name: "AI Strat",
      fullName: "AI Strategy Lab",
      href: "/dashboard/tools/ai-strategy",
      icon: <Brain className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "ENTRY_LEVEL",
    },
    {
      name: "Phantom Int.",
      fullName: "Phantom Interoperability",
      href: "/dashboard/tools/interoperability",
      icon: <Layers className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "MEV Extract",
      fullName: "MEV Extraction",
      href: "/dashboard/tools/mev-extraction",
      icon: <Zap className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Liq. Hunter",
      fullName: "Liquidation Hunter",
      href: "/dashboard/tools/liquidation-hunter",
      icon: <Target className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Flash Lab",
      fullName: "Flashloan Laboratory",
      href: "/dashboard/tools/flashloan-lab",
      icon: <Lightbulb className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Stealth Rout.",
      fullName: "Stealth Router",
      href: "/dashboard/tools/stealth-router",
      icon: <Eye className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "OPERATOR",
    },
    {
      name: "Sniper",
      fullName: "Sniper Bot",
      href: "/dashboard/tools/sniper-bot",
      icon: <Crosshair className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "OPERATOR",
    },
    {
      name: "Dark Launch",
      fullName: "Dark Launch Toolkit",
      href: "/dashboard/tools/dark-launch",
      icon: <Rocket className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Liquidity Mir.",
      fullName: "Liquidity Mirage",
      href: "/dashboard/tools/liquidity-mirage",
      icon: <Eye className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Wash Trade",
      fullName: "Wash Trading Engine",
      href: "/dashboard/tools/wash-trading",
      icon: <RefreshCw className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Detect",
      fullName: "Manipulation Detection",
      href: "/dashboard/tools/manipulation-detection",
      icon: <AlertTriangle className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Quantum",
      fullName: "Quantum Manipulator",
      href: "/dashboard/tools/quantum-manipulator",
      icon: <Zap className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Temporal",
      fullName: "Temporal Fragmentation",
      href: "/dashboard/tools/temporal-fragmentation",
      icon: <Shuffle className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Hidden Tax",
      fullName: "Hidden Tax Implementer",
      href: "/dashboard/tools/hidden-tax-implementer",
      icon: <Shield className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Phantom V.",
      fullName: "Phantom Vault",
      href: "/dashboard/tools/phantom-vault",
      icon: <Lock className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Emissions",
      fullName: "Emissions Skimming",
      href: "/dashboard/tools/emissions-skimming",
      icon: <Zap className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Sandwich",
      fullName: "Sandwich Attack Engine",
      href: "/dashboard/tools/sandwich-attack",
      icon: <AlertTriangle className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Token Gen",
      fullName: "Token Generation Suite",
      href: "/dashboard/tools/token-creation",
      icon: <FileCode className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "OPERATOR",
    },
    {
      name: "Auto Arb",
      fullName: "Automated Arbitrage",
      href: "/dashboard/tools/automated-arbitrage",
      icon: <Activity className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Upgrade",
      fullName: "Upgrade Tier",
      href: "/dashboard/upgrade",
      icon: <Zap className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      name: "Settings",
      fullName: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      requiresAuth: true,
    },
  ]

  const tierLevels = {
    UNAUTHORIZED: 0,
    ENTRY_LEVEL: 1,
    OPERATOR: 2,
    SHADOW_ELITE: 3,
    PHANTOM_COUNCIL: 4,
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - desktop */}
      <aside
        className={cn(
          "hidden md:block border-r border-zinc-800 bg-black/90 backdrop-blur-sm fixed h-full z-30 transition-all duration-300",
          collapsed ? "w-16" : "w-40",
        )}
      >
        <div className={cn("border-b border-zinc-800 flex items-center justify-center", collapsed ? "p-2" : "p-3")}>
          <Link href="/" className="flex items-center justify-center">
            <Image src="/blkbox-logo-new.png" alt="BLKBOX" width={36} height={36} className="rounded-sm" />
          </Link>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto py-2 h-[calc(100%-160px)]">
          <nav className={cn("space-y-1", collapsed ? "px-0" : "px-1")}>
            {navItems
              .filter(
                (item) =>
                  !item.requiresAuth ||
                  (connected &&
                    (!item.adminOnly || isAdmin) &&
                    (!item.minTier || tier === item.minTier || tierLevelCheck(tier, item.minTier))),
              )
              .map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md text-sm font-medium transition-colors",
                      collapsed ? "justify-center py-3 px-0" : "items-start px-3 py-2",
                      isActive(item.href)
                        ? collapsed
                          ? "bg-zinc-800 text-neon-cyan border-l-2 border-neon-cyan"
                          : "bg-zinc-800 text-neon-cyan border-l-2 border-neon-cyan"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                    )}
                  >
                    <span className={cn(collapsed ? "mr-0" : "mr-3 mt-0.5")}>{item.icon}</span>
                    {!collapsed && <span className="font-tech-mono leading-tight">{item.name}</span>}
                  </Link>
                  {collapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black border border-neon-cyan/50 rounded text-xs font-tech-mono text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.fullName}
                    </div>
                  )}
                </div>
              ))}
          </nav>
        </div>

        {/* Admin button at bottom of sidebar */}
        {isAdmin && (
          <div className={cn("border-t border-zinc-800 absolute bottom-[120px] w-full", collapsed ? "p-2" : "p-3")}>
            <Link
              href="/admin"
              className={cn(
                "flex rounded-md text-sm font-medium text-zinc-400 hover:text-neon-cyan hover:bg-zinc-900 transition-colors",
                collapsed ? "justify-center py-3 px-0" : "items-center px-2 py-2",
              )}
              title="Admin"
            >
              <Shield className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span className="font-tech-mono">ADMIN</span>}
            </Link>
          </div>
        )}

        {/* Collapse toggle button */}
        <div className={cn("border-t border-zinc-800 absolute bottom-[60px] w-full", collapsed ? "p-2" : "p-3")}>
          <button
            onClick={toggleCollapse}
            className={cn(
              "flex w-full rounded-md text-sm font-medium text-zinc-400 hover:text-neon-cyan hover:bg-zinc-900 transition-colors",
              collapsed ? "justify-center py-3 px-0" : "items-center px-2 py-2",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronsRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronsLeft className="h-5 w-5 mr-2" />
                <span className="font-tech-mono">COLLAPSE</span>
              </>
            )}
          </button>
        </div>

        {/* Wallet connector at bottom of sidebar */}
        <div className={cn("border-t border-zinc-800 absolute bottom-0 w-full", collapsed ? "p-2" : "p-3")}>
          <WalletConnector buttonText={collapsed ? "" : "CONNECT"} buttonSize={collapsed ? "icon" : "default"} />
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-zinc-800 flex items-center justify-between p-4">
        <button onClick={() => setSidebarOpen(true)} className="text-neon-cyan hover:text-neon-pink transition-colors">
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/" className="flex items-center">
          <Image src="/blkbox-logo-new.png" alt="BLKBOX" width={36} height={36} className="rounded-sm" />
        </Link>
        <WalletConnector buttonSize="sm" />
      </div>

      {/* Main content */}
      <div className={cn("w-full transition-all duration-300", collapsed ? "md:pl-16" : "md:pl-40")}>
        {/* Back button for sub-pages */}
        {isSubPage && (
          <div className="py-2 px-4 border-b border-zinc-800 md:hidden">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white flex items-center">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="font-tech-mono text-sm">Back to Dashboard</span>
            </Link>
          </div>
        )}

        {/* Page header */}
        <PageHeader title={getPageTitle()} />

        {/* Main content area */}
        <main className="pt-16 md:pt-0 px-4 py-6">{children}</main>
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
