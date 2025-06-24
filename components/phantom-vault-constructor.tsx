"use client"

import { useState } from "react"
import CyberCard from "./cyber-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TerminalCode from "@/components/terminal-code"
import CyberButton from "./cyber-button"
import { Switch } from "@/components/ui/switch"

interface PhantomVaultConstructorProps {
  inDashboard?: boolean
}

export default function PhantomVaultConstructor() {
  const [vaultName, setVaultName] = useState("")
  const [lockDuration, setLockDuration] = useState("30")
  const [privacyLevel, setPrivacyLevel] = useState("medium")
  const [multiSig, setMultiSig] = useState(false)
  const [temporalShifting, setTemporalShifting] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)

  const handleGenerateCode = () => {
    // Simulate code generation
    const code = `
// Phantom Vault Contract
contract PhantomVault {
    string public name = "${vaultName}";
    uint256 public lockDuration = ${lockDuration} days;
    string public privacyLevel = "${privacyLevel}";
    bool public multiSigEnabled = ${multiSig};
    bool public temporalShiftingEnabled = ${temporalShifting};

    // ... (rest of the contract code) ...
}
`
    setGeneratedCode(code)
  }

  return (
    <div className="space-y-6">
      <CyberCard className="bg-black/60">
        <div className="p-6">
          <h3 className="text-xl font-bold text-neon-cyan mb-4">Vault Configuration</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-tech-mono text-neon-cyan">Vault Name</label>
              <Input
                type="text"
                placeholder="Enter vault name"
                value={vaultName}
                onChange={(e) => setVaultName(e.target.value)}
                className="bg-black border-zinc-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-tech-mono text-neon-cyan">Lock Duration (Days)</label>
                <Input
                  type="number"
                  placeholder="Enter lock duration"
                  value={lockDuration}
                  onChange={(e) => setLockDuration(e.target.value)}
                  className="bg-black border-zinc-800"
                />
              </div>

              <div>
                <label className="text-sm font-tech-mono text-neon-cyan">Privacy Level</label>
                <Select value={privacyLevel} onValueChange={setPrivacyLevel}>
                  <SelectTrigger className="bg-black border-zinc-800">
                    <SelectValue placeholder="Select privacy level" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-zinc-800">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-tech-mono text-neon-cyan">Multi-Signature Access</label>
              <Switch checked={multiSig} onCheckedChange={setMultiSig} className="data-[state=checked]:bg-neon-cyan" />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-tech-mono text-neon-cyan">Temporal Shifting (Phantom Council Only)</label>
              <Switch
                checked={temporalShifting}
                onCheckedChange={setTemporalShifting}
                className="data-[state=checked]:bg-neon-cyan"
                disabled={true}
              />
            </div>

            <CyberButton onClick={handleGenerateCode} glowColor="cyan" className="w-full mt-4">
              GENERATE CODE
            </CyberButton>
          </div>
        </div>
      </CyberCard>

      {generatedCode && (
        <CyberCard className="bg-black/60">
          <div className="p-6">
            <h3 className="text-xl font-bold text-neon-pink mb-4">Generated Vault Contract</h3>
            <TerminalCode code={generatedCode} />
          </div>
        </CyberCard>
      )}
    </div>
  )
}
