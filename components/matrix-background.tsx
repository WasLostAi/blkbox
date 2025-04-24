import { cn } from "@/lib/utils"

interface MatrixBackgroundProps {
  className?: string
}

export default function MatrixBackground({ className }: MatrixBackgroundProps) {
  return (
    <div
      className={cn("fixed inset-0 z-[-2] opacity-20 pointer-events-none bg-black", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300e5ff' fillOpacity='0.2' fillRule='evenodd'%3E%3Cpath d='M0 20L20 0h2L0 22zm0 12L32 0h2L0 34zm0 8L40 0h2L0 42zM2 0L0 2V0zM6 0L0 6V4L4 0zm10 0L0 16v-2L14 0zm12 0L0 28v-2L26 0zm12 0L0 40v-2L38 0z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    ></div>
  )
}
