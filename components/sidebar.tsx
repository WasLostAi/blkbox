"use client"

import { useState } from "react"
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
import { getUserAccessLevel } from "@/utils/access-control"

// Define access levels
const ACCESS_LEVELS = {
  SHADOW_COUNCIL: 4,
  TIER_3: 3,
  TIER_2: 2,
  TIER_1: 1,
  BASIC: 0,
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  // Simulate user access level - in a real app, this would come from authentication
  const userAccessLevel = getUserAccessLevel()

  // Define menu items with their required access levels (highest to lowest)
  const toolsMenuItems = [
    // Shadow Council (Level 4) Tools
    {
      name: "Quantum Manipulator",
      href: "/dashboard/tools/quantum-manipulator",
      icon: <Cpu className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.SHADOW_COUNCIL,
      highlight: "red",
    },
    {
      name: "Temporal Fragmentation",
      href: "/dashboard/tools/temporal-fragmentation",
      icon: <Clock className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.SHADOW_COUNCIL,
      highlight: "red",
    },
    {
      name: "Phantom Vault",
      href: "/dashboard/tools/phantom-vault",
      icon: <Ghost className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.SHADOW_COUNCIL,
      highlight: "red",
    },

    // Tier 3 (Level 3) Tools
    {
      name: "MEV Extraction",
      href: "/dashboard/tools/mev-extraction",
      icon: <Zap className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_3,
      highlight: "orange",
    },
    {
      name: "Function Masquerading",
      href: "/dashboard/tools/function-masquerading",
      icon: <Fingerprint className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_3,
      highlight: "orange",
    },
    {
      name: "Hidden Tax Implementer",
      href: "/dashboard/tools/hidden-tax-implementer",
      icon: <Landmark className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_3,
      highlight: "orange",
    },
    {
      name: "Emissions Skimming",
      href: "/dashboard/tools/emissions-skimming",
      icon: <Droplets className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_3,
      highlight: "orange",
    },

    // Tier 2 (Level 2) Tools
    {
      name: "Flashloan Lab",
      href: "/dashboard/tools/flashloan-lab",
      icon: <Flame className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_2,
      highlight: "yellow",
    },
    {
      name: "Sandwich Attack",
      href: "/dashboard/tools/sandwich-attack",
      icon: <Layers className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_2,
      highlight: "yellow",
    },
    {
      name: "Liquidity Mirage",
      href: "/dashboard/tools/liquidity-mirage",
      icon: <Sparkles className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_2,
      highlight: "yellow",
    },
    {
      name: "Stealth Router",
      href: "/dashboard/tools/stealth-router",
      icon: <Network className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_2,
      highlight: "yellow",
    },

    // Tier 1 (Level 1) Tools
    {
      name: "Sniper Bot",
      href: "/dashboard/tools/sniper-bot",
      icon: <Crosshair className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_1,
      highlight: "green",
    },
    {
      name: "Whale Tracker",
      href: "/dashboard/tools/whale-tracker",
      icon: <Radar className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_1,
      highlight: "green",
    },
    {
      name: "Liquidation Hunter",
      href: "/dashboard/tools/liquidation-hunter",
      icon: <Hourglass className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_1,
      highlight: "green",
    },
    {
      name: "AI Strategy",
      href: "/dashboard/tools/ai-strategy",
      icon: <Lightbulb className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_1,
      highlight: "green",
    },
    {
      name: "Token Creation",
      href: "/dashboard/tools/token-creation",
      icon: <Boxes className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.TIER_1,
      highlight: "green",
    },

    // Basic (Level 0) Tools
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.BASIC,
      highlight: "blue",
    },
    {
      name: "Wallet",
      href: "/dashboard/wallet",
      icon: <Wallet className="h-5 w-5" />,
      accessLevel: ACCESS_LEVELS.BASIC,
      highlight: "blue",
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

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-black border-r border-gray-800 transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && (
            <Image src="/blkbox-logo-new.png" alt="BLKBOX Logo" width={120} height={30} className="mr-2" />
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-md flex items-center justify-center">
              <span className="text-xs font-bold text-white">BX</span>
            </div>
          )}
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white">
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-800">
        <nav className="px-2 space-y-1">
          {filteredToolsMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md group transition-all",
                pathname === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                collapsed && "justify-center",
              )}
            >
              <div
                className={cn(
                  "mr-3 flex-shrink-0",
                  `border-l-2 border-${item.highlight}-500 pl-2`,
                  collapsed && "mr-0 border-l-0 border-b-2 pb-2 pl-0",
                )}
              >
                {item.icon}
              </div>
              {!collapsed && <span>{item.name}</span>}
              {!collapsed && pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          ))}
        </nav>
      </div>

      {/* Admin section at the bottom with more spacing */}
      <div className="mt-auto border-t border-gray-800 pt-4 pb-6">
        <nav className="px-2 space-y-1">
          {filteredAdminItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md group transition-all",
                pathname === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                collapsed && "justify-center",
              )}
            >
              <div
                className={cn(
                  "mr-3 flex-shrink-0",
                  `border-l-2 border-${item.highlight}-500 pl-2`,
                  collapsed && "mr-0 border-l-0 border-b-2 pb-2 pl-0",
                )}
              >
                {item.icon}
              </div>
              {!collapsed && <span>{item.name}</span>}
              {!collapsed && pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          ))}
        </nav>
      </div>

      {/* Collapse button that protrudes from sidebar */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-gray-900 border border-gray-700 rounded-full p-1 shadow-lg hover:bg-gray-800 transition-all"
      >
        <ChevronRight className={cn("h-4 w-4 text-gray-400", collapsed ? "rotate-0" : "rotate-180")} />
      </button>
    </div>
  )
}
