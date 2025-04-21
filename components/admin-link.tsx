"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminLink() {
  const [visible, setVisible] = useState(false)

  // Show admin link only after pressing Shift+A+D+M+I+N keys in sequence
  useEffect(() => {
    const keys: string[] = []
    const adminCode = ["Shift", "a", "d", "m", "i", "n"]

    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the key to the array
      if (e.key === "Shift") {
        keys.push(e.key)
      } else {
        keys.push(e.key.toLowerCase())
      }

      // Keep only the last 6 keys
      while (keys.length > 6) {
        keys.shift()
      }

      // Check if the sequence matches
      const isMatch = keys.length === 6 && keys.every((key, index) => key === adminCode[index])

      if (isMatch) {
        setVisible(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (!visible) return null

  return (
    <Link
      href="/admin"
      className={cn(
        "fixed bottom-4 right-4 p-2 bg-black/80 border border-neon-pink rounded-full",
        "hover:bg-neon-pink/20 transition-all duration-300 z-50",
      )}
    >
      <Shield className="h-5 w-5 text-neon-pink" />
    </Link>
  )
}
