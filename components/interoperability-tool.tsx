"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import CyberCard from "@/components/cyber-card"
import CyberButton from "@/components/cyber-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function InteroperabilityTool() {
  const [sourceChain, setSourceChain] = useState("solana")
  const [targetChain, setTargetChain] = useState("ethereum")
  const [asset, setAsset] = useState("BLKBOX")
  const [amount, setAmount] = useState("")
  const [destinationAddress, setDestinationAddress] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)
  const [transferProgress, setTransferProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  // Function to simulate cross-chain transfer
  const handleTransfer = async () => {
    if (isTransferring || !amount || !destinationAddress) return

    setIsTransferring(true)
    setTransferProgress(0)
    setLogs([
      `Initiating cross-chain transfer: ${amount} ${asset} from ${sourceChain} to ${targetChain}`,
      "Connecting to bridge...",
      "Authenticating transfer request...",
    ])

    // Simulate transfer process
    const transferInterval = setInterval(() => {
      setTransferProgress((prev) => {
        if (prev >= 100) {
          clearInterval(transferInterval)
          setLogs((prevLogs) => [...prevLogs, "Transfer complete!"])
          setIsTransferring(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // Handle setting to set logs and show custom message in card

  return (
    <div className="space-y-6">
      <CyberCard className="bg-black/60">
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-neon-pink">Transfer Details</h3>

          <div className="space-y-2">
            <label className="text-sm font-tech-mono text-neon-cyan">Source Chain</label>
            <Select value={sourceChain} onValueChange={setSourceChain}>
              <SelectTrigger className="bg-black border-zinc-800">
                <SelectValue placeholder="Select source chain" />
              </SelectTrigger>
              <SelectContent className="bg-black border-zinc-800">
                <SelectItem value="solana">Solana</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-tech-mono text-neon-cyan">Target Chain</label>
            <Select value={targetChain} onValueChange={setTargetChain}>
              <SelectTrigger className="bg-black border-zinc-800">
                <SelectValue placeholder="Select target chain" />
              </SelectTrigger>
              <SelectContent className="bg-black border-zinc-800">
                <SelectItem value="solana">Solana</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-tech-mono text-neon-cyan">Asset</label>
            <Select value={asset} onValueChange={setAsset}>
              <SelectTrigger className="bg-black border-zinc-800">
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent className="bg-black border-zinc-800">
                <SelectItem value="BLKBOX">$BLKBOX</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="SOL">SOL</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-tech-mono text-neon-cyan">Amount</label>
            <Input
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-black border-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-tech-mono text-neon-cyan">Destination Address</label>
            <Input
              type="text"
              placeholder="Enter destination address"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              className="bg-black border-zinc-800"
            />
          </div>

          <CyberButton onClick={handleTransfer} disabled={isTransferring} glowColor="pink" className="w-full">
            {isTransferring ? "TRANSFERRING..." : "TRANSFER"}
          </CyberButton>

          {isTransferring && (
            <div className="mt-4">
              <p className="text-xs text-neon-cyan font-tech-mono text-center">Transfer in progress...</p>
              <Progress value={transferProgress} className="h-2" />
            </div>
          )}
        </div>
      </CyberCard>

      <CyberCard className="bg-black/60">
        <div className="flex items-center justify-between cursor-pointer p-6" onClick={() => toggleSection("logs")}>
          <h3 className="text-lg font-bold text-neon-cyan">Transfer Logs</h3>
          {expandedSection === "logs" ? <ArrowRight size={16} /> : <ArrowRight size={16} />}
        </div>
        {expandedSection === "logs" && (
          <div className="p-4 font-mono text-sm text-green-400 h-48 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))}
          </div>
        )}
      </CyberCard>
    </div>
  )
}
