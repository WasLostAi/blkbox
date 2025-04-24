"use client"

import { useState } from "react"
import DashboardShell from "@/components/core/dashboard-shell"
import CyberCard from "@/components/cyber-card"
import DataGrid from "@/components/core/data-grid"
import { GlitchText } from "@/components/glitch-text"
import DataPulse from "@/components/data-pulse"

const TemporalEngine = () => {
  const [eventData, setEventData] = useState([
    { id: 1, timestamp: "2025-04-23 10:00:00", event: "Token Transfer", details: "100 SOL to 0x..." },
    { id: 2, timestamp: "2025-04-23 10:05:00", event: "Liquidity Add", details: "SOL/USDC pool" },
  ])

  const columns = [
    { key: "timestamp", label: "Timestamp" },
    { key: "event", label: "Event" },
    { key: "details", label: "Details" },
  ]

  return (
    <DashboardShell>
      <GlitchText
        text="Temporal Engine"
        className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neon-pink mb-4"
      />
      <DataPulse className="mb-8" />
      <CyberCard>
        <h3 className="text-xl font-bold text-neon-cyan mb-4">Event Timeline</h3>
        <DataGrid data={eventData} columns={columns} />
      </CyberCard>
    </DashboardShell>
  )
}

export default TemporalEngine
