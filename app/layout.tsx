import type React from "react"
import type { Metadata } from "next"
import { Rajdhani, Share_Tech_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/context/wallet-context"

// Main font - Rajdhani for headings and most text
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
})

// Monospace font for code-like elements and accents
const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tech-mono",
})

export const metadata: Metadata = {
  title: "$BLKBOX | The Shadow Protocol",
  description:
    "Access the darkest toolbox ever built for Solana. A system that gives you what the whales, insiders, and shadow teams have been using.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rajdhani.variable} ${shareTechMono.variable} font-rajdhani bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WalletProvider>{children}</WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
