"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useWallet } from "@/context/wallet-context"
import MobileNav from "@/components/mobile-nav"
import {
  LayoutDashboard,
  Zap,
  Brain,
  Target,
  Rocket,
  Crosshair,
  ArrowUpRight,
  Settings,
  Shield,
  ChevronLeft,
} from "lucide-react"
import WalletConnector from "@/components/wallet-connector"
import { Shuffle, Eye, Lightbulb } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { connected, tier, isAdmin } = useWallet()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Check if we're on a sub-page that needs the back arrow
  const isSubPage = pathname !== "/dashboard" && pathname !== "/"

  const navItems = [
    {
      name: "", // Empty name for icon-only
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
      name: "Tracker",
      href: "/dashboard/tools/whale-tracker",
      icon: <Target className="h-5 w-5" />,
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
      name: "AI",
      href: "/dashboard/tools/ai-strategy",
      icon: <Brain className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "OPERATOR",
    },
    {
      name: "Hunter",
      href: "/dashboard/tools/liquidation-hunter",
      icon: <Target className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Router",
      href: "/dashboard/tools/stealth-router",
      icon: <ArrowUpRight className="h-5 w-5" />,
      requiresAuth: true,
      minTier: "OPERATOR",
    },
    {
      name: "Bot",
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
      href: "/dashboard/tools/wash-trading-engine",
      icon: Shuffle,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Detect",
      href: "/dashboard/tools/market-manipulation-detection",
      icon: Eye,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Hijack",
      href: "/dashboard/tools/shadow-protocol-interoperability-hijacker",
      icon: Zap,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Quantum",
      href: "/dashboard/tools/quantum-state-token-manipulator",
      icon: Brain,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Temporal",
      href: "/dashboard/tools/temporal-fragmentation-engine",
      icon: Target,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Masq",
      href: "/dashboard/tools/function-masquerading-system",
      icon: Shield,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Tax",
      href: "/dashboard/tools/hidden-tax-implementer",
      icon: Rocket,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Vault",
      href: "/dashboard/tools/phantom-vault-constructor",
      icon: Crosshair,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Skim",
      href: "/dashboard/tools/emissions-skimming-system",
      icon: Lightbulb,
      requiresAuth: true,
      minTier: "PHANTOM_COUNCIL",
    },
    {
      name: "Mirage",
      href: "/dashboard/tools/liquidity-mirage-creator",
      icon: Shuffle,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Sandwich",
      href: "/dashboard/tools/sandwich-attack-automation",
      icon: Eye,
      requiresAuth: true,
      minTier: "OPERATOR",
    },
    {
      name: "Token",
      href: "/dashboard/tools/token-creation-wizard",
      icon: Zap,
      requiresAuth: true,
      minTier: "SHADOW_ELITE",
    },
    {
      name: "Arb",
      href: "/dashboard/tools/automated-arbitrage",
      icon: Brain,
      requiresAuth: true,
      minTier: "OPERATOR",
    },
    {
      name: "Upgrade",
      href: "/dashboard/upgrade",
      icon: Zap,
      requiresAuth: true,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {/* Updated logo with the new image */}
            <Link href="/" className="flex items-center">
              <Image src="/blkbox-logo-new.png" alt="BLKBOX" width={60} height={60} className="rounded-sm" />
            </Link>
            <div className="hidden md:flex items-center ml-4 space-x-1">
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
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.name && item.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Settings button */}
            {connected && (
              <Link
                href="/dashboard/settings"
                className="hidden md:flex items-center justify-center px-2 py-1.5 rounded-md text-sm font-medium bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <Settings className="h-4 w-4" />
              </Link>
            )}
            {/* Admin button */}
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden md:flex items-center justify-center px-2 py-1.5 rounded-md text-sm font-medium bg-red-900/20 text-red-400 hover:bg-red-900/30 transition-colors"
              >
                <Shield className="h-4 w-4" />
              </Link>
            )}
            {/* Wallet connector - only one instance now */}
            <div className="hidden md:block">
              <WalletConnector buttonText="CONNECT" />
            </div>
            <div className="md:hidden">
              <MobileNav items={navItems} />
            </div>
          </div>
        </div>
      </header>

      {/* Simplified sub-navigation - only arrow shown if on a sub-page */}
      {isSubPage && (
        <div className="py-2 px-4 border-b border-zinc-800">
          <Link href="/dashboard" className="text-zinc-400 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to Dashboard</span>
          </Link>
        </div>
      )}

      <main className="flex-1">{children}</main>
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

  return tierLevels[userTier as keyof typeof tierLevels] >= tierLevels[requiredTier as keyof typeof tierLevels]
}
