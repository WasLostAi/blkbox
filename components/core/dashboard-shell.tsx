import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children, className }) => {
  return <div className={cn("container py-10", className)}>{children}</div>
}

export default DashboardShell
