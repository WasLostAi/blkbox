"use client"

import type React from "react"

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { isMobile } from "react-device-detect"

export function DragDropProvider({ children }: { children: React.ReactNode }) {
  // Use TouchBackend for mobile devices and HTML5Backend for desktop
  const backend = isMobile ? TouchBackend : HTML5Backend

  return <DndProvider backend={backend}>{children}</DndProvider>
}
