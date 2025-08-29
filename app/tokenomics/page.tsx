"use client"

import type React from "react"
import { useRouter } from "next/router"
import { Button } from "@components/ui/button"
import { cn } from "@utils/cn"

const TokenomicsPage: React.FC = () => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex space-x-4">
        <Button
          className={cn(
            "bg-neon-pink/10 hover:bg-neon-pink/10",
            router.pathname === "/tokenomics/pink" && "bg-neon-pink",
          )}
          onClick={() => handleNavigation("/tokenomics/pink")}
        >
          Pink Tokenomics
        </Button>
        <Button
          className={cn(
            "bg-neon-cyan/10 hover:bg-neon-cyan/10",
            router.pathname === "/tokenomics/cyan" && "bg-neon-cyan",
          )}
          onClick={() => handleNavigation("/tokenomics/cyan")}
        >
          Cyan Tokenomics
        </Button>
      </div>
      <div className="mt-10">{/* Content for Tokenomics page */}</div>
    </div>
  )
}

export default TokenomicsPage
