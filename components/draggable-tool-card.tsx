"use client"
import { useDrag, useDrop } from "react-dnd"
import type { LucideIcon } from "lucide-react"
import { ToolCard } from "./tool-card"

interface DraggableToolCardProps {
  id: string
  index: number
  name: string
  description: string
  icon: LucideIcon
  href: string
  tier: string
  color: "pink" | "cyan"
  monitoringStats?: {
    statOneLabel: string
    statOneValue: string | number
    statTwoLabel: string
    statTwoValue: string | number
  }
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

export function DraggableToolCard({
  id,
  index,
  name,
  description,
  icon,
  href,
  tier,
  color,
  monitoringStats,
  moveCard,
}: DraggableToolCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "TOOL_CARD",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "TOOL_CARD",
    hover: (item: { id: string; index: number }, monitor) => {
      if (!drag) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="transition-transform duration-200 hover:scale-[1.01] cursor-move"
    >
      <ToolCard
        name={name}
        description={description}
        icon={icon}
        href={href}
        tier={tier}
        color={color}
        monitoringStats={monitoringStats}
      />
    </div>
  )
}
