"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface TerminalCodeProps {
  code: string
  language?: string
  showLineNumbers?: boolean
}

export default function TerminalCode({ code, language = "javascript", showLineNumbers = true }: TerminalCodeProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div className="relative rounded-md bg-black/80 border border-zinc-800 font-mono text-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-zinc-400 font-tech-mono">{language.toUpperCase()}</div>
        <button
          onClick={copyToClipboard}
          className="text-zinc-400 hover:text-neon-cyan transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-zinc-300">
          {showLineNumbers ? (
            <code>
              {lines.map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell pr-4 text-right text-zinc-500 select-none">{i + 1}</span>
                  <span className="table-cell">{line}</span>
                </div>
              ))}
            </code>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </div>
  )
}
