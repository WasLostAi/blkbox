"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/context/wallet-context"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import GlitchText from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"
import TerminalCode from "@/components/terminal-code"
import { Lock, Terminal, Code, GitBranch, Server, Database, Cpu } from "lucide-react"

export default function DevAccessPage() {
  const { connected, tier, address } = useWallet()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [terminalVisible, setTerminalVisible] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "> Initializing developer console...",
    "> Loading system modules...",
    "> Establishing secure connection...",
    "> Connection established.",
    "> Type 'help' for available commands.",
  ])
  const [command, setCommand] = useState("")

  // Check if the user is authorized (Shadow Elite or Phantom Council tier or specific dev addresses)
  useEffect(() => {
    // Simulate authorization check
    const checkAuthorization = async () => {
      setIsLoading(true)

      // Wait for wallet to be loaded
      if (connected) {
        // In a real app, you would check against a database of developer addresses
        // For demo purposes, we'll authorize Shadow Elite+ tier or specific addresses
        const devAddresses = [
          // Add some demo developer addresses here
          "0xdev123456789abcdef",
          "0xdevabcdef123456789",
        ]

        const isDev =
          tier === "PHANTOM_COUNCIL" || tier === "SHADOW_ELITE" || (address && devAddresses.includes(address))

        setIsAuthorized(isDev)
      } else {
        setIsAuthorized(false)
      }

      setIsLoading(false)
    }

    checkAuthorization()
  }, [connected, tier, address])

  // Redirect to home if not connected
  useEffect(() => {
    if (!connected && !isLoading) {
      router.push("/")
    }
  }, [connected, isLoading, router])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()

    if (!command.trim()) return

    // Add the command to the terminal output
    setTerminalOutput((prev) => [...prev, `> ${command}`])

    // Process the command
    let response: string[] = []

    switch (command.toLowerCase()) {
      case "help":
        response = [
          "Available commands:",
          "  help - Show this help message",
          "  status - Show system status",
          "  clear - Clear the terminal",
          "  exit - Exit the terminal",
          "  version - Show system version",
          "  users - List connected users",
          "  contracts - List deployed contracts",
        ]
        break
      case "status":
        response = [
          "System Status: ONLINE",
          "Network: Solana Mainnet",
          "Node Version: 1.14.7",
          "Connected Users: 127",
          "CPU Usage: 24%",
          "Memory Usage: 3.2GB / 8GB",
          "Uptime: 7d 14h 23m",
        ]
        break
      case "clear":
        setTerminalOutput(["> Terminal cleared."])
        setCommand("")
        return
      case "exit":
        setTerminalVisible(false)
        setTerminalOutput([
          "> Initializing developer console...",
          "> Loading system modules...",
          "> Establishing secure connection...",
          "> Connection established.",
          "> Type 'help' for available commands.",
        ])
        setCommand("")
        return
      case "version":
        response = [
          "BLKBOX Shadow Protocol",
          "Version: 0.9.7-alpha",
          "Build: 20250423-1337",
          "Solana SDK: 1.14.7",
          "Web3.js: 1.73.0",
        ]
        break
      case "users":
        response = [
          "Connected Users:",
          "  - Phantom Council: 3",
          "  - Shadow Elite: 12",
          "  - Operator: 37",
          "  - Entry Level: 75",
          "  - Unauthorized: 0",
        ]
        break
      case "contracts":
        response = [
          "Deployed Contracts:",
          "  - TokenVault: 0x7a3B...F12e",
          "  - StakingPool: 0x8c2D...A43f",
          "  - RewardsDistributor: 0x9e1F...B27d",
          "  - GovernanceProxy: 0x2c5A...E91b",
          "  - LiquidityManager: 0x4d7C...C38a",
        ]
        break
      default:
        response = [`Command not recognized: ${command}`]
    }

    // Add the response to the terminal output
    setTerminalOutput((prev) => [...prev, ...response])

    // Clear the command input
    setCommand("")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <DataPulse className="w-16 h-16" />
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <CyberCard className="max-w-md w-full">
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-pink/20 mb-4">
              <Lock className="h-8 w-8 text-neon-pink" />
            </div>
            <GlitchText text="ACCESS DENIED" className="text-2xl font-bold text-neon-pink mb-4" />
            <p className="text-zinc-300 font-tech-mono mb-6">
              This area is restricted to authorized developers only. Your current access level is insufficient.
            </p>
            <CyberButton onClick={() => router.push("/")} glowColor="pink">
              RETURN TO MAIN SITE
            </CyberButton>
          </div>
        </CyberCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <GlitchText text="DEVELOPER CONSOLE" className="text-3xl font-bold text-neon-cyan mb-2" />
          <p className="text-zinc-400 font-tech-mono">Advanced system access and development tools</p>
        </div>

        <DataPulse className="mb-8" color="cyan" />

        {terminalVisible ? (
          <CyberCard className="mb-8 bg-black border-neon-cyan">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-neon-cyan" />
                  <span className="text-neon-cyan font-tech-mono text-sm">BLKBOX_DEV_TERMINAL</span>
                </div>
                <CyberButton size="sm" variant="outline" glowColor="cyan" onClick={() => setTerminalVisible(false)}>
                  MINIMIZE
                </CyberButton>
              </div>

              <div className="bg-black/80 rounded-md p-4 font-tech-mono text-sm text-green-400 h-80 overflow-y-auto mb-4">
                {terminalOutput.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommand} className="flex items-center gap-2">
                <span className="text-neon-cyan">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-green-400 font-tech-mono"
                  autoFocus
                />
              </form>
            </div>
          </CyberCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DevCard
              title="Terminal Access"
              icon={<Terminal className="h-6 w-6" />}
              description="Direct system terminal access with elevated privileges"
              onClick={() => setTerminalVisible(true)}
            />
            <DevCard
              title="Contract Development"
              icon={<Code className="h-6 w-6" />}
              description="Smart contract development and deployment tools"
            />
            <DevCard
              title="Git Repository"
              icon={<GitBranch className="h-6 w-6" />}
              description="Access to source code repositories and version control"
            />
            <DevCard
              title="API Management"
              icon={<Server className="h-6 w-6" />}
              description="API endpoints, documentation, and testing tools"
            />
            <DevCard
              title="Database Access"
              icon={<Database className="h-6 w-6" />}
              description="Direct database query and management interface"
            />
            <DevCard
              title="System Monitoring"
              icon={<Cpu className="h-6 w-6" />}
              description="Real-time system performance and resource monitoring"
            />
          </div>
        )}

        <CyberCard className="bg-black/60">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4 text-neon-cyan">Recent System Updates</h3>
            <TerminalCode
              code={`
# Commit 7a3b2c1 - 2025-04-22
feat(core): Implement advanced MEV extraction algorithm
- Added priority transaction bundling
- Optimized gas estimation for frontrunning
- Enhanced slippage protection mechanisms

# Commit 9e1f4d2 - 2025-04-21
fix(security): Patch vulnerability in wallet connection
- Fixed potential address leakage in RPC calls
- Added additional encryption layer for transaction signing
- Updated dependency packages with security patches

# Commit 2c5a8b3 - 2025-04-20
feat(ui): Redesign dashboard interface
- Implemented new dark theme with improved contrast
- Added customizable widget layout system
- Enhanced mobile responsiveness for all components
              `}
              className="mb-4"
            />
            <div className="flex justify-end">
              <CyberButton size="sm" variant="outline" glowColor="cyan">
                VIEW ALL UPDATES
              </CyberButton>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  )
}

function DevCard({
  title,
  icon,
  description,
  onClick,
}: {
  title: string
  icon: React.ReactNode
  description: string
  onClick?: () => void
}) {
  return (
    <CyberCard className="h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer" onClick={onClick}>
      <div className="p-6 flex flex-col h-full">
        <div className="h-12 w-12 rounded-lg bg-black/50 border border-gray-800 flex items-center justify-center text-neon-cyan mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 flex-grow">{description}</p>
      </div>
    </CyberCard>
  )
}
