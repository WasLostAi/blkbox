"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, Loader2 } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { getToolResponse } from "@/utils/ai-tools"

interface AiChatInterfaceProps {
  initialMessage: string
  toolContext?: string
}

type Message = {
  role: "assistant" | "user"
  content: string
  timestamp: Date
}

export function AiChatInterface({ initialMessage, toolContext }: AiChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: initialMessage,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response with the tool context
      const response = await getToolResponse(input, toolContext)

      // Add AI response
      const aiMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)

      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} role={message.role} content={message.content} timestamp={message.timestamp} />
        ))}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-cyan-900/50 p-2 rounded-full">
              <Bot className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 max-w-[80%]">
              <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
              <span className="text-gray-400 text-sm">Generating response...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-cyan-900/50 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about crypto..."
            className="flex-1 bg-black/60 border border-cyan-700/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-cyan-900 to-cyan-700 text-white rounded-lg px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-800 hover:to-cyan-600 transition-colors"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </button>
        </div>
      </form>
    </div>
  )
}
