"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  ChevronRight,
  BarChart3,
  Settings,
  Shield,
  Menu,
  X,
  Zap,
  Crosshair,
  Layers,
  Cpu,
  Clock,
  Ghost,
  Droplets,
  Flame,
  Wallet,
  Sparkles,
  Lightbulb,
  Radar,
  Network,
  Fingerprint,
  Hourglass,
  Boxes,
  Landmark,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ACCESS_LEVELS, getUserAccessLevel } from "@/utils/access-control"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

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

  // Get user access level
  const userAccessLevel = getUserAccessLevel()

  // Define menu items with their required access levels (highest to lowest)
  const toolsMenuItems = [
    // Shadow Council (Level 4) Tools
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.BASIC,
      highlight: "cyan",
    },
    {
      name: "Quantum Manipulator",
      href: "/dashboard/tools/quantum-manipulator",
      icon: <Cpu className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.SHADOW_COUNCIL,
      highlight: "pink",
    },
    {
      name: "Temporal Fragmentation",
      href: "/dashboard/tools/temporal-fragmentation",
      icon: <Clock className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.SHADOW_COUNCIL,
      highlight: "pink",
    },
    {
      name: "Phantom Vault",
      href: "/dashboard/tools/phantom-vault",
      icon: <Ghost className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.SHADOW_COUNCIL,
      highlight: "pink",
    },
    {
      name: "MEV Extraction",
      href: "/dashboard/tools/mev-extraction",
      icon: <Zap className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_3,
      highlight: "pink",
    },
    {
      name: "Function Masquerading",
      href: "/dashboard/tools/function-masquerading",
      icon: <Fingerprint className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_3,
      highlight: "pink",
    },
    {
      name: "Hidden Tax Implementer",
      href: "/dashboard/tools/hidden-tax-implementer",
      icon: <Landmark className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_3,
      highlight: "pink",
    },
    {
      name: "Emissions Skimming",
      href: "/dashboard/tools/emissions-skimming",
      icon: <Droplets className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_3,
      highlight: "pink",
    },
    {
      name: "Flashloan Lab",
      href: "/dashboard/tools/flashloan-lab",
      icon: <Flame className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_2,
      highlight: "cyan",
    },
    {
      name: "Sandwich Attack",
      href: "/dashboard/tools/sandwich-attack",
      icon: <Layers className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_2,
      highlight: "cyan",
    },
    {
      name: "Liquidity Mirage",
      href: "/dashboard/tools/liquidity-mirage",
      icon: <Sparkles className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_2,
      highlight: "cyan",
    },
    {
      name: "Stealth Router",
      href: "/dashboard/tools/stealth-router",
      icon: <Network className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_2,
      highlight: "cyan",
    },
    {
      name: "Sniper Bot",
      href: "/dashboard/tools/sniper-bot",
      icon: <Crosshair className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_1,
      highlight: "cyan",
    },
    {
      name: "Whale Tracker",
      href: "/dashboard/tools/whale-tracker",
      icon: <Radar className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_1,
      highlight: "cyan",
    },
    {
      name: "Liquidation Hunter",
      href: "/dashboard/tools/liquidation-hunter",
      icon: <Hourglass className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_1,
      highlight: "cyan",
    },
    {
      name: "AI Strategy",
      href: "/dashboard/tools/ai-strategy",
      icon: <Lightbulb className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_1,
      highlight: "cyan",
    },
    {
      name: "Token Creation",
      href: "/dashboard/tools/token-creation",
      icon: <Boxes className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_1,
      highlight: "cyan",
    },
    {
      name: "Wallet",
      href: "/dashboard/wallet",
      icon: <Wallet className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.BASIC,
      highlight: "cyan",
    },
  ]

  // Administrative items - moved to the bottom
  const adminItems = [
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.BASIC,
      highlight: "gray",
    },
    {
      name: "ADMIN",
      href: "/admin",
      icon: <Shield className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.SHADOW_COUNCIL, // Only highest level can access admin
      highlight: "purple",
    },
  ]

  // Filter menu items based on user access level
  const filteredToolsMenuItems = toolsMenuItems.filter((item) => userAccessLevel >= item.accessLevel)
  const filteredAdminItems = adminItems.filter((item) => userAccessLevel >= item.accessLevel)

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-black border-r border-zinc-800 transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && (
            <Image src="/blkbox-logo-new.png" alt="BLKBOX Logo" width={120} height={30} className="mr-2" priority />
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-md flex items-center justify-center">
              <span className="text-xs font-bold text-white">BX</span>
            </div>
          )}
        </div>
        <button
          onClick={toggleCollapse}
          className="text-gray-400 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <nav className="px-2 space-y-1">
          {filteredToolsMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all",
                pathname === item.href
                  ? "bg-zinc-800 text-white border-l-2 border-neon-cyan"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white",
                collapsed && "justify-center",
              )}
            >
              <div className={cn("flex-shrink-0", collapsed ? "" : "mr-3")}>{item.icon}</div>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Admin section at the bottom with more spacing */}
      <div className="mt-auto border-t border-zinc-800 pt-4 pb-6">
        <nav className="px-2 space-y-1">
          {filteredAdminItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all",
                pathname === item.href
                  ? "bg-zinc-800 text-white border-l-2 border-neon-cyan"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white",
                collapsed && "justify-center",
              )}
            >
              <div className={cn("flex-shrink-0", collapsed ? "" : "mr-3")}>{item.icon}</div>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Collapse button that protrudes from sidebar */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-20 bg-gray-900 border border-gray-700 rounded-full p-1 shadow-lg hover:bg-gray-800 transition-all"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronRight className={cn("h-4 w-4 text-gray-400", collapsed ? "rotate-0" : "rotate-180")} />
      </button>
    </div>
  )
}
