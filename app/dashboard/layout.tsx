import type React from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import {
  Home,
  Menu,
  Shield,
  Zap,
  Bot,
  LineChart,
  Wallet,
  Code,
  Eye,
  Sparkles,
  Layers,
  ArrowLeftRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MobileNav from "@/components/mobile-nav"
import WalletConnector from "@/components/wallet-connector"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  requiredTier?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Navigation items
  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Base Tier Tools",
      href: "/dashboard/tools/base-tier",
      icon: <Shield className="h-4 w-4" />,
    },
  ]

  const toolSections: NavSection[] = [
    {
      title: "Trading Tools",
      items: [
        {
          title: "Shadow Swap",
          href: "/dashboard/tools/shadow-swap",
          icon: <ArrowLeftRight className="h-4 w-4" />,
          requiredTier: "ENTRY_LEVEL",
        },
        {
          title: "Jupiter Swap",
          href: "/dashboard/tools/jupiter-swap",
          icon: <ArrowLeftRight className="h-4 w-4" />,
          requiredTier: "ENTRY_LEVEL",
        },
        {
          title: "AI Strategy",
          href: "/dashboard/tools/ai-strategy",
          icon: <Bot className="h-4 w-4" />,
          requiredTier: "OPERATOR",
        },
        {
          title: "Whale Tracker",
          href: "/dashboard/tools/whale-tracker",
          icon: <LineChart className="h-4 w-4" />,
          requiredTier: "OPERATOR",
        },
      ],
    },
    {
      title: "Advanced Tools",
      items: [
        {
          title: "MEV Extraction",
          href: "/dashboard/tools/mev-extraction",
          icon: <Zap className="h-4 w-4" />,
          requiredTier: "SHADOW_ELITE",
        },
        {
          title: "Liquidation Hunter",
          href: "/dashboard/tools/liquidation-hunter",
          icon: <Wallet className="h-4 w-4" />,
          requiredTier: "SHADOW_ELITE",
        },
        {
          title: "Flashloan Lab",
          href: "/dashboard/tools/flashloan-lab",
          icon: <Code className="h-4 w-4" />,
          requiredTier: "SHADOW_ELITE",
        },
        {
          title: "Stealth Router",
          href: "/dashboard/tools/stealth-router",
          icon: <Eye className="h-4 w-4" />,
          requiredTier: "PHANTOM_COUNCIL",
        },
      ],
    },
    {
      title: "Experimental Tools",
      items: [
        {
          title: "Quantum State Manipulator",
          href: "/dashboard/tools/quantum-state-manipulator",
          icon: <Sparkles className="h-4 w-4" />,
          requiredTier: "PHANTOM_COUNCIL",
        },
        {
          title: "Temporal Fragmentation",
          href: "/dashboard/tools/temporal-fragmentation",
          icon: <Layers className="h-4 w-4" />,
          requiredTier: "PHANTOM_COUNCIL",
        },
        {
          title: "Liquidity Mirage",
          href: "/dashboard/tools/liquidity-mirage",
          icon: <Eye className="h-4 w-4" />,
          requiredTier: "PHANTOM_COUNCIL",
        },
        {
          title: "Shadow Protocol",
          href: "/dashboard/tools/shadow-protocol",
          icon: <Shield className="h-4 w-4" />,
          requiredTier: "PHANTOM_COUNCIL",
        },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-10">
        <div className="flex flex-col h-full border-r border-neon-pink/20 bg-black/90 backdrop-blur-sm">
          <div className="h-16 flex items-center border-b border-neon-pink/20 px-6">
            <Link href="/" className="flex items-center gap-2">
              <img src="/blkhrt-logo.png" alt="$BLKBOX" className="h-8 w-8" />
              <span className="font-tech-mono text-neon-pink text-xl">$BLKBOX</span>
            </Link>
          </div>

          <ScrollArea className="flex-1 py-4">
            <nav className="px-4 space-y-6">
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      "hover:bg-neon-pink/10 hover:text-neon-pink",
                      "text-zinc-400",
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>

              {toolSections.map((section) => (
                <div key={section.title} className="space-y-1">
                  <h4 className="text-xs font-semibold text-zinc-500 px-3 mb-2">{section.title}</h4>
                  {section.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        "hover:bg-neon-pink/10 hover:text-neon-pink",
                        "text-zinc-400",
                      )}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      {item.requiredTier && (
                        <span className="ml-auto text-xs px-1.5 py-0.5 rounded bg-neon-pink/10 text-neon-pink">
                          {item.requiredTier.replace("_", " ")}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </ScrollArea>

          <div className="border-t border-neon-pink/20 p-4">
            <WalletConnector />
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-sm border-neon-pink/30 text-neon-pink hover:bg-neon-pink/10 hover:text-neon-pink"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-xs p-0 bg-black border-r border-neon-pink/20">
          <MobileNav />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">{children}</div>
    </div>
  )
}
