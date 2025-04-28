"use client"

import { useState } from "react"
import { Wallet, ChevronDown, RefreshCw, LogOut } from "lucide-react"
import WalletModal from "./wallet-modal"
import CyberButton from "./cyber-button"
import { useWallet } from "@/context/wallet-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface WalletConnectorProps {
  buttonText?: string
  buttonSize?: "default" | "sm" | "lg"
  buttonVariant?: "default" | "outline" | "secondary"
  glowColor?: "pink" | "cyan"
  className?: string
  showBalance?: boolean
}

export default function WalletConnector({
  buttonText = "CONNECT_WALLET",
  buttonSize = "default",
  buttonVariant = "default",
  glowColor = "pink",
  className,
  showBalance = false,
}: WalletConnectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { connected, address, balance, tier, disconnect, refreshBalance } = useWallet()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleRefreshBalance = async () => {
    if (isRefreshing) return

    setIsRefreshing(true)
    try {
      await refreshBalance()
    } finally {
      setIsRefreshing(false)
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "ENTRY_LEVEL":
        return "text-zinc-300"
      case "OPERATOR":
        return "text-neon-pink"
      case "SHADOW_ELITE":
        return "text-neon-cyan"
      case "PHANTOM_COUNCIL":
        return "text-yellow-400"
      default:
        return "text-zinc-500"
    }
  }

  if (connected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <CyberButton size={buttonSize} variant="outline" glowColor="cyan" className={className}>
              <div className="flex items-center gap-2">
                <span className="text-zinc-300 font-tech-mono text-sm">
                  {address.slice(0, 4)}...{address.slice(-4)}
                </span>
                <ChevronDown size={14} />
              </div>
            </CyberButton>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black border border-neon-cyan/30 text-white">
          <DropdownMenuLabel className="font-tech-mono text-xs text-zinc-500">WALLET</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-800" />

          <div className="px-2 py-1.5">
            <div className="text-xs font-tech-mono text-zinc-400">Address</div>
            <div className="text-sm font-tech-mono text-zinc-300 truncate max-w-[200px]">{address}</div>
          </div>

          <div className="px-2 py-1.5">
            <div className="text-xs font-tech-mono text-zinc-400">Balance</div>
            <div className="text-sm font-tech-mono text-neon-pink">{balance.toLocaleString()} $BLKBOX</div>
          </div>

          <div className="px-2 py-1.5">
            <div className="text-xs font-tech-mono text-zinc-400">Tier</div>
            <div className={cn("text-sm font-tech-mono", getTierColor(tier))}>{tier.replace("_", " ")}</div>
          </div>

          <DropdownMenuSeparator className="bg-zinc-800" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer text-zinc-300 hover:text-neon-cyan focus:text-neon-cyan"
                  onClick={handleRefreshBalance}
                >
                  <RefreshCw className={cn("mr-2 h-4 w-4", isRefreshing && "animate-spin")} />
                  <span>Refresh Balance</span>
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-tech-mono text-xs">Update your wallet balance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenuItem
            className="cursor-pointer text-zinc-300 hover:text-neon-pink focus:text-neon-pink"
            onClick={disconnect}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <CyberButton
        size={buttonSize}
        variant={buttonVariant}
        glowColor={glowColor}
        className={className}
        onClick={openModal}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {buttonText}
      </CyberButton>
      <WalletModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
