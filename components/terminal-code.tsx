interface TerminalCodeProps {
  lines: string[]
  className?: string
}

export default function TerminalCode({ lines, className = "" }: TerminalCodeProps) {
  return (
    <div className={`bg-black/70 border border-neon-cyan/30 rounded-md p-4 font-mono text-sm ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <span className="text-xs text-zinc-400 ml-2">terminal@$BLKBOX:~</span>
      </div>

      <div className="text-neon-cyan">
        {lines &&
          lines.map((line, index) => (
            <div key={index} className="py-0.5">
              {line.startsWith("[") ? (
                <>
                  <span className="text-zinc-400">{line.substring(0, line.indexOf("]") + 1)}</span>
                  <span className="text-neon-pink">{line.substring(line.indexOf("]") + 1)}</span>
                </>
              ) : line.toLowerCase().includes("error") ? (
                <span className="text-red-400">{line}</span>
              ) : (
                <span>{line}</span>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
