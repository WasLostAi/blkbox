"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-neon-cyan hover:text-neon-pink transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/95 backdrop-blur-md transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-between items-center p-4">
          <Image src="/blkbox-logo-stacked.png" alt="$BLKBOX" width={100} height={50} className="h-10 w-auto" />
          <button
            onClick={toggleMenu}
            className="p-2 text-neon-pink hover:text-neon-cyan transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center h-full gap-8">
          <Link
            href="#offering"
            className="text-xl font-medium text-neon-cyan hover:text-neon-pink transition-colors"
            onClick={toggleMenu}
          >
            <span className="font-tech-mono">01.</span> OFFERING
          </Link>
          <Link
            href="#utility"
            className="text-xl font-medium text-neon-pink hover:text-neon-cyan transition-colors"
            onClick={toggleMenu}
          >
            <span className="font-tech-mono">02.</span> UTILITY
          </Link>
          <Link
            href="#tokenomics"
            className="text-xl font-medium text-neon-cyan hover:text-neon-pink transition-colors"
            onClick={toggleMenu}
          >
            <span className="font-tech-mono">03.</span> TOKENOMICS
          </Link>
          <Link
            href="#system"
            className="text-xl font-medium text-neon-pink hover:text-neon-cyan transition-colors"
            onClick={toggleMenu}
          >
            <span className="font-tech-mono">04.</span> SYSTEM
          </Link>
          <Link
            href="#launch"
            className="text-xl font-medium text-neon-cyan hover:text-neon-pink transition-colors"
            onClick={toggleMenu}
          >
            <span className="font-tech-mono">05.</span> LAUNCH
          </Link>
          <Link
            href="/roadmap"
            className="text-xl font-medium text-neon-pink hover:text-neon-cyan transition-colors"
            onClick={toggleMenu}
          >
            <span className="font-tech-mono">06.</span> ROADMAP
          </Link>
          <div className="border-t border-zinc-800 w-16 my-2"></div>
          <Link
            href="/whitepaper"
            className="text-xl font-medium text-neon-pink hover:text-neon-cyan transition-colors"
            onClick={toggleMenu}
          >
            WHITEPAPER
          </Link>
          <Link
            href="/presale"
            className="text-xl font-medium text-neon-cyan hover:text-neon-pink transition-colors"
            onClick={toggleMenu}
          >
            PRESALE
          </Link>
          <Link
            href="/whitelist"
            className="text-xl font-medium text-neon-pink hover:text-neon-cyan transition-colors"
            onClick={toggleMenu}
          >
            WHITELIST
          </Link>
        </nav>
      </div>
    </div>
  )
}
