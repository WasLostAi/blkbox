"use client"

import { useState } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { Save, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const ResponsiveGridLayout = WidthProvider(Responsive)

interface Tool {
  id: string
  name: string
  description: string
  icon: string
  href: string
  status: string
  tier: number
  isRealTimeMonitoring: boolean
  monitoringData?: any
}

interface DraggableDashboardProps {
  tools: Tool[]
  userTier: number
}

export function DraggableDashboard({ tools, userTier }: DraggableDashboardProps) {
  // Filter tools based on user tier
  const availableTools = tools.filter((tool) => tool.tier <= userTier)

  // Default layouts
  const generateDefaultLayouts = () => {
    const layouts = {
      lg: [] as any[],
      md: [] as any[],
      sm: [] as any[],
    }

    // Generate layout for each tool
    availableTools.forEach((tool, index) => {
      // For large screens
      layouts.lg.push({
        i: tool.id,
        x: (index % 3) * 4,
        y: Math.floor(index / 3) * 4,
        w: 4,
        h: 4,
        minW: 2,
        minH: 2,
      })

      // For medium screens
      layouts.md.push({
        i: tool.id,
        x: (index % 2) * 6,
        y: Math.floor(index / 2) * 4,
        w: 6,
        h: 4,
        minW: 2,
        minH: 2,
      })

      // For small screens
      layouts.sm.push({
        i: tool.id,
        x: 0,
        y: index * 4,
        w: 12,
        h: 4,
        minW: 2,
        minH: 2,
      })
    })

    return layouts
  }

  // State for layouts
  const [layouts, setLayouts] = useState(() => {
    // Try to load from localStorage
    if (typeof window !== "undefined") {
      const savedLayouts = localStorage.getItem("dashboardLayouts")
      return savedLayouts ? JSON.parse(savedLayouts) : generateDefaultLayouts()
    }
    return generateDefaultLayouts()
  })

  // Save layouts to localStorage
  const saveLayouts = () => {
    localStorage.setItem("dashboardLayouts", JSON.stringify(layouts))
  }

  // Reset layouts to default
  const resetLayouts = () => {
    const defaultLayouts = generateDefaultLayouts()
    setLayouts(defaultLayouts)
    localStorage.removeItem("dashboardLayouts")
  }

  // Handle layout change
  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    setLayouts(allLayouts)
  }

  return (
    <div className="mb-8">
      <div className="flex justify-end mb-4 gap-2">
        <Button variant="outline" size="sm" onClick={resetLayouts} className="flex items-center gap-1">
          <RotateCcw className="h-4 w-4" />
          Reset Layout
        </Button>
        <Button variant="default" size="sm" onClick={saveLayouts} className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          Save Layout
        </Button>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 1, xxs: 1 }}
        rowHeight={50}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={true}
        margin={[16, 16]}
      >
        {availableTools.map((tool) => (
          <div key={tool.id} className="bg-black/60 border border-gray-800 rounded-lg overflow-hidden">
            <Card className="h-full flex flex-col">
              <div className="p-4 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">
                      <span className="text-lg">{tool.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs ${tool.status === "operational" ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"}`}
                  >
                    {tool.status === "operational" ? "ONLINE" : "OFFLINE"}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{tool.description}</p>

                {tool.isRealTimeMonitoring && tool.monitoringData && (
                  <div className="space-y-3">
                    {Object.entries(tool.monitoringData).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 uppercase">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="text-sm font-medium text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-800">
                <Button variant="default" size="sm" className="w-full" asChild>
                  <a href={tool.href}>Open Tool</a>
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default DraggableDashboard
