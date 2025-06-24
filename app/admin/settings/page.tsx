"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminSettingsRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard/settings")
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white">Redirecting to admin settings...</p>
    </div>
  )
}
