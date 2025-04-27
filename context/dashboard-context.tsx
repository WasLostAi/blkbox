"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type DashboardContextType = {
  cardOrder: string[]
  updateCardOrder: (newOrder: string[]) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [cardOrder, setCardOrder] = useState<string[]>([])

  // Load card order from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOrder = localStorage.getItem("dashboardCardOrder")
      if (savedOrder) {
        try {
          setCardOrder(JSON.parse(savedOrder))
        } catch (e) {
          console.error("Failed to parse card order from localStorage", e)
        }
      }
    }
  }, [])

  // Save card order to localStorage when it changes
  const updateCardOrder = (newOrder: string[]) => {
    setCardOrder(newOrder)
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboardCardOrder", JSON.stringify(newOrder))
    }
  }

  return <DashboardContext.Provider value={{ cardOrder, updateCardOrder }}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
