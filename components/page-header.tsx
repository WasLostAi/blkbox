import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-6", className)}>
      <h1 className="text-3xl font-bold text-neon-cyan">{title}</h1>
      {description && <p className="text-zinc-400 mt-2">{description}</p>}
    </div>
  )
}

export default PageHeader
