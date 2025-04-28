import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <span className="glitch" data-text={text}>
        {text}
      </span>
    </div>
  )
}
