"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

type ContrastLevel = "default" | "high" | "low" | "system"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [contrastLevel, setContrastLevel] = useState<ContrastLevel>("default")
  const [isOpen, setIsOpen] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)

    // Load contrast level from localStorage
    const savedContrast = localStorage.getItem("contrastLevel") as ContrastLevel | null
    if (savedContrast) {
      setContrastLevel(savedContrast)
      document.documentElement.setAttribute("data-contrast", savedContrast)
    }
  }, [])

  // Handle theme change
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  // Handle contrast level change
  const handleContrastChange = (level: ContrastLevel) => {
    setContrastLevel(level)
    localStorage.setItem("contrastLevel", level)
    document.documentElement.setAttribute("data-contrast", level)
    setIsOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 hover:border-neon-cyan transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4 text-neon-cyan" />
        ) : theme === "light" ? (
          <Sun className="h-4 w-4 text-neon-yellow" />
        ) : (
          <Monitor className="h-4 w-4 text-neon-cyan" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black border border-zinc-800 z-50">
          <div className="py-1 divide-y divide-zinc-800">
            <div className="px-3 py-2">
              <h3 className="text-xs font-tech-mono text-zinc-400 mb-2">THEME</h3>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-800 transition-colors",
                    theme === "light" && "bg-zinc-800 border border-neon-cyan",
                  )}
                >
                  <Sun className="h-4 w-4 text-neon-yellow mb-1" />
                  <span className="text-xs font-tech-mono">Light</span>
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-800 transition-colors",
                    theme === "dark" && "bg-zinc-800 border border-neon-cyan",
                  )}
                >
                  <Moon className="h-4 w-4 text-neon-cyan mb-1" />
                  <span className="text-xs font-tech-mono">Dark</span>
                </button>
                <button
                  onClick={() => handleThemeChange("system")}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-800 transition-colors",
                    theme === "system" && "bg-zinc-800 border border-neon-cyan",
                  )}
                >
                  <Monitor className="h-4 w-4 text-neon-cyan mb-1" />
                  <span className="text-xs font-tech-mono">System</span>
                </button>
              </div>
            </div>

            <div className="px-3 py-2">
              <h3 className="text-xs font-tech-mono text-zinc-400 mb-2">CONTRAST</h3>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => handleContrastChange("default")}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-800 transition-colors",
                    contrastLevel === "default" && "bg-zinc-800 border border-neon-cyan",
                  )}
                >
                  <Monitor className="h-4 w-4 text-neon-cyan mb-1" />
                  <span className="text-xs font-tech-mono">Default</span>
                </button>
                <button
                  onClick={() => handleContrastChange("high")}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-800 transition-colors",
                    contrastLevel === "high" && "bg-zinc-800 border border-neon-cyan",
                  )}
                >
                  <Sun className="h-4 w-4 text-neon-yellow mb-1" />
                  <span className="text-xs font-tech-mono">High</span>
                </button>
                <button
                  onClick={() => handleContrastChange("low")}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-800 transition-colors",
                    contrastLevel === "low" && "bg-zinc-800 border border-neon-cyan",
                  )}
                >
                  <EyeOff className="h-4 w-4 text-zinc-400 mb-1" />
                  <span className="text-xs font-tech-mono">Low</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
