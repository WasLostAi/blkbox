"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface RoadmapItem {
  id: string
  phase: string
  title: string
  description: string
  status: "completed" | "in-progress" | "upcoming"
  date: string
}

interface InteractiveRoadmapProps {
  items: RoadmapItem[]
  className?: string
}

export function InteractiveRoadmap({ items, className = "" }: InteractiveRoadmapProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const statusColors = {
    completed: {
      bg: "bg-pink-500",
      text: "text-pink-500",
      border: "border-pink-500",
    },
    "in-progress": {
      bg: "bg-cyan-400",
      text: "text-cyan-400",
      border: "border-cyan-400",
    },
    upcoming: {
      bg: "bg-gray-500",
      text: "text-gray-500",
      border: "border-gray-500",
    },
  }

  return (
    <div className={`relative ${className}`}>
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-600 to-cyan-400"></div>

      {/* Timeline items */}
      <div className="space-y-12 relative">
        {items.map((item, index) => {
          const isActive = activeItem === item.id
          const status = statusColors[item.status]

          return (
            <motion.div
              key={item.id}
              className="ml-12 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Timeline node */}
              <motion.div
                className={`absolute -left-12 w-8 h-8 rounded-full bg-black ${status.border} border-2 flex items-center justify-center cursor-pointer`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveItem(isActive ? null : item.id)}
              >
                <span className={status.text}>{index + 1}</span>
              </motion.div>

              {/* Content */}
              <motion.div
                className={`transform transition-all duration-300 ${isActive ? "translate-x-2" : ""}`}
                onClick={() => setActiveItem(isActive ? null : item.id)}
              >
                <div className="flex items-center mb-1">
                  <h3 className={`text-xl font-bold ${status.text} mr-3`}>{item.phase}</h3>
                  <span className="text-sm text-gray-400">{item.date}</span>
                </div>
                <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>

                {/* Description (only visible when active) */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-300 mt-2">{item.description}</p>
                </motion.div>
              </motion.div>

              {/* Status indicator */}
              <div className="absolute top-0 right-0 flex items-center">
                <div className={`w-2 h-2 rounded-full ${status.bg} mr-2 animate-pulse`}></div>
                <span className="text-xs uppercase">{item.status.replace("-", " ")}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
