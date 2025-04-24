"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface TerminalCodeProps {
  code: string
  language?: string
  className?: string
}

export default function TerminalCode({ code, language = "javascript", className }: TerminalCodeProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className={`relative rounded-md overflow-hidden ${className}`}>
      <div className="absolute right-2 top-2">
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-400" />}
        </button>
      </div>
      <pre className="p-4 bg-black/80 border border-zinc-800 rounded-md overflow-x-auto text-xs font-tech-mono text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}
