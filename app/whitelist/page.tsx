"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import CyberButton from "@/components/cyber-button"
import MatrixBackground from "@/components/matrix-background"
import CircuitPattern from "@/components/circuit-pattern"
import DataPulse from "@/components/data-pulse"
import GlitchText from "@/components/glitch-text"
import TerminalText from "@/components/terminal-text"

export default function WhitelistPage() {
  const [formData, setFormData] = useState({
    email: "",
    walletAddress: "",
    telegram: "",
    twitter: "",
    reason: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MatrixBackground />
      <CircuitPattern />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-neon-pink/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors">
            <ArrowLeft size={16} />
            <span className="font-tech-mono">BACK_TO_HOME</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <GlitchText
              text="$BLKBOX WHITELIST"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
            />
            <p className="text-neon-cyan font-tech-mono">SECURE YOUR POSITION IN THE SHADOW PROTOCOL</p>
            <DataPulse className="my-6" />
          </div>

          {submitted ? (
            <div className="bg-black/60 border border-neon-cyan p-8 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-cyan/20 mb-4">
                <Check className="h-8 w-8 text-neon-cyan" />
              </div>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4 font-tech-mono">REGISTRATION COMPLETE</h2>
              <p className="text-zinc-300 font-tech-mono mb-6">
                Your application has been received. We will review your submission and notify you if you are selected
                for the whitelist.
              </p>
              <Link href="/">
                <CyberButton glowColor="pink">RETURN_TO_HOME</CyberButton>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-black/60 border border-neon-pink p-8 rounded-lg space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-neon-cyan font-tech-mono">
                  EMAIL_ADDRESS <span className="text-neon-pink">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-black border-zinc-800 focus:border-neon-pink text-white font-tech-mono"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="walletAddress" className="text-neon-cyan font-tech-mono">
                  SOLANA_WALLET_ADDRESS <span className="text-neon-pink">*</span>
                </Label>
                <Input
                  id="walletAddress"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  required
                  className="bg-black border-zinc-800 focus:border-neon-pink text-white font-tech-mono"
                  placeholder="Enter your Solana wallet address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegram" className="text-neon-cyan font-tech-mono">
                  TELEGRAM_USERNAME
                </Label>
                <Input
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  className="bg-black border-zinc-800 focus:border-neon-pink text-white font-tech-mono"
                  placeholder="@username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-neon-cyan font-tech-mono">
                  TWITTER_USERNAME
                </Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="bg-black border-zinc-800 focus:border-neon-pink text-white font-tech-mono"
                  placeholder="@username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" className="text-neon-cyan font-tech-mono">
                  WHY_DO_YOU_WANT_TO_JOIN <span className="text-neon-pink">*</span>
                </Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="bg-black border-zinc-800 focus:border-neon-pink text-white font-tech-mono min-h-[100px]"
                  placeholder="Tell us why you want to join the $BLKBOX Shadow Protocol..."
                />
              </div>

              <div className="pt-4">
                <CyberButton type="submit" className="w-full" glowColor="pink" disabled={loading}>
                  {loading ? <TerminalText text="SUBMITTING..." className="animate-pulse" /> : "SUBMIT_APPLICATION"}
                </CyberButton>
              </div>

              <p className="text-xs text-zinc-500 font-tech-mono text-center">
                By submitting this form, you agree to join our mailing list and receive updates about the $BLKBOX
                project.
              </p>
            </form>
          )}
        </div>
      </main>

      <footer className="border-t border-neon-pink/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-zinc-500 font-tech-mono">© 2025 $BLKBOX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
