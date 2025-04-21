"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Eye, EyeOff } from "lucide-react"
import CyberButton from "./cyber-button"
import { useWallet } from "@/context/wallet-context"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { adminLogin } = useWallet()

  // For demo purposes, the admin password is "shadow" - in a real app, this would be more secure
  const ADMIN_PASSWORD = "shadow"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (password === ADMIN_PASSWORD) {
        await adminLogin()
        router.push("/dashboard")
      } else {
        setError("Invalid password")
      }
    } catch (err) {
      setError("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-black/80 border border-neon-pink rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <div className="p-3 rounded-full bg-neon-pink/20">
          <Lock className="h-8 w-8 text-neon-pink" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-neon-cyan mb-6 font-tech-mono">ADMIN ACCESS</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded text-red-400 text-sm font-tech-mono">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-tech-mono text-zinc-400 mb-2">
            PASSWORD
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-neon-cyan/50 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent text-white font-tech-mono"
              placeholder="Enter admin password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-neon-pink"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <CyberButton type="submit" className="w-full py-3" glowColor="pink" disabled={isLoading}>
          {isLoading ? "AUTHENTICATING..." : "ACCESS_SYSTEM"}
        </CyberButton>
      </form>

      <p className="mt-4 text-xs text-center text-zinc-500 font-tech-mono">
        Secure admin access for system maintenance and testing
      </p>
    </div>
  )
}
