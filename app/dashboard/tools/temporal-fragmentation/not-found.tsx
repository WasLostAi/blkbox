import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="container py-12">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="font-tech-mono">Back to Dashboard</span>
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-neon-pink mb-4">Tool Unavailable</h1>

          <div className="border border-neon-pink/30 bg-black/50 p-6 rounded-lg">
            <p className="mb-4">The Temporal Fragmentation tool is currently under maintenance.</p>
            <p className="text-zinc-400">This experimental tool will be available soon. Please check back later.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
