import Link from "next/link"
import { Twitter, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black py-6 px-6 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo on left - KEEP THIS */}
          <div className="mb-4 md:mb-0">
            <div className="font-mono">
              <span className="text-pink-500">$BLK</span>
              <span className="text-cyan-400">BOX</span>
            </div>
          </div>

          {/* Social icons in center - REPLACE TEXT WITH THESE ICONS */}
          <div className="flex items-center space-x-8 mb-4 md:mb-0">
            <a
              href="https://twitter.com/blkboxprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://t.me/blkboxprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors"
              aria-label="Telegram"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="https://discord.gg/blkbox"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors"
              aria-label="Discord"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="https://medium.com/@blkboxprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors"
              aria-label="Medium"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.5 6.75a.75.75 0 0 0-.75.75v9c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-15Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>

          {/* Copyright text - USE FORMAT FROM TOP FOOTER */}
          <div className="text-gray-400 text-xs">
            © 2025 $BLKBOX. All rights reserved.
            <Link
              href="/pitch-deck"
              className="text-gray-600 hover:text-gray-400 transition-colors text-[10px] opacity-60 ml-2"
            >
              [pitch]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
