import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LoadingProvider } from "@/components/loading-provider"
import { SolanaWalletProvider } from "../components/providers/wallet-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tabi - Send crypto to friends, instantly",
  description: "Tabi makes sending stablecoins and crypto as easy as sending a message. Split bills, track spending, and get AI-powered insights - all powered by Solana.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LoadingProvider>
            <SolanaWalletProvider>
              {children}
            </SolanaWalletProvider>
          </LoadingProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
