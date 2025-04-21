"use client"

import AdminLogin from "@/components/admin-login"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import GlitchText from "@/components/glitch-text"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useWallet } from "@/context/wallet-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const { connected, isAdmin } = useWallet()
  const router = useRouter()

  // If already logged in as admin, redirect to dashboard
  useEffect(() => {
    if (connected && isAdmin) {
      router.push("/dashboard")
    }
  }, [connected, isAdmin, router])

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />

      <div className="container flex-1 flex flex-col items-center justify-center py-12 relative z-10">
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center text-zinc-400 hover:text-neon-pink transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-tech-mono text-sm">BACK_TO_HOME</span>
        </Link>

        <div className="mb-8 text-center">
          <GlitchText text="$BLKBOX" className="text-4xl font-extrabold tracking-tight text-neon-pink mb-2" />
          <h1 className="text-xl font-tech-mono text-neon-cyan">ADMIN PORTAL</h1>
        </div>

        <AdminLogin />
      </div>
    </div>
  )
}
