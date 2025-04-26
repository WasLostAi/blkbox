"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useWallet } from "@/context/wallet-context"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import WalletConnector from "@/components/wallet-connector"
import PageHeader from "@/components/page-header"
import Sidebar from "@/components/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { connected } = useWallet()
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

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-zinc-800 flex items-center justify-between p-4">
        <button onClick={() => setSidebarOpen(true)} className="text-neon-cyan hover:text-neon-pink transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <Link href="/" className="flex items-center">
          <Image src="/blkbox-logo-new.png" alt="BLKBOX" width={36} height={36} className="rounded-sm" />
        </Link>
        <WalletConnector buttonSize="sm" />
      </div>

      {/* Main content */}
      <div className={cn("w-full transition-all duration-300")}>
        {/* Back arrow for sub-pages (no text, no border) */}
        {isSubPage && (
          <div className="absolute top-6 left-6 z-10 md:hidden">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white">
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </div>
        )}

        {/* Page header */}
        <PageHeader title={getPageTitle()} />

        {/* Main content area with improved spacing */}
        <main className="pt-6 md:pt-4 px-4 py-6">{children}</main>
      </div>

      {/* Mobile sidebar (off-canvas) */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-64 bg-black border-r border-zinc-800">
            <div className="flex justify-between items-center p-4 border-b border-zinc-800">
              <Image src="/blkbox-logo-new.png" alt="BLKBOX" width={120} height={30} />
              <button onClick={() => setSidebarOpen(false)} className="text-zinc-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  )
}
