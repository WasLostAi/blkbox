"use client"

import { useRouter } from "next/navigation"
import { useWallet } from "@/context/wallet-context"
import CyberButton from "./cyber-button"
import { Terminal } from "lucide-react"

export default function DevBypass() {
  const router = useRouter()
  const { adminLogin } = useWallet()

  const handleDevAccess = async () => {
    await adminLogin()
    router.push("/dashboard")
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <CyberButton
        size="sm"
        variant="outline"
        glowColor="pink"
        className="bg-black/80 border-neon-pink/50"
        onClick={handleDevAccess}
      >
        <Terminal className="mr-2 h-4 w-4" />
        <span className="font-tech-mono text-xs">Dev Access</span>
      </CyberButton>
    </div>
  )
}
