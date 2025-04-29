import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: "assistant" | "user"
  content: string
  timestamp: Date
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isAssistant = role === "assistant"

  return (
    <div className="flex items-start space-x-3">
      <div className={cn("flex-shrink-0 p-2 rounded-full", isAssistant ? "bg-cyan-900/50" : "bg-emerald-900/50")}>
        {isAssistant ? <Bot className="h-6 w-6 text-cyan-400" /> : <User className="h-6 w-6 text-emerald-400" />}
      </div>

      <div className="space-y-1 max-w-[80%]">
        <div
          className={cn(
            "p-3 rounded-lg",
            isAssistant ? "bg-cyan-950/30 border border-cyan-500/20" : "bg-emerald-950/30 border border-emerald-500/20",
          )}
        >
          <p className="text-white text-sm whitespace-pre-wrap">{content}</p>
        </div>

        <div className="text-xs text-gray-500">
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  )
}
