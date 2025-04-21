import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/context/wallet-context"
import AdminLink from "@/components/admin-link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "$BLKBOX - The Shadow Protocol",
  description: "Access the darkest toolbox ever built for Solana",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <WalletProvider>
            {children}
            <AdminLink />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
